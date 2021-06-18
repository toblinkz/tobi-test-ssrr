<template >
	<div class="login-page-height ">
		<div class="login-wrapper">
			<!-- START Login Background Pic Wrapper-->
			<div class="bg-pic">
				<!-- START Background Pic-->

				<div class="m-t-30 hidden-xs">
					<img alt="Image" style="width: 45%;margin-top: -40px;margin-bottom: -85px;margin-left: 10px;" src="/images/products/ds.svg">
				</div>
				<!-- END Background Pic-->
			</div>
			<!-- END Login Background Pic Wrapper-->
			<!-- START Login Right Container-->
			<div class="login-container bg-white">
				<div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40 wd-k">
					<nuxt-link to="/"> <img src="/images/logo.png" alt="logo" data-src-retina="/" width="150px" height="auto"></nuxt-link>
					<!-- START Login Form -->
					<form method="post" @submit.prevent="loginUser">

						<div class="auth-panel panel-body ">
							<p class="p-t-20">Welcome back! Sign into your account, we've been waiting for you!</p>
							<div class="login-form-group has-feedback has-feedback-left m-t-35">
								<input id="email" style="width: 100%"  type="email" class="form-control " :class="{'error ' : hasEmailError, 'has-input' : hasEmailInput}"  v-model="email"  placeholder="Work Email">
								<span class="input-field_helper">Work Email</span>
								<span class=" error_field_message" v-if="error_message.email">{{error_message.email}}</span>
							</div>


							<div class="login-form-group has-feedback has-feedback-left ">
								<input id="password" style="width: 100%"  :type="type" class="form-control " :class="{'error ' : hasPasswordError, 'has-input' : hasPasswordInput}" v-model="password" placeholder="Password" maxlength="24">
								<span class="input-field_helper">Password</span>
								<span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
								<i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showPassword"></i>
							</div>

							<div class="login-form-group login-options" style="margin-left: -20px">
								<div class="row">
									<div class="col-sm-6">
										<label class="checkbox-inline">
											<input type="checkbox" class="styled" checked="checked" name="remember">
											STAY LOGGED IN
										</label>
									</div>
								</div>
							</div>
							<div class="row" style="width: 100%">
								<ButtonSpinner :is-disabled="isDisabled"  :button_text="button_text" :is-loading="isLoading"></ButtonSpinner>
								<nuxt-link  to="/forgot-password" class="text-info2 pull-right mt-20">Forgot password</nuxt-link>
							</div>
							<div>
								<br>
								Don't have an account with Termii? You can <nuxt-link to="/register" class="text-info bold">Create an account here</nuxt-link> <br>or speak to an agent <a id="CHATID" class="text-info2">here</a>
							</div>
						</div>

					</form>
					<!-- Advanced login -->
				</div>
				<!-- /advanced login -->
			</div>
		</div>
		<!-- END Login Right Container-->
	</div>
</template>


<script>
import ButtonSpinner from "../components/general/ButtonSpinner";
import Swal from "sweetalert2";
export default {
	name: "login",
	components: {ButtonSpinner},
	middleware: "guest",
	data(){
		return{
			email:"",
			password:"",
			valid: false,
			error: null,
			error_message:[],
			hasEmailError: false,
			hasPasswordError: false,
			hasEmailInput: false,
			hasPasswordInput: false,
			isToggled: false,
			type: "password",
			isLoading: false,
			button_text:"Proceed",
			access_token: ""
		}
	},
	computed: {
		isDisabled: function () {
			return (this.hasEmailError || this.hasPasswordError || this.email === '' || this.password === '');
		},
	},
	watch: {
		email(value) {
			this.email = value;
			this.hasEmailInput = true;
			this.validateEmail(value);
		},
		password(value) {
			this.password = value;
			this.hasPasswordInput = true;
			this.validatePassword(value);
		}
	},
	methods: {
		validateEmail(value){
			if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
				this.error_message['email'] = '';
				this.hasEmailError = false;
			}else {
				this.error_message['email'] = 'The email field must be a valid email';
				this.hasEmailError = true;
			}
		}
		,
		validatePassword(value){
			if (value.length < 6) {
				this.error_message['password'] = 'The password field must be at least 5 characters';
				this.hasPasswordError = true;
			}else {
				this.error_message['password'] = '';
				this.hasPasswordError = false;
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
		},
		setExpiryTime(){
			let loggedInTime = Date.now();
			let expiryTime =  moment(loggedInTime).add(56, 'minutes').toDate();
			console.log('et',expiryTime)
			console.log('loggedintime', loggedInTime)
			console.log('timeleft', )
			localStorage.setItem('LGIT', loggedInTime);
			localStorage.setItem('ET', expiryTime - Date.now() );
		},
		async loginUser() {
			try{
				this.isLoading = true;
				this.button_text = "Logging in";
				let response_data =   await this.$axios.post('auth/login', {
					email: this.email,
					password: this.password
				});
				await 	localStorage.setItem('local', response_data.data.access_token);

				//set expiry time
				this.setExpiryTime();
				this.$store.commit('setLIState', true);
				let response = 	await this.$axios.$get('user', {
					headers:{'Authorization': `Bearer ${localStorage.getItem('local')}`}
				});
				await localStorage.setItem('user_data', JSON.stringify(response.data));

				if (JSON.parse(localStorage.getItem('user_data')).active_status_id.name === "Pending"){
					this.$store.commit('setFirstName', JSON.parse(localStorage.getItem('user_data')).fname);
					this.$store.commit('setViewVerificationPage', 'true');
					await this.$router.push('/');
				}else {
					this.isLoading = false;
					this.button_text = "Proceed";
					await this.$router.push('/');
					this.$store.commit('setViewVerificationPage', 'false');
				}

			} catch (e) {
				this.isLoading = false;
				this.button_text = "Proceed";
				if (navigator.onLine){
					if (e.response.data.error === 'Unauthorized'){
						this.hasPasswordError = true;
						this.error_message['password'] = 'Invalid credentials';
					} else if (e.response.data.error === 'Account has either been disabled temporarily or deleted Permanently.\n' +
						'                Contact your Account Manager.'){
						this.hasPasswordError = true;
						this.hasEmailError = true;
						await Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Account has either been disabled temporarily or deleted Permanently.Contact your Account Manager',
							footer: '<a id="CHATID">Contact Account Manager</a>'
						});
					} else{
						let errors = e.response.data.errors;
						for(let key in errors){
							errors[key].forEach(err => {
								this.$toast.error(err);
								this.hasEmailError = true;
								this.error_message['email'] = err;
							});
						}
					}
				}
				else {
					this.isLoading = false;
					this.button_text = "Proceed";
					this.$toast.show("No Internet connection");
				}
			}
		}
	},
	mounted() {

	}

}
</script>

<style scoped>
@import "../assets/css/general_style/authentication_pages.css";

.has-feedback-left .form-control {
	padding-right: 12px;
	padding-left: 36px;
}


.login-form-group {
	margin-bottom: 20px;
	position: relative;
}

</style>
