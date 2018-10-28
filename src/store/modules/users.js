import Vue from 'vue'
import {countObjectProperties, appendChildToParentMutation} from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state) {
      // return state.items[state.authId]
      return {}
    },

    userPostsCount: (state) => (id) => countObjectProperties(state.items[id].posts),
    userThreadsCount: (state) => (id) => countObjectProperties(state.items[id].threads),
    findUser: (state) => (id) => state.items[id]

  },

  actions: {
    updateUser ({commit}, user) {
      commit('updateUser', {user, userId: user['.key']})
    },

    fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'users', id}, {root: true}),
    fetchUsers: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'users'}, {root: true})

  },

  mutations: {

    updateUser (state, {user, userId}) {
      Vue.set(state.items, userId, user)
    },

    addPostToUser: appendChildToParentMutation({child: 'posts'}),
    addThreadToUser: appendChildToParentMutation({child: 'threads'})
  }
}
