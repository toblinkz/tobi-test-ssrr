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
  }
}
export const state = () => ({

  user_registered: null,
  bearer_token: localStorage.getItem('auth._token.local').slice(7) || ''

});

export const mutations = {
  changeRegisteredState (state) {
    if (state.user_registered === null){
      state.user_registered = true;
    } else if(state.user_registered === true){
      state.user_registered = null;
    }
  },
  setBearerToken(state, bearer_token){
    state.bearer_token = bearer_token;
  }

}
