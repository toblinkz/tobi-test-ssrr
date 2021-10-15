<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
			<div class="mt-50">
				<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Set Up Your account </p>
				<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here's a quick guide to setting up your account</p>
				<div class="m-l-20 mt-50">
					<img src="/images/stepper/guide_two.svg" />
				</div>
			</div>
		</div>

		<div  class="flex-item-right" style="padding: 0 30px">
			<div>
				<div class="mt-50" style="background-color: #f5f5f5;border-color: #efefef; padding: 15px; border-radius: 5px">
					<p style="font-weight: 700;">Step 2 of 3: Request Sender ID</p>
				</div>

				<form  method="post"   >
					<div class="mt-20">
						<div class="form-group">
							<div class="mt-20">
								<label>Sender ID For Sms</label>
								<input type="text" v-model="sender_id" class="form-control" placeholder="e.g. Termii (Ensure your ID is not more than 9 characters)"  >
								<span class=" error_field_message" v-if="error_message.sender_id">{{error_message.sender_id}}</span>
							</div>
							<div class="mt-20">
								<label>Company</label>
								<input type="text" v-model="company" class="form-control"  placeholder="e.g. Termii" >
								<span class=" error_field_message" v-if="error_message.company">{{error_message.company}}</span>
							</div>
							<div class="mt-20">
								<label>Use Case</label>
								<textarea type="text" v-model="usecase" class="form-control" rows="3"  placeholder="e.g. Hello dear is a sample of the message you will be sending with Termii"  ></textarea>
								<span class=" error_field_message" v-if="error_message.usecase">{{error_message.usecase}}</span>
							</div>
							<div class="mt-30">
								<p><b>NB:</b> Sender ID registration are approved only on weekdays and takes 24 - 48 hours to activate across all telcos in your country.</p>
							</div>
							<div class="mt-30">
								<a class="bg-blue"  @click="requestSenderId">
									{{request_button_text}}
									<span v-show="isLoading" >
															<img src="/images/black_spinner.svg" height="20px" width="30px"/>
													</span>
								</a>
							</div>
						</div>
					</div>
				</form>
				<div class="mt-100">
					<span style="font-weight: 700; cursor: pointer; color: #365899;" class="text-left" @click="showSelectService">Back</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SenderIdComponent",
	watch: {
		sender_id(value){
			this.sender_id = value;
			this.validateSenderId(value);
		},
	},
	data(){
		return{
			request_button_text: 'request',
			isLoading: false,
			sender_id: '',
			usecase:'',
			company:'',
			hasSenderIdError: false,
			hasCompanyError: false,
			hasUseCaseError: false,
			error_message: [],
		}
	},

	methods:{
		validateSenderId(value) {
			if (value.length < 3){
				this.error_message['sender_id'] = 'The sender id must be at least 3 characters.';
				this.hasSenderIdError = true;
			}else if (value.length > 11) {
				this.error_message['sender_id'] = 'The sender id may not be greater than 11 characters.';
				this.hasSenderIdError = true;
			}
			else {
				this.error_message['sender_id'] = '';
				this.hasSenderIdError = false;

			}
		},
		close(){
			this.$modal.hide('signup-wizard-modal');
		},

		showSelectService(){
			this.$emit('showSelectService');
		},

		async	requestSenderId()	{
			try {
				this.request_button_text = '';
				this.isLoading = true;
				await this.$sms.requestSenderId(this.sender_id, JSON.parse(localStorage.getItem('user_data')).country, this.usecase, this.company);
				this.$emit('showVirtualAccountSetup');
			}catch (e) {
				this.request_button_text = 'request';
				this.isLoading = false;
				let errors = e.response.data.errors;
				for (let key in errors) {
					switch (key){
						case('name'):{
							errors[key].forEach(err => {
								this.error_message['sender_id'] = err;
								this.hasSenderIdError = true;

							});
							break;
						}
						case ('company'):{
							errors[key].forEach(err => {
								this.error_message['company'] = err;
								this.hasCompanyError = true;

							});
							break;
						}
						case ('usecase'):{
							errors[key].forEach(err => {
								this.error_message['usecase'] = err;
								this.hasUseCaseError = true;

							});
							break;
						}
					}

				}
			}
		},

	},
}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
