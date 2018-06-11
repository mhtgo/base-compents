const user = {
    state: {
      currentUser: {},
      loginTime:''
    },
    mutations: {
      SET_CURRENT_USER (state, currentUser) {
        state.currentUser = currentUser
      },
      SET_LOGIN_TIME (state, time) {
        state.loginTime = time
      }
    }
  }

  export default user
