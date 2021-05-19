<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
			<div class="mt-50">
				<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Set Up Your account </p>
				<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here's a quick guide to setting up your account</p>
				<div class="m-l-20 mt-50">
					<img src="/images/stepper/stepper_one.svg" />
				</div>
			</div>
		</div>

		<div class="flex-item-right" style="padding: 0 30px">
			<div>
				<div class="mt-50" style="background-color:rgba(13, 203, 229, 0.3); padding: 15px; border-radius: 5px">
					<p style="font-weight: bold; color: #365899">Step 1 of 3: Select a Channel to Engage your Customers</p>
				</div>
				<p class="mt-30" style="color: #365899; font-weight: bold"></p>
				<div class="mt-50" style="display: flex;">
					<div class="service-card" style="margin-right: 50px" @click="showSenderIdForm">
						<img src="/images/chat_sms.svg"/>
						<p class="text-center mt-10" style="color: #A9A9A9">SMS</p>
					</div>
					<div class="service-card" style="margin-right: 50px" @click="showSenderIdForm">
						<img src="/images/microphone.svg" width="70"/>
						<p class="text-center mt-10" style="color: #A9A9A9">Voice</p>
					</div>
					<div class="service-card" @click="showDeviceIdForm">
						<img src="/images/whatsapp.svg" width="70"/>
						<p class="text-center mt-10" style="color: #A9A9A9">WhatsApp</p>
					</div>
				</div>
				<div class="mt-50 toke" style="border-radius: 10px; padding: 25px">
				 <b>NB:</b>	Sender ID and Device ID requests takes up to 24-48 hours before registration with telcos.
				</div>
				<div class="mt-50 toke" style="border-radius: 10px; padding: 25px">
					<b>NB:</b> Your wallet balance must be funded to proceed with sending messages.
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
