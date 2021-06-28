<template>
	<modal name="token-reminder-modal" height="auto" width="500" >
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
								<img src="/images/info.svg" width="150px" height="150px"/>
								<p class="" style="font-weight: bolder;">Oops!</p>
								<div>Your Token is about to expire</div>
								<a  @click="close"  class="btn bg-blue mt-20">
									OK
								</a>
							</div>
						</center>
					</div>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
export default {
	name: "TokenReminderModal",
	methods:{
		 async close(){
		 	try {
					let data = await this.$axios.$get('auth/refresh/token');
					await localStorage.setItem('local', data.access_token);
					await location.reload();
				}catch (e) {

				}

			}
	}
}
</script>

<style scoped>
@import "../../assets/css/modal/modal.css";
</style>
