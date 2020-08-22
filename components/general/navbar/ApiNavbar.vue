<template>
  <div class="row">
    <div class="col-md-12">
      <ul class="nav nav-tabs mt-5 nav-tabs-top page-second-nav">
        <li rel0="AccountController/profile">
          <nuxt-link to="/account/profile" class="level-1  " >
            <i class="icon-user position-left"></i> My profile
          </nuxt-link>
        </li>
        <li rel0="AccountController/api">
          <nuxt-link to="/account/api" class="level-1  ">
            <i class="icon-key position-left"></i> API token
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account/webhook/config" class="level-1  ">
            <i class="entypo-tools position-left"></i> Webhook Config
          </nuxt-link>
        </li>
        <li rel0="AccountController/api">
          <nuxt-link to="/account/deactivate" class="level-1 " exact>
            <i class="entypo-logout position-left"></i> Deactivate Account
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ApiNavbar",

    }
</script>

<style scoped>
  .nuxt-link-exact-active{
    color: #ffffff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
  }
  .nuxt-link-active{
    color: #ffffff !important;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
  }
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  .nav-tabs {
    border-bottom: 1px dashed #26A69A;
    /* margin-top: -55px; */
  }

  .page-second-nav {
    margin: 0 0 20px 0;
  }
  @media (min-width: 769px){
    .nav-tabs {
      font-size: 0;
    }
  }
  .nav {
    /* margin-bottom: 0; */
    padding-left: 0;
    list-style: none;
  }
  @media (min-width: 769px){
    .nav-tabs.nav-tabs-top > li {
      margin-bottom: 0;
    }
  }
  .nav-tabs > li {
    margin-right: 5px;
    font-size: 14px;
  }
  @media (min-width: 769px){
    .nav-tabs > li {
      display: inline-block;
      /* font-size: 13px; */
    }
  }
  .nav > li {
    position: relative;
  }
  @media (min-width: 769px){
    .nav-tabs.nav-tabs-top > li > a {
      /**color: #777;**/
    }
  }
  @media (min-width: 769px){
    .nav-tabs.nav-tabs-top > li > a, .nav-tabs.nav-tabs-top > li > a:hover, .nav-tabs.nav-tabs-top > li > a:focus {
      border-width: 0 0 4px 0;
      margin-bottom: -1px;
      cursor: pointer;
      border-radius: 5px;
      color: #777;
    }
  }
  .nav-tabs > li > a {
    color: #333;
    padding: 7px 8px !important;
  }
  .page-second-nav li a.level-1 {
    font-weight: 600;
    font-size: 15px;
  }
  .nav-tabs > li > a {
    margin-right: 0;
    border-radius: 0;
    line-height: 1.5384616;
    border: 1px solid transparent;
    padding: 7px 8px !important;
  }



  .nav > li > a {
    position: relative;
    display: block;
  }
  .position-left {
    margin-right: 7px;
  }
  @media (min-width: 769px){
    .nav-tabs.nav-tabs-top > li > a:hover {
      border-bottom-color: #365899;
    }
  }


</style>
