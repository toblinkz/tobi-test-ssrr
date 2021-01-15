<template>
	<div class="email-card" >
		<div class="col-md-10" style="padding: 5px">
			<span style="font-weight: 600;">{{ email }}</span>

			<div>
				<span>Categories:</span>
				<div v-for="row in categories">
					<span style="font-size: 12px">{{row.category}}</span>
				</div>
			</div>

		</div>

		<div class="col-md-2">
			<i @click="deleteEmail" class="fa fa-pencil" style="cursor: pointer; color:#1E88E5; margin-right: 4px"></i>
			<i @click="deleteEmail" class="fa fa-minus-circle" style="cursor: pointer; color: red;"></i>

		</div>

	</div>
</template>

<script>
export default {
name: "EmailCard",
	props: {
			email:{

			},
		categories: {

		}
	},
	methods: {
		async	deleteEmail(){
			try{
				await this.$axios.$delete('user/notification/email', {
					params:{
						email: this.email
					}
				});
				this.$emit("deletedEmail", this.email);
				this.$toast.success("Deleted successfully");
			}catch (e) {

			}

			},

	},


}
</script>

<style scoped>
.email-card{
	padding: 10px 10px;
	border-width: 1px;
	border-radius: 8px;
	margin-bottom: 5px;
	/*background-color: white;*/
	display: flex;
	box-shadow: 0 10px 45px 0 rgba(0,0,0,.07);
	/*box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);*/
	/*box-shadow: 0 10px 45px 0 rgb(0 0 0 / 5%);*/
}
</style>
