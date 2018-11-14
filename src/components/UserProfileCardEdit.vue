<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" alt="" class="avatar-xlarge img-update">
      </p>

      <div class="form-group">
        <input
          v-model="currentUser.username"
          @blur="$v.currentUser.username.$touch()"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold">
        <template v-if="$v.currentUser.username.$error">
          <span v-if="!$v.currentUser.username.required" class="form-error">It is required</span>
          <span v-else-if="!$v.currentUser.username.minLength" class="form-error">Minimum 4 characters</span>
          <span v-else-if="!$v.currentUser.username.unique" class="form-error">This username has been taken</span>
        </template>
      </div>

      <div class="form-group">
        <input
          v-model="currentUser.name"
          @blur="$v.currentUser.name.$touch()"
          type="text"
          placeholder="Full Name"
          class="form-input text-bold">
        <template v-if="$v.currentUser.name.$error">
          <span v-if="!$v.form.currentUser.name.required" class="form-error">It is required</span>
        </template>
      </div>

      <div class="form-group">
        <label for="userbio">Bio</label>
        <textarea v-model="currentUser.bio" class="form-input" id="userbio" placeholder="Tell us more about yourself."> </textarea>
      </div>

      <div class="stats">
        <span>{{userPostsCount}} posts</span>
        <span>{{userThreadsCount}} threads</span>
      </div>

      <hr>

      <div class="form-group">
        <label class="form-label" for="userWebsite">Website</label>
        <input
          v-model="currentUser.website"
          @blur="$v.currentUser.website.$touch()"
          class="form-input"
          id="userWebsite"
           autocomplete="off">
        <template v-if="$v.currentUser.website.$error">
          <span v-if="!$v.currentUser.website.url" class="form-error">It should be avalid URL</span>
        </template>
      </div>

      <div class="form-group">
        <label class="form-label" for="userEmail">Email</label>
        <input
          v-model="currentUser.email"
          @blur="$v.currentUser.email.$touch()"
          class="form-input"
          id="userEmail"
          autocomplete="off">
        <template v-if="$v.currentUser.email.$error">
          <span v-if="!$v.form.currentUser.email.required" class="form-error">It is required</span>
          <span v-else-if="!$v.currentUser.email.email" class="form-error">It should be a valid email</span>
          <span v-else-if="!$v.currentUser.email.unique" class="form-error">This email has been used</span>
        </template>
      </div>

      <div class="form-group">
        <label class="form-label" for="userLocation">Location</label>
        <input v-model="currentUser.location" class="form-input" id="userLocation" autocomplete="off">
      </div>

      <div class="form-group space-between">
        <button @click.prevent="cancel" class="btn-ghost">Cancel</button>
        <button @click.prevent="save" type="submit" class="btn-blue">Save</button>
      </div>

    </div>

      <p class="text-xsmall text-faded text-center">Member since 2000, last visited 10 years ago</p>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { required, minLength, email, url } from 'vuelidate/lib/validators'
  import { uniqueEmail, uniqueUsername } from '@/helpers/validators'

  export default {
    props: {
      user: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        currentUser: {...this.user}
      }
    },

    validations: {
      currentUser: {
        name: {
          required
        },
        username: {
          required,
          minLength: minLength(4),
          unique (value) {
            if (value.toLowerCase() === this.currentUser.usernameLower) {
              return true
            }
            return uniqueUsername(value)
          }
        },
        email: {
          required,
          email,
          unique (value) {
            if (value.toLowerCase() === this.currentUser.email) {
              return true
            }
            return uniqueEmail(value)
          }
        },
        website: {
          url
        }
      }
    },

    methods: {
      save () {
        this.$v.currentUser.$touch()
        if (!this.$v.currentUser.$invalid) {
          this.$store.dispatch('users/updateUser', {...this.currentUser})
          this.$router.push({name: 'Profile'})
        }
      },

      cancel () {
        this.$router.push({name: 'Profile'})
      }
    },

    computed: {
      ...mapGetters('users', {
        'userTotalPosts': 'userPostsCount',
        'userTotalThreads': 'userThreadsCount'
      }),

      userPostsCount () {
        return this.userTotalPosts(this.user['.key'])
      },

      userThreadsCount () {
        return this.userTotalThreads(this.user['.key'])
      }
    }

  }
</script>
