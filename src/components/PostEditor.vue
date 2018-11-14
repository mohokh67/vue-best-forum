<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <textarea
          cols="300"
          rows="3"
          class="form-input"
          v-model="form.postText"
          @blur="$v.form.postText.$touch()"
        ></textarea>
        <template v-if="$v.form.postText.$error">
          <span v-if="!$v.form.postText.required" class="form-error">It is required</span>
          <span v-else-if="!$v.form.postText.minLength" class="form-error">Minimum 13 characters</span>
        </template>
    </div>
    <div class="form-action btn-group">
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
    </div>
  </form>
</template>

<script>
  import {mapActions} from 'vuex'
  import {required, minLength} from 'vuelidate/lib/validators'

  export default {

    props: {
      threadId: {
        required: false,
        type: String
      },

      post: {
        type: Object,
        validator: obj => {
          const keyIsValid = typeof obj['.key'] === 'string'
          const textIsValid = typeof obj.text === 'string'
          const valid = keyIsValid && textIsValid

          if (!valid) {
            console.log('The post object must include a `.key` and `text` attributes.')
          }

          return valid
        }
      }
    },

    validations: {
      form: {
        postText: {
          required,
          minLength: minLength(13)
        }
      }
    },

    data () {
      return {
        form: {
          postText: this.post ? this.post.text : ''
        }
      }
    },

    computed: {
      isUpdate () {
        return !!this.post
      }
    },

    methods: {
      ...mapActions('posts', {
        'createPost': 'create',
        'updatePost': 'update'
      }),

      save () {
        (this.presist())
          .then(post => {
            this.$emit('save', {post})
          }).catch(error => {
            console.log('Error in Validation: ' + error)
          })
      },

      presist () {
        return this.isUpdate ? this.update() : this.create()
      },

      create () {
        this.$v.form.$touch()
        if (this.$v.form.$invalid) {
          console.log('Post editor not submitted. Error in form validation')
          return Promise.reject(new Error('Post editor failed to create'))
        }

        const post = {
          threadId: this.threadId,
          text: this.form.postText
        }

        this.form.postText = ''
        this.$v.form.$reset()
        return this.createPost(post)
      },

      update () {
        this.$v.form.$touch()
        if (this.$v.form.$invalid) {
          console.log('Post editor not submitted. Error in form validation')
          return Promise.reject(new Error('Post editor failed to update'))
        }

        const payload = {
          id: this.post['.key'],
          text: this.form.postText
        }

        this.form.postText = ''
        this.$v.form.$reset()
        return this.updatePost(payload)
      },

      cancel () {
        this.$emit('cancel')
      }

    }
  }
</script>
