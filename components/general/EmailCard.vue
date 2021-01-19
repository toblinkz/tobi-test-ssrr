<template>
	<div class="email-card mt-20" >
		<div class="" style="padding: 5px; width: 40%">
			<span style="display: flex"><i class="entypo-chat chat-color"></i><span style="margin-left: 5px; margin-top: -3px">{{ email }}</span> </span>
		</div>
		<div class="" style="width: 30%;">
			<div v-for="row in categories" class="mb-10">
				<span style="font-size: 13px" class="label label-category ">{{row.category}}</span>
			</div>
		</div>
		<div class="" style="width: 30%;">
			  <div style="float: right">
						<button class="btn btn-success" @click="updateEmail"><i class="fa fa-edit m-r-5"></i>Update</button>
						<button class="btn btn-danger" @click="deleteEmail"><i class="icon-bin m-r-5" style="font-size: 12px"></i>Delete</button>
					</div>
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
		updateEmail(){
			this.$emit('updateEmail', this.email);
			this.$emit('categories', this.categories)
		}

	},


}
</script>

<style scoped>
.email-card{
	padding: 20px 10px;
	border-width: 1px;
	border-radius: 8px;
	margin-bottom: 5px;
	/*background-color: white;*/
	display: flex;
	box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);
}
.label-category {
	background: #E5E5E5;
	border-radius: 8px;
	color: #333333;

}
.label {
	font-size: 11px;
	padding: 2px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 500;
}
.chat-color{
	color: #2D74AC!important;
}
</style>
