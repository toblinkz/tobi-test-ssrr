<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2 ">
      <Sidebar class="hidden-xs"></Sidebar>
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
              <section class="wrapper-bottom-sec">
                <div class="jumbotron" data-pages="parallax">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <div class=" mt-50 ">
                        <div class="row ">
                          <div class="col-lg-6 col-md-5  col-middle ">
                            <div class="panel-transparent">
                              <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-flag"></i>Campaign - {{campaign_id}}</p>
                              <div class="insight">
                                <p>Your Messaging Campaign   was triggered at  {{triggered_date}} </p>
                              </div>
                            </div>
                            <br>
                            <div class="col-lg-6" style="padding-left: 0;">
                              <form @submit.prevent="fetch" role="form" method="get" id="search-form">
                                <div class="row">
                                  <div class="form-group">
                                    <input type="text" placeholder="Phone Number"   class="form-control" v-model="phone_number">
                                  </div>
                                </div>
                                <button type="submit" class="btn btn-success wd-100 bx-line"><i class="fa fa-search"></i> Search</button>
                              </form>
                              <br />
                              <form  @submit.prevent="getReportDownloadUrl" method="get" role="form">
                                <button type="submit" class="btn btn-primary wd-100 bx-line" :disabled="isDisabled"><i class="fa fa-level-down" v-show="!isLoading"></i> 	<span v-show="isLoading">
																																	<img src="/images/spinner.svg" height="20px" width="20px"/>
																															</span> {{download_report_button_text}}</button>
																														</form>

                            </div>
                          </div>

                          <div class="col-lg-6 col-md-5 col-md-height col-middle hidden-xs" >
                            <!-- START PANEL -->
                            <div class="full-height">
                              <ManageCampaignChart
                                :campaign_id="campaign_id"
                              ></ManageCampaignChart>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
															<TableVuePlaceHolder v-if="!show_shimmer">

															</TableVuePlaceHolder>
                <div class="col-md-12" v-else>
                  <div class="p-15">
                    <div class="row">
                      <div class="col-lg-12 panel">
                        <div role="tabpanel" class="mt-50" id="recipients">
                          <table class="table  table-hover">
                            <thead>
                            <tr>
                              <th style="width: 5%">Sent At</th>
                              <th style="width: 5%">Number</th>
                              <th style="width: 25%">Message</th>
                              <th style="width: 5%">Amount</th>
                              <th style="width: 5%">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="row in manage_campaign_list" :key="row.sent_at">
                              <td style="width: 5%">{{row.created_at}}</td>
                              <td style="width: 5%">{{row.receiver}}</td>
                              <td style="width: 25%">{{row.message}}</td>
                              <td style="width: 5%">{{row.amount}}</td>
                              <td style="width: 5%">{{row.status}}</td>
                            </tr>
                            </tbody>
                          </table>
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
			<VerificationModal></VerificationModal>
  </div>
</template>

<script>
    import Sidebar from "../../../../components/general/Sidebar";
    import DashboardNavbar from "../../../../components/general/navbar/DashboardNavbar";
    import ManageCampaignChart from "../../../../components/general/charts/ManageCampaignChart";
    import {mapGetters} from "vuex";
    import Swal from 'sweetalert2';
				import TableVuePlaceHolder from "../../../../components/general/TableVuePlaceHolder";
				import PieChartPlaceHolder from "../../../../components/general/PieChartPlaceHolder";
				import Pagination from "../../../../components/general/Pagination";
				import VerificationModal from "~/components/modals/VerificationModal";
    export default {
        name: "manage-campaign",
					   middleware: ['auth', 'inactive_user'],
								components: {VerificationModal, Pagination, PieChartPlaceHolder, TableVuePlaceHolder, ManageCampaignChart, DashboardNavbar, Sidebar},
								computed:{
										...mapGetters(['getCampaignCreatedDate'])
      },
      data() {
          return{
            manage_campaign_list:[],
												download_report_button_text: 'Download Campaign Report',
            campaign_id: this.$route.params.id,
												exportUrlReady: false,
            phone_number:'',
											isLoading:false,
											isDisabled:false,
            triggered_date: moment(this.getCampaignCreatedDate).format('lll'),
											 show_shimmer: false,
													page: 1,
													total_page:'',
													showPagination: false,

          }
      },
      methods:{
          async fetch(){
          	try{
												// get campaign report
												let response_data = await this.$axios.$get('sms/campaign/' + this.campaign_id + '/report', {params:{
													page: this.page,
														phone_number: this.phone_number
													}});
												this.manage_campaign_list = response_data.data
												if (this.manage_campaign_list.length !==0){this.showPagination = true;}
												this.page = response_data.meta.current_page;
												this.total_page = response_data.meta.last_page;
												this.show_shimmer = true;

												if (response_data.data.length === 0){
													await Swal.fire({
														icon: 'error',
														title: 'Oops...',
														text: 'Phone number could not be found',
													});
													this.$router.push({name: 'sms-campaign-reports'});
												}

											}catch (e) {

											}

          },

							onPageChange(page) {
								this.page = page;
								this.show_shimmer = false;
								this.fetch();
							},

							async getReportDownloadUrl(){

							try {
								this.isLoading = true;

								this.isDisabled = true;

								this.download_report_button_text = 'Preparing report for download';

								let data = await this.$axios.$get('sms/export/campaign/'+ this.campaign_id);

								this.isLoading = false;

								this.isDisabled = false;

								this.download_report_button_text = 'Download Campaign Report';

								await Swal.fire({
									title: 'Your report is ready',
									icon: 'success',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Download'
								}).then(async (result) => {
									if (result.value){

										window.open(encodeURI(data.data.file_url), '_blank')
									}
								});

							}catch (e){

							}
							}

      },
      mounted() {
							if(this.$store.state.view_verify_page === 'true'){
								this.$modal.show('verification-id-modal');
							}else {
								this.fetch();
								this.$store.commit('setCampaignCreatedDate', this.$route.params.created_at);
								this.triggered_date = moment(this.getCampaignCreatedDate).format('lll');
							}

      },

    }
</script>

<style scoped>

  .p-15 {
    padding: 15px!important;
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
  .jumbotron {
    margin-bottom: 10px;
    color: inherit;
    background-color: #fff;
  }
  @media screen and (min-width: 769px){
    .jumbotron {
      padding-top: 48px;
      padding-bottom: 48px;
    }
  }
  @media screen and (min-width: 769px){
    .container .jumbotron, .container-fluid .jumbotron {
      padding-left: 60px;
      padding-right: 60px;
    }
  }
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .form-control:focus {
    border-color: #4DB6AC;
    outline: 0;
    box-shadow: none;
  }
</style>
