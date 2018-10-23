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
      <div v-if="editing">
        <PostEditor
          :post="post"
          @save="editing = false"
          @cancel="editing = false"
        />
      </div>
      <template v-else>
        <div>
          {{post.text}}
        </div>
        <a @click.prevent="editing = true" class="link-unstyled editPost" title="Make a chane"><i class="fa fa-pencil"></i></a>
      </template>
    </div>
    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">
        edited
        <AppDate :timestamp="post.edited.at" />
      </div>
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
  import { countObjectProperties } from '@/helpers'
  import PostEditor from './PostEditor'

  export default {
    props: {
      post: {
        required: true,
        type: Object
      }
    },

    components: {
      PostEditor
    },

    data () {
      return {
        editing: false
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
<style scoped>
  .editPost{
    margin-left: auto;
  }
</style>

