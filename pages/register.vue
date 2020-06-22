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
                <div class="col-md-6">
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="first_name"   type="text" class="form-control round-form-input" v-model="first_name"   placeholder="First Name">
                    <span class="input-field_helper">First Name</span>
                    <span class=" input_field_message" v-if="error_message.first_name">{{error_message.first_name}}</span>
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="email"   type="email" class="form-control round-form-input"  v-model="email" placeholder="Email">
                    <span class="input-field_helper">Email</span>
                    <span class=" input_field_message" v-if="error_message.email">{{error_message.email}}</span>
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="password"   type="password" class="form-control round-form-input" v-model="password" placeholder="Password">
                    <span class="input-field_helper">Password</span>
                    <span class=" input_field_message" v-if="error_message.password">{{error_message.password}}</span>
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <select v-model="selected_country" class="form-control round-form-input" name="country" id="country" required>
                      <option value="">Select your country</option>
                      <option v-for="(country, countryIndex) in countries" :key="country.id" :value="country.id">{{country.name}}</option>
                    </select>
                  </div>
                  <button type="submit" class="btnl bg-blue m-t-10" :disabled="isDisabled">Create My Account</button>
                </div>
                <div class="col-md-6">
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="last_name" type="text" class="form-control round-form-input" v-model="last_name"  name="last_name" placeholder="Last Name">
                    <span class="input-field_helper">Last Name</span>
                    <span class=" input_field_message" v-if="error_message.last_name">{{error_message.last_name}}</span>
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                  <select v-model="selected_sector" class="form-control round-form-input" name="sector" id="sector" required>
                    <option value="" > your company's sector</option>
                    <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{sector.name}}</option>
                  </select>
                  </div>
                  <div class="form-group has-feedback has-feedback-left mt-20">
                    <input id="password" type="password" class="form-control round-form-input" v-model="confirm_password" placeholder="Confirm Password">
                    <span class="input-field_helper">Confirm Password</span>
                    <span class=" input_field_message" v-if="error_message.confirm_password">{{error_message.confirm_password}}</span>
                  </div>
                    <div class="form-group has-feedback has-feedback-left mt-20">
                      <input id="phone_number"  type="tel" class="form-control round-form-input" v-model="phone_number"  name="phone_number" placeholder="Phone Number">
                      <span class="input-field_helper">Phone Number</span>
                      <span class=" input_field_message" v-if="error_message.phone_number">{{error_message.phone_number}}</span>
                    </div>
                </div>
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
            confirm_password: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            error_message:[],
            hasEmailError: false
          }
      },
      computed: {
        isDisabled: function () {
          return (this.email === '' || this.password === '' || this.error_message.email !=='' || this.error_message.password !==''
                      || this.first_name === ''|| this.last_name === ''|| this.confirm_password === '' || this.selected_country === ''
                      || this.selected_sector === '' || this.error_message.confirm_password !=='' || this.error_message.phone_number !=='');
        },
      },
      watch: {
        email(value) {
          this.email = value;
          this.validateEmail(value);
          console.log(this.error_message)
        },
        password(value){
          this.password = value;
          this.validatePassword(value);
          console.log(this.error_message)
        },
        confirm_password(value){
          this.confirm_password = value;
          this.validateConfirmPassword(value);
          console.log(this.error_message)
        },
        phone_number(value){
          this.phone_number = value;
          this.validatePhoneNumber(value);
          console.log(this.error_message)
        },
        first_name(value) {
          this.first_name = value;
          this.validateFirstName(value);
          console.log(this.error_message);
        },
        last_name(value){
          this.last_name = value;
          this.validateLastName(value);
          console.log(this.error_message);
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
        validateConfirmPassword(value){
            if (value !== this.password){
              this.error_message['confirm_password'] = 'Password confirmation does not match';

            } else {

              this.error_message['confirm_password'] = '';
            }
        },
        validatePhoneNumber(value){
            if ( isNaN(value) || value.length < 10 || value.length > 14) {
              this.error_message['phone_number'] = 'Phone number must be between 10 and 14 digits';
            }else {
              this.error_message['phone_number'] = '';
            }
        },
        validateFirstName(value){
          if ( value === ""){
            this.error_message['first_name'] = 'The first name field is required';
          }else {
            this.error_message['first_name'] = '';
          }
        },
        validateLastName(value){
          if (value === ""){
            this.error_message['last_name'] = 'The last name field is required';
          } else {
            this.error_message['last_name'] = '';
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
    width: 100%;
  }


</style>
