export class TeamService {

	constructor(axios) {
		this.$axios = axios;
	}

	async addTeammate(first_name, last_name, email, role, permissions){
		return await this.$axios.$post('team', {
			  first_name: first_name,
			  last_name: last_name,
			  email: email,
			  role: role,
			  permissions: permissions
		});
	}

	async checkIfUserEmailExist(email){
		 return await this.$axios.$get('/team/check/new/email', {
		 	  params: {
		 	  	 email: email
			   }
		 })
	}

}
