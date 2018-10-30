import firebase from 'firebase'
import {currentTimestamp} from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {},

  actions: {
    create ({commit, state, rootState}, post) {
      const postId = firebase.database().ref('posts').push().key
      post.publishedAt = currentTimestamp()
      post.userId = rootState.auth.authId

      const updates = {}
      updates[`posts/${postId}`] = post
      updates[`threads/${post.threadId}/posts/${postId}`] = postId
      updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
      updates[`users/${post.userId}/posts/${postId}`] = postId
      firebase.database().ref().update(updates)
        .then(() => {
          commit('setItem', {item: post, id: postId, resource: 'posts'}, {root: true})
          commit('threads/addPostToThread', {childId: postId, parentId: post.threadId}, {root: true})
          commit('threads/addContributorToThread', {childId: post.userId, parentId: post.threadId}, {root: true})
          commit('users/addPostToUser', {parentId: post.userId, childId: postId}, {root: true})
          return Promise.resolve(state.items[postId])
        })
    },

    update ({commit, state, rootState}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.items[id]
        const edited = {at: currentTimestamp(), by: rootState.auth.authId}
        const updatedPost = {...post, text, edited}

        const updates = {text, edited}
        firebase.database().ref('posts').child(id).update(updates)
          .then(() => {
            commit('setItem', {id, item: updatedPost, resource: 'posts'}, {root: true})
            resolve(post)
          })
      })
    },

    fetchPost: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'posts', id}, {root: true}),
    fetchPosts: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'posts'}, {root: true})

  },

  mutations: {}
}
