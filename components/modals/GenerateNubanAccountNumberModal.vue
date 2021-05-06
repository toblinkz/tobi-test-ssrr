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
													mandates that you input your BVN to generate a new account number.<br>
								<b>NB:</b> ₦10 would be debited for this action
						</span>
							</p>
							<div class="form-group">
								<label>BVN</label>
								<input type="text" class="form-control" :class="{'error ' : hasBvnError}"  v-model="bvn"  placeholder="enter BVN" >
								<span class=" error_field_message" v-if="error_message.bvn">{{error_message.bvn}}</span>

								<br>
								 <label>Date of Birth</label>
								 <date-picker v-model="date_of_birth" value-type="YYYY-MM-DD " type="date" style="width: 100%" placeholder="Select date of birth"  confirm></date-picker>

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
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
export default {
	name: "AccountNumberModal",
	components: {ButtonSpinner, DatePicker},
	data() {
		return{
			 bvn: '',
			 date_of_birth: null,
			 isLoading: false,
			 error_message:[],
			 hasBvnError:false,
			 button_text: 'Create new account',
		}
	},
	computed: {
		isDisabled: function () {
			return ( this.hasBvnError || this.bvn === '' || this.date_of_birth === null );
		},
	},
	watch: {
		 bvn(value){
		 	 this.validateBvn(value);
			},
	},
	methods: {
		close(){
			this.bvn = '';
			this.hasBvnError = false;
			this.$modal.hide('account-number-modal');
		},
		async submitForm(){
			this.isLoading = true;
			this.button_text = 'Creating';
			 try {
					await this.$utility.generateNubanAccount(this.bvn, this.date_of_birth);
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
  async getNubanAccount(){
			 this.$emit('nuban_account');
		}
	}
}
</script>

<style scoped src="@/assets/css/modal/modal.css";>

</style>
