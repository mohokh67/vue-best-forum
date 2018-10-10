<template>

  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <div class="post-list">
      <div v-for="postId in thread.posts" class="post">
        <div class="user-info">
          <a href="#" class="user-name">{{ users[posts[postId].userId].name }}</a>
          <a href="#">
            <img :src="users[posts[postId].userId].avatar" class="avatar-large">
          </a>
          <p class="destop-only text-small">100 posts</p>
        </div>
        <div class="post-content">
          <div>
            {{ posts[postId].text }}
          </div>
        </div>
        <div class="post-date text-faded">
          {{ posts[postId].publishedAt }}
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  import sourceData from '@/data'
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        thread: sourceData.threads[this.id],
        posts: sourceData.posts,
        users: sourceData.users
      }
    }
  }
</script>
