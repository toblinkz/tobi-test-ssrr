<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
			<div class="mt-50">
				<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Set Up Your account </p>
				<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here's a quick guide to setting up your account</p>
				<div class="m-l-20 mt-50">
					<img src="/images/stepper/guide_one.svg" />
				</div>
			</div>
		</div>
		<div class="flex-item-right" style="padding: 0 30px">
			<div>
				<div class="mt-50" style="background-color: #f5f5f5;border-color: #efefef; padding: 15px; border-radius: 5px">
					<p style="font-weight: 700;">Step 1 of 3: Select a channel to engage your customers</p>
				</div>
				<div class="mt-30" style="margin-left: 15px">
					<p style="color: #676767;font-weight: 600;margin-bottom: 5px!important;">You can access any of these services on your dashboard, if you would like <br>to switch between any.</p>

				</div>
				<div class="mt-50" style="display: flex; justify-content: center">
					<div class="service-card" style="margin-right: 50px" @click="showSenderIdForm">
						<img src="/images/chat_sms.svg"/>
						<p class="text-center mt-10">SMS</p>
					</div>
					<div class="service-card" style="margin-right: 50px" @click="showSenderIdForm">
						<img src="/images/microphone.svg" width="70"/>
						<p class="text-center mt-10" >Voice</p>
					</div>
					<div class="service-card" @click="showDeviceIdForm">
						<img src="/images/whatsapp.svg" width="70"/>
						<p class="text-center mt-10" >WhatsApp</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SelectServiceComponent",
	methods:{
		showSenderIdForm(){
			 this.$emit('showSenderIdForm')
		},
		showDeviceIdForm(){
			 this.$emit('showDeviceIdForm')
		}
	}
}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
