<template>
	<modal name="account-number-modal" height="auto" width="500" :resizable="true" :clickToClose="false">
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" style="font-weight: bold" >Generate a Dedicated Account Number</h4>
					</div>
						<div class="modal-body">
							<p class="alert insight toke" style="border-radius: 10px; padding: 5px">
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
					await this.getNubanAccount();
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
  async getNubanAccount(){
			 this.$emit('nuban_account');
		}
	}
}
</script>

<style scoped src="@/assets/css/modal/modal.css";>

</style>
