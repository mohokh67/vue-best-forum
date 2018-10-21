<template>
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
        <label for="threadContent">Content:</label>
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
</template>
<script>
  export default {
    data () {
      return {
        title: '',
        content: ''
      }
    },

    methods: {
      save () {
        this.$emit('save', {title: this.title, content: this.content})
      },

      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>
