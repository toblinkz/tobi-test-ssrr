<template>
	<div>
			<!-- Page header -->
			<div class="page-header">
				<div class="page-header-content">
				</div>
			</div>
			<!-- /page header -->
			<div class="page-container">
				<!-- Page content -->
				<div class="page-content">
					<!-- Main content -->
					<div class="content-wrapper">
						<!-- main inner content -->
						<main id="wrapper" class="wrapper">
							<div class="col-md-12 mt-20">
								<h2  style="margin-left: 10px; padding-top: 20px"><b>Number - {{number}}</b></h2>
								<div style="padding: 10px;">
									<div class="col-md-4 alert toke">
										<p class="text-semibold"><i class="entypo-light-up" style="color: #bbb !important;"></i>
											Total messages sent
										</p>
										<!-- START PANEL -->
										<p class="alert insight wd">
											<span>{{total_messages_sent_all_time}}</span>
										</p>
										<!-- END PANEL -->
									</div>

									<div class="col-md-4 alert toke">
										<p class="text-semibold"><i class="entypo-light-down" style="color: #bbb !important;"></i>
											Messages sent today
										</p>
										<!-- START PANEL -->
										<p class="alert insight wd">
											<span>{{total_messages_sent_today}}</span>
										</p>
										<!-- END PANEL -->
									</div>

									<div class="col-md-4 alert toke">
										<p class="text-semibold"><i class="entypo-light-up" style="color: #bbb !important;"></i>
											Messages sent this month
										</p>
										<!-- START PANEL -->
										<p class="alert insight wd">
											<span>{{total_messages_sent_this_month}}</span>
										</p>
										<!-- END PANEL -->
									</div>
								</div>
								<NumberSubscriptions :subscription_data="response_data"
																													:alias="alias"
																													:country="country"
																													:number_type="number_type"
																													:service_charge="service_charge"
																													:number_status="number_status"
																													:phone_number="number"
																													:payment_method = "payment_method"
																													:number_id =  "number_id"
																													:monthly_charge="monthly_charge"
								>
								</NumberSubscriptions>
							</div>

						</main>
					</div>
					<VerificationModal></VerificationModal>
      <UpdateCompanyNameModal></UpdateCompanyNameModal>
				</div>
			</div>
	</div>
</template>

<script>
import Sidebar from "../../../components/general/Sidebar";
import DashboardNavbar from "../../../components/general/navbar/DashboardNavbar";
import Swal from "sweetalert2";
import VerificationModal from "~/components/modals/VerificationModal";
import DeviceSubscriptionModal from "~/components/modals/DeviceSubscriptionModal";
import DeviceSubscription from "~/components/devices/subscriptions";
import DeviceTemplate from "@/components/devices/templates";
import NumberSubscriptions from "@/components/number/Subscriptions";
import UpdateCompanyNameModal from "../../../components/index/modals/UpdateCompanyNameModal";
export default {
	name: "subscriptions",
	middleware: ['auth', 'inactive_user', 'permission'],
	components: {
		UpdateCompanyNameModal,
		NumberSubscriptions,
		DeviceTemplate,
		DeviceSubscription, VerificationModal,DashboardNavbar, Sidebar, DeviceSubscriptionModal},
	data(){
		return{
			number_id: this.$route.params.id,
			alias: '',
			country: '',
			number_type:'',
			service_charge:'',
			number_status: '',
			number: '',
			monthly_charge: '',
			total_messages_sent_all_time:'',
			total_messages_sent_this_month:'',
			total_messages_sent_today:'',
			device_monthly_limit: '',
			cost_per_message: '',
			device_type: '',
			phone_number: this.$route.params.phone_number,
			template_data: '',
			response_data:[],
			new_subscription: false,
			plan_id:"",
			page_url: '',
			payment_url:"",
			payment_method : [],
			button_text: 'Pay Now',
			showIcon: true,
			isLoading: false,
		}
	},
	methods: {
		templateExists(){
			return (this.template_data.length !== 0);
		},
		async fetch(){
			try {
				//get subscriptions
				let data =  await this.$axios.$get('number/rent/'+ this.number_id + '/subscriptions');
				this.response_data = data;
				console.log(data.rented_number.country)
				this.alias = data.rented_number.alias;
				this.number = data.rented_number.phone_number;
				this.country = data.rented_number.country;
				this.number_type = data.rented_number.number_type;
				this.service_charge = data.rented_number.service_charge;
				this.number_status = data.rented_number.status;
				this.monthly_charge = data.rented_number.monthly_charge;
			} catch (e) {

			}
		},

		showPayNowButton(row){
			return (row.payment_status === 'PENDING')
		},
		showPaidLabel(row){
			return(row.payment_status === 'PAID')
		},

	},
	mounted() {
		if(this.$store.state.view_verify_page === 'true') {
			this.$modal.show('verification-id-modal');
		}else {
			this.page_url = window.location.href
			 this.fetch();
		}

	},

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
.first-card {
	color: #ffffff;
	background: linear-gradient(-48deg,#0dcbe5 -30%,#365899 60%)!important;
	border-radius: 5px;
	border: 2px;
	display: flex;
}
.second-card {
	background: #0DCBE5;
	color: #ffffff;
	border-radius: 5px;
	border: 2px;
	display: flex;
}
.third-card {
	background: linear-gradient(287.28deg, #59B68D -16.81%, #048049 111.69%);
	color: #ffffff;
	border: 2px;
	border-radius: 5px;
	display: flex;
}
.m-4 {
	margin: 1rem;
}
.px-3 {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
}
.py-10 {
	padding-top: 2.5rem;
	padding-bottom: 2.5rem;
}
.py-8 {
	padding-top: 2rem;
	padding-bottom: 2rem;
}
.pr-12 {
	padding-right: 10rem;
}

.stats-container{
	padding: 5px 15px 15px 1px;
	display: flex; flex-direction: row;
}
@media (max-width: 769px){
	.stats-container {
		display: flex; flex-direction: column;
	}
}
.device-padding{
	padding: 20px 5px 5px 5px!important;
}


.toke {
	background-color: #f5f5f5;
	border-color: #efefef;
	color: #595959 !important;
}

.mb-30 {
	margin-bottom: 30px !important;
}

.alert > p, .alert > ul {
	margin-bottom: 0;
}

.alert {
	position: relative;
	padding: 15px;
	margin-bottom: 20px;
	border: 1px solid transparent;
	border-radius: 3px;
}

.alert {
	position: relative;
	padding-left: 20px;
	padding-right: 20px;
}

.alert > p + p {
	margin-top: 5px;
}

.alert > p, .alert > ul {
	margin-bottom: 0;
}

</style>
