<template>
	<div class="container-fluid body" >
		<div class="row">
			<div id="msb" class="col-md-2">
				<sidebar></sidebar>
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
				<div class="dashboard-page-container">
					<!-- Page content -->
					<div class="dashboard-page-content">
						<!-- Main content -->
						<div class="dashboard-content-wrapper">
							<!-- main inner content -->
							<main id="wrapper" class="wrapper mt-50">
								<div id="pages" class="fixed-header dashboard menu-pin">
									<div id="sb">
										<div class="jumbotron" data-pages="parallax">
											<div class="container-fluid container-fixed-lg">
												<div class="inner">
													<!-- END BREADCRUMB -->

													<div class="container-md-height mt-30">
														<div class="row">
															<div class="col-md-8">
																<div class="row  mb-20x">
																	<div class="col-md-6 mt-20">
																		<!-- START PANEL -->
																		<div class="panel panel-transparent">
																			<div class="panel-body no-padding">
																				  <span id="welcome" style="margin-bottom: 5px!important;"><span
																							class="text-bold" >Hi, {{first_name}}</span> </span>

																				<span id="welcome-intro">Welcome back to your Dashboard.</span>
																			</div>
																		</div>
																		<!-- END PANEL -->
																	</div>
																</div>
																<ContentLoader v-if="!account_balance"

																>
																	<rect x="15" y="15" rx="4" ry="4" width="130" height="5" />
																	<rect x="155" y="15" rx="3" ry="3" width="130" height="5" />
																	<rect x="295" y="15" rx="3" ry="3" width="90" height="5" />
																	<rect x="15" y="50" rx="3" ry="3" width="90" height="5" />
																	<rect x="115" y="50" rx="3" ry="3" width="60" height="5" />
																	<rect x="185" y="50" rx="3" ry="3" width="200" height="5" />
																	<rect x="15" y="90" rx="3" ry="3" width="130" height="5" />
																	<rect x="160" y="90" rx="3" ry="3" width="120" height="5" />
																	<rect x="290" y="90" rx="3" ry="3" width="95" height="5" />
																	<rect x="15" y="130" rx="3" ry="3" width="130" height="5" />
																	<rect x="160" y="130" rx="3" ry="3" width="225" height="5" />
																</ContentLoader>
																<div v-else class="row">
																	<div v-if="is_main" class="container-fluid container-fixed-lg" style="background: white;">
																		<!-- START PANEL -->
																		<div class="panel panel-transparent">
																			<div class="panel-body">
																				<div class="row pad-100">
																					<p><i class="entypo-credit-card"></i>Wallet Balance</p>

																					<div style="display: flex" class="flex-direction">
																							<p style="font-size: 40px; color: #365899; font-weight: 700; letter-spacing: 2px; line-height: 53.2px">{{account_balance}}</p>
																							<nuxt-link to="/billing/fund" class="bg-blue mt-10 m-l-50 no-margin-left"><i class="entypo-credit-card"></i> Fund Wallet <i class="m-l-10 fa fa-angle-right"></i> </nuxt-link>
																					</div>
                      <div class="card mt-50" style="height: 320px; width: 90%">
																							 <div style="display: flex; justify-content: space-between">
																									<span style="font-weight: 700; "><i class="entypo-chart-bar" style="color: #365899"></i>All Channels Performance Today</span>
																									<span><nuxt-link to="/sms/insights"  style=" font-weight: 700; color: #365899!important; cursor: pointer">view delivery reports</nuxt-link></span>
																								</div>
																							<div class="m-l-10 " style="border-bottom: dotted #ddd!important;width: 100%"></div>
																							<div>

																							</div>
																							<div v-if="total_messages_sent">
																									<div  class="col-md-8">
																										<DoughnutChart></DoughnutChart>
																									</div>
																									<div class="mt-50 col-md-4">
																										<p style="color:#365899; font-weight: 700; font-size: 14px">Total Messages Sent Today</p>
																										<p  style="color:#365899; font-size: 20px">{{total_messages_sent}}</p>
																										<div class="mt-20">
																											<p  style="color:#365899; font-weight: 700; font-size: 14px">Delivery Rate</p>
																											<p  style="color:#365899; font-size: 20px">80.93%</p>
																										</div>
																									</div>
																							</div>
																							 <div v-else class="mt-100" style="text-align:center">
																									  No data to display
																								</div>

																						</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="col-md-4 panel-margin-top">
																<!-- START PANEL -->
																<div class="">
																	<div class="row mt-20">
																		<div class="row mt-30">
																			<div class="row">
																				<div class="col-md-11" v-if="canViewApiKey">
																					<div style="display: flex;" >
																						<p class="text-semibold"><i class="entypo-key" style="color: #079805 !important;"></i>API Key</p>
																						<a href="https://developers.termii.com" target="_blank" style="margin-left: auto; color: #365899">explore documentation</a>
																					</div>

																				</div>
																				<div class="col-md-11 alert toke insight wd"  v-if="canViewApiKey">
																					<p class="alert toke insight wd">
																						{{live_api_key}}
																					</p>
																				</div>
																				<div class="mt-20 col-md-11">
																					<div style="display:flex;">
																						<p class=" text-semibold" style="margin-bottom: 0"><i class="entypo-light-up" style="color: #079805 !important;"></i>Transaction History</p>
																						<nuxt-link to="/billing/transactions/history" style="margin-left: auto; color: #365899">view transaction</nuxt-link>
																					</div>
																					<ActivityLog @emptyActivityLog="emptyActivityLog = $event"></ActivityLog>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- END PAGE CONTAINER -->
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ActivateIdModal v-if="showActivateIdModal" @close="closeActivateIdModal"></ActivateIdModal>
		<YourWalletModal v-if="showYourWalletModal" @close="closeYourWalletModal"></YourWalletModal>
		<VerificationModal></VerificationModal>
		<AccountNumberModal></AccountNumberModal>
		<PageDeniedModal></PageDeniedModal>
		<SignUpWizardComponent></SignUpWizardComponent>
		<OnBoardingModal></OnBoardingModal>
		<SuccessModal :modal_information="modal_information"></SuccessModal>
		<AnnouncementModal :announcement_information="announcement_information"></AnnouncementModal>
		<UpdateCompanyNameModal></UpdateCompanyNameModal>

	</div>
</template>

<script>
import Sidebar from "../components/general/Sidebar";
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import SmsHistoryModal from "../components/modals/SmsHistoryModal";
import YourWalletModal from "../components/modals/YourWalletModal";
import ActivateIdModal from "../components/modals/ActivateIdModal";
import Chart from "chart.js";
import { mapGetters } from 'vuex';
import ActivityLog from "../components/general/ActivityLog";
import {
	ContentLoader,
	FacebookLoader,
	CodeLoader,
	BulletListLoader,
	InstagramLoader,
	ListLoader
} from 'vue-content-loader'
import VerificationModal from "~/components/modals/VerificationModal";
import AddedTeammateSuccessfullyModal from "../components/modals/AddedTeammateSuccessfullyModal";
import PageDeniedModal from "../components/modals/PageDeniedModal";
import AccountNumberModal from "../components/modals/AccountNumberModal";
import SuccessModal from "../components/modals/SuccessModal";
import AnnouncementModal from "../components/modals/AnnouncementModal";
import SignUpWizardComponent from "../components/index/modals/SignUpWizardComponent";
import DoughnutChart from "../components/general/charts/DoughnutChart";
import OnBoardingModal from "../components/index/modals/OnBoardingModal";
export default {
	components: {
		OnBoardingModal,
		DoughnutChart,
		SignUpWizardComponent,
		AnnouncementModal,
		SuccessModal,
		AccountNumberModal,
		PageDeniedModal,
		VerificationModal,
		ActivityLog,
		ActivateIdModal, YourWalletModal, SmsHistoryModal, DashboardNavbar, Sidebar, ContentLoader, FacebookLoader, ListLoader, BulletListLoader},

	head(){
		return{
			script: [{src:"/js/intro.js" }]
		}
	},
	middleware: ['auth','inactive_user'],
	computed: {
		...mapGetters([ 'getViewVerifyPage', 'getFirstName']),
		canViewApiKey(){
			return (this.customer_permissions.includes("view_api_key"));
		},
	},
	data(){
		return{
			showActivateIdModal: false,
			showYourWalletModal: false,
			account_balance: '',
			modal_information: 'Your account number is being generated.',
			emptyActivityLog:false,
			nuban_account:[],
			live_api_key:'',
			first_name: '',
			is_main: JSON.parse(localStorage.getItem('user_data')).is_main,
			permission_data : [],
			customer_permissions:[],
			announcement_information:[],
			total_messages_sent:'',

		}
	},
	mounted: async function () {

		this.$modal.show('signup-wizard-modal');
		// this.startUserWizard();

		// this.displayAnnouncementModal();

		this.getUserPermissions();

		this.checkUserIsVerifiedAndProcess();

		this.setNameAndKey();

		await this.getTotalMessagesSent();

		await this.fetchAndSetBalance();

		await this.fetchAndSoreLoggedInData()

		// await this.getAndSetAnnouncements()

		// await this.getNuban();

		setInterval(this.getBalance, 60000);

	},

	methods: {

		getUserPermissions(){
			this.permissions_data = JSON.parse(localStorage.getItem('user_data')).permissions;
			this.permissions_data.forEach((permission) => {
				this.customer_permissions.push(permission.name);
			});
			localStorage.setItem('permissions', this.customer_permissions);
		},
		 async getTotalMessagesSent(){
			try {
				let data = await this.$insight.getChartData();
				this.total_messages_sent = data.data.data.count_data;
			}catch (e) {

			}

			},
		closeActivateIdModal(){
			this.showActivateIdModal = false;
		},

		closeYourWalletModal(){
			this.showYourWalletModal = false;
		},

		async fetchAndSoreLoggedInData(){
			try {
				let data = await this.$user.getLoggedInUserData()
				localStorage.setItem('user_data', JSON.stringify(data.data));
			}catch (e) {

			}

		},

		async getAndSetAnnouncements(){
			this.announcement_information = await this.$utility.getAnnouncements();
		},

		async fetchAndSetBalance(){
			try {
				let data = await this.$billing.getBalance();
				this.account_balance = data.data.converted_balance;
			}catch (e){

			}
		},

		displayAnnouncementModal(){
			if(this.announcement_information.length === 0){
				return;
			}
			this.checkIfAnnouncementCookieExists();
		},

		checkIfAnnouncementCookieExists(){
			const cookie_name  = this.getCookie('announcement_title');
				if (!cookie_name || cookie_name !== this.announcement_information.data.title){
					this.setCookie('announcement_title', this.announcement_information.data.title, 30);
					this.$modal.show('announcement-modal');
				}
			},

		getCookie(cookie_name) {
			const name = cookie_name + "=";
			const cookie_decoded = decodeURIComponent(document.cookie);
			const cArr = cookie_decoded .split('; ');
			let res;
			cArr.forEach(val => {
				if (val.indexOf(name) === 0) res = val.substring(name.length);
			})
			return res;
		},

		setCookie(cName, cValue, expDays) {
			let date = new Date();
			date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
			const expires = "expires=" + date.toUTCString();
			document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
		},

		async getNuban() {
			try {
				const { data } = await this.$billing.getNubanAccount();
				localStorage.setItem('nuban_account', JSON.stringify(data.data));
				this.nuban_account = data.data;
				if (this.nuban_account.length === 0 && this.is_main ) {
					this.$modal.show('account-number-modal');
					localStorage.setItem('doneShowingBvnModal', 'true');
				}
			} catch (e) {

			}
		},

		checkUserIsVerifiedAndProcess(){
			if (this.$store.state.view_verify_page === 'true') {
				this.first_name = this.getFirstName;
				this.$modal.show('verification-id-modal');
			}
			else if (localStorage.getItem('local')) {
				this.$axios.setHeader('Authorization', `Bearer ${localStorage.getItem('local')}`);
				const doneShowingBvnModal = localStorage.getItem('doneShowingBvnModal');
				if (doneShowingBvnModal) {

				}
		}
		},
		setNameAndKey(){
			this.first_name = JSON.parse(localStorage.getItem('user_data')).fname;
			this.live_api_key = JSON.parse(localStorage.getItem('user_data')).customer.live_api_key;
		},

		startUserWizard(){
			let is_wizard_completed = JSON.parse(localStorage.getItem('user_data')).customer.is_wizard_completed;
			 if (!(is_wizard_completed === 0 && (this.$store.state.view_verify_page === 'false'))){
			 	  return;
				}
			 this.$modal.show('signup-wizard-modal');
		}

	},

}

</script>

<style >
@import "assets/css/general_style/childview.css";
@import "assets/css/general_style/introjs.css";

.page-header {
	margin: 0;
	padding: 0;
	border-bottom-width: 0;
}
.page-header:not(.page-header-filled) + .dashboard-page-container {
	padding-top: 35px;
}
.dashboard-page-container {
	margin: auto;
}
.dashboard-page-container {
	padding-bottom: 10px;
}
@media (min-width: 769px){
	.dashboard-page-container {
		width: 100%;
		display: table;
		table-layout: fixed;
	}
}
.dashboard-page-container {
	position: relative;
	/* padding-bottom: 40px; */
}
@media (min-width: 769px){
	.dashboard-page-content {
		display: table-row;
	}
}
@media (max-width: 769px) {
	 .panel-margin-top{
			 margin-top: 130px;
		}
	.flex-direction{
		flex-direction: column;
	}
	.no-margin-left{
		margin-left: 0px!important;
	}
}
@media (min-width: 769px){
	.dashboard-content-wrapper {
		display: table-cell;
		vertical-align: top;
	}
}
.dashboard-content-wrapper {
	width: 100%;
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
#welcome-intro {
	font-size: 15px;
	letter-spacing: normal;
	font-weight: 400;
	line-height: 20px;
	margin: 0px 0px 10px 0px;
	font-style: normal;
	white-space: normal;
	/* -webkit-margin-before: 1em; */
	/* -webkit-margin-after: 1em; */
	/* -webkit-margin-start: 0px; */
	/* -webkit-margin-end: 0px; */
	display: block;
}
.toke {
	background-color: #f5f5f5;
	border-color: #efefef;
	color: #595959 !important;
}
.alert {
	/* padding: 15px; */
	margin-bottom: 20px;
	border: 1px solid transparent;
	/* border-radius: 3px; */
}

.content-group {
	margin-bottom: 20px !important;
}
#sb .timeline-container {
	width: 90%;
	max-width: 1170px;
	margin: 0 auto;
}
.timeline-container {
	position: relative;
	padding-top: 10px;
	/* margin-top: -10px; */
	padding-bottom: 1px;
}

.panel {
	/* box-shadow: 0 10px 45px 0 rgba(0,0,0,.1); */
	border: transparent;
	margin-bottom: 20px;
	/* border-color: #ddd; */
	color: #333333;
	background-color: #fff;
}

.panel-body {
	position: relative;
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
.alert {
	position: relative;
	border: 1px solid transparent;
	/* padding-left: 20px; */
	/* padding-right: 20px; */
}
.wd {
	border-radius: 2px;
	word-wrap: break-word;
}

.wd-50 {
	width: 50px !important;
}
.empty-list {
	border-radius: 5px;
}
.empty-list {
	width: 100%;
	display: block;
	border: solid 0px #ddd;
	border-radius: 10px;
	padding: 50px 20px;
	margin: 19px 0;
	background: #f5f5f5;
	text-align: center;
}
.empty-list i {
	font-size: 550%;
	display: block;
	color: #bbb;
}
.empty-list span.line-1 {
	font-size: 15px;
	display: block;
	margin: 20px 0 0 0;
	font-weight: 600;
	color: #666;
}


</style>
