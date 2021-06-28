<template>
  <div class="login-page-height">
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

          <p class="p-t-35 m-l-20">Oops, you forgot your password. Fill in your email, below let's help you out!</p>
          <form @submit.prevent="sendRequestPassword" method="post">
            <div class="form-panel panel-body ">
              <div class="form-group has-feedback-left mt-20">
                <input id="email" style="width: 100%" type="text" class="form-control" v-model="email" :class="{'error ' : hasEmailError, 'has-input' : hasEmailInput}" placeholder="Work email">
                <span class="input-field_helper">Email</span>
                <span class=" error_field_message" v-if="error_message.email">{{error_message.email}}</span>
              </div>
              <button type="submit" class="btnl bg-blue m-t-25" :disabled="isDisabled">
               {{button_text}}
                <span v-show="isLoading">
                  <img src="/images/spinner.svg" height="20px" width="80px"/>
                </span>
              </button>
            </div>
            <div >
              <p class="m-l-20">Return back to <nuxt-link to="/login" class="text-info">login</nuxt-link></p>
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
    name: "forgot-password",
			 middleware: "guest",
			 layout: 'auth',
    data(){
      return{
        email: "",
        error_message:[],
        hasEmailError: false,
        hasEmailInput: false,
        button_text: 'Proceed',
        isLoading: false
      }
    },
    computed: {
      isDisabled: function () {
          return( this.email === '' || this.error_message.email !== '' || this.hasEmailError);
      }
    },
    watch: {
      email(value) {
        this.email = value;
        this.hasEmailInput = true;
        this.validateEmail(value);
      },
    },
    methods: {
      validateEmail(value){
							if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
          this.error_message['email'] = '';
          this.hasEmailError = false;
        }else {
          this.error_message['email'] = 'The email field must be a valid email';
          this.hasEmailError = true;
        }
      },

      async sendRequestPassword(){
        try {
          this.isLoading = true;
          this.button_text = ''
          await this.$axios.$post('password-reset/request', {
            email: this.email
          });
          this.isLoading = false;
          this.button_text = 'Proceed'
          this.$toast.success('Password reset was successful, check your email.')
        }
        catch (e) {
          this.getAndSetErrors(e)
        }

      },
      getAndSetErrors(exception){
        switch (exception.response.data.errors.email[0]){
          case ('Account is currently not active, contact account manager'):{
            this.hasEmailError = true;
            this.error_message['email'] = 'Account is currently not active, contact account manager';
            this.isLoading = false;
            this.button_text = "Proceed"
            break;
          }
          case ('The selected email is invalid.'):{
            this.hasEmailError = true;
            this.error_message['email'] = 'The selected email is invalid.';
            this.isLoading = false;
            this.button_text = "Proceed"
            break;
          }
          default:{
            this.$toast.error('We cannot process this request at the moment')
          }
        }
      }

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
