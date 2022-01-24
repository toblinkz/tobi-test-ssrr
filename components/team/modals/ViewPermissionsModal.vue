<template>
<modal name="view-permissions-modal" height="auto" width="502px">
	<div v-for="row in permissions">
		<h3 class="m-b-10" style="font-weight: bold;
												font-size: 14px;
												line-height: 16px;
												color: #333333;"
		>
			{{row.name}}
		</h3>
		<div class="checkboxes" v-for="member in row.permission">
			<div class="pill">
		{{ member.name.replace(/_/g, " ") }}
			</div>
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
			// all_permissions:[],
			// select_all_permission: false,
			// teammates_permissions:[],
			// selected_permission:[],
			// all_permissions_id:[],
		}
	},
	props:{
		// permissions: {type: Array},
		teammates_permissions: {type: Array},
		selected_teammate_permission:{required: true},
	},
	methods: {
		async getPermissions(){
			try {
				let data = await this.$axios.$get('utility/permission');
				this.permissions = data.data;
			}catch (e) {}
		},
	},
	async mounted() {
		let data = await this.$axios.$get('utility/permission');
		this.permissions = data.data;
	}
}
</script>

<style scoped>
.pill {
	font-size: 13px;
	padding: 2px 10px;
	margin: 3px 2px;
	border-radius: 20px;
	font-weight: 500;
	background: #E5E5E5;
	color: #333333;
}
</style>
