<template>
  <div v-if="thread && user" class="thread">

    <div>
      <p>
        <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">
          {{ thread.title }}
        </router-link>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{user.name}}</a>, <AppDate :timestamp="thread.publishedAt" />
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{repliedCount}} replies</p>
    </div>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      thread: {
        type: Object,
        required: true
      }
    },

    computed: {
      ...mapGetters({
        'threadRepliesTotal': 'threads/threadRepliesCount',
        'findUser': 'users/findUser'
      }),

      repliedCount () {
        return this.threadRepliesTotal(this.thread['.key'])
      },

      user () {
        return this.findUser(this.thread.userId)
      }
    }
  }
</script>
