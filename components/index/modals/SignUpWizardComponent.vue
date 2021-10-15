<template>
	<modal name="signup-wizard-modal"   width="800px" height="700px" @before-close="beforeClose">
     <WelcomeComponent v-if="showStepOne" @showServicePage="moveToStepTwo"></WelcomeComponent>
      <SelectServiceComponent v-if="showStepTwo" @showSenderIdForm="moveToStepThreeA" @showDeviceIdForm = moveToStepThreeB></SelectServiceComponent>
     <SenderIdComponent v-if="showStepThreeA" @showSelectService="moveToStepTwo" @showVirtualAccountSetup="moveToStepFour"></SenderIdComponent>
		    <DeviceIdComponent v-if="showStepThreeB" @showSelectService="moveToStepTwo"  @showVirtualAccountSetup="moveToStepFour"></DeviceIdComponent>
		  		<VirtualAccountComponent @showSuccessModal="moveToStepFive" v-if="showStepFour"></VirtualAccountComponent>
		    <SuccessModal v-if="showStepFive"></SuccessModal>


	</modal>
</template>

<script>
import WelcomeComponent from "./WizardComponents/WelcomeComponent";
import SelectServiceComponent from "./WizardComponents/SelectServiceComponent";
import SenderIdComponent from "./WizardComponents/SenderIdComponent";
import FundWalletComponent from "./WizardComponents/FundWalletComponent";
import SuccessModal from "./WizardComponents/SuccessModal";
import DeviceIdComponent from "./WizardComponents/DeviceIdComponent";
import VirtualAccountComponent from "./WizardComponents/VirtualAccountComponent";
export default {
name: "SignUpWizardComponent",
  components: {
			VirtualAccountComponent,
			SuccessModal,
			DeviceIdComponent, FundWalletComponent, SenderIdComponent, SelectServiceComponent, WelcomeComponent},
  watch: {
		sender_id(value){
			this.sender_id = value;
			this.validateSenderId(value);
		},
	},
	data(){
	  return{
				 showStepOne: true,
				 showStepTwo: false,
				 showStepThreeA: false,
				 showStepThreeB: false,
				 showStepFour: false,
				 showStepFive: false,
					showSenderIdRequestSuccessfulMessage: false,
				 request_button_text: 'Request',
				 isLoading: false,
				 sender_id: '',
				 usecase:'',
				 company:'',
				 hasSenderIdError: false,
				 hasCompanyError: false,
				 hasUseCaseError: false,
				 error_message: [],
				 payment_method:'',
				 payment_gateway:'',
				 amount: '',
		 		customer_country: JSON.parse(localStorage.getItem('user_data')).country,
				 total:'',
				 input_amount: true
			}
	},

	methods:{
		validateSenderId(value) {
			if (value.length < 3){
				this.error_message['sender_id'] = 'The sender id must be at least 3 characters.';
				this.hasSenderIdError = true;
			}else if (value.length > 11) {
				this.error_message['sender_id'] = 'The sender id may not be greater than 11 characters.';
				this.hasSenderIdError = true;
			}
			else {
				this.error_message['sender_id'] = '';
				this.hasSenderIdError = false;

			}
		},

		async beforeClose(){
			await this.$user.updateIsWizardCompleted();
			await this.fetchAndSoreLoggedInData();
		},

		async fetchAndSoreLoggedInData(){
			let data = await this.$user.getLoggedInUserData()
			localStorage.setItem('user_data', JSON.stringify(data.data));
		},
	  close(){
	  	 this.$modal.hide('signup-wizard-modal');
			},
		  moveToStepTwo(){
	  	  this.showStepOne = false;
					 this.showStepTwo = true;
					 this.showStepThreeA = false;
					 this.showStepThreeB = false;
					 this.showStepFour = false;
					 this.showStepFive = false;
				},
		moveToStepThreeA(){
			this.showStepOne = false;
			this.showStepTwo = false;
			this.showStepThreeA = true;
			this.showStepThreeB = false;
			this.showStepFour = false;
			this.showStepFive = false;
		},
		moveToStepThreeB(){
			this.showStepOne = false;
			this.showStepTwo = false;
			this.showStepThreeA = false;
			this.showStepThreeB = true;
			this.showStepFour = false;
			this.showStepFive = false;
		},
		moveToStepFour(){
			if (this.customer_country === "Nigeria"){
				this.showStepOne = false;
				this.showStepTwo = false;
				this.showStepThreeA = false;
				this.showStepThreeB = false;
				this.showStepFour = true;
				this.showStepFive = false;
				return;
			}
			this.showStepOne = false;
			this.showStepTwo = false;
			this.showStepThreeA = false;
			this.showStepThreeB = false;
			this.showStepFour = false;
			this.showStepFive = true;

		},
		moveToStepFive(){
			this.showStepOne = false;
			this.showStepTwo = false;
			this.showStepThreeA = false;
			this.showStepThreeB = false;
			this.showStepFour = false;
			this.showStepFive = true;
		},
	async	requestSenderId()	{
	  	try {
	  		this.request_button_text = '';
					this.isLoading = true;
					await this.$sms.requestSenderId(this.sender_id, JSON.parse(localStorage.getItem('user_data')).country, this.usecase, this.company);
				}catch (e) {
					this.request_button_text = 'Request';
					this.isLoading = false;
					let errors = e.response.data.errors;
					for (let key in errors) {
						switch (key){
							case('name'):{
								errors[key].forEach(err => {
									this.error_message['sender_id'] = err;
									this.hasSenderIdError = true;

								});
								break;
							}
							case ('company'):{
								errors[key].forEach(err => {
									this.error_message['company'] = err;
									this.hasCompanyError = true;

								});
								break;
							}
							case ('usecase'):{
								errors[key].forEach(err => {
									this.error_message['usecase'] = err;
									this.hasUseCaseError = true;

								});
								break;
							}
						}

					}
				}
	  },



	},

}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
