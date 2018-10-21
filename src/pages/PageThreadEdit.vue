<template>
  <div class="col-full push-top">
    <h1>Editing <em>{{thread.title}}</em></h1>
    <ThreadEditor
      :title="thread.title"
      :content="content"
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
      id: {
        required: true,
        type: String
      }
    },

    computed: {
      thread () {
        return this.$store.state.threads[this.id]
      },

      content () {
        return this.$store.state.posts[this.thread.firstPostId].text
      }
    },

    methods: {
      save ({title, content}) {
        this.$store.dispatch('updateThread', {
          id: this.id,
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
