<template>
  <div v-if="forum" class="col-full push-top">
    <h1>Create new thread in <em>{{forum.name}}</em></h1>
    <ThreadEditor
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
  import ThreadEditor from '@/components/ThreadEditor'
  import {mapActions} from 'vuex'

  export default {
    components: {
      ThreadEditor
    },

    props: {
      forumId: {
        required: true,
        type: String
      }
    },

    computed: {
      forum () {
        return this.$store.state.forums.items[this.forumId]
      }
    },

    methods: {
      ...mapActions('forums', ['fetchForum']),

      save ({title, text}) {
        this.$store.dispatch('threads/createThread', {
          forumId: this.forum['.key'],
          text,
          title
        }).then(thread => {
          this.$router.push({name: 'ThreadShow', params: {id: thread['.key']}})
        })
      },

      cancel () {
        this.$router.push({name: 'Forum', params: {id: this.forum['.key']}})
      }
    },

    created () {
      this.fetchForum({id: this.forumId})
    }
  }
</script>
