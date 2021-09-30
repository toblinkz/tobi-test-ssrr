<template>
  <div class="padding-sides">

      <!-- Page container -->
      <div class="page-container">
        <!-- Page content -->
        <div class="page-content">
          <!-- Main content -->
          <div class="content-wrapper">
            <!--main inner content-->
            <main id="wrapper" class="wrapper">
              <section class="wrapper-bottom-sec mt-20">

                <div class="col-md-12">
                  <div class="jumbotron" data-pages="parallax">
                    <div class="container-fluid container-fixed-lg">
                      <div class="inner">
                        <!-- END BREADCRUMB -->
                        <div class="container-md-height">
                          <div class="row row-md-height">
                            <center>
                              <!-- START PANEL -->
                              <div class="panel-transparent">
                                <p id="welcome" style="margin-top: 10px;margin-bottom: 15px"><i class="entypo-list-add"></i> Register your sender ID!</p>
                                <p class="insight hidden-xs">Approve your sender ID to send sms to push out messages to your customers.<br>Approved device ID's are required to send messages on Termii!</p>

                                <div class="row">
                                  <center>
                                    <div class="col-sm-4 hidden-xs">
                                    </div>
                                    <div class="col-sm-4">
                                      <br>
                                      <a v-if="canRequestSenderId" class="btn btn-primary" @click="showModal"><i class="fa fa-plus"></i> Make a new request</a>
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
																	<TableVuePlaceHolder v-if="!showShimmer">

																	</TableVuePlaceHolder>
                  <div  v-else>
                    <div class="p-15 ">
                      <div class="row">
                        <div>
                          <div class="panel">
                            <div class="panel-body p-none scrollme"  style="overflow-x:auto;">
                              <table class="table table-responsive  table-hover">
                                <thead>
                                <tr>
                                  <th style="width: 10%;" class="hidden-xs">SL#</th>
                                  <th style="width: 30%;">Sender ID</th>
                                  <th style="width: 20%;">Status</th>
                                  <th style="width: 20%;">Company</th>
                                  <th style="width: 20%;">Usecase</th>
                                </tr>
                                </thead>
                                <tbody >

                                <tr v-for="(row, index) in response_data.data" :key="row.id">
                                  <td data-label="SL" class="hidden-xs">{{index + 1}}</td>
                                  <td data-label="Sender ID"><p>{{row.sender_id}}</p></td>
                                  <td data-label="Status"><p class="label" :class="rowStatusClass(row)">{{row.status}}</p>
                                  </td>
                                  <td data-label="Type"><p>{{row.company}}</p></td>
                                  <td data-label="Type"><p>{{row.usecase}}</p></td>
                                </tr>
                                </tbody>
                              </table>

                            </div>
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
    <SenderIdModal  @requested="requested"></SenderIdModal>
				<VerificationModal></VerificationModal>
			<InActiveSenderIdModal></InActiveSenderIdModal>
			<UpdateCompanyNameModal></UpdateCompanyNameModal>
  </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
   import SenderIdModal from "../../components/modals/SenderIdModal";
    import {mapGetters} from "vuex";
    import Pagination from "../../components/general/Pagination";
				import {
					ContentLoader,
					FacebookLoader,
					CodeLoader,
					BulletListLoader,
					InstagramLoader,
					ListLoader
				} from 'vue-content-loader'
				import ButtonSpinner from "../../components/general/ButtonSpinner";
				import TableVuePlaceHolder from "../../components/general/TableVuePlaceHolder";
				import InActiveSenderIdModal from "~/components/modals/InActiveSenderIdModal";
				import VerificationModal from "~/components/modals/VerificationModal";
				import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";
    export default {
        name: "sender-id-management",
					   middleware: ['auth', 'permission'],
								components: {
									UpdateCompanyNameModal,
									VerificationModal,
									InActiveSenderIdModal,
									TableVuePlaceHolder,
									ButtonSpinner,
									Pagination, SenderIdModal, DashboardNavbar, Sidebar, ListLoader, FacebookLoader, ContentLoader,BulletListLoader},
      data(){
          return{
            response_data: [],
            page: 1,
            total_page: '',
            showPagination: false,
										 	showShimmer: false,
											customer_permissions: localStorage.getItem('permissions'),
          }
      },
      computed: {
							canRequestSenderId(){
								return (this.customer_permissions.includes("request_sender_id"));
							},
      },
      methods: {

        async fetch() {
        	//load sender id's
          try {
            let data = await this.$axios.$get('sms/sender-id', { params: {page: this.page},});
            this.response_data = data;

            if (data.meta.last_page > 1){this.showPagination = true}
            this.page = this.response_data.meta.current_page;
            this.total_page = this.response_data.meta.last_page;
            this.showShimmer = true;
          } catch (e) {

          }
        },
        onPageChange(page) {
          this.page = page;
          this.showShimmer  = false;
          this.fetch();
        },
        showModal () {
        	if (JSON.parse(localStorage.getItem('user_data')).active_status_id.id ===  6){
										this.$modal.show('in-active-user-modal');
									}else {
										this.$modal.show('sender-id-modal');
									}

        },
        requested(){
            this.fetch();
          $("body").css("overflow", "auto");
        },
        rowStatusClass(row){
        	switch(row.status){
        		case('unblock'):
        		case('active'):{
											return 'label-success'
										}
										case('block'):
        		case('pending'):
        			default:{
											return 'label-warning'
										}
									}
        }
      },
     mounted() {
						if(this.$store.state.view_verify_page === 'true'){
							this.$modal.show('verification-id-modal');
						}else {
							this.fetch();
						}

     },
      pageClass(){
          return 'page-item'
      }
    }
</script>

<style scoped >

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
  .btn-primary {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
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
  .label-danger{
    background-color: red;
    color: #fff;
  }

  .pagination {
    display: flex;
    list-style: none;
    border-radius: .25rem;


  }
  .page-item {
    color: black;
  }

</style>
