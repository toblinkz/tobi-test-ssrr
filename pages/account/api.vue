<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2">
      <Sidebar class="hidden-xs"></Sidebar>
    </div>
    <div class="col-md-10">
      <DashboardNavbar></DashboardNavbar>
      <!-- Page header -->
      <div class="page-header">
        <div class="page-header-content">
          <!-- Page container -->
          <div class="page-container">
            <!-- Page content -->
            <div class="page-content">
              <!-- Main content -->
              <div class="content-wrapper">
                <!-- START JUMBOTRON -->
                <div class="jumbotron" data-pages="parallax">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <div class="row m-t-60">
                        <div class="col-md-8">
                          <h3 class="mb-50"> </h3>
                          <p><i class="icon-profile"></i> Your API Keys</p>
                          <p class="insight">We have given you the power to build awesome apps that can integrate with our system but we only ask that you repay us the favour by keeping your passkeys secure and private.
                          </p>
                        </div>
                        <div class="col-md-4 hidden-xs">
                          <img src="/images/api-doc.gif" class="wide">
                        </div>
                      </div>
                      <center>
                        <div class="hrr-2"></div>
                      </center>
                    </div>
                    <!-- Page container -->
                    <div class="page-container">
                      <!-- Page content -->
                      <div class="page-content">
                        <!-- main inner content -->
                        <main id="wrapper" class="wrapper">
                          <ApiNavbar></ApiNavbar>
                          <!-- START CONTAINER FLUID -->
                          <div class="row">

                            <div class="col-sm-12">
                              <div class="col-md-6">
                                <!-- START PANEL -->
                                <p class="text-semibold"><i class="fa fa-certificate" style="color: #079805 !important;"></i> API Key</p>
                                <p class="alert toke insight wd">
                                  TLV78NkZP0zZEDfeyqkiNdi2VB5MJHZaCJNmpMwo6vomHZeeYjw3oCa17BRugn</p>
                                <!-- END PANEL -->
                              </div>
                              <div class="col-md-12">
                                <div class="col-sm-4">
                                  <br>
                                  <nuxt-link class="btn btn-primary btn-cons" to="#"><i class="fa fa-certificate"></i> Renew API key</nuxt-link>
                                  <!-- END PANEL -->
                                </div>
                              </div>
                            </div>

                          </div>
                        </main>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /page header -->
    </div>
  </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import Main from "../../components/landing_page/MainContent";
    import ApiNavbar from "../../components/general/navbar/ApiNavbar";
    export default {
        name: "api",
      components: {ApiNavbar, Main, DashboardNavbar, Sidebar}
    }
</script>

<style scoped>
  @media (min-width: 769px){
    .content-wrapper {
      display: table-cell;
      vertical-align: top;
    }
  }
  @media (min-width: 769px){
    .page-content {
      display: table-row;
    }
  }
  .page-header-content {
    position: relative;
    background-color: inherit;
    padding: 0 20px;
  }
  .content-wrapper {
    width: 100%;
  }
  @media screen and (min-width: 769px){
    .container .jumbotron, .container-fluid .jumbotron {
      padding-left: 60px;
      padding-right: 60px;
    }
  }
  @media (min-width: 769px){
    .page-container {
      width: 100%;
      display: table;
      table-layout: fixed;
    }
  }

  @media screen and (min-width: 769px){
    .jumbotron {
      padding-top: 48px;
      padding-bottom: 48px;
    }
  }
  .page-header:not(.page-header-filled) + .page-container {
    padding-top: 35px;
  }
  .page-container {
    position: relative;
    /* padding-bottom: 40px; */
  }
  .content-wrapper {
    width: 100%;
  }
  @media (min-width: 769px){
    .content-wrapper {
      display: table-cell;
      vertical-align: top;
    }
  }
  .jumbotron {
    margin-bottom: 10px;
    color: inherit;
    background-color: #fff;
  }
  .jumbotron p {
    margin-bottom: 15px;
    font-weight: 300;
    letter-spacing: normal;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    color: #2c2c2c;
    display: block;
    font-style: normal;
    -webkit-margin-before: 1em;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  .wide {
    width: 200px !important;
  }
  .toke {
    background-color: #f5f5f5;
    border-color: #efefef;
    color: #595959 !important;
  }
  .alert {
    position: relative;
    padding: 15px;
    /* margin-bottom: 20px; */
    border: 1px solid transparent;
  }
  .wd {
    border-radius: 2px;
    word-wrap: break-word;
  }
  #welcome {
    /* margin-bottom: 15px; */
    font-weight: 300;
    letter-spacing: normal;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    color: #2c2c2c;
    display: block;
    font-style: normal;
    /* -webkit-margin-before: 1em; */
  }
  .insight {
    font-size: 13.5px !important;
    letter-spacing: normal !important;
    font-weight: 400 !important;
    line-height: 20px !important;
    margin: 0px 0px 10px 0px;
    font-style: normal;
    white-space: normal;
    color: #333333;
     -webkit-margin-before: 1em;
     -webkit-margin-after: 1em;
     -webkit-margin-start: 0px;
     -webkit-margin-end: 0px;
     display: block;
  }
</style>
