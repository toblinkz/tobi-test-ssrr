<template>
	<div>
		<SettingsTabHeader
			:titleIcon="'icon-profile'"
			:titleText="'Change Your Password'"
			:body="'We have given you the power to set security access to your dashboard.\n'+
										'Change your Termii password using the form below.'"
			:tabImage="'/images/api-doc.gif'"
		/>

		<ApiNavbar />

		<div class="content-container">
						<form method="patch" @submit.prevent="changePassword">
							<div class="form-group mt-20">
								<input v-model="oldPassword"  :type="oldType" class="password-form-control"  placeholder="Old Password"  :class="{'error' : hasOldPasswordError}">
								<i class="password-visibility" :class="[isOldPasswordToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showOldPassword"></i>
								<span class=" error_field_message" v-if="errorMessage.oldPassword">{{errorMessage.oldPassword}}</span>
							</div>
							<div class="form-group mt-20">
								<input v-model="newPassword"  :type="newType" class="password-form-control"  placeholder="New Password"  :class="{'error' : hasNewPasswordError}">
								<i class="password-visibility" :class="[isNewPasswordToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showNewPassword"></i>
								<span class=" error_field_message" v-if="errorMessage.newPassword">{{errorMessage.newPassword}}</span>
								<div v-show="hasNewPasswordError">
									<p>Password should contain at least:</p>
									<ul>
										<li>One lowercase letter</li>
										<li>One uppercase letter</li>
										<li>One special character</li>
										<li>8 minimum characters</li>
									</ul>
								</div>
							</div>
							<div class="form-group mt-20">
								<input v-model="confirmPassword"  :type="confirmType" class="password-form-control"  placeholder="Confirm Password"  :class="{'error' : hasConfirmPasswordError}">
								<i class="password-visibility" :class="[isConfirmPasswordToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showConfirmPassword"></i>
								<span class=" error_field_message" v-if="errorMessage.confirmPassword">{{errorMessage.confirmPassword}}</span>
							</div>
							<button v-if="canChangePassword" type="submit" class="btn btn-primary btn-cons mt-20" :disabled="isDisabled">
								<i class="fa fa-certificate" v-show="showIcon"></i>
								{{buttonText}}
								<span v-show="isLoading">
																<img src="/images/spinner.svg" height="20px" width="80px"/>
																</span>
							</button>
						</form>
					</div>

		<VerificationModal />
		<UpdateCompanyNameModal />
	</div>
</template>

<script>
import Sidebar from "@/components/general/Sidebar";
import DashboardNavbar from "@/components/general/navbar/DashboardNavbar";
import VerificationModal from "@/components/modals/VerificationModal";
import ApiNavbar from "@/components/general/navbar/ApiNavbar";
import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";
import SettingsTabHeader from "@/components/settings/SettingsTabHeader";
export default {
 name: "change-password",
	middleware: ['auth', 'inactive_user', 'permission'],
	components: {SettingsTabHeader, UpdateCompanyNameModal, ApiNavbar, VerificationModal, DashboardNavbar, Sidebar},
	data(){
			return{
				oldPassword:'',
				newPassword:'',
				confirmPassword:'',
				isLoading: false,
				showIcon: false,
				buttonText: 'Change',
				isOldPasswordToggled: false,
				isNewPasswordToggled: false,
				isConfirmPasswordToggled: false,
				errorMessage:[],
				hasOldPasswordError: false,
				hasConfirmPasswordError: false,
				hasNewPasswordError: false,
				oldType: "password",
				newType: "password",
				confirmType: "password",
				customerPermissions: localStorage.getItem('permissions'),


			}
	},
	computed: {
 		isDisabled: function (){
 			return ( !this.newPassword || !this.oldPassword || !this.confirmPassword || this.hasOldPasswordError
								|| this.hasNewPasswordError || this.hasConfirmPasswordError)
			},
		canChangePassword(){
			return (this.customerPermissions.includes("change_password"));
		},
	},
	watch: {
 	oldPassword(value){
 		this.validateOldPassword(value);
		},
		newPassword(value){
			this.validateNewPassword(value);
		},
		confirmPassword(value){
 		this.validateConfirmPassword(value);
		}
	},
	methods:{
		validateOldPassword(value){
			if (value.length < 8) {
				this.errorMessage['oldPassword'] = 'The password field must be at least 8 characters';
				this.hasOldPasswordError = true;
			}else {
				this.errorMessage['oldPassword'] = '';
				this.hasOldPasswordError = false;
			}
		},
		validateNewPassword(value){
			if ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%^_&*-])(?=.{8,})/.test(value)){
				this.errorMessage['newPassword'] = '';
				this.hasNewPasswordError = false;
			}
			else {
				this.errorMessage['newPassword'] = 'Password is too weak';
				this.hasNewPasswordError = true;
			}
		},
		validateConfirmPassword(value){
			if ( value !== this.newPassword){
				this.errorMessage['confirmPassword'] = 'The password confirmation does not match';
				this.hasConfirmPasswordError = true;
			}
			else {
				this.errorMessage['confirmPassword'] = '';
				this.hasConfirmPasswordError = false;
			}
		},
		showOldPassword(){
			if (!this.isOldPasswordToggled) {
				this.oldType = 'text'
				this.isOldPasswordToggled = !this.isOldPasswordToggled
			} else {
				this.oldType = 'password'
				this.isOldPasswordToggled = !this.isOldPasswordToggled
			}
		},
		showNewPassword(){
			if (!this.isNewPasswordToggled) {
				this.newType = 'text'
				this.isNewPasswordToggled = !this.isNewPasswordToggled
			} else {
				this.newType = 'password'
				this.isNewPasswordToggled = !this.isNewPasswordToggled
			}
		},
		showConfirmPassword(){
			if (!this.isConfirmPasswordToggled) {
				this.confirmType = 'text'
				this.isConfirmPasswordToggled = !this.isConfirmPasswordToggled
			} else {
				this.confirmType = 'password'
				this.isConfirmPasswordToggled = !this.isConfirmPasswordToggled
			}
		},
		async changePassword(){
				try{
					this.isLoading = true;
					this.buttonText = "";
					await this.$axios.patch('user/change-password', {
						oldPassword: this.oldPassword,
						password: this.newPassword,
						password_confirmation: this.confirmPassword
					});
					this.isLoading = false;
					this.buttonText = "Change";
				} catch (e) {
					this.isLoading = false;
					this.buttonText = "Change";
					let errors = e.response.data.errors;
					for(let key in errors){
						switch (key) {
									case('oldPassword'):{
										errors[key].forEach(err => {
											this.errorMessage['oldPassword'] = err;
											this.hasOldPasswordError = true;
										});
										break;
									}
							case('password'):{
								errors[key].forEach(err => {
									this.errorMessage['newPassword'] = err;
									this.hasNewPasswordError = true;
								});
								break;
							}
						}
						errors[key].forEach(err => {
							this.$toast.error(err);
							this.hasPasswordError = true
							this.errorMessage['oldPassword'] = err;
						});
					}
				}
		}
	}
}
</script>

<style scoped>
.content-container {
	margin: 0 auto;
	padding: 0;
	width: 1000px;
}

.password-form-control {
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
.password-form-control:focus {
	border-color: #4DB6AC;
	box-shadow: none;
	outline: 0;
}
input[type="text"], input[type="password"]{
	-webkit-appearance: none;
	border: 1px solid rgba(0, 0, 0, 0.07);
}

.form-group {
	width: 400px;
}
.form-group i.password-visibility{
	height: 16px;
	cursor: pointer;
	fill: #0a2e65;
	top: 15px;
	width: 16px;
	opacity: 1;
	position: absolute;
	right: 16px;
}
</style>
