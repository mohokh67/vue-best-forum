export default {
    // posts
  createPost ({commit, state}, post) {
    const postId = 'greatPost' + Math.random()
    post['.key'] = postId
    post.publishedAt = Math.floor(Date.now() / 1000)
    post.userId = this.state.authId

    commit('addPost', {post, postId})
    commit('threads/addPostToThread', {postId, threadId: post.threadId}, {root: true})
    commit('addPostToUser', {userId: post.userId, postId})
    return Promise.resolve(state.posts[postId])
  },

  // user
  updateUser (context, user) {
    context.commit('updateUser', {user, userId: user['.key']})
  }
}
