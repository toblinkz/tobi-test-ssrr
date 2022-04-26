import {hashRequestPayload} from "static/js/has_request_payload";

export class TeamService {
	constructor(axios) {
		this.$axios = axios;
	}

	async addTeammate(first_name, last_name, email, role, permissions) {
		let data = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			role: role,
			permissions: permissions
		}

		let signature = hashRequestPayload(data);
		return await this.$axios.$post('team', data, {
			headers: {
				'X-TERMII-SIGNATURE': signature,
				'IPAS': process.env.IPAS
			}
		});
	}

	async checkIfUserEmailExist(email) {
		return await this.$axios.$get('/team/check/new/email', {
			params: {
				email: email
			}
		})
	}

	async resendTeamMemberInvite(email) {
		let data = {
			email: email
		}

		let signature = hashRequestPayload(data);
		return await this.$axios.$post('team', data, {
			headers: {
				'X-TERMII-SIGNATURE': signature,
				'IPAS': process.env.IPAS
			}
		});
	}

}
