import firebase from 'firebase'
export default {
  namespaced: true,

  state: {
    authId: null
  },

  getters: {
    authUser (state, getters, rootState) {
      return state.authId ? rootState.users.items[state.authId] : null
    }

  },

  actions: {

    registerUserWithEmailAndPassword ({dispatch}, {email, password, name, username, avatar = null}) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          return dispatch('users/createUser', {id: user.user.uid, email, password, name, username, avatar}, {root: true})
        })
    },

    signInUserWithEmailAndPassword (context, {email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    signOut ({commit}) {
      return firebase.auth().signOut()
        .then(() => {
          commit('setAuthId', null)
        })
    },

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
