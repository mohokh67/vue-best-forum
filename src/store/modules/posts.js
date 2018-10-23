import Vue from 'vue'
import sourceData from '@/data'

export default {
  namespaced: true,

  state: {
    items: sourceData.posts
  },

  getters: { },

  actions: {
    create ({commit, state, rootState}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = rootState.users.authId

      commit('addPost', {post, postId})
      commit('threads/addPostToThread', {postId, threadId: post.threadId}, {root: true})
      commit('users/addPostToUser', {userId: post.userId, postId}, {root: true})
      return Promise.resolve(state.items[postId])
    },

    update ({commit, state, rootState}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.items[id]
        commit('addPost', {postId: id, post: {...post, text}})
        resolve(post)
      })
    }
  },

  mutations: {
    addPost (state, {post, postId}) {
      Vue.set(state.items, postId, post)
    }
  }
}
