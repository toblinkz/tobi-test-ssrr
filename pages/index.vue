<template>
	<div class="container-fluid body" >
		<div class="row">
			<div id="msb" class="col-md-2 hidden-xs">
				<sidebar class="hidden-xs"></sidebar>
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
							<main id="wrapper" class="wrapper">
								<div id="pages" class="fixed-header dashboard menu-pin">
									<div id="sb">
										<div class="jumbotron" data-pages="parallax">
											<div class="container-fluid container-fixed-lg">
												<div class="inner">
													<!-- END BREADCRUMB -->
													<div class="container-md-height mt-30">
														<div class="row">
															<div class="col-md-4">
																<!-- START PANEL -->
																<div class="">
																	<div class="row mt-20">
                                                <span id="welcome"><span
																																																	class="text-bold">Hi, {{first_name}}</span> </span>
																		<ContentLoader v-if="!account_balance"
																																	:speed="5"
																																	:animate="true"
																		>
																			<rect x="33" y="11" rx="5" ry="5" width="313" height="14" />
																			<rect x="35" y="31" rx="0" ry="0" width="313" height="17" />
																		</ContentLoader>
																		<span id="welcome-intro" v-else>Welcome back to your Dashboard. Check out resources and docs tailored to your account.</span>
																		<div class="row mt-30">
																			<div class="row">
																				<div class="col-md-6 mb-5">
																					<p><i class="entypo-credit-card" style="color: #bbb !important;"></i> Balance</p>
																				</div>
																				<div class="col-md-6 hidden-xs mb-5">
																					<p><i class="entypo-comment" style="color: #bbb !important;"></i> Whatsapp</p>
																				</div>
																			</div>
																			<ContentLoader v-if="!account_balance"
																																		:speed="5"
																																		:animate="true"
																			>
																				<rect x="33" y="11" rx="5" ry="5" width="313" height="14" />
																				<rect x="35" y="31" rx="0" ry="0" width="313" height="17" />
																			</ContentLoader>
																			<div v-else>
																				<div class="col-md-6 alert toke" >
																					<!-- START PANEL -->
																					<div class="col-md-11">
																						{{account_balance}}
																					</div>
																					<!-- END PANEL -->
																				</div>
																				<div class="col-md-6 alert toke hidden-xs">
																					<!-- START PANEL -->
																					<div class="col-md-11">
																						Active
																					</div>
																					<!-- END PANEL -->
																				</div>
																			</div>
																		</div>
																	</div>
																</div>

																<ActivityLog @emptyActivityLog="emptyActivityLog = $event"></ActivityLog>
																<!-- END JUMBOTRON -->
															</div>
															<div class="col-md-8 m-t-40">
																<div class="row mt-100 mb-20x">
																	<div class="col-md-6 mt-20">
																		<!-- START PANEL -->
																		<div class="panel panel-transparent">
																			<div class="panel-body no-padding">
																				<div class="col-md-11">
																					<p class="text-semibold"><i class="entypo-light-up" style="color: #079805 !important;"></i>API Key</p>
																				</div>
																				<ContentLoader v-if="!account_balance"
																																			:speed="2"
																																			:animate="true"
																				>
																					<rect x="16" y="13" rx="2" ry="2" width="296" height="16" />
																					<rect x="16" y="37" rx="2" ry="4" width="296" height="16" />
																					<rect x="16" y="86" rx="2" ry="6" width="296" height="16" />
																					<rect x="16" y="61" rx="2" ry="8" width="296" height="16" />
																				</ContentLoader>
																				<div class="col-md-11 alert toke insight wd" v-else>
																					<!-- START PANEL -->
																					<p class="alert toke insight wd">
																						{{live_api_key}}
																					</p>
																					<!-- END PANEL -->
																				</div>
																			</div>
																		</div>
																		<!-- END PANEL -->
																	</div>
																	<div class="col-md-6 mt-20">
																		<!-- START PANEL -->
																		<div class="panel panel-transparent">
																			<div class="panel-body no-padding">
																				<div class="panel-body no-padding">
																					<div class="col-md-11">
																						<p class="text-semibold"><i class="entypo-light-up" style="color: #c10202 !important;"></i> Guide for OTPs & Alerts </p>
																					</div>
																					<div class="col-md-11 alert toke insight wd">
																						<!-- START PANEL -->
																						<p class="alert toke insight wd">
																							To send otps and alerts, you have to use our sender IDs; OTPAlert and N-Alert. <a class="blue-t text-bold" id="CHATID"> Click here to request</a>
																						</p>
																						<!-- END PANEL -->
																					</div>
																				</div>
																			</div>
																			<!-- END PANEL -->
																		</div>
																	</div>
																</div>
																<div class="row">
																	<div class="container-fluid container-fixed-lg" style="background: white;">
																		<!-- START PANEL -->
																		<div class="panel panel-transparent">
																			<div class="panel-body">
																				<div class="row pad-100">
																					<div class="col-md-2 cards" id="step2">
																						<!-- START PANEL -->
																						<div class="panel panel-transparent">
																							<div class="panel-body no-padding">
																								<img src="/images/products/check_mark.png" class="wd-50">
																								<br>
																								<small class="blue-t">Step 1</small>
																								<h5 class="mb-10"><strong>Activate ID</strong></h5>
																								<p class="insight mb-10">
																									Activate your <br>sender or device ID</p>
																								<button type="button" class="btn btn-blue btn-cons" @click="showActivateIdModal = true" ><i class="fa fa-angle-double-right"></i> Start</button>
																							</div>
																						</div>
																						<!-- END PANEL -->
																					</div>
																					<div class="col-md-2 cards" id="step3">
																						<!-- START PANEL -->
																						<div class="panel panel-transparent">
																							<div class="panel-body no-padding">
																								<img src="/images/products/card.png" class="wd-50">
																								<br>
																								<small class="blue-t">Step 2</small>
																								<h5 class="mb-10"><strong>Wallet</strong></h5>
																								<p class="insight mb-10">Top-up your account <br>with messaging credit</p>
																								<!-- Trigger the modal with a button -->
																								<button type="button" class="btn btn-blue btn-cons" @click="showYourWalletModal = true"><i class="fa fa-angle-double-right"></i> Start</button>
																							</div>
																						</div>
																						<!-- END PANEL -->
																					</div>
																					<div class="col-md-2 cards" id="step4">
																						<!-- START PANEL -->
																						<div class="panel panel-transparent">
																							<div class="panel-body no-padding">
																								<img src="/images/products/speech.png" class="wd-50">
																								<br>
																								<small class="blue-t">Step 3</small>
																								<h5 class="mb-10"><strong>Message</strong></h5>
																								<p class="insight mb-10">View guide on <br>sending messages</p>
																								<nuxt-link to="/message/select-type" class="btn btn-blue btn-cons"><i class="fa fa-angle-double-right"></i> Start</nuxt-link>
																							</div>
																						</div>
																						<!-- END PANEL -->
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
	 <PageDeniedModal></PageDeniedModal>
	</div>
</template>

<script>
	import Sidebar from "../components/general/Sidebar";
	import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
	import SmsHistoryModal from "../components/modals/SmsHistoryModal";
	import YourWalletModal from "../components/modals/YourWalletModal";
	import ActivateIdModal from "../components/modals/ActivateIdModal";
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
	export default {
		components: {
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
			...mapGetters([ 'getViewVerifyPage', 'getFirstName'])
		},
		data(){
			return{
				showActivateIdModal: false,
				showYourWalletModal: false,
				account_balance: '',
				emptyActivityLog:false,
				live_api_key:'',
				first_name: '',
				permission_data : [],
				customer_permissions:[],

			}
		},
		methods: {
			getUserPermissions(){
				this.permissions_data = JSON.parse(localStorage.getItem('user_data')).permissions;
				this.permissions_data.forEach((permission) => {
					this.customer_permissions.push(permission.name);
				});
				localStorage.setItem('permissions', this.customer_permissions);
			},
			closeActivateIdModal(){
				this.showActivateIdModal = false;
			},
			closeYourWalletModal(){
				this.showYourWalletModal = false;
			},
			async fetch() {
				try{
					// get account balance
					let data = await this.$axios.$get('billing/wallet', {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('local')}`
						}
					});
					this.account_balance = data.data.converted_balance;
					//get user data
					// let response_data = await this.$axios.$get('user',{
					// 	headers:{'Authorization': `Bearer ${localStorage.getItem('local')}`}
					// });

						// localStorage.setItem('user_data', JSON.stringify(response_data.data));

				} catch(e){

				}
			},
			async getBalance(){
				try{
					// get account balance
					let data = await this.$axios.$get('billing/wallet' );
					this.account_balance = data.data.converted_balance;
				}catch (e) {

				}
			},

			startIntro() {

				let intro = introJs();
				// add a flag when we're done
				intro.oncomplete(function() {
					localStorage.setItem('doneWithTour', 'yeah');
				});

				// add a flag when we exit
				intro.onexit(function() {
					localStorage.setItem('doneWithTour', 'yeah');
				});

				intro.setOptions({
					steps: [
						{
							element: '#step1',
							intro: "<center><span>Hi, <b>Welcome to Termii</b></span></center><br><br>Do you know that messaging platforms are unique and have features that make them different? <br><br>To navigate your account properly and use Termii's unique features effectively, please follow these few steps!"
						},
						{
							element: document.querySelector('#step2'),
							intro: "<span>1. Verify <b>Unique ID</b></span><br><br>Before sending any message on Termii, It is very important that you verify your Sender or Device ID. <br><br> <b>Sender ID</b>: This is your unique sms ID (Must be 9 characters and gets approved between 1-24 hours)<br><br> <b>Device ID</b>: This is your unique WhatsApp ID.<br><br><b>Domain DNS</b>: These codes allow email providers like gmail mark your email and messages as authentic.",
							position: 'right'
						},
						{
							element: document.querySelector('#step3'),
							intro: "<span>2. <b>Subscribe</b></span><br><br>Once your sender, device or domain ID's are active, proceed to purchase units based on the volume of messages you would like to send to your customers!",
							position: 'left'
						},
						{
							element:document.querySelector('#step4'),
							intro: "<span>4. Message <b>Guide</b></span><br><br>Now, click start to select the type of message you would like to send and personalize your content. <br><br> <b>Note</b>: Always ensure you read our text hints when sending messages, Don't ingnore them!",
						},
						{
							element: document.querySelector('#step5'),
							intro: 'Thats all from us for now. If you have further questions, please use the <b>support link</b> on the sidebar or click on our chat box to talk to a support agent.'
						}
					]
				});

				let doneWithTour = localStorage.getItem('doneWithTour') === 'yeah';
				if (doneWithTour) {
					return;
				} else {
					intro.start();
				}
			}

		},

	async	mounted () {
   this.getUserPermissions();
			if(this.$store.state.view_verify_page === 'true'){
				this.first_name = this.getFirstName;
				this.$modal.show('verification-id-modal');
			} else if (localStorage.getItem('local')) {
			 this.$axios.setHeader('Authorization',  `Bearer ${localStorage.getItem('local')}`);
				await this.fetch();
				this.startIntro();
				this.first_name = JSON.parse(localStorage.getItem('user_data')).fname;
				this.live_api_key = JSON.parse(localStorage.getItem('user_data')).customer.live_api_key;
				setInterval(this.getBalance, 60000);

			}

		}

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
