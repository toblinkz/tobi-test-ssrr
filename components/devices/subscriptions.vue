<template>
	<section class="wrapper-bottom-sec">
		<div class="p-30">
			<div class="row">
				<div class="col-lg-12">
					<div class="panel">
						<div class="panel-body ">
							<h3 class="panel-title">Subscriptions</h3>
							<button class="btn btn-primary btn-sm pull-right" @click="showModal"  ><i class="fa fa-plus"></i> New Subscription</button>
							<table class="table data-table table-hover">
								<thead>
								<tr>
									<th style="width: 10%;">SL#</th>
									<th style="width: 20%;">Last Subscription</th>
									<th style="width: 20%;">Subscription Expiry</th>
									<th style="width: 20%;">Amount</th>
									<th style="width: 20%;">Status</th>

								</tr>
								</thead>
								<tbody>
								<tr v-for="row in subscription_data.data" :key="row.id">
									<td data-label="SL" >#</td>
									<td style="width: 20%;"><p>{{row.last_subscription || 'None'}}</p></td>
									<td style="width: 20%;"><p>{{row.subscription_expiry}}</p></td>
									<td style="width: 10%;"><p>{{row.amount}}</p></td>
									<td data-label="Status">
										<p class="label label-success">Paid</p>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<DeviceSubscriptionModal :device_name="device_name"
																											:monthly_charge="monthly_charge"
																											:cost_per_message="cost_per_message"
																											:device_daily_limit ="device_daily_limit"
																											:monthly_limit="device_monthly_limit"
																											:device_type="device_type"
																											:payment_method = "payment_method"
																											:device_id =  "device_id"
		></DeviceSubscriptionModal>
	</section>
</template>

<script>
import ButtonSpinner from "@/components/general/ButtonSpinner";
import DeviceSubscriptionModal from "~/components/modals/DeviceSubscriptionModal";
import Swal from "sweetalert2";

export default {
name: "DeviceSubscription",
	middleware:'auth',
	components: {ButtonSpinner, DeviceSubscriptionModal},
	props: {
		subscription_data: {
			required: true
		},
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
			requires: true
		},
		payment_method:{
			requires:true
		},
		device_id:{
			requires:true
		},
		device_monthly_limit:{
			requires:true
		}
},
	methods: {
		showModal(){
			this.$modal.show('device-subscription-modal')
		},
		async newSubscription(){
			try{
				await this.$axios.$post('devices/'+ this.device_id + '/subscribe', {
					plan_id: this.plan_id
				});
				await this.fetch();
			} catch (e) {
				await Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'You have pending payment on this device, Contact Account Manager',
				});

			}
		},
}
}

</script>

<style scoped>

.page-header-content {
	margin: auto;
	max-width: 1280px;
	position: relative;
	background-color: inherit;
	padding: 0 20px;
}
.page-header:not(.page-header-filled) + .page-container {
	padding-top: 35px;
}
.page-container {
	margin: auto;
	padding-bottom: 10px;
}
@media (min-width: 769px){
	.page-container {
		width: 100%;
		display: table;
		table-layout: fixed;
	}
}

.table {
	margin-bottom: 0;
}.table > thead > tr > th {
		border-bottom: dotted #ddd !important;
		vertical-align: middle;
		padding: 12px 20px;
		line-height: 1.5384616;
		border-top: 1px solid #f8f8f8;
	}
.table-responsive {
	overflow-x: auto;
	min-height: 0.01%;
}
.table {
	width: 100%;
	max-width: 100%;
	/* margin-bottom: 20px; */
}

.table > tbody > tr > td{
	vertical-align: middle;
	padding: 12px 20px;
	line-height: 1.5384616;
}
th {
	font-weight: 500;
	text-align: left;
}
.table-hover > tbody > tr:hover {
	background-color: #f8f8f8;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
	background-color: transparent;
}
.panel-title {
	position: relative;
	font-size: 21px;
}
.btn-success {
	color: #fff;
	background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
}
.pull-right {
	float: right !important;
}
.btn-sm{
	padding: 6px 11px;
}
h3 {
	text-transform: uppercase;
	display: inline-block;
	letter-spacing: 0.02em;
	font-size: 15px;
	font-weight: 600;
	margin: 0;
	padding: 0;
	line-height: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-text-stroke: 0px grey;
	filter: alpha(opacity=40);
	-webkit-transition: opacity 0.3s ease;
	transition: opacity 0.3s ease;
}
.label {
	font-size: 11px;
	padding: 2px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 600;
	line-height: 1;
	white-space: nowrap;
	text-align: center;
	display: inline-block;
	text-transform: uppercase;
	border: 1px solid transparent;
	letter-spacing: 0.1px;
}
.label-success {
	border-color: #4CAF50;
	color: #fff;
	background-color: #4CAF50;
}
.btn-primary {
	color: #fff;
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
}
.btn-primary:hover {
	color: #fff;
	background-color: #0c7cd5;
	border: 1px solid transparent !important;
}
</style>

