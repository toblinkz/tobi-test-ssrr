import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    paths: ['bearer_token', 'email', 'password','view_verify_page', 'campaign_report_created']
  })(store)
}
