<template>
	<div class="wallet-notification-container">
		<div class="text-center">
			<p id="welcome" style="margin-top: 10px;margin-bottom: 15px"><i class="entypo-list-add"></i> Get Balance Notification Here</p>
			<p>Receive Notifications when you hit your wallet limit!</p>
			<p>Also set your account to auto-recharge so you don't miss a thing<br></p>
		</div>

		<TableVuePlaceHolder  v-if="showShimmer" style="padding: 3em 6em" ></TableVuePlaceHolder>
<!--		 <BoardSkeleton style="display: flex; align-self: center" v-if="showShimmer" />-->
		<div class="setup-card">

			    <div v-if="channelItemName" class="notification-list-container">
										<div  class="notification-header">
											<p class="text-bold">Channel</p>
											<p class="text-bold">Next Notification time</p>
										</div>
										<div class="notification-item-container">
											<p>{{channelItemName}}</p>
											<p>{{timeToSendNextNotification}}</p>
										</div>
										<div v-if="!cancelEdit" class="action-class">
											<p style="color: green; cursor: pointer" @click="showWalletNotificationForm"><i class="fa fa-edit"></i>Edit</p>
											<p style="color: red; cursor: pointer" @click="deleteBalanceNotification"><i class="fa fa-trash"></i>Remove</p>
										</div>
							</div>

					<div v-if="enableWalletNotification" class="form-container">
							<div class="select-container">
								<label>Select Frequency</label>
								<select class="select-dropdown" @change="selectFrequency">
									<option>Hourly</option>
									<option>Set Time</option>
								</select>
							</div>
							<date-picker
								v-if="showTime"
								class="mt-20"
								v-model="setTime"
								format="HH:00"
								value-type="format"
								type="time"
								style="width: 100%"
								placeholder="Select time"
								confirm
							/>

							<div class="select-container">
								<label>Select Channel</label>
								<select class="select-dropdown" @change="selectChannel($event)">
									<option>Email</option>
									<option>Webhook</option>
								</select>
							</div>

							<div v-if="channel === 'Email'" class="input-form-container">
								<label>Email:</label>
								<input v-model="email" class="input-form"/>
								<span  class="error_field_message" v-if="errorMessage.email">{{errorMessage.email}}</span>
							</div>

								<div v-if="channel === 'Webhook'" class="input-form-container">
									<label>Webhook:</label>
									<input v-model="webhook" class="input-form"/>
									<span  class="error_field_message" v-if="errorMessage.webhook">{{errorMessage.webhook}}</span>
								</div>
						  <a v-if="cancelEdit" @click="cancelEditNotification" style="margin-top: 3em;" class="btn btn-danger">Cancel</a>
        <div style="margin-top: 2em; float: right">
									<ButtonSpinner
										 :action="setWalletBalanceNotificationFrequency"
									  :button_text="buttonText"
											:is-disabled="isDisabled"
											:is-loading="isLoading"
									 />
								</div>
					</div>
		</div>
		<DeleteBalanceNotificationModal
		   :notification-id="notificationId"
					@get-notification="getWalletBalanceNotificationFrequency"
		/>
	</div>
</template>

<script>
import Switches from 'vue-switches';
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import ButtonSpinner from "@/components/general/ButtonSpinner";
import TableVuePlaceHolder from "@/components/general/TableVuePlaceHolder";
import DeleteBalanceNotificationModal from "@/components/billing/modal/DeleteBalanceNotificationModal";
import BoardSkeleton from "@/components/skeletons/BoardSkeleton";

export default {
	name: "wallet-notification",
	middleware: ['auth', 'permission'],
	components: {BoardSkeleton, DeleteBalanceNotificationModal, TableVuePlaceHolder, ButtonSpinner, Switches, DatePicker},
	data() {
		return {
			buttonText:'save',
			isLoading: false,
			enableWalletNotification: false,
			cancelEdit: false,
			channel: 'Email',
			channelInteger: 1,
			showShimmer: true,
			errorMessage:[],
			hasEmailError: false,
			hasWebhookError: false,
			setTime: undefined,
			frequency: 'Hourly',
			frequencyIntegerValue: 1,
			showTime: false,
			email: '',
			channelItemName:'',
			showNotificationInfoContainer: true,
			notificationId: Number,
			timeToSendNextNotification:'',
			channelItem:'',
			webhook:''
		}
	},
	computed:{
			isDisabled(){
				 if (this.channelInteger === 1){
						 return !this.email || this.hasEmailError;
					}else {
						return !this.webhook || this.hasWebhookError;
					}
			}
	},
	watch:{
		enableWalletNotification(value){
			 value = !this.enableWalletNotification;
		},
		email(value){
   this.email = value;
			this.validateEmail(value);
		},
		webhook(value){
			this.webhook = value;
			this.validateWebhookUrl(value);
		}
	},
	methods:{
		selectChannel(value){
			 this.channel = value.target.value;
				switch (this.channel) {
					case "Email": {
						  this.channelInteger = 1;
								this.channelItem = this.email;
								break;
					}
					case "Webhook": {
							this.channelInteger = 4;
							this.channelItem = this.webhook;
						 break;
					}
				}
		},
		showWalletNotificationForm(){
			 this.enableWalletNotification = true;
				this.cancelEdit = true;
		},

		deleteBalanceNotification(){
			 this.$modal.show('delete-balance-notification-modal');
		},

		resetFields(){
			this.channelItemName = '';
			this.timeToSendNextNotification = '';
			this.email = '';
			this.webhook = '';
			this.hasEmailError = false;
			this.hasWebhookError = false;
		},

		selectFrequency(value){
			  this.frequency = value.target.value;
					switch (this.frequency) {
								case "Hourly":{
									this.showTime = false;
									this.frequencyIntegerValue = 1;
									break;
								}
								case "Set Time":{
									this.showTime = true;
									this.frequencyIntegerValue = 4;
								}
					}
		},


		async setWalletBalanceNotificationFrequency(){
			 try {
					 this.isLoading = true;
					 this.channelItem = this.channelInteger === 1 ? this.email : this.webhook;
      await this.$billing.setWalletBalanceNotificationFrequency(this.frequencyIntegerValue, this.setTime, this.channelInteger, this.channelItem);
					 this.isLoading = false;
						await this.getWalletBalanceNotificationFrequency();
						this.enableWalletNotification = false;
					 this.cancelEdit = false;
						this.$toast.success('Balance notification set successfully');
				}catch (e) {
					this.isLoading = false;
				}
		},

		async getWalletBalanceNotificationFrequency(){
			  this.resetFields();
					this.$modal.hide('delete-balance-notification-modal');
			  try{
						 this.showShimmer = true;
						 let data = await this.$billing.getWalletBalanceNotificationFrequency();
							if(data.data === null){
								 this.enableWalletNotification = true;
								 this.cancelEdit = true;
							}
							this.channelItemName = data.data.channel_item;
							this.timeToSendNextNotification = data.data.send_next_notification_at;
							this.notificationId = data.data.id;
							this.showShimmer = false;
					}catch (e) {
								this.showShimmer = false;
					}
		},
		cancelEditNotification(){
			 this.cancelEdit = false;
			 this.enableWalletNotification = false;
		},

		validateEmail(value){
			if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
				this.errorMessage['email'] = '';
				this.hasEmailError = false;
			}else {
				this.errorMessage['email'] = 'The email field must be a valid email';
				this.hasEmailError = true;
			}
		},

		validateWebhookUrl(value){
			if (/^(ftp|http|https):\/\/[^ "]+$/.test(value) || !value){
				this.hasWebhookError = false;
				this.errorMessage['webhook'] = '';
			}else{
				this.hasWebhookError = true;
				this.errorMessage['webhook'] = 'The webhook format is invalid.';
			}
		}
	},
	mounted() {
		 this.getWalletBalanceNotificationFrequency();
	}
}
</script>

<style scoped>

.form-container{
	 min-width: 280px;
}

.wallet-notification-container {
	display: flex;
	flex-direction: column;
	margin-top: 10em;
}

p {
	font-size: 1.3rem;
	margin-bottom: 0;
	padding: 0;
}

.setup-card {
	display: flex;
	flex-direction: column;
	margin-top: 4em;
	padding: 3em 6em;
	align-self: center;
	background-color: #FFFFFF;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.2);
}

.switch-container {
	display: flex;
	gap: 10px;
	margin-top: 1em;
}
.notification-header{
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.5em
}
.notification-item-container{
	display: flex;
	padding: 1em;
	border-radius: 5px;
	gap: 30px;
	border: 1px solid #365899
}
.switch-container p {
	font-size: 1.5rem;
}

.select-dropdown {
	padding: 0.5em;
	border-radius: 8px;
}
.action-class{
	display: flex;
	justify-content: space-between;
	margin-top: 1em;
}
.input-form {
	padding: 0.5em;
	border-radius: 8px;
	border: 1px solid rgba(0, 0, 0, 0.2);
}

.input-form-container {
	display: flex;
	flex-direction: column;
	margin-top: 1em;
}

.input-form:focus {
	border-color: #4DB6AC;
	outline: none;
}

.select-container{
	 display: flex;
	flex-direction: column;
	margin-top: 1em;
}

</style>
