import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters,
  actions,
  mutations
})
