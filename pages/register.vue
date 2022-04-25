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
					<form  method="post"  @submit.prevent="registerUser">
						<div class="mt-20">
							<div class="row ">
								<div class="select-class">
									<div class="row-form has-feedback has-feedback-left ">
										<input id="first_name"   type="text" class="form-control" :class="{'error ' : hasFirstNameError,'has-input' : hasFirstNameInput}" v-model="first_name"   placeholder="First Name">
										<span class="input-field_helper">First Name</span>
										<span class="error_field_message" v-if="error_message.first_name">{{error_message.first_name}}</span>
									</div>
									<div class="row-form has-feedback has-feedback-left ">
										<input id="last_name"   type="text" class="form-control" :class="{'error ' : hasLastNameError, 'has-input' : hasLastNameInput}" v-model="last_name"   placeholder="Last Name">
										<span class="input-field_helper">Last Name</span>
										<span class=" error_field_message" v-if="error_message.last_name">{{error_message.last_name}}</span>
									</div>
								</div>

								<div class="register-form-group has-feedback has-feedback-left ">
									<input id="email"  type="email" class="form-control round-form-input"  :class="{'error ' : hasEmailError, 'has-input' : hasEmailInput}" v-model="email" placeholder="Work Email">
									<span class="input-field_helper">Work Email</span>
									<span class=" error_field_message" v-if="error_message.email">{{error_message.email}}</span>
								</div>
								<div class="register-form-group has-feedback has-feedback-left mt-20">
									<input id="password"
																:type="type" class="form-control " :class="{'error ' : hasPasswordError, 'has-input' : hasPasswordInput}" v-model="password" placeholder="Password" maxlength="24">
									<span class="input-field_helper">Password</span>
									<span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
									<i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  aria-hidden="true" @click="showPassword"></i>
									<div v-show="hasPasswordError">
										<p>Password should contain at least:</p>
										<ul>
											<li>One lowercase letter</li>
											<li>One uppercase letter</li>
											<li>One number </li>
											<li>One special character</li>
											<li>8 minimum characters</li>
										</ul>
									</div>
								</div>
								<div class="register-form-group has-feedback has-feedback-left ">
									<div class="tooltip">
										<input id="phone_number"  type="tel" class="form-control" :class="{'error ' : hasPhoneNumberError, 'has-input' : hasPhoneNumberInput}" v-model="phone_number"  name="phone_number" placeholder="Phone Number">
										<span class="input-field_helper">Phone Number</span>
										<span class="tooltiptext">Enter a valid phone number, you will receive OTP on the phone number provided.</span>
										<span class=" error_field_message" v-if="error_message.phone_number">{{error_message.phone_number}}</span>
									</div>
								</div>
								<div class="select-class">
									<div class="row-form has-feedback has-feedback-left ">
										<input   type="text" class="form-control round-form-input"  :class="{'error ' : hasCompanyError, 'has-input' : hasCompanyInput}" v-model="company" placeholder="Company">
										<span class="input-field_helper">Company</span>
										<span class=" error_field_message" v-if="error_message.company">{{error_message.company}}</span>
									</div>

									<div class="row-form has-feedback has-feedback-left" >
										<CustomSelect :options="roles"  :dropdown-style="dropdownStyle" :dropdown-selected="dropdownSelected" @item-selected="setRoleId($event)"></CustomSelect>
									</div>
								</div>
								<div class="select-class">
									<div class="row-form has-feedback has-feedback-left ">
										<SearchDropdown :options="countries" :dropdown-selected-style="dropdownSelectedBackground" :dropdown-style="dropdownStyle" @item-selected="selected_country = $event"></SearchDropdown>
									</div>

									<div class="row-form has-feedback has-feedback-left" >
										<CustomSelect :options="sectors"  :dropdown-style="dropdownStyle" :dropdown-selected="dropdownSelected" @item-selected="setSectorId($event)"></CustomSelect>
									</div>
								</div>
								<div class="checkboxes mb-10">
									<label class="checkbox-inline">
										<input type="checkbox"  v-model="notification_opt_in">
										Would you like to receive notifications and newsletters from us ?
									</label>
								</div>
								<div>
									<ButtonSpinner :is-disabled="isDisabled"  :button_text="button_text" :is-loading="isLoading"></ButtonSpinner>
									<nuxt-link  to="/login" class="pull-right mt-20 m-r-10" style="color: black">Got an account? <span class="text-info2 bold">Log In</span></nuxt-link>
								</div>

							</div>
						</div>
					</form>
					<div class="mb-20">
						<br class="mt-10">
						<span class="hidden-xs">By clicking the "Create My Account" button, you agree to Termii’s <a href="https://termii.com/terms" target="_blank" class="text-info2">terms of acceptable use</a> and <a href="https://termii.com/privacy" target="_blank" class="text-info2"> privacy policies</a></span>
					</div>
					<!-- /register form -->
				</div>

			</div>

		</div>

	</div>

</template>


<script>
import SearchDropdown from "../components/general/dropdown/SearchDropdown";
import CustomSelect from "../components/general/dropdown/CustomSelect";
import {mapGetters} from "vuex";
import ButtonSpinner from "../components/general/ButtonSpinner";
export default {
	name: "register",
	components: {ButtonSpinner, CustomSelect, SearchDropdown},
	middleware:['guest', ],
	layout: 'auth',
	data(){
		return{
			registered_business:"",
			selected_country: '',
			selected_sector: '',
			email: "",
			password:"",
			first_name: "",
			last_name:"",
			phone_number: "",
			company:'',
			access_token:"",
			error: null,
			error_message:[],
			hasEmailError: false,
			notification_opt_in: true,
			hasPasswordError: false,
			hasFirstNameError: false,
			hasLastNameError: false,
			hasPhoneNumberError: false,
			hasCompanyError: false,
			hasCompanyInput: false,
			hasFirstNameInput: false,
			hasLastNameInput: false,
			hasEmailInput: false,
			hasPasswordInput: false,
			hasPhoneNumberInput:false,
			isToggled: false,
			button_text: "Create My Account",
			isLoading: false,
			type: "password",
			countries: ['Select Country'],
			sectors: ['Select Sectors'],
			roles:['Select Roles'],
			selected_captcha: false,
			sectors_id:'',
			role_id:'',
			dropdownSelectedBackground:{
				backgroundColor: '#ffffff',
				backgroundImage: 'none',
				border: '1px solid rgba(0, 0, 0, 0.07)',
				color: '#2c2c2c',
				height: '55px',
				padding: '20px 36px',
				display: 'flex',
				alignItems:'center',
				fontWeight: 'normal',
				minHeight: '35px',
				marginTop: '0px',
				borderRadius: '1px'
			},
			dropdownStyle:{
				height: '55px',
			},
			dropdownSelected: {
				padding: '8px 36px',
			}
		}
	},
	computed: {
		isDisabled: function () {
			return (this.email === '' || this.password === '' || this.hasEmailError || this.hasPasswordError
				|| this.first_name === '' || this.hasFirstNameError || this.selected_country === '' || this.company === '' || this.role_id === ''
				|| this.sectors_id === ''  || this.hasPhoneNumberError || this.phone_number === '' || this.last_name === ''|| this.hasLastNameError
				|| this.selected_country === 'Select Country');
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
		},
		company(value){
			this.company = value;
			this.hasCompanyInput = true;
			this.validateCompany(value)
		}
	},
	methods: {

		validateEmail(value){
			if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
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
			if ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%^_&*-])(?=.{8,})/.test(value)){
				this.error_message['password'] = '';
				this.hasPasswordError = false;
			}
			else {
				this.error_message['password'] = 'Password is too weak';
				this.hasPasswordError = true;
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
		validateCompany(value){
			if (value === ""){
				this.error_message['company'] = 'The company field is required';
				this.hasCompanyError = true;
			} else {
				this.error_message['company'] = '';
				this.hasCompanyError = false;
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
		async fetch(){
			// fetch country data
			let countries_data = await this.$axios.$get('/utility/countries');
			for (let i = 0; i < countries_data.data.length; i++){
				this.countries.push(countries_data.data[i].name)
			}

			//fetch sector data
			let sector_data = await this.$axios.$get('/utility/sectors');
			this.sectors = sector_data.data;

			//fetch roles
			let roles_data = await this.$axios.$get('utility/roles')
			this.roles = roles_data.data;

			//fetch no of registered business
			let registered_business_data = await this.$axios.$get('/utility/total/registered-businesses',);
			this.registered_business = registered_business_data.data

		},
		setSectorId(event){
			this.sectors_id = event;
		},
		setRoleId(event){
			this.role_id = event;
		},

		async setUserData(){

			 try {

					let response_data = await this.$user.LoginUser(this.email, this.password);
					localStorage.setItem('local', response_data.access_token);

					let response = await this.$user.getUser();

					await localStorage.setItem('user_data', JSON.stringify(response.data));
					if (JSON.parse(localStorage.getItem('user_data')).active_status_id.name === "Pending"){
						this.$store.commit('setFirstName', JSON.parse(localStorage.getItem('user_data')).fname);
						this.$store.commit('setViewVerificationPage', 'true');
						this.$store.commit('setLIState', true);
						this.isLoading = false;
						this.button_text = "Create My Account";
						await this.$router.push('/verify');

					}
				}catch (e){

				}

		},


		async registerUser(action){

			this.isLoading = true;
			this.button_text = "Creating..."
			try{
				await this.$recaptcha.execute(action).then(async () => {
					await this.$user.registerUser(this.first_name, this.last_name, this.email,
						this.password, this.phone_number, this.selected_country,
						this.sectors_id, this.company, this.role_id, this.notification_opt_in);
					await this.setUserData();
				});
			} catch (e) {

				this.isLoading = false;
				this.button_text = "Create My Account"
				if (navigator.onLine){
					if (e.response.data.error === 'Account not verified.'){
						this.$store.commit('setFirstName', e.response.data.data);
						this.$store.commit('setViewVerificationPage', 'true');
						// await this.$router.push({ name: 'index', });
					}else {
						let errors = e.response.data.errors;
						for(let key in errors){
							errors[key].forEach(err => {
								this.$toast.error(err);
								this.hasEmailError = true
								this.error_message['email'] = err;
							});
						}
					}
				} else {
					this.isLoading = false;
					this.button_text = "Create My Account"
					this.$toast.show("No Internet connection")
				}

			}
		},

	},

	beforeDestroy() {
		this.$recaptcha.destroy()
	},

	async mounted() {
		try {
			await this.fetch();
			await this.$recaptcha.init();
		} catch (e) {
			console.error(e);
		}
	}


}
</script>

<style scoped>
@import "assets/css/general_style/authentication_pages.css";

.page-height{
	height: 160vh;
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
@media (max-width: 768px) {
	.row-form{
		flex-basis: 100%;
		max-width: 98%;
		margin-top: 0;
		padding: 0;
	}
	.select-class {
		display: flex;
		flex-direction: column;
		background: #FFFFFF ;
	}
}
.tooltip{
	position: relative;
}
.tooltip .tooltiptext {
	visibility: hidden;
	width: 150px;
	background-color: #555;
	color: #fff;
	font-size: 10px;
	/*text-align: center;*/
	padding: 5px 5px;
	border-radius: 6px;

	/* Position the tooltip text */
	position: absolute;
	z-index: 1;
	bottom: 125%;
	left: 40%;
	margin-left: -60px;

	/* Fade in tooltip */
	opacity: 0;
	transition: opacity 0.3s;
}
/* Tooltip arrow */
.tooltip .tooltiptext::after {
	content: "";
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
	visibility: visible;
	opacity: 1;
}
.checkboxes label {
	display: inline-block;
	padding-right: 10px;
	white-space: nowrap;
	font-weight: bold !important;
}
.checkboxes input {
	vertical-align: middle;
}
.checkboxes label span {
	vertical-align: middle;
}

</style>
