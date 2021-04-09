export class SmsService {

	constructor(axios) {
		this.$axios = axios;
	}

	async getActiveCountryRoutes(page){
		return await this.$axios.$get('sms/country/route', {params:{
			  page: page
			}});
	}

}
