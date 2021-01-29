<template>

	<!-- Modal -->
	<modal name="account-password-modal" height="auto" :width="400" :resizable="true" >
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" @click="close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel"></h4>
			</div>
			<form class="form-some-up form-block" role="form" @submit.prevent="" method="post">
				<div class="modal-body">

					<div class="form-group">
						<label>Password</label>
						<input type="text" :type="type" class="form-control" v-model="password" placeholder="enter password" >
						<span class=" error_field_message" v-if="error_message.password">{{error_message.password}}</span>
						<i class="password-visibility" :class="[isToggled ? 'fa-eye': 'fa-eye-slash', 'fa']"  @click="showPassword"></i>
					</div>

				</div>
				<div class="modal-footer">
					<button @click="update" class="btn btn-primary" :disabled="isDisabled">
						{{button_text }}
						<span v-show="isLoading">
							 <img src="/images/spinner.svg" height="20px" width="30px"/>
						</span>
					</button>
				</div>

			</form>
		</div>
	</modal>
</template>

<script>
import Swal from 'sweetalert2';
export default {
	name: "AccountPassword",
	middleware:'auth',
	data(){
		return {
			hasPasswordError: false,
			password:'',
			type: "password",
			error_message:[],
			isToggled: false,
			button_text: 'Update',
			isLoading: false
	}
	},
	watch: {
		password(value) {
			this.validatePassword(value)
		},
	},
	computed:{
		isDisabled:function () {
			return (this.hasPasswordError || !this.password);
		},
	},
	props:{
		company_sector:{
		},
		phone:{
		},
		email:{
		},
		first_name:{
		},
		last_name:{
		},
		image:{
		},
		event_name:{
			required:true
		}
	},
	methods: {
		close() {
			this.$modal.hide('account-password-modal');
			this.password = '';
		},
		showPassword() {
			if (this.type === "password") {
				this.type = 'text';
				this.isToggled = true;
			} else {
				this.type = "password";
				this.isToggled = false;
			}
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
		update(){
			 switch (this.event_name){
			 	 case 'profile': {
							  this.updateProfile();
							  break;
						}
						case 'api_token': {
							 this.renewApiToken();
							 break;
						}

				}
		},
		async renewApiToken(){
			this.button_text = "";
			this.isLoading = true;
			try{
				await this.$axios.$get('user/keys/renew', {params:{password: this.password} });
				let response = await this.$axios.$get('user');
				await localStorage.setItem('user_data', JSON.stringify(response.data));
				this.api_key = 	JSON.parse(localStorage.getItem('user_data')).customer.live_api_key;
				this.$emit('set_api_key', this.api_key);
				this.$toast.success('Your API token was successfully renewed');
				this.button_text = 'Update';
				this.isLoading = false;
				this.password = '';
				this.close();

			}catch (e) {
				this.button_text = "Update";
				this.isLoading = false;
				this.error_message['password'] = 'Password Incorrect';
				this.hasPasswordError = true;
			}

		},
		async updateProfile() {
			this.button_text = "";
			this.isLoading = true;
			try {
				await this.$axios.$patch('user/profile', {
					first_name: this.first_name,
					last_name: this.last_name,
					email: this.email,
					password: this.password,
					company_sector: this.company_sector,
					image: this.image_url,
					phone: this.phone_number
				});
				let response = await this.$axios.$get('user', {
					headers: {'Authorization': `Bearer ${localStorage.getItem('local')}`}
				});
				await localStorage.setItem('user_data', JSON.stringify(response.data));
				this.button_text = 'Update';
				this.isLoading = false;
				this.$toast.success('Profile Updated Successfully');
				this.password = '';
				this.close();
			} catch (e) {
				this.button_text = "Update";
				this.isLoading = false;
				let errors = e.response.data.errors;
				for (let key in errors) {
					errors[key].forEach(err => {
						this.$toast.error(err);
						this.hasPasswordError = true
						this.error_message['password'] = err;
					});
				}

		  	}
		  },
			}
}
</script>

<style scoped>
.vm--container{
	display: block;
	overflow-y: auto;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1050;
	-webkit-overflow-scrolling: touch;
	outline: 0;
	background-color: rgba(0, 0, 0, 0.5);
}
.modal-header {
	padding: 20px;
	border-bottom: 1px solid transparent;
}
.modal-header {
	position: relative;
	padding-bottom: 0;
}

.modal-header .close[type=button] {
	background: rgba(255,255,255,0.3);
	width: 25px;
	height: 25px;
	display: block;
	border-radius: 20px;
	color: #000;
	font-weight: bold;
	margin-top: -3px;
	margin-right: -10px;
}
.modal-header .close {
	position: absolute;
	right: 20px;
	top: 50%;
	/* margin-top: 0; */
}
.modal-title {
	margin: 0;
	line-height: 1.5384616;
}
button.close {
	padding: 0;
	cursor: pointer;
	background: transparent;
	border: 0;
	-webkit-appearance: none;
}
.form-control:focus {
	border-color: #4DB6AC;
	outline: none;
}
.close {
	font-size: 17px;
	text-shadow: none;
	opacity: 0.6;
	filter: alpha(opacity=60);
	line-height: 1;
}
.close:hover, .close:focus {
	outline: 0;
	opacity: 1;
	color: black;
	filter: alpha(opacity=100);
}
.modal-body {
	padding: 20px 20px 30px 20px;
	position: relative;
}
.form-group {
	margin-bottom: 20px;
	position: relative;
}
.form-group label {
	margin-bottom: 5px;
	display: block;
	font-weight: 600;
	line-height: 24px;
}
label {
	max-width: 100%;
}
.form-control{
	font-size: 13px;
	border-radius: 5px;
	border: 1px solid rgba(204, 204, 204, 0.34);
	font-weight: 500;
	box-shadow: none;
	display: block;
	width: 100%;
	height: 36px;
	padding: 7px 12px;
	line-height: 1.5384616;
	color: #333333;
	background-color: #fff;
	background-image: none;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:hover {
	border-color: #aaa;
}
.form-control:focus {
	border-color: #4DB6AC;
}
input {
	font: inherit;
}
strong {
	font-weight: 600;
}
.modal-footer {
	padding-top: 0;
	padding: 20px;
	text-align: right;
	border-top: 1px solid transparent;
}

.modal-footer .btn + .btn {
	margin-left: 5px;
	/* margin-bottom: 0; */
}
.form-group i.password-visibility{
	height: 16px;
	cursor: pointer;
	fill: #0a2e65;
	top: 40px;
	width: 16px;
	opacity: 1;
	position: absolute;
	right: 16px;
}
.btn-primary:hover {
	color: #fff;
	/* background-color: #0c7cd5; */
	border: 1px solid transparent !important;
}
</style>
