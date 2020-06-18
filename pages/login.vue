<template >
  <div class="page-height">
    <div class="login-wrapper">
      <!-- START Login Background Pic Wrapper-->
      <div class="bg-pic">
        <!-- START Background Pic-->

        <div class="m-t-30 hidden-xs">
          <img alt="Image" style="width: 45%;margin-top: -40px;margin-bottom: -85px;margin-left: 10px;" src="https://termii.com/assets/images/products/ds.svg">
        </div>
        <!-- END Background Pic-->
      </div>
      <!-- END Login Background Pic Wrapper-->
      <!-- START Login Right Container-->
      <div class="login-container bg-white">
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
          <a href="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></a>
          <!-- START Login Form -->

          <form class="" role="form" method="post" action="/">

            <div class="panel panel-body ">
              <p class="p-t-20">Welcome back! Sign into your account, we've been waiting for you!</p>
              <div class="form-group has-feedback has-feedback-left m-t-35">
                <input id="" style="width: 100%"  type="email" class="form-control round-form-input" required name="email" placeholder="Work email">
              </div>


              <div class="form-group has-feedback has-feedback-left">
                <input id="password" style="width: 100%"  type="password" class="form-control round-form-input" required name="password" placeholder="Password">
              </div>

              <div class="form-group login-options ">
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
                <button type="submit" class="btnl bg-blue m-t-10">Proceed</button>
                <a  href="/forgot-password" class="text-info pull-right mt-20">Forgot password</a>
              </div>
              <div>
                <br>
                Don't have an account with Termii? You can <a href="/register" class="text-info2 bold">Create an account here</a> <br>or speak to an agent <a id="CHATID" class="text-info2">here</a>
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
    mounted () {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()

        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
    }

  }
</script>

<style>
  @import "assets/css/general_style/pages.css";
  .round-form-input{
    border-radius: 5px;
  }
  .has-feedback-left .form-control {
    padding-right: 12px;
    padding-left: 36px;
  }
  input[type="text"], input[type="password"], input[type="search"], input[type="email"], input[type="number"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="url"], input[type="tel"], textarea {
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  @media (max-width: 768px) {
    .login-wrapper .login-container {
      width: 100% !important;
    }
    .register-container {
      width: 100% !important;
      padding: 15px;
    }
    .login-wrapper .login-sign {
      min-height: 249px;
      width: 100%;
    }
    .login-wrapper .bg-caption {
      width: 100%;
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
      font-weight: 600 !important;
      font-size: 13px !important;
    }
    .register-container {
      width: 100%;
      margin: auto;
      height: 100%;
    }
  }
  @media  only screen and (max-width: 321px) {
    .login-wrapper .login-container {
      width: 100%;
    }
    .register-container {
      width: 100% !important;
      padding: 15px;
    }
    .login-wrapper .login-sign {
      min-height: 249px;
      width: 100%;
    }
    .login-wrapper .bg-caption {
      width: 100%;
    }
    .wd-k {
      width: 64% !important;
    }
    .register-container {
      width: 100%;
      margin: auto;
      height: 100%;
    }
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

    font-weight: 600 !important;
    font-size: 13px !important;
  }

</style>
