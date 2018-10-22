export default {
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
}
