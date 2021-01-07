<template>

	<!-- Modal -->
	<modal name="device-subscription-modal" height="auto">
		<div  tabindex="-1" role="dialog" style="display: block;
    padding-left: 9px;">
			<div  role="document" >
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title"><strong># New Subscription</strong></h4>
					</div>
					<form method="post" @submit.prevent="deviceSubscribe">
						<div  class="modal-body">
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
												<td><p><strong>Device:</strong></p></td>
												<td><p>{{device_name}}</p></td>
											</tr>
											<tr>
												<td><p>Device Type</p></td>
												<td><p>{{device_type}}</p></td>
											</tr>
											<tr>
												<td><p>Monthly Charge</p></td>
												<td><p>{{monthly_charge}}</p></td>
											</tr>
											<tr>
												<td><p>Cost per Message</p></td>
												<td><p>{{cost_per_message}}</p></td>
											</tr>
											<tr>
												<td><p>Monthly Limit</p></td>
												<td><p>{{cost_per_message}}</p></td>
											</tr>
											<tr>
												<td><p>Daily Limit</p></td>
												<td><p>{{device_daily_limit}}</p></td>
											</tr>
											</tbody>
										</table>
									</div>
									<div class="mt-30">
										<p>Your <b>Termii Wallet</b> will be debited of <b>{{this.monthly_charge}}</b>.  <br> Please confirm that you’re ok with the price. You will not be able to reverse this action after you’ve purchased the device</p>
										<br>
										<p><input type="checkbox" v-model="auto_renew">Auto renew your subscription on this device</p>
									</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-default" @click="close"> Close </button>
									<button class="btn id-btn-primary" type="submit"> Proceed </button>
								</div>
							</div>
						</div>

					</form>
				</div>
			</div>
		</div>
	</modal>

</template>

<script>
import ButtonSpinner from "../general/ButtonSpinner";
import {mapGetters} from "vuex";
export default {
	name: "DeviceSubscriptionModal",

	props: {
		device_name: {
			required: true
		},
		monthly_charge: {
			required: true
		},
		cost_per_message: {
			required: true
		},
		device_daily_limit: {
			required: true
		},
		monthly_limit: {
			required: true
		},
		device_type:{
			required: true
		},
		payment_method:{
			required:true
		},
		device_id:{
			required:true
		}
	},
	data(){
		return{
			payment_gateway: 'wallet',
			auto_renew:false,
		}
	},

	methods: {
		close() {
			this.$modal.hide('device-subscription-modal');
		},

		async deviceSubscribe() {

			try {
			let data =	await this.$axios.post(`devices/${this.device_id}/subscribe`, {
					payment_method: this.payment_gateway,
					auto_renew: this.auto_renew
				});
				this.close();
				if(data.data.url) {
					window.location.href = data.data.url;
				}
				if(data.data) {
					this.$stripe.import().redirectToCheckout({
						sessionId: data.data
					}).then(function (result) {
						this.$toast.error(result.error.message)
					});
				}

				this.$toast.success("Request sent successfully");
			} catch (e) {

				let errors = e.response.data.errors;
				for (let key in errors) {
						this.$toast.error(errors[key]);

				}
			}
		},
		onChange(event){
			this.payment_gateway = event.target.value;
			console.log(event.target.value)
		}
	}
}
</script>

<style scoped>


textarea.form-control {
	height: auto;
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
	padding: 20px;
	text-align: right;
	border-top: 1px solid transparent;
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
