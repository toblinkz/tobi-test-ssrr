export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
  getUserEmail(state){
    return state.email;
  },
  getUserPassword(state){
    return state.password;
  },
  getCampaignCreatedDate(state){
    return state.campaign_report_created;
  },
  getPhoneBookId(state){
    return state.phone_book_id;
  },
	getBulkSmsId(state){
  	return state.bulk_sms_id;
	}
}

export const state = () => ({
  email:'',
  password:'',
  phone_book_id:'',
		bulk_sms_id:'',
  campaign_report_created: '',

  view_verify_page: false
});

export const mutations = {

  setEmail(state, email){
    state.email = email;
  },
  setPassword(state, password){
    state.password = password;
  },
  setPhoneBookId(state, phonebook_id){
    state.phone_book_id = phonebook_id;
  },
	setBulkSmsId(state, bulk_sms_id){
  	state.bulk_sms_id = bulk_sms_id;
	},
  setViewVerificationPage(state){
    if (state.view_verify_page === false){
      state.view_verify_page = true;
    } else {
      state.view_verify_page = false;
    }
  },
  setCampaignCreatedDate(state, date){
    state.campaign_report_created = date;
  }

}
