<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          class="form-input"
          v-model="postText"
        ></textarea>
    </div>
    <div class="form-action btn-group">
      <button class="btn-blue">Submit</button>
    </div>
  </form>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    props: {
      threadId: {
        required: true
      }
    },

    data () {
      return {
        postText: ''
      }
    },

    methods: {
      save () {
        const post = {
          threadId: this.threadId,
          text: this.postText
        }
        this.postText = ''
        // this.$emit('save', {post}) // custom event - broadcast event to any one who is listening
        this.$store.dispatch('createPost', post)
      }
    }
  }
</script>

<style scoped>

</style>
