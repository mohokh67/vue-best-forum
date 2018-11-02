<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="register" class="card card-form">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            v-model.trim="form.name"
            @blur="$v.form.name.$touch()"
            id="name"
            type="text"
            class="form-input">
          <template v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required" class="form-error">It is required</span>
          </template>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model.lazy.trim="form.username"
            @blur="$v.form.username.$touch()"
            id="username"
            type="text"
            class="form-input">
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">It is required</span>
            <span v-else-if="!$v.form.username.minLength" class="form-error">Minimum 4 characters</span>
            <span v-else-if="!$v.form.username.unique" class="form-error">This username has been taken</span>
          </template>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model.lazy.trim="form.email"
            @blur="$v.form.email.$touch()"
            id="email"
            type="email"
            class="form-input">
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">It is required</span>
            <span v-else-if="!$v.form.email.email" class="form-error">It should be a valid email</span>
            <span v-else-if="!$v.form.email.unique" class="form-error">This email has been used</span>
          </template>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            @blur="$v.form.password.$touch()"
            id="password"
            type="password"
            class="form-input">
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">It is required</span>
            <span v-else-if="!$v.form.password.minLength" class="form-error">Minimum 6 characters</span>
          </template>
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input
            v-model.lazy="form.avatar"
            @blur="$v.form.avatar.$touch()"
            id="avatar"
            type="text"
            class="form-input">
          <template v-if="$v.form.avatar.$error">
            <span v-if="!$v.form.avatar.url" class="form-error">It should be avalid URL</span>
            <span v-else-if="!$v.form.avatar.supportedType" class="form-error">Supported files are 'jpg', 'png', 'gif' and 'svg'</span>
            <span v-else-if="!$v.form.avatar.responseOk" class="form-error">This avatar doesn't exist</span>
          </template>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>

      </form>
      <div class="text-center push-top">
        <button @click.prevent="registerWithGoogle" class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Sign up with Google</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {required, minLength, email, url} from 'vuelidate/lib/validators'
  import {mapActions} from 'vuex'
  import {uniqueEmail, uniqueUsername, avatarSupportedType, avatarResponseOk} from '@/helpers/validators'

  export default {

    data () {
      return {
        form: {
          name: null,
          username: null,
          email: null,
          password: null,
          avatar: null
        }
      }
    },

    validations: {
      form: {
        name: {
          required
        },
        username: {
          required,
          minLength: minLength(4),
          unique: uniqueUsername
        },
        email: {
          required,
          email,
          unique: uniqueEmail
        },
        password: {
          required,
          minLength: minLength(6)
        },
        avatar: {
          url,
          supportedType: avatarSupportedType,
          responseOk: avatarResponseOk
        }
      }
    },

    methods: {
      ...mapActions('auth', ['registerUserWithEmailAndPassword', 'signInWithGoogle']),

      register () {
        this.$v.form.$touch()
        if (this.$v.form.$invalid) {
          console.log('Register form not submitted. Error in form validation')
          return
        }

        console.log('Register form has validated.')
        this.registerUserWithEmailAndPassword(this.form)
          .then(() => this.successRedirect())
      },

      registerWithGoogle () {
        this.signInWithGoogle()
          .then(() => this.successRedirect())
      },

      successRedirect () {
        const redirectTo = this.$route.query.redirectTo || {name: 'Home'}
        this.$router.push(redirectTo)
      }
    },

    created () {
      this.$emit('ready')
    }
  }
</script>

