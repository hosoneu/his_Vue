import Vue from 'vue'
import Vuex from 'vuex'
import doctor from './doctor'
import common from './common'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    doctor,
    common,
  }
})
