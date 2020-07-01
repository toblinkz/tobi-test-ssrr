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
                          <div class="col-lg-6 mb-20">
                            <!-- START PANEL -->
                            <div class="col-md-10">
                              <div class="panel-transparent mt-30">
                                <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-chart-pie"></i> Messaging Insight</p>
                                <p class="insight">View all your messaging insights. <br>Insights captured here include all sent messages.</p>
                              </div>

                              <div class="row">
                                <form class="" action="http://sandbox.termii.com/sms/history" role="form" method="get" id="search-form">
                                  <div class="row">
                                    <div class="col-md-7 mb-20" style="padding-left: 0px;padding-right: 0px;">
                                      <input type="text" placeholder="Phone Number"   class="form-control" name="phone">
                                    </div>

                                    <div class="col-md-5 mb-20" style="padding-right: 0px;">
                                      <input type="text" class="form-control" id="datetimerange" name="datetimerange"  placeholder="Date Range" />
                                    </div>
                                  </div>
                                  <center>
                                    <button type="submit" class="btn btn-success wd-100 bx-line"><i class="fa fa-search"></i> Search</button>
                                  </center>
                                </form>
                                <form action="http://sandbox.termii.com/sms/history/export" method="POST" class="mt-20">
                                  <center> <button type="submit" class="btn btn-danger wd-100 bx-line" ><i class="fa fa-level-down"></i> Download report in excel</button></center>
                                </form>

                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6 mb-20">
                              <DashboardChart ></DashboardChart>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="panel">
                        <div class="panel-body scrollme" style="padding: 10px !Important;">
                          <table class="table table-responsive data-table table-hover">
                            <thead>
                            <tr>
                              <th style="width: 5%;">Date</th>
                              <th style="width: 5%;">Channel</th>
                              <th style="width: 5%;">From</th>
                              <th style="width: 5%;">To</th>
                              <th style="width: 10%;">Status</th>
                              <th style="width: 10%;">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="row in messages_sent" :key="row.date">
                              <td style="width: 5%;">{{row.date}}</td>
                              <td style="width: 5%;">{{row.channel}}</td>
                              <td style="width: 5%;">{{row.from}}</td>
                              <td style="width: 5%;">{{row.to}}</td>
                              <td style="width: 10%;">{{row.status}}</td>
                              <td style="width: 10%;">
                                <a class="btn btn-success btn-xs" @click="showModal = true" ><i class="entypo-popup"></i> View</a>
                              </td>
                            </tr>
                            </tbody>
                          </table>
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
    <SmsHistoryModal v-if="showModal" @close="closeModal"></SmsHistoryModal>
    </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import SmsHistoryModal from "../../components/modals/SmsHistoryModal";
    import DashboardChart from "../../components/general/charts/SmsHistoryChart";
    export default {
        name: "history",
      components: {DashboardChart, SmsHistoryModal, DashboardNavbar, Sidebar},
      head(){
        return{
          script: [
            { src: 'https://cdn.jsdelivr.net/jquery/latest/jquery.min.js' },
            { src: 'https://cdn.jsdelivr.net/momentjs/latest/moment.min.js'},
            { src: 'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js'},
          ],
          link: [
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css' }
          ]
        }
      },
      data(){
          return{
            isShow: false,
            showModal:false,
            messages_sent: [
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
              {date:"2020-06-19 14:41:07", channel:"DND", from:"OTPAlert", to: "2347089509657", status:"Message Sent"},
            ],
          }
      },
      mounted() {
        $(function() {
          $('input[name="datetimerange"]').daterangepicker({
            timePicker: true,
            startDate: moment().startOf('hour'),
            endDate: moment().startOf('hour').add(32, 'hour'),
            locale: {
              format: 'M/DD/YYYY h:mm:ss'
            }
          });
        });
      },
      methods: {
        closeModal() {
          this.showModal = false;
        }
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
    /* padding-top: 30px; */
    /* padding-bottom: 10px; */
    margin-bottom: 10px;
    color: inherit;
    background-color: #fff;
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
    font-weight: 600;
  }
  .label {
    display: inline-block;
    border: 1px solid transparent;
    text-transform: uppercase;
    letter-spacing: 0.1px;
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
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

</style>
