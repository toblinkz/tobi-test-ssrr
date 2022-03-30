<template>
 <modal name="delete-balance-notification-modal" height="400px"  width="440px">
		<div class="container">
			<div class="close-icon-container">
				<img class="close-icon" @click="closeModal" src="/images/icons/svg_icons/close-svgrepo-com.svg" alt="">
			</div>
			<img src="/images/icons/svg_icons/exclaim_icon.svg" width="172px" alt="">
			<p class="delete-title text-center">Are you sure you want to stop <br>receiving your balance Notification?</p>
			<div class="delete-btn" @click="deleteBalanceNotification">
				Remove
				<span v-show="isLoading">
							<img src="/images/spinner.svg" height="20px" width="30px"/>
				</span>
			</div>
		</div>
	</modal>
</template>

<script>
export default {
	name: "DeleteBalanceNotificationModal",
	data() {
		return{
					isLoading: false
		}
	},
	props:{
		 notificationId: Number
	},
	methods:{
		async deleteBalanceNotification()	{
			 try {
					this.isLoading = true;
					await this.$billing.deleteWalletBalanceNotification(this.notificationId);
					this.$emit('get-notification');
					this.isLoading = false;
					this.$toast.success('removed successfully');
				}catch (e) {
					 this.isLoading = false;
				}

			},
		closeModal(){
				this.$modal.hide('delete-balance-notification-modal');
		}
	}
}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";
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

.delete-title {
	font-weight: bold;
	font-size: 16px;
	line-height: 19px;
	color: #333333;
	margin-top: 20px;
}

.delete-message {
	font-weight: 300;
	font-size: 14px;
	line-height: 21px;
	text-align: center;
	color: #000000;
	width: 250px;
	margin-top: -10px;
}

.delete-btn {
	background: #E34747;
	border-radius: 4px;
	padding: 8px 45px;
	color: #FFFFFF;
	cursor: pointer;
}

.delete-btn p {
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	color: #FFFFFF;
	width: 170px;
}
</style>
