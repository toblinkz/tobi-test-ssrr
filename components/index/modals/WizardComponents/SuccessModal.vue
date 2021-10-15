<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
			<div class="mt-50">
				<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Setting up your account </p>
				<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here’s a quick guide to helping you set up your account</p>
				<div class="m-l-20 mt-50">
					<img src="/images/stepper/guide_four.svg" />
				</div>
			</div>
		</div>

		<div class="flex-item-right " style="padding: 0 30px; height: 80vh">
			<div>
				<div class="mt-50" style="background-color: #f5f5f5;border-color: #efefef;  padding: 15px; border-radius: 5px">
					<p style="font-weight: bold; ">Set up complete</p>
				</div>
				<form  method="post"   >
					<div>
						<div class="form-group">
							<center>
								<div class="mt-100">
									<img src="/images/stepper/trophy.svg" />
								</div>
								<div class="mt-30">
									<p style="color: #333333; font-weight: 500; font-size: 15px">Your ID request has been sent successfully, you will get a response in the next 24 - 48 hours.</p>
								</div>
								<div class="mt-50">
									<a  class="btn bg-blue m-r-10" @click="close">Open your dashboard</a>
								</div>

							</center>

						</div>
					</div>
				</form>

			</div>
		</div>
	</div>
</template>

<script>
export default {
name: "SuccessModal",
	methods:{
		close(){
			// localStorage.setItem('doneWithTour', 'yeah');

			this.$modal.hide('signup-wizard-modal');
			this.$modal.show('on-boarding-modal');
		},
	}
}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
