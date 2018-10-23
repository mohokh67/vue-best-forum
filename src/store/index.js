import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories'
import forums from './modules/forums'
import threads from './modules/threads'
import posts from './modules/posts'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories,
    forums,
    threads,
    posts,
    users
  },

  state: {},
  getters: {},
  actions: {},
  mutations: {}
})
