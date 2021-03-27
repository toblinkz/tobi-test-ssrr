export class UtilityService {

	constructor(axios) {

		this.$axios = axios
	}

	async getAnnouncements () {
		return await this.$axios.$get('announcements');
	}
}
