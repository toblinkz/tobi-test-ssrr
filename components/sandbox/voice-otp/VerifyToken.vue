<template>
	<div>
			<p class="mt-10 m-b-60">* This test service is currently only <b>available</b> to <b>Nigerian customers.</b></p>
			<div class="mt-30" style="background: #f5f5f5; border-radius: 3px; padding: 15px; width: 76%">
				<p class="text-center" style="color: #959292">pin_id: {{pin_id}}</p>
			</div>
			<div class="m-t-65" style="position: relative">
				<input type="text" class="form-control has-input" :class="{ 'error' : hasOtpError }" style="width: 76%" v-model="otp">
				<span class="input-field_helper">Input OTP</span>
				<span class=" error_field_message" v-if="error_message.otp">{{error_message.otp}}</span>
			</div>
			<a class="mt-50 btn bg-blue" :aria-disabled="isDisabled" @click="verifyPin" style="width: 76%; padding-top: 15px; padding-bottom: 18px; font-size: 15px">
					{{ verify_button_text }}
					<span v-show="isLoading">
							<img src="/images/spinner.svg" height="20px" width="30px"/>
						</span>
			</a>
	</div>
</template>

<script>
export default {
	name: "VerifyToken",
	data(){
		 return{
		 	 otp:'',
				 hasOtpError:'',
				 isLoading: false,
				 verify_button_text:'Verify my OTP',
				 error_message:[],
				 verify_token_response:''
			}
	},
	watch:{
		 otp(value){
		 	 this.$emit('otp', value)
				 this.validatePin(value);
			}
	},
	computed:{
		isDisabled: function () {
			 return(this.hasOtpError || !this.otp)
		}
	},
	methods:{
		 async verifyPin(){
		 	  try {
										this.verify_button_text= '';
										this.isLoading = true;
							   this.verify_token_response = await this.$voiceOTP.verifyOTP( this.otp, this.pin_id);
								this.verify_button_text = 'Verify my OTP';
								this.isLoading = false;
							 this.checkVerifiedValue(this.verify_token_response);
						}catch (e) {
							this.verify_button_text= 'Verify my OTP';
							this.isLoading = false;
							this.$emit('verificationUnsuccessful');
						}
			},

		validatePin(pin){
		 	if (isNaN(pin) || pin.length < this.pin_length || pin.length > this.pin_length){
					this.error_message['otp'] = `OTP must be a ${this.pin_length} digit. `;
					this.hasOtpError = true;
					return;
				}
		 	this.error_message['otp'] = '';
		 	this.hasOtpError = false;
		},
		checkVerifiedValue(verify_token_response){
		 	 if (verify_token_response.verified === true){
						this.$emit('verificationSuccessful');
						return;
					}
		 	this.$emit('verificationUnsuccessful');
		},
	},
	props:{
		 pin_id:{},
		 pin_length: {}
	}
}
</script>

<style scoped>
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
select:focus+.input-field_helper, input[type=number]:focus+.input-field_helper, input[type=password]:focus+.input-field_helper, input[type=tel]:focus+.input-field_helper, input[type=text]:focus+.input-field_helper {
	color: #2D74AC;
	opacity: 1!important;
}
select:focus, input[type=number]:focus, input[type=password]:focus, input[type=tel]:focus, input[type=text]:focus {
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
select.has-input+.input-field_helper, input[type=number].has-input+.input-field_helper, input[type=password].has-input+.input-field_helper, input[type=tel].has-input+.input-field_helper, input[type=text].has-input+.input-field_helper {
	opacity: 1;
}
input[type=email].error+.input-field_helper, input[type=number].error+.input-field_helper, input[type=password].error+.input-field_helper, input[type=tel].error+.input-field_helper, input[type=text].error+.input-field_helper {
	color: red!important;
}
</style>
