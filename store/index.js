export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  },
  isRegistered(state){
    return state.user_registered;
  },

  getBearerToken(state){
    return state.bearer_token;
  },
  getUserEmail(state){
    return state.email;
  },
  getUserPassword(state){
    return state.password;
  },
  getCampaignCreatedDate(state){
    return state.campaign_report_created;
  }
}

export const state = () => ({
  bearer_token: '',
  email:'',
  password:'',
  campaign_report_created: '',
  view_verify_page: false
});

export const mutations = {

  setEmail(state, email){
    state.email = email
  },
  setPassword(state, password){
    state.password = password
  },
  setBearerToken(state, bearer_token){
    state.bearer_token = bearer_token;
  },
  setViewVerificationPage(state){
    if (state.view_verify_page === false){
      state.view_verify_page = true;
    } else {
      state.view_verify_page = false
    }
  },
  setCampaignCreatedDate(state, date){
    state.campaign_report_created = date;
  }

}
