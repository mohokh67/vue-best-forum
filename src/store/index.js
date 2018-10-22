import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import forums from './modules/forums'
import threads from './modules/threads'
import posts from './modules/posts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    threads,
    forums,
    posts
  },

  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters,
  actions,
  mutations
})
