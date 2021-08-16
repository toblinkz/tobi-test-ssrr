<template>
	<modal name="coupon-success-payment-modal" height="auto" width="500">
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body mt-20">
						<center>
							<img src="/images/check.svg"/>
							<div class="mt-20">
								<p style="font-weight: bold">Coupon received and would be <br> applied to your account after confirmation</p>
								<a class="btn bg-blue" @click="close">Close</a>
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
	name: "CouponSuccessfulPaymentModal",
	methods:{
		close(){
			 this.$modal.hide('coupon-success-payment-modal');
		}
	}
}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";
</style>
