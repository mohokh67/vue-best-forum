// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import firebase from 'firebase'
import {config} from '@/config/firebase'

Vue.component('AppDate', AppDate)
Vue.config.productionTip = false
// Vue.config.silent = true

/*
* Make sure the 'read' and 'write' are 'true' in firebase rule
*/
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
