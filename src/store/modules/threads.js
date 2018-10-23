import Vue from 'vue'
import sourceData from '@/data'

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
        const userId = rootState.authId
        const threadId = 'bestThread--' + Math.random()
        const thread = {'.key': threadId, title, forumId, publishedAt, userId}
        commit('addThread', {thread, threadId})
        commit('users/addThreadToUser', {userId, threadId}, {root: true})
        commit('forums/addThreadToForum', {forumId, threadId}, {root: true})

        dispatch('posts/createPost', {text, threadId}, {root: true})
          .then(post => {
            commit('addThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })
        resolve(state.items[threadId])
      })
    },

    updateThread ({state, commit, rootState}, {id, text, title}) {
      return new Promise((resolve, reject) => {
        const thread = state.items[id]
        const post = rootState.posts.items[thread.firstPostId]
        const newThread = {...thread, title}
        const newPost = {...post, text}

        commit('addThread', {thread: newThread, threadId: id})
        commit('posts/addPost', {post: newPost, postId: thread.firstPostId}, {root: true})

        resolve(newThread)
      })
    }
  },

  mutations: {
    addThread (state, {threadId, thread}) {
      Vue.set(state.items, threadId, thread)
    },

    addPostToThread (state, {postId, threadId}) {
      const thread = state.items[threadId]
      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }
      Vue.set(thread.posts, postId, postId)
    }
  }
}
