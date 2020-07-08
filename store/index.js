export const state = () => ({
  login: false
})

export const mutations = {
  changeStateTrue (state) {
    state.login = true
  },
  changeStateFalse (state) {
    state.login = false
  }
}
