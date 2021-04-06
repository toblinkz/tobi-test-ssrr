export class UtilityService {

	constructor(axios) {

		this.$axios = axios
	}

	async getAnnouncements () {
		return await this.$axios.$get('announcements');
	}

	async generateNubanAccount(bvn, date_of_birth){
		 return await this.$axios.$post('utility/generate/nuban', {
			 identification_number: bvn,
			 dob: date_of_birth
		 });
	}
}
