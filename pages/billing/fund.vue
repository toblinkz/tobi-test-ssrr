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
                        <span id="welcome"><i class="entypo-credit-card"></i>Wallet Name - Termii Webtech</span>
                              <p class="insight">Select your preferred payment gateway and top up your <br>account using card or bank transfer</p>
                            </div>
                            <!-- Trigger the modal with a button -->
                            <button type="button" @click="showModal = true" style="border: 1px solid #E6E6E6 !important; background: #fff !important;" class="btn btn-blue btn-cons hidden-xs mb-30" ><i class="entypo-popup"></i> View full messaging prices</button>
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
																																				<div class="col-md-4 alert toke">
																																					<p class="text-semibold"><i class="entypo-credit-card" style="color: #bbb !important;"></i> Balance</p>
																																					<!-- START PANEL -->
																																					<p class="alert insight wd">
																																						<span>{{account_balance}}</span>
																																					</p>
																																					<!-- END PANEL -->
																																				</div>
																																				<div class="col-md-4 alert toke">
																																					<p class="text-semibold"><i class="entypo-light-up" style="color: #bbb !important;"></i> Account</p>
																																					<!-- START PANEL -->
																																					<p class="alert insight wd">
																																						<span>{{account_number}}</span>
																																					</p>
																																					<!-- END PANEL -->
																																				</div>
																																				<div class="col-md-4 alert toke">
																																					<p class="text-semibold"><i class="entypo-home" style="color: #bbb !important;"></i> Bank</p>
																																					<!-- START PANEL -->
																																					<p class="alert insight wd">
																																						<span>{{bank_name}}</span>
																																					</p>
																																					<!-- END PANEL -->
																																				</div>
																																			</div>
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
                                    <div class="col-md-12 alert toke hidden-xs" v-else>
                                      <p><i class="entypo-bookmark" style="color: #bbb !important;"></i> Plan Guide</p><br>
                                      <p class="text-semibold"><strong>Regular Top up</strong>; Minimum amount to recharge is
																																							{{minimum_top_up}}<br><br> <strong>Bundled Top up</strong>; Get 5% off on all messages sent when you make a bundled topup of
																																							{{bundled_top_up}}(<strong>NB</strong>: Discounts expires when your units get exhausted but only renews on your next bunlded topup) </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-5 col-md-5 col-md-height col-middle">
                            <div class="p-30 p-t-none p-b-none">
                              <div class="panel">
                                <div class="panel-body">
                                  <form  role="form" method="post" @submit.prevent="TopUp">
                                    <CustomSelect :options="options" @item-selected="itemSelected" :dropdown-style="dropdownStyle"></CustomSelect>
                                    <div id="regular-form-body" class="mt-20">
                                      <div class="form-group"  :style="{marginBottom: '10px'}" v-if="input_amount">
                                        <input type="text" class="form-control" placeholder="Amount" v-model="amount" :class="{'error': hasError}" @focusout="getExchangeRate($event)"> </div>
                                        <span class="error_field_message" v-if="error_message">{{error_message}}</span>
                                      <div class="form-group" v-if="selectPayment">
                                        <label>Select Payment Method</label>
                                        <select @change="onChange($event)" class="form-control">
                                          <option v-for="item in payment_method.data" :value="item.settings">{{item.name}}</option>
                                        </select>
                                      </div>
                                      <div class="form-group alert toke">
                                        <p class="text-semibold"><i class="entypo-cc" style="color: #079805 !important;"></i> Total:</p>
                                        <p > <div > <b>{{total}}</b> </div></p>
                                      </div>
                                      <div class="form-group">
                                        <p ><b>Notice:</b> <br>Also all payments would be remitted in Naira, but your accounts would be credited in your local currency. </p>
                                      </div>
                                      <button type="submit" class="btn bx-line btn-success btn-sm pull-right purchase_button" :disabled="isDisabled">
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
  </div>
</template>

<script>

    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import ServicePriceModal from "../../components/modals/ServicePriceModal";
    import CustomSelect from "../../components/general/dropdown/CustomSelect";
    import MonnifyModal from "../../components/modals/MonnifyModal";
				import {ContentLoader,} from 'vue-content-loader';
    export default {
        name: "funding",
        middleware: 'auth',
      components: {MonnifyModal, CustomSelect, ServicePriceModal, DashboardNavbar, Sidebar, ContentLoader},
      data() {
          return {
            isBundledForm: false,
            isRegularBody: true,
            isRegularForm: false,
            isLoading: false,
            payment_method:'',
											minimum_top_up:'',
            fund_button_text:'Fund Account',
            selected_payment_method:"",
            amount:'',
            showModal:false,
            account_number: '',
            account_balance: '',
            bank_name: '',
            options: ['Select Top Up Option',{id: '1', name: 'Regular Top Up'},{id: '2', name:'Bundled Top Up'},],
            payment_gateway:'',
            hasError: false,
												total: '',
										 	bundled_top_up:'',
            payment_url:'',
            selectPayment: false,
            input_amount:false,
            showMonnifyModal: false,
            error_message:'',
            dropdownStyle:{
              borderRadius:'8px'
            }

          }
      },
      computed:{
          isDisabled: function () {
              return (this.amount === '' || this.hasError)
          }
      },
      watch:{
        amount(value){
          this.amount = value;
          this.validateAmount(value);
        }
      },
      methods: {
          closeModal() {
            this.showModal = false;
          },
          async getWalletBalance() {
            try{
              let data = await this.$axios.$get('billing/wallet');
              this.account_balance = data.data.balance;
              this.bank_name  = data.data.bank_name;
              this.account_number = data.data.account_number;
            } catch(e){

            }
          },
        async getPaymentMethod(){
            try {
              let response_data = await this.$axios.$get('billing/payment-method');
             this.payment_method = response_data;
              this.payment_gateway = response_data.data[0].settings;
            }catch (e) {

            }
        },

									async TopUp() {
										if (this.showMonnifyModal) {
											this.$modal.show('monnify-modal')
										}	else {
											try {

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
													case('stripe'): {
														this.$stripe.import().redirectToCheckout({
															sessionId: response_data.data
														}).then(function (result) {
															this.$toast.error(result.error.message)
														});
														break;
													}
													case('spektra'):{
														window.location.href = response_data.data;
													}
												}

											} catch (e) {
												this.isLoading = false;
												this.fund_button_text = "Fund Account";
												this.$toast('Something went wrong. Try again');
											}
										}
									},
							async getExchangeRate(){
								try{
									let response_data = await this.$axios.$get('billing/exchange-rate', {params: {amount: this.amount,}});
									this.total = response_data.amount;
								}catch (e) {
									this.$toast('Something went wrong. Try again');
								}

							},
							async getTopUp(){
										try{
											let response = await this.$axios.$get('billing/top-up/plans');
										 this.amount = 	response.data.bundled_top_up.amount.substring(1);
											this.total = response.data.bundled_top_up.amount;
										}catch (e) {

										}
							},
							async getTopDetails(){
         try{
										let response = await this.$axios.$get('billing/top-up/plans');
										this.bundled_top_up =  response.data.bundled_top_up.amount;
										this.minimum_top_up = response.data.minimum_top_up.amount;
									}catch (e) {

									}
							},

							validateAmount(value){
            if (isNaN(value)){
              this.error_message = 'Please enter a valid amount';
              this.hasError = true;
            }
            else {
              this.error_message = '';
              this.hasError = false;
            }
        },
        onChange(event){
            if (event.target.value === 'monnify'){
              this.showMonnifyModal = true;
            }
          this.payment_gateway = event.target.value;
        },
        itemSelected(value){
            if (value === "2"){
              this.selectPayment = true;
              this.input_amount = false;
              this.getTopUp();
              this.getExchangeRate()
            } else if (value === "1"){
              this.selectPayment = true;
              this.input_amount = true;
            }

        }
      },
      mounted() {
          this.getWalletBalance();
          this.getPaymentMethod();
           this.getTopDetails();

      }
    }
</script>

<style >
  .fund-row {
    margin-left: 0px;
    margin-right: 0px;
  }
  .page-header {
    margin: 0;
    padding: 0;
    border-bottom-width: 0;
  }
  .page-header-content {
    margin: auto;
    max-width: 1280px;
  }
  .page-header-content {
    position: relative;
    background-color: inherit;
    padding: 0 20px;
  }
  .page-header:not(.page-header-filled) + .fund-page-container {
    padding-top: 35px;
  }
  .fund-page-container {
    margin: auto;
    padding-bottom: 10px;
  }
  @media (min-width: 769px){
    .fund-page-container {
      width: 100%;
      display: table;
      table-layout: fixed;
    }
  }
  @media (min-width: 769px){
    .fund-page-content {
      display: table-row;
    }
  }
  @media (min-width: 769px){
    .fund-content-wrapper {
      display: table-cell;
      vertical-align: top;
    }
  }
  .fund-content-wrapper {
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
  .btn {
    font-size: 14px;
  }
  button {
    color: inherit;
    font: inherit;
    margin: 0;
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
  .wd {
    border-radius: 2px;
    word-wrap: break-word;
  }
  .panel {
    box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);
    border: transparent;
    border-radius: 6px;
  }
  .panel-body {
    padding: 20px;
  }
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .form-control, .select2 {
    font-size: 13px;
    border-color: #bbb;
    border-radius: 5px;
    border: solid 1px rgba(204, 204, 204, 0.34);
    font-weight: 500;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 36px;
    padding: 7px 12px;
    font-size: 13px;
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
  .form-control:focus {
    border-color: #4DB6AC;
  }
  .form-group label {
    margin-bottom: 5px;
    display: block;
    font-weight: 600;
    line-height: 24px;
  }
  .bx-line {
    border: transparent !important;
  }
  .btn-sm, .btn-group-sm > .btn {
    line-height: 1.5384616;
    padding: 6px 11px;
    /* font-size: 13px; */
  }
  .btn-success {
    color: #fff;
    background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
  }

  .bootstrap-select > .btn.btn-default, .bootstrap-select > .btn.btn-default.disabled {
    background-color: #fff;
    border: 1px solid transparent !important;
    border-color: #ddd !important;
  }

  .btn:active, .btn.active {
    -webkit-box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.1) inset;
  }
  .btn:focus, .btn.focus {
    box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.05) inset;
    outline: 0;
  }
  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
  }


</style>
