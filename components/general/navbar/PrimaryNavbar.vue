<template>
  <div>
    <div >
    <!-- Main navbar -->
    <div class="navbar navbar-verse navbar-fixed-top">
      <div class="navbar-header" style="background: #fff !important;">
        <nuxt-link to="/">
          <img class="margin-lx z-in img-top" src="/images/logo.png" alt="logo" data-src="/images/logo.png" data-src-retina="/images/logo.png" width="155px" height="auto" >
        </nuxt-link>

        <ul class="nav navbar-nav pull-right visible-xs-block" >
          <li>
            <div class="mobile-menu-button z-in" data-toggle="collapse" data-target="#navbar-mobile" style="">
              <i id="menu" class="icon-menu7 blue-t " @click="toggle"></i>
            </div>
          </li>
        </ul>
      </div>

      <div class="navbar-collapse hide-menu" id="navbar-mobile" >

        <ul class="nav navbar-nav navbar-right z-in">

          <ul class="nav navbar-nav">
            <div class="drops">
              <a class="men">Why Termii?</a>
              <div class="dropdown-content menu-t">
                <nuxt-link  to="/about" class="pad-width">
                  About Us
                </nuxt-link>
                <nuxt-link to="/usecases" class="pad-width">
                  Usecase
                </nuxt-link>
                <nuxt-link  to="/investors" class="up-top pad-width hidden-xs">
                  Milestones
                </nuxt-link>
              </div>
            </div>
          </ul>

          <ul class="nav navbar-nav">
            <div class="drops">
              <a class="men">Products</a>
              <div class="dropdown-content menu-t">
                <nuxt-link to="/products/token" class="pad-width" style="width: 270px;"><small class="blue-t">TOKEN</small><br>OTP Verification</nuxt-link>
                <nuxt-link to="/products/switch" class="pad-width" style="width: 270px;"><small class="blue-t">SWITCH</small><br>Cross-channel Messaging</nuxt-link>
                <nuxt-link to="/products/insight" class="pad-width" style="width: 270px;"><small class="blue-t">INSIGHT</small><br>Customer Status Analytics</nuxt-link>
                <nuxt-link to="/guideline" class="up-top pad-width" style="width: 270px;"><small class="blue-t">DEVELOPERS</small><br>Full API Documentation</nuxt-link>
              </div>
            </div>
          </ul>

          <ul class="nav navbar-nav">
            <div class="drops">
              <nuxt-link  class="men" to="/plans">
                Pricing
              </nuxt-link>
            </div>
          </ul>

          <li class="hidden-xs">
            <a class="pad-width">
              <i class="entypo-phone"></i> 234-9022557951
            </a>
          </li>

          <li>
            <nuxt-link   class="btn btx-login " to="/login">Login
            </nuxt-link>
          </li>
          <li class="hidden-xs">
            <nuxt-link  class="btn bt-login " to="/register"> Signup <i class="fa fa-angle-double-right ico-r"></i></nuxt-link>
          </li>

        </ul>
      </div>
    </div>
    <!-- /main navbar -->
    </div>
  </div>
</template>

<script>
    export default {
        name: "PrimaryNavbar",
      data(){
          return{
          open: false,
          }
      },
      methods: {
          toggle(){

              $("#navbar-mobile").toggleClass("hide-menu");
          }
      },
      mounted() {

      }
    }
</script>

<style scoped>
  .navbar {
    position: relative;
    min-height: 44px;
    margin-bottom: 20px;
    border: 1px solid transparent;
  }
  .navbar-verse {
    color: #777 !important;
    background: #fff !important;
    border-bottom: 1px solid #fff !important;
    padding: 20px 50px 20px 50px !important;
  }

  .ico-r {

    vertical-align: bottom;
    line-height: 1.3 !important;
  }

  .navbar-fixed-top {
    top: 0;
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
  }

  @media (min-width: 769px){
    .navbar-top {
      padding-top: 25px;
    }
  }

  .nav > li > a:hover, .nav > li > a:focus {
    text-decoration: none;
    background-color: #fff;
    color: #777 !important;
  }

  @media (min-width: 769px){
    .navbar-fixed-top {
      border-radius: 0;
    }
  }

  .navbar-header {
    min-width: 140px;
    margin-top: 5px;
  }
  .margin-lx {
    margin-left: 53px !important;
  }
  .navbar-nav {
    text-align: left;
    margin-top: 0;
  }
  .pull-right {
    float: right !important;
  }

  .z-in {
    z-index: 2 !important;
    position: relative !important;
  }
  .mobile-menu-button {
    padding: 10px 10px 9px 10px;
  }
  /*.navbar-fixed-top .navbar-collapse {
    height: 390px;
  }*/
  .navbar-fixed-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {
    max-height: 340px;
  }
  @media (min-width: 769px){
    .navbar-collapse.collapse {
      display: block !important;
      height: auto !important;
      padding-bottom: 0;
      overflow: visible !important;
    }
  }

  @media (min-width: 769px){
    .navbar-right {
      float: right !important;

    }
  }
  @media (min-width: 769px){
    .navbar-nav {
      float: left;
      margin-left: 20px;
    }
  }
  .drops {
    position: relative;
    display: inline-block;
    margin-top: 10px;
  }
  .navbar-verse a {
    color: #777;
  }
  .men {
    padding-top: 10px !important;
    padding-right: 13px !important;
    font-weight: 500 !important;
    font-size: 14px !important;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  .menu-t {
    border-top: 2px solid #1990bb !important;
  }
  .nav {
    padding-left: 0;
    list-style: none;
  }
  @media (min-width: 769px) {
    .navbar-nav > li {
      float: left;
    }
  }
  .nav > li {
    position: relative;
    display: block;
  }
  .nav > li > a {
    position: relative;
    display: block;
  }
  .pad-width {
    padding: 10px 10px 16px 25px !important;
    font-weight: 500 !important;
    font-size: 14px !important;
  }
  a {
    background-color: transparent;
    text-decoration: none;
    cursor: pointer;
  }
  #navbar-mobile i {
    margin-right: 5px;
    font-size: 18px;
  }
  .navbar-nav > li > a {
    line-height: 20px;
  }
  .li-a {
    padding: 14px 25px 16px !important;
    font-weight: 500 !important;
    font-size: 15px !important;
  }
.container {
    font-size: 14px;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Karla",sans-serif;
}
  @media (min-width: 769px){
    .navbar-header {
      margin-left: 90px;
      float: left;
    }
  }
  .navbar-nav > li > a.mobile-menu-button {
    padding: 15px 10px 9px 10px;
  }
  .navbar-nav > li > a.mobile-menu-button i {
    font-size: 24px;
    color: #2395be;
  }



  .blue-t {
    color: inherit;
    background: -moz-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(-30%, #0DCBE5), color-stop(60%, #365899));
    background: -webkit-linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    background: -o-linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    background: -ms-linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0DCBE5', endColorstr='#365899',GradientType=0 );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media (min-width: 769px){
    .navbar-collapse {
      width: auto;
      border-top: 0;
      box-shadow: none;
    }
  }
  @media (min-width: 769px){
    .navbar-right {
      margin-right: 140px;
    }
  }
  .up-top {
    border-top: 1px solid #e5e5e5 !important;
  }

  @media (min-width: 769px){
    .navbar-fixed-top .navbar-collapse, .navbar-static-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {
      padding-left: 0;
      padding-right: 0;
    }
  }
  body {
    font-family: "Karla",sans-serif;
    font-size: 13px;
    line-height: 1.5384616;
    color: #333333;
    background-color: #f5f5f5;
  }


  .dropdown-content a:hover {background-color: #efefef;}

  .drops:hover .dropdown-content {display: block;}
  .dropdown-menu > .active > a, .dropdown-menu > .active > a:hover, .dropdown-menu > .active > a:focus {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    border-color: #365899;
  }


  .dropdown-content a {
    color: #777;;
    padding: 12px 13px;
    text-decoration: none;
    display: block;
  }

@media (max-width: 769px) {
  .nav > li > a[data-v-ab7ed956] {
    position: relative;
    display: inline;
  }
  .navbar-verse[data-v-ab7ed956] {
    color: #777 !important;
    background: #fff !important;
    border-bottom: 1px solid #fff !important;
    padding: 0px !important;
  }
  .navbar-header {
    box-shadow: 0 1px 10px rgba(0,0,0,0.1);
    border-width: 0 0 1px;
    margin-top: 0px;
  }
  .img-top{
    margin-top: 10px;
  }
  .mobile-menu-button {
    padding-top: 15px;

  }
  .navbar-nav > li > div.mobile-menu-button i {
    font-size: 24px;
    color: #2395be;
  }
  .navbar-right{
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 20px;
  }
  .hide-menu{
    display: none;
  }
  .navbar-fixed-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {
    box-shadow: 0 0px 10px rgba(0,0,0,0.1);
    border-width: 0 0 1px;
    max-height: 340px;
  }
}


</style>
