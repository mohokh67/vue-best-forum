<template>
  <div class="thread">

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
      <!--<img src="" alt="" class="avatar-medium">-->

      <!--<div>-->
        <!--<p class="text-xsmall"><a href="#">Moho</a></p>-->
        <!--<p class="text-faded text-xsmall">2 Hours ago</p>-->
      <!--</div>-->

    </div>

  </div>
</template>
<script>
  import { countObjectProperties } from '@/helpers'

  export default {
    props: {
      thread: {
        type: Object,
        required: true
      }
    },

    computed: {
      repliedCount () {
        return countObjectProperties(this.thread.posts) - 1
      },
      user () {
        return this.$store.state.users.items[this.thread.userId]
      }
    }
  }
</script>
