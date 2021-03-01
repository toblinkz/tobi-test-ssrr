<template>
		<div class="container-fluid">
			 <div id="msb" class="col-md-2">
					  <Sidebar></Sidebar>
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
										<button class="add-button" @click="showModal">Add Teammate</button>
									</div>
							</div>
							<div class="mt-20">
								  <div class="header-style">
											 <p>Name</p>
											 <p>Permissions</p>
											 <p>Action</p>
										</div>
								  <div class="container-item" v-for="row in team_members.data" :key="row.id">
              <div style="display: flex; align-items: center; padding: 10px">
															   <div class="m-r-10" style="display:inline-block; border-radius: 50%; color: #FFFFFF; background: #B8DECD; height: 25px; text-align: center; width: 25px">{{row.fname.charAt(0)}}{{row.lname.charAt(0)}}</div>
															    <div style="display: flex; flex-direction: column;">
 																					<div style="color:  #818181; font-weight: 200">{{ row.fname }} {{row.lname}} ({{row.email}})</div>
																				<div style="color: #818181;"><span style="font-weight: bold">Role</span>: {{row.role}}</div>
																			</div>
														</div>
											   <div style="padding: 20px; margin-right: 40px; display: flex; flex-wrap: wrap" >
                 <span v-for="row in row.permissions" class="pill" >{{row}}</span>
														</div>
											   <div style="padding: 20px">
															<button class="btn btn-success" @click="updateTeamMember(row)"><i class="fa fa-edit m-r-5" ></i>Update</button>
															<button class="btn btn-danger" @click="deleteTeamMember(row.email)"><i class="icon-bin m-r-5" style="font-size: 12px" ></i>Delete</button>
														</div>
										</div>
							</div>
						</div>
					  <AddTeamMemberModal @team-member="addTeamMember($event)"></AddTeamMemberModal>
					  <UpdateTeamMemberModal @update-team-member="updateTeamMember($event)" :email="email" :first_name="first_name" :last_name="last_name" :role="role"></UpdateTeamMemberModal>
				</div>
		</div>
</template>

<script>
import Sidebar from "../components/general/Sidebar";
import Swal from "sweetalert2";
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import AddTeamMemberModal from "../components/modals/AddTeamMemberModal";
import UpdateTeamMemberModal from "../components/modals/UpdateTeamMemberModal";
export default {
 name: "teams",
	middleware:'auth',
	components: {UpdateTeamMemberModal, AddTeamMemberModal, DashboardNavbar, Sidebar},
	data(){
 	 return{
 	 	 team_members:[],
						f_name: JSON.parse(localStorage.getItem('user_data')).fname,
						l_name: JSON.parse(localStorage.getItem('user_data')).lname,
						first_name: '',
						last_name: '',
						email: '',
				  role: ''

			}
	},
	methods: {
		showModal(){
			 this.$modal.show('add-team-member-modal');
		},
		addTeamMember(event){
			 this.team_members.push(event);
		},
		async deleteTeamMember(email){
			let index = this.team_members.indexOf(email);
			await Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then(async (result) => {
				 if (result.value){
						this.team_members.splice(index, 1);
					}
			})
		},
		async getTeammates(){
			  try {
						 let data = await this.$axios.$get('team');
						 console.log(data);
						 this.team_members = data
					}catch (e) {

					}
		},
		updateTeamMember(row){
			 this.first_name = row.first_name;
			 this.last_name = row.last_name;
			 this.email = row.email;
			 this.role = row.role;
			 this.$modal.show('update-team-member-modal');
		}
	},
	mounted() {
 	this.getTeammates();
	}
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
	border: 0.5px solid #D3D3D3;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	background: rgb(255, 255, 255);
	min-height: 63px;
	color: #727272;
font-weight: 600;
}
.container-item{
	display: flex;
	justify-content: space-between;
	border: 0.5px solid #D3D3D3;
	border-top: 0;
	line-height: 24px;
	min-height: 63px;
	background: #F8F8F8;
}
.pill {
	font-size: 13px;
	padding: 2px 10px;
	margin: 2px 2px;
	border-radius: 20px;
	font-weight: 500;
	background: #E5E5E5;
	color: #333333;
}
</style>
