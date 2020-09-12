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
                      <div class="mt-50 ">
                        <div class="row ">
                          <div class="col-lg-6 mb-20">
                            <!-- START PANEL -->
                            <div class="panel-transparent mt-30">
                              <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-chart-pie"></i> Group Sms Insight</p>
                              <p class="insight">View all your group text insights. <br>Insights captured here include all sent messages.</p>
                            </div>
                          </div>
                          <div class="col-lg-4 mb-20">
                            <form @submit.prevent="filterCampaignReport" role="form" method="get" id="search-form">
                              <div class="row">
                                <div class="form-group">
                                  <date-picker v-model="date_time" value-type="YYYY-MM-DD " type="date" range style="width: 100%" placeholder="Select date range"  confirm></date-picker>
                                </div>
                              </div>

                              <button type="submit" class="btn btn-success wd-100 bx-line" :disabled="Disabled">
																															<i class="fa fa-search" v-show="showIcon"></i>
																															{{searchText}}
																															<span v-show="isLoading">
                                         <img src="/images/spinner.svg" height="20px" width="80px"/>
                                      </span>
																														</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
																	<TableVuePlaceHolder v-if="!show_shimmer">

																	</TableVuePlaceHolder>
                  <div class="col-md-12" v-else>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="panel">
                          <div class="panel-body scrollme" style="padding: 10px !Important;">
                            <table class="table table-responsive data-table table-hover">
                              <thead>
                              <tr>
                                <th style=""></th>
                                <th style="">Date</th>
                                <th style="">From</th>
                                <th style="">Recipients</th>
                                <th style="">Status</th>
                                <th style="">Action</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="row in campaign_report" :key="row.campaign_id">
                                <td style="">{{row.campaign_id}}</td>
                                <td style="" id="created-at">{{row.created_at}}</td>
                                <td style="">{{row.sender}}</td>
                                <td style="">{{row.total_recipients}}</td>
                                <td style="">
                                  <span class="label label-flat label-success" v-show="showDeliveredLabel(row)">Delivered</span>
                                  <span class="label label-flat bg-warning" v-show="showInProgressLabel(row)">In Progress</span>
                                </td>
                                <td style="">
                                  <nuxt-link class="btn btn-success btn-xs"  :aria-disabled="isDisabled(row)" :to="{name:'sms-campaign-history-id', params:{id: row.campaign_id, created_at: row.created_at}}" ><i class="entypo-popup"></i> Reports </nuxt-link>
                                </td>
                              </tr>
                              </tbody>
                            </table>
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
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import Pagination from "../../components/general/Pagination";
    import DatePicker from "vue2-datepicker";
    import 'vue2-datepicker/index.css';
				import TableVuePlaceHolder from "../../components/general/TableVuePlaceHolder";
    export default {
        name: "campaign-reports",
      middleware: 'auth',
      components: {TableVuePlaceHolder, Pagination, DashboardNavbar, Sidebar, DatePicker},
      data(){
          return{

												isLoading: false,
												showIcon: true,
											 searchText: 'Search',
            campaign_report:[],
            date_time: null,
            page: 1,
            total_page:'',
            showPagination: false,
										 	show_shimmer: false,
          }
      },
					computed:{
       Disabled: function () {
										return (this.date_time === null);
							}
					},
      methods:{
          async fetch(){
          	//get campaign report
            try {
              let response_data = await this.$axios.$get('sms/campaign/reports', {params: {page: this.page}});
              this.campaign_report = response_data.data;

              if (this.campaign_report.length !== 0){this.showPagination = true;}
              this.page = response_data.meta.current_page;
              this.total_page = response_data.meta.last_page;
              this.show_shimmer = true;

            }catch (e) {

            }
          },
									async filterCampaignReport(){
										this.isLoading = true;
										this.searchText = '';
										this.showIcon = false;
										try {
											let response_data = await this.$axios.$get('sms/campaign/reports', {params:
													{page: this.page,
														date_from: this.date_time[0],
														date_to: this.date_time[1]}});
											this.campaign_report = response_data.data;

											if (this.campaign_report.length !== 0){this.showPagination = true;}
											this.page = response_data.meta.current_page;
											this.total_page = response_data.meta.last_page;
											this.show_shimmer = true;

											this.isLoading = false;
											this.searchText = 'Search';
											this.showIcon = true;

											this.$toast.success('Search completed');
										}catch (e) {
											this.$toast.error('Something went wrong. Try again!');
											this.isLoading = false;
											this.searchText = 'Search';
											this.showIcon = true;
										}
									},
        isDisabled(row){
          return(row.status !== 'Delivered');
        },
        onPageChange(page) {
          this.page = page;
          this.show_shimmer = false;
          this.fetch();
        },
        showDeliveredLabel(row){
            return(row.status === 'Delivered');
          },
        showInProgressLabel(row){
            return(row.status !== 'Delivered');
        },


      },
      mounted() {
          this.fetch();

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
    white-space: nowrap;
  }
  .bx-line {
    border: transparent !important;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-control:focus {
    border-color: #4DB6AC;
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
  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
  }
</style>
