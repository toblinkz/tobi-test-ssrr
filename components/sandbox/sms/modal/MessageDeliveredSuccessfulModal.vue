<template>
	<modal name="message-delivered-successful-modal" height="auto" width="500" >
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header">
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="mt-20 modal-body">
						<center>
							<img src="/images/verification_successful.svg"/>
							<div class="mt-20">
								<p v-if="!has_generic_senderid || !has_dnd_senderid" style="font-weight: bold; font-size: 23px; color: #365899">Your sms was delivered <br>successfully!</p>
								<span v-if="(!has_generic_senderid || !has_dnd_senderid) && (has_dnd_senderid !== has_generic_senderid)"  class="mb-0" style="font-weight: 700">Next step:</span>
								<p v-if="!has_generic_senderid && !has_dnd_senderid">Our SMS service is easy to use and delivers<br>promptly; Have any questions?</p>
								<p v-if="!has_generic_senderid && (has_dnd_senderid !== has_generic_senderid)">Your Sender ID have not been approved,<br> contact your account manager to set you up.</p>
								<p v-if="!has_dnd_senderid && (has_dnd_senderid !== has_generic_senderid)">DND route have not been approved for your<br> account, do contact your account manager<br> to set you up.</p>
								<a href="https://developers.termii.com/messaging" target="_blank" class="mt-20 btn bg-blue" >Read full documentation</a>
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
	name: "MessageDeliveredSuccessfulModal",
	props:{
		has_generic_senderid:{},
		has_dnd_senderid:{},
	},
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
