<template>
		<div class="padding-sides mt-70">
					 <div class="main-content">
							<div style="display: flex; flex-direction: row; justify-content: space-between">
										<div style="display: flex; flex-direction: column">
											<div style="font-size: 20px; font-weight: bold"> <i class="entypo-user-add  m-r-5" style="font-size: 20px"></i> Teams </div>
											<p style="font-size: 15px!important; line-height: 18px; color: #727272; margin-top: 10px;">
												Here is a list of your teammates currently on {{f_name}} {{l_name}}</p>
										</div>
									<div class="btn bg-blue invite-btn" @click="showModal">
										<img src="/images/icons/svg_icons/plus-icon.svg" alt="">
										<p>Invite teammate</p>
									</div>
							</div>

							<TableVuePlaceHolder v-if="show_shimmer">
							</TableVuePlaceHolder>
							<div v-else class="mt-20">
								  <div class="header-style">
												<p class="header-title header-name">Name</p>
												<p class="header-title header-permissions">Permissions</p>
												<p class="header-title header-status">Status</p>
												<p class="header-title">Action</p>
										</div>
								<div class="m-l-10 " style="border-bottom: dotted #ddd!important;"></div>
								  <div v-for="team_member in team_members.data">
											<TeamCard
												:team_member="team_member"
												:all-permissions="allPermissions"
												@team-member-permissions="getTeammatePermissions($event)"
												@view-team-member-permissions="viewAllPermissions"
												@update-team-member="updateTeamMember($event)"
												@delete-team-member="deleteTeamMember($event)"
												@resend-invitation="resendInvitation($event)"
											/>
										</div>
							</div>
						</div>

						<ViewPermissionsModal
							:allPermissions="this.team_member_all_permissions"
							:teamMember="this.team_member_profile_for_permissions"
							@update-team-member="updateTeamMember($event)"
						>
						</ViewPermissionsModal>

							<ResendTeamInviteModal
								:firstName="resend_team_member.fname"
								:lastName="resend_team_member.lname"
								:email="resend_team_member.email"
							/>

					  <DeleteTeammateModal
								@get-teammates="getTeammates"
								:teammate_id="teammate_id"
								:teammate_email="email"
							/>

					  <AddedTeammateSuccessfullyModal/>

					  <UpdatedTeammatePermissionModal/>

					  <UpdateCompanyNameModal/>

					  <AddTeamMemberModal
								:all-permissions="allPermissions"
								@add-team-member="addTeamMember($event)"
								:teammates_email="teammates_email"
								@user-email-exist="showUserEmailNotificationModal($event)"
							/>

					  <UserEmailExistNotificationModal @add-teammate="addTeamMember" :existing_user_data="existing_user_data"/>

					  <UpdateTeamMemberModal
								:all-permissions="allPermissions"
								:roles="roles"
								@update-team-member="updateTeamMember($event)"
								@update-teammate-permission="updateTeammatePermission"
								:team_member="this.onCardTeamMember"
							/>
		</div>
</template>

<script>
import Sidebar from "../components/general/Sidebar";
import Swal from "sweetalert2";
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import AddTeamMemberModal from "../components/modals/AddTeamMemberModal";
import UpdateTeamMemberModal from "../components/modals/UpdateTeamMemberModal";
import TeamCard from "../components/team/TeamCard";
import AddedTeammateSuccessfullyModal from "../components/modals/AddedTeammateSuccessfullyModal";
import DeleteTeammateModal from "../components/modals/DeleteTeammateModal";
import UpdatedTeammatePermissionModal from "../components/modals/UpdatedTeammatePermissionModal";
import UserEmailExistNotificationModal from "../components/team/modals/UserEmailExistNotificationModal";
import UpdateCompanyNameModal from "../components/index/modals/UpdateCompanyNameModal";
import TableVuePlaceHolder from "../components/general/TableVuePlaceHolder";
import ResendTeamInviteModal from "@/components/team/modals/ResendTeamInviteModal";
import TeamRolesDropdown from "@/components/team/TeamRolesDropdown";
import ViewPermissionsModal from "@/components/team/modals/ViewPermissionsModal";

export default {
 name: "teams",
	middleware:['auth','permission'],
	components: {
		ViewPermissionsModal,
		TeamRolesDropdown,
		ResendTeamInviteModal,
		TableVuePlaceHolder,
		UpdateCompanyNameModal,
		UserEmailExistNotificationModal,
		UpdatedTeammatePermissionModal,
		DeleteTeammateModal,
		AddedTeammateSuccessfullyModal,
		TeamCard, UpdateTeamMemberModal, AddTeamMemberModal, DashboardNavbar, Sidebar},
	data(){
 	 return{
				team_members:[],
				f_name: JSON.parse(localStorage.getItem('user_data')).fname,
				l_name: JSON.parse(localStorage.getItem('user_data')).lname,
				first_name: '',
				last_name: '',
				teammate_id: '',
				email: '',
				role: '',
				teammates_email:[],
				existing_user_data:'',
				selected_permission:'',
				selected_teammate_permission:[],
				show_shimmer : false,
				resend_team_member: {},
				team_member_all_permissions: [],
				team_member_profile_for_permissions: '',
				onCardTeamMember: '',
				allPermissions: [],
				roles: [],
			}
	},
	methods: {
		showModal(){
			 this.$modal.show('add-team-member-modal');
		},

		async getAllPermissions(){
			let data = await this.$utility.getAllPermissions()
			this.allPermissions = data.data
		},

		async getAllRoles(){
			let data = await this.$utility.getAllRoles()
			this.roles = data.data
		},

		addTeamMember(event){
			this.getTeammates();
			this.pushTeammateEmailToTeammateEmailArray();
			this.$modal.show('added-team-successfully-modal');
		},
		async updateTeammatePermission(){
			try {
				this.team_members = await this.$axios.$get('team');
				this.$modal.show('updated-teammate-permission-modal');
			}catch (e) {
      this.$toast.error(e.response.message);
			}
		},
		pushTeammateEmailToTeammateEmailArray(){
				this.team_members.data.forEach((teammate)=>{
					this.teammates_email.push(teammate.email)
				})
		},
		async deleteTeamMember(team_member){
			this.teammate_id = team_member.id;
			this.email = team_member.email;
   this.$modal.show('delete-teammate-modal')
		},
		showUserEmailNotificationModal(existing_user_data){
			this.email = existing_user_data.email;
			this.existing_user_data = existing_user_data;
			this.$modal.hide('add-team-member-modal');
			this.$modal.show('user-email-exist-notification-modal');
		},
		async getTeammates(){
			this.show_shimmer = true
			  try {
						this.team_members = await this.$axios.$get('team');
						this.show_shimmer = false;
					}catch (e) {

					}
		},
		updateTeamMember(row){
				this.onCardTeamMember = row
			 this.first_name = row.fname;
			 this.last_name = row.lname;
			 this.teammate_id = row.id;
			 this.email = row.email;
			 this.role = row.role;
			 this.$modal.show('update-team-member-modal');
		},
		getTeammatePermissions(event){
			 this.selected_teammate_permission = event;
		},
		async resendInvitation(team_member){
			this.resend_team_member = team_member
			this.$modal.show('resend-team-invite-modal');
		},
		viewAllPermissions({permissionsToView, teamMemberToView}){
			this.team_member_all_permissions = permissionsToView
			this.team_member_profile_for_permissions = teamMemberToView
			this.$modal.show('view-permissions-modal')
		}
	},
	async mounted() {
		await this.getAllPermissions()
		await this.getAllRoles()
		await this.getTeammates();
		await this.pushTeammateEmailToTeammateEmailArray();
	}

}
</script>

<style scoped>
.main-content {
	padding: 90px 32px 122px;
	position: relative;
	height: 100%;
}
.add-button{
	display: inline-block;
	box-sizing: border-box;
	text-align: center;
	outline: none;
	text-decoration: none;
	cursor: pointer;
	border-radius: 4px;
	font-family: inherit;
	font-size: 13.5px;
	font-weight: 600;
	padding: 11px 16px;
	border: 1px solid #2C79AF;
	background: rgb(255, 255, 255) linear-gradient(85.14deg, #365899 31.15%, #1F9AC5 100%);
	color: rgba(255, 255, 255, 1);
	transition: background 0.2s ease 0s;
	align-self: flex-start;
}
.invite-btn {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 14px 0;
}
.invite-btn p{
	padding: 0;
	margin: 0 0 0 10px;
	font-size: 15px;
	line-height: 18px;
	color: #FFFFFF;
}
.header-style{
	display: flex;
	justify-content: space-between;
	padding: 10px 20px 0 65px;
	height: 40px;
	color: #727272;
	font-weight: 600;
}

.header-name {
	width: 280px;
}
.header-permissions {
	margin-left: -40px;
}
.header-status {
	margin-right: -120px;
}

@media (max-width: 768px){
	.container-item {
	flex-direction: column;
	}
	.header-title {
		display: none;
	}
}




</style>
