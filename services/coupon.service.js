export class CouponService {

	constructor(axios) {
		this.$axios = axios
	}

	async validateCoupon(coupon){

		return await this.$axios.$post('/billing/coupon/validate', {

			coupon: coupon

		});

	}

}
