<template>
		<div class="login-page-height">
			<div class="login-wrapper ">
				<!-- START Login Background Pic Wrapper-->
				<div class="bg-pic ">
					<!-- START Background Pic-->

					<div>
						<img alt="Image" style="width: 45%;margin-top: -25px;margin-bottom: -85px;margin-left: 10px;" src="/images/products/ds.svg">
					</div>
				</div>
				<div class="login-container bg-white">
					<div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
						<nuxt-link to="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></nuxt-link>

						<p class="p-t-35 m-l-20">Set account Password</p>
						<form @submit.prevent="assignPassword" method="post">
							<div class="form-panel panel-body ">
								<div class="form-group has-feedback-left">
									<input  style="width: 100%" :type="password_type" class="form-control" v-model="password" :class="{'error ' : hasPasswordError, 'has-input' : hasPasswordInput}" placeholder="Password">
									<span class="input-field_helper">Password</span>
									<span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
									<i class="password-visibility" :class="[isPasswordToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  @click="showPassword"></i>
									<div v-show="hasPasswordError">
										<p>Password should contain at least:</p>
										<ul>
											<li>One lowercase letter</li>
											<li>One uppercase letter</li>
											<li>One special character </li>
											<li>8 minimum characters</li>
										</ul>
									</div>
								</div>
								<div class="form-group has-feedback-left">
									<input  style="width: 100%" :type="confirm_password_type" class="form-control" v-model="confirm_password" :class="{'error ' : hasConfirmPasswordError, 'has-input' : hasConfirmPasswordInput}" placeholder="Confirm Password">
									<span class="input-field_helper">Confirm Password</span>
									<span class=" error_field_message" v-if="error_message.confirm_password">{{error_message.confirm_password}}</span>
									<i class="password-visibility" :class="[isConfirmPasswordToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"   @click="showConfirmPassword"></i>
								</div>
								<button type="submit" class="btnl bg-blue m-t-25" :disabled="isDisabled">
									{{button_text}}
									<span v-show="isLoading">
                  <img src="/images/spinner.svg" height="20px" width="80px"/>
                </span>
								</button>
							</div>
							<div >
								<p class="m-l-20">Return back to <nuxt-link to="/login" class="text-info">login</nuxt-link></p>
							</div>
						</form>

					</div>
					<!-- END Login Right Container-->
				</div>
			</div>

		</div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
	name: "_id",
	data(){
		return{
			password: "",
			confirm_password:'',
			password_type: 'password',
			confirm_password_type: 'password',
			error_message:[],
			hasPasswordError: false,
			hasPasswordInput: false,
			hasConfirmPasswordError: false,
			hasConfirmPasswordInput: false,
			button_text: 'Save',
			isLoading: false,
			isPasswordToggled: false,
			isConfirmPasswordToggled:false
		}
	},
	computed: {
		isDisabled: function () {
			return( this.password === ''  || this.hasPasswordError || this.hasConfirmPasswordError || this.confirm_password === '');
		}
	},
	watch: {
		password(value) {
			this.hasPasswordInput = true;
			this.validatePassword(value);
			this.validateConfirmPassword(value);
		},
		confirm_password(value){
			this.hasConfirmPasswordInput = true;
			this.validateConfirmPassword(value);
		}
	},

	methods: {
		async verifyUserPasswordToken(){
			let verifyToken = await this.$axios.$get('auth/provision/user/password/verify/'+ this.$route.params.id);
			if (verifyToken.data === false){
				await Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Token is invalid',
					confirmButtonText: '<a href="/#/login" style="color: #ffffff">LOGIN</a>'
				}).then(async (result)=> {
					if (result.value){
						window.location.href = "/#/login"
					}
				})
			}
		},
		validatePassword(value) {
			if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%^&*])(?=.{8,})/.test(value)) {
				this.error_message['password'] = '';
				this.hasPasswordError = false;
				return;
			}
			this.error_message['password'] = 'Password is too weak';
			this.hasPasswordError = true;

		},
		validateConfirmPassword() {
			if (this.confirm_password !== this.password) {
				this.error_message['confirm_password'] = 'Password does not match';
				this.hasConfirmPasswordError = true;
				return;
			}
			this.error_message['confirm_password'] = '';
			this.hasConfirmPasswordError = false;
		},
		showPassword() {
			if (this.password_type === "password") {
				this.password_type = 'text';
				this.isPasswordToggled = true;
				return;
			}
			this.type = "password";
			this.isPasswordToggled = false;
		},
		showConfirmPassword() {
			if (this.confirm_password_type === "password") {
				this.confirm_password_type = 'text';
				this.isConfirmPasswordToggled = true;
				return;
			}
			this.confirm_password_type = "password";
			this.isConfirmPasswordToggled = false;
		},
		handle422Errors(data) {
			let errors = data.errors
			for (let key in errors) {
				errors[key].forEach(err => {
					this.$toast.error(err);
				});
			}
		},
		handleOtherErrors(data) {
			this.$toast.error(data.message);
		},
		async assignPassword() {
			this.button_text = '';
			this.isLoading = true;
			try {
				await this.$axios.$post('auth/provision/user/password/assign', {
					token: this.$route.params.id,
					password: this.password,
					password_confirmation: this.confirm_password
				});
				this.button_text = 'Save';
				this.isLoading = false;
				this.$toast.success("Successfully Saved.")
				await this.$router.push({name: 'login'});
			} catch (e) {
				this.button_text = 'Save';
				this.isLoading = false;
				let errors = e.response.data;

				if (e.response.status === 422) {
					this.handle422Errors(errors)
				} else {
					this.handleOtherErrors(errors)
				}
			}
		},
	},
	mounted() {
		this.verifyUserPasswordToken()
	}
}
</script>

<style scoped>
@import "assets/css/general_style/authentication_pages.css";
.form-group {
	margin-bottom: 20px;
	position: relative;
}

.form-control {
	display: block;
	width: 100%;
}

.has-feedback-left .form-control {
	padding-right: 12px;
	padding-left: 36px;
}

.form-panel {
	/* box-shadow: 0 10px 45px 0 rgba(0,0,0,.1); */
	background-color: #fff;
	border: transparent;
}
.bg-blue {
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
