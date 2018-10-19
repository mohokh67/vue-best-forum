import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: sourceData,
  getters: {},
  actions: {
    createPost (context, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      context.commit('addPost', {post, postId})
      context.commit('addPostToThread', {postId, threadId: post.threadId})
      context.commit('addPostToUser', {userId: post.userId, postId})
    }
  },
  mutations: {
    addPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },
    addPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]
      Vue.set(thread.posts, postId, postId)
    },

    addPostToUser (state, {userId, postId}) {
      const user = state.users[userId]
      Vue.set(user.posts, postId, postId)
    }
  }
})
