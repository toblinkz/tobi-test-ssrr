export class CampaignService {

	constructor(axios, config) {
		this.$axios = axios;
		this.$config = config;
	}

	async getUnPaginatedPhonebookList(){
		 return await this.$axios.$get(this.$config.campaignApiBaseURL + '/sms/phone-book?filter=unpaginated');

	}

	async getPhonebooks(page){
		return await this.$axios.$get(this.$config.campaignApiBaseURL + '/sms/phone-book', {
			params:{
				page: page
			}
		});

	}

	async getPhonebookContacts(id, page, phone_number){
		 return await this.$axios.$get(this.$config.campaignApiBaseURL + `/sms/phone-book/${id}`, {params:{
					page: page,
					phone_number: phone_number
				}});
	}

	async deleteContact(id){
		 return await this.$axios.$delete(this.$config.campaignApiBaseURL + `/sms/phone-book/contact/${id}`)
	}

	async getContactDetails(id){
		return await this.$axios.$get(this.$config.campaignApiBaseURL + `/sms/phone-book/contact/${id}`)
	}

	async addContact(contact_upload_url, selected_phone_book, selected_country){
		 return await this.$axios.$post(this.$config.campaignApiBaseURL + '/sms/phone-book/contact/add', {
				contact_upload_url : contact_upload_url,
				id: selected_phone_book,
				country_code: selected_country.substring(1)
			})
	}


}
