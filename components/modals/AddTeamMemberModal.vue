<template>

	<!-- Modal -->
	<modal name="add-team-member-modal" height="auto" width="502px">
		<div class="add-teammate-modal-container">
			<div class="add-teammate-modal-header">
				<h4 class="add-teammate-modal-title">Add a teammate</h4>
				<img src="/icons/svg_icons/close-icon-round.svg" alt="" class="close-icon" @click="closeModal">
			</div>

			<div class="add-teammate-modal-body">
				<p style="margin-bottom: 20px; width: 100%">Input the teammate’s email and assign permissions to the
					account below </p>
				<div class="form-group">
					<div style="display: flex;">
						<div style="width: 45%">
							<label>First Name</label>
							<input type="text" class="form-control"  placeholder="first name" v-model="first_name" :class="{'error ' : hasFirstNameError}" >
						</div>

						<div style="width: 5%"></div>

						<div  style="width: 50%">
							<label>Last Name</label>
							<input type="text" class="form-control"  placeholder="last name" v-model="last_name" :class="{'error ' : hasLastNameError}">
						</div>
					</div>
					<br>

					<div>
						<label>
							Email address
							<img
										@mouseover="hover = true"
										@mouseleave="hover = false"
										style="margin-left: 6px; cursor: pointer"
										src="/icons/svg_icons/more-info-icon.svg" alt="">
						</label>
						<input type="text" class="form-control" v-model="email" placeholder="Input email here" :class="{'error ' : hasEmailError}">
						<span class=" error_field_message" v-if="error_message.email">{{error_message.email}}</span>
						<div class="more-info" v-if="hover">
							When an email is added, it cannot
							be edited. It has to be removed before
							adding the correct email.
						</div>
					</div>

					<br>

					<div>
<!--						<label>Role</label>-->
<!--						<select  @change="onChange($event)" class="form-control" >-->
<!--							<option v-for="role in roles"  :value="role.id" >{{role.name}}</option>-->
<!--						</select>-->

						<label>Role</label>
						<TeamRolesDropdown
							:options="roles"
							:default="{id: -1, name: 'Select a role here'}"
							@select-role-input="updateSelectedRole"
						></TeamRolesDropdown>
					</div>

					<div style="background: #F8F8F8; border-radius: 6px 6px 0 0; padding: 10px; margin-top: 30px">
						<div style="display: flex; justify-content: space-between">
								<p style="padding: 0; margin: 0; font-weight: bold">Permissions</p>
							<img
								@click="showPermissions"
								style="cursor: pointer" src="/icons/svg_icons/entypo_chevron-small-down.svg"
								alt="">
						</div>
						<div class="permissions-list" v-if="isPermissionsOpen">
							<div style="display: flex; justify-content: flex-end; align-items: center; margin: 10px 0;">
								<input  type="checkbox" v-model="select_all_permission"/>
								<p
									style="padding: 0; margin: 0; text-align: center; font-size: 14px; line-height: 16px;color: #333333;"
								>Select all</p>
							</div>
							<div class="mt-20">
								<div v-for="row in permission">
									<h3 class="m-b-10" style="font-weight: bold;
												font-size: 14px;
												line-height: 16px;
												color: #333333;
									">{{row.name}}</h3>
									<div class="checkboxes" v-for="member in row.permission">
										<label style=" width: 100%;
										padding: 8px;
												background: #FFFFFF;
												border: 1px solid #F5F5F5;
												border-radius: 4px;">
											<input type="checkbox" :value="member.id" v-model="selected_permission" style="margin-right:10px;"/>
											<span style="font-weight: bold; ">Can</span> {{ member.name.replace(/_/g, " ") }}
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="add-teammate-modal-footer">
				<a class="btn bg-blue id-btn-primary" @click="addTeamMember" :aria-disabled="isDisabled">
					<i class="fa fa-plus m-r-5" v-show="show_icon"></i>{{btn_text}}
					<span v-show="isLoading" >
						<img src="/images/black_spinner.svg" height="20px" width="30px"/>
					</span>
				</a>
			</div>

		</div>
	</modal>

</template>

<script>
import ButtonSpinner from "../general/ButtonSpinner";
import Switches from 'vue-switches';
import {mapGetters} from "vuex";
import TeamRolesDropdown from "@/components/team/TeamRolesDropdown";
export default {
	name: "AddTeamMemberModal",
	middleware:'auth',
	components: {TeamRolesDropdown, ButtonSpinner, Switches},
	data(){
		return{
			select_all: false,
			first_name:'',
			last_name:'',
			email:'',
			role: '',
			role_selected: 1,
			hasEmailError: false,
			hasFirstNameError: false,
			hasLastNameError: false,
			roles:[],
			permission:[],
			selected_permission:[],
			select_all_permission: false,
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
			team_member_info: '',
			all_permissions_id:[],
			hover: false,
			btn_text: 'Send invite',
			isPermissionsOpen: false,
		}
	},
	props:{
		teammates_email:{
			 required: true
		}
	},
	computed:{
		isDisabled:function () {
			return (!this.first_name || !this.last_name  || !this.email || !this.role_selected || this.selected_permission.length === 0);
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
		},
		select_all_permission(){
			 if (this.select_all_permission){
			 	 this.selected_permission = this.all_permissions_id;
				}else {
			 	this.selected_permission = [];
				}
		}
	},
	methods: {
		closeModal() {
			this.$modal.hide('add-team-member-modal');
		},
		async getRoles(){
			try {
				 let data = await this.$axios.$get('utility/roles');
				 this.roles = data.data;
			}catch (e) {}
		},
		showPermissions() {
			this.isPermissionsOpen = !this.isPermissionsOpen
		},
		async getPermissions(){
			 try {
					 let data = await this.$axios.$get('utility/permission');
					 this.permission = data.data;

					 let all_permission = data.data;
					  this.all_permissions_id = [];
					 all_permission.forEach((module) =>{
							  module.permission.forEach((permission) => {
										this.all_permissions_id.push(permission.id)
									})
						});


				}catch (e) {

				}
		},
		updateSelectedRole(roleId){
			this.role_selected = roleId
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
				if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
					this.error_message['email'] = 'The email field must be a valid email';
					this.hasEmailError = true;
					return
				}
		  if (this.teammates_email.includes(email)){
				this.error_message['email'] = 'The email address already exist on team';
				this.hasEmailError = true;
				return;
			}
				this.error_message['email'] = '';
				this.hasEmailError = false;
		},
		clearForm(){
			this.first_name = '';
			this.last_name = '';
			this.email = '';
			this.selected_permission = [];
		},
		async addTeamMember(){
			 this.add_button_text = '';
			 this.show_icon = false;
			 this.isLoading = true;
				const user_exist = await this.$teams.checkIfUserEmailExist(this.email);
			 if (!user_exist.message){
					await this.callAddTeammateEndpoint();
					return;
				}
				this.add_button_text = 'Add teammate';
				this.show_icon = true;
				this.isLoading = false;
				const teammate_info = {
					 email: this.email,
						first_name: this.first_name,
						last_name: this.last_name,
						role: this.role_selected,
						permission: this.selected_permission
				}
				this.$emit('user-email-exist', teammate_info);
		},

		async callAddTeammateEndpoint(){
			try {
				await this.$teams.addTeammate(this.first_name, this.last_name, this.email, this.role_selected, this.selected_permission);
				this.$emit('add-team-member', this.selected_permission);
				this.add_button_text = 'Add teammate';
				this.clearForm();
				this.show_icon = true;
				this.isLoading = false;
				this.close();
			}catch (e) {
				console.log(e)
				this.add_button_text = 'Add teammate';
				this.show_icon = true;
				this.isLoading = false;
				let errors = e.response.data;

				if(e.response.status === 422){
					this.$error.handle422Errors(errors);
				}else{
					this.$error.handleOtherErrors(errors);
				}
			}
		}
	},
	mounted() {
		this.getRoles();
		this.getPermissions();
	}
}
</script>

<style scoped >
@import "../../assets/css/modal/modal.css";

.add-teammate-modal-header {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	border-bottom: 1px solid #E7E7E7;
}

.add-teammate-modal-header h4 {
	padding: 0;
	font-weight: bold;
}

.add-teammate-modal-title {
	margin: 0;
	line-height: 1.5384616;
}

.close-icon {
	opacity: 0.6;
	filter: alpha(opacity=60);
	line-height: 1;
	cursor: pointer;
}
.close-icon:hover,
.close-icon:focus {
	outline: 0;
	opacity: 1;
	color: black;
	filter: alpha(opacity=100);
}

.add-teammate-modal-body {
	padding: 20px 30px;
	position: relative;
}
.form-group {
	margin-bottom: 10px;
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
	border-color: #aaaaaa;
}
.form-control:focus {
	border-color: #4DB6AC;
	outline: none;
}

.more-info {
	width: 236px;
	height: 75px;
	background: #365899;
	border-radius: 6px 6px 6px 0;
	font-size: 13px;
	line-height: 18px;
	color: #FFFFFF;
	padding: 10px 13px;
	position: absolute;
	top: 18px;
	left: 105px;
}

.error_field_message {
	font-size: 1.2rem;
	color: red;
	display: block;
	margin-top: 5px;
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

.add-teammate-modal-footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 40px 0;
}
.add-teammate-modal-footer .btn {
	margin: 0 auto;
}


textarea.form-control {
	height: auto;
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
