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
          <div>
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
                                    <input type="text" placeholder="Phone Number"  class="form-control" v-model="phone_number">
                                  </div>
                                </div>
                                <button type="submit" :disabled="isDisabled"  class="btn btn-success wd-100 bx-line" style="border: 1px solid transparent;"><i class="fa fa-search"></i> Search</button>
                              </form>
                              <br />
                              <form  @submit.prevent="getReportDownloadUrl" method="get" role="form">
                                <button type="submit" class="btn btn-primary wd-100 bx-line" style="border: 1px solid transparent;" ><i class="fa fa-level-down" v-show="!isLoading"></i> 	<span v-show="isLoading">
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

                <div class="col-md-12" >
                  <div class="p-15">
                    <div class="row">
																					<div class="mb-10" style="display: flex; flex-direction: row">
																						<span class="" style="width: 50%; font-size: 15px"><i class="fa fa-circle  m-r-10 m-l-30"  style="color: #2D74AC"></i>Description</span>
																						<span style="width: 15%; font-size: 15px">Receiver</span>
																						<span style="width: 15%;font-size: 15px">Pages</span>
																						<span style="width: 25%;font-size: 15px">Status</span>
																					</div>
																					<div class="m-l-10 " style="border-bottom: dotted #ddd!important;"></div>
																					<TableVuePlaceHolder v-if="!show_shimmer">

																					</TableVuePlaceHolder>
																					<div class="mt-20" v-else>
																						<div class="row" v-for="row in manage_campaign_list" :key="row.id" v-show="manage_campaign_list.length > 0">
																							<div class="sms-history-card" style="display: flex; flex-direction: row">
																								<div><i class="entypo-chat"  style="font-size: 20px; color:#2D74AC; width: 5%"></i></div>
																								<div style="width: 45%">
																									<div class="bold m-l-10" style="font-size: 15px; font-weight: 500" >Outgoing Message from {{  row.sender }}</div>
																									<div class="m-t-5 m-l-10">	<span style="color: #898989">{{ row.created_at }}</span> 	<span class="m-l-10" style="color: #898989">Channel: {{ row.channel }}</span></div>
																									<div class="m-t-5 m-l-10" v-if="row.id !== message_id">{{row.message_abbreviation}}</div>
																									<div class="m-t-5 m-l-10" v-if="row.id === message_id">{{row.message}}</div>
																								</div>
																								<div style="width: 20%">
																									<div >{{row.receiver }}</div>
																								</div>
																								<div style="width: 12%">
																									<div>{{ row.amount }}</div>
																								</div>
																								<div style="width: 18%">
																									<div class="label" :class="rowStatusClass(row)" >{{row.status }}</div>
																								</div>
																								<div>
																									<span style="width: 5%;font-size: 15px" @click="expandMessageSent(row)">
																											<i class="fa fa-expand m-r-10 m-l-30" style="color: #2D74AC; cursor: pointer">
																											</i>
																									</span>
																								</div>
																							</div>
																						</div>
																						<div>
																							<div style="text-align: center; cursor: pointer" v-show="manage_campaign_list.length < 1">No data available</div>
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
												message_id:''

          }
      },
					computed:{
						...mapGetters(['getCampaignCreatedDate']),
						isDisabled: function () {
							 return(this.phone_number === '')
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
												if (response_data.meta.last_page > 1){this.showPagination = true;}
												this.page = response_data.meta.current_page;
												this.total_page = response_data.meta.last_page;
												this.show_shimmer = true;

												if (response_data.data.length === 0){
													await Swal.fire({
														icon: 'error',
														title: 'Oops...',
														text: 'Phone number could not be found',
													});
													await this.$router.push({name: 'sms-campaign-reports'});
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
							},
							rowStatusClass(row){
								switch (row.status) {
									case('Sent'):{
										return 'label-sent'
									}
									case ('Delivered'):{
										return 'label-delivered'
									}
									case('Failed'):{
										return 'label-failed'
									}
									case('Rejected'):{
										return 'label-rejected'
									}
								}

							},
							expandMessageSent(row){
								if (this.message_id === row.id){
									this.message_id = ''
									this.show_message_abbr = false;
								}else {
									this.message_id = row.id
								}

							},

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
		.sms-history-card{
			border-width: 1px;
			border-radius: 8px;
			background-color: white;
			box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);
			margin-bottom: 20px;
			padding: 40px 30px;
		}
		.label {
			font-size: 11px;
			padding: 2px 10px;
			margin: 2px 0;
			border-radius: 20px;
			font-weight: 500;
		}
		.label {
			display: inline-block;
			border: 1px solid transparent;
			/*text-transform: uppercase;*/
			letter-spacing: 0.1px;
		}
		.label-sent {
			border-color: #365899;
			color: #fff;
			background-color: #365899;
		}
		.label-failed {
			border-color:#ffc107;
			color: #fff;
			background-color: #ffc107;
		}
		.label-rejected {
			border-color:#FF0000;
			color: #fff;
			background-color:#FF0000;
		}
		.label-delivered{
			border-color:#226a4a;
			color: #fff;
			background-color:#226a4a;
		}

</style>
