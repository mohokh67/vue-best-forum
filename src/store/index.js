import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import threads from './modules/threads'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    threads
  },

  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters,
  actions,
  mutations
})
