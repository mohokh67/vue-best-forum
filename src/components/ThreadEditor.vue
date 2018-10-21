<template>
 <form @submit.prevent="save">
      <div class="form-group">
        <label for="threadTitle">Title:</label>
        <input
          v-model="form.title"
          type="text"
          class="form-input"
          id="threadTitle"
          name="title">
      </div>

      <div class="form-group">
        <label for="threadContent">Content:</label>
        <textarea
          v-model="form.text"
          name="content"
          id="threadContent"
          cols="140"
          rows="8"
          class="form-input">
        </textarea>
      </div>

      <div class="btn-group">
        <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit">{{isUpdating ? 'Update' : 'Publish'}}</button>
      </div>
    </form>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        form: {
          title: this.title,
          text: this.text
        }
      }
    },

    computed: {
      isUpdating () {
        return !!this.title
      }
    },

    methods: {
      save () {
        this.$emit('save', {title: this.form.title, text: this.form.text})
      },

      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>
