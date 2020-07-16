<template>
  <div class="body navbar-fixed-top navbar navbar-inverse" style="z-index: 800;background-color: #ffffff;">
    <div class="navbar-header">
      <a class="navbar-brand visible-xs-block" href="/">
        <img src="http://sandbox.termii.com/assets/images/logo.png" alt="">
      </a>
      <ul  class="nav navbar-nav pull-right visible-xs-block" >
        <li>
          <a class="mobile-menu-button" data-toggle="collapse" ><i  class="icon-menu7" style="color: #000;" @click="toggleMenu"></i></a></li>
      </ul>
    </div>
    <div class="navbar-header hidden-xs" style="margin-left: 250px; margin-top: 18px">
      <div id="google_translate_element"></div>
      <script type="text/javascript">
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        }
      </script>

      <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    </div>
      <div class="navbar-collapse collapse " id="navbar-mobile">

        <ul class="nav navbar-nav navbar-right mt-5">
          <li class="icon-new hidden-xs" style="color: #fff !important;">
            <div data-toggle="popover" title="Change log" style="float: left;top: -2px;font-size: 20px;border-width: 0 1px;position: relative;height: 40px;line-height: 42px;cursor: pointer;color: #2c2c2c !important;">
              <i class="entypo-bell"></i></div>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">

          <li class="m-left hidden-xs">
            <nuxt-link to="/message/select-type" type="button" class="btn stretch-a" style="height: 30px !important;margin-top: 8px !important;padding-bottom: 26px;
    color: #fff !important;padding-top: 7px !important;background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);font-weight: 100 !important;">
              <i class="entypo-paper-plane" style="font-size: 14px;"></i> Compose message
            </nuxt-link>
          </li>
          <Dropdown id="mobile-menu" class="hide-menu">
            <template v-slot:dropdown_title>
              <a class="dropdown-toggle stretch-a" data-toggle="dropdown" style="color: #2c2c2c !important;">
                <img preview-for="image"  src="/images/team/10.png" alt=""><span style="margin-left: 5px;"> Quick Menu</span>
                <i class="caret"></i>
              </a>
            </template>
            <template v-slot:dropdown_menu>
              <li><nuxt-link to="/billing/fund"><i class="entypo-credit-card"></i> Top Up</nuxt-link></li>
              <li>
                <nuxt-link to="/message/select-type">
                  <i class="entypo-paper-plane"></i><span> Message</span>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link to="/sms/history">
                  <i class="entypo-chart-line"></i><span> Reports</span>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link to="/account/profile"><i class="entypo-vcard"></i> Account</nuxt-link>
              </li>

              <li><nuxt-link to="/login"><i class="icon-switch2"></i> logout</nuxt-link></li>
            </template>
          </Dropdown>
        </ul>
      </div>
    </div>
</template>

<script>
  import Dropdown from "../dropdown/Dropdown";
  export default {
    name: "DashboardNavbar",
    components: {Dropdown},
    data(){
      return{
        isOpen:'false'
      }
    },
    methods: {
      toggle: function () {
        this.isOpen = !this.isOpen
      },
      toggleMenu(){
        $("#mobile-menu").toggleClass("hide-menu");
      }
    }
  }
</script>

<style >
  @import "assets/css/general_style/navbar.css";

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
  .hide-menu{
    display: none;
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
  .stretch-a {
    margin-left: 15px !important;

  }
  .navbar-nav > .dropdown-user img {
    max-height: 40px;
    margin-top: -2px;
    margin-bottom: -2px;
  }
  .navbar-brand > img {
    margin: 0 auto;
    max-height: 53px;
    max-width: 140px;
    vertical-align: middle;
    display: inline-block;
    margin-top: 6px;
    margin-left: 70px;
  }
  .navbar-nav > li > a.mobile-menu-button i {
    font-size: 24px;
    color: #2395be;
    margin-top: 10px;
  }
  .navbar-brand > img {
    height: auto;
  }
</style>
