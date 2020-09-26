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
      <div class="page-container">
        <!-- Page content -->
        <div class="page-content">
          <!-- Main content -->
          <div class="content-wrapper">
            <!-- main inner content -->
            <main id="wrapper" class="wrapper">
              <section class="wrapper-bottom-sec">
                <div class="padding-30">
                  <h2 class="page-title"><b>Device - {{device_name}}</b></h2>
                </div>
                <div class="p-30">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="panel">
                        <div class="panel-body ">
                          <h3 class="panel-title">Subscriptions</h3>
                          <button class="btn btn-primary btn-sm pull-right" @click="newSubscription"  v-show="new_subscription === true"><i class="fa fa-plus"></i> New Subscription</button>
                          <table class="table data-table table-hover">
                            <thead>
                            <tr>
                              <th style="width: 10%;">SL#</th>
                              <th style="width: 20%;">Plan</th>
                              <th style="width: 20%;">Last Subscription</th>
                              <th style="width: 20%;">Subscription Expiry</th>
                              <th style="width: 20%;">Amount</th>
                              <th style="width: 20%;">Status</th>
                              <th></th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="row in response_data.data" :key="row.id">
                              <td data-label="SL" >{{row.id}}</td>
                              <td style="width: 20%;">{{row.plan_name}}</td>
                              <td style="width: 20%;"><p>{{row.last_subscription || 'None'}}</p></td>
                              <td style="width: 20%;"><p>{{row.subscription_expiry}}</p></td>
                              <td style="width: 10%;"><p>{{row.amount}}</p></td>
                              <td data-label="Status">
                                <form @submit.prevent="payNow(row.id)"  method="PATCH">
																																	<button class="btn btn-success btn-sm" type="submit"  v-show="showPayNowButton(row)"><i class="fa fa-plus" v-show="showIcon"></i>
																																		{{ button_text }}
																																		<span v-show="isLoading">
																																				<img src="/images/spinner.svg" height="20px" width="30px"/>
																																		</span>
																																	</button>
																																</form>
                                <p class="label label-success" v-show="showPaidLabel(row)">Paid</p>
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
          <notifications group="error" ignoreDuplicates="true" position="top center"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Sidebar from "../../../components/general/Sidebar";
    import DashboardNavbar from "../../../components/general/navbar/DashboardNavbar";
				import Swal from "sweetalert2";
    export default {
					  name: "subscriptions",
					  middleware: 'auth',
       components: {DashboardNavbar, Sidebar},
       data(){
          return{
            device_name: this.$route.params.name,
            device_id: this.$route.params.id,
            response_data:[],
            new_subscription: false,
            plan_id:"",
											 page_url: '',
            payment_url:"",
												button_text: 'Pay Now',
											 showIcon: true,
												isLoading: false,
          }
      },
      methods: {
          async fetch(){
            try {
            	//get subscriptions
             let data =  await this.$axios.$get('devices/'+ this.device_id +'/subscription');
             this.response_data = data;
             this.plan_id = this.response_data.data[0].plan_id;
             if (data.data.length !== 0){this.new_subscription = true}
            } catch (e) {

            }
          },
        async newSubscription(){
            try{
              await this.$axios.$post('devices/'+ this.device_id + '/subscribe', {
               plan_id: this.plan_id
             });
              await this.fetch();
            } catch (e) {
													await Swal.fire({
														icon: 'error',
														title: 'Oops...',
														text: 'You have pending payment on this device, Contact Account Manager',
													});

            }
        },
        showPayNowButton(row){
            return (row.payment_status === 'PENDING')
        },
        showPaidLabel(row){
            return(row.payment_status === 'PAID')
        },
        async payNow(subscription_id){
									this.$store.commit('setSuccessfulPaymentUrl', this.page_url);
									this.button_text = '';
									this.isLoading = true;
									this.showIcon = false;
            try{
              let data = await this.$axios.$patch('devices/subscription/'+subscription_id +'/pay');
              this.payment_url = data.url
														this.button_text = 'Pay Now';
														this.isLoading = false;
													 this.showIcon = false;
              window.location.href = this.payment_url;
            } catch (e) {
														this.$toast.error("Something went wrong.Try again!");
													this.button_text = 'Pay Now';
													this.isLoading = false;
													this.showIcon = false;
            }
        }
      },
      mounted() {
							this.page_url = window.location.href
							this.fetch();
      },

    }
</script>

<style scoped>

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
  }
  @media (min-width: 769px){
    .page-container {
      width: 100%;
      display: table;
      table-layout: fixed;
    }
  }

  .table {
    margin-bottom: 0;
  }.table > thead > tr > th {
     border-bottom: dotted #ddd !important;
     vertical-align: middle;
     padding: 12px 20px;
     line-height: 1.5384616;
       border-top: 1px solid #f8f8f8;
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
  .panel-title {
    position: relative;
    font-size: 21px;
  }
  .btn-success {
    color: #fff;
    background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
  }
  .pull-right {
    float: right !important;
  }
  .btn-sm{
    padding: 6px 11px;
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
  .label-success {
    border-color: #4CAF50;
    color: #fff;
    background-color: #4CAF50;
  }
  .btn-primary {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
  }
  .btn-primary:hover {
    color: #fff;
    background-color: #0c7cd5;
    border: 1px solid transparent !important;
  }
</style>
