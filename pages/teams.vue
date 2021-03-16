<template>
		<div class="container-fluid">
			 <div id="msb" class="col-md-2">
					  <Sidebar class="hidden-xs"></Sidebar>
				</div>
			 <div class="col-md-10">
					 <DashboardNavbar></DashboardNavbar>
					 <div class="main-content">
							<div style="display: flex; flex-direction: row; justify-content: space-between">
										<div style="display: flex; flex-direction: column">
											<div style="font-size: 20px; font-weight: bold"> <i class="entypo-users  m-r-5" style="font-size: 20px"></i> Team </div>
											<p style="font-size: 13.5px!important;">Here is a list of your teammates currently on {{f_name}} {{l_name}}</p>
										</div>
									<div>
										<a class="btn bg-blue" @click="showModal">Add Teammate</a>
									</div>
							</div>
							<div class="mt-20">
								  <div class="header-style">

												<p class="header-title">Name</p>
												<p class="header-title">Permissions</p>
												<p class="header-title">Action</p>

										</div>
								<div class="m-l-10 " style="border-bottom: dotted #ddd!important;"></div>
								  <div v-for="team_member in team_members.data">
											<team-card :team_member="team_member" @team-member-permissions="getTeammatePermissions($event)" @update-team-member="updateTeamMember($event)" @delete-team-member="deleteTeamMember($event)"></team-card>
										</div>

							</div>
						</div>
					  <DeleteTeammateModal @get-teammates="getTeammates" :teammate_id="teammate_id" :teammate_email="email"></DeleteTeammateModal>
					  <AddedTeammateSuccessfullyModal></AddedTeammateSuccessfullyModal>
					  <AddTeamMemberModal @add-team-member="addTeamMember($event)" ></AddTeamMemberModal>
					  <UpdateTeamMemberModal @update-team-member="updateTeamMember($event)" @update-teammate-permission="updateTeammatePermission" :teammate_id="teammate_id" :email="email" :first_name="first_name" :selected_teammate_permission="selected_teammate_permission" :last_name="last_name" :role="role" ></UpdateTeamMemberModal>
				</div>
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
export default {
 name: "teams",
	middleware:['auth', 'permission'],
	components: {
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
				  selected_permission:'',
			  	selected_teammate_permission:[]

			}
	},
	async asyncData({$axios}){
		try {
			const team_members = await $axios.$get('team');
			return {team_members: team_members}
		}catch (e) {

		}
	},
	methods: {
		showModal(){
			 this.$modal.show('add-team-member-modal');
		},
		addTeamMember(event){
			this.getTeammates();
			this.$modal.show('added-team-successfully-modal');
		},
		async updateTeammatePermission(){
			try {
				this.team_members = await this.$axios.$get('team');
				this.$toast.success('updated successfully')
			}catch (e) {
      this.$toast.error(e.response.message);
			}

		},
		async deleteTeamMember(team_member){
			this.teammate_id = team_member.id;
			this.email = team_member.email;
   this.$modal.show('delete-teammate-modal')
		},
		async getTeammates(){
			  try {
						this.team_members = await this.$axios.$get('team')
					}catch (e) {

					}
		},
		updateTeamMember(row){
			 this.first_name = row.fname;
			 this.last_name = row.lname;
			 this.teammate_id = row.id;
			 this.email = row.email;
			 this.role = row.role;
			 this.$modal.show('update-team-member-modal');
		},
		getTeammatePermissions(event){
			 this.selected_teammate_permission = event;
		}
	},

}
</script>

<style scoped>
.main-content {
	padding: 150px 32px 122px;
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
.header-style{
	display: flex;
	justify-content: space-between;
	padding: 20px 50px 10px 50px;
	min-height: 63px;
	color: #727272;
font-weight: 600;
}
@media (max-width: 768px){
	.container-item {
	flex-direction: column;
	}
}
@media (max-width: 768px){
	.header-title {
		display: none;
	}
}



</style>
