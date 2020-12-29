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
															<h3 > </h3>
															<p><i class="icon-profile"></i> Your Account Profile</p>
															<p class="insight">Ensure your details are always up to date. This helps us provide a really<br> great service and target your campaigns effectively.
															</p>
														</div>
														<div class="col-md-4 hidden-xs">
															<img src="/images/profile.gif"class="wide">
														</div>
													</div>
													<center>
														<div class="item-height"></div>
													</center>
												</div>
												<!-- Page container -->
												<div class="page-container">
													<!-- Page content -->
													<div class="page-content">
														<!-- main inner content -->
														<main id="wrapper" class="wrapper">
															<ApiNavbar></ApiNavbar>
                          <form @submit.prevent="updateProfile" method="POST" >
                            <div class="profile-row">
                              <div class="col-md-2">
                                <div class="sub_section">
                                  <div class="media profile-image">
                                    <div class="media-left">
                                      <a  class="upload-media-container">
                                        <img preview-for="image" :src="user_image"  class="img-circle" alt="" id="customer_dp">
                                      </a>
                                      <input type="file" name="image" class="file-styled previewable hide" @change="uploadPhoto(fieldName, $event.target.files)">
                                    </div>
                                    <div class="media-body text-center">
                                      <h5 class="media-heading text-semibold">Upload your photo…</h5>
                                      Photo should be at least 300px x 300px
                                      <br /><br />
                                      <a @click="removeImage" class="btn btn-xs bg-grey-800 "><i class="icon-trash"></i> Remove</a>
                                      <br />
                                      <br />
                                      <a  onclick="$('input[name=image]').trigger('click')"  class="btn btn-xs bg-teal mr-10"><i class="icon-upload4"></i>
																																							{{ upload_button_text }}</a>
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
                                    class="profile-form-control required  "
                                  >
                                </div>
                                <label>Phone Number</label>
                                <div class="form-group control-text">
                                  <input
                                    v-model="phone_number"
                                    type="text"
                                    name="phone_number"
                                    class="profile-form-control required numeric  "
                                  >
                                </div>
                                <label>Sector</label>
                                   <CustomSelect :options="sectors" :dropdown-style="dropdownStyle" @item-selected="setSectorId($event)"></CustomSelect>
                              </div>
                              <div class="col-md-5">
                                <label>Last Name</label>
                                <div class="form-group control-text">
                                  <input
                                    v-model="last_name"
                                    type="text"
                                    name="last_name"
                                    class="profile-form-control required  "
                                  >
                                </div>
                                <label>Email Address</label>
                                <div class="form-group control-text">
                                  <input
                                    v-model="email"
                                    type="text"
                                    name="email"
                                    class="profile-form-control required email  "
                                  >
                                </div>
                                <label>Password</label>
                                <div class="form-group control-password">
                                  <input :type="type" v-model="password" name="password" class="profile-form-control " :class="{'error': hasPasswordError}" required>
																			<span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
																			<i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showPassword"></i>
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
					<VerificationModal></VerificationModal>
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
    import S3 from 'aws-s3';
    import Swal from 'sweetalert2';
				import VerificationModal from "~/components/modals/VerificationModal";

    export default {
        name: "profile",
					middleware: ['auth', 'inactive_user'],
        components: {VerificationModal, SearchDropdown, CustomSelect,  ApiNavbar, DashboardNavbar, Sidebar,},

        data(){
          return{
            first_name:'',
            last_name:  '',
            email:  '',
            phone_number:  '',
											 hasPasswordError: false,
												password: '',
											 upload_button_text:'Upload',
											 error_message:[],
											 sectors : [],
            selected_country: '',
            selected_sector: '',
												user_image: '',
            image_url: this.image_url,
            dropdownStyle: {
              borderRadius: '5px',
            },
            isToggled: false,
            type: "password"

          }
      },
					watch:{
       password(value){
       	this.validatePassword(value)
							}
					},
      computed: {
          config(){
            return{
              bucketName: 'termii',
              dirName: 'upload/images',
              region: 'us-west-1',
              accessKeyId: 'AKIAIOJI3WN4QX7QPD7Q',
              secretAccessKey: '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',
            }
          },
        S3Client(){
          return new S3(this.config);
        },
							newFileName(){
          	return `customer_dp_${JSON.parse(localStorage.getItem('user_data')).fname}_${JSON.parse(localStorage.getItem('user_data')).customer.uid}`
							},

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
														password: this.password,
              company_sector: this.selected_sector,
													 image: this.image_url,
              phone: this.phone_number
            });
            await Swal.fire({
              icon: 'success',
              text: 'Profile Updated Successfully',
            })
											let response = 	await this.$axios.$get('user', {
												headers:{'Authorization': `Bearer ${localStorage.getItem('local')}`}
											});
											await localStorage.setItem('user_data', JSON.stringify(response.data));
          }catch (e) {
												let errors = e.response.data.errors;
												for(let key in errors){
													errors[key].forEach(err => {
														this.$toast.error(err);
														this.hasPasswordError = true
														this.error_message['password'] = err;
													});
												}

          }
        },
							removeImage(){
								$("#customer_dp").attr('src', '')
							},
							validatePassword(value){
								if (value.length < 6) {
									this.error_message['password'] = 'The password field must be at least 5 characters';
									this.hasPasswordError = true;
								}else {
									this.error_message['password'] = '';
									this.hasPasswordError = false;
								}
							},
							validateImage(file){
        	let y = file.type.split('/').pop().toLowerCase();
        	if ( y === "jpeg" || y === "png"){
        					return true
									}
        	return false;

							},
        uploadPhoto(fieldName, files){
									this.upload_button_text = 'Uploading...'
									try {
										let file = files[0];
										if (this.validateImage(file)){
											let src = URL.createObjectURL(file);
											let preview = document.getElementById('customer_dp');
											preview.src = src
											this.S3Client
												.uploadFile(file, this.newFileName)
												.then(data => { this.image_url = data.location, this.$toast.success('Uploaded successfully'), this.upload_button_text = 'Upload'})
												.catch(err => {Swal.fire({
													icon: 'error',
													title: 'Oops...',
													text: 'Something went wrong! Please try again.',
												}), this.upload_button_text = 'Upload'});
										}else {
											this.upload_button_text = 'Upload';
											this.$toast.error("Please upload a valid image file(JPEG, PNG)");
										}

									}catch (e){

									}

        },

      },
      beforeMount() {
							if(this.$store.state.view_verify_page === 'true'){
								this.$modal.show('verification-id-modal');
							}else{
								 this.first_name = JSON.parse(localStorage.getItem('user_data')).fname;
									this.last_name = JSON.parse(localStorage.getItem('user_data')).lname;
									this.email = JSON.parse(localStorage.getItem('user_data')).email;
							  this.selected_country = JSON.parse(localStorage.getItem('user_data')).country;
									this.selected_sector = JSON.parse(localStorage.getItem('user_data')).company_sector.id;
									this.user_image = JSON.parse(localStorage.getItem('user_data')).image;
									this.phone_number =  JSON.parse(localStorage.getItem('user_data')).phone;
								 this.sectors = [JSON.parse(localStorage.getItem('user_data')).company_sector.name];
								this.fetchUtilityData();
							}

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
  .profile-form-control {
    display: block;
    width: 100%;
    height: 40px;
    padding: 10px 16px;
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
  .profile-form-control:focus {
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
