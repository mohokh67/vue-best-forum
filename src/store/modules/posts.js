import Vue from 'vue'
import sourceData from '@/data'
import {currentTimestamp} from '@/helpers'

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
      post.publishedAt = currentTimestamp()
      post.userId = rootState.users.authId

      commit('addPost', {post, postId})
      commit('threads/addPostToThread', {childId: postId, parentId: post.threadId}, {root: true})
      commit('users/addPostToUser', {parentId: post.userId, childId: postId}, {root: true})
      return Promise.resolve(state.items[postId])
    },

    update ({commit, state, rootState}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.items[id]
        commit('addPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: currentTimestamp(),
              by: rootState.users.authId
            }
          }
        })
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
