<template>
  <div class="navbar body navbar-default navbar-fixed-top" role="navigation">
    <div class="row">

      <!-- Collapsed navigation -->
      <div class="navbar-header">


        <!-- Main title -->
        <nuxt-link class="navbar-brand" to="/"> <img src="/images/logo.png" alt="logo" style="margin-left: 30px;" data-src="/images/logo.png" data-src-retina="/images/logo.png" width="120px" height="auto" ></nuxt-link>

      </div>

      <!-- Expanded navigation -->
      <div class="navbar-collapse collapse hidden-xs">

        <ul class="nav navbar-nav navbar-right" style="margin-right: 80px;">

          <li>
            <nuxt-link no-prefetch class="btn btx-login" to="/login">Login
            </nuxt-link>
          </li>
          <li>
            <nuxt-link no-prefetch class="btn bt-login btn-icon" to="/register"> Signup <i class="fa fa-angle-double-right ico-r"></i></nuxt-link>
          </li>


        </ul>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "SecondaryNavbar"
    }
</script>

<style scoped>
  .navbar {
    background: #fff !important;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff54b4eb',endColorstr='#ff1d9ce5',GradientType=0);
    filter: none;
    -webkit-box-shadow: 0 1px 10px rgba(0,0,0,0.1);
    box-shadow: 0 1px 10px rgba(0,0,0,0.1);
    min-height: 50px;
    margin-bottom: 20px;
    border: 1px solid transparent;
  }
  @media (min-width: 768px){
    .container>.navbar-header, .container>.navbar-collapse {
      margin-right: 0;
      margin-left: 0;
    }
  }
  .container>.navbar-header, .container>.navbar-collapse {
    margin-right: -15px;
    margin-left: -15px;
  }
  @media (min-width: 768px){
    .navbar-header {
      float: left;
    }
  }

  .navbar-default .navbar-brand {
    color: #fff;
  }
  .navbar .navbar-nav>li>a, .navbar-brand {
    text-shadow: 0 1px 0 rgba(0,0,0,0.1);
  }
  .navbar-brand {
    float: left;
    padding: 15px 15px;
    font-size: 18px;
    line-height: 20px;
  }
  .navbar-default .navbar-collapse, .navbar-default .navbar-form {
    border-color: #1995dc;
  }
  @media (min-width: 768px){
    .container>.navbar-header, .container>.navbar-collapse {
      margin-right: 0;
      margin-left: 0;
    }
  }
  @media (min-width: 768px){
    .navbar-fixed-top .navbar-collapse, .navbar-static-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {
      padding-right: 0;
      padding-left: 0;
    }
  }
  @media (min-width: 768px){
    .navbar-collapse.collapse {
      display: block!important;
      height: auto!important;
      padding-bottom: 0;
      overflow: visible!important;
    }
  }
  @media (min-width: 768px){
    .navbar-collapse {
      width: auto;
      border-top: 0;
      box-shadow: none;
    }
  }
  .navbar-collapse {
    max-height: 340px;
  }
  @media (min-width: 768px){
    .navbar-right {
      float: right!important;
    }
  }
  @media (min-width: 768px){
    .navbar-nav {
      float: left;
      margin: 7.5px;
    }
  }
  .nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  @media (min-width: 768px){
    .navbar-nav>li>a {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
  .nav>li>a {
    position: relative;
    display: block;
    padding: 10px 15px;
  }
  @media (min-width: 768px){
    .navbar-nav>li {
      float: left;
    }

  }
  .navbar-default .navbar-nav>li>a:hover, .navbar-default .navbar-nav>li>a:focus {
    color: #777;
    background-color: #efefef;
  }
  a {
    color: #555;
    text-decoration: none;
  }


  .navbar-fixed-top {
    top: 0;
    border-width: 0 0 1px;
  }
  @media (min-width: 768px){
    .navbar-fixed-top, .navbar-fixed-bottom {
      border-radius: 0;
    }
  }
  .navbar-fixed-top, .navbar-fixed-bottom {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
  }


</style>
