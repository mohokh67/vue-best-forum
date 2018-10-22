export default {
  // user
  updateUser (context, user) {
    context.commit('updateUser', {user, userId: user['.key']})
  }
}
