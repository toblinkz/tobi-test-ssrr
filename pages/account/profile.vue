<template>
	<div>
		<SettingsTabHeader
			:titleIcon="'icon-profile'"
			:titleText="'Your Account Profile'"
			:body="'Ensure your details are always up to date. This helps us provide a really\n'+
						'\t\t\t\t\tgreat service and target your campaigns effectively.'"
			:tabImage="'/images/profile.gif'"
		/>

		<ApiNavbar />

		<div class="profile-row mt-30">
			<div class="col-md-2">
				<div class="sub_section">
					<div class="media profile-image">
						<div class="media-left">
							<a  class="upload-media-container">
								<img preview-for="image" :src="imageUrl"  class="img-circle" alt="" id="customer_dp">
							</a>
							<input type="file" name="image" class="file-styled previewable hide" @change="uploadPhoto(fieldName, $event.target.files)">
						</div>
						<div class="media-body text-center">
							<h5 class="media-heading text-semibold">Upload your photo…</h5>
						 <p style="margin: 0; padding: 0; font-size: 14px;">Photo should be at least 300px by 300px</p>
							<a v-if="canUpdateProfile" @click="removeImage" class="btn btn-xs bg-grey-800 mt-10"><i class="icon-trash"></i> Remove</a>
							<a v-if="canUpdateProfile" onclick="$('input[name=image]').trigger('click')"  class="btn btn-xs bg-teal mr-10 mt-10"><i class="icon-upload4"></i>
								{{ uploadButtonText }}</a>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-5">
				<div class="form-group control-text" style="display: flex;">
					<div>
						<label>First Name</label>
						<input
							v-model="firstName"
							type="text"
							name="firstName"
							class="profile-form-control required  "
							style="width: 95%"
						>
					</div>
					<div>
						<label>Last Name</label>
						<input
							v-model="lastName"
							type="text"
							name="lastName"
							class="profile-form-control required  "
							style="width: 95%"
						>
					</div>
				</div>
				<label>Sector</label>
				<CustomSelect style="width: 95%" :options="sectors" :dropdown-style="dropdownStyle" @item-selected="setSectorId($event)"></CustomSelect>
			</div>
			<div class="col-md-5">
				<label>Email Address</label>
				<div class="control-text form-group" >
					<input
						v-model="email"
						type="text"
						name="email"
						class="profile-form-control required email  "
						style="width: 95%"
					>
				</div>
				<label>Phone Number</label>
				<div class="form-group control-text">
					<input
						v-model="phoneNumber"
						type="text"
						name="phoneNumber"
						class="profile-form-control required numeric  "
						style="width: 95%"
					>
				</div>
				<hr />
				<button v-if="canUpdateProfile" class="btn bg-teal pull-right" @click="showPasswordModal"><i class="icon-check"></i> Save</button>
			</div>
		</div>

		<VerificationModal />
		<UpdateCompanyNameModal />
		<AccountPassword
			:company-sector="selectedSector"
			:email="email"
			:first-name="firstName"
			:last-name="lastName"
			:phone-number="phoneNumber"
			:image-url="imageUrl"
			:event-name="'profile'"
		/>
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
				import AccountPassword from "../../components/modals/AccountPassword";
				import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";
				import SettingsTabHeader from "@/components/settings/SettingsTabHeader";

    export default {
        name: "profile",
					middleware: ['auth', 'inactive_user',  'permission'],
        components: {
									SettingsTabHeader,
									UpdateCompanyNameModal,
									AccountPassword,
									VerificationModal, SearchDropdown, CustomSelect,  ApiNavbar, DashboardNavbar, Sidebar,},

        data(){
          return{
            firstName:'',
            lastName:  '',
            email:  '',
            phoneNumber:  '',
											 hasPasswordError: false,
												password: '',
											 uploadButtonText:'Upload',
											 errorMessage:[],
										 	customerPermissions: localStorage.getItem('permissions'),
											 sectors : [],
            selectedCountry: '',
            selectedSector: '',
												userImage: '',
            imageUrl: '',
            dropdownStyle: {
              borderRadius: '5px',
            },
            isToggled: false,
            type: "password",
										 	file:''

          }
      },
					watch:{

       password(value){
       	this.validatePassword(value)
							}

					},
					computed:{

						canUpdateProfile(){
							return true;
						}

					},

      methods:{

        showPassword(){
          if (this.type === "password"){
            this.type = 'text';
            this.isToggled = true;
          }
          else {
            this.type = "password";
            this.isToggled = false;
          }
        },

        async fetchUtilityData(){

          let sector_data =await this.$axios.$get('/utility/sectors');
          this.sectors = sector_data.data;

        },

        setSectorId(event){
          this.sectors_id = event;
        },

							removeImage(){
								$("#customer_dp").attr('src', '')
							},
							validatePassword(value){
								if (value.length < 6) {
									this.errorMessage['password'] = 'The password field must be at least 5 characters';
									this.hasPasswordError = true;
								}else {
									this.errorMessage['password'] = '';
									this.hasPasswordError = false;
								}
							},

							validateImage(file){

        	let y = file.type.split('/').pop().toLowerCase();

        	return y === "jpeg" || y === "png";

							},

							showPasswordModal(){

								this.$modal.show('account-password-modal');

							},

       async uploadPhoto(fieldName, files){
									this.uploadButtonText = 'Uploading...'
									try {
										 this.file = files[0];
										 const file_type = this.file.name.split('.').pop().toLowerCase();
										if (this.validateImage(this.file)){
											let src = URL.createObjectURL(this.file);
											let preview = document.getElementById('customer_dp');
											preview.src = src;
											const uploadS3Url = await this.$uploadFileTos3.uploadFileToS3(this.file, file_type).catch((e)=> {this.$toast.error(e)});
											this.imageUrl = uploadS3Url.data;
											this.$toast.success('Uploaded successfully');
											this.uploadButtonText = 'Upload';
										}else {
											this.uploadButtonText = 'Upload';
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
								 this.firstName = JSON.parse(localStorage.getItem('user_data')).fname;
									this.lastName = JSON.parse(localStorage.getItem('user_data')).lname;
									this.email = JSON.parse(localStorage.getItem('user_data')).email;
							  this.selectedCountry = JSON.parse(localStorage.getItem('user_data')).country;
									this.selectedSector = JSON.parse(localStorage.getItem('user_data')).company_sector.id;
									this.imageUrl = JSON.parse(localStorage.getItem('user_data')).image;
									this.phoneNumber =  JSON.parse(localStorage.getItem('user_data')).phone;
								 this.sectors = [JSON.parse(localStorage.getItem('user_data')).company_sector.name];
								this.fetchUtilityData();
							}

      }
    }
</script>

<style >


  .page-header:not(.page-header-filled) + .profile-page-container {
    padding-top: 35px;
  }


  .profile-row {
			width: 1000px;
			margin: 0 auto;
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
