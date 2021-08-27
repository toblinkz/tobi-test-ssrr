<template>
	<modal name="verification-unsuccessful-modal" height="auto" width="500">
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="mt-20 modal-body">
						<center>
							<img src="/images/verification_unsuccessful.svg"/>
							<div class="mt-20">
								<p style="font-weight: bold; font-size: 23px; color: #365899">Your otp verification <br> was unsuccessful!</p>
								<p>Try inputting the OTP and verifying it again or read<br>our documentation to know what went wrong </p>
								 <a @click="close" class="mt-20 block" style="text-decoration: underline; color: #333333; font-size: 15px">Retry OTP sent</a>
								<a href="https://developers.termii.com/verify-token" target="_blank" class="mt-20 btn bg-blue" >Read full documentation</a>
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
	name: "VerificationUnsuccessfulModal",
	methods: {
		close(){
			this.$modal.hide('verification-unsuccessful-modal');
		}
	}
}
</script>

<style scoped>
@import "../../../../assets/css/modal/modal.css";
</style>
