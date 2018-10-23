<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <textarea
          name=""
          id=""
          cols="300"
          rows="3"
          class="form-input"
          v-model="postText"
        ></textarea>
        <p v-if="hasError" class="text-error">The post can not be empty</p>
    </div>
    <div class="form-action btn-group">
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
    </div>
  </form>
</template>

<script>
  export default {
    props: {
      threadId: {
        required: false,
        type: String
      },
      post: {
        type: Object
      }
    },

    data () {
      return {
        postText: this.post ? this.post.text : '',
        hasError: false
      }
    },

    computed: {
      isUpdate () {
        return !!this.post
      }
    },

    methods: {
      save () {
        (this.presist())
          .then(post => {
            this.$emit('save', {post})
          })
      },

      presist () {
        return this.isUpdate ? this.update() : this.create()
      },

      create () {
        this.hasError = false
        if (this.postText === '') {
          this.hasError = true
          return
        }

        const post = {
          threadId: this.threadId,
          text: this.postText
        }

        this.postText = ''
        this.hasError = false
        return this.$store.dispatch('posts/create', post)
      },

      update () {
        const payload = {
          id: this.post['.key'],
          text: this.postText
        }

        this.postText = ''
        this.hasError = false
        return this.$store.dispatch('posts/update', payload)
      },

      cancel () {
        this.$emit('cancel')
      }

    }
  }
</script>

<style scoped>
.text-error {
  color: red;
  font-size: small;
}
</style>
