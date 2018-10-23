import Vue from 'vue'
import sourceData from '@/data'

export default {
  namespaced: true,

  state: {
    items: sourceData.forums
  },

  getters: { },

  actions: { },

  mutations: {
    addThreadToForum (state, {forumId, threadId}) {
      const forum = state.items[forumId]
      if (!forum.threads) {
        Vue.set(forum, 'threads', {})
      }
      Vue.set(forum.threads, threadId, threadId)
    }
  }
}
