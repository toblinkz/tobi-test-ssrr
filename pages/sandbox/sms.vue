<template>
	<div>
		<div class="page-header">
			<div class="page-header-content">
				<div class="page-title mt-150">
					<ul class="nav nav-pills campaign-steps hidden-xs" style="margin-bottom: -20px;">
						<li>
							<nuxt-link to="/sandbox">
								<img src="/images/gift.svg" style="margin-top: -5px;margin-right: 5px;"> Sandbox
							</nuxt-link>
						</li>
						<li class="active">
							<nuxt-link to="/sms/quick-sms">
								<img src="/images/sms.svg" style="margin-top: 2px;margin-right: 5px;"> SMS
							</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="page-container">
			<div class="page-content">
				<div class="content-wrapper">
					<main id="wrapper" class="wrapper">
						<div class="row">
							<div class="col-md-6">
								 <div>
										 <p style="font-size: 14px">Send test SMS to any phone number and see it deliver swiftly, anywhere.</p>
										 <p class="mt-30 m-l-15" style="font-weight: 700; color: #365899">Select a SMS channel</p>
										 <div class="row">
												  <div class="col-md-6 pr-0">
															 <button @click="selectGenericChannel" class="form-control" :class="{'button_active': is_generic}" style="cursor: pointer">Generic</button>
														</div>
														<div class="col-md-6 p-l-0">
															<button @click="selectDndChannel" class="form-control" :class="{'button_active': is_dnd}" style="cursor: pointer">DND</button>
														</div>
											</div>
										 <div class="m-l-15" style="display: flex">
												<img src="/images/info2.svg" class="m-r-5"/><p class="mt-10" style="color: #3069A4; font-size: 13px">Generic channel is for numbers that do not have DND activated.</p>
											</div>
										<p class="mt-30 m-l-15" style="font-weight: 700; color: #365899">Input phone number & Sender ID</p>
										<div class="row mt-20">
											 <div class="col-md-6 ">
													<div style="position: relative">
														<input class="form-control has-input" :class="{ 'error' : hasPhoneNumberError }" v-model="request_payload.to" type="tel"  >
														<span class="input-field_helper">Recipient Phone number</span>
														<span class=" error_field_message" v-if="error_message.phone_number">{{error_message.phone_number}}</span>
													</div>
												</div>
											 <div class="col-md-6 ">
													<div style="position: relative">
														<select class="form-control has-input" v-model="request_payload.from" >
															<option v-if="is_generic && generic_senderid.length > 0" v-for="item in generic_senderid">{{item.sender_id}}</option>
															<option v-if="is_dnd && dnd_senderid.length > 0" v-for="item in dnd_senderid">{{item.sender_id}}</option>
															<option v-if="is_generic && generic_senderid.length < 1">fastBeep</option>
															<option v-if="is_dnd && dnd_senderid.length < 1">N-Alert</option>
														</select>
														<span class="input-field_helper">Select a Sender ID</span>
													</div>
												</div>
										</div>
										<p class="mt-50 m-l-15" style="font-weight: 700; color: #365899">What kind of message do you want to send?</p>
										<div class="row mt-20" v-if="is_generic">
											 <div class="col-md-4 p-r-0">
													<button @click="selectOtp" class="form-control" :class="{'button_active': is_otp}" style="cursor: pointer">OTP</button>
												</div>
												<div class="col-md-4 p-r-0">
													<button @click="selectProductNotification" class="form-control" :class="{'button_active': is_product_notification}" style="cursor: pointer">Product notification</button>
												</div>
											<div class="col-md-4">
												<button @click="selectMarketing" class="form-control" :class="{'button_active': is_marketing}" style="cursor: pointer">Marketing</button>
											</div>
										</div>
										<div class="row mt-20" v-if="is_dnd">
											<div class="col-md-6 p-r-0">
												<button @click="selectOtp" class="form-control" :class="{'button_active': is_otp}" style="cursor: pointer">OTP</button>
											</div>
											<div class="col-md-6 ">
												<button @click="selectProductNotification" class="form-control" :class="{'button_active': is_product_notification}" style="cursor: pointer">Product notification</button>
											</div>
										</div>
										<div class="mt-20 row">
											<div style="position: relative" class="col-md-12">
												<textarea readonly class="form-control has-input" name="your-message" rows="4"></textarea>
												<span class="input-field_helper" style="left: 50px!important;">SMS Body</span>
											</div>
										</div>
										<div>
											<div class="mt-30" style="background: #f5f5f5; border-radius: 3px; padding: 15px">
												<p class="text-center"><i class="entypo-cc" style="color: #079805 !important;"></i>
													You will be charged from your wallet per test</p>
											</div>
											<a class="mt-30 btn bg-blue" @click="sendMessage" :aria-disabled="isDisabled"   style="width: 100%; padding-top: 15px; padding-bottom: 18px; font-size: 15px">
												{{ send_button_text }}
												<span v-show="isLoading">
												 <img src="/images/spinner.svg" height="20px" width="30px"/>
											</span>
											</a>
										</div>

									</div>
							</div>
							<div class="col-md-6">
								<div>
									<div>
										<p>Request</p>
										<SmsCodeBlock :request_payload="request_payload"></SmsCodeBlock>
									</div>
									<div>
										<p>Response</p>
										<CodeBlockResponse :show_default_text="show_default_text" :default_text="default_text">
											<template v-slot:json_code>
												{
															"balance": "{{sent_message_response.balance }}",
															"code": "{{sent_message_response.code}}",
															"message": "{{sent_message_response.message }}",
															"message_id": {{sent_message_response.message_id }},
															"user": "{{sent_message_response.user}}"
												}
											</template>
										</CodeBlockResponse>
									</div>
								</div>
							</div>
						</div>
					</main>
			  <MessageDeliveredSuccessfulModal :has_dnd_senderid="has_dnd_senderid" :has_generic_senderid="has_generic_senderid" @closeModal="closeMessageDeliveredSuccessfulModal"></MessageDeliveredSuccessfulModal>
					<MessageDeliveredUnsuccessfulModal></MessageDeliveredUnsuccessfulModal>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VoiceOtpCodeBlock from "../../components/sandbox/voice-otp/VoiceOtpCodeBlock";
import CodeBlockResponse from "../../components/general/CodeBlockResponse";
import FirstStep from "../../components/sandbox/voice-otp/FirstStep";
import SecondStep from "../../components/sandbox/voice-otp/SecondStep";
import VerifyToken from "../../components/sandbox/voice-otp/VerifyToken";
import VerifyOtpCodeBlock from "../../components/sandbox/voice-otp/VerifyOtpCodeBlock";
import VerifyTokenResponseBlock from "../../components/sandbox/voice-otp/VerifyTokenResponseBlock";
import VerificationSuccessfulModal from "../../components/sandbox/voice-otp/modal/VerificationSuccessfulModal";
import VerificationUnsuccessfulModal from "../../components/sandbox/voice-otp/modal/VerificationUnsuccessfulModal";
import MessageDeliveredSuccessfulModal from "../../components/sandbox/sms/modal/MessageDeliveredSuccessfulModal";
import SmsCodeBlock from "../../components/sandbox/sms/SmsCodeBlock";
import MessageDeliveredUnsuccessfulModal from "../../components/sandbox/sms/modal/MessageDeliveredUnsuccessfulModal";

export default {
	name: "sms",
	middleware:['auth'],
	components: {
		MessageDeliveredUnsuccessfulModal,
		SmsCodeBlock,
		MessageDeliveredSuccessfulModal,
		VerificationUnsuccessfulModal,
		VerificationSuccessfulModal,
		VerifyTokenResponseBlock,
		VerifyOtpCodeBlock, VerifyToken, SecondStep, FirstStep, CodeBlockResponse, VoiceOtpCodeBlock},
	data(){
		return{
			is_generic: true,
			is_dnd: false,
			is_otp: true,
			is_product_notification: false,
			is_marketing: false,
			request_payload: {
				 to: '',
				 from:'',
				 sms: '',
				 channel: 'generic',
				 type:'otp'
			},
			otp:'',
			error_message:[],
			hasPhoneNumberError: false,
			has_dnd_senderid: false,
			has_generic_senderid: false,
			generic_senderid:[],
			dnd_senderid:[],
			 message_content:'',
			show_default_text: true,
			show_verify_default_text: true,
			sent_message_response: '',
			send_button_text: 'Send message',
			default_text: 'Send message to see the response here',
			isLoading: false,
		}
	},

	watch:{
	 'request_payload.to': function (value) {
			 this.validatePhoneNumber(value);
		}
	},

	computed:{
		isDisabled: function () {
			 return(!this.request_payload.to || this.hasPhoneNumberError || !this.request_payload.from);
		}
	},

	methods:{

		selectGenericChannel(){
			 this.is_generic = true;
			 this.is_dnd = false;
				this.request_payload.channel = 'generic';
				this.request_payload.from = '';
				this.selectOtp();
		},

		selectDndChannel(){
			this.is_dnd = true;
			this.is_generic = false;
			this.request_payload.channel = 'dnd';
			this.request_payload.from = '';
		 this.selectOtp();
		},

		selectOtp(){
			 this.is_otp = true;
				this.is_product_notification = false;
				this.is_marketing = false;
				this.request_payload.type = 'otp';
				this.request_payload.sms = this.message_content.otp;
			document.getElementsByName('your-message')[0].value = this.message_content.otp;
			},

		selectProductNotification(){
			this.is_product_notification = true;
			this.is_otp = false;
			this.is_marketing = false;
			this.request_payload.type = 'notification';
			this.request_payload.sms = this.message_content.product_notification;
			document.getElementsByName('your-message')[0].value = this.message_content.product_notification;
		},

		selectMarketing(){
			this.is_marketing = true;
			this.is_product_notification = false;
			this.is_otp = false;
			this.request_payload.type = 'marketing';
			this.request_payload.sms = this.message_content.marketing;
			document.getElementsByName('your-message')[0].value = this.message_content.marketing;
		},

		validatePhoneNumber(value){
			if (value.toString()[0] === '0'){
				this.error_message['phone_number'] = '* Please input the country code before the\n' +
					'number (i.e. 23481, 1368... etc).';
				this.hasPhoneNumberError = true;
			} else if ( isNaN(value) || value.length < 10 || value.length > 14) {
				this.error_message['phone_number'] = 'Phone number must be between 10 and 14 digits';
				this.hasPhoneNumberError = true;
			}else {
				this.error_message['phone_number'] = '';
				this.hasPhoneNumberError = false;
			}
		},

		showMessageDeliveredSuccessfulModal(){
			if (this.dnd_senderid.length < 1 && this.is_dnd){
				this.has_dnd_senderid = false;
				this.has_generic_senderid = true;
			}

			if (this.generic_senderid.length < 1 && this.is_generic){
				this.has_generic_senderid = false;
				this.has_dnd_senderid = true;
			}
			this.$modal.show('message-delivered-successful-modal');
		},
		showVerificationUnsuccessfulModal(){

		},
		closeMessageDeliveredSuccessfulModal(){
			this.$modal.hide('message-delivered-successful-modal');
			this.show_default_text = true;
		},

		async getSenderIdByChannel(){
			try {
				let data = await this.$smsSandbox.getSenderIdByChannel();
				this.generic_senderid = data.generic;
			}catch (e) {

			}
		},

		async getMessageContent(){
			 try {
					let data = await this.$smsSandbox.getMessageContent( );
					this.message_content = data.message;
					this.request_payload.sms = this.message_content.otp;
					document.getElementsByName('your-message')[0].value = this.message_content.otp;
				}catch (e) {

				}
		},

		async sendMessage(){
			 try {

						this.isLoading = true;
						this.send_button_text = '';
					 this.sent_message_response = await this.$smsSandbox.sendMessage(this.request_payload.to, this.request_payload.from, this.request_payload.channel,this.request_payload.type);

						this.isLoading = false;
						this.send_button_text = 'Send message';
						this.show_default_text = false;
						this.showMessageDeliveredSuccessfulModal();
				}catch (e) {
					this.$modal.show('message-delivered-unsuccessful-modal');
					this.isLoading = false;
					this.send_button_text = 'Send message';
				}
		}

	},
	mounted() {
		this.getSenderIdByChannel();
		this.getMessageContent();

	}
}
</script>

<style scoped>

@media (min-width: 769px){
	.nav-pills {
		font-size: 0;
	}
}
.nav {
	margin-bottom: 0;
	padding-left: 0;
	/* list-style: none; */
}

ul.campaign-steps {
	text-align: left;
	border-bottom: dashed 2px #aaa;
	margin-top: 30px;
	width: 97%;
}
.campaign-steps > li {
	margin-right: 50px;
	font-weight: 600;
}
@media (min-width: 769px){
	.nav-pills > li {
		display: inline-block;
		font-size: 13px;
	}
}
.nav-pills > li {
	float: none;
}
.campaign-steps > li > a {
	padding-right: 0;
	padding-left: 0;
}
.nav-pills > li > a {
	color: #333333;
	border-radius: 3px;
}
.nav > li > a {
	position: relative;
	display: block;
	padding: 7px 15px;
}
.nav > li {
	position: relative;
}
.campaign-steps a {
	font-size: 16px;
}
.campaign-steps > li > a {
	padding-right: 0;
	padding-left: 0;
}
ul.campaign-steps > li.active > a{
	border-bottom: solid 2px #365899;
	border-radius: 5px 5px 0 0;
	font-weight: 600;
	background: #365899;
	padding: 10px 15px;
	margin-bottom: -2px;
	color: #fff;
}
.page-header:not(.page-header-filled) + .page-container {
	padding-top: 35px;
}
.page-container {
	margin: auto;
	padding-bottom: 10px;
}
@media (min-width: 769px){
	.page-container {
		width: 100%;
		display: table;
		table-layout: fixed;
	}
}
@media (min-width: 769px){
	.page-content {
		display: table-row;
	}
}
@media (min-width: 769px){
	.content-wrapper {
		display: table-cell;
		vertical-align: top;
	}
}
.content-wrapper {
	width: 100%;
}
.form-control {
	display: block;
	width: 100%;
	height: 50px;
	padding: 7px 12px;
	/* font-size: 13px; */
	line-height: 1.5384616;
	color: #333333;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ddd;
	border-radius: 5px;
	-webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.form-control {
	display: block;
	width: 100%;
	height: 50px;
	padding: 7px 12px;
	/* font-size: 13px; */
	line-height: 1.5384616;
	color: #333333;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ddd;
	border-radius: 5px;
	-webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.input-field_helper {
	font-size: 1rem;
	position: absolute;
	opacity: 0;
	background-color: #fff;
	padding-left: 8px;
	padding-right: 8px;
	top: -7px;
	font-weight: 600;
	color: rgba(10,46,101,.5);
	-webkit-transition: color .3s ease;
	transition: color .3s ease;
	left: 20px;
}

select:focus+.input-field_helper, textarea:focus+.input-field_helper, input[type=number]:focus+.input-field_helper, input[type=password]:focus+.input-field_helper, input[type=tel]:focus+.input-field_helper, input[type=text]:focus+.input-field_helper {
	color: #2D74AC;
	opacity: 1!important;
}

select:focus, textarea:focus, input[type=number]:focus, input[type=password]:focus, input[type=tel]:focus, input[type=text]:focus {
	border-color: #2D74AC;
	outline: none;
	background-color: transparent;
	-webkit-transition: border .3s ease-in;
	transition: border .3s ease-in;
	box-shadow: none;
}
input:focus::placeholder{
	color: transparent;
}
select.has-input+.input-field_helper, textarea.has-input+.input-field_helper, input[type=number].has-input+.input-field_helper, input[type=password].has-input+.input-field_helper, input[type=tel].has-input+.input-field_helper, input[type=text].has-input+.input-field_helper {
	opacity: 1;
}
input[type=email].error+.input-field_helper, input[type=number].error+.input-field_helper, input[type=password].error+.input-field_helper, input[type=tel].error+.input-field_helper, input[type=text].error+.input-field_helper {
	color: red!important;
}
textarea.form-control {
	font-weight: normal;
	height: auto;
}
.button_active{
	 background-color: #DFEBF3;
	 color: #365899;
}


</style>
