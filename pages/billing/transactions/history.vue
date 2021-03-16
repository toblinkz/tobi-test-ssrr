<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2 ">
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
                  <section class="container wrapper-bottom-sec">

                    <div data-pages="parallax">
                      <div class="container-fluid container-fixed-lg">
                        <div class="inner">
                          <!-- END BREADCRUMB -->
                          <div class="container-md-height mt-100 ">
                            <div class="row row-md-height">
                              <div class="col-lg-6 col-md-height col-md-7 col-top">
                                <!-- START PANEL -->
                                <div class="panel-transparent">
                                  <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-basket"></i> Transaction History!</p>
                                  <p class="insight">View all transaction activity performed on the wallet.
                                  </p>
                                  <div class="row">
                                    <div class="row top-list-controls">

                                      <form @submit.prevent="getWalletTransactionByDate" method="GET">
                                        <div class="col-md-6">
                                          <date-picker v-model="date_time" value-type="YYYY-MM-DD " type="date" range style="width: 100%" placeholder="Select date range"  confirm></date-picker>
                                        </div>
                                        <div class="col-md-2">
                                          <button type="submit"  :disabled="isDisabled"  class="btn btn-success">
																																												<span v-show="isLoading">
                                         <img src="/images/spinner.svg" height="20px" width="30px"/>
                                         </span>
																																											{{filterText}}
																																										</button>
                                        </div>
                                      </form>

                                      <div @click="showExportModal">
                                          <div class="col-md-2">
                                            <input  type="submit" value="Export"  class="btn btn-primary" />
                                          </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="col-lg-6 col-md-5 col-md-height col-middle mt-20" >
                                <!-- START PANEL -->
																															<ContentLoader v-if="!amount_spent"
																																														:speed="2"
																																														:animate="true"
																															>
																																<rect x="4" y="13" rx="2" ry="2" width="628" height="12" />
																																<rect x="4" y="36" rx="2" ry="4" width="628" height="12" />
																																<rect x="4" y="86" rx="2" ry="6" width="628" height="12" />
																																<rect x="4" y="61" rx="2" ry="8" width="628" height="12" />
																																<rect x="4" y="140" rx="2" ry="8" width="628" height="12" />

																															</ContentLoader>
																															<div v-else>
																																<div class="col-md-6" >
																																	<p><i class="entypo-light-up" style="color: #c10202 !important;"></i> Amount Funded </p>
																																	<!-- START PANEL -->
																																	<p class="alert toke insight wd" id="credit">
																																		<span id="credit-body">{{amount_funded}}</span>
																																	</p>
																																	<!-- END PANEL -->
																																</div>
																																<div class="col-md-6" >

																																	<div >
																																		<p><i class="entypo-light-up" style="color: #c10202 !important;"></i>Amount Spent </p>
																																		<!-- START PANEL -->
																																		<p class="alert toke insight wd" id="debit">
																																			<span id="debit-body">{{amount_spent}}</span>
																																		</p>
																																	</div>

																																</div>

                                  <!-- END PANEL -->
                                </div>

                                <!-- END PANEL -->
                              </div>
                            </div>
                            <!-- END PANEL -->
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="col-md-12 panel mt-50">
																					<TableVuePlaceHolder v-if="!show_shimmer" >

																					<TableVuePlaceHolder v-if="show_shimmer" >
																					</TableVuePlaceHolder>

                      <div class="panel-body p-15 p-t-none p-b-none" v-else>
                        <div class="row" >
                          <div class="pml-table-container"  style="overflow-x:auto;">
                            <table class="table table-box pml-table">

                              <thead>
                              <tr>
                                <th >Date</th>
                                <th >Balance Before</th>
                                <th >Amount</th>
                                <th >Balance After</th>
                                <th >Type</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="row in transaction_history" :key="row.date">
                                <td>{{row.transaction_date}}</td>
                                <td>{{row.balance_before_transaction}}</td>
                                <td>{{row.transaction_amount}}</td>
                                <td>{{row.balance_after_transaction}}</td>
                                <td>{{row.transaction_type}}</td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <pagination
                      :page="page"
                      :total_page="total_page"
                      :on-page-change="onPageChange"
                      v-show="showPagination">

                    </pagination>
                  </section>
                </main>
              </div>
            </div>

											<TransactionHistoryModal></TransactionHistoryModal>
											<VerificationModal></VerificationModal>
          </div>
    </div>
  </div>
</template>

<script>
    import Sidebar from "../../../components/general/Sidebar";
    import DashboardNavbar from "../../../components/general/navbar/DashboardNavbar";
    import Pagination from "../../../components/general/Pagination";
    import DatePicker from "vue2-datepicker";
    import 'vue2-datepicker/index.css';
				import TableVuePlaceHolder from "../../../components/general/TableVuePlaceHolder";
				import {ContentLoader,} from 'vue-content-loader';
				import TransactionHistoryModal from "../../../components/modals/TransactionHistoryExportModal";
				import VerificationModal from "~/components/modals/VerificationModal";
    export default {
        name: "history",
					   middleware: ['auth', 'inactive_user', 'permission'],
        components: {
									VerificationModal,
									TransactionHistoryModal,
									TableVuePlaceHolder, Pagination, DashboardNavbar, Sidebar,DatePicker , ContentLoader},
      data(){
          return{
            transaction_history: [],
												isLoading: false,
												filterText: 'Filter',
            date_time: null,
            page: '',
            total_page:'',
            amount_spent:'',
            amount_funded:'',
            showPagination: true,
												show_shimmer: true,
											customer_permissions: localStorage.getItem('permissions'),
          }
      },
					computed: {
							isDisabled: function () {
										return this.date_time === null;
							}
					},
      methods:{

							async fetch(){
								try {

									this.show_shimmer = true;

									let transactions = await this.setTransactionData(null, this.page);

									let transaction_sum = await this.setTransactionSumData(null);

									this.show_shimmer = false;

								}catch (e) {

									this.show_shimmer = false;
									this.$toast.error("Something went wrong");

								}
							},

        async getWalletTransactionByDate(){

									try
									{
										this.setLoadingAndFilterText()
										this.show_shimmer = true;
										let transactions = await this.setTransactionData(this.date_time, this.page);

										let transaction_sum = await this.setTransactionSumData(this.date_time);

										this.setLoadingAndFilterText()
										this.show_shimmer = false;
										this.$toast.success('Done');
										}
										catch (e)
										{
											this.show_shimmer = false;
											this.setLoadingAndFilterText()
											this.$toast.error("Something went wrong.")
										}
        },

							async setTransactionData(date, page){
								const { data } = await this.$billing.getTransactionHistory(date, page);
								this.transaction_history = data.data
								this.showPagination = data.meta.last_page > 1;
								this.page = data.meta.current_page;
								this.total_page = data.meta.last_page;
							},

							async setTransactionSumData(date) {
								const {data} = await this.$billing.getTransactionSum(date);
								this.amount_funded = data.credit;
								this.amount_spent = data.debit;
							},

							setLoadingAndFilterText(){
								this.isLoading = !this.isLoading ;
								this.filterText = this.isLoading ? '' : 'Filter';
							},

        onPageChange(page) {
          this.page = page;
          this.fetch();
        },

							shimer(){
								this.show_shimmer = !this.show_shimmer;
							},

							showExportModal(){
        		this.$modal.show('transaction-history-modal');
							}
      },
					mounted() {
						(this.$store.state.view_verify_page === 'true') ?
							this.$modal.show('verification-id-modal'):
							this.fetch();
					},



				}
</script>

<style scoped>
  .page-header {
    margin: 0;
    padding: 0;
    border-bottom-width: 0;
  }
  .page-header-content {
    margin: auto;
    max-width: 1280px;
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
    position: relative;
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
    display: block;
  }
  .top-list-controls {
    margin-top: 20px;
  }
  .form-control{
    font-size: 13px;
    border-radius: 5px;
    border: 1px solid rgba(204, 204, 204, 0.34);
    font-weight: 500;
    box-shadow: none;
    display: block;
    width: 100%;
    height: 36px;
    padding: 7px 12px;
    line-height: 1.5384616;
    color: #333333;
    background-color: #fff;
    background-image: none;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
  }
  .btn-danger {
    color: #fff;
    background-color: #F44336;
    border-color: #F44336;
  }
  .wd {
    border-radius: 2px;
    /* word-wrap: break-word; */
  }
  .toke {
    background-color: #f5f5f5;
    border-color: #efefef;
    color: #595959 !important;
  }
  .alert {
    padding: 15px;
    /* margin-bottom: 20px; */
    border: 1px solid transparent;
    /* border-radius: 3px; */
  }
  .table-box {
    font-size: 14px;
    margin-top: 15px;
  }
  .table {
    width: 100%;
    max-width: 100%;
    /* margin-bottom: 20px; */
  }

  table {
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .table > thead:first-child > tr:first-child > th{
    border-top: 0;
  }
  .table > thead > tr > th {
    border-bottom: dotted #ddd !important;
    vertical-align: middle;
    padding: 12px 20px;
    line-height: 1.5384616;
  }
  th {
    font-weight: 500;
    text-align: left;
  }
  .table-box tr td:first-child {
    padding-left: 0;
    padding-right: 0;
  }
  .table-box tbody tr td{
    vertical-align: top;
    padding: 20px 10px;
  }
  .table > tbody > tr > td{
    line-height: 1.5384616;
  }

  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
  }


</style>
