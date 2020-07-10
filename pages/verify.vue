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
          <p>We sent a verification code to your email. Enter the code from the email in the field below.</p>

          <form>
            <div class=" ">
              <div class="form-group has-feedback-left mt-50">
                <input id="verification_code" style="width: 50%" type="text" class="form-control" maxlength="6" v-model="verification_code" :class="{'error ' : hasVerificationError, 'has-input' : hasVerificationInput}" placeholder="Enter 6-digit code">
                <span class="input-field_helper">Verification Code</span>
                <span class=" error_field_message" v-if="error_message.verification_code">{{error_message.verification_code}}</span>
              </div>
              <button type="submit" class="btnl bg-blue m-t-25" :disabled="isDisabled">Verify Code</button>
            </div>

          </form>

        </div>
        <!-- END Login Right Container-->
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "verify",
    data(){
      return{
        verification_code: "",
        error_message:[],
        hasVerificationError: false,
        hasVerificationInput: false,
      }
    },
    computed: {
      isDisabled: function () {
        return( this.verification_code === '' || this.error_message.verification_code !== '');
      }
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
          this.error_message['verification_code'] = 'Enter 6 digit verification code'
          this.hasVerificationError = true;
        } else {
          this.error_message['verification_code'] = ''
          this.hasVerificationError = false;
        }
      }
    }

  }
</script>

<style >
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

</style>
