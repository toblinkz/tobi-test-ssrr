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

          <p class="p-t-35 m-l-20">Oops, you forgot your password. Fill in your email, below let's help you out!</p>
          <form>
            <input type="hidden" name="_token" value="">

            <div class="form-panel panel-body ">
              <div class="form-group has-feedback-left mt-20">
                <input id="email" style="width: 100%" type="text" class="form-control" required placeholder="Work email">
              </div>

              <button type="submit" class="btnl bg-blue m-t-25">Proceed</button>
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

  }
</script>

<style >
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
