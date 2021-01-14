<template>
	<div class="email-card" >
		<div class="col-md-11" style="padding: 5px">
			{{ email }}
		</div>
		<div class="col-md-1">
			<i @click="deleteEmail" class="fa fa-minus-circle" style="cursor: pointer; color: red"></i>
		</div>

	</div>
</template>

<script>
export default {
name: "EmailCard",
	props: {
			email:{

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
