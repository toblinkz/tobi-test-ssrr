<template>
  <div>
      <!-- Page header -->
      <div class="page-header">
        <div class="page-header-content">
          <!-- Page container -->
          <div class="page-container">
            <!-- Page content -->
            <div class="page-content">
              <div class="content-wrapper">
                <!-- START JUMBOTRON -->
                <div class="jumbotron" data-pages="parallax">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <div class="row mt-70">
                        <div class="col-md-8">
                          <h3 > </h3>
                          <p><i class="icon-profile"></i> Your Webhook</p>
                          <p class="insight">We have given you the power to integrate your application with our system.<br>
                            Use your webhook url to receive status of your messages.
                          </p>
                        </div>
                        <div class="col-md-4 hidden-xs">
                          <img src="/images/api-doc.gif" class="wide">
                        </div>
                      </div>
                      <center>
                        <div class="item-height"></div>
                      </center>
                    </div>
                    <!-- Page container -->
                    <div class="page-container">
                      <!-- Page content -->
                      <div class="page-content">
                        <!-- main inner content -->
                        <main id="wrapper" class="wrapper">
                          <ApiNavbar></ApiNavbar>

                          <form @submit.prevent="updateWebhook" method="POST" >
                            <div class="row">
                              <div class="col-md-5">
                                <label>Webhook URL</label>
                                <div class="form-group control-text">

                                  <input
                                    id="live_webhook" placeholder="Webhook URL"
                                    v-model="webhook"
                                    type="text"
                                    name="live_webhook"
                                    class="form-control "
                                    :class="{'error': hasWebhookError}"
                                  >
                                  <span class=" error_field_message" v-if="error_message.webhook">{{error_message.webhook}}</span>
                                </div>
																															<button class="btn bg-teal pull-right" type="submit" :disabled="isDisabled"><i class="icon-check"></i> Save</button>
                              </div>
                            </div>
                          </form>
                        </main>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
					<VerificationModal></VerificationModal>
					<UpdateCompanyNameModal></UpdateCompanyNameModal>
    </div>
  </div>
</template>

<script>
    import Sidebar from "../../../components/general/Sidebar";
    import DashboardNavbar from "../../../components/general/navbar/DashboardNavbar";
    import ApiNavbar from "../../../components/general/navbar/ApiNavbar";
    import Swal from "sweetalert2";
				import VerificationModal from "~/components/modals/VerificationModal";
				import UpdateCompanyNameModal from "../../../components/index/modals/UpdateCompanyNameModal";
    export default {
        name: "config",
      components: {UpdateCompanyNameModal, VerificationModal, ApiNavbar, DashboardNavbar, Sidebar},
					 middleware: ['auth', 'inactive_user'],
      data(){
          return {
            webhook: '',
            error_message: [],
            hasWebhookError: false,

          }
      },
					watch:{
       webhook(value){
       	this.validateWebhookUrl(value);
							}
					},
      computed:{
          isDisabled: function () {
              return( this.hasWebhookError )
          }
      },
      methods: {
          async updateWebhook(){
            try {
              await this.$axios.$patch('user/webhook', {
                live_webhook: this.webhook,
              });
              await Swal.fire({
                icon: 'success',
                text: 'Webhook Updated Successfully',

              });
            }catch (e) {
														this.$toast.error(e.response.data.message);
            }
          },
							validateWebhookUrl(value){
          	if (/^(ftp|http|https):\/\/[^ "]+$/.test(value) || !value){
												this.hasWebhookError = false;
												this.error_message['webhook'] = '';
											}else{
												this.hasWebhookError = true;
												this.error_message['webhook'] = 'The webhook format is invalid.';
											}
							}
      },
					mounted() {
						if(this.$store.state.view_verify_page === 'true'){
							this.$modal.show('verification-id-modal');
						}else {
							let user_data = JSON.parse(localStorage.getItem('user_data'));
							 this.webhook = user_data.customer.live_webhook_url;
						}
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
  .page-header-content {
    position: relative;
    background-color: inherit;
    padding: 0 20px;
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
  .page-header:not(.page-header-filled) + .page-container {
    padding-top: 35px;
  }
  .page-container {
    position: relative;
    /* padding-bottom: 40px; */
  }
  .content-wrapper {
    width: 100%;
  }
  @media (min-width: 769px){
    .content-wrapper {
      display: table-cell;
      vertical-align: top;
    }
  }
  .jumbotron {
    margin-bottom: 10px;
    color: inherit;
    background-color: #fff;
  }
  .jumbotron p {
    margin-bottom: 15px;
    font-weight: 300;
    letter-spacing: normal;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    color: #2c2c2c;
    display: block;
    font-style: normal;
    -webkit-margin-before: 1em;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  .wide {
    width: 200px !important;
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
     -webkit-margin-before: 1em;
     -webkit-margin-after: 1em;
     -webkit-margin-start: 0px;
     -webkit-margin-end: 0px;
     display: block;
  }
  label {
    margin-bottom: 6px;
    display: inline-block;
  }
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }

  .form-control {
    display: block;
    width: 100%;
    height: 36px;
    padding: 7px 12px;
    font-size: 13px;
    border-radius: 5px;
    font-weight: 500;
    box-shadow: none;
    line-height: 1.5384616;
    color: #333333;
    background-color: #fff;
    background-image: none;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  input[type="text"]{
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
  }
  .bg-teal {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    color: #fff !important;
    border: none;
    padding-left: 19px;
    padding-right: 19px;
  }
  input::placeholder {
    color: #999;
    font-size: 12px;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid rgba(221, 221, 221, 0.15);
  }

</style>
