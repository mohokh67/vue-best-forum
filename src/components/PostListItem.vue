<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{user.name}}</a>
      <a href="#">
        <img :src="user.avatar" class="avatar-large">
      </a>
      <p class="destop-only text-small">{{userThreadsCount}} posts</p>
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
  import PostEditor from './PostEditor'
  import {mapGetters} from 'vuex'

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

      ...mapGetters('users', {
        'userTotalPosts': 'userPostsCount',
        'userTotalThreads': 'userThreadsCount',
        'findUser': 'findUser'
      }),

      user () {
        return this.findUser(this.post.userId)
      },

      userPostsCount () {
        return this.userTotalPosts(this.post.userId)
      },

      userThreadsCount () {
        return this.userTotalThreads(this.post.userId)
      }
    }

  }
</script>
<style scoped>
  .editPost{
    margin-left: auto;
  }
</style>

