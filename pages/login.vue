<template >
  <div class="login-page-height">
    <div class="login-wrapper">
      <!-- START Login Background Pic Wrapper-->
      <div class="bg-pic">
        <!-- START Background Pic-->

        <div class="m-t-30 hidden-xs">
          <img alt="Image" style="width: 45%;margin-top: -40px;margin-bottom: -85px;margin-left: 10px;" src="/images/products/ds.svg">
        </div>
        <!-- END Background Pic-->
      </div>
      <!-- END Login Background Pic Wrapper-->
      <!-- START Login Right Container-->
      <div class="login-container bg-white">
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
          <nuxt-link to="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></nuxt-link>
          <!-- START Login Form -->
          <form class="" role="form" method="post" action="/">

            <div class="auth-panel panel-body ">
              <p class="p-t-20">Welcome back! Sign into your account, we've been waiting for you!</p>
              <div class="login-form-group has-feedback has-feedback-left m-t-35">
                <input id="" style="width: 100%"  type="email" class="form-control " :class="{'error ' : hasEmailError}"  v-model="email"  placeholder="Work email">
                <span class="input-field_helper">Work Email</span>
                <span class=" error_field_message" v-if="error_message.email">{{error_message.email}}</span>
              </div>


              <div class="login-form-group has-feedback has-feedback-left ">
                <input id="password" style="width: 100%"  :type="type" class="form-control " :class="{'error ' : hasPasswordError}" v-model="password" placeholder="Password" maxlength="24">
                <span class="input-field_helper">Password</span>
                <span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
                <i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showPassword"></i>
              </div>

              <div class="login-form-group login-options" style="margin-left: -20px">
                <div class="row">
                  <div class="col-sm-6">
                    <label class="checkbox-inline">
                      <input type="checkbox" class="styled" checked="checked" name="remember">
                      STAY LOGGED IN
                    </label>
                  </div>
                </div>
              </div>
              <div class="row" style="width: 100%">
                <button type="submit" class="btnl bg-blue m-t-10" :disabled="isDisabled">Proceed</button>
                <nuxt-link  to="/forgot-password" class="text-info2 pull-right mt-20">Forgot password</nuxt-link>
              </div>
              <div>
                <br>
                Don't have an account with Termii? You can <nuxt-link to="/register" class="text-info bold">Create an account here</nuxt-link> <br>or speak to an agent <a id="CHATID" class="text-info2">here</a>
              </div>
            </div>

          </form>
          <!-- Advanced login -->
        </div>
        <!-- /advanced login -->
      </div>
    </div>
    <!-- END Login Right Container-->
  </div>
</template>


<script>
  export default {
    name: "login",
    data(){
      return{
        email:"",
        password:"",
        valid: false,
        error_message:[],
        hasEmailError: false,
        hasPasswordError: false,
        isToggled: false,
        type: "password"
      }
    },
    computed: {
      isDisabled: function () {
            return (this.hasEmailError || this.hasPasswordError || this.email === '' || this.password === '');
      },
    },
    watch: {
      email(value) {
            this.email = value;
            this.validateEmail(value);
      },
      password(value) {
        this.password = value;
        this.validatePassword(value);
      }
    },
    methods: {
      validateEmail(value){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
          this.error_message['email'] = '';
          this.hasEmailError = false;
        }else {
          this.error_message['email'] = 'The email field must be a valid email';
          this.hasEmailError = true;
        }
      }
      ,
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
      }

    }


  }
</script>

<style>
  @import "../assets/css/general_style/authentication_pages.css";
  .login-page-height{
    height: 100vh;
  }
  .has-feedback-left .form-control {
    padding-right: 12px;
    padding-left: 36px;
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

  .login-form-group {
    margin-bottom: 20px;
    position: relative;
  }

</style>
