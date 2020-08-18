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
                                          <date-picker v-model="date_time" value-type="DD-MM-YYYY" type="date" range style="width: 100%"  confirm></date-picker>
                                        </div>
                                        <div class="col-md-2">
                                          <input type="submit" value="Filter"  class="btn btn-primary" />
                                        </div>
                                      </form>

                                      <form @submit.prevent="" method="POST">
                                          <div class="col-md-2">
                                            <input  type="submit" value="Export"  class="btn btn-danger" />
                                          </div>
                                      </form>

                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-5 col-md-height col-middle mt-20">
                                <!-- START PANEL -->


                                <div class="col-md-6">
                                  <p><i class="entypo-light-up" style="color: #c10202 !important;"></i> Amount Funded </p>
                                  <!-- START PANEL -->
                                  <p class="alert toke insight wd" id="credit">
                                    <span id="credit-body">₦994383.55</span>
                                  </p>
                                  <!-- END PANEL -->
                                </div>

                                <div class="col-md-6">
                                  <p><i class="entypo-light-up" style="color: #c10202 !important;"></i>Amount Spent </p>
                                  <!-- START PANEL -->
                                  <p class="alert toke insight wd" id="debit">
                                    <span id="debit-body">₦-745912.97 {{date_time[0]}}</span>
                                  </p>
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
                      <div class="panel-body p-15 p-t-none p-b-none">
                        <div class="row">

                          <div class="pml-table-container">
                            <table class="table table-box pml-table"
                                   >

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
                      v-show="showPagination === true">

                    </pagination>
                  </section>
                </main>
              </div>
            </div>
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
    export default {
        name: "history",
        middleware:'auth',
       components: {Pagination, DashboardNavbar, Sidebar,DatePicker },
      data(){
          return{
            transaction_history: [],
            date_time:"null",
            page: 1,
            total_page:'',
            showPagination: false
          }
      },
      methods:{
        async getWalletTransaction(){
         let response_data =  await this.$axios.$get('billing/wallet/transactions', {params: {page: this.page}});
         this.transaction_history = response_data.data;
         if (response_data.data.length !== 0 && response_data.meta.last_page > 1){this.showPagination = true}
         this.page = response_data.meta.current_page;
         this.total_page = response_data.meta.last_page;
        },
        async getWalletTransactionByDate(){
          await this.$axios.$get('billing/wallet/transactions',{
            params:{
              datetime: this.date_time[0] + "," + this.date_time[1]
            }
          })
        },
        getRange(){
          console.log(this.date_time + " ll")
        },
        onPageChange(page) {
          this.page = page;
          this.getWalletTransaction();

        },

      },
      mounted() {
        this.getWalletTransaction();
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
