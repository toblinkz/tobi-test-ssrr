<template>
  <div class="page-height">
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
        <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
          <nuxt-link to="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></nuxt-link>

          <p class="p-t-35">Welcome to Termii! Join <strong class="text-bold   text-center">{{registered_business}}+</strong> businesses across Africa building awesome products with our communication APIs, create an account now!</p>
          <!-- register Form -->
          <form class="" role="form" method="post" action="/register">
            <input type="hidden" name="_token" value="b14kE8eN0PShnff6h5qfGK01KTJFPSYBJaIERQ6t">

            <div class="mt-20">
              <div class="row ">
                <div class="col-md-6">
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="first_name"   type="text" class="form-control round-form-input" value="" required name="first_name" placeholder="First Name">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="email"   type="text" class="form-control round-form-input" value="" required name="email" placeholder="Email">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="password"   type="password" class="form-control round-form-input"  required name="password" placeholder="Password">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <select v-model="selected_country" class="form-control round-form-input" name="country" id="country" required>
                      <option value="">Select your country</option>
                      <option v-for="(country, countryIndex) in countries" :key="country.id" :value="country.id">{{country.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="last_name"   type="text" class="form-control round-form-input" value="" required name="last_name" placeholder="Last Name">
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                  <select v-model="selected_sector"class="form-control round-form-input" name="sector" id="sector" required>
                    <option value="" > your company's sector</option>
                    <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{sector.name}}</option>
                  </select>
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="password"   type="password" class="form-control round-form-input" required name="password_confirmation" placeholder="Confirm Password">
                  </div>
                    <div class="form-group has-feedback has-feedback-left mt-20">
                      <input id="phone_number"   type="text" class="form-control round-form-input" value="" required name="phone_number" placeholder="Phone Number">
                    </div>
                </div>
                <button type="submit" class="btnl bg-blue m-t-10">Create My Account</button>
                <nuxt-link  to="/login" class="pull-right mt-20 m-r-40" style="color: black">Got an account? <span class="text-info bold">Sign In</span></nuxt-link>
              </div>
            </div>
          </form>
          <div class="mb-20">
            <br class="mt-10">
            <span class="hidden-xs">By clicking the “Create My Account” button, you agree to Termii’s <nuxt-link to="/terms" class="text-info">terms of acceptable use</nuxt-link> and <nuxt-link to="/privacy" class="text-info"> privacy policies</nuxt-link></span>
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

  .round-form-input{
    border-radius: 5px;
  }
  @media (max-width: 1400px){
    body, p {
      font-size: 13px;
      line-height: 20px;
    }
  }
  .select-css {
    background: #FFFFFF ;
  }
  .bg-white {
    background-color: #fff;
    color: #333333;
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
    width: 85%;
  }



</style>
