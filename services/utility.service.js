import moment from "moment";

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


	setExpiryTime(){
		let loggedInTime = Date.now();
		let expiryTime =  moment(loggedInTime).add(54, 'minutes').toDate();
		localStorage.setItem('ET', expiryTime - Date.now() );
		localStorage.setItem('LGIT', loggedInTime);

	}
}
