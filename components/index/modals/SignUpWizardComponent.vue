<template>
	<modal name="signup-wizard-modal"   width="800px" height="700px" @before-close="beforeClose">
     <WelcomeComponent v-if="showStepOne" @showServicePage="moveToStepTwo"></WelcomeComponent>
     <SelectServiceComponent v-if="showStepTwo" @showSenderIdForm="moveToStepThreeA" @showDeviceIdForm = moveToStepThreeB></SelectServiceComponent>
     <SenderIdComponent v-if="showStepThreeA" @showSelectService="moveToStepTwo" @showFundWalletForm="moveToStepFour"></SenderIdComponent>
		    <DeviceIdComponent v-if="showStepThreeB" @showSelectService="moveToStepTwo"  @showFundWalletForm="moveToStepFour"></DeviceIdComponent>
     <FundWalletComponent v-if="showStepFour" @showSenderIdForm="moveToStepThreeA" @showSendMessage="moveToStepFive"></FundWalletComponent>


	</modal>
</template>

<script>
import WelcomeComponent from "./WizardComponents/WelcomeComponent";
import SelectServiceComponent from "./WizardComponents/SelectServiceComponent";
import SenderIdComponent from "./WizardComponents/SenderIdComponent";
import FundWalletComponent from "./WizardComponents/FundWalletComponent";
import SendMessageComponent from "./WizardComponents/SendMessageComponent";
import DeviceIdComponent from "./WizardComponents/DeviceIdComponent";
export default {
name: "SignUpWizardComponent",
  components: {
			DeviceIdComponent,
			SendMessageComponent, FundWalletComponent, SenderIdComponent, SelectServiceComponent, WelcomeComponent},
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
		beforeClose(){
			localStorage.setItem('doneWithTour', 'yeah');
		},
	  close(){
				 localStorage.setItem('doneWithTour', 'yeah');
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
			this.showStepOne = false;
			this.showStepTwo = false;
			this.showStepThreeA = false;
			this.showStepThreeB = false;
			this.showStepFour = true;
			this.showStepFive = false;
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
		async setPaymentMethod(){
			 try {
					 let payment_data = await this.$billing.getPaymentMethod();
					 this.payment_method = payment_data;
					 this.payment_gateway = payment_data.data[0].settings;
					 console.log('lop', this.payment_gateway)
				}catch (e) {

				}
		},
		async onFundingOptionChange(event){
    if (event.target.value === "1"){
    	 this.input_amount = true;
    	 return;
				}
    this.input_amount = false;
			let top_up_data = await this.$billing.getBundledTopUpData();
			this.amount = top_up_data.data.bundled_top_up.amount_currency;
			this.total = top_up_data.data.bundled_top_up.amount;
		},
		onPaymentMethodChange(event){

		},
		async getBundledTopUpData(){
			 try {
					 let top_up_data = await this.$billing.getBundledTopUpData();
					 this.total = top_up_data.data.bundled_top_up.amount;
				}catch (e) {

				}
		},
		async getExchangeRate(){
			 try{
			 	let exchange_data = await this.$billing.getExchangeRate(this.amount);
			 	this.total = exchange_data.amount;
				}catch (e) {
					let errors = e.response.data.errors;
					for (let key in errors) {
						errors[key].forEach(err => {
							this.$toast.error(err);
						});
					}
				}
		}
	},
	mounted() {
	this.setPaymentMethod();
	}
}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
