<template>
	<section class="wrapper-bottom-sec">
		<div class="p-30">
			<div class="row">
				<div class="col-lg-12">
					<h3 class="panel-title">Subscriptions</h3>
					<div class="panel" >
						<div class="panel-body ">
							<div class="mb-20">
								<div >
									<button class="btn btn-primary btn-sm " @click="showModal"  ><i class="fa fa-plus"></i> New Subscription</button>
								</div>


							</div>
							<table class="table data-table table-hover" >
								<thead>
								<tr>
									<th style="width: 10%;">SL#</th>
									<th style="width: 20%;">Subscription Date</th>
									<th style="width: 20%;">Subscription Expiry</th>
									<th style="width: 20%;">Amount</th>
									<th style="width: 20%;">Status</th>

								</tr>
								</thead>
								<tbody>
								<tr v-for="row in subscription_data.data" :key="row.id">
									<td data-label="SL" >#</td>
									<td style="width: 20%;"><p>{{row.subscription_date || 'None'}}</p></td>
									<td style="width: 20%;"><p>{{row.expiry_date}}</p></td>
									<td style="width: 10%;"><p>{{row.rental_cost}}</p></td>
									<td data-label="Status">
										<p class="label label-success">{{ row.status }}</p>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<NumberSubscriptionModal :alias="alias"
																											:country="country"
																											:number_type="number_type"
																											:service_charge="service_charge"
																											:number_status="number_status"
																											:phone_number="phone_number"
																											:payment_method = "payment_method"
																											:number_id =  "number_id"
																											:monthly_charge="monthly_charge"
		></NumberSubscriptionModal>

	</section>
</template>

<script>
import ButtonSpinner from "@/components/general/ButtonSpinner";
import DeviceSubscriptionModal from "~/components/modals/DeviceSubscriptionModal";
import Swal from "sweetalert2";
import Switches from 'vue-switches';
import NumberSubscriptionModal from "@/components/modals/NumberSubscriptionModal";


export default {
	name: "NumberSubscriptions",
	middleware:'auth',
	components: {NumberSubscriptionModal, ButtonSpinner, DeviceSubscriptionModal, Switches},
	data(){
		return{
		}
	},
	watch: {
	},

	props: {
		subscription_data: {
			required: true
		},
		alias: {
			required: true
		},
		country: {
			required: true
		},
		number_type: {
			required: true
		},
		service_charge: {
			required: true
		},
		monthly_charge: {
			required: true
		},
		number_status: {
			required: true
		},
		 phone_number:{
			requires: true
		},
		payment_method:{
			requires:true
		},
		number_id:{
			requires:true
		},

	},
	methods: {
		showModal(){
			this.$modal.show('number-subscription-modal')
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
	},
	mounted() {

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
.select-class {
	display: flex;
	flex-direction: row;
	background: #FFFFFF ;
	/*justify-content: flex-end;*/
}
.switch-color{
	color: #394066;
}
.switch-button-container{
	display: flex;
	float: right;
}
@media (max-width: 769px) {
	.switch-button-container{
		display: flex;
		flex-direction: column;
		float: left;
	}
}

.tooltip{
	position: relative;
	display: inline-block;
}
.tooltip .tooltiptext {
	visibility: hidden;
	width: 150px;
	background-color: #555;
	color: #fff;
	font-size: 10px;
	/*text-align: center;*/
	padding: 5px 5px;
	border-radius: 6px;

	/* Position the tooltip text */
	position: absolute;
	z-index: 1;
	bottom: 125%;
	left: 40%;
	margin-left: -60px;

	/* Fade in tooltip */
	opacity: 0;
	transition: opacity 0.3s;
}
/* Tooltip arrow */
.tooltip .tooltiptext::after {
	content: "";
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
	visibility: visible;
	opacity: 1;
}
</style>

