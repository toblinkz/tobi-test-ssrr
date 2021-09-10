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
													<img src="/images/call_icon.svg" style="margin-top: -5px;margin-right: 5px;"> Voice OTP
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
												<FirstStep v-if="!show_next_step_button && !show_verify_token" @requestPayload="setVoiceTokenRequestPayload($event)"  @voiceOtpResponse="setVoiceOtpResponse($event)"></FirstStep>
											 <SecondStep v-if="show_next_step_button" @showVerifyToken="showVerifyToken"></SecondStep>
										  <VerifyToken :pin_id="voice_otp_response.pin_id" :pin_length="request_payload.pin_length" v-if="show_verify_token"  @verificationSuccessful="showVerificationSuccessfulModal" @verificationUnsuccessful="showVerificationUnsuccessfulModal" @verifyTokenResponse="setVerifyTokenResponse($event)" @otp="setOtp($event)"></VerifyToken>
									</div>
										<div class="col-md-6">
											 <div v-if="!show_verify_token">
														<div>
															<p>Request</p>
															<VoiceOtpCodeBlock :request_payload="request_payload"></VoiceOtpCodeBlock>
														</div>
													<div>
														<p>Response</p>
														<CodeBlockResponse :show_default_text="show_default_text" :default_text="default_text">
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
	name: "voice-otp",
	middleware:['auth'],
	components: {
		VerificationUnsuccessfulModal,
		VerificationSuccessfulModal,
		VerifyTokenResponseBlock,
		VerifyOtpCodeBlock, VerifyToken, SecondStep, FirstStep, CodeBlockResponse, VoiceOtpCodeBlock},
	data(){
		 return{
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
				  default_text: 'Dial number to see the response here',
				  isLoading: false,
				  show_next_step_button: false,
				  show_verify_token: false
				}
	},

	methods:{

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
.nav > li {
	position: relative;
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

</style>
