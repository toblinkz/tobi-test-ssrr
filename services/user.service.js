export class UserService {

	constructor(axios) {

		this.$axios = axios
	}

	async getLoggedInUserData () {
		return await this.$axios.$get('user');
	}
}
