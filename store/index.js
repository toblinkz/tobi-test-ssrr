export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
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
  getPhoneBookId(state){
    return state.phone_book_id;
  }
}

export const state = () => ({
  bearer_token: '',
  email:'',
  password:'',
  phone_book_id:'',
  view_verify_page: false
});

export const mutations = {

  setEmail(state, email){
    state.email = email
  },
  setPassword(state, password){
    state.password = password
  },
  setPhoneBookId(state, phonebook_id){
    state.phone_book_id = phonebook_id
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
  }

}
