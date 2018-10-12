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
    <div class="form-action">
      <button class="btn-blue">Submit</button>
    </div>
  </form>
</template>

<script>
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
        const postId = 'greatPost.' + Math.random()
        const post = {
          publishedAt: Math.floor(Date.now() / 1000),
          threadId: this.threadId,
          userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
          text: this.postText,
          '.key': postId
        }
        this.postText = ''
        this.$emit('save', {post}) // custom event - broadcast event to any one who is listening
      }
    }
  }
</script>

<style scoped>

</style>
