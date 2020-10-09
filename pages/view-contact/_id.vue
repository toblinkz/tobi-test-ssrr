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
              <section class="wrapper-bottom-sec mt-50">
                <div class="col-md-12">
                  <div class="jumbotron" data-pages="parallax">
                    <div class="container-fluid container-fixed-lg">
                      <div class="inner">
                        <!-- END BREADCRUMB -->
                        <div class=" mt-50 m-t-20">
                          <div class="row ">
                            <div class="col-lg-6 col-md-height col-md-7 col-top">
                              <!-- START PANEL -->
                              <div class="panel-transparent">
                                <h3 class="text-bold">
                                  Hi,{{ first_name }} {{last_name}}
                                </h3>
                                <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-flag"></i> View Contacts!</p>
                                <p class="insight">View, edit, delete and manage your customers phone contacts added manually or uploaded from your excel file sheet
                                </p>
                                <div class="row" id="zio">
                                  <div class="col-sm-6">
                                    <nuxt-link to="/phone-book" class="btn btn-primary mt-20 mb-20"><i class="fa fa-angle-double-left"></i> Return to your phone book</nuxt-link>
                                  </div>
                                  <div class="col-sm-6">
                                    <br>
                                    <nuxt-link :to="{path: '/sms/group-sms', params:{id:this.$route.params.id}}"   class="btn btn-success" :aria-disabled="isDisabled"><i class="entypo-paper-plane"></i> Create bulk sms</nuxt-link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="col-lg-6 col-md-5 col-md-height col-middle hidden-xs">
                                <!-- START PANEL -->
                                <div class="full-height">
                                  <div class="panel-body text-center">
                                    <img src="/images/details.gif" class="wide">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
																	<TableVuePlaceHolder v-if="!show_shimmer" v>

																	</TableVuePlaceHolder>
                  <div class="col-md-12 mt-100" v-else>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="panel">
                          <div class="panel-body">
                            <table class="table data-table table-hover">
                              <thead>
                              <tr>
                                <th >Name</th>
                                <th >Message</th>
                                <th >Phone Number</th>
                                <th >Action</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="row in phone_book_contacts.data" :key="row.id">
                                <td >{{row.first_name || '-'}}</td>
                                <td>-</td>
                                <td>{{row.phone_number}}</td>
                                <td> <nuxt-link class="btn btn-success btn-xs" :to="{name: 'edit-contact-id', params:{id: row.id, phone_number: row.phone_number, first_name: row.first_name, last_name: row.last_name}}" :class="setPid(row)" ><i class="fa fa-edit"></i> Edit</nuxt-link>
                                  <a @click="deletePhoneBookContact(row)" class="btn btn-danger btn-xs cdelete" ><i class="fa fa-trash"></i> Delete</a></td>
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
			<verification-modal></verification-modal>
  </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import Swal from 'sweetalert2';
				import TableVuePlaceHolder from "../../components/general/TableVuePlaceHolder";
				import Pagination from "../../components/general/Pagination";
				import VerificationModal from "~/components/modals/VerificationModal";
    export default {
        name: "_id",
      components: {VerificationModal, Pagination, TableVuePlaceHolder, DashboardNavbar, Sidebar},
					middleware: 'auth',
      data(){
          return{
              phone_book_contacts:[],
														page: 1,
														first_name: this.$store.state.auth.user.fname,
														last_name: this.$store.state.auth.user.lname,
														total_page: '',
														showPagination: false,
														show_shimmer: false,
          }
      },
					computed:{
      	isDisabled:function () {
										return (this.phone_book_contacts.data < 1)
							}
					},
      methods: {
          async fetch(){


          },
						async	getPhonebookContacts(){
							try {
								//get phonebook contact
								let data = await this.$axios.$get('sms/phone-book/' +this.$route.params.id,{params:{
										page: this.page
									}});
								this.phone_book_contacts = data;
								if (data.meta.last_page > 1){this.showPagination = true}
								this.page = data.meta.current_page;
								this.total_page = data.meta.last_page;
								this.show_shimmer = true;

							}catch (e) {

							}

							},
          setPid(row){
            this.$store.commit('setPhoneBookId', row.pid);
            this.$store.commit('setBulkSmsId', row.pid);
          },
							onPageChange(page) {
								this.page = page;
								this.show_shimmer = false;
								this.fetch();
							},
        async deletePhoneBookContact(row){
          	try {
												await Swal.fire({
													title: 'Are you sure?',
													text: "You won't be able to revert this!",
													icon: 'warning',
													showCancelButton: true,
													confirmButtonColor: '#3085d6',
													cancelButtonColor: '#d33',
													confirmButtonText: 'Yes, delete it!'
												}).then(async (result) => {
													if (result.value){
														await this.$axios.$delete('sms/phone-book/contact/' + row.id).catch((e)=>{this.$toast.error("An Error Occured while trying to delete this contact");});
														this.$toast.success("Phone book deleted successfully");
														await this.getPhonebookContacts();
													}
												});
											}catch (e) {

											}


        }
      },
      mounted() {
							if(this.$store.state.view_verify_page === 'true'){
								this.$modal.show('verification-id-modal');
							}else {
								this.getPhonebookContacts();
							}

      },

    }
</script>

<style scoped>
  .wide {
    width: 200px !important;
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

</style>
