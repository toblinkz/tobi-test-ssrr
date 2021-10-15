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
					<p style="font-weight: 700;">Step 2 of 3: Request Device ID</p>
				</div>
		<div class="form-group mt-50">
			<label>ID (For WhatsApp)</label>
			<input type="text" class="form-control" v-model="device_id" placeholder="eg. Termii (Ensure your ID is not more than 9 characters)"  :class="{'error' : hasDeviceIdError}">
			<span class=" error_field_message" v-if="error_message.device_id">{{error_message.device_id}}</span>
			<br><br>
			<strong>NB:</strong> Only logistics, financial, health and agric technology companies are allowed to use these IDs. If you need to test the WhatsApp API without an approved ID, please make use of your test API keys and  our default ID - <strong>"TID"</strong>
		</div>
		<div class="mt-30">
			<a class="bg-blue"  @click="requestDeviceId">
				{{request_button_text}}
				<span v-show="isLoading" >
						<img src="/images/black_spinner.svg" height="20px" width="30px"/>
				</span>
			</a>
		</div>
				<div style="position: absolute; bottom: 50px;">
					<span style="font-weight: 700; cursor: pointer; color: #365899;" class="text-left" @click="showSelectService">Back</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
name: "DeviceIdComponent",
	data(){
		return{
			device_id:"",
			request_button_text: 'request',
			isLoading: false,
			error_message:[],
			hasDeviceIdError: false
		}
	},
	computed: {
		isDisabled: function (){
			return (this.device_id === '');
		},
	},
	watch:{
		device_id(value){
			this.device_id = value;
			this.validateDeviceId(value)
		}
	},
	methods: {
		showSelectService(){
			this.$emit('showSelectService');
		},

		async requestDeviceId(){
			this.request_button_text = '';
			this.isLoading = true;
			try {
				await this.$axios.post('devices', {
					name: this.device_id
				}, )
				this.$emit('showVirtualAccountSetup');

			} catch (e) {
				this.request_button_text = 'request';
				this.isLoading = false;
				let errors = e.response.data.errors;
				for (let key in errors) {
					errors[key].forEach(err => {
						this.error_message['device_id'] = err;
						this.hasDeviceIdError = true;
					});

				}

			}
		},
		resetForm(){
			this.device_id = "";
			this.error_message['device_id'] = '';
			this.hasDeviceIdError = false;
		},
		validateDeviceId(value){
			if (value.length < 3 ){
				this.error_message['device_id'] = 'The device id must be at least 3 characters.';
				this.hasDeviceIdError = true;
			} else if (value.length > 11) {
				this.error_message['device_id'] = 'The device id may not be greater than 11 characters.';
				this.hasSenderIdError = true;
			}else {
				this.error_message['device_id'] = '';
				this.hasDeviceIdError = false;
			}

		}
	}
}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
