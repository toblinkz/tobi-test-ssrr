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

  user_registered: null
});

export const mutations = {
  changeRegisteredState (state) {
    if (state.user_registered === null){
      state.user_registered = true;
    } else {
      state.user_registered = null;
    }

  }
}
