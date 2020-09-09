<template>
  <div style="height: 100vh">
    <div class="login-wrapper ">
      <!-- START Login Background Pic Wrapper-->
      <div class="bg-pic ">
        <!-- START Background Pic-->

        <div>
          <img alt="Image" style="width: 45%;margin-top: -25px;margin-bottom: -85px;margin-left: 10px;" src="/images/products/ds.svg">
        </div>
        <!-- END Background Pic-->
      </div>
      <!-- END Login Background Pic Wrapper-->
      <!-- START Login Right Container-->
      <div class="login-container bg-white">
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
          <nuxt-link to="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></nuxt-link>
          <p  class="p-t-50 text-bold">Verify it's you</p>
          <p>We sent a verification code to your email. Enter the code from the email, <br> in the field below.</p>

          <form method="post" @submit.prevent="verifyCode">
              <div class="form-group has-feedback-left mt-50">
                <input id="verification_code" style="width: 87%" type="text" class="form-control" maxlength="6" v-model="verification_code" :class="{'error ' : hasVerificationError, 'has-input' : hasVerificationInput}" placeholder="Enter 6-digit code">
                <span class="input-field_helper">Verification Code</span>
                <span class=" error_field_message" v-if="error_message.verification_code">{{error_message.verification_code}}</span>
              </div>
            <div style="width: 87%">
              <ButtonSpinner :is-disabled="isDisabled" :button_text="button_text" :is-loading="isLoading"></ButtonSpinner>
              <nuxt-link  to="#" class="text-info2 pull-right mt-30 ">Resend verification code</nuxt-link>
            </div>
          </form>

        </div>
        <!-- END Login Right Container-->
      </div>
    </div>
  </div>
</template>


<script>

  import ButtonSpinner from "../components/general/ButtonSpinner";
  import {mapGetters} from "vuex";

  export default {
    name: "verify",
    components: {ButtonSpinner},
    middleware:['verify_page', 'guest'],
    data(){
      return{
        verification_code: "",
        error_message:[],
        access_token: "",
        hasVerificationError: false,
        hasVerificationInput: false,
        button_text: "Verify Code",
        isLoading: false
      }
    },
    computed: {
      isDisabled: function () {
        return( this.verification_code === '' || this.error_message.verification_code !== '');

      },
      ...mapGetters([ 'getUserPassword', 'getUserEmail'])
    },
    watch: {
      verification_code(value) {
        this.verification_code = value;
        this.hasVerificationInput = true;
        this.validateVerificationCode(value);
      },
    },
    methods: {
      validateVerificationCode(value){
        if (isNaN(value) || value.length < 6){
          this.error_message['verification_code'] = 'Verification code must be 6 digit';
          this.hasVerificationError = true;
        } else {
          this.error_message['verification_code'] = '';
          this.hasVerificationError = false;
        }
      },
      async verifyCode(){
        try{
          this.isLoading = true;
          this.button_text = "Verifying";
          await this.$axios.post('auth/account/verify',{
            verification_code: "890465"
          }, {headers: {'Authorization':localStorage.getItem("auth._token.local")}});


           await this.$auth.loginWith('local', {
            data: {
              email: this.getUserEmail,
              password: this.getUserPassword
            }
          });
									 this.isLoading = false;
								 	this.button_text = "Verify Code";
          this.$toast.show("Successfully verified");
          await this.$router.push('/dashboard');
          this.$store.commit('setViewVerificationPage');
          this.$store.commit('setEmail', '');
          this.$store.commit('setPassword', '');

        }catch (error) {
          if (navigator.onLine) {
            this.isLoading = false;
            this.button_text = "Verify Code";
            this.hasVerificationError = true;
            this.error_message['verification_code'] = 'Invalid Code';
          } else {
            this.isLoading = false;
            this.button_text = "Verify Code";
            this.$toast.show("No Internet connection");
          }


        }
      }
    },
    mounted() {

    }


  }
</script>

<style scoped>
  @import "../assets/css/general_style/authentication_pages.css";

  .form-group {
    margin-bottom: 20px;
    position: relative;
  }

  .form-control {
    display: block;
    width: 100%;
  }

  .has-feedback-left .form-control {
    padding-right: 12px;
    padding-left: 36px;
  }

  .form-panel {
    /* box-shadow: 0 10px 45px 0 rgba(0,0,0,.1); */
    background-color: #fff;
    border: transparent;
  }
  .bg-blue {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    display: inline-block !important;
    color: #fff !important;
    border-radius: 4px;
    vertical-align: bottom !important;
    position: relative;
    border: transparent;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    transition: .35s;
    padding: 7px 15px 8px 15px !important;
    font-weight: 600 !important;
    font-size: 13px !important;
  }

</style>
