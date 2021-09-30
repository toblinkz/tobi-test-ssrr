<template>
  <div class="padding-sides">

      <!-- Page container -->
      <div class="page-container">
        <!-- Page content -->
        <div class="page-content">
          <!-- Main content -->
          <div>
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
                      <div >
                        <div class="panel" style="overflow-x:auto;">
                          <div class="panel-body">
																												<div class="mb-10">
																														<div>
																															<form>

																															</form>
																															<a v-if="canDownloadContacts" class="btn btn-primary pull-right" @click="showDownloadContactModal"  style="float: right; color: #fff">
																																<i v-show="!isLoading" class="entypo-download"></i>
																																{{button_text}}
																																<span v-show="isLoading">
                                         <img src="/images/spinner.svg" height="20px" width="80px"/>
                                      </span>
																															</a>
																														</div>
																														<form @submit.prevent="getPhonebookContacts" class="">
																															<input type="search" class="form-control2 input-sm" placeholder="Search phone number" v-model="phone_number">
																															<span class=" error_fi
																															eld_message" v-if="error_message">{{error_message}}</span>
																														</form>
																												</div>


                            <table class="table data-table table-hover">
                              <thead>
                              <tr>
                                <th >Name</th>
                                <th >Message</th>
                                <th >Phone Number</th>
                                <th ></th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="row in phone_book_contacts.data" :key="row.id">
                                <td >{{row.first_name || '-'}}</td>
                                <td> {{row.message || '-'}}</td>
                                <td>{{row.phone_number}}</td>
                                <td> <nuxt-link class="btn btn-success btn-xs" :to="{name: 'edit-contact-id', params:{id: row.id, phone_number: row.phone_number, first_name: row.first_name, last_name: row.last_name}}" @click="setPid(row)" ><i class="fa fa-edit"></i> Edit</nuxt-link>
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
			<verification-modal></verification-modal>
			<UpdateCompanyNameModal></UpdateCompanyNameModal>
			<download-phone-book-contact :phone_book_id="phone_book_id" :get_url="get_url"></download-phone-book-contact>
  </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import Swal from 'sweetalert2';
				import TableVuePlaceHolder from "../../components/general/TableVuePlaceHolder";
				import Pagination from "../../components/general/Pagination";
				import VerificationModal from "~/components/modals/VerificationModal";
				import DownloadPhoneBookContact from "@/components/modals/DownloadPhoneBookContactModal";
				import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";
    export default {
					 name: "_id",
      components: {
							UpdateCompanyNameModal,
							DownloadPhoneBookContact, VerificationModal,Pagination, TableVuePlaceHolder, DashboardNavbar, Sidebar},
					 middleware: ['auth', 'inactive_user', 'permission'],
      data(){
          return{
              phone_book_contacts:[],
														page: 1,
														first_name: JSON.parse(localStorage.getItem('user_data')).fname,
														last_name: JSON.parse(localStorage.getItem('user_data')).lname,
											   customer_permissions: localStorage.getItem('permissions'),
														total_page: '',
														showPagination: false,
														show_shimmer: false,
														phone_number:'',
										  	 error_message:'',
														download_contact_url:'',
							       button_text: 'Download Phonebook',
											   isLoading: false,
											   phone_book_id: this.$route.params.id,
											   get_url: false
          }
      },
					watch:{
					 	phone_number(value){
								this.validatePhoneNumber(value);
							}
					},
					computed:{
      	isDisabled:function () {
										return (this.phone_book_contacts.data < 1)
							},
						canDownloadContacts(){
							return (this.customer_permissions.includes("download_contacts"));
						},
					},
      methods: {

						async	getPhonebookContacts(){
							if(!this.error_message){
								try {
									//get phonebook contact
									let data = await this.$axios.$get('sms/phone-book/' +this.$route.params.id,{params:{
											page: this.page,
											phone_number: this.phone_number
										}});
									this.phone_book_contacts = data;
									if (data.meta.last_page > 1){this.showPagination = true}
									this.page = data.meta.current_page;
									this.total_page = data.meta.last_page;
									this.show_shimmer = true;

								}catch (e) {

								}

							}

							},
							validatePhoneNumber(value){
										if (isNaN(value)){
													this.error_message = 'Please enter a number';
										}else{
												this.error_message = '';
										}
							},
          setPid(row){
            this.$store.commit('setPhoneBookId', row.pid);
            this.$store.commit('setBulkSmsId', row.pid);
          },
							onPageChange(page) {
								this.page = page;
								this.show_shimmer = false;
								this.getPhonebookContacts();
							},
							showDownloadContactModal(){
								this.$modal.show('download-phonebook-contact');
								this.get_url = true;
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
		.form-control2 {
			font-size: 13px;
			border-color: #bbb;
			border-radius: 5px;
			border: solid 1px rgba(204, 204, 204, 0.34);
			font-weight: 500;
			box-shadow: none;
			height: 36px;
			padding: 7px 12px;
			line-height: 1.5384616;
		}
		.form-control2:focus {
			border-color: #4DB6AC;
			outline: 0;
		}


</style>
