export default {
  namespaced:true,
  state:{
    curr_user_type:'doctor'
  },
  mutations:{
    set_curr_user_type(state, user_type){
      state.curr_user_type = user_type
    }
  }
}
