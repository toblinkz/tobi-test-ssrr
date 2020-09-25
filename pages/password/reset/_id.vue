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

          <p class="p-t-35 m-l-20">Enter New Password</p>
          <form @submit.prevent="requestPasswordReset" method="post">
            <div class="form-panel panel-body ">
              <div class="form-group has-feedback-left">
                <input  style="width: 100%" :type="type" class="form-control" v-model="password" :class="{'error ' : hasPasswordError, 'has-input' : hasPasswordInput}" placeholder="Password">
                <span class="input-field_helper">Password</span>
                <span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
                <i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showPassword"></i>
															<div v-show="hasPasswordError">
																<p>Password should contain at least:</p>
																<ul>
																	<li>One lowercase letter</li>
																	<li>One uppercase letter</li>
																	<li>One special character </li>
																	<li>8 minimum characters</li>
																</ul>
															</div>
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
    name: "_id",
    data(){
      return{
        password: "",
        type: 'password',
        error_message:[],
        hasPasswordError: false,
        hasPasswordInput: false,
        button_text: 'Save',
        isLoading: false,
        isToggled: false,
      }
    },
    computed: {
      isDisabled: function () {
        return( this.password === '' || this.error_message.password !== '' || this.hasPasswordError);
      }
    },
    watch: {
      password(value) {
        this.email = value;
        this.hasEmailInput = true;
        this.validatePassword(value);
      },
    },
    methods: {
      validatePassword(value){
        if ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%^&*])(?=.{8,})/.test(value)){
          this.error_message['password'] = '';
          this.hasPasswordError = false;
        }
        else {
          this.error_message['password'] = 'Password is too weak';
          this.hasPasswordError = true;
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
      async verifyResetPasswordToken(){
        let verifyToken = await this.$axios.$get('password-reset/verify/token-link/'+ this.$route.params.id);

        if (verifyToken.data === false){
          this.$toast.error("Request for password reset again");
        }
      },
      async requestPasswordReset(){
        try{
          await this.$axios.$post('password-reset', {
            token: this.$route.params.id,
            password: this.password
          });
          this.$toast.success("successfully updated.")
          this.$router.push({name: 'login'});
        }catch (e) {

        }

      },
    },
    created() {
      this.verifyResetPasswordToken();
    },
    mounted() {


    }

  }
</script>

<style scoped>
  @import "assets/css/general_style/authentication_pages.css";

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
