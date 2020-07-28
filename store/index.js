export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  },
  isRegistered(state){
    return state.user_registered;
  }
}
export const state = () => ({

  user_registered: false
});

export const mutations = {
  changeRegisteredState (state) {
    state.user_registered = !state.user_registered;
  }
}
