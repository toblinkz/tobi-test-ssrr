<template>
	<modal name="campaign-delete-successful-modal" height="400px"  width="440px" >
		<div class="container">
			<div class="close-icon-container">
				<img class="close-icon" @click="closeAndRefetchCampaignReports" src="/static/images/icons/svg_icons/close-svgrepo-com.svg" alt="">
			</div>
			<img src="/static/images/icons/svg_icons/success_icon.svg" width="172px" alt="">
			<p class="delete-successful-message">Scheduled campaign has been deleted!</p>
			<div @click="closeAndRefetchCampaignReports"  class="back-btn">
					Back to campaign history
			</div>
		</div>
	</modal>
</template>

<script>
export default {
	name: "ConfirmCampaignDeleteModal",
	data(){
		return{
			button_text: "Yes, Continue",
			isLoading: false
		}
	},
	methods:{
		close() {
			this.$modal.hide('campaign-delete-successful-modal');
		},
		closeAndRefetchCampaignReports() {
			this.$modal.hide('campaign-delete-successful-modal');
			this.$emit('refetch-campaign-reports')
		},
	}
}
</script>

<style scoped>
@import "../../../../assets/css/modal/modal.css";

.container {
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	border-radius: 8px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	z-index: 100;
	position: relative;
}

.close-icon-container {

}

.close-icon {
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
}

.delete-successful-message {
	width: 184px;
	/*height: 49px;*/
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 28px;
	text-align: center;
	color: #333333;
}

.back-btn {
	cursor: pointer;
	width: 191px;
	height: 19px;
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	text-decoration-line: underline;
	color: #365899;
}
</style>
