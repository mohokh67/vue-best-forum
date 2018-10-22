<template>
  <div class="col-full push-top">
    <h1>Editing <em>{{thread.title}}</em></h1>
    <ThreadEditor
      :title="thread.title"
      :text="text"
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
        return this.$store.state.threads.items[this.id]
      },

      text () {
        return this.$store.state.posts[this.thread.firstPostId].text
      }
    },

    methods: {
      save ({title, text}) {
        this.$store.dispatch('threads/updateThread', {
          id: this.id,
          text,
          title
        }).then(thread => {
          this.$router.push({name: 'ThreadShow', params: {id: this.id}})
        })
      },

      cancel () {
        this.$router.push({name: 'ThreadShow', params: {id: this.id}})
      }
    }
  }
</script>
