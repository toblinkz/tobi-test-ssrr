<template>
	<modal name="verification-successful-modal" height="auto" width="500" :clickToClose="false">
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="mt-20 modal-body">
						<center>
							<img src="/images/verification_successful.svg"/>
							<div class="mt-20">
								<p style="font-weight: bold; font-size: 23px; color: #365899">Your otp verification <br> was successful!</p>
								<p>Delivering your OTP using our voice option as an <br>alternative is secured and also has an high<br>	delivery rate.</p>
								<a href="https://developers.termii.com/voice-token" target="_blank" class="mt-20 btn bg-blue" >Read full documentation</a>
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
	name: "VerificationSuccessfulModal",
	methods: {
		close(){
			this.$emit('closeModal');
		}
	}
}
</script>

<style scoped>
@import "../../../../assets/css/modal/modal.css";
</style>
