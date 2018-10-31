import Vue from 'vue'
import firebase from 'firebase'
import {countObjectProperties, appendChildToParentMutation, currentTimestamp} from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {
    userPostsCount: (state) => (id) => countObjectProperties(state.items[id].posts),
    userThreadsCount: (state) => (id) => countObjectProperties(state.items[id].threads),
    findUser: (state) => (id) => state.items[id],
    userPosts: (state, getters, rootState) => id => {
      const user = rootState.users.items[id]
      if (user.posts) {
        return Object.values(rootState.posts.items)
          .filter(post => post.userId === id)
      }

      return []
    }
  },

  actions: {
    updateUser ({commit}, user) {
      commit('updateUser', {user, userId: user['.key']})
    },

    createUser ({state, commit}, {id, name, username, email, avatar = null}) {
      return new Promise((resolve, reject) => {
        const registeredAt = currentTimestamp()
        const usernameLower = username.toLowerCase()
        email = email.toLowerCase()
        const user = {avatar, name, username, registeredAt, email, usernameLower}

        firebase.database().ref('users').child(id).set(user)
          .then(() => {
            commit('setItem', {resource: 'users', item: user, id}, {root: true})
            console.log('User registered: ', id)
            resolve(state.items[id])
          })
      })
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
