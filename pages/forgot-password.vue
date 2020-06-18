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
      <div class="login-container bg-white ">
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
          <a href="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></a>

          <p class="p-t-35 m-l-20">Oops, you forgot your password. Fill in your email, below let's help you out!</p>
          <form>
            <input type="hidden" name="_token" value="">

            <div class="panel panel-body ">
              <div class="form-group has-feedback-left mt-20">
                <input id="email" style="width: 100%" type="text" class="form-control" required placeholder="Work email">
              </div>

              <button type="submit" class="btnl bg-blue m-t-25">Proceed</button>
            </div>
            <div >
              <p class="m-l-20">Return back to <a href="/login" class="text-info">login</a></p>
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

  }
</script>

<style>
  @import "assets/css/general_style/pages.css";

  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .form-control {
    height: 55px;
  ;
  }

  .form-control {
    display: block;
    width: 100%;
  }
  .btnl{
    border: 1px solid #f0f0f0;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }

  .has-feedback-left .form-control {
    padding-right: 12px;
    padding-left: 36px;
  }

  @media (max-width: 1400px){
    body, p {
      font-size: 13px;
      line-height: 20px;
    }

  }
  .bg-blue {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    border-color: #1990bb !important;
    color: #fff !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22) !important;
    margin-bottom: 35px !important;
    border-radius: 22px !important;
    padding-top: 7px !important;
    padding-bottom: 8px !important;
    padding-left: 26px !important;
    padding-right: 26px !important;
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
