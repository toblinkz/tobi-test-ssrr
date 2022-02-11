<template>
	<div class="mt-20 card-container">
		<div class="profile">
			<div class="profile-icon m-r-10">{{ team_member.fname.charAt(0) }}{{ team_member.lname.charAt(0) }}</div>
			<div class="profile-name">
				<div style="font-weight: 200; word-break: break-word">{{ team_member.fname }} {{ team_member.lname }}
					({{ team_member.email }})
				</div>
				<div><span style="font-weight: bold">Role</span>: {{ team_member.role }}</div>
			</div>
		</div>

		<div class="permissions-list">
			<span v-if="!team_member.is_main"
									v-for="row in team_member.permissions.slice(0,5)"
									class="pill"
			>
				{{ row.name.replace(/_/g, " ") }}
			</span>
			<span class="pill all_permission" v-if="team_member.is_main">All Permissions</span>
			<div class="m-l-5 m-t-5">
				<a v-show="team_member.permissions.length > 5 && !team_member.is_main" @click="viewPermissionsModal">View more</a>
			</div>
		</div>

		<div class="team-member-status"
							:class="{
										'team-member-pending': team_member.active_status_id.name === 'Pending',
										'make-opaque': team_member.is_main
							}"
		>
			{{ team_member.active_status_id.name }}
		</div>

		<div
			class="action"
			:class="{'make-opaque': team_member.is_main}"
			v-click-outside="closeMenu"
		>
			<img src="/images/icons/svg_icons/overflow-menu-vertical.svg" alt="" @click="toggleMenu">

			<div class="menu" v-if="isMenuOpen && !team_member.is_main">
				<div class="menu-option" v-if="team_member.active_status_id.name !== 'Pending'"
									@click="updateTeamMember(team_member)">
					<img src="/images/icons/svg_icons/update-icon.svg" alt="">
					<p>Update permissions</p>
				</div>

				<div class="menu-option" v-if="team_member.active_status_id.name === 'Pending'"
									@click="resendInvitation(team_member)">
					<img src="/images/icons/svg_icons/resend-icon.svg" alt="">
					<p>Resend invitation</p>
				</div>

				<div class="menu-option remove-teammate" @click="deleteTeamMember(team_member)">
					<img src="/images/icons/svg_icons/delete-icon.svg" alt="">
					<p>Remove teammate</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import permission from "@/middleware/permission";
import ClickOutside from "vue-click-outside";

export default {
	name: "TeamCard",
	data() {
		return {
			isMenuOpen: false,
			permissionsList: [],
			cleanedUpTeamMemberPermissions: []
		}
	},
	props: {
		allPermissions: {
			type: Array
		},
		team_member: {},
	},
	methods: {
		viewPermissions(team_member) {
			team_member.permissions.forEach((permission) => {
				this.permissionsList.push(permission.name.replace(/_/g, " "))
			})
			console.log(this.permissionsList)
		},
		updateTeamMember(row) {
			this.isMenuOpen = false
			this.$emit('update-team-member', row);
			// this.$emit('team-member-permissions', this.team_member.permissions)
		},
		deleteTeamMember(id) {
			this.isMenuOpen = false
			this.$emit('delete-team-member', id)
		},
		resendInvitation() {
			this.isMenuOpen = false
			this.$emit('resend-invitation', this.team_member);
		},
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
		closeMenu() {
			this.isMenuOpen = false
		},

		viewTeamMemberPermissions() {
			let teamMemberPermissionsIDs = this.team_member.permissions

			let cleanedUpTeamMemberPermissions = []
			this.allPermissions.forEach((categoryPermission) => {
				let singleCategoryPermission = {}
				singleCategoryPermission.name = categoryPermission.name
				singleCategoryPermission.permissionsList = []

				categoryPermission.permission.forEach((permission) => {
					teamMemberPermissionsIDs.forEach((teamMemberPermission) => {
						if (permission.id === teamMemberPermission.id) {
							singleCategoryPermission.permissionsList.push(permission)
						}
					})
				})

				if (singleCategoryPermission.permissionsList.length > 0) {
					cleanedUpTeamMemberPermissions.push(singleCategoryPermission)
				}
			})

			this.cleanedUpTeamMemberPermissions = cleanedUpTeamMemberPermissions
		},

		viewPermissionsModal() {
			this.$emit('view-team-member-permissions',
				{permissionsToView: this.cleanedUpTeamMemberPermissions, teamMemberToView: this.team_member})
			this.$modal.show('view-permissions-modal');
		},
	},

	directives: {
		ClickOutside
	},
	async mounted() {
		await this.viewTeamMemberPermissions()
	}
}
</script>

<style scoped>

.card-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15px 30px;
	border-width: 1px;
	border-radius: 8px;
	margin-bottom: 10px;
	*background-color: white;
	line-height: 24px;
	min-height: 80px;
	box-shadow: 0 10px 45px 0 rgba(0, 0, 0, .1);
}

.profile {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.profile-icon {
	display: inline-block;
	border-radius: 50%;
	color: #FFFFFF;
	background: #B8DECD;
	height: 25px;
	text-align: center;
	width: 25px;
}

.profile-name {
	display: flex;
	flex-direction: column;
	width: 270px;
	color: #818181;
}

.permissions-list {
	padding: 0;
	/*flex: 2;*/
	margin-left: -60px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	width: 380px;
}

.pill {
	font-size: 13px;
	padding: 2px 10px;
	margin: 3px 2px;
	border-radius: 20px;
	font-weight: 500;
	background: #E5E5E5;
	color: #333333;
}

.all_permission {
	/*margin-left: -50px!important;*/
	align-self: center;
}

@media (max-width: 768px) {
	.all_permission {
		margin-left: 0 !important;
	}
}

.team-member-status {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	text-align: left;
	margin-left: -50px;
}
.make-opaque {
	opacity: 0;
	cursor: default!important;
}

.team-member-pending {
	color: #BC5360;
}

.action {
	cursor: pointer;
}

.menu {
	position: absolute;
	right: 60px;
	width: 200px;
	background: #FFFFFF;
	box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	z-index: 10;
}

.menu-option {
	width: 100%;
	vertical-align: middle;
	padding: 16px 20px;
	margin: 0;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	transition: all 0.2s ease-out;
	text-decoration: none;
}

.menu-option p {
	margin: 0 0 0 10px;
	vertical-align: middle;
	text-decoration: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: #333333;
}

.menu-option:hover {
	background-color: #d5d5d5;
	border-radius: 4px;
}

.menu-option.remove-teammate {
	border-top: 1px solid #F4F4F4;
}

.menu-option.remove-teammate p {
	color: #C10202;
}

</style>
