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
          <div>
            <!-- main inner content -->
            <main id="wrapper" class="wrapper">
              <section class="wrapper-bottom-sec mt-100">
                <div class="inner">
                  <div class="row ">
                    <div class="col-lg-5 col-md-6 col-top">
                      <!-- START PANEL -->
                      <div class="panel-transparent">
                        <div class="row">
                          <!-- START PANEL -->
                          <div class="full-height">
                            <div class="panel-body text-center">
                              <img src="/images/details.gif" class="wide">
                            </div>
                          </div>
                          <!-- END PANEL -->
                          <div class="panel-transparent text-center">
                            <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-user-add"></i> Add New Contact!</p>
                            <p class="insight">Add a new contact by inputting their full details<br> and ensure you select the right country code</p>
                            <div class="row" id="zio">
                              <nuxt-link to="/phone-book" class="btn btn-primary mt-20"><i class="entypo-left-open"></i> Return to phone book</nuxt-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-5 col-md-height col-middle">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="page-title mt-50">
                            <ul class="breadcrumb breadcrumb-caret position-right">
                              <li><nuxt-link to="/phone-book">Phone book</nuxt-link></li>
                              <li>Edit Contact</li>
                            </ul>
                          </div>
                          <div class="panel">
                            <div class="panel-body">
                              <form @submit.prevent="updateContact" role="form" method="post" >

                                  <div class="form-group">
                                    <span class="help" v-show="showInfo">(Remain country code at the beginning of the number)</span>
                                    <input type="text" class="form-control" v-model="phone_number" placeholder="Phone Number"  @focusin="displayInfo" @focusout="hideInfo" >
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="First Name" v-model="first_name" >
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Last Name" v-model="last_name">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Message" v-model="message" >
                                  </div>
                                  <button type="submit" class="btn btn-success btn-sm pull-right" :disabled="isDisabled">
																																			<i class="fa fa-save" v-show="showIcon"></i>
                                   {{button_text}}
                                    <span v-show="isLoading">
                                         <img src="/images/spinner.svg" height="20px" width="80px"/>
                                      </span>
                                  </button>


                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
					<VerificationModal></VerificationModal>
					<UpdateCompanyNameModal></UpdateCompanyNameModal>
  </div>
</template>

<script>
  import Sidebar from "../../components/general/Sidebar";
  import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
  import {mapGetters} from "vuex";
  import ButtonSpinner from "../../components/general/ButtonSpinner";
		import VerificationModal from "~/components/modals/VerificationModal";
		import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";
  export default {
    name: "_id",
			 middleware: ['auth', 'inactive_user', 'permission'],
    components: {UpdateCompanyNameModal, VerificationModal, ButtonSpinner, DashboardNavbar, Sidebar},
    data(){
      return{
        phone_number: '',
        phone_book_id: '',
        first_name: '',
								showIcon: true,
        last_name: '',
        isLoading: false,
        button_text: 'Update',
        message:'',
        showInfo: false,
      }
    },
    computed:{
      isDisabled: function () {
          return(this.phone_number === '')
      },
      ...mapGetters(['getPhoneBookId'])
    },
    methods: {
      async fetch(){
      	//get contact details
        try{
          let response_data = await this.$campaign.getContactDetails(this.$route.params.id);
          this.phone_number = response_data.data.phone_number;
          this.phone_book_id = response_data.data.pid;
          this.first_name = response_data.data.first_name;
          this.last_name = response_data.data.last_name;
          this.message = response_data.data.message;
        }catch (e) {

        }
      },
      async updateContact(){
        try{
          this.isLoading = true;
          this.button_text = "";
          this.showIcon = false;
          await this.$axios.$patch('sms/phone-book/contact/' + this.$route.params.id, {
            id: this.$route.params.id,
            pid: this.getPhoneBookId,
            phone_number: this.phone_number,
            first_name: this.first_name,
            last_name: this.last_name,
            message: this.message,
          });
          this.isLoading = false;
          this.button_text = "Update";
								 	this.showIcon = true;
          await this.$router.push({path: '/view-contact/'+ this.getPhoneBookId});
          this.$toast.success('Contact updated successfully');
        }catch (e) {
            this.isLoading = false;
          this.button_text = "Update";
          this.$toast.error("Something went wrong. Try again");
        }

      },
      displayInfo(){
        this.showInfo = true
      },
      hideInfo(){
        this.showInfo = false
      }
    },
    mounted() {
					if(this.$store.state.view_verify_page === 'true') {
						this.$modal.show('verification-id-modal');
					}else {
						this.fetch();
					}

    },

  }
</script>

<style scoped>


  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .wide {
    width: 200px !important;
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
  .page-title .breadcrumb {
    margin-bottom: 10px;
  }
  .page-title .breadcrumb.position-right {
    margin-left: 0;
  }
  .page-title .breadcrumb > li > a, .page-title .breadcrumb > li + li:before {
    color: #333;
  }
  .page-title {
    padding: 15px 0 0px 0;
  }
  .breadcrumb {
    padding: 8px 0;
    list-style: none;
    background-color: transparent;
    border-radius: 3px;
  }
  .breadcrumb > li {
    font-weight: 600;
    position: relative;
    display: inline-block;
  }
  .breadcrumb-caret > li + li:before {
    content: '\203A\00a0';
    padding: 0 5px;
  }
  .form-group label {
    margin-bottom: 5px;
    display: block;
    font-weight: 600;
    line-height: 24px;
  }
  input[type="text"], input[type="password"], input[type="search"], input[type="email"]{
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  .form-control:hover {
    border-color: #aaa;
  }
  .form-control:focus {
    border-color: #4DB6AC;
    outline: 0;
    box-shadow: none;
  }
  .form-control::-webkit-input-placeholder {
    color: #999;
    font-size: small;
  }
  .btn-success {
    color: #fff;
    background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
  }
</style>
