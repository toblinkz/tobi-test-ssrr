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
              <div class="content-wrapper">
                <!-- START JUMBOTRON -->
                <div class="jumbotron" data-pages="parallax">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <div class="row mt-70">
                        <div class="col-md-6">
                          <h3 class="mb-10">Termii</h3>
                          <p><i class="icon-profile"></i> Deactivate your Account</p>
                          <p class="insight">Thinking about leaving us, We make it super easy! Simply fill the forms below and you will be on your way!
                          </p>
                        </div>
                        <div class="col-md-4 hidden-xs">
                          <img src="/images/customers.gif" class="wide">
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

                          <form  method="POST" @submit.prevent="deactivateUserAccount">
                            <div class="col-md-9">
                              <b class="mb-20 mt-10">*Help us understand why you want to leave. We will use your feedback to get better.</b>
                              <textarea rows="8" cols="100" v-model="user_feedback" name="feedback" ></textarea>

                              <label><b>Enter Your Password</b></label>
                              <div class="form-group control-password">
                                <input type="password"  v-model="user_password"  name="password" class="form-control" :class="{'error': hasPasswordError}" maxlength="24">
                                <span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
                              </div>
                              <button type="submit" class="btn btn-primary" :disabled="isDisabled">Deactivate Account</button>
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
    </div>
  </div>
  </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import ApiNavbar from "../../components/general/navbar/ApiNavbar";
    import Swal from "sweetalert2";
    export default {
        name: "deactivate",
      components: {ApiNavbar, DashboardNavbar, Sidebar},
					middleware: 'auth',
      data(){
          return{
            user_feedback: '',
            user_password: '',
            hasPasswordError: false,
            hasFeedbackError: false,
            error_message:[],
          }
      },
      computed:{
        isDisabled: function () {
          return(this.user_feedback === '' || this.user_password === '' || this.hasPasswordError || this.hasFeedbackError);
        }
      },
      watch:{
        user_password(value){
          this.user_password = value;
          this.validatePassword(value);
        },
        user_feedback(value){
          this.user_feedback = value;
          this.validateFeedback(value);
        }
      },
      methods:{
          async deactivateUserAccount(){
            try{
              await this.$axios.$post('user/deactivate/account', {
                feedback: this.user_feedback,
                password: this.user_password
              });
              await Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'We are sorry to see you leave.',
              });
              await this.$auth.logout();

            }catch (e) {
              if (e.response.data.data === 'Incorrect Password Entered'){
                this.error_message['password'] = 'Incorrect Password Entered';
                this.hasPasswordError = true;
              }

            }
          },
        validatePassword(value){
          if ( value === ""){
            this.error_message['password'] = 'The password field is required';
            this.hasPasswordError = true;
          }else {
            this.error_message['password'] = '';
            this.hasPasswordError = false;
          }
        },
        validateFeedback(value){
          if ( value === ""){
            this.error_message['feedback'] = 'The Feedback field is required';
            this.hasPasswordError = true;
          }else {
            this.error_message['feedback'] = '';
            this.hasFeedbackError = false;
          }
        }
      },
      mounted() {

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
  h3 {
    text-transform: uppercase;
    display: inline-block;
    letter-spacing: 0.02em;
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    padding: 0;
    line-height: normal;overflow: hidden;text-overflow: ellipsis;-webkit-text-stroke: 0px
  grey;filter: alpha(opacity=40);-webkit-transition: opacity 0.3s ease;transition: opacity 0.3s ease;
  }
  textarea {
    outline: 0;
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
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
  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
  }
  input[type="password"]{
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  .btn-primary:hover {
    color: #fff;
    border: 1px solid transparent !important;
  }
   input[type=password].error, textarea.error {
    border-color: red!important;
  }
</style>
