<template>
  <div class="flex-grid justify-center">
    <div class="col-2">

      <form @submit.prevent="signIn" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" id="email" type="text" class="form-input">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="form.password" id="password" type="password" class="form-input">
        </div>

        <div v-if="message" class="form-group">
          <p class="error">{{message}}</p>
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{name: 'Register'}">Create an account?</router-link>
        </div>
      </form>

      <div class="push-top text-center">
        <button @click.prevent="registerWithGoogle" class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Sign in with Google</button>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {

    data () {
      return {
        form: {
          email: null,
          password: null
        },
        message: null
      }
    },

    methods: {
      ...mapActions('auth', ['signInUserWithEmailAndPassword', 'signInWithGoogle']),

      signIn () {
        this.signInUserWithEmailAndPassword({email: this.form.email, password: this.form.password})
          .then(() => this.$router.push({name: 'Home'}))
          .catch(error => { this.message = error.message })
      },

      registerWithGoogle () {
        this.signInWithGoogle()
          .then(() => this.$router.push({name: 'Home'}))
          .catch(error => { this.message = error.message })
      }

    },

    created () {
      this.$emit('ready')
    }
  }
</script>

<style scoped>
  .error{
    color: red
  }
</style>

