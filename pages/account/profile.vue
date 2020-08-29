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
          <div class="profile-page-container">
            <!-- Page content -->
            <div class="profile-page-content">
              <div class="profile-content-wrapper">
                <!-- START JUMBOTRON -->
                <div class="jumbotron" data-pages="parallax">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <div class="profile-row mt-70">
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
                    <div class="profile-page-container">
                      <!-- Page content -->
                      <div class="profile-page-content">
                        <!-- main inner content -->
                        <main id="wrapper" class="wrapper">
                          <ApiNavbar></ApiNavbar>
                          <form @submit.prevent="updateProfile" method="POST" >
                            <div class="profile-row">
                              <div class="col-md-2">
                                <div class="sub_section">
                                  <div class="media profile-image">
                                    <div class="media-left">
                                      <nuxt-link to="#" class="upload-media-container">
                                        <img preview-for="image"  src="/images/team/10.png" class="img-circle" alt="">
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
                                      <a href="#upload" onclick="$('input[name=image]').trigger('click')"  class="btn btn-xs bg-teal mr-10"><i class="icon-upload4"></i> Upload</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-5">
                                <label>First Name</label>
                                <div class="form-group control-text">
                                  <input
                                    v-model="first_name"
                                    type="text"
                                    name="first_name"
                                    class="form-control"
                                  >
                                </div>
                                <label>Phone Number</label>
                                <div class="form-group control-text">
                                  <input
                                    v-model="phone_number"
                                    type="text"
                                    name="phone_number"
                                    class="form-control required numeric  "
                                  >
                                </div>
                                <label>Sector</label>
                                   <CustomSelect :options="sectors" :dropdown-style="dropdownStyle" @item-selected="setSectorId($event)"></CustomSelect>
                                <label class="mt-20">Select Country</label>
                                <SearchDropdown :options="countries" @item-selected="selected_country = $event"></SearchDropdown>
                              </div>
                              <div class="col-md-5">
                                <label>Last Name</label>
                                <div class="form-group control-text">
                                  <input
                                    v-model="last_name"
                                    type="text"
                                    name="last_name"
                                    class="form-control required  "
                                  >
                                </div>
                                <label>Email Address</label>
                                <div class="form-group control-text">
                                  <input
                                    v-model="email"
                                    type="text"
                                    name="email"
                                    class="form-control required email  "
                                  >
                                </div>
                                <label>Password</label>
                                <div class="form-group control-password">
                                  <input :type="type" id="password"  name="password" class="form-control ">
                                  <i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showPassword"></i>
                                </div>
                                <label>State</label>
                                <div class="form-group ">
                                  <input
                                     placeholder=""
                                    value="Lagos"
                                    type="text"
                                    name="state"
                                    class="form-control required  "
                                  >
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
    import CustomSelect from "../../components/general/dropdown/CustomSelect";
    import SearchDropdown from "../../components/general/dropdown/SearchDropdown";
    import {mapGetters} from "vuex";
    import Swal from 'sweetalert2';

    export default {
        name: "profile",
      components: {SearchDropdown, CustomSelect,  ApiNavbar, DashboardNavbar, Sidebar,},
      middleware: 'auth',
      data(){
          return{
            first_name: this.$auth.user.fname,
            last_name:  this.$auth.user.lname,
            email:  this.$auth.user.email,
            phone_number:  this.$auth.user.phone,
            state: this.$auth.user.state,
            countries:[this.$auth.user.country,],
            sectors:[this.$auth.user.company_sector.name],
            selected_country: this.$auth.user.country.toString(),
            selected_sector: this.$auth.user.company_sector.id.toString(),
            image: '',
            dropdownStyle: {
              borderRadius: '5px',
            },
            isToggled: false,
            type: "password"

          }
      },
      computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser'])
      },
      methods:{
        showPassword(){
          if (this.type === "password") {
            this.type = 'text';
            this.isToggled = true;
          }
          else {
            this.type = "password";
            this.isToggled = false;
          }
        },
        async fetchUtilityData(){
          let countries_data = await this.$axios.$get('/utility/countries');
          for (let i = 0; i < countries_data.data.length; i++){
            this.countries.push(countries_data.data[i].name)
          }

          //fetch sector data
          let sector_data =await this.$axios.$get('/utility/sectors');
          this.sectors = sector_data.data;
        },
        setSectorId(event){
          this.sectors_id = event;
        },
        async updateProfile(){
          try{
            await this.$axios.$patch('user/profile',{
              first_name: this.first_name,
              last_name: this.last_name,
              email: this.email,
              company_sector: this.selected_sector,
              country: this.selected_country,
              state: this.state,
              image: this.image,
              phone: this.phone_number
            });
            Swal.fire({
              icon: 'success',
              text: 'Profile Updated Successfully',
            })
          }catch (e) {

          }

        }
      },
      mounted() {
          this.fetchUtilityData();
      }
    }
</script>

<style >

  @media (min-width: 769px){
    .profile-content-wrapper {
      display: table-cell;
      vertical-align: top;
    }
  }
  @media (min-width: 769px){
    .profile-page-content {
      display: table-row;
    }
  }

  .profile-content-wrapper {
    width: 100%;
  }
  @media screen and (min-width: 769px){
    .container .jumbotron, .container-fluid .jumbotron {
      padding-left: 60px;
      padding-right: 60px;
    }
  }
  @media (min-width: 769px){
    .profile-page-container {
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
  .page-header:not(.page-header-filled) + .profile-page-container {
    padding-top: 35px;
  }
  .profile-page-container {
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

  .profile-row {
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
   .form-group i.password-visibility{
    height: 16px;
    cursor: pointer;
    fill: #0a2e65;
    top: 10px;
    width: 16px;
    opacity: 1;
    position: absolute;
    right: 16px;
  }

</style>
