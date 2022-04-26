<template>
	<modal ref="myModal" :clickToClose="false" height="auto" name="privacy-policy-modal" role="dialog">
		<div class="privacy-policy-modal-container">
			<div class="privacy-policy-header">
				<p style="font-weight: bold; font-size: 18px">DATA PROTECTION and Privacy Policy</p>

				<img src="/images/icons/svg_icons/close-icon-round.svg" @click="close" style="cursor: pointer" />
			</div>

			<DataDisplay @scroll-to-end="enableAcceptButton" />

			<button class="accept-button" :disabled="this.isDisabled" @click="acceptPrivacy" >Accept</button>
		</div>
	</modal>
</template>

<script>
import DataDisplay from "@/components/DataDisplay";
import ButtonSpinner from "@/components/general/ButtonSpinner";

export default {
	name: "PrivacyPolicyModal",
	components: {ButtonSpinner, DataDisplay},
	data() {
		return {
			privacyAccepted: false,
			txt: '',
			hasScrolledToBottom: false,
		}
	},

	mounted() {},

	computed: {
		isDisabled: function (){
			return (!this.hasScrolledToBottom);
		},
	},

	methods: {
		close() {
			this.$emit('close-privacy-policy-modal')
			this.$modal.hide('privacy-policy-modal');
		},

		enableAcceptButton() {
			this.hasScrolledToBottom = true
		},

		acceptPrivacy() {
			// this.privacyAccepted = true
			this.$emit('privacy-policy-accepted')
			this.$modal.hide('privacy-policy-modal');
		}
	}
}
</script>

<style scoped>
@import "../../assets/css/modal/modal.css";

.privacy-policy-modal-container {
	width: 100%;
	/*height: 500px;*/
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 3rem 2rem;
}

.privacy-policy-header {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	text-transform: uppercase;
	padding-bottom: 5px;
}

.accept-button {
	padding: 10px 20px;
	color: #FFFFFF;
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
	border-radius: 4px;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	font-weight: bold;
	display: flex;
	justify-self: self-end;
	align-self: self-end;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-out;
}

.accept-button:hover {
	box-shadow: none;
}
</style>
