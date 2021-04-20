export class InsightService {

	constructor(axios) {

		this.$axios = axios
	}

	async getLineChartData () {
		return await this.$axios.$get('sms/history/analytics');
	}
}
