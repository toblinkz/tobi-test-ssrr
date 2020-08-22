<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2 hidden-xs">
      <Sidebar></Sidebar>
    </div>
    <div class="col-md-10">
      <DashboardNavbar></DashboardNavbar>
      <!--Page header-->
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
                <div class="col-md-12">
                  <div class="jumbotron" data-pages="parallax">
                    <div class="container-fluid container-fixed-lg">
                      <div class="inner">
                        <!-- END BREADCRUMB -->
                        <div class="container-md-height m-t-20">
                          <div class="row ">
                            <center>
                              <!-- START PANEL -->
                              <div class="panel-transparent">
                                <p id="welcome" style="margin-top: 10px;margin-bottom: 15px"><i class="entypo-list-add"></i> Register your device ID!</p>
                                <p class="insight hidden-xs">Register your device to push out WhatsApp messages. <br>Approved device ID's are required to send messages on Termii!</p>

                                <div class="row">
                                  <center>
                                    <div class="col-sm-4 hidden-xs">
                                    </div>
                                    <div class="col-sm-4">
                                      <br>
                                      <a class="btn btn-primary" @click="showModal = true"><i class="fa fa-plus"></i> Make a new request</a>
                                    </div>
                                    <div class="col-sm-4 hidden-xs">
                                    </div>

                                  </center>
                                </div>
                              </div>
                            </center>
                          </div>
                          <!-- END PANEL -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="p-15 ">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="panel">
                            <div class="panel-body p-none scrollme">
                              <table class="table table-responsive  table-hover">
                                <thead>
                                <tr>
                                  <th style="width: 10%;" class="hidden-xs">SL#</th>
                                  <th style="width: 30%;">Device ID</th>
                                  <th style="width: 20%;">Status</th>
                                  <th style="width: 20%;">Total Messages Sent Today</th>
                                  <th style="width: 20%;">Scan Device</th>
                                  <th style="width: 20%;"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td data-label="SL" class="hidden-xs">1</td>
                                  <td data-label="Sender ID"><p>Drugstore</p></td>
                                  <td data-label="Status"><p class="label label-success">Approved</p>
                                  </td>
                                  <td data-label="Sender ID"><p>0</p></td>
                                  <td data-label="Status">
                                    <button id="get-qr-code-29" onclick="getQRCode('29')" style=" background: #4caf50; border: 1px solid #4caf50; border-radius: 3px;"><i class="fa fa-barcode" style="color: #fff;"></i></button>
                                  </td>
                                  <td data-label="view subscriptions">
                                    <nuxt-link class="btn btn-primary" to="/device/subscriptions">manage device</nuxt-link>
                                  </td>
                                </tr>
                                <tr>
                                  <td data-label="SL" class="hidden-xs">2</td>
                                  <td data-label="Sender ID"><p>TermiiW</p></td>
                                  <td data-label="Status"><p class="label label-warning">Pending Approval</p></td>
                                  <td data-label="Sender ID"><p>0</p></td>
                                  <td data-label="Status">
                                    <p><i class="entypo-lock" style="color: red;"></i></p>
                                  </td>
                                  <td data-label="view subscriptions">
                                    <nuxt-link class="btn btn-primary" to="/device/subscriptions">manage device</nuxt-link>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
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
    <DeviceModal v-if="showModal" @close="closeModal"></DeviceModal>
  </div>
</template>

<script>
    import Sidebar from "../components/general/Sidebar";
    import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
    import DeviceModal from "../components/modals/DeviceModal";
    export default {
        name: "devices",
      components: {DeviceModal, DashboardNavbar, Sidebar},
      data(){
          return{
            showModal: false
          }
      },
      methods: {
        closeModal() {
          this.showModal = false;
        },
      }
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

    margin-bottom: 10px;
    color: inherit;
    background-color: #fff;
  }
  .btn-primary {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
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
  .btn-primary:hover {
    color: #fff;
    background-color: #0c7cd5;
    border: 1px solid transparent !important;
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
  .label-warning {
    background-color: #FF5722;
  }
  .label-success {
    border-color: #4CAF50;
    color: #fff;
    background-color: #4CAF50;
  }

</style>
