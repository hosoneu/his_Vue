import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import common from './common'
import doctor from './doctor'
import statistics from './statistics'
import basicInfo from './basicInfo'
import pharmacy from './pharmacy'
import register from './register'
import tech from './tech'
import patient from './patient'

Vue.use(Router);

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    home,
    common,
    doctor,
    basicInfo,
    statistics,
    tech,
    register,
    pharmacy,
    patient
  ]
})
