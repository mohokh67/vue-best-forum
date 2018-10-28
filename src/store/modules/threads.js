import {countObjectProperties, appendChildToParentMutation} from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {
    threadRepliesCount: (state) => (id) => countObjectProperties(state.items[id].posts) - 1,
    findThread: (state) => (id) => state.items[id]
  },

  actions: {
    createThread ({state, commit, dispatch, rootState}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const publishedAt = Math.floor(Date.now() / 1000)
        const userId = rootState.auth.authId
        const threadId = 'bestThread--' + Math.random()
        const thread = {'.key': threadId, title, forumId, publishedAt, userId}
        commit('setItem', {item: thread, id: threadId, resource: 'threads'}, {root: true})
        commit('users/addThreadToUser', {parentId: userId, childId: threadId}, {root: true})
        commit('forums/addThreadToForum', {parentId: forumId, childId: threadId}, {root: true})

        dispatch('posts/create', {text, threadId}, {root: true})
          .then(post => {
            commit('setItem', {id: threadId, item: {...thread, firstPostId: post['.key']}, resource: 'threads'}, {root: true})
          })
        resolve(state.items[threadId])
      })
    },

    updateThread ({state, commit, dispatch}, {id, text, title}) {
      return new Promise((resolve, reject) => {
        const thread = state.items[id]
        const newThread = {...thread, title}

        commit('setItem', {item: newThread, threadId: id, resource: 'threads'}, {root: true})
        dispatch('posts/update', {id: thread.firstPostId, text}, {root: true})
          .then(() => {
            resolve(newThread)
          })
      })
    },

    fetchThread: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'threads', id}, {root: true}),
    fetchThreads: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'threads'}, {root: true})
  },

  mutations: {
    addPostToThread: appendChildToParentMutation({child: 'posts'})
  }
}
