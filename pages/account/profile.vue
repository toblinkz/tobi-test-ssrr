<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2">
      <Sidebar></Sidebar>
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
              <div class="content-wrapper">
                <!-- START JUMBOTRON -->
                <div class="jumbotron" data-pages="parallax">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <div class="row mt-70">
                        <div class="col-md-8">
                          <h3 class="mb-10"> </h3>
                          <p><i class="icon-profile"></i> Your Account Profile</p>
                          <p class="insight">Ensure your details are always up to date. This helps us provide a really great service and target your campaigns effectively.
                          </p>
                        </div>
                        <div class="col-md-4 hidden-xs">
                          <img src="/images/profile.gif" class="wide">
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
                          <form  method="POST" >
                            <div class="row">
                              <div class="col-md-2">
                                <div class="sub_section">
                                  <div class="media profile-image">
                                    <div class="media-left">
                                      <nuxt-link to="#" class="upload-media-container">
                                        <img preview-for="image" empty-src="/images/placeholder.jpg" src="/images/team/10.png" class="img-circle" alt="">
                                      </nuxt-link>
                                      <input type="file" name="image" class="file-styled previewable hide">
                                    </div>
                                    <div class="media-body text-center">
                                      <h5 class="media-heading text-semibold">Upload your photo…</h5>
                                      Photo should be at least 300px x 300px
                                      <br /><br />
                                      <nuxt-link to="#remove" class="btn btn-xs bg-grey-800 "><i class="icon-trash"></i> Remove</nuxt-link>
                                      <br />
                                      <br />
                                      <nuxt-link to="#upload" class="btn btn-xs bg-teal mr-10"><i class="icon-upload4"></i> Upload</nuxt-link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-5">
                                <label>First Name</label>
                                <div class="form-group control-text">
                                  <input
                                    id="first_name" placeholder=""
                                    value="Termii"
                                    type="text"
                                    name="first_name"
                                    class="form-control required  "
                                  >
                                </div>
                                <label>Phone Number</label>
                                <div class="form-group control-text">
                                  <input
                                    id="phone_number" placeholder=""
                                    value="08109477743"
                                    type="text"
                                    name="phone_number"
                                    class="form-control required numeric  "
                                  >
                                </div>
                                <label>Sector</label>
                                   <CustomSelect :options="options" class="tobi"></CustomSelect>
                                <label class="mt-10">Select Country</label>
                                <SearchDropdown :options="countries"></SearchDropdown>
                                <label class="mt-10">State</label>
                                <div class="form-group control-text">
                                  <input
                                    id="state" placeholder=""
                                    value="Lagos"
                                    type="text"
                                    name="state"
                                    class="form-control required  "
                                  >
                                </div>
                              </div>
                              <div class="col-md-5">
                                <label>Last Name</label>
                                <div class="form-group control-text">
                                  <input
                                    id="last_name" placeholder=""
                                    value="Webtech"
                                    type="text"
                                    name="last_name"
                                    class="form-control required  "
                                  >
                                </div>
                                <label>Email Address</label>
                                <div class="form-group control-text">
                                  <input
                                    id="email" placeholder=""
                                    value="tech@termii.com"
                                    type="text"
                                    name="email"
                                    class="form-control required email  "
                                  >
                                </div>
                                <label>Password</label>
                                <div class="form-group control-password">
                                  <input type="password" id="password" value="" autocomplete="new-password"  name="password" class="form-control nullable confirmed min:5">
                                </div>
                                <label>Confirm Password</label>
                                <div class="form-group control-password">
                                  <input type="password" id="password_confirmation" value="" autocomplete="new-password"  name="password_confirmation" class="form-control">
                                </div>
                                <hr />
                                <button class="btn bg-teal pull-right" type="submit"><i class="icon-check"></i> Save</button>
                              </div>
                            </div>
                          </form>
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
    </div>
  </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import ApiNavbar from "../../components/general/navbar/ApiNavbar";
    import Dropdown2 from "../../components/general/dropdown/Dropdown2";
    import CustomSelect from "../../components/general/dropdown/CustomSelect";
    import vSelect from "vue-select";
    import 'vue-select/dist/vue-select.css';
    import SearchDropdown from "../../components/general/dropdown/SearchDropdown";

    export default {
        name: "profile",
      components: {SearchDropdown, CustomSelect,  ApiNavbar, DashboardNavbar, Sidebar, vSelect},
      data(){
          return{
            options: ['Financial Services','Online Retail Services','Education Services', 'Advertising & Marketing Services', 'Logistics & Transportation Services', 'Others', 'Health Services', 'Agriculture Services'],
            countries:['Nigeria', 'Ghana', 'Kenya', 'Uganda','Nigeria', 'Ghana', 'Kenya', 'Uganda',],

          }
      }
    }
</script>

<style >
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-menu {
    color: #000000;
    padding: 3px 20px 20px 20px;
    margin: 2px 0 0;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    user-select: none;
  }
  .style-chooser .vs__vs-dropdown-max-height{

  }
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

  .jumbotron {
    /* padding-top: 30px; */
    /* padding-bottom: 10px; */
    margin-bottom: 10px;
    color: inherit;
    background-color: #fff;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
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
    /* -webkit-margin-before: 1em; */
    /* -webkit-margin-after: 1em; */
    /* -webkit-margin-start: 0px; */
    /* -webkit-margin-end: 0px; */
    /* display: block; */
  }
  .p-15 {
    padding: 15px!important;
  }
  .wide {
    width: 200px !important;
  }
  .sub_section {
    margin-bottom: 20px;
  }
  .media:first-child {
    margin-top: 0;
  }
  .media {
    overflow: visible;
    position: relative;
    zoom: 1;
  }
  .profile-image .media-left {
    display: block;
    margin-bottom: 20px;
    text-align: center;
    padding: 0;
  }
  .media-left{
    position: relative;
    display: table-cell;
    vertical-align: top;
  }
  .upload-media-container {
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    height: 110px;
    width: 110px;
  }
  .profile-image .media-left img {
    width: 110px;
    height: 110px;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid rgba(221, 221, 221, 0.15);
  }
  .tobi .custom-select{
    background-color: #ddd
  }
  h5 {
    font-size: 14px;
  }
  .media-heading {
    margin-bottom: 2px;
    display: block;
  }
  .bg-grey-800 {
    background-color: #444;
    border-color: #444;
    color: #fff;
  }
  .btn-xs {
    padding: 5px 10px;
    line-height: 1.6666667;
  }
  .bg-teal {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    color: #fff !important;
    border: none;
    padding-left: 19px;
    padding-right: 19px;
  }
  label {
    margin-bottom: 6px;
    font-weight: 400;
    display: inline-block;
  }
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  input[type="text"], input[type="password"]{
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  .form-control {
    display: block;
    width: 100%;
    height: 36px;
    padding: 7px 12px;
    font-size: 13px;
    border-radius: 5px;
    font-weight: 500;
    box-shadow: none;
    line-height: 1.5384616;
    color: #333333;
    background-color: #fff;
    background-image: none;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
  }

</style>
