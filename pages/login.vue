<template>
  <div class="">
    <div class="login-wrapper">
      <!-- START Login Background Pic Wrapper-->
      <div class="bg-pic">
        <!-- START Background Pic-->

        <div>
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
            <input type="hidden" name="_token" value="bLqMIBnNWYGYyyCMLc9fEwvTtKMQPXm5RZ7u8VBH">

            <div class="panel panel-body mt-20">
              <div class="form-group has-feedback has-feedback-left ">
                <input id="email"  style="width: 95%" type="text" class="form-control" value="" required name="email" placeholder="Work email">
              </div>

              <div class="form-group has-feedback has-feedback-left">
                <input id="password" style="width: 95%"  type="password" class="form-control" required name="password" placeholder="Password">
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
              <div class="row" style="width: 95%">
                <button type="submit" class="btnl bg-blue m-t-10">Proceed</button>
                <a  href="https://termii.com/forgot-password" class="text-info pull-right">Forgot password</a></div>
            </div>

          </form>
          <div class="m-t-50 m-b-45">

            <br>
            Don't have an account with Termii? You can <a href="https://termii.com/register" class="text-info">Create an account here</a> <br>or speak to an agent <a id="CHATID">here</a>
          </div>
          <!-- /advanced login -->
        </div>
      </div>
      <!-- END Login Right Container-->
    </div>

  </div>
</template>


<script>
    export default {
        name: "login",

    }
</script>

<style>
@import "assets/css/general_style/pages.css";

  body {
    color: #626262;
    font-family: "Karla",sans-serif;
    font-size: 15px;
    font-weight: normal;
    letter-spacing: 0.01em;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-font-feature-settings: "kern" 1;
    -moz-font-feature-settings: "kern" 1;
  }
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .has-feedback-left .form-control {
    padding-right: 12px;
    padding-left: 36px;
  }
  input[type="text"], input[type="password"], input[type="search"], input[type="email"], input[type="number"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="url"], input[type="tel"], textarea {
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  .form-control {
      height: 55px;
 ;
  }
  @media (max-width: 1400px){
    body, p {
      font-size: 13px;
      line-height: 20px;
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
  .text-info, .text-info:hover, .text-info:focus {
    color: #00BCD4 !important;
  }
  .btnl {
    cursor: pointer;
    transition: color 0.1s linear 0s, background-color 0.1s linear 0s, opacity 0.2s linear 0s !important;

  }
  .btnl:hover {
    background-color: #fafafa;
    border: 1px solid rgba(98, 98, 98, 0.27);
  }



</style>
