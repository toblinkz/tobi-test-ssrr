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
                <div class="select-class">
                  <div class="row-form has-feedback has-feedback-left mt-20">
                    <input id="first_name"   type="text" class="form-control" :class="{'error ' : hasFirstNameError,'has-input' : hasFirstNameInput}" v-model="first_name"   placeholder="First Name">
                    <span class="input-field_helper">First Name</span>
                    <span class="error_field_message" v-if="error_message.first_name">{{error_message.first_name}}</span>
                  </div>
                  <div class="row-form has-feedback has-feedback-left mt-20">
                    <input id="last_name"   type="text" class="form-control" :class="{'error ' : hasLastNameError, 'has-input' : hasLastNameInput}" v-model="last_name"   placeholder="Last Name">
                    <span class="input-field_helper">Last Name</span>
                    <span class=" error_field_message" v-if="error_message.last_name">{{error_message.last_name}}</span>
                  </div>
                </div>

                  <div class="register-form-group has-feedback has-feedback-left ">
                    <input id="email"   type="email" class="form-control round-form-input"  :class="{'error ' : hasEmailError, 'has-input' : hasEmailInput}" v-model="email" placeholder="Work Email">
                    <span class="input-field_helper">Work Email</span>
                    <span class=" error_field_message" v-if="error_message.email">{{error_message.email}}</span>
                  </div>
                  <div class="register-form-group has-feedback has-feedback-left mt-20">
                    <input id="password"   :type="type" class="form-control " :class="{'error ' : hasPasswordError, 'has-input' : hasPasswordInput}" v-model="password" placeholder="Password" maxlength="24">
                    <span class="input-field_helper">Password</span>
                    <span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
                    <i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showPassword"></i>

                  </div>
                <div class="select-class">
                  <div class="row-form has-feedback has-feedback-left ">
                    <select v-model="selected_country" class="form-control " name="country" id="country">
                      <option value="">Select your country</option>
                     <!-- <option v-for="(country, countryIndex) in countries" :key="country.id" :value="country.id">{{country.name}}</option>-->
                      <option>Nigeria</option>
                      <option>Ghana</option>
                    </select>
                  </div>
                  <div class="row-form has-feedback has-feedback-left" >
                    <select v-model="selected_sector" class="form-control " name="sector" id="sector" >
                      <option value="" > Your company's sector</option>
                     <!-- <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{sector.name}}</option>-->
                      <option>Health</option>
                      <option>Education</option>
                    </select>
                  </div>
                </div>
                    <div class="register-form-group has-feedback has-feedback-left ">
                      <input id="phone_number"  type="tel" class="form-control " :class="{'error ' : hasPhoneNumberError, 'has-input' : hasPhoneNumberInput}" v-model="phone_number"  name="phone_number" placeholder="Phone Number">
                      <span class="input-field_helper">Phone Number</span>
                      <span class=" error_field_message" v-if="error_message.phone_number">{{error_message.phone_number}}</span>
                    </div>
                 <nuxt-link to="/verify"><button class="btnl btn-blue m-t-10" :disabled="isDisabled">Create My Account</button> </nuxt-link>
                <nuxt-link  to="/login" class="pull-right mt-20 m-r-10" style="color: black">Got an account? <span class="text-info2 bold">Log In</span></nuxt-link>
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
            first_name: "",
            last_name:"",
            phone_number: "",
            error_message:[],
            hasEmailError: false,
            hasPasswordError: false,
            hasFirstNameError: false,
            hasLastNameError: false,
            hasPhoneNumberError: false,
            hasFirstNameInput: false,
            hasLastNameInput: false,
            hasEmailInput: false,
            hasPasswordInput: false,
            hasPhoneNumberInput:false,
            isToggled: false,
            type: "password"
          }
      },
      computed: {
        isDisabled: function () {
          return (this.email === '' || this.password === '' || this.hasEmailError || this.hasPasswordError
                      || this.first_name === '' || this.hasFirstNameError || this.selected_country === ''
                    || this.selected_sector === ''  || this.hasPhoneNumberError || this.phone_number === '' || this.last_name === ''|| this.hasLastNameError);
        },
      },
      watch: {
        email(value) {
          this.email = value;
          this.hasEmailInput = true;
          this.validateEmail(value);
        },
        password(value){
          this.password = value;
          this.hasPasswordInput = true;
          this.validatePassword(value);
        },

        phone_number(value){
          this.phone_number = value;
          this.hasPhoneNumberInput = true;
          this.validatePhoneNumber(value);
        },
        first_name(value) {
          this.first_name = value;
          this.hasFirstNameInput = true;
          this.validateFirstName(value);
        },
        last_name(value) {
          this.last_name = value;
          this.hasLastNameInput = true;
          this.validateLastName(value);
        }
      },
      methods: {
        validateEmail(value){
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            this.error_message['email'] = '';
            this.hasEmailError = false;
            return true;
          }else {
            this.error_message['email'] = 'The email field must be a valid email';
            this.hasEmailError = true;
            return false;
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
        validateFirstName(value){
          if ( value === ""){
            this.error_message['first_name'] = 'The first name field is required';
            this.hasFirstNameError = true;
          }else {
            this.error_message['first_name'] = '';
            this.hasFirstNameError = false;
          }
        },
        validateLastName(value){
          if ( value === ""){
            this.error_message['last_name'] = 'The Last name field is required';
            this.hasLastNameError = true;
          }else {
            this.error_message['last_name'] = '';
            this.hasLastNameError = false;
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
          let countries_data = await this.$axios.$get('/utility/countries');
            this.countries = countries_data.data;
        //fetch sector data
        let sector_data =await this.$axios.$get('/utility/sectors');
          this.sectors = sector_data.data;
        //fetch no of registered business
        let registered_business_data = await this.$axios.$get('/utility/total/registered-businesses',);
        this.registered_business = registered_business_data.data
      }
    }
</script>

<style scoped>
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
    max-width: 98%;
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
  .btn-blue {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    display: inline-block !important;
    color: #fff !important;
    border-radius: 4px;
    vertical-align: bottom !important;
    position: relative;
    border: transparent;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    transition: .35s;
    padding: 7px 15px 8px 15px !important;
    font-weight: 600 !important;
    font-size: 13px !important;
  }


</style>
