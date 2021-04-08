<template>
	<modal name="user-email-exist-notification-modal" height="auto" width="500" >
		<div  style="display: block;
    padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div  class="success-card-position main-card" >
						<center>
							<div class="mt-20 mb-10">
								<img src="/images/info.svg" width="150px" height="150px" />
							</div>
						</center>
						<div style="text-align: center;">
							<p class="m-t-5" style="padding-right: 20px; padding-left: 20px">An account with this email address: <b>{{existing_user_data.email}}</b> already exist, by clicking on the continue button, the existing account would be merged and move to this team.</p>
							<div class="mb-20" >
								<a  @click="close"  class="btn btn-danger mt-20 m-r-20">
									Cancel
								</a>
								<a @click="addTeammate"  class="btn btn-primary mt-20">
									{{ button_text }}
									<span v-show="isLoading">
														<img src="/images/spinner.svg" height="20px" width="30px"/>
												</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
export default {
name: "UserEmailExistNotificationModal",
data(){
		return{
			button_text: "Yes, Continue",
			isLoading: false
		}
	},
	props: {
		existing_user_data:{
 		required: true
		}
	},
	methods:{
		close() {
			this.$modal.hide('user-email-exist-notification-modal');
		},
		async addTeammate(){
			 try {
					this.isLoading = true;
					await this.$teams.addTeammate(this.existing_user_data.first_name, this.existing_user_data.last_name,
					this.existing_user_data.email, this.existing_user_data.role, this.existing_user_data.permission);
					this.isLoading = false;
					this.$modal.hide('user-email-exist-notification-modal');
					this.$emit('add-teammate');
				}catch (e) {
					this.isLoading = false;
					let errors = e.response.data;
					if(e.response.status === 422){
						this.$error.handle422Errors(errors);
					}else{
						this.$error.handleOtherErrors(errors);
					}
				}
		}
	}
}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";
</style>
