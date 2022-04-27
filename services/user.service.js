import {hashRequestPayload} from "static/js/has_request_payload";

export class UserService {
	constructor(axios) {
		this.$axios = axios
	}

	async registerUser(first_name, last_name, email, password, phone_number, selected_country, sector_id, company, role_id, notification_opt_in, privacy_policy) {
		let data = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			password: password,
			phone_number: phone_number,
			country: selected_country,
			sector: sector_id,
			company: company,
			role: role_id,
			notification_opt_in: notification_opt_in,
			privacy_policy: privacy_policy
		}
		let signature = hashRequestPayload(data);
		return await this.$axios.$post('auth/register', data, {
			headers: {
				'X-TERMII-SIGNATURE': signature,
				'IPAS': process.env.IPAS
			}
		});
	}

	async updateProfile(first_name, last_name, email, password, company_sector, image, phone) {
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

	async LoginUser(email, password) {
		let data = {email: email, password: password}
		let signature = hashRequestPayload(data);
		return await this.$axios.$post('auth/login', data, {
			headers: {
				'X-TERMII-SIGNATURE': signature,
				'IPAS': process.env.IPAS
			}
		});
	}

	async getPhonebook() {
		return await this.$axios.$get('sms/phone-book?filter=unpaginated');
	}

	async authenticateUserForCampaign(email, password) {
		let data = {email: email, password: password};
		let signature = hashRequestPayload(data);
		return await this.$axios.$post('auth/login', data, {
			headers: {
				'X-TERMII-SIGNATURE': signature,
				'IPAS': process.env.IPAS
			}
		})
	}


	async getUser() {
		return await this.$axios.$get('user', {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('local')}`
			}
		});
	}

	async getLoggedInUserData() {
		return await this.$axios.$get('user');
	}

	async updateCompanyName(company_name) {
		return await this.$axios.$patch('user/company', {
			company_name: company_name
		});
	}

	async updateIsWizardCompleted() {
		return await this.$axios.$patch('user/wizard', {
			is_wizard_completed: 1
		})
	}

	async acceptPrivacyPolicy() {
		return await this.$axios.patch('user/privacy/policy', {
			privacy_policy: true
		})
	}
}

