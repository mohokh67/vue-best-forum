import Vue from 'vue'
export default {
   // user
  updateUser (state, {user, userId}) {
    Vue.set(state.users, userId, user)
  },

  // posts
  addPost (state, {post, postId}) {
    Vue.set(state.posts, postId, post)
  },

  addPostToUser (state, {userId, postId}) {
    const user = state.users[userId]
    if (!user.posts) {
      Vue.set(user, 'posts', {})
    }
    Vue.set(user.posts, postId, postId)
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
