<template>
	<div class="mt-70">

			<!-- Page container -->
			<div class="page-container">
				<!-- Page content -->
				<div class="page-content">
					<!-- Main content -->
					<div class="content-wrapper">
						<!-- main inner content -->
						<main id="wrapper" class="wrapper">
							<section class="wrapper-bottom-sec mt-20">
								<div class="jumbotron" data-pages="parallax">
									<div class="container-fluid container-fixed-lg">
										<div class="inner">
											<!-- END BREADCRUMB -->
											<div class="container-sm-height ">
												<div class="row row-sm-height">
													<center>
														<!-- START PANEL -->
														<div class="panel-transparent">
															<p id="welcome" style="margin-top: 10px;margin-bottom: 15px"><i class="entypo-list-add"></i> Set Notification Limits Here</p>
															<p class="insight hidden-xs" style="margin-bottom: 0px !important;">Receive Notifications when you hit your wallet limit!</p>
															<p class="insight hidden-xs">Also set your account to auto-recharge so you don't miss a thing<br></p>
														</div>
													</center>
												</div>
												<!-- END PANEL -->
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-offset-3 col-md-6">
									<div class="p-15 ">
										<div class="row">
											<div class="panel">
												<div class="panel-body">
													<form role="form" method="post"  @submit.prevent="process">
														<div class="form-group">
															<div class="form-group">
																<label>When balance goes below</label>
																<input type="text" class="form-control"  placeholder="Amount" v-model="balance_limit" :class="{'error': hasLimitError}">
																<span class=" error_field_message" v-if="error_message.balance_limit">{{error_message.balance_limit}}</span>
																<br>
																<div class="mt-10 select-class" style=" display: flex">
																	<Switches v-model="enabled_email_notification"    type-bold="true" color="blue" ></Switches>
																	<p  class="m-l-10" :class="{'color': enabled_email_notification}">Get Email Notification</p>
																</div>

																<div class="mt-20" style=" display: flex">
																	<Switches v-model="enabled_auto_recharge"  type-bold="true"  color="blue"></Switches>
																	<p class="m-l-10" :class="{'color': enabled_auto_recharge}">Auto-recharge</p>
																</div>
																<div v-show="enabled_auto_recharge">
																	<div>
																		<label>Auto-recharge with</label>
																		<p class="insight">Minimum amount is {{ minimum_recharge }} and max amount is
																			{{ maximum_recharge }}</p>
																		<input type="text" class="form-control"  placeholder="Amount" v-model="auto_recharge_amount">
																	</div>

																</div>
															</div>
														</div>
														<div class="form-group" v-if="canSetBalanceLimit">
															<button type="submit" class="btn btn-primary" :disabled="isDisabled">
																																		<span v-show="isLoading">
																																			<img src="/static/images/spinner.svg" height="20px" width="30px"/>
																																		</span>
																{{button_text}}
															</button>
														</div>
													</form>
												</div>
											</div>
										</div>
										<!-- Modal -->
									</div>
								</div>
							</section>
						</main>
					</div>
				</div>
			</div>
	</div>
</template>

<script src="https://js.stripe.com/v3/"></script>
<script>
import Sidebar from "../../components/general/Sidebar";
import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
import Swal from 'sweetalert2';
import CryptoJs from 'crypto-js';


import Switches from 'vue-switches';
export default {
	name: "balance-limit",
	middleware: ['auth','permission'],
	components: {DashboardNavbar, Sidebar, Switches},
	data(){
		return{
			balance_limit: '',
			balance_limit_data: '',
			customer_permissions: localStorage.getItem('permissions'),
			isLoading: false,
			button_text:'Save',
			hasLimitError: false,
			error_message:[],
			minimum_recharge:'',
			maximum_recharge:'',
			auto_recharge_amount:'',
			card_name:'',
			card_number:'',
			month_of_expiration:'',
			year_of_expiration:'',
			card_cvv:'',
			enabled: true,
			color: '#394066',
			enabled_auto_recharge: false,
			auto_recharge: false,
			enabled_email_notification: false

		}
	},
	watch:{
		enabled_auto_recharge(value){
			if (value === true){
				this.auto_recharge = true;
					this.enabled_email_notification = true;
			}

			if (value === false){
				this.auto_recharge = false;
				this.auto_recharge_amount = 0;
				if(this.balance_limit_data){
					this.deleteIntent();
				}

			}

		},
		balance_limit(value){
			this.balance_limit = value;
			this.validateLimit(value)
		}
	},
	computed:{
		isDisabled:function (){
				if ((this.balance_limit && this.enabled_email_notification) && !this.enabled_auto_recharge && !this.hasLimitError
				){
					return false
				}else if ((!this.enabled_auto_recharge && !this.enabled_email_notification)
					|| !this.balance_limit || !this.auto_recharge_amount){
					return true
				}
		},
		canSetBalanceLimit(){
			return (this.customer_permissions.includes("set_balance_limit"));
		}
	},
	methods: {
		async fetch(){
			try {
				let response_data = await this.$axios.$get('billing/balance-limit');
				this.balance_limit_data = response_data.data;
				this.balance_limit = this.balance_limit_data.balance_limit;
				this.enabled_email_notification = this.balance_limit_data.notify_by_email;
				this.enabled_auto_recharge = (this.balance_limit_data.payment_intent.recharge_amount)??false;
				this.auto_recharge_amount = this.balance_limit_data.payment_intent.recharge_amount;

			} catch (e) {

			}
	},

		async getTopDetails() {
			try {
				let response = await this.$axios.$get('billing/top-up/plans');
				this.minimum_recharge = response.data.minimum_top_up.amount;

			} catch (e) {

			}
		},
		validateLimit(value) {
			if (isNaN(value)) {
				this.error_message['limit'] = 'The unit limit must be a number.';
				this.hasLimitError = true;
			} else if (value < 0) {
				this.error_message['limit'] = 'The unit limit must be at least 0.';
				this.hasLimitError = true;
			} else {
				this.error_message['limit'] = '';
				this.hasLimitError = false;
			}
		},
		async deleteIntent(){
			try{
				await Swal.fire({
					title: 'Are you sure?',
					text: "You would have to add your card again!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes!'
				}).then(async (result) => {
					if (result.value){
						await this.$axios.$delete('/billing/payment/intent').catch((e)=>{this.$toast.error("An Error occurred while trying to delete this contact");});
						this.$toast.success("Payment Intent deleted successfully");
					}
				});
			}catch (e) {

			}
	},
		async process() {
			try {

				let response_data = await this.$axios.$post('/billing/balance-limit', {
					balance_limit: this.balance_limit,
					auto_recharge: this.auto_recharge,
					recharge_amount: this.auto_recharge_amount
				});

				this.$toast.success(response_data.data.message);

				switch (response_data.data.payment_type) {
					case('paystack'): {

						await Swal.fire({
							title: 'You are about to add your card!',
							text: "Please note that we would need to attempt to debit your card with ₦100, but the amount would be added to your wallet.",
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Proceed'
						}).then(async (result) => {
							if (result.value) {
								window.location.href = response_data.data.url;
							}
						});
						break;
					}
					case('stripe'): {
						if(response_data.data.id) {
							this.$stripe.import().redirectToCheckout({
								sessionId: response_data.data.id
							}).then(function (result) {
								this.$toast.error(result.error.message)
							});
						}else{
							await Swal.fire({
								title: 'Success!',
								text: "Auto recharge details updated",
								icon: 'success',
								showCancelButton: false,
								confirmButtonColor: '#3085d6',
								confirmButtonText: 'Ok'
							})
						}
						break;
					}
				}
			} catch (e) {
				let errors = e.response.data.errors;
				for (let key in errors) {
					errors[key].forEach(err => {
						this.$toast.error(err);
					});
				}
			}
		},

},
	mounted() {
		this.getTopDetails();
		this.fetch();
	}
}
</script>

<style scoped>

.panel {
	border-radius: 8px;
}
.row-form{
	margin-bottom: 20px;
	position: relative;
	padding: 0 1rem 0 0;
	flex-basis: 90%;
	max-width: 90%;
}

.row-form2{
	margin-bottom: 20px;
	position: relative;
	padding: 0 1rem 0 0;
	flex-basis: 20%;
	max-width: 20%;
}
.row-form3{
	margin-bottom: 20px;
	position: relative;
	padding: 0 1rem 0 0;

}
@media (min-width: 769px){
	.content-wrapper {
		display: table-cell;
		vertical-align: top;
	}
}
.content-wrapper {
	width: 100%;
}
@media screen and (min-width: 769px){
	.container .jumbotron, .container-fluid .jumbotron {
		padding-left: 60px;
		padding-right: 60px;
	}
}
@media (min-width: 769px){
	.page-container {
		width: 100%;
		display: table;
		table-layout: fixed;
	}
}

@media screen and (min-width: 769px){
	.jumbotron {
		padding-top: 48px;
		padding-bottom: 48px;
	}
}

.page-container {
	position: relative;
	/* padding-bottom: 40px; */
}
.select-class {
	display: flex;
	flex-direction: row;
	background: #FFFFFF ;
}
.jumbotron {
	/* padding-top: 30px; */
	/* padding-bottom: 10px; */
	margin-bottom: 10px;
	color: inherit;
	background-color: #fff;
}

.row {
	margin-left: 0px;
	margin-right: 0px;
}
#welcome {
	/* margin-bottom: 15px; */
	font-weight: 300;
	letter-spacing: normal;
	font-size: 18px;
	-webkit-font-smoothing: antialiased;
	color: #2c2c2c;
	display: block;
	font-style: normal;
	/* -webkit-margin-before: 1em; */
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

}
.p-15 {
	padding: 15px!important;
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
	/* display: inline-block; */
	max-width: 100%;
	/* margin-bottom: 5px; */
	/* font-weight: bold; */
}
.form-control {
	display: block;
	width: 100%;
	height: 36px;
	padding: 7px 12px;
	font-size: 13px;
	font-weight: 500;
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
.form-control:focus {
	border-color: #ddd;
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(221, 221, 221, 0.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(221, 221, 221, 0.6);
}
.form-control:focus {
	border-color: #4DB6AC;
	outline: 0;
	/* -webkit-box-shadow: none; */
	box-shadow: none;
}
@media (min-width: 769px){
	.page-content {
		display: table-row;
	}
}
.color{
	color: #365899;
}


</style>
