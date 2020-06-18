<template>
  <!-- BEGIN SIDEBPANEL-->
  <nav class="page-sidebar" data-pages="sidebar">
    <!-- BEGIN SIDEBAR MENU HEADER-->
    <div id="user-side-bar" class="sidebar-header">
      <center>
        <a href="/dashboard">
          <img src="/images/logo.png" data-src-retina="http://sandbox.termii.com/assets/images/logo.png" width="120px"
               height="auto">
        </a>
      </center>
    </div>
    <!-- END SIDEBAR MENU HEADER-->
    <!-- START SIDEBAR MENU -->
    <div class="sidebar-menu">
                        <span>
           <center>

             <img preview-for="image"  src="/images/team/10.png" class="circular" alt="">

            </center>

            </span>

      <ul class="nav">
        <li>
          <div class="m-t-10 padd-x">
            <center>
              <p class="text-center mt-10" style="color: #d3d3d3;">Per-Billing Account</p>
            </center>
          </div>
        </li>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a  class="dropdown-toggle color-a btn-primary btn-cons bord"><span class="menu-text"><i class="entypo-cc"></i> Wallet
									    <i class="caret"></i></span> <span class="badge badge-sm">New</span></a>
          </template>
          <template v-slot:dropdown_menu>
            <li><a href="/billing/fund"><i class="entypo-credit-card"></i> Top Up</a></li>
            <li><a href="/billing/transactions/history" ><i class="entypo-flow-tree"></i> History</a></li>
            <li>
              <a href="http://sandbox.termii.com/invoices/all">
                <i class="entypo-basket"></i> Invoice
              </a>
            </li>
            <li><a href="/set-unit-limit"><i class="entypo-key"></i> Alert <span class="badge badge-sm badge-sidebar">New</span></a></li>
          </template>
        </Dropdown>
        <!-- BEGIN SIDEBAR MENU ITEMS-->
        <div class="clearfix mb-30"></div>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a data-toggle="dropdown" class="dropdown-toggle color-a"><span class="menu-text"><i class="entypo-list"></i> Activate ID
									    <i class="caret"></i></span> </a>
          </template>
          <template v-slot:dropdown_menu>
            <li><a href="/sms/sender-id-management" ><i class="entypo-list-add"></i> Sender ID</a></li>
            <li><a href="/devices" ><i class="fa fa-barcode"></i> Device ID</a></li>
          </template>
        </Dropdown>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a data-toggle="dropdown" class="dropdown-toggle color-a"><span class="menu-text"><i class="entypo-users"></i> Add Contacts
									    <i class="caret"></i></span> <span class="badge badge-sm badge-sidebar">New</span></a>
          </template>
          <template v-slot:dropdown_menu>
            <li><a href="/phone-book" ><i class="entypo-user-add"></i> Single contacts</a></li>
            <li><a href="/sms/import-contacts"><i class="entypo-upload"></i> Bulk contacts</a></li>
          </template>
        </Dropdown>
        <li class="padd-x">
          <a href="/message/select-type" class="color-a level-1">
            <span> <i class="entypo-paper-plane"></i> Compose message</span>
          </a>
        </li>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a data-toggle="dropdown" class="dropdown-toggle color-a"><span class="menu-text"><i class="entypo-chart-line"></i> Delivery Report
									    <i class="caret"></i></span> <span class="badge badge-sm badge-sidebar">New</span></a>
          </template>
          <template v-slot:dropdown_menu>
            <li><a href="/sms/history" ><i class="entypo-chart-area"></i> Direct Insights</a></li>
            <li><a href="/sms/campaign-reports"><i class="entypo-chart-pie"></i> Group Insights</a></li>

          </template>
        </Dropdown>

        <div class="m-t-30 padd-x">
          <hr>
        </div>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a data-toggle="dropdown" class="dropdown-toggle color-a"><span class="menu-text"><i class="entypo-code"></i> Developers
									    <i class="caret"></i></span></a>
          </template>
          <template v-slot:dropdown_menu>
            <li><a href="http://developer.termii.com" ><i class="entypo-code"></i> API Guide</a></li>
            <li><a href="/account/api"><i class="entypo-key"></i> Api console</a></li>
          </template>
        </Dropdown>
        <li class="padd-x">
          <a href="http://sandbox.termii.com/account/profile" class="color-a level-1">
            <i class="entypo-cog"></i>
            Settings</a>
        </li>

        <div class="clearfix"></div>

        <!-- END SIDEBAR MENU -->
      </ul>

    </div>
    <a class="sidebar-help-button" href="http://help.termii.com/en/" ><i class="entypo-help-circled"></i> Help Center</a>
  </nav>
</template>

<script>
    import Dropdown from "./dropdown/Dropdown";
    import TeamMembersCard from "./cards/TeamMembersCard";
    export default {
        name: "sidebar",
      components: {TeamMembersCard, Dropdown},
      head(){
        return{

        }
      },

    }

</script>

<style >
  @import "../../assets/css/general_style/divpages.css";


  .nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
  }
  .nav > li {
    position: relative;
    display: block;
  }
  .nav > li > a {
    position: relative;
    display: block;
    padding: 7px 15px;
  }
  .color-a {
    color: #fff !important;
  }
  .btn-primary {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
  }
  .bord {
    border-radius: 5px 0px 0px 5px !important;
    border: none !important;
  }
  .caret {
    font-style: normal;
    font-weight: normal;
    border: 0;
    margin: 0;
    width: auto;
    height: auto;
    text-align: center;
    margin-top: -1px;
  }
  .caret {
    margin-left: 5px;
  }
  .caret:after {
    font-size: 18px;
    font-weight: 800;
  }
  .caret:after {
    content: '\e9c5';
    font-family: 'icomoon';
    display: block;
    font-size: 16px;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .caret{
    display: inline-block;
    vertical-align: middle;
  }
  .menu-t {
    border-top: 2px solid #1990bb !important;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;

    z-index: 1000;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 13px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 3px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
  }
  .dropdown-menu {
    border-width: 2px;
  }
  .dropdown-menu {
    min-width: 180px;
    /* padding: 5px 0; */
    color: #333333;
    /* -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); */
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0);
  }
  .dropdown-menu > li > a {
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 100;
  }
  .dropdown-menu > li > a {
    display: block;
    padding: 3px 20px;
    clear: both;
    /* font-weight: normal; */
    line-height: 1.5384616;
    color: #777777;
    white-space: nowrap;
    outline: 0;
  }
  .dropdown-menu > li > a > i, .dropdown-menu > li > a > img {
    margin-right: 10px;
  }
  .dropdown-menu > li > a {
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 100;
  }
  .dropdown-menu > li > a:hover {
    background: #c8e9e6;
    color: #000 !important;
  }
  .btn-primary .badge {
    color: #2196F3;
    background-color: #fff;
  }
  .badge, .label {
    line-height: 1;
    white-space: nowrap;
    text-align: center;
  }
  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    color: #08a4da;
    border-radius: 10px;
  }
  .badge, .fa-stack {
    vertical-align: middle;
  }
  .badge-sm {
    font-size: 85%;
    padding: 2px 5px!important;
  }
  .badge {
    letter-spacing: 0.1px;
    border: 1px solid transparent;
  }
  .badge-sidebar {
    background: 0 0;
    border: 1px solid #08a4da;
    color: #08a4da !important;
    margin-left: 3px;
    margin-top: -2px;
  }
  .dropdown-menu > li {
    position: relative;
    margin-bottom: 1px;
  }
  .btn-primary:active:hover,
  .btn-primary.active:hover,
  .open > .dropdown-toggle.btn-primary:hover,
  .btn-primary:active:focus,
  .btn-primary.active:focus,
  .open > .dropdown-toggle.btn-primary:focus,
  .btn-primary:active.focus,
  .btn-primary.active.focus,
  .open > .dropdown-toggle.btn-primary.focus {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    border: 1px solid transparent !important;
  }
  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {
    background-color: transparent;
    border-color: transparent;
    color: #333333;
  }
  .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    border: 1px solid transparent !important;
  }
  .nav > li > a:hover, .nav > li > a:focus {
    text-decoration: none;
    background-color: #fff;
    color: #777 !important;
  }
  .sidebar-help-button {
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    background: #1a3d5d;
    display: inline-block;
    font-size: 13px;
    color: #fff !important;
    font-weight: 700;
    box-shadow: 0 5px 6px rgba(0,0,0,.05);
    position: relative;
    padding: 0 28px;
    margin-left: 35px;
    text-align: right;
    transition: all .3s;
    -webkit-transition: all .3s;
    transform: translateY(-55px);
    -webkit-transform: translateY(-55px);
  }


</style>
