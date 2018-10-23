import Vue from 'vue'
import sourceData from '@/data'

export default {
  namespaced: true,

  state: {
    items: sourceData.users,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state) {
      return state.items[state.authId]
    }
  },

  actions: {
    updateUser ({commit}, user) {
      commit('updateUser', {user, userId: user['.key']})
    }
  },

  mutations: {

    updateUser (state, {user, userId}) {
      Vue.set(state.items, userId, user)
    },

    addPostToUser (state, {userId, postId}) {
      const user = state.items[userId]
      console.log(userId)
      if (!user.posts) {
        Vue.set(user, 'posts', {})
      }
      Vue.set(user.posts, postId, postId)
    },

    addThreadToUser (state, {userId, threadId}) {
      const user = state.items[userId]
      if (!user.threads) {
        Vue.set(user, 'threads', {})
      }
      Vue.set(user.threads, threadId, threadId)
    }
  }
}
