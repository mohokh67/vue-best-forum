import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

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

  actions: {

    // from firebase
    fetchItem ({state, commit}, {id, action, resource}) {
      console.log('🔥‍', `In ${resource} looking for id: ${id}`)
      return new Promise((resolve, reject) => {
        const ref = firebase.database().ref(resource)
        console.log('URL:', ref.child(id).toString())
        ref.child(id).once('value', snapshot => {
          commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
          resolve(state[resource].items[id])
        })
      })
    }

  },

  mutations: {

    setItem: (state, {item, id, resource}) => {
      item['.key'] = id
      Vue.set(state[resource].items, id, item)
    }

  }
})
