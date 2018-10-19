<template>

  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <p>By
      <a href="#" class="link-unstyled">MoHo</a> <AppDate :timestamp="thread.publishedAt" />
      <span class="hide-mobile text-faded text-small">3 replies by 3 contributers</span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor
    :threadId="id"
    />
    <!-- On the save event (custom event on PostEditor component) run addPost() -->

  </div>

</template>


<script>
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
        thread: this.$store.state.threads[this.id]
      }
    },
    computed: {
      posts () {
        const postIds = Object.values(this.thread.posts)
        return Object.values(this.$store.state.posts)
          .filter(post => postIds.includes(post['.key']))
      }
    }
  }
</script>
