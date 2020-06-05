<template>
  <div class="">
    <div class="login-wrapper">
      <!-- START Login Background Pic Wrapper-->
      <div class="bg-pic">
        <!-- START Background Pic-->

        <div>
          <img alt="Image" style="width: 45%;margin-top: -25px;margin-bottom: -85px;margin-left: 10px;" src="/images/products/ds.svg">
        </div>
        <!-- END Background Pic-->
      </div>
      <!-- END Login Background Pic Wrapper-->
      <!-- START Login Right Container-->
      <div class="login-container bg-white">
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
          <a href="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></a>

          <p class="p-t-35">Welcome to Termii! Join <strong class="text-bold   text-center">{{registered_business}}+</strong> businesses across Africa building awesome products with our communication APIs, create an account now!</p>
          <!-- register Form -->
          <form class="" role="form" method="post" action="/register">
            <input type="hidden" name="_token" value="b14kE8eN0PShnff6h5qfGK01KTJFPSYBJaIERQ6t">

            <div class="mt-20">
              <div class="row ">
                <div class="col-md-6">
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="first_name"  style="width: 100%" type="text" class="form-control" value="" required name="first_name" placeholder="First Name">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="email"  style="width: 100%" type="text" class="form-control" value="" required name="email" placeholder="Email">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="password"  style="width: 100%" type="password" class="form-control"  required name="password" placeholder="Password">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <select v-model="selected_country" class="form-control" name="country" id="country" required>
                      <option value="">Select your country</option>
                      <option v-for="(country, countryIndex) in countries" :key="country.id" :value="country.id">{{country.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="last_name"  style="width: 100%" type="text" class="form-control" value="" required name="last_name" placeholder="Last Name">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="phone_number"  style="width: 100%" type="text" class="form-control" value="" required name="phone_number" placeholder="Phone Number">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="email"  style="width: 100%" type="password" class="form-control" required name="password_confirmation" placeholder="Confirm Password">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <select v-model="selected_sector"class="form-control" name="sector" id="sector" required>
                      <option value="" >Select your company's sector</option>
                      <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{sector.name}}</option>

                    </select>
                  </div>
                </div>


              </div>

            </div>
            <div class="form-group login-options hidden">
              <div class="row">
                <div class="col-sm-6">
                  <label class="checkbox-inline">
                    <input type="checkbox" class="styled" checked="checked" name="remember">
                    STAY LOGGED IN
                  </label>
                </div>
              </div>
            </div>
            <div class="recaptcha-box">
              <script src='https://www.google.com/recaptcha/api.js'></script>
              <div class="g-recaptcha" data-sitekey="6LeyfRcUAAAAAMmAwfD1lOaPhLXyzH_QNClcwZ1n"></div>
            </div>

            <button type="submit" class="btnl bg-blue m-t-10 ">Create My Account</button>
          </form>
          <div class="mb-20">
            <br class="mt-10">
            <span class="hidden-xs">By clicking the “Create My Account” button, you agree to Termii’s <a href="/terms" class="text-info">terms of acceptable use</a> and <a href="/privacy" class="text-info"> privacy policies</a></span>
          </div>
          <!-- /register form -->
        </div>

      </div>

    </div>

  </div>

</template>


<script>
    export default {
        name: "register",
      data(){
          return{
            registered_business:"",
            selected_country: '',
            selected_sector: '',
            countries: [],
            sectors:[]
          }
      },
      async fetch(){
          //fetch country data
          let countries_data = await this.$axios.$get('http://sandbox.termii.com/v1/utility/countries');
            this.countries = countries_data.data;
        console.log(this.countries)
        //fetch sector data
        let sector_data =await this.$axios.$get('http://sandbox.termii.com/v1/utility/sectors');
          this.sectors = sector_data.data;
        //fetch no of registered business
        let registered_business_data = await this.$axios.$get('http://sandbox.termii.com/v1/utility/total/registered-businesses',);
        this.registered_business = registered_business_data.data
      }
    }
</script>

<style>
  @import "assets/css/general_style/pages.css";
  body {
    color: #626262;
    font-family: "Karla",sans-serif;
    font-size: 15px;
    font-weight: normal;
    letter-spacing: 0.01em;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-font-feature-settings: "kern" 1;
    -moz-font-feature-settings: "kern" 1;
  }
  @media (max-width: 1400px){
    body, p {
      font-size: 13px;
      line-height: 20px;
    }
  }
  .bg-white {
    background-color: #fff;
    color: #333333;
  }
  .bg-blue {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    display: inline-block !important;
    color: #fff !important;
    border-radius: 4px;
    vertical-align: bottom !important;
    position: relative;
    border: transparent;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    transition: .35s;
    padding-top: 7px !important;
    padding-bottom: 8px !important;
    padding-left: 26px !important;
    padding-right: 15px !important;
    font-weight: 600 !important;
    font-size: 13px !important;
  }
  .text-info, .text-info:hover, .text-info:focus {
    color: #00BCD4 !important;
  }
  .btnl {
    cursor: pointer;
    transition: color 0.1s linear 0s, background-color 0.1s linear 0s, opacity 0.2s linear 0s !important;

  }
  .btnl:hover {
    background-color: #fafafa;
    border: 1px solid rgba(98, 98, 98, 0.27);
  }
  .has-feedback-left .form-control {
    padding-right: 12px;
    padding-left: 36px;
  }
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .form-control {
    display: block;
    width: 100%;
  }


</style>
