<template>
	<div>
					<p class="mt-20">* This test service is currently only <b>available</b> to <b>Nigerian customers.</b></p>
					<div class="row mt-70">
						<div class="col-md-6">
							<div style="position: relative">
								<input class="number form-control has-input" :class="{ 'error' : hasPhoneNumberError }" v-model="request_payload.phone_number"  type="tel" placeholder="Input your phone number here">
								<span class="input-field_helper">Phone number</span>
								<span class=" error_field_message" v-if="error_message.phone_number">{{error_message.phone_number}}</span>
							</div>
							<div style="position: relative">
								<input class="form-control has-input mt-50" :class="{ 'error' : hasPinAttemptError }" v-model="request_payload.pin_attempts" type="number"  placeholder="Input number of attempts">
								<span class="input-field_helper">Pin attempt</span>
								<span class=" error_field_message" v-if="error_message.pin_attempts">{{error_message.pin_attempts}}</span>
							</div>
							<p class="mt-10" style="font-weight: 300;font-size: 12px;line-height: 17px;">* This is the amount of times a user can input<br>a wrong code</p>
						</div>
						<div class="col-md-6">
							<div style="position: relative">
								<select class="form-control has-input" v-model="request_payload.pin_length">
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
								</select>
								<span class="input-field_helper">Length of OTP</span>
							</div>
							<div style="position: relative">
								<input class="form-control has-input mt-50" :class="{ 'error' : hasPinTimeToLiveError }" v-model="request_payload.pin_time_to_live" type="number" max="60" placeholder="Input code expiry time">
								<span class="input-field_helper">Code expiry time</span>
								<span class=" error_field_message" v-if="error_message.pin_time_to_live">{{error_message.pin_time_to_live}}</span>
								<p  class="mt-10" style="font-weight: 300;font-size: 12px;line-height: 17px; color: #E50300">* This is in minutes not seconds.</p>
							</div>
						</div>
					</div>
					<div class="mt-30" style="background: #f5f5f5; border-radius: 3px; padding: 15px">
						<p class="text-center"><i class="entypo-cc" style="color: #079805 !important;"></i>
							You will be charged from your wallet per test</p>
					</div>
					<a class="mt-30 btn bg-blue" @click="dialNumber" :aria-disabled="isDisabled"  style="width: 100%; padding-top: 15px; padding-bottom: 18px; font-size: 15px">
						{{ dial_button_text }}
						     <span v-show="isLoading">
												 <img src="/images/spinner.svg" height="20px" width="30px"/>
											</span>
					 </a>
	</div>
</template>

<script>
export default {
	name: "FirstStep",
	data(){
		 return{
				request_payload: {
					phone_number: '234',
					pin_attempts: '',
					pin_time_to_live: '',
					pin_length: '',
				},
				otp:'',
				error_message:[],
				hasPhoneNumberError: false,
				hasPinAttemptError: false,
				hasPinTimeToLiveError: false,
				hasOtpError: false,
				show_default_text: true,
				voice_otp_response: '',
				dial_button_text: 'Dial number',
				isLoading: false,
				show_next_step_button: false,
				show_verify_token: false
			}

	},
	watch:{
		'request_payload.phone_number': function (value) {
			this.makeCountryCodeStatic();
			this.validatePhoneNumber(value);
			this.$emit('requestPayload', this.request_payload);
		},
		'request_payload.pin_attempts': function (value) {
			this.validatePinAttempts(value);
			this.$emit('requestPayload', this.request_payload);
		},
		'request_payload.pin_time_to_live': function (value) {
			this.	validatePinTimeToLive(value)
			this.$emit('requestPayload', this.request_payload);
		}

	},
	computed:{

		isDisabled: function () {
			return (!this.request_payload.phone_number || !this.request_payload.pin_attempts || !this.request_payload.pin_length   || !this.request_payload.pin_time_to_live ||
				this.hasPinTimeToLiveError || this.hasPinAttemptError || this.hasPhoneNumberError);
		}

	},
	methods:{

		validatePhoneNumber(value){
			if (isNaN(value) || value.length < 13 || value.length > 13) {
					this.error_message['phone_number'] = 'Phone number must be between 13 digits';
					this.hasPhoneNumberError = true;
				 return;
			}
				this.error_message['phone_number'] = '';
				this.hasPhoneNumberError = false;

		},
		validatePinAttempts(value){
			if(isNaN(value) || value === '0' || value < 1){
				this.error_message['pin_attempts'] = 'Pin attempt must be a digit greater than 0.';
				this.hasPinAttemptError = true;
				return;
			}
			this.error_message['pin_attempts'] = '';
			this.hasPinAttemptError = false;
		},
		validatePinTimeToLive(value){
			if(isNaN(value) || value === '0' || value < 0 || value > 60){
				this.error_message['pin_time_to_live'] = 'Expiry time is between 0 to 60 minutes.';
				this.hasPinTimeToLiveError = true;
				return;
			}
			this.error_message['pin_time_to_live'] = '';
			this.hasPinTimeToLiveError = false
		},
  makeCountryCodeStatic(){
			$('input.number').keyup(function(){
				if (
					($(this).val().length > 0) && ($(this).val().substr(0,3) != '234')
					|| ($(this).val() == '')
				){
					$(this).val('234');
				}
			});
		},
		async dialNumber(){
			try {

				this.isLoading = true;
				this.dial_button_text = '';
				this.voice_otp_response =  await this.$voiceOTP.otpRequest(this.request_payload);

				this.isLoading = false;
				this.dial_button_text = 'Dial number';
				this.$emit('voiceOtpResponse', this.voice_otp_response);

			}catch (e) {
				this.isLoading = false;
				this.dial_button_text = 'Dial number';
				this.$emit('voiceOtpResponse', this.voice_otp_response);
			}
		},


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
h5 {
	width: 100%;
	text-align: center;
	border-bottom: 1px solid #D3D3D3;
	line-height: 0.1em;
	margin: 100px 0 20px;
}

h5 span {
	font-weight: 300;
	background:#fff;
	color: #838080;
	padding:0 10px;
}

</style>
