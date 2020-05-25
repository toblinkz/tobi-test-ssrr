<template>
  <div class="fixed-header ">
    <div class="login-wrapper ">
      <!-- START Login Background Pic Wrapper-->
      <div class="bg-pic">
        <!-- START Background Pic-->

        <div class="col-md-6 mt-100 hidden-xs">
          <img alt="Image" style="width: 45%;margin-top: -25px;margin-bottom: -85px;margin-left: 10px;" src="https://termii.com/assets/images/products/ds.svg">
        </div>
        <!-- END Background Pic-->
      </div>
      <!-- END Login Background Pic Wrapper-->
      <!-- START Login Right Container-->
      <div class="login-container bg-white">
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
          <a href="https://termii.com"> <img src="https://termii.com/assets/images/logo.png" alt="logo" data-src-retina="https://termii.com/" width="150px" height="auto"></a>
          <!-- START Login Form -->
          <p class="p-t-35">Welcome back! Sign into your account, we've been waiting for you!</p>
          <!-- Advanced login -->
          <form class="" role="form" method="post" action="https://termii.com/client/get-login">
            <input type="hidden" name="_token" value="iS1e2kzwQZvDjzwLglKgHxSW1SLWB36CubdMOicr">

            <div class="panel panel-body mt-20">
              <div class="form-group has-feedback has-feedback-left mt-20">
                <input id="email"  style="width: 87%" type="text" class="form-control" value="" required name="email" placeholder="Work email">
              </div>

              <div class="form-group has-feedback has-feedback-left">
                <input id="password" style="width: 87%"  type="password" class="form-control" required name="password" placeholder="Password">
              </div>

              <div class="form-group login-options hidden">
                <div class="row">
                  <div class="col-sm-6">
                    <label class="checkbox-inline">
                      <input type="checkbox" class="styled" checked="checked" name="remember">
                      STAY LOGGED IN
                    </label>
                  </div>
                </div>
              </div>
              <div class="row" style="width: 95%">
                <button type="submit" class="btn bg-blue m-t-10">Proceed</button>
                <a  href="https://termii.com/forgot-password" class="text-info pull-right">Forgot password</a></div>
            </div>
            <div>

              <br>
              Don't have an account with Termii? You can <a href="https://termii.com/register" class="text-info">Create an account here</a> <br>or speak to an agent <a id="CHATID">here</a>
            </div>
          </form>
          <!-- /advanced login -->
        </div>
      </div>
      <!-- END Login Right Container-->
    </div>

  </div>
</template>

<script>
    export default {
        name: "login_page"
    }
</script>

<style scoped>
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
      padding-top: 7px !important;
      padding-bottom: 8px !important;
      padding-left: 26px !important;
      padding-right: 15px !important;
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
    padding-top: 7px !important;
    padding-bottom: 8px !important;
    padding-left: 26px !important;
    padding-right: 15px !important;
    font-weight: 600 !important;
    font-size: 13px !important;
  }
</style>
