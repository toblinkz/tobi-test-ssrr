export class KYCService {

	constructor(axios) {
		this.$axios = axios;
	}

	async getKYC(id){
		return await this.$axios.$get('kyc')
	}

	async addKYCDocument(name_of_file, file_url){
		return await this.$axios.$post('kyc',{
			name_of_file,
			file_url
		})
	}

	async editKYCDocument(id, name_of_file, file_url){
		return await this.$axios.$patch(`kyc/${id}`,{
			name_of_file,
			file_url
		})
	}

	async editKYCDocumentWithoutDocumentChange(id, name_of_file){
		return await this.$axios.$patch(`kyc/${id}`,{
			name_of_file,
		})
	}

	async deleteKYCDocument(id){
		return await this.$axios.$delete(`kyc/${id}`)
	}

	async getKYCLogs(id){
		return await this.$axios.$get(`kyc/${id}/logs`)
	}
}
