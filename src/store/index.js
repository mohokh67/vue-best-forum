import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state) {
      return state.users[state.authId]
    }
  },
  actions: {
    createPost (context, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      context.commit('addPost', {post, postId})
      context.commit('addPostToThread', {postId, threadId: post.threadId})
      context.commit('addPostToUser', {userId: post.userId, postId})
    },

    updateUser (context, user) {
      context.commit('updateUser', {user, userId: user['.key']})
    }
  },
  mutations: {
    addPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },

    updateUser (state, {user, userId}) {
      Vue.set(state.users, userId, user)
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
