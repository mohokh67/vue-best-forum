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
      console.log(`firing ${action} - ${id}`)
      return new Promise((resolve, reject) => {
        console.log(resource)
        console.log(firebase.database().ref(resource))
        firebase.database().ref(resource).child(id).once('value', snapshot => {
          console.log(snapshot.val())
          commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
          resolve(state[resource][id])
        })
      })
    }

  },

  mutations: {

    setItem: (state, {item, id, resource}) => {
      item['.key'] = id
      Vue.set(state[resource], id, item)
    }

  }
})
