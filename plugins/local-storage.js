import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    paths: ['bearer_token', 'email', 'password','view_verify_page','first_name','phone_book_id','successful_payment_url', 'auth.loggedIn']
  })(store)
}
