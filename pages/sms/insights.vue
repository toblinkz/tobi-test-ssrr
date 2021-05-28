<template>
	<div class="container-fluid body">
		<div id="msb" class="col-md-2">
			<Sidebar></Sidebar>
		</div>
		<div class="col-md-10">
			<DashboardNavbar></DashboardNavbar>
			<!-- Page header -->
			<div class="page-header">
				<div class="page-header-content">
				</div>
			</div>
			<!-- /page header -->
			<!-- Page container -->
			<div class="page-container">
				<!-- Page content -->
				<div class="page-content">
					<!-- Main content -->
					<div class="content-wrapper">
						<!-- main inner content -->
						<main id="wrapper" class="wrapper">
							<section class="wrapper-bottom-sec">
								<div class="jumbotron" data-pages="parallax">
									<div class="container-fluid container-fixed-lg">
										<div class="inner">
											<div class="mt-20 ">
												<div class="row ">
													<!--													<div class="col-lg-4 mb-20">-->
													<!-- START PANEL -->
													<div class="col-md-12">
														<div class="panel-transparent mt-30">
															<p class="insight text-center"  id="welcome" style="margin-top: 10px;margin-bottom: 10px; font-size: 18px!important;"><i class="entypo-chart-pie"></i> Messaging Insight</p>
															<p class="insight text-center " >View all your messaging insights. <br>Insights captured here include all sent messages.</p>
														</div>
														<div class="panel-body ">
															<div style="display: flex; justify-content: center">
																<select id="date_range" class="select-style mb-30 text-center" @change="getChartDataForADuration($event.target.value)">
																	<option value="today">Today</option>
																	<option value="15 Minutes">Last 15 Minutes</option>
																	<option value="6 Hours">Last 6 Hours</option>
																	<option value="24 Hours">Last 24 Hours</option>
																	<option value="7 Days">Last 7 Days</option>
																	<option value="30 Days">Last 30 Days</option>
																	<option value="This Week">This week</option>
																</select>
															</div>
															<div style="display: flex; justify-content: center">
																<div class="history-pill" >
																	<button class="channel-button " :class="{'all': all_active}" @click="display_all">All</button>
																	<button class="channel-button" :class="{'number-api': number_api_active}" @click="display_number_api">Number API</button>
																	<button class="channel-button" :class="{'dnd': dnd_active}" @click="display_dnd">DND</button>
																	<button class="channel-button" :class="{'generic': generic_active}" @click="display_generic">Generic</button>
																	<button class="channel-button" :class="{'whatsapp': whatsapp_active}" @click="display_whatsapp">Whatsapp</button>
																</div>
															</div>

															<div class="col-md-6">
																   <LineChartPlaceHolder  v-if="!loaded_bar_chart"></LineChartPlaceHolder>
																<div v-else class="graph-card panel-body">
																	<BarChart :chart-data="bar_chart_data" :options="bar_chart_options"></BarChart>
																</div>
															</div>
               <div class="col-md-6">
																<PieChartPlaceHolder v-if="!loaded_bar_chart"></PieChartPlaceHolder>
																<div v-else>
																	<PieChart :chart-data="pie_chart_data" :options="pie_chart_options"></PieChart>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</main>
					</div>
				</div>
			</div>
		</div>
		<VerificationModal></VerificationModal>
	</div>
</template>

<script>
import Sidebar from "../../components/general/Sidebar";
import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
import ClickOutside from "vue-click-outside";
import 'vue2-datepicker/index.css';
import VerificationModal from "~/components/modals/VerificationModal";
import LineChart from "../../components/general/charts/LineChart";
import PieChart from "../../components/general/charts/PieChart";
import ManageCampaignChart from "../../components/general/charts/ManageCampaignChart";
import LineChartPlaceHolder from "../../components/general/LineChartPlaceHolder";
import BarChart from "../../components/general/charts/BarChart";
import PieChartPlaceHolder from "../../components/general/PieChartPlaceHolder";
export default {
	name: "insights",
	middleware: ['auth', 'inactive_user', 'permission'],
	components: {
		PieChartPlaceHolder,
		BarChart,
		LineChartPlaceHolder,
		ManageCampaignChart,
		PieChart,
		LineChart,
		VerificationModal,Sidebar, DashboardNavbar},

	data(){
		return{
			all_active: true,
			number_api_active: false,
			whatsapp_active: false,
			dnd_active: false,
			generic_active: false,
			channel:'',
			duration:'',
			line_chart_data: null,
			array_of_bar_chart_count:'',
			array_of_count_percentages:[20, 40, 40, 0],
			pie_chart_data: null,
			loaded_pie_chart: false,
			loaded_bar_chart: false,

			pie_chart_options:{
		       "legend":{"display":true},
			     	responsive: true, maintainAspectRatio: false
			},
			bar_chart_data:'',

		}
	},
	async mounted() {
		if(this.$store.state.view_verify_page === 'true'){
			this.$modal.show('verification-id-modal');
		}else {
		await this.getChartDataArray();


		}
	},
	computed:{
		canDownloadDeliveryReport(){
			return (this.customer_permissions.includes("view_delivery_report"));
		},
	},
	methods: {

async getChartDataArray(){

	let data = await this.$insight.getChartData();
	let status_data = data.data.message_data.status_data;
	let status_array=[];
	for (status in status_data){
		status_array.push(status_data[status])
	}
	this.array_of_count_percentages = this.$insight.calculatePercentageOfPieChart(status_array,  data.data.message_data.count_data)
	this.array_of_bar_chart_count = status_array
	await this.setChartData();

},
	async setChartData(){
			this.bar_chart_data ={
				labels: ['Sent','Delivered', 'Failed', 'Rejected'],
					datasets: [{
					label:  'Performance of Messages',
					data:  this.array_of_bar_chart_count,
					backgroundColor: [
						'#365899',
						'#226a4a',
						'#ffc107',
						'#FF0000',
					],
					borderColor: [
						'#365899',
						'#226a4a',
						'#ffc107',
						'#FF0000',
					],

				}]
			}
		this.pie_chart_data = {
			labels: ["Delivered","Sent","Failed","Rejected"],
			datasets: [{"backgroundColor":["#365899","#226a4a","#ffc107","#FF0000"],"hoverBackgroundColor":["#365899","#226a4a","#ffc107","#FF0000"],"data":this.array_of_count_percentages}]
		}
			this.loaded_bar_chart = true;
		},
		async getChartDataForADuration(duration){
		  this.duration = duration;
		   try {
		   	this.loaded_bar_chart = false;
						let data = await this.$insight.getFilteredChartData(duration, this.channel);
						this.loaded_bar_chart = true;
						this.updateChartData(data);
						await this.setChartData();
					}catch (e) {

					}
		},

		rowStatusClass(row){
			switch (row.status) {
				case('Sent'):{
					return 'label-sent'
				}
				case ('Delivered'):{
					return 'label-delivered'
				}
				case('Failed'):
				default:{
					return 'label-failed'
				}
				case('Rejected'):{
					return 'label-rejected'
				}
			}

		},
		async display_all(){
		 this.channel = '';
			this.all_active = true;
			this.whatsapp_active = false;
			this.generic_active = false;
			this.dnd_active = false;
			this.number_api_active = false;
			this.loaded_bar_chart = false;
			let data =await this.$insight.getFilteredChartData();
			this.loaded_bar_chart = true;
			this.updateChartData(data);
			await this.setChartData();
		},

		async display_dnd(){
			this.channel = 'dnd';
			this.all_active = false;
			this.whatsapp_active = false;
			this.generic_active = false;
			this.dnd_active = true;
			this.number_api_active = false;
			this.loaded_bar_chart = false;
			let data = await this.$insight.getFilteredChartData(this.duration, this.channel);
			this.loaded_bar_chart = true;
   this.updateChartData(data);
			await this.setChartData();
		},
		async display_generic(){
			this.channel = 'generic';
			this.all_active = false;
			this.whatsapp_active = false;
			this.generic_active = true;
			this.dnd_active = false;
			this.number_api_active = false;
			this.loaded_bar_chart = false;
			let data = await this.$insight.getFilteredChartData(this.duration, this.channel);
			this.loaded_bar_chart = true;
			this.updateChartData(data);
			await this.setChartData();
		},
		async display_number_api(){
			this.channel = 'number_api';
			this.all_active = false;
			this.whatsapp_active = false;
			this.generic_active = false;
			this.dnd_active = false;
			this.number_api_active = true;
			this.loaded_bar_chart = false;
			let data = await this.$insight.getFilteredChartData(this.duration, this.channel);
			this.loaded_bar_chart = true;
			this.updateChartData(data);
			await this.setChartData();
		},
		async display_whatsapp(){
			this.channel = 'whatsapp';
			this.all_active = false;
			this.whatsapp_active = true;
			this.generic_active = false;
			this.dnd_active = false;
			this.number_api_active = false;
			this.loaded_bar_chart = false;
			let data = await this.$insight.getFilteredChartData(this.duration, this.channel);
			this.loaded_bar_chart = true;
		this.updateChartData(data);
			await this.setChartData();
		},
		updateChartData(data){
			this.array_of_count_percentages = this.$insight.calculatePercentageOfPieChart(data.data.data.total_count,  data.data.data.count_data)
			this.array_of_bar_chart_count = data.data.data.total_count;
		},
	},

	directives: {
		ClickOutside
	},

}
</script>

<style scoped>
.select-style{
	padding: 10px 10px;
	outline: none;
	border-radius: 8px;
	border-color: #2D74AC;
	color: #2D74AC;
}
.graph-card{
	border-width: 1px;
	border-radius: 8px;
	background-color: white;
	box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);
}
@media (min-width: 769px){
	.content-wrapper {
		display: table-cell;
		vertical-align: top;
	}
}
@media (min-width: 769px){
	.page-content {
		display: table-row;
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
.page-header:not(.page-header-filled) + .page-container {
	padding-top: 35px;
}
.page-container {
	position: relative;
	/* padding-bottom: 40px; */
}

.jumbotron {
	/* padding-top: 30px; */
	/* padding-bottom: 10px; */
	margin-bottom: 10px;
	color: inherit;
	background-color: #fff;
}
.sms-history-card{
	border-width: 1px;
	border-radius: 8px;
	background-color: white;
	box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);
	margin-bottom: 20px;
	padding: 40px 30px;
}
.filter-card{
	z-index: 10;
	position: absolute;
	padding: 50px 50px;
	border-width: 1px;
	border-radius: 8px;
	background-color: white;
	box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);
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
	/* -webkit-margin-before: 1em; */
	/* -webkit-margin-after: 1em; */
	/* -webkit-margin-start: 0px; */
	/* -webkit-margin-end: 0px; */
	/* display: block; */
}
.p-15 {
	padding: 15px!important;
}
.wide {
	width: 200px !important;
}
.scrollme {
	overflow-y: auto;
}
.table {
	margin-bottom: 0;
}.table > thead > tr > th {
		border-bottom: dotted #ddd !important;
		vertical-align: middle;
		padding: 12px 20px;
		line-height: 1.5384616;
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
.form-control::-webkit-input-placeholder {
	color: #999;
	font-size: 13px;
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
.label-success {
	border-color: #4CAF50;
	color: #fff;
	background-color: #4CAF50;
}
.label-sent {
	border-color: #365899;
	color: #fff;
	background-color: #365899;
}
.label-failed {
	border-color:#ffc107;
	color: #fff;
	background-color: #ffc107;
}
.label-rejected {
	border-color:#FF0000;
	color: #fff;
	background-color:#FF0000;
}
.label-delivered{
	border-color:#226a4a;
	color: #fff;
	background-color:#226a4a;
}

.btn-success {
	color: #fff;
	background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
}
.btn-danger {
	color: #fff;
	background-color: #F44336;
	border-color: #F44336;
}
.label-flat {
	border-width: 2px;
}
.label {
	font-size: 11px;
	padding: 2px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 500;
}
.label {
	display: inline-block;
	border: 1px solid transparent;
	/*text-transform: uppercase;*/
	letter-spacing: 0.1px;
}
.dot {
	height: 10px;
	width: 10px;
	background-color: #bbb;
	border-radius: 50%;
	display: inline-block;
}
.channel-button{
	padding: 2px 10px;
	margin: 2px 0;
	border-radius: 10px;
	outline: none;
	background: #fff;
	color: #A9A9A9;
	border: 1px solid #A9A9A9;
	cursor: pointer;
}
.all.channel-button{
	background: #2D74AC;
	color: #fff;
	border: none;
}

.number-api.channel-button{
	background: #4CAF50;
	color: #fff;
	border: none;
}
.generic.channel-button{
	background: #482C3D;
	color: #fff;
	border: none;
}
.whatsapp.channel-button{
	background: #982649;
	color: #fff;
	border: none;
}
.dnd.channel-button{
	background: #FF5722;
	color: #fff;
	border: none;
}
.all-chat-color{
	color: #2D74AC!important;
}
.whatsapp-chat-color{
	color: #982649 !important;
}
.dnd-chat-color{
	color: #FF5722 !important;
}
.generic-chat-color{
	color: #482C3D!important;
}
.number-api-chat-color{
	color: #4CAF50!important;
}
.filter-button::after{
	content: "";
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #555 transparent transparent transparent;
}

.bx-line {
	border: transparent !important;
}
.form-group {
	margin-bottom: 20px;
}
.form-control:focus {
	border-color: #4DB6AC;
	box-shadow: none;
	outline: 0;
}

.history-pill {
	display: flex;
	flex-direction: row;
	width: 50%;
	justify-content: space-around;
	margin-bottom: 50px;
	margin-left:10px ;
}
.pill-container {
	display: flex;
	flex-direction: row;
}
.section-width{
	width: 45%;
}

.history-pill2 {
	display: flex;
	flex-direction: row;
	width: 30%;
	justify-content: space-around
}
.expand-icon{
	font-size: 15px;
	margin-right: 10px;
	margin-left: 30px;
}
.card-container{
	display: flex;
	flex-direction: row;
}
@media (max-width: 769px){
	.expand-icon{
		font-size: 25px;
		margin-right: 10px;
		margin-left: 0px;
	}
	.card-container{
		display: flex;
		flex-direction: column;
	}
	.section-width{
		width: 100%;
	}
	.left-margin{
		margin-left: 10px;
	}

	.history-pill {
		display: flex;
		flex-direction: column;
		align-content:space-between ;
		margin-bottom: 10px;
		margin-left:0px ;
	}
	.history-pill2 {
		display: flex;
		flex-direction: column;
		align-content:space-between ;
	}
	.pill-container {
		display: flex;
		flex-direction: column;
	}
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
