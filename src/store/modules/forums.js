import sourceData from '@/data'
import {appendChildToParentMutation} from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: sourceData.forums
  },

  getters: { },

  actions: { },

  mutations: {
    addThreadToForum: appendChildToParentMutation({child: 'posts'})
  }
}
