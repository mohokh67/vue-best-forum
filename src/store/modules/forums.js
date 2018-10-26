import {appendChildToParentMutation} from '@/helpers'

export default {
  namespaced: true,

  state: {
    // items: sourceData.forums
    items: {}
  },

  getters: { },

  actions: { },

  mutations: {
    addThreadToForum: appendChildToParentMutation({child: 'posts'})
  }
}
