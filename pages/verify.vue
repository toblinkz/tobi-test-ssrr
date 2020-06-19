<template>
  <div class="page-height">
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
          <nuxt-link to="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></nuxt-link>
          <!-- START Login Form -->
          <p class="p-t-100"> Thank you for signing up on Termii! To complete our signup process, you need to confirm your identity by clicking the verification link we sent to your email address.</p>
          <!-- Advanced login -->

          <div class="p-t-65 ">
            <a class="bg-blue" href="#">Click here to resend the email</a>
          </div>


      </div>
      <!-- END Login Right Container-->
    </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "verify",

  }
</script>

<style>
  @import "assets/css/general_style/pages.css";





</style>
