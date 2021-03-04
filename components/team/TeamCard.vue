<template>

		<div class="container-item">
			<div style="display: flex; flex: 2; align-items: center; padding: 10px">
				<div class="m-r-10" style="display:inline-block; border-radius: 50%; color: #FFFFFF; background: #B8DECD; height: 25px; text-align: center; width: 25px">{{team_member.fname.charAt(0)}}{{team_member.lname.charAt(0)}}</div>
				<div style="display: flex; flex-direction: column;">
					<div style="color:  #818181; font-weight: 200">{{ team_member.fname }} {{team_member.lname}} ({{team_member.email}})</div>
					<div style="color: #818181;"><span style="font-weight: bold">Role</span>: {{team_member.role}}</div>
				</div>
			</div>
			<div style="padding: 20px; flex: 2; margin-right: 40px; display: flex; flex-wrap: wrap" >
				<span v-for="row in team_member.permissions.slice(0, 5)"  class="pill" >{{row.name.replace(/_/g, " ")}}</span>

			</div>
			<div style="padding: 20px;">
				<button class="btn btn-success" @click="updateTeamMember(team_member)"><i class="fa fa-edit m-r-5" ></i>Update</button>
				<button class="btn btn-danger" @click="deleteTeamMember(team_member.id)"><i class="icon-bin m-r-5" style="font-size: 12px" ></i>Delete</button>
			</div>
		</div>
</template>

<script>
export default {
name: "TeamCard",
	props:{
	  team_member:{
			},
	},
	methods:{
	  updateTeamMember(row)	{
	  	 this.$emit('update-team-member', row);
	  	 this.$emit('team-member-permissions', this.team_member.permissions)
			},
		deleteTeamMember(id)	{
			this.$emit('delete-team-member', id)
		}
	}
}
</script>

<style scoped>
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
