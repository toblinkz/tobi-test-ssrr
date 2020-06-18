<template>
  <div>
  <div class="container-fluid body">
    <div class="row">
      <div id="msb" class="col-md-2 hidden-xs">
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
                <section class="wrapper-bottom-sec mt-50">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <!-- END BREADCRUMB -->
                      <div class="container-md-height">
                        <div class="row">
                          <div class="col-md-6">
                            <!-- START PANEL -->
                            <div class="panel-transparent">
                        <span id="welcome"><i class="entypo-credit-card"></i>
                                            Wallet Name - Termii Webtech
                        </span>
                              <p class="insight">Select your preferred payment gateway and top up your <br>account using card or bank transfer</p>
                            </div>
                            <!-- Trigger the modal with a button -->
                            <button type="button" @click="showModal = true" style="border: 1px solid #E6E6E6 !important; background: #fff !important;" class="btn btn-blue btn-cons hidden-xs mb-30" ><i class="entypo-popup"></i> View full messaging prices</button>
                          </div>
                        </div>
                        <div class="row row-md-height">
                          <div class="col-lg-7 col-md-height col-md-7 col-top">
                            <!-- START PANEL -->
                            <div class="panel-transparent">
                              <div class="row">
                                <!-- START PANEL -->
                                <div class="panel-transparent">
                                  <div class="row">

                                    <div class="col-md-4 alert toke">
                                      <p class="text-semibold"><i class="entypo-credit-card" style="color: #bbb !important;"></i> Balance</p>
                                      <!-- START PANEL -->
                                      <p class="alert insight wd">
                                        <span>₦258462.78</span>
                                      </p>
                                      <!-- END PANEL -->
                                    </div>
                                    <div class="col-md-4 alert toke">
                                      <p class="text-semibold"><i class="entypo-light-up" style="color: #bbb !important;"></i> Account</p>
                                      <!-- START PANEL -->
                                      <p class="alert insight wd">
                                        <span>2000004394</span>
                                      </p>
                                      <!-- END PANEL -->
                                    </div>
                                    <div class="col-md-4 alert toke">
                                      <p class="text-semibold"><i class="entypo-home" style="color: #bbb !important;"></i> Bank</p>
                                      <!-- START PANEL -->
                                      <p class="alert insight wd">
                                        <span>Providus Bank</span>
                                      </p>
                                      <!-- END PANEL -->
                                    </div>
                                    <div class="col-md-12 alert toke hidden-xs">
                                      <p><i class="entypo-bookmark" style="color: #bbb !important;"></i> Plan Guide</p><br>
                                      <p class="text-semibold"><strong>Regular Top up</strong>; Minimum amount to recharge is ₦3000<br><br> <strong>Bundled Top up</strong>; Get 5% off on all messages sent when you make a bundled topup of  ₦36660 (<strong>NB</strong>: Discounts expires when your units get exhausted but only renews on your next bunlded topup) </p>
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
                                  <form class="form" role="form" method="post" action="http://sandbox.termii.com/billing/fund">
                                    <Dropdown2 v-bind:options="options" label="Select Top Up Option" @changeForm="changeForm"></Dropdown2>
                                    <!--regular-body!-->
                                    <div id="regular-body" class="mt-20" v-show="isShow">
                                      <div class="form-group alert toke">
                                        <p class="text-semibold"><i class="entypo-cc" style="color: #079805 !important;"></i> Total:</p>
                                        <p id="exchange_approximate"></p>
                                      </div>
                                      <div class="form-group">
                                        <p id="exchange_approximate"><b>Notice:</b> <br>All payments would be remitted in Naira, but your balance would be displayed in your local currency. </p>
                                      </div>
                                    </div>
                                    <!--regular form body!-->
                                    <div id="regular-form-body" class="mt-20" v-show="isShow">
                                      <div class="form-group"><input type="text" class="form-control" value="" name="amount" id="amount" placeholder="Amount" onchange="getTransaction()"> </div>
                                      <div class="form-group">
                                        <label>Select Payment Method</label>
                                        <Dropdown2 v-bind:options="payment_method" label="Paystack"></Dropdown2>
                                      </div>
                                      <div class="form-group alert toke">
                                        <p class="text-semibold"><i class="entypo-cc" style="color: #079805 !important;"></i> Total:</p>
                                        <p id="exchange_approximate"></p>
                                      </div>
                                      <div class="form-group">
                                        <p id="exchange_approximate"><b>Notice:</b> <br>Also all payments would be remitted in Naira, but your accounts would be credited in your local currency. </p>
                                      </div>
                                      <input type="hidden" name="_token" value=""> <button type="submit" class="btn bx-line btn-success btn-sm pull-right purchase_button">Fund Account </button>
                                    </div>
                                    <!--bundled form body!-->
                                    <div id="bundle-form-body">
                                      <div class="form-group"><input type="hidden" class="form-control" value="36660" name="amount" id="amount" placeholder="Amount"> </div>
                                      <div class="form-group">
                                        <label>Select Payment Method</label>
                                        <Dropdown2 v-bind:options="payment_method" label="Paystack"></Dropdown2>
                                      </div>
                                      <div class="form-group alert toke">
                                        <p class="text-semibold"><i class="entypo-cc" style="color: #079805 !important;"></i> Total:</p>
                                        <p id="exchange_approximate">₦36660</p>
                                      </div>
                                      <div class="form-group">
                                        <p id="exchange_approximate"><b>Notice:</b> <br>Also all payments would be remitted in Naira, but your accounts would be credited in your local currency. </p>
                                      </div>
                                      <input type="hidden" name="_token" value=""> <button type="submit" class="btn bx-line btn-success btn-sm pull-right purchase_button"> Fund Account </button>
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
      <ServicePriceModal v-if="showModal" @close="closeModal"></ServicePriceModal>
    </div>
  </div>


  </div>
</template>

<script>

    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import ServicePriceModal from "../../components/modals/ServicePriceModal";
    import Dropdown2 from "../../components/general/dropdown/Dropdown2";
    export default {
        name: "funding",
      components: {Dropdown2, ServicePriceModal, DashboardNavbar, Sidebar},
      data() {
          return {
            isShow: false,
            showModal:false,
            options: ['Select Top Up Option', 'Regular Top Up', 'Bundled Top Up'],
            payment_method:['Paystack','Monnify','Coin Payment']

          }
      },
      methods: {
          closeModal() {
            this.showModal = false;
          },
        changeForm(event){
            console.log("jhjh")
            console.log(event.target.value)
        }
      }
    }
</script>

<style>
  .row {
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
  @media (min-width: 769px){
    .page-content {
      display: table-row;
    }
  }
  @media (min-width: 769px){
    .content-wrapper {
      display: table-cell;
      vertical-align: top;
    }
  }
  .content-wrapper {
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
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
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


</style>
