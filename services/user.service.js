export class UserService {

	constructor(axios) {

		this.$axios = axios
	}

	async getLoggedInUserData () {
		return await this.$axios.$get('user');
	}

	async updateCompanyName(company_name){
		 return await this.$axios.$patch('user/company', {
		 	 company_name: company_name
		 });
	}
	async updateIsWizardCompleted(){
		 return await this.$axios.$patch('user/wizard', {
		 	 is_wizard_completed: 1
		 })
	}

}
