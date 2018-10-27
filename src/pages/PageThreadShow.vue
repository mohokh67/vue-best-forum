<template>
  <div v-if="thread && user" class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{name: 'ThreadEdit', id: this.id}"
        class="btn btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>
    <p>By
      <a href="#" class="link-unstyled">{{user.name}}</a> <AppDate :timestamp="thread.publishedAt" />
      <span class="hide-mobile text-faded text-small">{{repliedCount}} replies by {{contributersCount}} contributers</span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor
    :threadId="id"
    />

  </div>
</template>


<script>
  import PostList from '@/components/PostList'
  import PostEditor from '@/components/PostEditor'
  import { mapGetters, mapActions } from 'vuex'
  import {countObjectProperties} from '@/helpers'

  export default {
    components: {
      PostList,
      PostEditor
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },

    computed: {
      ...mapGetters({
        'threadRepliesTotal': 'threads/threadRepliesCount',
        'findThread': 'threads/findThread',
        'findUser': 'users/findUser'
      }),

      user () {
        return this.findUser(this.thread.userId)
      },

      repliedCount () {
        return this.threadRepliesTotal(this.thread['.key'])
      },

      contributersCount () {
        return countObjectProperties(this.thread.contributers)
      },

      thread () {
        return this.findThread(this.id)
      },

      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(this.$store.state.posts.items)
          .filter(post => postIds.includes(post['.key']))
      }
    },

    methods: {
      ...mapActions('threads', ['fetchThread']),
      ...mapActions('users', ['fetchUser']),
      ...mapActions('posts', ['fetchPost', 'fetchPosts'])
    },

    created () {
      this.fetchThread({id: this.id})
        .then(thread => {
          this.fetchUser({id: thread.userId})
          this.fetchPosts({ids: Object.keys(thread.posts)})
            .then(posts => {
              posts.forEach(post => {
                this.fetchUser({id: post.userId})
              })
            })
        })
    }
  }
</script>
