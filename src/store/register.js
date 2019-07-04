export default {
  namespaced:true,
  state:{
    cashier: {
      userId: 1,
    }
  },
  mutations: {
    updateCashier(state, newUserId){
      state.userId = newUserId;
    },
  },
}
