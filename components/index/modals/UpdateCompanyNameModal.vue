<template>
	<modal name="update-company-name-modal" height="auto" width="500" :resizable="true" >
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" style="font-weight: bold" >Update</h4>
					</div>
					<div class="modal-body">
						<p class="alert insight toke" style="border-radius: 10px; padding: 5px">
							<span >Kindly Update your company name.<br>
						</span>
						</p>
						<form @submit.prevent="updateCompanyName">
							<div class="form-group">
								<label>Company Name</label>
								<input type="text" class="form-control" v-model="company_name" :class="{'error ' : hasCompanyNameError}" placeholder="Company name">
								<span class=" error_field_message" v-if="error_message">{{error_message}}</span>
								<br>

								<br>
							</div>
							<div class="mt-20 mb-20">
								<center>
									<a  class="btn id-btn-primary" :aria-disabled="isDisabled" type="submit">
										{{button_text }}
										<span v-show="isLoading" >
															<img src="/images/black_spinner.svg" height="25px" width="35px"/>
													</span>
									</a>
								</center>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
export default {
name: "UpdateCompanyNameModal",
data(){
	 return{
	 	  company_name: '',
			  button_text: 'Update',
			  isLoading: false,
			  error_message: '',
			  hasCompanyNameError: false

		}
},
watch:{
	 company_name(value){
	 	 this.validateCompanyName(value);
		}
},
computed:{
	isDisabled: function () {
		return ( this.hasCompanyNameError || this.company_name === '');
	},
},
methods:{
	 close(){
	 	 this.$modal.hide('update-company-name-modal');
		},
	 validateCompanyName(company_name)	{
			if (company_name === ""){
				this.error_message = 'The company name field is required';
				this.hasCompanyNameError = true;
			} else {
				this.error_message = '';
				this.hasCompanyNameError = false;
			}
		},
	async updateCompanyName(){
     try {
     	   this.button_text = '';
									this.isLoading = true;
						   await this.$user.updateCompanyName(this.company_name);
						   await this.fetchAndSoreLoggedInData();
						   this.$toast.success('Updated successfully');
									this.button_text = 'Update';
									this.isLoading = false;
									this.close();
						   location.reload();
					}catch (e) {
						this.button_text = 'Update';
						this.isLoading = false;
						let errors = e.response.data;
						if(e.response.status === 422){
							this.$error.handle422Errors(errors)
						}else{
							this.$error.handleOtherErrors(errors)
						}
					}
		},
	async fetchAndSoreLoggedInData(){
		let data = await this.$user.getLoggedInUserData()
		localStorage.setItem('user_data', JSON.stringify(data.data));
	},
}
}
</script>

<style  scoped src="@/assets/css/modal/modal.css";>

</style>
