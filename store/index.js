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
  }
}

export const state = () => ({
  bearer_token: '',
  email:'',
  password:''
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
  }

}
