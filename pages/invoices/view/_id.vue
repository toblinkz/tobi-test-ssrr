<template>
  <div>
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
              <section class="wrapper-bottom-sec mt-40">
                <div class="panel-body p-20">
                  <div class="row mt-50">
                    <div class="col-lg-12">
                      <div class="col-lg-6 col-md-3 col-sm-3 col-xs-12">
                        <div class=" mb-20">
                          <img src="/images/logo.png"  width="120px" height="auto">
                        </div>
                        <address>
                          150, Ikorodu Road, <br>Adebowale House, Onipanu.<br>Lagos, Nigeria
                        </address>
                        <div class="m-t-20">
                          <h3 class="panel-title">Invoice To: </h3>
                          <br>
                          <h3 class="invoice-to-client-name">{{ first_name }} {{ last_name }}</h3>
                        </div>
                        <address>
                          Phone: {{ phone_number }}
                          <br>
                          Email: {{ email }}
                        </address>
                      </div>
                      <div class="col-lg-6 col-md-3 col-sm-3 col-xs-12">
                        <div class="btn-group pull-right">
                          <a @click="showModal" v-show="invoice_status === 'Unpaid'"  class="btn btn-success  btn-sm pay-invoice"><i class="fa fa-check"></i> Pay</a>
                          <nuxt-link :to="{name: 'invoices-iprint-id', params:{id: invoice_no}}"  class="btn btn-primary  btn-sm"><i class="fa fa-print"></i> Print</nuxt-link>
                          <br>
                          <br>
                          <div class="m-t-20">
                            <div class="bill-data">
                              <p class="m-b-5">
                                <span class="bill-data-title">Invoice No:</span>
                                <span class="bill-data-value">#{{invoice_no}}</span>
                              </p>
                              <p class="m-b-5">
                                <span class="bill-data-title">Invoice Status:</span>
                                <span class="bill-data-value"><span class="bill-data-status" :class="{'label-success': invoice_status === 'Paid', 'label-warning': invoice_status === 'Unpaid'}">{{invoice_status}}</span></span>
                              </p>
                              <p class="m-b-5">
                                <span class="bill-data-title">Invoice Date:</span>
                                <span class="bill-data-value">{{invoice_date}}</span>
                              </p>
                              <p class="m-b-5">
                                <span class="bill-data-title">Due Date:</span>
                                <span class="bill-data-value">{{invoice_due_date}}</span>
                              </p>
                              <p class="m-b-5" v-show="invoice_status === 'Paid'">
                                <span class="bill-data-title">Paid Date:</span>
                                <span class="bill-data-value">{{invoice_paid_date}}</span>
                              </p>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                    <div class="col-lg-12 col-md-3 col-sm-3 col-xs-12">
                      <table class="table table-hover table-ultra-responsive">
                        <thead>
                        <tr class="h5 text-dark">
                          <th style="width: 5%;">#</th>
                          <th style="width: 65%;">Item</th>
                          <th style="width: 10%;">Price</th>
                          <th style="width: 10%;">Quantity</th>
                          <th style="width: 10%;">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td data-label="Item">1</td>
                          <td >{{item}}</td>
                          <td >{{total}}</td>
                          <td >{{quantity}}</td>
                          <td >{{total}}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-lg-12 col-md-3 col-sm-3 col-xs-12">
                      <div class="invoice-summary">
                        <div class="row">
                          <div class="col-lg-2 col-md-3 col-sm-3 col-xs-12">
                            <div class="inv-block">
                              <h3 class="count-title">Subtotal</h3>
                              <p>{{subtotal}}</p>
                            </div>
                          </div>
                          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                            <div class="inv-block">
                              <h3 class="count-title">Tax</h3>
                              <p>{{tax}}</p>
                            </div>
                          </div>
                          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                            <div class="inv-block">
                              <h3 class="count-title">Discount</h3>
                              <p>{{discount}}</p>
                            </div>
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 col-lg-offset-2 col-md-offset-1 col-sm-offset-1 text-right">
                            <div class="bg-primary inv-block last">
                              <h3 class="count-title">Grand Total</h3>
                              <p>{{total}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <PayInvoiceComponent :invoice_id="invoice_no" :page_url="page_url"></PayInvoiceComponent>
																					 <UpdateCompanyNameModal></UpdateCompanyNameModal>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
    import Sidebar from "../../../components/general/Sidebar";
    import DashboardNavbar from "../../../components/general/navbar/DashboardNavbar";
    import PayInvoiceComponent from "../../../components/modals/PayInvoiceComponent";
				import UpdateCompanyNameModal from "../../../components/index/modals/UpdateCompanyNameModal";
    export default {
        name: "view",
					  middleware: ['auth', 'inactive_user', 'permission'],
      components: {UpdateCompanyNameModal, PayInvoiceComponent, DashboardNavbar, Sidebar},
      data(){
          return{
            id: this.$route.params.id,
            invoice_status:'',
            invoice_due_date:'',
            invoice_paid_date:'',
            invoice_no:'',
            invoice_date:'',
											 page_url: '',
            item:'',
											first_name: '',
											last_name:  '',
											email:  '',
											phone_number:  '',
            price:'',
            quantity:'',
            subtotal:'',
            discount:'',
            tax:'',
            total:'',
          }
      },
      methods:{
        	async fetch(){
        		try {
											let response_data = await this.$axios.$get('/billing/invoices/' + this.id);
											let data = response_data.data[0];
											let inv_item = response_data.inv_item[0];

											this.invoice_no = data.id;
											this.invoice_due_date = data.duedate;
											this.invoice_paid_date = data.datepaid;
											this.subtotal = data.subtotal;
											this.invoice_status = data.status;
											this.invoice_date = data.created;
											this.item = inv_item.item;
											this.price = inv_item.price;
											this.quantity = inv_item.qty;
											this.tax = inv_item.tax;
											this.discount = inv_item.discount;
											this.total = inv_item.total;


										}catch (e) {

										}
									},

        showModal(){
            this.$modal.show('pay-invoice-modal')
        },
        printInvoice(){
            window.print();
        },

      },
      mounted() {
							if(this.$store.state.view_verify_page === 'true') {
								this.$modal.show('verification-id-modal');
							}else {
								this.page_url = window.location.href;
								let user_data = JSON.parse(localStorage.getItem('user_data'));
								this.first_name = user_data.fname;
								this.last_name = user_data.lname;
								this.email = user_data.email;
								this.phone_number = user_data.phone;
								this.fetch();
							}

      },

    }
</script>

<style scoped>
  .p-20 {
    padding: 20px!important;
  }
  address {
    margin-bottom: 20px;
    font-style: normal;
    line-height: 1.5384616;
  }
  h3 {
    text-transform: uppercase;
    display: inline-block;
    letter-spacing: 0.02em;
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    padding: 0;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-text-stroke: 0px grey;
    filter: alpha(opacity=40);
    -webkit-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
  }

  h3.panel-title, .h3.panel-title {
    font-size: 21px;
  }
  .panel-title {
    margin-top: 0;
    margin-bottom: 0;
    color: inherit;
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
  .bg-primary {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    color: #fff;
    padding: 15px 20px 5px 0 !important;
  }
  .label-success {
    background-color: #4CAF50;
    border-color: #4CAF50;
    padding: 5px;
    color: #fff;
    border-radius: 5px;
  }
  .label-warning {
    background-color:  #FF5722;
    border-color: #FF5722;
    padding: 5px;
    color: #fff;
    border-radius: 5px;
  }
</style>
