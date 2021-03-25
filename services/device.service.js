export class DeviceService {

	constructor(axios) {
		this.$axios = axios
	}

	async getQRCode(device_id){
		return await this.$axios.$get(`devices/${device_id}/barcode`);
	}

	async getTemplatesCategories(device_id){
		return await this.$axios.$get(`devices/${device_id}/templates/categories`);
	}

	async getTemplatesLanguages(device_id){
		return await this.$axios.$get(`devices/${device_id}/templates/languages`);
	}

async sendTemplateSample(device_id,template_name, selected_category, selected_language, template_sample){

	await this.$axios.$post(`devices/${device_id}/templates/request`, {
		template_name: template_name,
		category: selected_category,
		language: selected_language,
		text: template_sample,

	});
}


}
