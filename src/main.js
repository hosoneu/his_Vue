import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import start_mock from './mock'
import { post, fetch }  from "./config/axios"
import VeeValidate from "vee-validate"
import Vuex from 'vuex'
import store from './store'


Vue.prototype.$get=fetch;
Vue.prototype.$post=post;


Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(Vuex);

start_mock();

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
