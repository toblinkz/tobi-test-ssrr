<template>
	<transition>
		<modal name="buy-number-modal"  height="auto">
			<div>
				<!-- Modal content-->
				<div>
					<div class="modal-header">
						<button type="button" class="close" @click="close">×</button>
						<h4 class="modal-title"><strong># Rent a Number</strong></h4>
					</div>
					<div v-show="show_country_select" class="modal-body">
							<b>Select the country you want to rent a number from:</b>
						<br />
						<br />
							<form @submit.prevent="getAvailableCountryNumber">
								<div class="row">
									<div class="col-md-7" >
										<select name="country" class="form-control" v-model="country">
											<option value="AT" >Austria ( +43 )</option>
											<option value="AU">Australia ( +61 )</option>
											<option value="BE">Belgium ( +32 )</option>
											<option value="BR">Brazil ( +55 )</option>
											<option value="CA">Canada ( +1 )</option>
											<option value="CN">China ( +86 )</option>
											<option value="CZ">Czechia ( +420 )</option>
											<option value="DK">Denmark ( +45 )</option>
											<option value="FR">France ( +33 )</option>
											<option value="GB">United Kingdom ( +44 )</option>
											<option value="HR">Croatia ( +385 )</option>
											<option value="IL">Israel ( +972 )</option>
											<option value="LT">Lithuania ( +370 )</option>
											<option value="LV">Latvia ( +371 )</option>
											<option value="NL">Netherlands ( +31 )</option>
											<option value="NO">Norway ( +47 )</option>
											<option value="PL">Poland ( +48 )</option>
											<option value="RO">Romania ( +40 )</option>
											<option value="SE">Sweden ( +46 )</option>
											<option value="US">United States of America ( +1 )</option>
										</select>
									</div>
									<div class="col-md-5">
										<button type="submit" class="btn btn-primary m-r-5">
											Proceed
											<span v-show="isLoading">
																			<img src="/images/spinner.svg" height="20px" width="30px"/>
																	</span>
										</button>
									</div>
								</div>
					</form>
						</div>
				</div>

					<div v-show="show_invoice" class="modal-body">
						<div>
							<div >
								<div class="rent-body p-none">
									<table class="table table-hover toke">
										<tbody>
										<tr>
										</tr>
										</tbody>
										<tbody>
										<tr>
											<td><p><strong>Available Phone number:</strong></p></td>
											<td><p>{{this.phone_number}}</p></td>
										</tr>
										<tr>
											<td><p>Service Charge</p></td>
											<td><p>{{this.service_charge}}</p></td>
										</tr>
										<tr>
											<td><p>Monthly Charge</p></td>
											<td><p>{{this.monthly_charge}}</p></td>
										</tr>
										<tr>
											<td><p>Inbound Sms</p></td>
											<td><p>{{this.inbound_sms}}</p></td>
										</tr>
										<tr>
											<td><p><strong>Total amount due:</strong></p></td>
											<td><p><strong>{{this.currency}}{{this.total_amount_due}}</strong></p></td>
										</tr>
										</tbody>
									</table>
								</div>
								<div class="mt-30">
									<p>Your <b>Termii Wallet</b> will be debited of <b>{{this.currency}} {{this.total_amount_due}}</b>.  <br> Please confirm that you’re ok with the price. You will not be able to reverse this action after you’ve purchased the number</p>
									<br>
									<p><input type="checkbox" v-model="auto_renew">Auto renew your rent on this number</p>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" @click="close"> Close </button>
								<button class="btn id-btn-primary" @click="pay"> Proceed </button>
							</div>
						</div>
					</div>

				</div>
		</modal>
	</transition>
</template>

<script>
import PricingDropdown from "@/components/general/dropdown/PricingDropdown";
export default {
	name: "BuyNumberModal",
	components: {PricingDropdown},
	data(){
		return{
			show_invoice : false,
			show_payment_options : false,
			show_country_select: true,
			button_text: 'Get Number',
			country: 'US',
			phone_number: '',
			currency: '',
			service_charge: '',
			monthly_charge:'',
			inbound_sms: '',
			total_amount_due: '',
			payment_methods:'',
			auto_renew:false,
			isLoading: false
		}
	},
	methods: {
		close() {
			this.show_invoice = false;
				this.show_country_select = true;
			this.$modal.hide('buy-number-modal');
		},
		async pay(){
			await this.$axios.$post('number/rent', {
				phone_number: this.phone_number,
				payment_method: this.selected_payment_method,
				rental_cost: this.monthly_charge,
				setup_cost: this.service_charge,
				inbound_sms_cost: this.inbound_sms,
				auto_renew: this.auto_renew,
				country: this.country
			});
			this.close();
			this.$toast.success("Number Successfully rented");

		},
		proceedToPayment(){
			this.show_invoice = false;
			this.show_payment_options = true;
		},
		async getAvailableCountryNumber(){
			this.button_text = '';
			this.isLoading = true;
			try {
				let response = await this.$axios.$get('/number/search', {params: {
						country: this.country
					}});

				this.show_country_select = false;
				this.show_invoice = true;

				this.phone_number = response.data.number;
				this.currency = response.data.currency;
				this.service_charge = response.data.service_charge;
				this.monthly_charge = response.data.monthly_charge;
				this.inbound_sms = response.data.inbound_sms;
				this.total_amount_due = this.service_charge + this.monthly_charge + this.inbound_sms;
				this.button_text = "Search";
				this.isLoading = false;

				await this.getPaymentMethod();
			}catch (e){
				this.button_text = "Search";
				this.isLoading = false;
			}
		},
		async getPaymentMethod(){
			try {
				this.payment_methods = await this.$axios.$get('billing/payment-method');
			}catch (e) {

			}
		},
		async rentNumber(){

		}
	},
	mounted() {
		this.show_invoice = false;
		this.show_payment_options = false;
		this.show_country_select = true;
	}
}
</script>

<style scoped>
.modal-open .modal {
	overflow-x: hidden;
	overflow-y: auto;
}
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
@media (min-width: 769px){
	.modal-dialog {
		width: 600px;
		margin: 30px auto;
	}
}
.modal-dialog {
	position: relative;
}
.modal-content {
	border: 0;
	border-radius: 0;
	margin-top: 100px;
}
.modal-content {
	/* border-radius: 3px; */
	-webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
.modal-content {
	position: relative;
	background-color: #fff;
	border: 1px solid #999;
	border: 1px solid transparent;
	border-radius: 5px;
	-webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
	box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
	background-clip: padding-box;
	outline: 0;
}
.modal-header {
	position: relative;
	padding-bottom: 0;
}
.modal-header {
	padding: 20px;
	border-bottom: 1px solid transparent;
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
}
.close:hover, .close:focus {
	outline: 0;
	opacity: 1;
	filter: alpha(opacity=100);
}
.modal-body {
	padding: 5px 20px 60px 20px;
	position: relative;
}
.row {
	margin-left: 0px;
	margin-right: 0px;
}
#welcome {
	margin-bottom: 15px;
	font-weight: 300;
	letter-spacing: normal;
	font-size: 18px;
	-webkit-font-smoothing: antialiased;
	color: #2c2c2c;
	display: block;
	font-style: normal;
	-webkit-margin-before: 1em;
}
.insight {
	font-size: 13.5px !important;
	letter-spacing: normal !important;
	font-weight: 400 !important;
	line-height: 20px !important;
	margin: 0px 0px 10px 0px;
	font-style: normal;
	white-space: normal;
	color: #333333;
	-webkit-margin-before: 1em;
	-webkit-margin-after: 1em;
	-webkit-margin-start: 0px;
	-webkit-margin-end: 0px;
	display: block;
}
.wide {
	width: 200px !important;
}
.rent-body {
	position: relative;
	/*padding: 20px;*/
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
.table {
	width: 100%;
	max-width: 100%;
	margin-bottom: 0;
}
.table > tbody > tr > td, .table > tfoot > tr > td {
	vertical-align: middle;
	padding: 12px 50px;
	line-height: 1.5384616;
	border-top: 2px solid #ddd;
}
.table >tbody:first-child >tr>td{
	border-top: 0;
}

.modal.in .modal-dialog {
	-webkit-transform: translate(0, 0);
	-ms-transform: translate(0, 0);
	-o-transform: translate(0, 0);
	transform: translate(0, 0);
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

[class^="icon-"], [class*=" icon-"] {
	color: #F10000 !important;
}
.search-button {
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	color: #fff !important;
	padding: 10px 10px;
	border-radius: 5px;
	outline: none;
	cursor: pointer;
}
.form-control {
	display: block;
	width: 100%;
	height: 36px;
	padding: 7px 12px;
	/* font-size: 13px; */
	line-height: 1.5384616;
	color: #333333;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ddd;
	border-radius: 3px;
	-webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

</style>
