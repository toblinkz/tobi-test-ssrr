<template>
  <modal name="edit-balance-notification-modal" height="500px"  width="500px">

						<div class="notification-modal-header">
							<h4 class="notification-modal-title">Edit Notification</h4>
							<img src="/images/icons/svg_icons/close-icon-round.svg" alt="" class="close-icon" @click="closeModal">
						</div>
		    	<div class="container">

						<div class="form-container">

							<div class="select-container">
								<label>Select Channel</label>
								<select class="select-dropdown" @change="selectChannel($event)">
									<option>Email</option>
									<option>Webhook</option>
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

							<div v-if="channel === 'Webhook'" class="input-form-container">
								<label>Webhook:</label>
								<input v-model="webhook" class="input-form"/>
								<span  class="error_field_message" v-if="errorMessage.webhook">{{errorMessage.webhook}}</span>
							</div>
							<a v-if="cancelEdit && channelItemName" @click="cancelEditNotification" style="margin-top: 3em;" class="btn btn-danger">Cancel</a>
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
		</modal>
</template>

<script>
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import ButtonSpinner from "@/components/general/ButtonSpinner";
export default {
	name: "EditBalanceNotificationModal",
	components: {ButtonSpinner,  DatePicker},
	data(){
		 return{
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
				webhook:''
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
	computed:{
		isDisabled(){
			if (this.channelInteger === 1){
				return !this.email || this.hasEmailError;
			}else {
				return !this.webhook || this.hasWebhookError;
			}
		}
	},

	methods:{

		 closeModal(){
				 this.$modal.hide('edit-balance-notification-modal');
			},

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

		cancelEditNotification(){
			this.cancelEdit = false;
			this.enableWalletNotification = false;
		},

		async setWalletBalanceNotificationFrequency(){
			try {
				this.isLoading = true;
				this.channelItem = this.channelInteger === 1 ? this.email : this.webhook;
				await this.$billing.setWalletBalanceNotificationFrequency(this.frequencyIntegerValue, this.setTime, this.channelInteger, this.channelItem);
				this.isLoading = false;
				this.enableWalletNotification = false;
				this.cancelEdit = false;
				this.$emit('get-notification');
				this.$toast.success('Balance notification updated successfully');
				this.closeModal();
			}catch (e) {
				this.isLoading = false;
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
	}
}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";
.container {
	width: 100%;
	background: #FFFFFF;
	border-radius: 8px;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 100;
	position: relative;
}

.notification-modal-header {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	border-bottom: 1px solid #E7E7E7;
}
.notification-modal-title {
	margin: 0;
	line-height: 1.5384616;
	font-weight: 700;
}
.close-icon {
	opacity: 0.6;
	filter: alpha(opacity=60);
	line-height: 1;
	cursor: pointer;
}
.close-icon:hover,
.close-icon:focus {
	outline: 0;
	opacity: 1;
	color: black;
	filter: alpha(opacity=100);
}
.form-container{
	min-width: 350px;
}
.close-icon {
	position: absolute;
	right: 20px;
	cursor: pointer;
}
.select-dropdown {
	padding: 0.5em;
	border-radius: 8px;
	font-size: 14px;
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
	margin-top: 2em;
}

.input-form:focus {
	border-color: #4DB6AC;
	outline: none;
}
label{
	font-size: 16px;
	font-weight: 400;
}
.select-container{
	display: flex;
	flex-direction: column;
	margin-top: 2em;
}
</style>
