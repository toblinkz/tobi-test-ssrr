<template xmlns="http://www.w3.org/1999/html">
	<div class="wallet-notification-container">
		<div class="text-center">
			<p id="welcome" style="margin-top: 10px;margin-bottom: 15px"><i class="entypo-bell"></i> Set Balance Notification</p>
			<p style="font-size: 14px">Keep tabs on your Wallet Balance on the go!</p>
			<p style="font-size: 14px">Receive updates at a customized frequency and on your preferred notification channel.<br></p>
		</div>

		 <TableVuePlaceHolder  v-if="showShimmer"/>
    <div v-if="!enableWalletNotification" style="padding: 0 7em">
							<div class="header-style">
								<p class="header-title m-l-10">Channel</p>
								<p class="header-title ">Channel address</p>
								<p class="header-title ">Next notification</p>
								<p class="header-title m-r-20">Action</p>
							</div>
							<div  style="border-bottom: dotted #ddd!important;"></div>
					  <div class="notification-card">
								  <p style="font-size: 15px">Email</p>
								  <p style="font-size: 15px">{{channelItemName}}</p>
								  <p style="padding: 2px 10px;;font-size: 14px; background: #4caf50; border-radius: 20px; color: #FFFFFF">{{timeToSendNextNotification}}</p>
								<div class="action" v-click-outside="closeMenu">
									<img src="/images/icons/svg_icons/overflow-menu-vertical.svg" alt="" @click="toggleMenu">

									<div class="menu" v-if="isMenuOpen">
										<div class="menu-option"  @click="showEditNotificationModal">
											<img src="/images/icons/svg_icons/update-icon.svg" alt="" >
											<p>Edit notification</p>
										</div>

										<div class="menu-option remove-teammate"  @click="deleteBalanceNotification">
											<img src="/images/icons/svg_icons/delete-icon.svg" alt="">
											<p>Delete notification</p>
										</div>
									</div>

								</div>
							</div>
				</div>



		<div  v-if="enableWalletNotification" class="setup-card">
					<div class="form-container">
						<div class="select-container">
							<label>Select Channel</label>
							<select class="select-dropdown" @change="selectChannel($event)">
								<option>Email</option>
							</select>
						</div>

							<div class="select-container">
								<label style="font-size: 16px">Select Frequency</label>
								<select class="select-dropdown" @change="selectFrequency">
									<option>Hourly</option>
									<option>Custom Time</option>
								</select>
							</div>
							<date-picker
								v-if="showTime"
								class="mt-20"
								v-model="setTime"
								format="hh:00 a"
								value-type="format"
								type="time"
								style="width: 100%"
								placeholder="Custom time"
								confirm
							/>

							<div v-if="channel === 'Email'" class="input-form-container">
								<label>Email:</label>
								<input v-model="email" class="input-form"/>
								<span  class="error_field_message" v-if="errorMessage.email">{{errorMessage.email}}</span>
							</div>

<!--								<div v-if="channel === 'Webhook'" class="input-form-container">-->
<!--									<label>Webhook:</label>-->
<!--									<input v-model="webhook" class="input-form"/>-->
<!--									<span  class="error_field_message" v-if="errorMessage.webhook">{{errorMessage.webhook}}</span>-->
<!--								</div>-->
						  <a v-if="cancelEdit && channelItemName" @click="cancelEditNotification" style="margin-top: 3em;" class="btn btn-danger">Cancel</a>
        <div style="margin-top: 2em; float: right">
									<CustomButtonSpinner
										 :action="setWalletBalanceNotificationFrequency"
									  :button_text="buttonText"
											:is-disabled="isDisabled"
											:is-loading="isLoading"
									 />
								</div>
					</div>
		</div>
			<EditBalanceNotificationModal
				@get-notification="getWalletBalanceNotificationFrequency"
			/>
			<DeleteBalanceNotificationModal
						:notification-id="notificationId"
						@get-notification="getWalletBalanceNotificationFrequency"
			/>
	</div>
</template>

<script>
import ClickOutside from "vue-click-outside"
import Switches from 'vue-switches';
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import ButtonSpinner from "@/components/general/ButtonSpinner";
import TableVuePlaceHolder from "@/components/general/TableVuePlaceHolder";
import DeleteBalanceNotificationModal from "@/components/billing/modal/DeleteBalanceNotificationModal";
import BoardSkeleton from "@/components/skeletons/BoardSkeleton";
import EditBalanceNotificationModal from "@/components/billing/modal/EditBalanceNotificationModal";
import CustomButtonSpinner from "@/components/general/CustomButtonSpinner";

export default {
	name: "wallet-notification",
	middleware: ['auth', 'permission'],
	components: {
		CustomButtonSpinner,
		EditBalanceNotificationModal,
		BoardSkeleton, DeleteBalanceNotificationModal, TableVuePlaceHolder, ButtonSpinner, Switches, DatePicker},
	data() {
		return {
			buttonText:'Set notification',
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
			webhook:'',
			isMenuOpen: false
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
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
		showWalletNotificationForm(){
			 this.enableWalletNotification = true;
				this.cancelEdit = true;
		},

		deleteBalanceNotification(){
			 this.$modal.show('delete-balance-notification-modal');
		},

		closeMenu() {
			this.isMenuOpen = false
		},

		resetFields(){
			this.channelItemName = '';
			this.timeToSendNextNotification = '';
			this.email = '';
			this.webhook = '';
			this.hasEmailError = false;
			this.hasWebhookError = false;
			this.showTime = false;
			this.setTime = undefined;
		},

		selectFrequency(value){
			  this.frequency = value.target.value;
					switch (this.frequency) {
								case "Hourly":{
									this.showTime = false;
									this.frequencyIntegerValue = 1;
									break;
								}
								case "Custom Time":{
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

		isValidEmail(value){
			if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
				  return true;
			}
		},

	isValidUrl(value){
		if (/^(ftp|http|https):\/\/[^ "]+$/.test(value) || !value){
			 return value;
		}
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
		},
		showEditNotificationModal(){
			 this.$modal.show('edit-balance-notification-modal');
		}
	},
	directives: {
		ClickOutside
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

label{
	font-size: 16px;
	font-weight: 400;
}
.setup-card {
	display: flex;
	flex-direction: column;
	margin-top: 4em;
	padding: 2em 6em;
	align-self: center;
	background-color: #FFFFFF;
	box-shadow: 0 10px 45px 0 rgb(0 0 0 / 10%);
}

.notification-card{
	display: flex;
	justify-content: space-between;
	background-color: #FFFFFF;
	margin-top: 1em;
	padding: 2.5em 1.5em;
	border-radius: 8px;
	box-shadow: 0 10px 45px 0 rgb(0 0 0 / 10%);
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
	border-radius: 5px;
	font-size: 14px;
}
.action-class{
	display: flex;
	justify-content: space-between;
	margin-top: 1em;
}
.input-form {
	padding: 0.5em;
	border-radius: 5px;
	border: 1px solid rgba(0, 0, 0, 0.2);
}

.input-form-container {
	display: flex;
	flex-direction: column;
	margin-top: 2em;
}

.input-form:focus {
	border-color: #4DB6AC;
	outline: none;
}

.select-container{
	display: flex;
	flex-direction: column;
	margin-top: 2em;
}
.header-style{
	display: flex;
	justify-content: space-between;
	margin-top: 4em;
	height: 40px;
	color: #333333;
	font-weight: 600;
}

.header-title {
	 font-size: 15px;
	font-weight: 700;

}
.action {
	cursor: pointer;
}

.menu {
	position: absolute;
	right: 60px;
	width: 200px;
	background: #FFFFFF;
	box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	z-index: 10;
}

.menu-option {
	width: 100%;
	vertical-align: middle;
	padding: 16px 20px;
	margin: 0;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	transition: all 0.2s ease-out;
	text-decoration: none;
}

.menu-option p {
	margin: 0 0 0 10px;
	vertical-align: middle;
	text-decoration: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: #333333;
}

.menu-option:hover {
	background-color: #d5d5d5;
	border-radius: 4px;
}

</style>
