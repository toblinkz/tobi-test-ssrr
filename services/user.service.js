export class UserService {

	constructor(axios) {

		this.$axios = axios
	}

	async registerUser(first_name, last_name, email, password, phone_number, selected_country, sector_id, company, role_id, notification_opt_in){
		 return await this.$axios.$post('auth/register', {
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password,
				phone_number: phone_number,
				country: selected_country,
				sector: sector_id,
				company:company,
				role: role_id,
				notification_opt_in: notification_opt_in
			});
	}

	async updateProfile(first_name, last_name, email, password, company_sector, image, phone){
     return await this.$axios.$patch('user/profile', {
						first_name: first_name,
						last_name: last_name,
						email: email,
						password: password,
						company_sector: company_sector,
						image: image,
						phone: phone
					});
	}

	async LoginUser(email, password){
		 return await this.$axios.$post('auth/login', {
				email: email,
				password: password
			})
	}
	async getPhonebook(){
		return await this.$axios.$get('sms/phone-book?filter=unpaginated');
	}

	async authenticateUserForCampaign(email, password){
		return await this.$axios.$post('auth/login', {
			email: email,
			password: password
		})
	}

	async getUser(){
	return 	await this.$axios.$get('user', {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('local')}`
			}
		});
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
