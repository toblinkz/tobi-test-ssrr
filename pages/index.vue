<template>
<div>
  <div class="pace  pace-inactive"><div class="pace-progress" data-progress-text="100%" data-progress="99" style="transform: translate3d(100%, 0px, 0px);">
    <div class="pace-progress-inner"></div>
  </div>
    <div class="pace-activity"></div></div>


  <!-- Main navbar -->
  <div class="navbar navbar-verse navbar-fixed-top">
    <div class="navbar-header" style="background: #fff !important;">
      <a href="http://34.220.128.230/dashboard">
        <img class="margin-lx" src="http://34.220.128.230/assets/images/logo.png" alt="logo" data-src="http://34.220.128.230/assets/images/logo.png" data-src-retina="http://34.220.128.230/assets/images/logo.png" width="155px" height="auto">
      </a>

      <ul class="nav navbar-nav pull-right visible-xs-block">
        <li>
          <a class="mobile-menu-button z-in" data-toggle="collapse" data-target="#navbar-mobile">
            <i class="icon-menu7 blue-t"></i>
          </a>
        </li>
      </ul>
    </div>

    <div class="navbar-collapse collapse" id="navbar-mobile">

      <ul class="nav navbar-nav navbar-right z-in">

        <ul class="nav navbar-nav">
          <div class="drops">
            <a class="men">Why Termii?</a>
            <div class="dropdown-content menu-t">
              <a href="http://34.220.128.230/about" class="pad-width">
                About Us
              </a>
              <a href="http://34.220.128.230/usecases" class="pad-width">
                Usecase
              </a>
              <a href="http://34.220.128.230/investors" class="up-top pad-width">
                Milestones
              </a>
            </div>
          </div></ul>

        <ul class="nav navbar-nav">
          <div class="drops">
            <a class="men">Products</a>
            <div class="dropdown-content menu-t">
              <a href="http://34.220.128.230/verify-app" class="pad-width" style="width: 270px;"><small class="blue-t">TOKEN</small><br>OTP Verification</a>
              <a href="http://34.220.128.230/messaging-app" class="pad-width" style="width: 270px;"><small class="blue-t">SWITCH</small><br>Cross-channel Messaging</a>
              <a href="http://34.220.128.230/analytics-app" class="pad-width" style="width: 270px;"><small class="blue-t">INSIGHT</small><br>Customer Status Analytics</a>
              <a href="http://34.220.128.230/guideline" class="up-top pad-width" style="width: 270px;"><small class="blue-t">DEVELOPERS</small><br>Full API Documentation</a>
            </div>
          </div></ul>

        <li>
          <a href="http://34.220.128.230/plans" class="pad-width">
            Pricing
          </a>
        </li>

        <li>
          <a class="pad-width">
            <i class="entypo-phone"></i> 234-9022557951
          </a>
        </li>


        <li>
          <a class="btn btx-login" href="http://34.220.128.230/login">Login
          </a>
        </li>
        <li>
          <a class="btn bt-login btn-icon" href="http://34.220.128.230/register"> Signup<i class="fa fa-angle-double-right ico-r"></i></a>
        </li>
      </ul>
    </div>
  </div>
  <!-- /main navbar -->

</div>
</template>

<script>


export default {
  head: {
    script: [
      { }
    ],
    link: [
      { rel: 'stylesheet',  href: 'http://34.220.128.230/assets/css/bootstrap.css?v=9', type: "text/css" },
      { rel: 'stylesheet',  href: 'http://34.220.128.230/assets/css/core.css?v=11', type: "text/css" },
      { rel: 'stylesheet',  href: 'http://34.220.128.230/css/app.css?v=26', type: "text/css" },
      { rel: 'stylesheet',  href: 'http://34.220.128.230/css/theme.css?v=9', type: "text/css" },
    ]
  }
}
</script>

<style>


.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
