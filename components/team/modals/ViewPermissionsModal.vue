<template>
<modal name="view-permissions-modal" height="auto" width="502px">
	<div style="display: flex; flex-direction: column">
		<div class="view-teammate-permissions-modal-header">
			<h4 class="view-teammate-permissions-modal-title">Add a teammate</h4>
			<img src="/static/images/icons/svg_icons/close-icon-round.svg" alt="" class="close-icon" @click="closeModal">
		</div>

		<div class="all-permissions-body-container">
			<p style="margin-bottom: 20px; width: 100%">These are the permissions assigned to this teammate’s account</p>
			<div style="margin: 10px 0 0" v-for="row in allPermissions">
				<h3 class="m-b-10" style="font-weight: bold;
												font-size: 14px;
												line-height: 16px;
												color: #333333;"
				>
					{{row.name}}
				</h3>
				<div class="category-permissions-container">
					<div class="pill" v-for="member in row.permissionsList">
							{{ member.name.replace(/_/g, " ") }}
					</div>
				</div>

			</div>
		</div>

		<div class="view-teammate-permissions-modal-footer">
			<a class="edit-btn border-gradient" @click="updatePermissions">
				{{btn_text}}
			</a>
		</div>

	</div>

</modal>
</template>

<script>
export default {
	name: "ViewPermissionsModal",
	data(){
		return{
			permissions:[],
			btn_text: 'Edit permissions'
		}
	},
	props:{
		allPermissions:{required: true, type: Array},
		teamMember: {}
	},
	methods: {
		closeModal() {
			this.$modal.hide('view-permissions-modal');
		},
		async getPermissions(){
			try {
				let data = await this.$axios.$get('utility/permission');
				this.permissions = data.data;
			}catch (e) {}
		},
		updatePermissions(row) {
			this.$modal.hide('view-permissions-modal')
			// this.$modal.show('update-team-member-modal');
			this.$emit('update-team-member', this.teamMember);
		}
	},
	async mounted() {
		let data = await this.$axios.$get('utility/permission');
		this.permissions = data.data;
	}
}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";

.view-teammate-permissions-modal-header {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	border-bottom: 1px solid #E7E7E7;
}

.view-teammate-permissions-modal-header h4 {
	padding: 0;
	font-weight: bold;
}

.view-teammate-permissions-modal-title {
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

.all-permissions-body-container {
	padding: 20px 30px;
	position: relative;
}

.category-permissions-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.pill-row {
	display: flex;
	flex-direction: row;
	/*flex-wrap: wrap;*/
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


.view-teammate-permissions-modal-footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 40px 0;
}
.view-teammate-permissions-modal-footer .edit-btn {
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: #333333!important;
	text-decoration: none;
	/*border: 1px solid #1F9AC5;*/
	border-radius: 4px;
	width: 154px;
	height: 38px;
	border: double 1px transparent;
	background-image: linear-gradient(white, white), linear-gradient(to top, #365899, #1F9AC5);
	background-origin: border-box;
	background-clip: content-box, border-box;
}

</style>
