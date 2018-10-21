<template>
  <div class="col-full push-top">
    <h1>Create new thread in <em>{{forum.name}}</em></h1>
    <form @submit.prevent="save">

      <div class="form-group">
        <label for="threadTitle">Title:</label>
        <input
          v-model="title"
          type="text"
          class="form-input"
          id="threadTitle"
          name="title">
      </div>

      <div class="form-group">
        <label for="threadContent">ontent:</label>
        <textarea
          v-model="content"
          name="content"
          id="threadContent"
          cols="140"
          rows="8"
          class="form-input">
        </textarea>
      </div>

      <div class="btn-group">
        <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit">Publish</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      forumId: {
        required: true,
        type: String
      }
    },

    data () {
      return {
        title: '',
        content: ''
      }
    },

    computed: {
      forum () {
        return this.$store.state.forums[this.forumId]
      }
    },

    methods: {
      save () {
        this.$store.dispatch('createThread', {
          forumId: this.forum['.key'],
          content: this.content,
          title: this.title
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
