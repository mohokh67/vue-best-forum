import {appendChildToParentMutation} from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {},

  actions: {
    fetchForum: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'forums', id}, {root: true}),
    fetchForums: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'forums'}, {root: true})
  },

  mutations: {
    addThreadToForum: appendChildToParentMutation({child: 'posts'})
  }
}
