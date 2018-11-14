<template>
 <form @submit.prevent="save">
      <div class="form-group">
        <label for="threadTitle">Title:</label>
        <input
          v-model="form.title"
          @blur="$v.form.title.$touch()"
          type="text"
          class="form-input"
          id="threadTitle"
          name="title">
          <template v-if="$v.form.title.$error">
            <span v-if="!$v.form.title.required" class="form-error">It is required</span>
            <span v-else-if="!$v.form.title.minLength" class="form-error">Minimum 7 characters</span>
          </template>
      </div>

      <div class="form-group">
        <label for="threadContent">Content:</label>
        <textarea
          v-model="form.text"
          @blur="$v.form.text.$touch()"
          name="content"
          id="threadContent"
          cols="140"
          rows="8"
          class="form-input">
        </textarea>
        <template v-if="$v.form.text.$error">
            <span v-if="!$v.form.text.required" class="form-error">It is required</span>
            <span v-else-if="!$v.form.text.minLength" class="form-error">Minimum 40 characters. Type at least {{40 - form.text.length}} more</span>
          </template>
      </div>

      <div class="btn-group">
        <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit">{{isUpdating ? 'Update' : 'Publish'}}</button>
      </div>
    </form>
</template>
<script>
  import {required, minLength} from 'vuelidate/lib/validators'

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

    validations: {
      form: {
        title: {
          required,
          minLength: minLength(7)
        },
        text: {
          required,
          minLength: minLength(40)
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
        this.$v.form.$touch()
        if (this.$v.form.$invalid) {
          console.log('Thread editor not submitted. Error in form validation')
          return
        }

        this.$emit('save', {title: this.form.title, text: this.form.text})
      },

      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>
