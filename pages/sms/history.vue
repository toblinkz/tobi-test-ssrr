<template>
	<div class="container-fluid body">
		<div id="msb" class="col-md-2">
			<Sidebar class="hidden-xs"></Sidebar>
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
															<p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-chart-pie"></i> Messaging Insight</p>
															<p class="insight">View all your messaging insights. <br>Insights captured here include all sent messages.</p>
														</div>
														<div class="panel-body text-center">
															<SmsHistoryChart class="hidden-xs"></SmsHistoryChart>
														</div>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-md-12" >
									<div class="col-sm-12">
										<div class="mb-20">
											<div style="display: flex; flex-direction: row;">
												<div class="mb-50 m-l-10" style="display: flex; flex-direction: row; width: 50%; justify-content: space-around">
													<button class="channel-button " :class="{'all': all_active}" @click="display_all">All</button>
													<button class="channel-button" :class="{'number-api': number_api_active}" @click="display_number_api">Number API</button>
													<button class="channel-button" :class="{'dnd': dnd_active}" @click="display_dnd">DND</button>
													<button class="channel-button" :class="{'generic': generic_active}" @click="display_generic">Generic</button>
													<button class="channel-button" :class="{'whatsapp': whatsapp_active}" @click="display_whatsapp">Whatsapp</button>
												</div>
												<div style="width: 20%"></div>
												<div style="display: flex; flex-direction: row; width: 30%; justify-content: space-around">
													<div  v-click-outside="hideDrop">
														<a @click="showFilterModal" class="btn label-success wd-100 bx-line " >
															<i class="fa fa-filter m-r-5"></i>Filter
														</a>
														<div class="filter-card mt-10"  v-show="filter_active">
															<form @submit.prevent="filterSmsHistory" role="form" method="get" >
																<div>
																	<input type="text" placeholder="Phone Number" class="form-control" v-model="phone_number">
																</div>
																<div class="mt-20">
																	<date-picker v-model="date_time" value-type="YYYY-MM-DD " type="date" range style="width: 100%" placeholder="Select date range"  confirm></date-picker>
																</div>
																<div class="mt-20">
																	<button type="submit" class="btn btn-success wd-100 bx-line" :disabled="isDisabled">
																		<i class="fa fa-search" v-show="showIcon"></i> {{searchText}}
																		<span v-show="isLoading">
																				<img src="/images/spinner.svg" height="20px" width="80px"/>
																		</span>
																	</button>
																</div>
															 </form>
																	</div>
																</div>
																<center> <button @click="showExportModal" class="btn btn-primary wd-100 bx-line" ><i class="fa fa-level-down"></i> Download report in excel</button></center>
															</div>
														</div>

											<TableVuePlaceHolder v-if="!show_shimmer">

											</TableVuePlaceHolder>
														<div class="mb-10" style="display: flex; flex-direction: row" v-show="show_shimmer">
															<span class="" style="width: 50%; font-size: 15px"><i class="fa fa-circle  m-r-10 m-l-30" :class="{'all-chat-color': all_active, 'number-api-chat-color': number_api_active, 'dnd-chat-color': dnd_active, 'generic-chat-color':generic_active, 'whatsapp-chat-color': whatsapp_active}" style="color: #2D74AC"></i>Description</span>
															<span style="width: 15%; font-size: 15px">Receiver</span>
															<span style="width: 10%;font-size: 15px">Pages</span>
															<span style="width: 25%;font-size: 15px">Status</span>
														</div>
														<div class="m-l-10 " style="border-bottom: dotted #ddd!important;"></div>
													</div>
													<div class="row" v-for="row in messages_sent.data" :key="row.id">
														<div class="sms-history-card" style="display: flex; flex-direction: row">
															<div><i class="entypo-chat" :class="{'all-chat-color': all_active, 'number-api-chat-color': number_api_active, 'dnd-chat-color': dnd_active, 'generic-chat-color':generic_active, 'whatsapp-chat-color': whatsapp_active}" style="font-size: 20px; color: green; width: 5%"></i></div>
															<div style="width: 45%">
																<div class="bold m-l-10" style="font-size: 16px; font-weight: 500" >Outgoing Message from {{ row.sender }}</div>
																<div class="m-t-5 m-l-10">	<span style="color: #898989">{{ row.created_at }}</span> 	<span class="m-l-10" style="color: #898989">Channel: {{ row.channel }}</span></div>
																<div class="m-t-5 m-l-10" v-if="row.id !== message_id">{{row.message_abbreviation}}</div>
																<div class="m-t-5 m-l-10" v-if="row.id === message_id">{{row.message}}</div>
															</div>
															<div style="width: 20%">
																<div >{{row.receiver }}</div>
															</div>
															<div style="width: 10%">
																<div>{{ row.amount }}</div>
															</div>
															<div style="width: 20%">
																<div class="label label-success">{{row.status }}</div>
															</div>
															<div>
																<span style="width: 25%;font-size: 15px" @click="expandMessageSent(row)">
																		<i class="fa fa-expand m-r-10 m-l-30" style="color: #2D74AC; cursor: pointer">
																		</i>
																</span>
															</div>
														</div>
										</div>
									</div>
								</div>
								<Pagination
									:page="page"
									:total_page="total_page"
									:on-page-change="onPageChange"
									v-show="showPagination === true"
								>
								</Pagination>
							</section>
						</main>
					</div>
				</div>
			</div>
		</div>
		<ExportModal></ExportModal>
		<SmsHistoryModal v-if="showSmsModal" @close="closeModal" :sms_id="sms_history_id"></SmsHistoryModal>
		<VerificationModal></VerificationModal>
	</div>
</template>

<script>
import Sidebar from "../../components/general/Sidebar";
import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
import SmsHistoryModal from "../../components/modals/SmsHistoryModal";
import Pagination from "../../components/general/Pagination";
import DatePicker from "vue2-datepicker";
import ClickOutside from "vue-click-outside";
import 'vue2-datepicker/index.css';
import SmsHistoryChart from "../../components/general/charts/SmsHistoryChart";
import TableVuePlaceHolder from "../../components/general/TableVuePlaceHolder";
import ExportModal from "../../components/modals/SmsHistoryExportModal";
import VerificationModal from "~/components/modals/VerificationModal";
export default {
	name: "history",
	middleware: ['auth', 'inactive_user'],
	components: {
		VerificationModal,
		ExportModal,
		TableVuePlaceHolder,
		Pagination, SmsHistoryModal, DashboardNavbar, Sidebar, DatePicker,  SmsHistoryChart},

	data(){
		return{
			isShow: false,
			showIcon: true,
			isLoading: false,
			searchText: 'Search',
			date_time: null,
			showSmsModal:false,
			messages_sent: [],
			phone_number:'',
			showPagination: false,
			message_id: '',
			page:'',
			total_page:'',
			expand_message: false,
			sms_history_id:'',
			show_shimmer: false,
			all_active: true,
			filter_active: false,
			number_api_active: false,
			whatsapp_active: false,
			dnd_active: false,
			generic_active: false,
			channel: '',
			message_sent:'',
			show_message_abbr: true
		}
	},
	mounted() {
		if(this.$store.state.view_verify_page === 'true'){
			this.$modal.show('verification-id-modal');
		}else {
			this.getSmsHistory();
		}

	},
	computed:{
		isDisabled: function () {
			return(this.phone_number === '' ||  this.date_time === null)
		}
	},
	methods: {

		closeModal() {
			this.showSmsModal = false;
		},
		async getSmsHistory(){
			try {
				//get sms history
				let data = await this.$axios.$get('sms/history', {params:{page: this.page}});
				this.messages_sent = data;
				if (data.meta.last_page > 1 ){
					this.showPagination = true
				}else {this.showPagination = false}
				this.page = this.messages_sent.meta.current_page;
				this.total_page = this.messages_sent.meta.last_page;
				this.show_shimmer = true;
			}catch (e) {

			}

		},

		expandMessageSent(row){
					if (this.message_id === row.id){
								this.message_id = ''
								this.show_message_abbr = false;
							}else {
								this.message_id = row.id
							}

		},
		showExportModal(){
			this.$modal.show('export-modal');
		},
		showFilterModal(){
			this.filter_active = !this.filter_active;
		},
		hideDrop(){
			this.filter_active = false;
		},
		// async fetch(){
		// 	try {
		// 		//get sms history
		// 		let data = await this.$axios.$get('sms/history', {params:{page: this.page, channel_filter: this.channel}});
		// 		this.messages_sent = data;
		// 		if (data.meta.last_page > 1 ){
		// 			this.showPagination = true
		// 		}else {this.showPagination = false}
		// 		this.page = this.messages_sent.meta.current_page;
		// 		this.total_page = this.messages_sent.meta.last_page;
		// 		this.show_shimmer = false;
		// 		this.isLoading = false;
		// 		this.searchText = 'Search';
		// 		this.showIcon = true;
		// 	}catch (e) {
		//
		// 	}
		//
		// },
		async filterSmsHistory() {
			this.isLoading = true;
			this.searchText = '';
			this.showIcon = false;
			try {
				let data = await this.$axios.$get('sms/history', {params:
						{
							page: this.page,
							phone_number: this.phone_number,
							date_from: this.date_time[0],
							date_to: this.date_time[1],
							channel_filter: this.channel
						}
				});

				this.messages_sent = data;
				if (data.meta.last_page > 1 ){
					this.showPagination = true
				}else {this.showPagination = false}
				this.page = this.messages_sent.meta.current_page;
				this.total_page = this.messages_sent.meta.last_page;
				this.show_shimmer = true;

				this.isLoading = false;
				this.searchText = 'Search';
				this.showIcon = true;
				this.$toast.success('Search completed');
			}catch (e) {

			}

		},
		async filterByChannel(){
			try {
				this.show_shimmer = false;
				let data = await this.$axios.$get('sms/history', {params:
						{
							page: this.page,
							channel_filter: this.channel
						}
				});

				this.messages_sent = data;
				this.show_shimmer = true;
				if (data.meta.last_page > 1 ){
					this.showPagination = true
				}else {this.showPagination = false}
				this.page = this.messages_sent.meta.current_page;
				this.total_page = this.messages_sent.meta.last_page;
				this.show_shimmer = true;
			}catch (e) {

			}
		},
		onPageChange(page) {
			this.page = page;
			this.filterByChannel();
		},
		showModal(row){
			this.sms_history_id = row.id;
			this.showSmsModal = true;
		},
		async display_all(){
			this.page = 1;
			await this.filterByChannel();
			this.all_active = true;
			this.whatsapp_active = false;
			this.generic_active = false;
			this.dnd_active = false;
			this.number_api_active = false;
		},
		display_filter(){
			this.filter_active = true;
		},
		 async display_dnd(){
			 	this.channel = 'Dnd';
				 this.page = 1;
				 await this.filterByChannel();
					this.all_active = false;
					this.whatsapp_active = false;
					this.generic_active = false;
					this.dnd_active = true;
					this.number_api_active = false;

		},
		async display_generic(){
			this.channel = 'Sms';
			this.page = 1;
			await this.filterByChannel();
			this.all_active = false;
			this.whatsapp_active = false;
			this.generic_active = true;
			this.dnd_active = false;
			this.number_api_active = false;
		},
		async display_number_api(){
			this.channel = 'Number';
			this.page = 1;
			await this.filterByChannel();
			this.all_active = false;
			this.whatsapp_active = false;
			this.generic_active = false;
			this.dnd_active = false;
			this.number_api_active = true;
		},
		async display_whatsapp(){
			this.channel = 'Whatsapp';
			this.page = 1;
			await this.filterByChannel();
			this.all_active = false;
			this.whatsapp_active = true;
			this.generic_active = false;
			this.dnd_active = false;
			this.number_api_active = false;
		}
	},
	directives: {
		ClickOutside
	},

}
</script>

<style scoped>
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
	border-color: #DBDBDB;
	border-width: thin;
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
	color: #365899!important;
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
