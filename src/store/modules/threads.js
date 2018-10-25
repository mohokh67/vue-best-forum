import Vue from 'vue'
import sourceData from '@/data'
import {appendChildToParentMutation} from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: sourceData.threads
  },

  getters: { },

  actions: {
    createThread ({state, commit, dispatch, rootState}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const publishedAt = Math.floor(Date.now() / 1000)
        const userId = rootState.users.authId
        const threadId = 'bestThread--' + Math.random()
        const thread = {'.key': threadId, title, forumId, publishedAt, userId}
        commit('addThread', {thread, threadId})
        commit('users/addThreadToUser', {parentId: userId, childId: threadId}, {root: true})
        commit('forums/addThreadToForum', {parentId: forumId, childId: threadId}, {root: true})

        dispatch('posts/create', {text, threadId}, {root: true})
          .then(post => {
            commit('addThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })
        resolve(state.items[threadId])
      })
    },

    updateThread ({state, commit, dispatch, rootState}, {id, text, title}) {
      return new Promise((resolve, reject) => {
        const thread = state.items[id]
        const newThread = {...thread, title}

        commit('addThread', {thread: newThread, threadId: id})
        dispatch('posts/update', {id: thread.firstPostId, text}, {root: true})
          .then(() => {
            resolve(newThread)
          })
      })
    }
  },

  mutations: {
    addThread (state, {threadId, thread}) {
      Vue.set(state.items, threadId, thread)
    },

    addPostToThread: appendChildToParentMutation({child: 'posts'})
  }
}
