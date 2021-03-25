<template>
  <div>
  <div class="container-fluid body">
    <div class="fund-row">
      <div id="msb" class="col-md-2 hidden-xs">
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
        <div class="fund-page-container">
          <!-- Page content -->
          <div class="fund-page-content">
            <!-- Main content -->
            <div class="fund-content-wrapper">
              <!-- main inner content -->
              <main id="wrapper" class="wrapper">
                <section class="wrapper-bottom-sec mt-50">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <!-- END BREADCRUMB -->
                      <div class="container-md-height">
                        <div class="fund-row">
                          <div class="col-md-6">
                            <!-- START PANEL -->
                            <div class="panel-transparent">
																													<span id="welcome" ><i class="entypo-credit-card" style="font-size: 20px"></i><span style="font-size: 13px">Available balance:</span></span>
																													 <p style="font-size: 50px; font-weight: 500; color:#365899;">{{account_balance}}</p>
                            </div>
                            <!-- Trigger the modal with a button -->
                          </div>
                        </div>
                        <div class="fund-row row-md-height">
                          <div class="col-lg-7 col-md-height col-md-7 col-top">
                            <!-- START PANEL -->
                            <div class="panel-transparent">
                              <div class="row">
                                <!-- START PANEL -->
                                <div class="panel-transparent">

                                  <div class="fund-row" >
																																			<ContentLoader v-if="!minimum_top_up"
																																																		:speed="2"
																																																		:animate="true"
																																			>
																																				<rect x="4" y="13" rx="2" ry="2" width="628" height="16" />
																																				<rect x="4" y="36" rx="2" ry="4" width="628" height="16" />
																																				<rect x="4" y="86" rx="2" ry="6" width="628" height="16" />
																																				<rect x="4" y="61" rx="2" ry="8" width="628" height="16" />
																																				<rect x="4" y="140" rx="2" ry="8" width="628" height="16" />

																																			</ContentLoader>
																																			<div v-else>

																																			<GenericAccountNumberComponent v-if="!has_nuban"
																																																																		:account_number="account_number"
																																																																		:bank_name="bank_name"
																																																																		:account_name="account_name">
																																			</GenericAccountNumberComponent>

																																				<NubanAccountNumberComponent v-if="has_nuban"
																																																																	 :nuban_account="nuban_account">
																																				</NubanAccountNumberComponent>

																																				<!--Get Account Number Button-->
																																				<div style="display: flex">
																																					<button type="button" @click="showModal" style="border: 1px solid #E6E6E6 !important; background: #fff !important;" class="btn m-r-10 btn-blue btn-cons hidden-xs mb-30" ><i class="entypo-popup"></i> View full messaging prices</button>
																																					<a class="btn account mb-30" v-if="show_get_account_number" @click="showAccountNumberModal" style="font-size: 12px !important; padding: 10px; background-color: #FFE8E8; color: #FF0000; border-radius: 8px!important;  margin-left: 11px;">
																																						<i class="entypo-light-up"></i>
																																						Get account number
																																					</a>
																																				</div>
																																				<!--End Get Account Number Button-->

																																				<div v-if="is_nigerian_wallet" class="col-md-12 alert toke hidden-xs">
																																					<p><i class="entypo-bookmark" style="color: #bbb !important;"></i><b>Wallet Guide</b></p><br>
																																					<p class="text-semibold">
																																						<b>Minimum amount to recharge is ₦3000.</b> <br />
																																							You can use any of our autogenerated virtual account numbers to topup your wallet and any money transferred to these account numbers would be credited to your wallet automatically.
																																						<br>
																																						If you experience any issue making payment to your wallet, please reach out to <a href="mailto:sales@termii.com">sales@termii.com</a> or contact any of your account reps via our support channels.</p>
																																				</div>

																																				<div  v-if="!is_nigerian_wallet" class="col-md-12 alert toke hidden-xs" >
																																					<p><i class="entypo-info-circled" style="color: #bbb !important;"></i> <b>Bank Transfer Guide:</b></p><br>
																																					<p style="text-align:justify">
																																						For US or international customers, please make payment to the bank above and include the following details:
																																						<br>
																																						<br>
																																						<b>ABA Routing Number:</b>
																																						<br/>
																																						021000021
																																						<br>
																																						<br>
																																						<b>Company Address:</b>
																																						<br>
																																						601 Pennsylvania Avenue, NW South Building Suite 920, Washington D.C. 20004.
																																						<br>
																																						<br>
																																						Additional Wire Instructions For direct deposits and ACH transactions use routing number: 044000037
																																					</p>
																																				</div>
																																			</div>

																																		</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-5 col-md-5 col-md-height col-middle">
                            <div class="p-30 p-t-none p-b-none">
                              <div class="panel" v-if="canTopUp">
                                <div class="panel-body">
                                  <form  role="form" method="post" @submit.prevent="TopUp">
                                    <CustomSelect :options="options" @item-selected="itemSelected" :dropdown-style="dropdownStyle"></CustomSelect>
                                    <div id="regular-form-body" class="mt-20">
                                      <div class="form-group"  :style="{marginBottom: '10px'}" v-show="input_amount">
                                        <input type="text" class="form-control" placeholder="Amount" v-model="amount" :class="{'error': hasError}" @focusout="getExchangeRate($event)">
                                        <span class="error_field_message" v-if="error_message">{{error_message}}</span>
																																						</div>
                                      <div class="form-group" v-show="selectPayment">
                                        <label>Select Payment Method</label>
                                        <select @change="onChange($event)" class="form-control">
                                          <option v-for="item in payment_method.data" :value="item.settings">{{item.name}}</option>
                                        </select>
                                      </div>
                                      <div class="form-group alert toke">
                                        <p class="text-semibold"><i class="entypo-cc" style="color: #079805 !important;"></i> Total:</p>
                                        <p>  <b>{{total}}</b>  </p>
                                      </div>
                                      <div class="form-group">
                                        <p ><b>Notice:</b> <br>Also all payments would be remitted in Naira, but your accounts would be credited in your local currency. </p>
                                      </div>
                                      <button type="submit" class="btn bx-line btn-success btn-sm  purchase_button" :disabled="isDisabled">
                                        {{fund_button_text}}
                                        <span v-show="isLoading">
                                         <img src="/images/spinner.svg" height="20px" width="80px"/>
                                      </span>
                                      </button>
                                    </div>
                                  </form>
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
            <!-- /main content -->
          </div>
          <!-- /page content -->
        </div>
        <!-- /page container -->
      </div>
    </div>
  </div>
    <ServicePriceModal v-if="showModal" @close="closeModal" ></ServicePriceModal>
    <MonnifyModal :account_number="account_number" :amount="total" :bank_name="bank_name"></MonnifyModal>
			<VerificationModal></VerificationModal>
			<AccountNumberModal @nuban_account="setNubanAccount()"></AccountNumberModal>
			<SuccessModal :modal_information="modal_information"></SuccessModal>
  </div>
</template>

<script>

    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import ServicePriceModal from "../../components/modals/ServicePriceModal";
    import CustomSelect from "../../components/general/dropdown/CustomSelect";
    import MonnifyModal from "../../components/modals/MonnifyModal";
				import {ContentLoader,} from 'vue-content-loader';
				import VerificationModal from "~/components/modals/VerificationModal";
				import ButtonSpinner from "../../components/general/ButtonSpinner";
				import AccountNumberModal from "../../components/modals/AccountNumberModal";
				import SuccessfulPayment from "../successful-payment";
				import SuccessModal from "../../components/modals/SuccessModal";
				import GenericAccountNumberComponent from "@/components/billing/GenericAccountNumberComponent";
				import NubanAccountNumberComponent from "@/components/billing/NubanAccountNumberComponent";

    export default {
					name: "funding",
					middleware: ['auth', 'inactive_user', 'permission'],
					components: {
						NubanAccountNumberComponent,
						GenericAccountNumberComponent,
						SuccessModal,
						SuccessfulPayment,
						AccountNumberModal,
						ButtonSpinner,
						VerificationModal, MonnifyModal, CustomSelect, ServicePriceModal, DashboardNavbar, Sidebar, ContentLoader
					},
					data() {
						return {
							isBundledForm: false,
							modal_information: 'Your account number is being generated.',
							isRegularBody: true,
							isRegularForm: false,
							isLoading: false,
							show_get_account_number: false,
							payment_method: '',
							minimum_top_up: '',
							minimum_top_up_value: '',
							fund_button_text: 'Fund Account',
							copy_id:'',
							show_copied: false,
							selected_payment_method: "",
							amount: '',
							has_nuban: false,
							is_nigerian_wallet: false,
							page_url: '',
							account_number: '',
							account_balance: '',
							account_name:'',
							bank_name: '',
							options: ['Select Top Up Option', {id: '1', name: 'Regular Top Up'}, {id: '2', name: 'Bundled Top Up'},],
							payment_gateway: '',
							hasError: false,
							total: '',
							bundled_top_up: '',
							payment_url: '',
							customer_permissions:[],
							selectPayment: false,
							first_name: JSON.parse(localStorage.getItem('user_data')).fname,
							last_name: JSON.parse(localStorage.getItem('user_data')).lname,
							input_amount: false,
							showMonnifyModal: false,
							error_message: '',
							customer_country: JSON.parse(localStorage.getItem('user_data')).country,
							nuban_account: [],
							dropdownStyle: {
								borderRadius: '8px'
							}

						}
					},
					computed: {
						isDisabled: function () {
							return (this.amount === '' || this.hasError)
						},
						canTopUp(){
							return (this.customer_permissions.includes("top_up_wallet"));
						}
					},
					watch: {
						amount(value) {
							this.amount = value;
							this.validateAmount(value);
						},
						nuban_account(account_data){
							 if(account_data.length === 0){
							 	 this.has_nuban = false;
								}
							 this.has_nuban = true;
						}
					},
					methods: {
						closeModal() {
							this.showModal = false;
						},
						getUserPermissions(){
							this.permissions_data = JSON.parse(localStorage.getItem('user_data')).permissions;
							this.permissions_data.forEach((permission) => {
								this.customer_permissions.push(permission.name);
							});
						},
						setNubanAccount(){
							this.getNuban();
						},
						showModal() {
							this.$modal.show('service-pricing-modal');
						},
						showAccountNumberModal() {
							this.$modal.show('account-number-modal');
						},
						async getWallet() {
							try {
								let data = await this.$axios.$get('billing/wallet');

								this.is_nigerian_wallet = data.data.is_nigerian_wallet
									this.account_balance = data.data.converted_balance;
									this.bank_name = data.data.bank_name;
									this.account_number = data.data.account_number;
									this.account_name = data.data.account_name;

							} catch (e) {

							}
						},
						async getPaymentMethod() {
							try {
								let response_data = await this.$axios.$get('billing/payment-method');
								this.payment_method = response_data;
								this.payment_gateway = response_data.data[0].settings;
							} catch (e) {

							}
						},

						async TopUp() {
							if (this.showMonnifyModal) {
								this.$modal.show('monnify-modal')
							} else {

								try {
									this.$store.commit('setSuccessfulPaymentUrl', this.page_url);
									this.isLoading = true;
									this.fund_button_text = "";
									let response_data = await this.$axios.$post('billing/fund/wallet', {
										amount: this.amount,
										gateway: this.payment_gateway
									});

									switch (this.payment_gateway) {
										case('paystack'): {
											window.location.href = response_data.data.url;
											break;
										}
										case('flutterwave_card'):
										case('flutterwave_ghana_momo'): {
											window.location.href = response_data.data.link;
											break;
										}
										case('stripe'): {
											this.$stripe.import().redirectToCheckout({
												sessionId: response_data.data
											}).then(function (result) {
												this.$toast.error(result.error.message)
											});
											break;
										}
										case('spektra'): {
											window.location.href = response_data.data;
										}
									}

								} catch (e) {
									this.isLoading = false;
									this.fund_button_text = "Fund Account";
									let errors = e.response;

								}
							}
						},
						async getExchangeRate() {
							try {
								let response_data = await this.$axios.$get('billing/exchange-rate', {params: {amount: this.amount,}});
								this.total = response_data.amount;
							} catch (e) {
								let errors = e.response.data.errors;
								for (let key in errors) {
									errors[key].forEach(err => {
										this.$toast.error(err);
									});
								}
							}

						},
						getNuban: async function () {
							if (this.nuban_account.length === 0) {
								const {data} = await this.$billing.getNubanAccount();
								this.nuban_account = data.data;
							}

						},
						async getTopUp() {
							try {
								let response = await this.$axios.$get('billing/top-up/plans');
								this.amount = response.data.bundled_top_up.amount_currency;
								this.total = response.data.bundled_top_up.amount;

							} catch (e) {

							}
						},
						async getTopDetails() {
							try {
								let response = await this.$axios.$get('billing/top-up/plans');
								this.bundled_top_up = response.data.bundled_top_up.amount;
								this.minimum_top_up = response.data.minimum_top_up.amount;
								this.minimum_top_up_value = response.data.minimum_top_up.amount_currency;
							} catch (e) {

							}
						},

						validateAmount(value) {
							if (isNaN(value)) {
								this.error_message = 'Please enter a valid amount';
								this.hasError = true;
							} else if (value < this.minimum_top_up_value) {
								this.error_message = `minimum amount to recharge is ${this.minimum_top_up}`;
								this.hasError = true;
							} else {
								this.error_message = '';
								this.hasError = false;
							}
						},
						onChange(event) {
							if (event.target.value === 'monnify') {
								this.showMonnifyModal = true;
							}
							this.payment_gateway = event.target.value;
						},
						async itemSelected(value) {
							if (value === "2") {
								this.selectPayment = true;
								this.input_amount = false;
								await this.getTopUp();
								await this.getExchangeRate()
							} else if (value === "1") {
								this.selectPayment = true;
								this.input_amount = true;
							}

						}
					},
					async mounted() {
						if (this.$store.state.view_verify_page === 'true') {
							this.$modal.show('verification-id-modal');
						} else {
							this.page_url = window.location.href;
							this.getUserPermissions();
							await this.getWallet();
							await this.getPaymentMethod();
							await this.getTopDetails();
							await this.getNuban();
							if (this.customer_country === 'Nigeria' && this.nuban_account.length === 0){
								 this.show_get_account_number = true;
							}

						}
					}
				}
</script>

<style scoped src="@/assets/css/billing/fund_page.css";></style>
