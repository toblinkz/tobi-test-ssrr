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
											<p style="font-size: 13.5px!important;">Here is a list of your teammates currently on Termii</p>
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
								  <div class="container-item" v-for="row in team_members" :key="row.id">
              <div style="display: flex; align-items: center; padding: 10px">
															   <div class="m-r-10" style="display:inline-block; border-radius: 50%; color: #FFFFFF; background: #B8DECD; height: 25px; text-align: center; width: 25px">TB</div>
															    <div style="display: flex; flex-direction: column;">
 																					<div style="color:  #818181; font-weight: bold">{{ row.name }} ({{row.email}})</div>
																				<div style="color: #818181;"><span style="font-weight: bold">Role</span>: {{row.role}}</div>
																			</div>
														</div>
											   <div style="padding: 20px; margin-right: 40px" >
                 <span v-for="row in row.permissions" class="pill">{{row}}</span>
														</div>
											   <div style="padding: 20px">
															<button class="btn btn-success"><i class="fa fa-edit m-r-5"></i>Update</button>
															<button class="btn btn-danger" @click="deleteTeamMember(row.email)"><i class="icon-bin m-r-5" style="font-size: 12px" ></i>Delete</button>
														</div>
										</div>
							</div>
						</div>
					  <AddTeamMemberModal @team-member="addTeamMember($event)"></AddTeamMemberModal>
				</div>
		</div>
</template>

<script>
import Sidebar from "../components/general/Sidebar";
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import AddTeamMemberModal from "../components/modals/AddTeamMemberModal";
export default {
 name: "teams",
	middleware:'auth',
	components: {AddTeamMemberModal, DashboardNavbar, Sidebar},
	data(){
 	 return{
 	 	 team_members:[{ name: 'Taiwo Bakare', email: 'taiwobakare@temii.com', role: 'Customer success', permissions:['Billing', 'Numbers', 'Contacts','Webhook' ]},
						{name: 'Tobi Bakare', email: 'taiwobakare@temii.com', role: 'Customer success', permissions:['Billing', 'Numbers' ]}]
			}
	},
	methods: {
		showModal(){
			 this.$modal.show('add-team-member-modal');
		},
		addTeamMember(event){
			 this.team_members.push(event);
		},
		deleteTeamMember(email){
   let index = this.team_members.indexOf(email);
   this.team_members.splice(index, 1);
		}
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
