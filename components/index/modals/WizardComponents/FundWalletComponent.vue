<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
			<div class="mt-50">
				<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Setting up your account </p>
				<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here’s a quick guide to helping you set up your account</p>
				<div class="m-l-20 mt-50">
					<img src="/images/stepper/stepper_two.svg" />
				</div>
			</div>
		</div>

		<div  class="flex-item-right" style="padding: 0 30px">
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
				<span style="font-weight: 700; cursor: pointer; color: #365899; margin-bottom: 30px" class="pull-right" @click="moveToLastForm">Skip</span>
			</div>
			<!-- end of Step 2 -->

		</div>
	</div>
</template>

<script>
export default {
	name: "FundWalletComponent",
	data(){
		return{

			request_button_text: 'Request',
			isLoading: false,
			error_message: [],
			payment_method:'',
			payment_gateway:'',
			amount: '',
			total:'',
			input_amount: true
		}
	},

	methods:{

		moveToLastForm(){
			 this.$emit('showSendMessage')
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


}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
