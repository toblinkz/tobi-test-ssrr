<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
			<div class="mt-50">
				<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Setting up your account </p>
				<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here’s a quick guide to helping you set up your account</p>
				<div class="m-l-20 mt-50">
					<img src="/images/stepper/stepper_three.svg" />
				</div>
			</div>
		</div>

		<div class="flex-item-right " style="padding: 0 30px; height: 80vh">
			<div>
				<div class="mt-50" style="background-color:rgba(13, 203, 229, 0.3); padding: 15px; border-radius: 5px">
					<p style="font-weight: bold; color: #365899">Step 3 of 3: Start Sending Messages</p>
				</div>
				<form  method="post"   >
					<div>
						<div class="form-group">
							<center>
								<div>
									<img src="/images/step3_art.png" />
								</div>

								<p>Start sending messages to your customers faster, and with a better accuracy.</p>
								<div class="mt-40">
									<nuxt-link to="/message/select-type" class="bg-blue m-r-10">Send on Dashboard</nuxt-link>
									<a href="https://developers.termii.com" target="_blank" class="bg-green">Send via API</a>
								</div>
							</center>

						</div>
					</div>
				</form>
				<div class="m-t-80 mb-30">
					<span style="font-weight: 700; cursor: pointer; color: #365899; margin-bottom: 30px" class="pull-right" @click="close">Skip</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
name: "SendMessageComponent",
	methods:{
		close(){
			localStorage.setItem('doneWithTour', 'yeah');
			this.$modal.hide('signup-wizard-modal');
		},
	}
}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
