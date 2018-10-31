<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Editing <em>{{thread.title}}</em></h1>
    <ThreadEditor
      ref="editor"
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
  import ThreadEditor from '@/components/ThreadEditor'
  import {mapActions} from 'vuex'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    components: {
      ThreadEditor
    },

    mixins: [asyncDataStatus],

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
        const post = this.$store.state.posts.items[this.thread.firstPostId]
        return post ? post.text : null
      },

      hasUnsavedChanges () {
        return this.thread.title !== this.$refs.editor.form.title || this.text !== this.$refs.editor.form.text
      }
    },

    methods: {
      ...mapActions('threads', ['fetchThread', 'updateThread']),
      ...mapActions('posts', ['fetchPost']),

      save ({title, text}) {
        this.updateThread({
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
    },

    created () {
      this.fetchThread({id: this.id})
        .then(thread => this.fetchPost({id: thread.firstPostId}))
        .then(() => {
          this.asyncDataStatus_fetched()
        })
    },

    beforeRouteLeave (to, from, next) {
      if (this.hasUnsavedChanges) {
        const confirmed = window.confirm('Are you sure you want to leave without saving?')
        confirmed ? next() : next(false)
      } else {
        next()
      }
    }
  }
</script>
