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
														<p><b>Added Emails</b></p>
														<div v-for="row in emails">
															<email-card :email="row"></email-card>
														</div>
																<div class="mt-20">
																			<a @click="showInputField">Click here to add a new email</a>
																			<div class="mt-10" v-show="show_input_field">
																				<input  class="email-form-control mb-20"  placeholder="Email" >
																				<a class="btn btn-primary">ADD</a>
																			</div>
																</div>
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
				<AddNewEmail></AddNewEmail>
			</div>
		</div>
	</div>
</template>

<script>
import Sidebar from "@/components/general/Sidebar";
import DashboardNavbar from "@/components/general/navbar/DashboardNavbar";
import VerificationModal from "@/components/modals/VerificationModal";
import ApiNavbar from "@/components/general/navbar/ApiNavbar";
import EmailCard from "@/components/general/EmailCard";
import AddNewEmail from "@/components/modals/AddNewEmailModal";
export default {
	name: "notification",
	middleware: ['auth', 'inactive_user'],
	components: {AddNewEmail, EmailCard, ApiNavbar, VerificationModal, DashboardNavbar, Sidebar},
	data(){
		return{

			emails: ["forteune@gmail.com", "love@gmail.com", "greace@gmail.com", "mercy@gmail.com"],
			old_password:'',
			new_password:'',
			show_input_field: false,
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
		showInputField(){
			this.$modal.show('add-new-email');
		},
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

.email-form-control {
	display: block;
	width: 100%;
	border: 1px solid rgba(204, 204, 204, 0.34);
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
.email-form-control:focus {
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
