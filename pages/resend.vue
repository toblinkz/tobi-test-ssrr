<template>
  <div class="resend-page-height">
    <div class="login-wrapper ">
      <!-- START Login Background Pic Wrapper-->
      <div class="bg-pic">
        <!-- START Background Pic-->

        <div>
          <img alt="Image" style="width: 45%;margin-top: -25px;margin-bottom: -85px;margin-left: 10px;" src="/images/products/ds.svg">
        </div>
        <!-- END Background Pic-->
      </div>
      <!-- END Login Background Pic Wrapper-->
      <!-- START Login Right Container-->
      <div class="login-container bg-white col-md-6">
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
          <nuxt-link to="/"> <img src="/images/logo.png" alt="logo" data-src-retina="https://termii.com/" width="150px" height="auto"></nuxt-link>
          <!-- START Login Form -->
          <p class="p-t-100"> Your verification attempt failed! <br>Please generate a new link to verify your account.</p>
           <!-- Advanced login -->

          <div class="p-t-85 ">
            <nuxt-link class="bg-blue" to="#">Click here to resend the email</nuxt-link>

          </div>


        </div>
        <!-- END Login Right Container-->
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "resend",


  }
</script>

<style scoped>
  @import "../assets/css/general_style/authentication_pages.css";


  .resend-page-height{
    height: 100vh;
  }
  @media (max-width: 1400px){
    body, p {
      font-size: 13px;
      line-height: 20px;
    }

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

</style>
