export default {
  namespaced:true,
  state:{
    curr_user_type:'home',
    curr_user:null
  },
  mutations:{
    set_curr_user_type(state, user_type){
      state.curr_user_type = user_type
    },
    set_curr_user(state, user) {
      state.curr_user = user
    }
  }
}
