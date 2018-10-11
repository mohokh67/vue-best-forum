<template>

  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="posts"/>

    <form @submit.prevent="addPost">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          class="form-input"
          v-model="newPostText"
        ></textarea>
      </div>
      <div class="form-action">
        <button class="btn-blue">Submit</button>
      </div>
    </form>

  </div>

</template>


<script>
  import sourceData from '@/data'
  import PostList from '@/components/PostList'
  export default {
    components: {
      PostList
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        thread: sourceData.threads[this.id],
        newPostText: ''
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
      addPost () {
        const postId = 'greatPost.' + Math.random()
        const post = {
          publishedAt: Math.floor(Date.now()),
          threadId: this.id,
          userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
          text: this.newPostText,
          '.key': postId
        }
        this.$set(sourceData.posts, postId, post) // add post to posts
        this.$set(this.thread.posts, postId, postId) // add post to this thread threads post
        this.$set(sourceData.users[post.userId].posts, postId, postId) // add postId to this user
        this.newPostText = ''
      }
    }
  }
</script>
