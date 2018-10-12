<template>

  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="posts"/>
    <PostEditor
    @save="addPost"
    :threadId="id"
    />
    <!-- On the save event (custom event on PostEditor component) run addPost() -->

  </div>

</template>


<script>
  import sourceData from '@/data'
  import PostList from '@/components/PostList'
  import PostEditor from '@/components/PostEditor'
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

    data () {
      return {
        thread: sourceData.threads[this.id]
      }
    },
    computed: {
      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(sourceData.posts)
          .filter(post => postIds.includes(post['.key']))
      }
    },
    methods: {
      addPost (eventData) {
        const post = eventData.post
        const postId = eventData.post['.key']
        this.$set(sourceData.posts, postId, post) // add post to posts
        this.$set(this.thread.posts, postId, postId) // add post to this thread threads post
        this.$set(sourceData.users[post.userId].posts, postId, postId) // add postId to this user
      }
    }
  }
</script>
