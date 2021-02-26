<template>
	<modal name="account-number-modal" height="auto" width="500">
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" style="font-weight: bold" >Generate New Account Number</h4>
					</div>
						<div class="modal-body">
							<p class="alert insight toke" style="border-radius: 10px;">
							<span>Kindly generate your dedicated account number. New CBN regulations
													mandates that you input your BVN to generate a new account number.
						</span>
							</p>
							<div class="form-group">
								<label>BVN</label>
								<input type="text" class="form-control" :class="{'error ' : hasBvnError}"  v-model="bvn"  placeholder="enter BVN" >
								<span class=" error_field_message" v-if="error_message.bvn">{{error_message.bvn}}</span>

								<br>
								<label>Phone Number</label>
								<input type="text" class="form-control" :class="{'error ' : hasPhoneNumberError}" v-model="phone_number" placeholder="enter phone number associated with your bvn" >
								<span class=" error_field_message" v-if="error_message.phone_number">{{error_message.phone_number}}</span>

								<br>
							</div>
							<div class="mt-20 mb-20">
								<center>

									<a  class="btn id-btn-primary" @click="submitForm" :disabled="isDisabled">
										{{button_text }}
										<span v-show="isLoading" >
															<img src="/images/black_spinner.svg" height="25px" width="35px"/>
													</span>
									</a>
									<p class="mt-20" style="cursor: pointer; color: #365899; " @click="doThisLater">I’ll do this later</p>
								</center>
							</div>
						</div>
			</div>
			</div>
			</div>
	</modal>

</template>

<script>
import ButtonSpinner from "../general/ButtonSpinner";
export default {
	name: "AccountNumberModal",
	components: {ButtonSpinner},
	data() {
		return{
			 bvn: '',
			 phone_number: '',
			 isLoading: false,
			 error_message:[],
			 hasBvnError:false,
			 button_text: 'Create new account',
			 hasPhoneNumberError: false
		}
	},
	computed: {
		isDisabled: function () {
			return (this.hasPhoneNumberError || this.hasBvnError || this.bvn === '' || this.phone_number === '');
		},
	},
	watch: {
		 bvn(value){
		 	 this.validateBvn(value);
			},
		phone_number(value){
		 	this.validatePhoneNumber(value);
		}
	},
	methods: {
		close(){
			this.bvn = '';
			this.phone_number = '';
			this.hasPhoneNumberError = false;
			this.hasBvnError = false;
			this.$modal.hide('account-number-modal');
		},
		async submitForm(){
			this.isLoading = true;
			this.button_text = 'Creating';
			 try {
					await  this.$axios.$post('utility/generate/nuban', {
						identification_number: this.bvn,
						phone_number: this.phone_number
					});
					this.$modal.hide('account-number-modal');
					this.$modal.show('success-modal');
					this.isLoading = false;
					this.button_text = 'Create new account';
				}catch (e) {
					this.isLoading = false;
					this.button_text = 'Create new account';
			 	this.$toast.error(e.response.data.message);
				}
		},
		doThisLater(){
			this.close();
			localStorage.setItem('SAM', true);
		},
		validateBvn(value){
			 if(value.length < 11 || isNaN(value) || value.length > 11){
         this.error_message['bvn'] = 'BVN must contain 11 digits';
         this.hasBvnError = true;
				} else {
					this.error_message['bvn'] = '';
					this.hasBvnError = false;
				}
		},
		validatePhoneNumber(value){
			if ( isNaN(value) || value.length < 10 || value.length > 14) {
				this.error_message['phone_number'] = 'Phone number must be between 10 and 14 digits';
				this.hasPhoneNumberError = true;
			}else {
				this.error_message['phone_number'] = '';
				this.hasPhoneNumberError = false;
			}
		},

	}
}
</script>

<style scoped>
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

}
.modal-title {
	margin: 0;
	line-height: 1.5384616;
}
.error_field_message {
	font-size: 1.2rem;
	color: red;
	display: block;
	margin-top: 5px;
}
button.close {
	padding: 0;
	cursor: pointer;
	background: transparent;
	border: 0;
	-webkit-appearance: none;
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
	padding: 20px 20px 40px 20px;
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
	width: 100%;
	height: 36px;
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
	outline: none;
}
.btn-danger {
	color: #fff;
	background-color: #F44336;
	border-color: #F44336;
}
input[type=text].error {
	border-color: red!important;
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

</style>
