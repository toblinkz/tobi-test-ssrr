export class SmsService {

	constructor(axios) {
		this.$axios = axios;
	}

	async getActiveCountryRoutes(page){
		return await this.$axios.$get('sms/country/route', {params:{
			  page: page
			}});
	}

	async requestSenderId(sender_id, country, usecase, company){
		  return await this.$axios.$post('sms/sender-id', {
		  	 sender_id: sender_id,
				  country: country,
				  usecase: usecase,
				  company: company
		  });
	}

}
