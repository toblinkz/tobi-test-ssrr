<template>
		<modal name="send-template-sample-modal" height="auto">
			<div   style="display: block; padding-left: 9px;">
				<div class="modal-header">
					<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" style="font-weight: bold">Send Template Sample</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<div>
							<label>Template Name</label>
							<input type="text" v-model="template_name" placeholder="Product OTP" class="form-control"/>
						</div>
						 	<div class="mt-20">
									<label>Categories</label>
									 <select v-model="selected_category" class="form-control">
											 <option v-for="category in templates_categories" :value="category">{{ category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " ")}}</option>
										</select>
								</div>
						<div class="mt-20">
							<label>Language</label>
							<select v-model="selected_language"  class="form-control" >
								<option v-for="language in templates_languages" :value="language.code">{{language.language}}</option>
							</select>
						</div>
						<div class="mt-20">
							<label>Template Sample</label>
							 <input type="text" v-model="template_sample" placeholder="Your <%product_name%> verification code is <%otp%>. Expires in <%time_in_minutes%>" class="form-control"/>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<a   @click="sendTemplateSample" class="btn btn-primary">
						  {{send_button_text}}
						<span v-show="isLoading" >
								<img src="/images/black_spinner.svg" height="20px" width="30px"/>
						</span>
					</a>
				</div>
			</div>
		</modal>
</template>

<script>
export default {
name: "SendTemplateSampleModal",
props: {
	 device_id:{
	 	 required: true
		}
},
data(){
	return{
  templates_categories:[],
		templates_languages:[],
		selected_category:'account_update',
		selected_language:'af',
		send_button_text: 'Send',
		isLoading: false,
		template_sample: '',
		template_name:''
	}
},
methods:{
	close(){
		 this.$modal.hide('send-template-sample-modal');
	},
	async getTemplatesCategories(){
		this.templates_categories = await this.$device.getTemplatesCategories(this.device_id)

	},
	async getTemplatesLanguages(){
		this.templates_languages = await this.$device.getTemplatesLanguages(this.device_id);
	},


	async sendTemplateSample(){
		this.send_button_text = '';
		this.isLoading = true;
				try {
					await this.$device.sendTemplateSample(this.device_id, this.template_name, this.selected_category, this.selected_language, this.template_sample);
					this.send_button_text = 'Send';
					this.isLoading = false;
					this.close();
				}catch (e) {
					let errors = e.response.data;
					(e.response.status === 422) ? this.$error.handle422Errors(errors) : this.$error.handleOtherErrors(errors);
					this.send_button_text = 'Send';
					this.isLoading = false;
				}
	},



},
	mounted() {
	  this.getTemplatesCategories();
	  this.getTemplatesLanguages();
	}

}
</script>

<style scoped>
@import "../../assets/css/modal/modal.css";
</style>
