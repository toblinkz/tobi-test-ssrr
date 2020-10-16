<template>
  <!-- Footer -->
  <div class="footer body">

    <div class="container">

      <div class="row mt-50">
        <div class="col-md-4">
          <div class="panel-flat timeline-content">
            <div class="panel-heading m-tp">

              <nuxt-link no-prefetch to="/">
                <img src="/images/logo.png" alt="logo" data-src="/images/logo.png" data-src-retina="/images/logo.png" width="155px" height="auto">
              </nuxt-link>
              <p class="mt-20 mb-20">Termii helps African businesses use messaging channels to verify and authenticate customers</p>
              <div id="google_translate_element"></div>
              <script type="text/javascript">
                function googleTranslateElementInit() {
                  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
                }
              </script>

              <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
              <br>
              <a class="font-c" href="https://www.facebook.com/termiinetworks/"><i class="entypo-facebook-circled font-bi"></i></a>
              <a class="font-c" href="https://twitter.com/termii_network"><i class="entypo-twitter-circled font-bi"></i></a>
              <a class="font-c" href="https://www.linkedin.com/company/termii-networks/"><i class="entypo-linkedin-circled font-bi"></i></a>
              <br>
            </div>
          </div>
        </div>
        <div class="col-md-2 hidden-xs">

          <h5 class="text-bold">COMPANY</h5>
          <ul class="nav">
            <li>
              <nuxt-link no-prefetch to="/about" class="fi-a">
                About Termii
              </nuxt-link>
            </li>
            <li>
              <nuxt-link no-prefetch to="/investors" class="fi-a">
                Investor Relations
              </nuxt-link>
            </li>
            <li>
              <a class="fi-a" id="CHATID">
                Contact us
              </a>
            </li>
            <li>
              <nuxt-link no-prefetch to="/terms" class="fi-a">
                Terms of service
              </nuxt-link>
            </li>
            <li>
              <nuxt-link no-prefetch to="/privacy" class="fi-a">
                Privacy Policies
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="col-md-3 hidden-xs">
          <h5 class="text-bold"><img class="m-2" src="/images/flags/us.png"> WASHINGTON D.C.</h5>
          <p>601 Pennsylvania Avenue NW South Building Suite 920, Washington D.C. 20004, USA</p>
          <p>1-669-241-1742</p>
          <p>sales@termii.com</p>
        </div>
        <div class="col-md-3 hidden-xs">
          <h5 class="text-bold"><img class="m-2" src="/images/flags/us.png"> SAN JOSE, CA</h5>
          <p>2880 Zanker Road Suite 203<br>San Jose CA 95134</p>
          <h5 class="text-bold"><img class="m-2" src="/images/flags/ng.png"> ONIPANU, LAG</h5>
          <p>150 Ikorodu Road, Onipanu,<br>Lagos, Nigeria</p>
        </div>

      </div>

      <center class="hidden-xs">
        <div class="hrr-5"></div>
      </center>

      <center class="mb-50 hidden-xs"><small>&copy; 2020 Termii is a registered trademark of Termii Inc. With our subsidiaries in Africa,<br>We collaborate with fast growing brands to deliver great customer messaging experience for African businesses.</small>
      </center>
    </div>
  </div>
  <!-- /footer -->

</template>

<script>
    export default {
        name: "TheFooter"
    }
</script>

<style scoped>
  @media (max-width: 1400px){
    body, #msb p {
      font-size: 15px;
      line-height: 20px;
    }
  }

  @media (min-width: 1200px){
    .container {
      width: 1120px;
    }
  }
  @media (min-width: 1025px){
    .col-md-4 {
      width: 33.33333333%;
      float: left;
    }
  }

  .timeline-content {
    margin-bottom: 20px;
  }
  .panel-flat > .panel-heading {
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
  }
  .m-tp {
    padding-top: 15px !important;
  }
  .panel-heading {
    position: relative;
    padding: 15px 20px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  p {
    font-size: 15px;
    margin: 0 0 10px;
  }
  .goog-te-gadget {
    font-family: arial;
    font-size: 11px;
    color: #666;
    white-space: nowrap;
  }
  .font-c {
    color: #000 !important;
  }
  .font-bi {
    font-size: 25px !important;
  }
  a {
    outline: 0;
    color: #3068a4;
    text-decoration: none;
    background-color: transparent;
  }

  @media (min-width: 1025px){
    .col-md-2 {
      width: 16.66666667%;
      float: left;
    }

  }
  .goog-te-gadget-simple {
    background-color: #fff;
    border-left: 1px solid #d5d5d5;
    border-top: 1px solid #9b9b9b;
    border-bottom: 1px solid #e8e8e8;
    border-right: 1px solid #d5d5d5;
    font-size: 10pt;
    display: inline-block;
    padding-top: 1px;
    padding-bottom: 2px;
    cursor: pointer;
    zoom: 1;
    *display: inline;
  }
  .text-bold {
    font-weight: 700;
  }
  .nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
  }
  .hrr-5 {
    border: 0;
    height: 15px;
    margin-bottom: 50px !important;
    position: relative;
    background: radial-gradient(ellipse at bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0) 70%);
    width: 50% !important;
    margin-top: -25px !important;
  }
  .mt-50 {
    margin-top: 50px !important;
  }
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  .col-md-4{
    padding-left: 20px;
    padding-right: 20px;
  }
  .fi-a {
    color: #777 !important;
    padding-left: 0px !important;
  }
  a{
    cursor: pointer;
  }
  .body {
    font-size: 14px;
    line-height: 1.5384616;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Karla",sans-serif;
  }
  .nav > li > a {
    position: relative;
    display: block;
    padding: 7px 15px;
  }
  a:visited {
    text-decoration: none !important;
  }
  ul {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .mb-20 {
    margin-bottom: 20px !important;
    margin-top: 20px !important;
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .row:before{
    content: " ";
    display: table;
  }
  .row:after{
    clear: both;
    content: " ";
    display: table;
  }
  img {
    vertical-align: middle;
  }
  .col-md-2{
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (min-width: 1025px) {
    .col-md-2 {
      float: left;
    }
  }
  .col-md-3 {
    padding-left: 20px;
    padding-right: 20px;
  }
  small {
    font-size: 97%;
  }
  @media (min-width: 1025px){
    .col-md-3 {
      width: 25%;
      float: left;
    }
  }
  h5 {
    font-size: 14px;
  }
  h4, h5, h6 {
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .hrr-5 {
    border: 0;
    height: 15px;
    margin-bottom: 50px !important;
    position: relative;
    background: radial-gradient(ellipse at bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0) 70%);
    width: 50% !important;
    margin-top: -25px !important;
  }
  .mb-50 {
    margin-bottom: 50px !important;
  }
  .goog-te-gadget-simple {
    background-color: #fff;

    font-size: 10pt;
    display: inline-block;
    padding-top: 1px;
    padding-bottom: 2px;
    cursor: pointer;
    zoom: 1;
    *display: inline;
  }

</style>
