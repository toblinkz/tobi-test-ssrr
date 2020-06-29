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
            <div class="mt-20">
              <div class="row ">

                  <div class="register-form-group has-feedback has-feedback-left mt-20">
                    <input id="first_name"   type="text" class="form-control" :class="{'error ' : hasNameError}" v-model="name"   :placeholder="placeholder">
                    <span class="input-field_helper">Name</span>
                    <span class=" input_field_message" v-if="error_message.name">{{error_message.name}}</span>
                  </div>
                  <div class="register-form-group has-feedback has-feedback-left mt-20">
                    <input id="email"   type="email" class="form-control round-form-input"  :class="{'error ' : hasEmailError}" v-model="email" placeholder="Email">
                    <span class="input-field_helper">Email</span>
                    <span class=" input_field_message" v-if="error_message.email">{{error_message.email}}</span>
                  </div>
                  <div class="register-form-group has-feedback has-feedback-left mt-20">
                    <input id="password"   :type="type" class="form-control " :class="{'error ' : hasPasswordError}" v-model="password" placeholder="Password">
                    <span class="input-field_helper">Password</span>
                    <span class=" input_field_message" v-if="error_message.password">{{error_message.password}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" svg-inline="" role="presentation" focusable="false" tabindex="-1" @click="showPassword" class="password-visibility" :class="{'toggled': isToggled}">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                    </svg>
                  </div>
                <div class="select-class">
                  <div class="row-form has-feedback has-feedback-left ">
                    <select v-model="selected_country" class="form-control " name="country" id="country">
                      <option value="">Select your country</option>
                      <option v-for="(country, countryIndex) in countries" :key="country.id" :value="country.id">{{country.name}}</option>
                    </select>
                  </div>
                  <div class="row-form has-feedback has-feedback-left ">
                    <select v-model="selected_sector" class="form-control " name="sector" id="sector" >
                      <option value="" > your company's sector</option>
                      <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{sector.name}}</option>
                    </select>
                  </div>
                </div>
                    <div class="register-form-group has-feedback has-feedback-left ">
                      <input id="phone_number"  type="tel" class="form-control " :class="{'error ' : hasPhoneNumberError}" v-model="phone_number"  name="phone_number" placeholder="Phone Number">
                      <span class="input-field_helper">Phone Number</span>
                      <span class=" input_field_message" v-if="error_message.phone_number">{{error_message.phone_number}}</span>
                    </div>
                <button type="submit" class="btnl bg-blue m-t-10" :disabled="isDisabled">Create My Account</button>
                <nuxt-link  to="/login" class="pull-right mt-20 m-r-40" style="color: black">Got an account? <span class="text-info2 bold">Sign In</span></nuxt-link>
              </div>
            </div>
          </form>
          <div class="mb-20">
            <br class="mt-10">
            <span class="hidden-xs">By clicking the "Create My Account" button, you agree to Termii’s <nuxt-link to="/terms" class="text-info2">terms of acceptable use</nuxt-link> and <nuxt-link to="/privacy" class="text-info2"> privacy policies</nuxt-link></span>
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
            sectors:[],
            email: "",
            password:"",
            name: "",
            placeholder:"First Name                               Last Name",
            phone_number: "",
            error_message:[],
            hasEmailError: false,
            hasPasswordError: false,
            hasNameError: false,
            hasPhoneNumberError: false,
            isToggled: false,
            type: "password"
          }
      },
      computed: {
        isDisabled: function () {
          return (this.email === '' || this.password === '' || this.error_message.email !=='' || this.error_message.password !==''
                      || this.name === '' || this.selected_country === '' || this.selected_sector === ''  || this.error_message.phone_number !=='');
        },
      },
      watch: {
        email(value) {
          this.email = value;
          this.validateEmail(value);
        },
        password(value){
          this.password = value;
          this.validatePassword(value);
        },

        phone_number(value){
          this.phone_number = value;
          this.validatePhoneNumber(value);
        },
        name(value) {
          this.name = value;
          this.validateName(value);
        }
      },
      methods: {
        validateEmail(value){
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            this.error_message['email'] = '';
            this.hasEmailError = false;
          }else {
            this.error_message['email'] = 'The email field must be a valid email';
            this.hasEmailError = true;
          }
        }
        ,
        validatePassword(value) {
          if (value.length < 6) {
            this.error_message['password'] = 'Password field must be at least 5 characters';
            this.hasPasswordError = true;
          }else {
            this.error_message['password'] = '';
            this.hasPasswordError = false;
          }
        },

        validatePhoneNumber(value){
            if ( isNaN(value) || value.length < 10 || value.length > 14) {
              this.error_message['phone_number'] = 'Phone number must be between 10 and 14 digits';
              this.hasPhoneNumberError = true;
            }else {
              this.error_message['phone_number'] = '';
              this.hasPhoneNumberError = false;
            }
        },
        validateName(value){
          if ( value === ""){
            this.error_message['name'] = 'The first name field is required';
            this.hasNameError = true;
          }else {
            this.error_message['name'] = '';
            this.hasNameError = false;
          }
        },
        showPassword(){
          if (this.type === "password") {
            this.type = 'text';
            this.isToggled = true;
          }
          else {
            this.type = "password";
            this.isToggled = false;
          }
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
  @import "assets/css/general_style/authentication_pages.css";

  .page-height{
    height: 125vh;
  }

  @media (max-width: 1400px){
    body, p {
      font-size: 13px;
      line-height: 20px;
    }
  }
  .select-class {
    display: flex;
    flex-direction: row;

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
  .register-form-group {
    margin-bottom: 20px;
    position: relative;
    flex-basis: 100%;
    max-width: 100%;
  }
  .row-form{
    margin-bottom: 20px;
    position: relative;
    padding: 0 1rem 0 0;
    flex-basis: 50%;
    max-width: 50%;
  }
  .form-control {
    display: block;
    width: 100%;
  }


</style>
