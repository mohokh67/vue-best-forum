<template>
  <div class="col-full push-top">
    <h1>Create new thread in <em>{{forum.name}}</em></h1>
    <ThreadEditor
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
  import ThreadEditor from '@/components/ThreadEditor'
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
        return this.$store.state.forums[this.forumId]
      }
    },

    methods: {
      save ({title, content}) {
        this.$store.dispatch('createThread', {
          forumId: this.forum['.key'],
          content,
          title
        }).then(thread => {
          this.$router.push({name: 'ThreadShow', params: {id: thread['.key']}})
        })
      },

      cancel () {
        this.$router.push({name: 'Forum', params: {id: this.forum['.key']}})
      }
    }
  }
</script>
