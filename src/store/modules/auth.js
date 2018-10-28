export default {
  namespaced: true,

  state: {
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state, getters, rootState) {
      return rootState.users.items[state.authId]
      // return {}
    }

  },

  actions: {},
  mutations: {}
}
