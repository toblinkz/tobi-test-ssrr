<template xmlns="http://www.w3.org/1999/html">
	<div class="padding-sides m-t-80">
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
					<main id="wrapper" class="wrapper mt-20">
						<div id="pages" class="fixed-header dashboard menu-pin">
							<div id="sb">
								<div class="jumbotron" data-pages="parallax">
									<div class="container-fluid container-fixed-lg">
										<div class="inner">
											<!-- END BREADCRUMB -->

											<div class="container-md-height">
												<div class="row">
													<div class="col-md-7">

														<div class="row">
															<div class="container-fluid container-fixed-lg" style="background: white;">
																<!-- START PANEL -->
																<div class="panel panel-transparent">
																	<div class="panel-body">
																		<div class="row pad-100">
																			<p style="font-size: 15px;"><i class="entypo-credit-card"></i>Hi {{ first_name }}, Welcome to Your
																				Dashboard</p>
																			<ContentLoader v-if="!account_balance" height="20">
																				<rect height="5" rx="4" ry="4" width="130" x="15" y="15"/>
																				<rect height="5" rx="3" ry="3" width="130" x="155" y="15"/>
																				<rect height="5" rx="3" ry="3" width="90" x="295" y="15"/>
																				<rect height="5" rx="3" ry="3" width="90" x="15" y="50"/>
																				<rect height="5" rx="3" ry="3" width="60" x="115" y="50"/>
																				<rect height="5" rx="3" ry="3" width="200" x="185" y="50"/>
																			</ContentLoader>
																			<div v-else class="flex-direction" style="display: flex">
																				<p
																					style="font-size: 40px; color: #365899; font-weight: 700; letter-spacing: 2px; line-height: 53.2px">
																					{{ account_balance }}</p>
																				<nuxt-link v-if="canTopUp" class="bg-blue mt-10 m-l-50 no-margin-left" to="/billing/fund"><i
																					class="entypo-credit-card"></i> Fund Wallet <i class="m-l-10 fa fa-angle-right"></i></nuxt-link>
																			</div>
																			<div class="mt-50" style="height: 320px; width: 90%; border: 0 !important">
																				<div style="display: flex; justify-content: space-between">
																					<span style="font-weight: 700; "><i class="entypo-chart-bar" style="color: #365899"></i>All Channels Performance in {{ month }}</span>
																				</div>
																				<div class="m-l-10 " style="border-bottom: dotted #ddd!important;width: 100%"></div>
																				<div>

																				</div>
																				<div v-if="total_messages_sent">
																					<div class="col-md-7">
																						<DoughnutChart
																							:array_of_doughnut_chart_count="array_of_doughnut_chart_count"
																							:colors="colors"
																							:labels="labels"
																						></DoughnutChart>
																					</div>
																				</div>

																				<div v-else style="text-align:center">
																					<div class="col-md-7 mt-150">
																						No data to display
																					</div>
																				</div>

																				<div class="col-md-5">
																					<div class="panel-body">
																						<h3 class="blue-t" style="font-size: 25px; font-weight: 700;">
																							<strong>{{ total_messages_sent }}</strong></h3>
																						<h5><strong>Messages in {{ month }}</strong></h5>
																					</div>
																					<div class="panel-body" style="padding: 0px 20px 20px 20px !important;">
																						<h3 class="blue-t" style="font-size: 25px; font-weight: 700;">
																							<strong>{{ total_amount_spent }}</strong></h3>
																						<h5 class="mb-10"><strong>Cash Spent in {{ month }}</strong></h5>
																					</div>
																				</div>

																				<div class="row">

																					<hr style="border: 0;
																													height: 15px;
																													margin-top: 50px !important;
																													margin-bottom: 50px !important;
																													position: relative;
																													background: radial-gradient(ellipse at bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0) 70%);
																													width: 50% !important;">

																					<div v-if="canViewApiKey" class="col-md-6">
																						<div style="display: flex;">
																							<p class="text-semibold"><i class="entypo-key" style="color: #079805 !important;"></i>API Key</p>
																						</div>
																						<div class="row alert toke insight wd">
																							<p class="alert toke insight wd">
																								<button v-clipboard:copy="live_api_key" v-clipboard:success="onCopyApiKey"
																																class="clipboard-style"
																																style="top: -5px!important; right: -15px!important;"

																								>
																									<img src="/images/copy.svg" width="18"/>
																								</button>
																								{{ live_api_key }}
																							</p>
																						</div>
																					</div>

																					<div v-if="canRequestSenderId" class="col-md-6">
																						<div style="display: flex;">
																							<p class="text-semibold"><i class="entypo-link" style="color: rgb(193, 2, 2) !important;"></i>
																								Base URL </p>
																						</div>
																						<div class="row alert toke insight wd" style="padding: 25px 25px 29px 15px !important">
																							<button v-clipboard:copy="api_base_url"
																															v-clipboard:success="onCopyBaseUrl"
																															class="clipboard-style"

																							>
																								<img src="/images/copy.svg" width="18"/>
																							</button>
																							<p class="alert toke insight wd">
																								{{ api_base_url }}
																							</p>
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
													<div v-if="canViewWalletHistory" class="col-md-4 panel-margin-top">
														<!-- START PANEL -->
														<div class="">
															<div class="row mt-20">
																<div class="row mt-30">
																	<div class="row">
																		<div class="mt-20 col-md-11">
																			<div style="display:flex;">
																				<p class=" text-semibold" style="margin-bottom: 0"><i class="entypo-light-up"
																																																																										style="color: #079805 !important;"></i>Transaction
																					History</p>
																				<nuxt-link style="margin-left: auto; color: #365899" to="/billing/transactions/history">view
																					transaction
																				</nuxt-link>
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
			<PrivacyPolicyModal @privacy-policy-accepted="acceptPrivacyPolicy"/>

		</div>
	</div>
</template>

<script>
import Sidebar from "../components/general/Sidebar";
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import SmsHistoryModal from "../components/modals/SmsHistoryModal";
import YourWalletModal from "../components/modals/YourWalletModal";
import ActivateIdModal from "../components/modals/ActivateIdModal";
import UpdateCompanyNameModal from "../components/index/modals/UpdateCompanyNameModal";
import Chart from "chart.js";
import {mapGetters} from 'vuex';
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
import AccountNumberModal from "../components/modals/GenerateNubanAccountNumberModal";
import SuccessModal from "../components/modals/SuccessModal";
import AnnouncementModal from "../components/modals/AnnouncementModal";
import SignUpWizardComponent from "../components/index/modals/SignUpWizardComponent";
import DoughnutChart from "../components/general/charts/DoughnutChart";
import OnBoardingModal from "../components/index/modals/OnBoardingModal";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import privacyPolicyModal from "@/components/modals/PrivacyPolicyModal";

export default {
	components: {
		PrivacyPolicyModal,
		OnBoardingModal,
		DoughnutChart,
		SignUpWizardComponent,
		AnnouncementModal,
		SuccessModal,
		AccountNumberModal,
		PageDeniedModal,
		VerificationModal,
		ActivityLog,
		UpdateCompanyNameModal,
		ActivateIdModal,
		YourWalletModal,
		SmsHistoryModal,
		DashboardNavbar,
		Sidebar,
		ContentLoader,
		FacebookLoader,
		ListLoader,
		BulletListLoader
	},

	head() {
		return {
			script: [{src: "/js/intro.js"}]
		}
	},
	middleware: ['auth', 'inactive_user'],

	data() {
		return {
			showActivateIdModal: false,
			showYourWalletModal: false,
			account_balance: '',
			modal_information: 'Your account number is being generated.',
			emptyActivityLog: false,
			nuban_account: [],
			live_api_key: '',
			api_base_url: '',
			first_name: '',
			is_main: JSON.parse(localStorage.getItem('user_data')).is_main,
			permission_data: [],
			customer_permissions: [],
			announcement_information: [],
			total_messages_sent: 0,
			total_amount_spent: 0,
			month: '',
			labels: [],
			array_of_doughnut_chart_count: [],
			colors: [],
		}
	},

	computed: {
		...mapGetters(['getViewVerifyPage', 'getFirstName']),

		canViewApiKey() {
			return (this.customer_permissions.includes("view_api_key"));
		},

		canTopUp() {
			return (this.customer_permissions.includes("top_up_wallet"));
		},

		canViewWalletHistory() {
			return (this.customer_permissions.includes("view_wallet_history"));
		},

		canRequestSenderId() {
			return (this.customer_permissions.includes("request_sender_id"));
		},

	},
	mounted: function () {

		this.startUserWizard();

		this.getUserPermissions();

		this.getChartData();

		this.checkUserIsVerifiedAndProcess();

		this.setNameAndKey();

		this.getMonthAndYear();

		this.fetchAndSoreLoggedInData();

		this.fetchAndSetBalance();

		this.getTotalAmountSpent();

		this.getTotalMessagesSent();

		this.getAndSetAnnouncements()

		// await this.getNuban();

		this.checkIfPrivacyPolicyIsAccepted()

		setInterval(this.getBalance, 60000);
	},

	methods: {
		checkIfPrivacyPolicyIsAccepted() {
			let isPrivacyPolicyAccepted
			isPrivacyPolicyAccepted = JSON.parse(localStorage.getItem('user_data')).company.privacy_policy === 0;

			// isPrivacyPolicyAccepted = JSON.parse(localStorage.getItem('user_data')).is_main;

			if (isPrivacyPolicyAccepted) {
				this.$modal.show('privacy-policy-modal')
			}
		},

		async acceptPrivacyPolicy() {
			let userData = JSON.parse(localStorage.getItem('user_data'))
			userData.company.privacy_policy = 1
			localStorage.setItem('user_data', JSON.stringify(userData))
			await this.$user.acceptPrivacyPolicy()
		},

		async getChartData() {
			try {
				let data = await this.$insight.getFilteredChartData('this month');
				let status_data = data.data.message_data.status_data;
				for (status in status_data) {
					this.labels.push(status_data[status].key);
					this.array_of_doughnut_chart_count.push(status_data[status].count)
					this.colors.push(status_data[status].color)
				}
			} catch (e) {

			}

		},
		onCopyApiKey(e) {
			this.$toast.success('Copied!');
		},
		onCopyBaseUrl(e) {
			this.$toast.success('Copied!');
		},
		getUserPermissions() {
			this.permissions_data = JSON.parse(localStorage.getItem('user_data')).permissions;
			this.permissions_data.forEach((permission) => {
				this.customer_permissions.push(permission.name);
			});
			localStorage.setItem('permissions', this.customer_permissions);
		},

		async getTotalMessagesSent() {
			try {
				let data = await this.$insight.getFilteredChartData('this month');
				this.total_messages_sent = data.data.message_data.count_data;
			} catch (e) {

			}

		},

		async getTotalAmountSpent() {
			try {
				let data = await this.$billing.getTotalAmountSpent();
				this.total_amount_spent = data.data;
			} catch (e) {

			}

		},
		getMonthAndYear() {
			let date = new Date();
			let month = [];
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";

			this.month = month[date.getMonth()];
		},
		closeActivateIdModal() {
			this.showActivateIdModal = false;
		},

		closeYourWalletModal() {
			this.showYourWalletModal = false;
		},

		async fetchAndSoreLoggedInData() {
			try {
				let data = await this.$user.getLoggedInUserData()
				localStorage.setItem('user_data', JSON.stringify(data.data));
			} catch (e) {

			}

		},

		async getAndSetAnnouncements() {
			this.announcement_information = await this.$utility.getAnnouncements();
			if (this.announcement_information.length === 0) {
				return;
			}
			this.checkIfAnnouncementCookieExists();
		},

		async fetchAndSetBalance() {
			try {
				let data = await this.$billing.getBalance();
				this.account_balance = data.data.converted_balance;
			} catch (e) {

			}
		},

		checkIfAnnouncementCookieExists() {
			const cookie_name = this.getCookie('announcement_title');
			if (!cookie_name || cookie_name !== this.announcement_information.data.title) {
				this.setCookie('announcement_title', this.announcement_information.data.title, 30);
				this.$modal.show('announcement-modal');
			}
		},

		getCookie(cookie_name) {
			const name = cookie_name + "=";
			const cookie_decoded = decodeURIComponent(document.cookie);
			const cArr = cookie_decoded.split('; ');
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
				const {data} = await this.$billing.getNubanAccount();
				localStorage.setItem('nuban_account', JSON.stringify(data.data));
				this.nuban_account = data.data;
				if (this.nuban_account.length === 0 && this.is_main) {
					this.$modal.show('account-number-modal');
					localStorage.setItem('doneShowingBvnModal', 'true');
				}
			} catch (e) {

			}
		},


		checkUserIsVerifiedAndProcess() {
			if (this.$store.state.view_verify_page === 'true') {
				this.first_name = this.getFirstName;
				this.$modal.show('verification-id-modal');
			}	else if (localStorage.getItem('local')) {
				this.$axios.setHeader('Authorization', `Bearer ${localStorage.getItem('local')}`);
				const doneShowingBvnModal = localStorage.getItem('doneShowingBvnModal');
				if (doneShowingBvnModal) {

				}
			}
		},
		setNameAndKey() {
			this.first_name = JSON.parse(localStorage.getItem('user_data')).fname;
			this.live_api_key = JSON.parse(localStorage.getItem('user_data')).customer.live_api_key;
			this.api_base_url = JSON.parse(localStorage.getItem('user_data')).customer.api_base_url;
		},

		startUserWizard() {
			let is_wizard_completed = JSON.parse(localStorage.getItem('user_data')).customer.is_wizard_completed;
			if (!(is_wizard_completed === 0 && (this.$store.state.view_verify_page === 'false'))) {
				return;
			}
			this.$modal.show('signup-wizard-modal');
		}

	},

}

</script>

<style>
@import "assets/css/general_style/childview.css";
@import "assets/css/general_style/introjs.css";

.page-header {
	margin: 0;
	padding: 0;
	border-bottom-width: 0;
}

.dashboard-page-container {
	margin: auto;
}

.dashboard-page-container {
	padding-bottom: 10px;
}

@media (min-width: 769px) {
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

@media (min-width: 769px) {
	.dashboard-page-content {
		display: table-row;
	}
}

@media (max-width: 769px) {
	.panel-margin-top {
		margin-top: 130px;
	}

	.flex-direction {
		flex-direction: column;
	}

	.no-margin-left {
		margin-left: 0px !important;
	}
}

@media (min-width: 769px) {
	.dashboard-content-wrapper {
		display: table-cell;
		vertical-align: top;
	}
}

.dashboard-content-wrapper {
	width: 100%;
}

.clipboard-style {
	position: absolute;
	right: 4px;
	top: 4px;
	cursor: pointer;
	border: 1px solid transparent;
	background-color: transparent;
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
