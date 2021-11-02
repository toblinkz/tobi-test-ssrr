export class CampaignService {

	constructor(axios, config) {
		this.$axios = axios;
		this.$config = config;
	}

	async getPhonebook(){
		 return await this.$axios.$get(this.$config.campaignApiBaseURL + 'sms/phone-book?filter=unpaginated');
	}

	async addContact(contact_upload_url, selected_phone_book, selected_country){
		 return await this.$axios.$post(this.$config.campaignApiBaseURL + 'sms/phone-book/contact/add', {
				contact_upload_url : contact_upload_url,
				id: selected_phone_book,
				country_code: selected_country.substring(1)
			})
	}


}
