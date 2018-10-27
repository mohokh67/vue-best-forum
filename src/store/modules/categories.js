
import firebase from 'firebase'
export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {},

  actions: {

    fetchCategory ({dispatch}, {id}) {
      return dispatch('fetchItem', {resource: 'categories', id}, {root: true})
    },

    fetchAllCategories ({state, commit}) {
      const resource = 'categories'
      console.log('🔥‍', `All ${resource}`)
      return new Promise((resolve, reject) => {
        firebase.database().ref(resource).once('value', snapshot => {
          const categories = snapshot.val()
          Object.keys(categories).forEach(categoryId => {
            const category = categories[categoryId]
            commit('setItem', {resource, id: categoryId, item: category}, {root: true})
          })
          resolve(Object.values(state.items))
        })
      })
    }

  },

  mutations: {}
}
