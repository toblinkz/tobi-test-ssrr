<template>
	<!-- Modal -->
	<modal name="update-team-member-modal" height="auto" width="502px">
		<div class="update-teammate-modal-container">
			<div class="update-teammate-modal-header">
				<h4 class="update-teammate-modal-title">Update Teammate’s Permission</h4>
				<img src="/icons/svg_icons/close-icon-round.svg" alt="" class="close-icon" @click="closeModal">
			</div>

			<div class="update-teammate-modal-body">
				<div class="form-group">
					<div style="display: flex;">
						<div style="width: 45%">
							<label>First Name</label>
							<div class="form-control">{{ first_name }}</div>
						</div>

						<div style="width: 5%"></div>

						<div  style="width: 50%">
							<label>Last Name</label>
							<div class="form-control">{{last_name}}</div>
						</div>
					</div>
					<br>
					<div>
						<label>
							Email address
							<img @mouseover="hover = true"
												@mouseleave="hover = false"
												style="margin-left: 6px; cursor: pointer"
												src="/icons/svg_icons/more-info-icon.svg" alt="">
						</label>
						<div class="form-control">{{email}}</div>
						<div class="more-info" v-if="hover">
							You can’t edit this email address,
							please remove teammate and
							add the correct email.
						</div>
					</div>

					<br>

					<div>
						<label class="role">Role</label>
						<TeamRolesDropdown
							:options="roles"
							:default="{id: -1, name: role}"
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
								<div v-for="row in permissions">
									<h3 class="m-b-10" style="font-weight: bold;
												font-size: 14px;
												line-height: 16px;
												color: #333333;"
									>
										{{row.name}}
									</h3>
									<div class="checkboxes" v-for="member in row.permission">
										<label style=" width: 100%;
												padding: 8px;
												background: #FFFFFF;
												border: 1px solid #F5F5F5;
												color: #333333;
												border-radius: 4px;">
											<input type="checkbox" :value="member.id" v-model="teammates_permissions" style="margin-right:10px;"/>
											<span style="font-weight: bold;">Can</span> {{ member.name.replace(/_/g, " ") }}
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="update-teammate-modal-footer">
				<a class="btn bg-blue id-btn-primary" @click="updateTeamMember" :aria-disabled="isDisabled">
					<i class="fa fa-plus m-r-5" v-show="show_icon"></i>{{update_button_text}}
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
import TeamRolesDropdown from "@/components/team/TeamRolesDropdown";
export default {
	name: "UpdateTeamMemberModal",
	components: {ButtonSpinner, Switches, TeamRolesDropdown},
	data(){
		 return{
		 	 roles: [],
				 isLoading: false,
				 permissions:[],
				 all_permissions:[],
				 select_all_permission: false,
				 teammates_permissions:[],
			 	selected_permission:[],
				 team_member_info: [],
				 error_message:[],
				 show_icon: true,
				 update_button_text: 'Update',
				 all_permissions_id:[],
					hover: false,
					btn_text: 'Send invite',
					isPermissionsOpen: false,
			}
	},
 props:{
		 first_name:{ required: true},
		 last_name:{ required: true },
		 teammate_id:{ required: true},
		 email: { required: true },

		 selected_teammate_permission:{required: true},
		 role: { required: true }
	},
	watch:{
		 email(){
		 	  if(this.email){
		 	  	 this.teammates_permissions = [];
		 	  	  this.mergeTeammatePermissions();
						}
			},
		select_all_permission(){
			if (this.select_all_permission){
				this.teammates_permissions = this.all_permissions_id;
			}else {
				this.teammates_permissions = [];
			}
		}
	},
	computed:{
		isDisabled:function () {
			return (this.teammates_permissions.length === 0);
		},
	},
	methods:{
		closeModal() {
			this.$modal.hide('update-team-member-modal');
		},
		async getRoles(){
			try {
				let data = await this.$axios.$get('utility/roles');
				this.roles = data.data;
			}catch (e) {}
		},

		showPermissions() {
			console.log(this.all_permissions)
			this.isPermissionsOpen = !this.isPermissionsOpen
		},

		mergeTeammatePermissions(){
			 this.selected_teammate_permission.forEach((permission) => {
			 	 this.teammates_permissions.push(permission.id);
				})
			let ids = new Set(this.all_permissions.map(d => d.id));
			this.permissions = [...this.all_permissions];
		},
		async getPermissions(){
			try {
				let data = await this.$axios.$get('utility/permission');
				this.all_permissions = data.data;

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
		handle422Errors(data){
			let errors = data.errors
			for (let key in errors) {
				errors[key].forEach(err => {
					this.$toast.error(err);
				});
			}
		},
		handleOtherErrors(data){
			this.$toast.error(data.message);
		},
		async updateTeamMember(){
			this.update_button_text = '';
			this.show_icon = false;
			this.isLoading = true;
			try {
				let data = await this.$axios.$patch(`team/${this.teammate_id}/permissions/update`, {
					permissions: this.teammates_permissions
				});
				this.$emit('update-teammate-permission');
				this.update_button_text = 'Update';
				this.show_icon = true;
				this.isLoading = false;
				this.close();
			}catch (e) {
				this.update_button_text = 'Update';
				this.show_icon = true;
				this.isLoading = false;

				let errors = e.response.data;

				if(e.response.status === 422){
					this.handle422Errors(errors)
				}else{
					this.handleOtherErrors(errors)
				}
			}
		},
		updateSelectedRole(roleId){
			this.role_selected = roleId
		},
	},
	mounted() {
		this.getRoles();
		this.getPermissions();
	}
}
</script>

<style scoped >
@import "../../assets/css/modal/modal.css";


.update-teammate-modal-header {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	border-bottom: 1px solid #E7E7E7;
}

.update-teammate-modal-header h4 {
	padding: 0;
	font-weight: bold;
}

.update-teammate-modal-title {
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

.update-teammate-modal-body {
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
	color: #D9D9D9;
}
label.role {
	max-width: 100%;
	color: #000000!important;
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
	color: #D9D9D9;
	background-color: #fff;
	background-image: none;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.role-form-control{
	font-size: 13px;
	border-radius: 5px;
	border: 1px solid #ccc;
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
.role-form-control:hover {
	border-color: #bbb;
}
.role-form-control:focus {
	border-color: #4DB6AC;
	outline: none;
}
.form-control:hover {
	border-color: #D9D9D9;
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

.update-teammate-modal-footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 40px 0;
}
.update-teammate-modal-footer .btn {
	margin: 0 auto;
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
