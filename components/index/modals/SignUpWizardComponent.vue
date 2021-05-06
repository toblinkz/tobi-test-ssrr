<template>
	<modal name="signup-wizard-modal"   width="800px" height="auto">
		<div class="flex-container">
			<!-- Step 1			-->
				<div v-if="showStepOne" class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
					<div class="mt-50">
						<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Setting up your account </p>
						<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here’s a quick guide to helping you set up your account</p>

						<div class="m-l-20 mt-50">
							<img src="/images/stepper/stepper_one.svg" />
						</div>

					</div>
				</div>
				<div  v-if="showSenderIdRequestSuccessfulMessage" class="flex-item-right" style="padding: 0 30px">
					<div class="mt-100 mb-150">
						<center>
							<img src="/images/check.svg" width="250"/>
							<div class="mt-20">
								<p style="font-weight: bold">Request Successful</p>
								<div class="mb-20" >
									<a  @click="close"  class="btn btn-danger mt-20 m-r-20">
										Skip
									</a>
									<a class="btn btn-primary mt-20">Continue</a>
								</div>
							</div>
						</center>
					</div>
				</div>
			<div  v-if="showStepOne" class="flex-item-right" style="padding: 0 30px">
										<div>
						<div class="mt-50" style="background-color:rgba(13, 203, 229, 0.3); padding: 15px; border-radius: 5px">
							<p style="font-weight: bold; color: #365899">Step 1 of 3: Request Sender ID</p>
						</div>
						<p class="mt-30" style="color: #365899; font-weight: bold">Use Default ID</p>
						<form  method="post"   >
							<div class="mt-20">
								<div class="form-group">
									<div class="mt-20">
										<label>Sender ID For Sms</label>
										<input type="text" v-model="sender_id" class="form-control" placeholder="e.g. Termii (Ensure your ID is not more than 9 characters)"  >
										<span class=" error_field_message" v-if="error_message.sender_id">{{error_message.sender_id}}</span>
									</div>
									<div class="mt-20">
										<label>Company</label>
										<input type="text" v-model="company" class="form-control"  placeholder="e.g. Termii" >
										<span class=" error_field_message" v-if="error_message.company">{{error_message.company}}</span>
									</div>
									<div class="mt-20">
										<label>Use Case</label>
										<textarea type="text" v-model="usecase" class="form-control" rows="3"  placeholder="e.g. Hello dear is a sample of the message you will be sending with Termii"  ></textarea>
										<span class=" error_field_message" v-if="error_message.usecase">{{error_message.usecase}}</span>
									</div>
									<div class="mt-30">
										<p><b>NB:</b> Sender ID registration are approved only on weekdays and takes 24 hours to activate across all telcos in your country. If you need to try out the sms feature during weekends without an approved ID, please</p>
									</div>
									<div class="mt-30">
										<a class="bg-blue"  @click="requestSenderId">
											{{request_button_text}}
											<span v-show="isLoading" >
															<img src="/images/black_spinner.svg" height="20px" width="30px"/>
													</span>
										</a>
									</div>
								</div>
							</div>
						</form>
						<div class="mt-30 ">
<!--							<span style="font-weight: 700; cursor: pointer; color: #F44336" class="text-left" @click="moveToStepTwo"></span>-->
							<span style="font-weight: 700; cursor: pointer; color: #365899; margin-bottom: 30px " class="pull-right" @click="moveToStepTwo">Skip</span>
						</div>
					</div>
				</div>
			<!--end of  Step 1 -->

			<!-- Step 2 -->
			<div v-if="showStepTwo"  class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
				<div class="mt-50">
					<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Setting up your account </p>
					<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here’s a quick guide to helping you set up your account</p>
				</div>
				<div class="m-l-20 mt-50">
					<img src="/images/stepper/stepper_two.svg" />
				</div>
			</div>
			<div v-if="showStepTwo" class="flex-item-right" style="padding: 0 30px">
				<div >
					<div class="mt-50" style="background-color:rgba(13, 203, 229, 0.3); padding: 15px; border-radius: 5px">
						<p style="font-weight: bold; color: #365899">Step 2 of 3: Fund Your Wallet</p>
					</div>
					<form  method="post"   >
						<div class="mt-20">
							<div class="form-group">
								<div class="mt-20">
									<label>Choose Funding Option</label>
									<Select class="form-control" @change="onFundingOptionChange($event)">
										 <option value="1">Regular Top Up</option>
									 	<option value="2">Bundled Top Up</option>
									</Select>
								</div>
								<div class="mt-20" v-if="input_amount">
									<label>Enter Amount</label>
									<input type="text" v-model="amount" class="form-control" placeholder="Amount" @focusout="getExchangeRate($event)">
								</div>
								<div class="mt-20">
									<label>Payment Options</label>
									<select @change="onPaymentMethodChange($event)" class="form-control">
										<option v-for="item in payment_method.data" :value="item.settings">{{item.name}}</option>
									</select>
								</div>
								<div class="mt-20 alert toke" style="padding: 10px; border-radius: 5px">
									<p class="text-semibold"><i class="entypo-cc" style="color: #079805 !important;"></i> Total:</p>
									<p>  <b>{{total}}</b>  </p>
								</div>
								<div class="mt-30">
									<p><b>Notice:</b></p>
									<p>All payments would be remitted in Naira, but your balance would be displayed in your local currency.</p>
								</div>
								<div class="mt-30">
									<a class="bg-blue">Fund Wallet</a>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="mt-30 mb-30">
<!--					<span style="font-weight: 700; cursor: pointer; color: #F44336" class="text-left" @click="close">Close</span>-->
					<span style="font-weight: 700; cursor: pointer; color: #365899; margin-bottom: 30px" class="pull-right" @click="moveToStepThree">Skip</span>
				</div>
				<!-- end of Step 2 -->

			</div>
			<!--Step 3 -->
			<div v-if="showStepThree"  class="flex-item-left hidden-xs " style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
				<div class="mt-50">
					<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Setting up your account </p>
					<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here’s a quick guide to helping you set up your account</p>
				</div>
				<div class="m-l-20 mt-50 mb-150">
					<img src="/images/stepper/stepper_three.svg" />
				</div>
			</div>
			<div v-if="showStepThree" class="flex-item-right " style="padding: 0 30px; height: 80vh">
				<div>
					<div class="mt-50" style="background-color:rgba(13, 203, 229, 0.3); padding: 15px; border-radius: 5px">
						<p style="font-weight: bold; color: #365899">Step 3 of 3: Start Sending Messages</p>
					</div>
					<form  method="post"   >
						<div>
							<div class="form-group">
								<center>
									<div>
										<img src="/images/step3_art.png" />
									</div>

									<p>Start sending messages to your customers faster, and with a better accuracy.</p>
									<div class="mt-40">
										<nuxt-link to="/message/select-type" class="bg-blue m-r-10">Send on Dashboard</nuxt-link>
										<a href="https://developers.termii.com" target="_blank" class="bg-green">Send via API</a>
									</div>
								</center>

							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
export default {
name: "SignUpWizardComponent",
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
				 showStepThree: false,
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
	  close(){
	  	 this.$modal.hide('signup-wizard-modal');
			},
		  moveToStepTwo(){
	  	  this.showStepOne = false;
					 this.showStepTwo = true;
					 this.showStepThree = false;
				},
		moveToStepThree(){
			this.showStepOne = false;
			this.showStepTwo = false;
			this.showStepThree = true;
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
					 console.log('hghu', top_up_data);

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
	flex: 30%;
}

.flex-item-right {
	flex: 70%;
}
ul{
	list-style: none;
}
.nav-menu{
	 position: absolute;
	 top: 20%;

}
.nav-menu ul {
	padding-left: 50px;
	position: relative;
}
.nav-menu ul::after{
	content: "";
	position: absolute;
	width: 2px;
	height: calc(100% - 50px);
	left: 40px;
	top: 0;
	background: #0DCBE5;
	margin-top: 30px;
}
.nav-menu ul li {
	padding: 40px 0 40px 20px;
}
.nav-menu ul li a{
	text-decoration: none;
	position: relative;
	color: #FFFFFF;
}
.nav-menu ul li a::before{
	content: "";
	position: absolute;
	background: #365899;
	width: 30px;
	height: 30px;
	left: -30px;
	/*top: 50%;*/
	transform: translate(-50%);
	border-radius: 50px;
	border: 1px solid #0DCBE5;
}
</style>
