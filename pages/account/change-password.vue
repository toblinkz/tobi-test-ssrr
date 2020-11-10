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
						<div >
							<!-- Main content -->
							<div>
								<!-- START JUMBOTRON -->
								<div class="jumbotron" data-pages="parallax">
									<div class="container-fluid container-fixed-lg">
										<div class="inner">
											<div class="row m-t-60">
												<div class="col-md-8">
													<h3> </h3>
													<p><i class="icon-profile"></i> Change Password</p>
													<p class="insight">
														We have given you the power to set security access to your dashboard.<br> Change your Termii password using the form below.</p>
												</div>
												<div class="col-md-4 hidden-xs">
													<img src="/images/api-doc.gif" class="wide">
												</div>
											</div>
											<center>
												<div class="item-height"></div>
											</center>
										</div>
										<!-- Page container -->
										<div class="page-container mt-30">
											<!-- Page content -->
											<div class="page-content">
												<!-- main inner content -->
												<main id="wrapper" class="wrapper">
												<ApiNavbar></ApiNavbar>
													<div class="col-md-6">
														<form method="patch" @submit.prevent="changePassword">
															<div class="form-group mt-20">
																<input v-model="old_password"  :type="old_type" class="password-form-control"  placeholder="Old Password"  :class="{'error' : hasOldPasswordError}">
																<i class="password-visibility" :class="[isOldPasswordToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showOldPassword"></i>
																<span class=" error_field_message" v-if="error_message.old_password">{{error_message.old_password}}</span>
															</div>
															<div class="form-group mt-20">
																<input v-model="new_password"  :type="new_type" class="password-form-control"  placeholder="New Password"  :class="{'error' : hasNewPasswordError}">
																<i class="password-visibility" :class="[isNewPasswordToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showNewPassword"></i>
																<span class=" error_field_message" v-if="error_message.new_password">{{error_message.new_password}}</span>
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
																<input v-model="confirm_password"  :type="confirm_type" class="password-form-control"  placeholder="Confirm Password"  :class="{'error' : hasConfirmPasswordError}">
																<i class="password-visibility" :class="[isConfirmPasswordToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showConfirmPassword"></i>
																<span class=" error_field_message" v-if="error_message.confirm_password">{{error_message.confirm_password}}</span>
															</div>
														<button type="submit" class="btn btn-primary btn-cons mt-20" :disabled="isDisabled">
															<i class="fa fa-certificate" v-show="showIcon"></i>
															{{button_text}}
															<span v-show="isLoading">
																<img src="/images/spinner.svg" height="20px" width="80px"/>
																</span>
														</button>
														</form>
													</div>

												</main>
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
	</div>
</template>

<script>
import Sidebar from "@/components/general/Sidebar";
import DashboardNavbar from "@/components/general/navbar/DashboardNavbar";
import VerificationModal from "@/components/modals/VerificationModal";
import ApiNavbar from "@/components/general/navbar/ApiNavbar";
export default {
 name: "change-password",
	middleware: ['auth', 'inactive_user'],
	components: {ApiNavbar, VerificationModal, DashboardNavbar, Sidebar},
	data(){
			return{
				old_password:'',
				new_password:'',
				confirm_password:'',
				isLoading: false,
				showIcon: false,
				button_text: 'Change',
				isOldPasswordToggled: false,
				isNewPasswordToggled: false,
				isConfirmPasswordToggled: false,
				error_message:[],
				hasOldPasswordError: false,
				hasConfirmPasswordError: false,
				hasNewPasswordError: false,
				old_type: "password",
				new_type: "password",
				confirm_type: "password",


			}
	},
	computed: {
 		isDisabled: function (){
 			return ( !this.new_password || !this.old_password || !this.confirm_password || this.hasOldPasswordError
								|| this.hasNewPasswordError || this.hasConfirmPasswordError)
			}
	},
	watch: {
 	old_password(value){
 		this.validateOldPassword(value);
		},
		new_password(value){
			this.validateNewPassword(value);
		},
		confirm_password(value){
 		this.validateConfirmPassword(value);
		}
	},
	methods:{
		validateOldPassword(value){
			if (value.length < 8) {
				this.error_message['old_password'] = 'The password field must be at least 8 characters';
				this.hasOldPasswordError = true;
			}else {
				this.error_message['old_password'] = '';
				this.hasOldPasswordError = false;
			}
		},
		validateNewPassword(value){
			if ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%^_&*-])(?=.{8,})/.test(value)){
				this.error_message['new_password'] = '';
				this.hasNewPasswordError = false;
			}
			else {
				this.error_message['new_password'] = 'Password is too weak';
				this.hasNewPasswordError = true;
			}
		},
		validateConfirmPassword(value){
			if ( value !== this.new_password){
				this.error_message['confirm_password'] = 'The password confirmation does not match';
				this.hasConfirmPasswordError = true;
			}
			else {
				this.error_message['confirm_password'] = '';
				this.hasConfirmPasswordError = false;
			}
		},
		showOldPassword(){
			this.isOldPasswordToggled = !this.isOldPasswordToggled;
		},
		showNewPassword(){
				this.isNewPasswordToggled = !this.isNewPasswordToggled;
		},
		showConfirmPassword(){
				this.isConfirmPasswordToggled = !this.isConfirmPasswordToggled;
		},
		async changePassword(){
				try{
					this.isLoading = true;
					this.button_text = "";
					await this.$axios.patch('user/change-password', {
						old_password: this.old_password,
						password: this.new_password,
						password_confirmation: this.confirm_password
					});
					this.isLoading = false;
					this.button_text = "Change";
				} catch (e) {
					this.isLoading = false;
					this.button_text = "Change";
					let errors = e.response.data.errors;
					for(let key in errors){
						switch (key) {
									case('old_password'):{
										errors[key].forEach(err => {
											this.error_message['old_password'] = err;
											this.hasOldPasswordError = true;
										});
										break;
									}
							case('password'):{
								errors[key].forEach(err => {
									this.error_message['new_password'] = err;
									this.hasNewPasswordError = true;
								});
								break;
							}
						}
						errors[key].forEach(err => {
							this.$toast.error(err);
							this.hasPasswordError = true
							this.error_message['old_password'] = err;
						});
					}
				}
		}
	}
}
</script>

<style scoped>
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
