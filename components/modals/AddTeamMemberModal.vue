<template>

	<!-- Modal -->
	<modal name="add-team-member-modal" height="auto">
		<div   style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" style="font-weight: bold">Add Teammate</h4>
						<p class="mt-10">Add a new team-mate here</p>
					</div>
						<div class="modal-body">
							<div class="form-group">
								<div style="display: flex;">
									 <div style="width: 45%">
											<label>First Name</label>
											<input type="text" class="form-control"  placeholder="first name" v-model="first_name" >
											<span class=" error_field_message" >{{error_message.first_name}}</span>
										</div>
									 <div style="width: 5%"></div>
									<div  style="width: 50%">
										<label>Last Name</label>
										<input type="text" class="form-control"  placeholder="last name" v-model="last_name" >
										<span class=" error_field_message" >{{error_message.last_name}}</span>
									</div>

								</div>

								<br>
								<label>Email address</label>
								<input type="text" class="form-control" v-model="email" placeholder="email address">
								<span class=" error_field_message" v-if="error_message.email">{{error_message.email}}</span>
								<br>
								<label>Role</label>
								<select  @change="onChange($event)" class="form-control" >
								    <option v-for="role in roles"  :value="role.id" >{{role.name}}</option>
								</select>
								<br>
								<div style="display: flex; justify-content: space-between">
									 <label style="font-size: 16px">Permissions</label>
									 <div style="display: flex">
											Select all	<input  type="checkbox" />
										</div>
								</div>
								<div class="mt-20">
            <div v-for="row in permission">
													 <h3 class="m-b-5">{{row.name}}</h3>
													<div class="checkboxes" v-for="member in row.permission">
														<label><input type="checkbox" :value="member.id" v-model="selected_permission" style="margin-right:10px;"/><span style="font-weight: bold; ">Can</span> {{ member.name.replace(/_/g, " ") }}</label>
													</div>
												</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<a @click="addTeamMember" class="btn id-btn-primary"   :disabled="isDisabled">
								<i class="fa fa-plus m-r-5" v-show="show_icon"></i>{{add_button_text}}
								<span v-show="isLoading" >
															<img src="/images/black_spinner.svg" height="20px" width="30px"/>
													</span>
							</a>
						</div>

				</div>
			</div>
		</div>
	</modal>

</template>

<script>
import ButtonSpinner from "../general/ButtonSpinner";
import Switches from 'vue-switches';
import {mapGetters} from "vuex";
export default {
	name: "AddTeamMemberModal",
	middleware:'auth',
	components: {ButtonSpinner, Switches},
	data(){
		return{
			select_all: false,
			first_name:'',
			last_name:'',
			email:'',
			role: '',
			role_selected:'',
			roles:[],
			permission:[],
			selected_permission:[],
			show_icon: true,
			error_message:[],
			hasFirstNameInput: false,
			hasLastNameInput: false,
			error: "",
			isLoading: false,
			add_button_text: 'Add teammate',
			billing_selected: false,
			number_selected: false,
			contact_selected: false,
			webhook_selected: false,
			report_selected: false,
			team_member_info: ''
		}
	},
	computed:{
		isDisabled:function () {
			return (!this.first_name || !this.last_name  || !this.email || !this.role_selected);
		},
	},
	watch: {
		first_name(value){
			this.first_name = value;
			this.hasFirstNameInput = true;
			this.validateFirstName(value);
		},
		last_name(value){
			this.last_name = value;
			this.hasLastNameInput = true;
			this.validateLastName(value);
		},
		email(value){
			this.validateEmail(value);
		}
	},
	methods: {
		close() {
			this.$modal.hide('add-team-member-modal');
		},
		async getRoles(){
			try {
				 let data = await this.$axios.$get('utility/roles');
				 this.roles = data.data;
			}catch (e) {

			}
},
		async getPermissions(){
			 try {
					 let data = await this.$axios.$get('utility/permission');
					 this.permission = data.data;

				}catch (e) {

				}
		},
		onChange(event){
		 this.role_selected = event.target.value;
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
		validateEmail(email){
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
				this.error_message['email'] = '';
				this.hasEmailError = false;

			}else {
				this.error_message['email'] = 'The email field must be a valid email';
				this.hasEmailError = true;

			}
		},
		async addTeamMember(){
			 this.add_button_text = '';
			 this.show_icon = false;
			 this.isLoading = true;
			 try {
					  let data = await this.$axios.$post('team', {
					  	 first_name: this.first_name,
								 last_name: this.last_name,
								 email: this.email,
								 role: this.role_selected,
								 permissions: this.selected_permission
							});
					this.$emit('add-team-member', this.selected_permission);
					this.add_button_text = 'Add teammate';
					this.show_icon = true;
					this.isLoading = false;
					this.close();
				}catch (e) {
					this.add_button_text = 'Add teammate';
					this.show_icon = true;
					this.isLoading = false;
				}

		}

		},
	mounted() {
		this.getRoles();
		this.getPermissions();
	}
}
</script>

<style scoped>

.pill {
	font-size: 13px;
	padding: 6px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 500;
	background: #EAEAEA;
	color: #818181;
	cursor: pointer;
}
.selected-pill{
	cursor: pointer;
	font-size: 13px;
	padding: 6px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 500;
	background: #EEF8F4;
	color: #818181;
}
textarea.form-control {
	height: auto;
}
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
}
.modal-title {
	margin: 0;
	line-height: 1.5384616;
}
.error_field_message {
	font-size: 1.2rem;
	color: red;
	display: block;
	margin-top: 5px;
}
button.close {
	padding: 0;
	cursor: pointer;
	background: transparent;
	border: 0;
	-webkit-appearance: none;
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
	padding: 20px 20px 40px 20px;
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
	outline: none;
}
.btn-danger {
	color: #fff;
	background-color: #F44336;
	border-color: #F44336;
}
input[type=text].error {
	border-color: red!important;
}
input {
	font: inherit;
}
strong {
	font-weight: 600;
}
.modal-footer {
	padding: 20px;
	text-align: right;
	border-top: 1px solid transparent;
}

.btn-default {
	color: #333;
	background-color: #fcfcfc;
	border-color: #ddd;
}
.modal-footer .btn + .btn {
	margin-left: 5px;
	/* margin-bottom: 0; */
}
.btn-primary:hover {
	color: #fff;
	/* background-color: #0c7cd5; */
	border: 1px solid transparent !important;
}
.checkboxes label {
	display: inline-block;
	padding-right: 10px;
	white-space: nowrap;
	font-weight: normal !important;
}
.checkboxes input {
	vertical-align: middle;
}
.checkboxes label span {
	vertical-align: middle;
}
</style>
