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
								<img src="/images/call_icon.svg" style="margin-top: -5px;margin-right: 5px;"> SMS
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
														<input class="number form-control has-input" :class="{ 'error' : hasPhoneNumberError }" type="tel"  placeholder="Input your phone number here">
														<span class="input-field_helper">Recipient Phone number</span>
														<span class=" error_field_message" v-if="error_message.phone_number">{{error_message.phone_number}}</span>
													</div>
												</div>
											 <div class="col-md-6 ">
													<div style="position: relative">
														<select class="form-control has-input" v-model="request_payload.pin_length" >
															<option>Termii</option>
															<option>Tobi</option>
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
													You will be charged from your wallet per test (N1.37 naira)</p>
											</div>
											<a class="mt-30 btn bg-blue" aria-disabled  style="width: 100%; padding-top: 15px; padding-bottom: 18px; font-size: 15px">
												Send message
												<span v-show="isLoading">
												 <img src="/images/spinner.svg" height="20px" width="30px"/>
											</span>
											</a>
										</div>

									</div>
							</div>
							<div class="col-md-6">
								<div v-if="!show_verify_token">
									<div>
										<p>Request</p>
										<VoiceOtpCodeBlock :request_payload="request_payload"></VoiceOtpCodeBlock>
									</div>
									<div>
										<p>Response</p>
										<CodeBlockResponse :show_default_text="show_default_text">
											<template v-slot:json_code>
												{
												"code": "{{ voice_otp_response.code }}",
												"message_id": "{{ voice_otp_response.message_id }}",
												"pin_id": "{{ voice_otp_response.pin_id }}",
												"message": "{{ voice_otp_response.message }}",
												"balance": {{ voice_otp_response.balance }},
												"user": "{{voice_otp_response.user}}"
												}
											</template>
										</CodeBlockResponse>
									</div>
								</div>
								<div v-if="show_verify_token">
									<div>
										<p>Request</p>
										<VerifyOtpCodeBlock :pin_id="voice_otp_response.pin_id" :pin="otp"></VerifyOtpCodeBlock>
									</div>
									<div>
										<p>Response</p>
										<VerifyTokenResponseBlock :show_verify_default_text="show_verify_default_text">
											<template v-slot:json_code>
												{
												"pinId":"{{ verify_token_response.pinId }}",
												"verified":{{ verify_token_response.verified }},
												"msisdn":"{{verify_token_response.msisdn}}",
												"attemptsRemaining":{{verify_token_response.attemptsRemaining}}
												}
											</template>

										</VerifyTokenResponseBlock>
									</div>
								</div>

							</div>
						</div>
					</main>
					<VerificationSuccessfulModal @closeModal="closeVerificationSuccessfulModal"></VerificationSuccessfulModal>
					<VerificationUnsuccessfulModal></VerificationUnsuccessfulModal>
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
export default {
	name: "sms",
	middleware:['auth'],
	components: {
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
			request_payload: {},
			otp:'',
			error_message:[],
			hasPhoneNumberError: false,
			hasPinAttemptError: false,
			hasPinTimeToLiveError: false,
			hasOtpError: false,
			show_default_text: true,
			show_verify_default_text: true,
			voice_otp_response: '',
			verify_token_response:'',
			dial_button_text: 'Dial number',
			isLoading: false,
			show_next_step_button: false,
			show_verify_token: false
		}
	},

	methods:{

		selectGenericChannel(){
			 this.is_generic = true;
			 this.is_dnd = false;
				this.selectOtp();
		},

		selectDndChannel(){
			this.is_dnd = true;
			this.is_generic = false;
		 this.selectOtp();
		},

		selectOtp(){
			 this.is_otp = true;
				this.is_product_notification = false;
				this.is_marketing = false;
			document.getElementsByName('your-message')[0].value = '213378 is your verification code for your new login, code expires in 60secs.\n' + 'Sent via Termii test by {{company name}}.';
			},

		selectProductNotification(){
			this.is_product_notification = true;
			this.is_otp = false;
			this.is_marketing = false;
			document.getElementsByName('your-message')[0].value = 'Hi {{company name}}, your order is confirmed! It would be delivered\n' + 'shortly; Thank you! Sent via Termii test.';
		},

		selectMarketing(){
			this.is_marketing = true;
			this.is_product_notification = false;
			this.is_otp = false;
			document.getElementsByName('your-message')[0].value = 'Shop sweaters this season, use this code Ter173 to enjoy 40% off on our\n' +
				'comfy sweaters. Sent via Termii test by {{company name}}.';
		},

		setVoiceOtpResponse(response){
			this.voice_otp_response = response;
			this.show_default_text = false;
			this.show_next_step_button = true;
		},

		setVerifyTokenResponse(response){
			this.verify_token_response = response;
			this.show_verify_default_text = false;
			this.$modal.show('verification-successful-modal');
		},
		showVerifyToken(){
			this.show_next_step_button = false;
			this.show_verify_token = true;
		},
		setOtp(otp){
			this.otp = otp;
		},
		setVoiceTokenRequestPayload(payload){
			this.request_payload = payload;
		},
		showVerificationUnsuccessfulModal(){
			this.$modal.show('verification-unsuccessful-modal');
		},
		showVerificationSuccessfulModal(){
			this.$modal.show('verification-successful-modal');
		},
		closeVerificationSuccessfulModal(){
			this.$modal.hide('verification-successful-modal');
			this.show_next_step_button = false;
			this.show_verify_token = false;
			this.request_payload = {};
			this.show_default_text = true;
		}

	},
	mounted() {
		document.getElementsByName('your-message')[0].value = '213378 is your verification code for your new login, code expires in 60secs.\n' +
			'Sent via Termii test by {{company name}}.';
	}
}
</script>

<style scoped>
/*@import "../../assets/css/general_style/authentication_pages.css";*/
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
