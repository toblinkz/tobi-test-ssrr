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
                          <!-- END BREADCRUMB -->
                          <div class="mt-50 ">
                            <div class="row ">
                              <!--START PANEL -->
                              <div class="col-lg-6  col-md-7 ">
                                <div class="panel-transparent">
                                  <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-basket"></i> All Invoices!</p>
                                  <p class="insight">View, edit and pay for invoices generated on your account. All card payment types are accepted.
                                  </p>
                                  <div class="row">
                                    <a id="CHATID" class="btn btn-primary"><i class="entypo-plus-circled"></i> Submit request or complaint</a>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-5 col-md-height col-middle hidden-xs">
                                <div class="full-height">
                                  <div class="panel-body text-center">
                                    <img src="/images/payment.gif" class="wide">
                                  </div>
                                </div>
                              </div>
                              <!--END PANEL-->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="p-15">
                        <div class="row">
                          <center><div class="hrr-5"></div></center>
																									<TableVuePlaceHolder v-if="!showShimmer" >

																									</TableVuePlaceHolder>
                          <div class="col-lg-12" v-else>
                            <div class="scrollme">
                              <div class="row">
                                <div class="col-sm-6">
                                  <div class="dataTables_length" id="DataTables_Table_0_length">
                                    <label>
                                      Show
                                      <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-control input-sm" @change="filterByNumber($event)">
                                        <option value="10" >10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                      </select>
                                      entries
                                    </label>
                                  </div>
                                </div>
                                <div class="col-sm-6">
                                  <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                    <label>Search:<input type="search" class="form-control input-sm" v-model="searchQuery" aria-controls="DataTables_Table_0"></label>
                                  </div>
                                </div>
                              </div>
                              <table  class="table table-responsive data-table table-hover">
                                <thead>
                                <tr>
                                  <th style="width: 10%;">#</th>
                                  <th style="width: 10%;">Amount</th>
                                  <th style="width: 15%;">Invoice Date</th>
                                  <th style="width: 15%;">Due Date</th>
                                  <th style="width: 10%;">Status</th>
                                  <th style="width: 15%;">Type</th>
                                  <th style="width: 30%;">Manage</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(row, index) in filteredInvoices" :key="row.id" v-show="filteredInvoices.length > 0">
                                  <td>{{index + 1}}</td>
                                  <td>{{row.total}}</td>
                                  <td>{{row.datepaid}}</td>
                                  <td>{{row.duedate}}</td>
                                  <td>
                                    <span class="label" :class="statusClass(row)">{{row.status}}</span>
                                  </td>
                                  <td>
                                    <span class="label label-success" v-show="showRecurringLabel(row)" >Recurring</span>
                                    <span class="label label-success" v-show="showOnetimeLabel(row)">Onetime</span>
                                  </td>
                                  <td>
                                    <nuxt-link :to="{path: 'view/' + row.id, params:{id: row.id}}" class="btn btn-success btn-xs"><i class="fa fa-eye"></i> View</nuxt-link>
                                  </td>

                                </tr>
																																<tr>
																																	<td  colspan="7" style="text-align: center; cursor: pointer" v-show="filteredInvoices.length < 1">No data available in table</td>
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
                <Pagination
                  :page="page"
                  :total_page="total_page"
                  :on-page-change="onPageChange"
                  v-show="showPagination === true"
                ></Pagination>
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
		import TableVuePlaceHolder from "../../components/general/TableVuePlaceHolder";

  export default {
        name: "all",
      components: {TableVuePlaceHolder, Pagination, DashboardNavbar, Sidebar},
			   middleware: 'auth',
      data(){
          return{
            all_invoice :[],
            page: 1,
            total_page: '',
            showPagination: false,
												searchQuery: '',
											showShimmer:false,
          }
      },
					computed:{
       filteredInvoices(){
       	if (this.searchQuery){
       		return this.all_invoice.filter(item => {
       				return item.status.includes(this.searchQuery) ||
														item.total.toString().includes(this.searchQuery ) ||
													item.duedate.toString().includes(this.searchQuery)
												item.datepaid.toString().includes(this.searchQuery);
									})
								}else {
       		return this.all_invoice;
								}
							}

					},
      methods: {

							async fetch(){

								try {
									//get all billing invoices
									let response_data = await this.$axios.$get('billing/invoices', {params:{page: this.page}});
									if (response_data.meta.last_page > 1 ){
										this.showPagination = true
									}else {
										this.showPagination = false
									}
									this.all_invoice = response_data.data;
									this.showShimmer = true;
									this.page = response_data.meta.current_page;
									this.total_page = response_data.meta.last_page;
								}catch (e) {

								}
							},

								async filterByNumber(event){
									let response_data = await this.$axios.$get('billing/invoices', {params:{page: this.page}});
									if (response_data.meta.last_page > 1 ){
										this.showPagination = true
									}else {
										this.showPagination = false
									}
									if (event.target.value !== "10"){
										this.all_invoice = response_data.data
									}else {
										this.all_invoice = response_data.data.slice(0, 10);
									}


								},
        showRecurringLabel(row){
            return (row.recurring === 0)
        },
        showOnetimeLabel(row){
            return(row.recurring !== 0)
        },
        statusClass(row){
            if (row.status === 'Paid'){
              return 'label-success'
            } else if (row.status === 'Unpaid'){
              return 'label-warning'
            }
        },
        onPageChange(page) {
          this.page = page;
          this.showShimmer = false;
          this.fetch();
        }

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
    .form-inline .form-control {
      display: inline-block;
      width: auto;
      vertical-align: middle;
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
    color: #fff;
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
  .dataTables_length {
    float: right;
    display: inline-block;
    margin: 0 0 20px 20px;
  }
  .dataTables_length > label {
    margin-bottom: 0;
  }
  .form-control, .select2 {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    font-size: 13px;
    border-color: #bbb;
    border-radius: 5px;
    border: solid 1px rgba(204, 204, 204, 0.34);
    font-weight: 500;
  }
  select.input-sm {
    height: 34px;
    line-height: 34px;
  }
  .dataTables_filter {
    position: relative;
    display: block;
    float: left;
    margin: 0 0 20px 20px;
  }
  .dataTables_filter input {
    outline: 0;
    width: 200px;
    height: 36px;
    padding: 7px 12px;
    padding-right: 34px;
    font-size: 13px;
    line-height: 1.5384616;
    color: #333333;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  .dataTables_filter > label:after {
    content: "\e98e";
    font-family: 'icomoon';
    font-size: 12px;
    display: inline-block;
    position: absolute;
    top: 12px;
    right: 12px;
    color: #999999;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


</style>
