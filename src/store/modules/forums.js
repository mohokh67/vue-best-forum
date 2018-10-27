import {appendChildToParentMutation} from '@/helpers'

export default {
  namespaced: true,

  state: {
    // items: sourceData.forums
    items: {}
  },

  getters: { },

  actions: {

    fetchForums ({dispatch}, {ids}) {
      return dispatch('fetchItems', {ids, resource: 'forums'}, {root: true})
    }
  },

  mutations: {
    addThreadToForum: appendChildToParentMutation({child: 'posts'})
  }
}
