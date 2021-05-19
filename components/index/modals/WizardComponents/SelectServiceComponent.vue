<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
			<div class="mt-50">

			</div>
		</div>

		<div class="flex-item-right" style="padding: 0 30px">
			<div>
				<div class="mt-50" style="background-color:rgba(13, 203, 229, 0.3); padding: 15px; border-radius: 5px">
					<p style="font-weight: bold; color: #365899">Select The Services You Want To Use on Termii</p>
				</div>
				<p class="mt-30" style="color: #365899; font-weight: bold">Choose a service</p>
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
