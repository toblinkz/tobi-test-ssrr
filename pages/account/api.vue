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
          <!-- Page container -->
          <div class="page-container">
            <!-- Page content -->
            <div class="page-content">
              <!-- Main content -->
              <div class="content-wrapper">
                <!-- START JUMBOTRON -->
                <div class="jumbotron" data-pages="parallax">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <div class="row m-t-60">
                        <div class="col-md-8">
                          <h3 class="mb-50"> </h3>
                          <p><i class="icon-profile"></i> Your API Keys</p>
                          <p class="insight">We have given you the power to build awesome apps that can integrate with our system but we only ask that you repay us the favour by keeping your passkeys secure and private.
                          </p>
                        </div>
                        <div class="col-md-4 hidden-xs">
                          <img src="/images/api-doc.gif" class="wide">
                        </div>
                      </div>
                      <center>
                        <div class="hrr-2"></div>
                      </center>
                    </div>
                    <!-- Page container -->
                    <div class="page-container">
                      <!-- Page content -->
                      <div class="page-content">
                        <!-- main inner content -->
                        <main id="wrapper" class="wrapper">
                          <ApiNavbar></ApiNavbar>
                          <!-- START CONTAINER FLUID -->
                          <div class="row">

                            <div class="col-sm-12">
                              <div class="col-md-6">
                                <!-- START PANEL -->
                                <p class="text-semibold"><i class="fa fa-certificate" style="color: #079805 !important;"></i> API Key</p>
                                <div class="alert toke wd">
                                  <button class="clipboard-style"  v-clipboard:copy="api_key">
																																			<img src="/images/copy.svg"/>
                                  </button>
                                 <p class="insight" style="color: #595959 !important;">{{api_key}}</p> </div>
																															<div class="form-group">
																																<input v-model="password" :type="type"  class="profile-form-control" :class="{'error': hasPasswordError}" placeholder="Enter Password">
																																<span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
																																<i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showPassword"></i>
																															</div>
																															<br>
																															<button class="btn btn-primary btn-cons" @click="renewApiToken" :disabled="isDisabled">
																																<i class="fa fa-certificate" v-show="showIcon"></i>
																																{{button_text}}
																																<span v-show="isLoading">
																																			<img src="/images/spinner.svg" height="20px" width="80px"/>
																																		</span>
																															</button>
                                <!-- END PANEL -->
                              </div>
                            </div>

                          </div>
                        </main>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /page header -->
    </div>
  </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import Main from "../../components/landing_page/MainContent";
    import ApiNavbar from "../../components/general/navbar/ApiNavbar";
    import VueClipboard from "vue-clipboard2";
    import Swal from 'sweetalert2';
    import {mapGetters} from "vuex";

    export default {
        name: "api",
      components: {ApiNavbar, Main, DashboardNavbar, Sidebar, VueClipboard },
      middleware: 'auth',
      data(){
        return{
        	password:'',
									button_text:' Renew API key',
									isLoading: false,
									showIcon: true,
          api_key: this.$auth.user.customer.live_api_key,
									error_message:[],
									hasPasswordError: false,
									type: "password"
        }
      },
      computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser']),
							isDisabled: function () {
								return (this.hasPasswordError || this.password === '');
							},
      },
					watch:{
       password(value){
       		this.validatePassword(value);
							}
					},
      methods: {
          async renewApiToken(){
          	this.isLoading = true;
          	this.button_text = '';
          	this.showIcon = false;
            try{
              await this.$axios.$get('user/keys/renew', {params:{password: this.password} });
													this.isLoading = false;
													this.button_text = 'Renew API key';
													this.showIcon = true;
              await Swal.fire({
                icon: 'success',
                text: 'Your API token was successfully renewed',
              });

             let data = await this.$axios.get('user',);
             this.api_key = data.data.data.customer.live_api_key;
            }catch (e) {
													this.error_message['password'] = 'Password Incorrect';
													this.hasPasswordError = true;
            }

          },
							validatePassword(value){
								if (value.length < 6) {
									this.error_message['password'] = 'The password field must be at least 5 characters';
									this.hasPasswordError = true;
								}else {
									this.error_message['password'] = '';
									this.hasPasswordError = false;
								}
							},
							showPassword(){
								if (this.type === "password") {
									this.type = 'text';
									this.isToggled = true;
								}
								else {
									this.type = "password";
									this.isToggled = false;
								}
							},
      },

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
  .clipboard-style{
    position: absolute;
    right: 4px;
    top: 4px;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
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
  .toke {
    background-color: #f5f5f5;
    border-color: #efefef;
    color: #595959 !important;
  }
  .alert {
    position: relative;
    padding: 20px 20px 5px 20px;
    /* margin-bottom: 20px; */
    border: 1px solid transparent;
  }
  .wd {
    border-radius: 5px;
    word-wrap: break-word;
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
		.form-group i.password-visibility{
			height: 16px;
			cursor: pointer;
			fill: #0a2e65;
			top: 15px;
			width: 16px;
			opacity: 1;
			position: absolute;
			right: 16px;
		}
		.btn:hover {
			background-color: #fafafa;
			border: 1px solid rgba(98, 98, 98, 0.27);
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
</style>
