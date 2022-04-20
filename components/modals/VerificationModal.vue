<template>
	<transition>
		<modal name="verification-id-modal" class="" :clickToClose="false" height="auto">
			<div class="flex-container">
				<div class="flex-item-left hidden-xs" style="background: url(/images/verification_banner.svg)" >


				</div>
				<div class="flex-item-right modal-body">
					<div class="p-x-y">
						<p  class="m-t-80 text-bold">Verify it's you</p>
						<p>Welcome to your Dashboard. We sent a verification code to your email address and phone number. Please enter the code into the text field below</p>
						<form  method="post"  @submit.prevent="verifyCode" >
							<div class="mt-20">
								<div class="form-group">
									<input type="text" class="form-control" maxlength="6" placeholder="Enter 6-digit code" v-model="verification_code" :class="{'error ' : hasVerificationError, 'has-input' : hasVerificationInput}" >
									<span class="input-field_helper">Verification Code</span>
									<span class=" error_field_message" v-if="error_message.verification_code">{{error_message.verification_code}}</span>
									<div class="mt-20">
												<ButtonSpinner :is-disabled="isDisabled" :is-loading="isLoading" :button_text="button_text" ></ButtonSpinner>
											</div>
									<a  @click="resendVerificationCode" class="text-info2 mt-50 ">Resend verification code</a>
									<p class="mt-20">verify later instead? <a @click="logOut" class="text-info2">Log Out</a></p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</modal>
	</transition>
</template>

<script>
import ButtonSpinner from "~/components/general/ButtonSpinner";
import {mapGetters} from "vuex";
import app from "~/plugins/ga"

export default {
name: "VerificationModal",
 	components: {ButtonSpinner},
	 data(){
				return{
					verification_code: "",
					error_message:[],
					access_token: "",
					hasVerificationError: false,
					hasVerificationInput: false,
					button_text: "Verify Code",
					isLoading: false

				}
		},
	 	computed: {
					isDisabled: function (){
						return( this.verification_code === '' || this.error_message.verification_code !== '');
					},
			},
		watch: {
			verification_code(value) {
				this.verification_code = value;
				this.hasVerificationInput = true;
				this.validateVerificationCode(value);
			},
		},
		methods: {
			validateVerificationCode(value){
				if (isNaN(value) || value.length < 6){
					this.error_message['verification_code'] = 'Verification code must be 6 digit';
					this.hasVerificationError = true;
				} else {
					this.error_message['verification_code'] = '';
					this.hasVerificationError = false;
				}
			},
			triggerCustomerConversionScript(){
				gtag('event', 'conversion', {
					'send_to': 'AW-989861671/aX13CJqy2IoDEKeugNgD',
					'value': 1.0,
					'currency': 'USD'
				});
			},
			async verifyCode(){
				try{
					this.isLoading = true;
					this.button_text = "Verifying";
					await this.$user.verifyUser(this.verification_code)
					let response = 	await this.$user.getUser();

 			 this.$utility.setExpiryTime();
					await localStorage.setItem('user_data', JSON.stringify(response.data));
					this.isLoading = false;
					this.button_text = "Verify Code";
					this.$toast.show("Successfully verified");
					this.$store.commit('setViewVerificationPage', 'false');
					this.triggerCustomerConversionScript();
					await this.$router.push('/');
				}catch (error) {
					if (navigator.onLine) {
						this.isLoading = false;
						this.button_text = "Verify Code";
						this.hasVerificationError = true;
						this.error_message['verification_code'] = 'Invalid Code';
					} else {
						this.isLoading = false;
						this.button_text = "Verify Code";
						this.$toast.show("No Internet connection");
					}

				}
		},
			async resendVerificationCode(){
				try{
					let data = await this.$axios.$get('auth/account/token/resend', {
						params:{
							verification_code: '000000'
						},
					headers: {'Authorization':  `Bearer ${localStorage.getItem('local')}`}}
					);
					this.$toast.success("Verification code has been resent")
				}catch (e) {

				}
			},
			async logOut(){
				try {
					await this.$axios.$get('auth/logout', {headers: {'Authorization':  `Bearer ${localStorage.getItem('local')}`}});
					this.$store.commit('setLIState', true);
					localStorage.clear();
					await this.$router.push({name: 'login'});
					this.$store.commit('setViewVerificationPage', 'false');
					location.reload();
				} catch (e) {

				}

			}
	}
}
</script>

<style scoped>
@import "../../assets/css/modal/modal.css";
@import "../../assets/css/general_style/authentication_pages.css";

.vm--container{
	display: block;
	overflow-y: auto;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1050;
	-webkit-overflow-scrolling: touch;
	outline: 0;
	background-color: rgba(0, 0, 0, 0.5);
}
.modal-header {
	padding: 20px;
	border-bottom: 1px solid transparent;
}
.modal-header {
	position: relative;
	padding-bottom: 0;
}

.modal-header .close[type=button] {
	background: rgba(255,255,255,0.3);
	width: 25px;
	height: 25px;
	display: block;
	border-radius: 20px;
	color: #000;
	font-weight: bold;
	margin-top: -3px;
	margin-right: -10px;
}
.modal-header .close {
	position: absolute;
	right: 20px;
	top: 50%;
	/* margin-top: 0; */
}
.modal-title {
	margin: 0;
	line-height: 1.5384616;
}
button.close {
	padding: 0;
	cursor: pointer;
	background: transparent;
	border: 0;
	-webkit-appearance: none;
}
.error_field_message {
	font-size: 1.2rem;
	color: red;
	display: block;
	margin-top: 5px;
}
input[type=text].error {
	border-color: red!important;
}
.form-control:focus {
	border-color: #4DB6AC;
	outline: none;
}
P{
	font-size: 14px;
}
.close {
	font-size: 17px;
	text-shadow: none;
	opacity: 0.6;
	filter: alpha(opacity=60);
	line-height: 1;
}
.close:hover, .close:focus {
	outline: 0;
	opacity: 1;
	color: black;
	filter: alpha(opacity=100);
}
.modal-body {
	padding: 20px 20px 60px 20px;
	position: relative;
}
.form-group {
	margin-bottom: 20px;
	position: relative;
}
.form-group label {
	margin-bottom: 5px;
	display: block;
	font-weight: 600;
	line-height: 24px;
}
label {
	max-width: 100%;
}
.form-control{
	font-size: 13px;
	border-radius: 5px;
	border: 1px solid rgba(204, 204, 204, 0.34);
	font-weight: 500;
	box-shadow: none;
	display: block;
	width: 90%;
	height: 40px;
	padding: 7px 12px;
	line-height: 1.5384616;
	color: #333333;
	background-color: #fff;
	background-image: none;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:hover {
	border-color: #aaa;
}
.form-control:focus {
	border-color: #4DB6AC;
}
input {
	font: inherit;
}
strong {
	font-weight: 600;
}
.modal-footer {
	padding-top: 0;
	padding: 20px;
	text-align: right;
	border-top: 1px solid transparent;
}
.btn-default {
	color: #333;
	background-color: #fcfcfc;
	border-color: #ddd;
}
.modal-footer .btn + .btn {
	margin-left: 5px;
	/* margin-bottom: 0; */
}
.btn-primary:hover {
	color: #fff;
	/* background-color: #0c7cd5; */
	border: 1px solid transparent !important;
}
.p-x-y{
	 padding-left: 30px;
	 padding-right: 30px;
}
.flex-container {
	display: flex;
	flex-wrap: wrap;
}
.flex-item-left {
	flex: 20%;
}

.flex-item-right {
	flex: 80%;
}
</style>
