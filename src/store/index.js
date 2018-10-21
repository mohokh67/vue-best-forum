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
    // posts
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = this.state.authId

      commit('addPost', {post, postId})
      commit('addPostToThread', {postId, threadId: post.threadId})
      commit('addPostToUser', {userId: post.userId, postId})
      return Promise.resolve(state.posts[postId])
    },

    // threads
    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const publishedAt = Math.floor(Date.now() / 1000)
        const userId = this.state.authId
        const threadId = 'bestThread--' + Math.random()
        const thread = {'.key': threadId, title, forumId, publishedAt, userId}
        commit('addThread', {thread, threadId})
        commit('addThreadToUser', {userId, threadId})
        commit('addThreadToForum', {forumId, threadId})

        dispatch('createPost', {text, threadId})
          .then(post => {
            commit('addThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })
        resolve(state.threads[threadId])
      })
    },

    updateThread ({state, commit}, {id, text, title}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        const post = state.posts[thread.firstPostId]
        const newThread = {...thread, title}
        const newPost = {...post, text}

        commit('addThread', {thread: newThread, threadId: id})
        commit('addPost', {post: newPost, postId: thread.firstPostId})

        resolve(newThread)
      })
    },

    // user
    updateUser (context, user) {
      context.commit('updateUser', {user, userId: user['.key']})
    }
  },
  mutations: {
    // user
    updateUser (state, {user, userId}) {
      Vue.set(state.users, userId, user)
    },

    // posts
    addPost (state, {post, postId}) {
      Vue.set(state.posts, postId, post)
    },

    addPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]
      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }
      Vue.set(thread.posts, postId, postId)
    },

    addPostToUser (state, {userId, postId}) {
      const user = state.users[userId]
      if (!user.posts) {
        Vue.set(user, 'posts', {})
      }
      Vue.set(user.posts, postId, postId)
    },

    // threads
    addThread (state, {threadId, thread}) {
      Vue.set(state.threads, threadId, thread)
    },

    addThreadToForum (state, {forumId, threadId}) {
      const forum = state.forums[forumId]
      if (!forum.threads) {
        Vue.set(forum, 'threads', {})
      }
      Vue.set(forum.threads, threadId, threadId)
    },

    addThreadToUser (state, {userId, threadId}) {
      const user = state.users[userId]
      if (!user.threads) {
        Vue.set(user, 'threads', {})
      }
      Vue.set(user.threads, threadId, threadId)
    }
  }
})