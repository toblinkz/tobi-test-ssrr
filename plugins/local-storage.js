import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    paths: ['bearer_token', 'email', 'password']
  })(store)
}
