import Vue from 'vue'
import Vuex from 'vuex'
import doctor from './doctor'
import common from './common'
import basicInfo from './basicInfo'
import pharmacy from './pharmacy'
import register from './register'
import tech from './tech'
import statistics from './statistics'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    doctor,
    common,
    basicInfo,
    register,
    pharmacy,
    tech,
    statistics,
  }
})
