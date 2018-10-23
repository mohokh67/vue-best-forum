<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{user.name}}</a>
      <a href="#">
        <img :src="user.avatar" class="avatar-large">
      </a>
      <p class="destop-only text-small">{{userPostsCount}} posts</p>
    </div>
    <div class="post-content">
      <div>
        {{post.text}}
      </div>
    </div>
    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
  import { countObjectProperties } from '@/helpers'

  export default {
    props: {
      post: {
        required: true,
        type: Object
      }
    },
    computed: {
      user () {
        return this.$store.state.users.items[this.post.userId]
      },
      userPostsCount () {
        return countObjectProperties(this.user.posts)
      }
    }

  }
</script>
