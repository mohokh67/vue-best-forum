import firebase from 'firebase'
export default {
  namespaced: true,

  state: {
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state, getters, rootState) {
      return rootState.users.items[state.authId]
    }

  },

  actions: {

    fetchAuthUser ({dispatch, commit}) {
      const userId = firebase.auth().currentUser.uid
      return dispatch('users/fetchUser', {id: userId}, {root: true})
        .then(() => {
          commit('setAuthId', userId)
        })
    }

  },

  mutations: {
    setAuthId (state, id) {
      state.authId = id
    }
  }
}
