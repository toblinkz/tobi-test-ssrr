import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    paths: ['bearer_token', 'email', 'password','view_verify_page']
  })(store)
}
