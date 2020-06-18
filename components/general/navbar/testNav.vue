<template>
  <div class="navbar-fixed-top navbar navbar-inverse" style="z-index: 800;background-color: #ffffff;">
    <div class="row ">
      <div class="" style="margin-left: 250px; margin-top: 0">
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
      <div class="navbar-collapse collapse navbar-right" id="navbar-mobile">

        <ul class="nav navbar-nav navbar-right mt-5">
          <li class="icon-new hidden-xs" style="color: #fff !important;">
            <div data-toggle="popover" title="Change log" style="float: left;top: -2px;font-size: 20px;border-width: 0 1px;position: relative;height: 40px;line-height: 42px;cursor: pointer;color: #2c2c2c !important;">
              <i class="entypo-bell"></i></div>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">

          <li class="m-left hidden-xs">
            <a href="/message/select-type" type="button" class="btn stretch-a" style="height: 20px !important;margin-top: 8px !important;padding-bottom: 26px;
    color: #fff !important;padding-top: 7px !important;background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);font-weight: 100 !important;">
              <i class="entypo-paper-plane" style="font-size: 14px;"></i> Compose message
            </a>
          </li>
          <Dropdown>
            <template v-slot:dropdown_title>
              <a class="dropdown-toggle stretch-a" data-toggle="dropdown" style="color: #2c2c2c !important;">
                <img preview-for="image"  src="/images/team/10.png" alt=""><span style="margin-left: 5px;"> Quick Menu</span>
                <i class="caret"></i>
              </a>
            </template>
            <template v-slot:dropdown_menu>
              <li><a href="/admin/dashboard"><i class="entypo-shareable"></i> Admin view</a></li>
              <li class="divider"></li>

              <li><a href="http://sandbox.termii.com/billing/fund"><i class="entypo-credit-card"></i> Top Up</a></li>
              <li>
                <a href="/message/select-type">
                  <i class="entypo-paper-plane"></i><span> Message</span>
                </a>
              </li>

              <li>
                <a href="http://sandbox.termii.com/sms/history">
                  <i class="entypo-chart-line"></i><span> Reports</span>
                </a>
              </li>

              <li>
                <a href="http://sandbox.termii.com/account/profile"><i class="entypo-vcard"></i> Account</a>
              </li>

              <li><a href="http://sandbox.termii.com/logout"><i class="icon-switch2"></i> logout</a></li>
            </template>
          </Dropdown>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import Dropdown from "../dropdown/Dropdown";
  export default {
    name: "testNav",
    components: {Dropdown},
    data(){
      return{
        isOpen:'false'
      }
    },
    methods: {
      toggle: function () {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style >
  @import "assets/css/general_style/navbar.css";

  .navbar-inverse {
    /* background-color: #37474F; */
    border-color: #37474F;
  }
  .navbar-fixed-top, .navbar-fixed-bottom {
    border-radius: 0;
  }
  .navbar-fixed-top {
    top: 0;
    /* border-width: 0 0 1px; */
  }
  @media (min-width: 769px){
    .navbar-fixed-top, .navbar-fixed-bottom {
      border-radius: 0;
    }
  }
  .navbar-fixed-top, .navbar-fixed-bottom {
    position: fixed;
    right: 0;
    left: 0;
    /* z-index: 1030; */
  }
  .navbar {
    /* position: relative; */
    min-height: 44px;
    /* margin-bottom: 20px; */
    /* border: 1px solid transparent; */
  }
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
      margin-right: -10px;
    }
  }
  @media (min-width: 769px){
    .navbar-collapse {
      width: auto;
      border-top: 0;
      box-shadow: none;
    }
  }
  @media (min-width: 769px){
    .navbar-right ~ .navbar-right {
      margin-right: 0;
    }
  }
  @media (min-width: 769px){

    .navbar-nav > li {
      float: left;
    }
  }
  .m-left {
    margin-left: 24px !important;
  }
  .navbar-nav > .dropdown-user img {
    max-height: 40px;
    margin-top: -2px;
    margin-bottom: -2px;
  }
  .navbar-nav > .dropdown-user > a, .navbar-nav > .dropdown-user > a > span {
    padding-top: 7px;
    padding-bottom: 9px;
  }
  #navbar-mobile i {
    margin-right: 5px;
    font-size: 18px;
  }
  .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .navbar-inverse {
    border-top: 1px solid #37474F;;
    border-bottom: 1px solid #fff;
  }



</style>
