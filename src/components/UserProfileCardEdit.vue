<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" alt="" class="avatar-xlarge img-update">
      </p>

      <div class="form-group">
        <input v-model="currentUser.username" type="text" placeholder="Username" class="form-input text-lead text-bold">
      </div>

      <div class="form-group">
        <input v-model="currentUser.name" type="text" placeholder="Full Name" class="form-input text-bold">
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
        <input v-model="currentUser.website" class="form-input" id="userWebsite" autocomplete="off">
      </div>

      <div class="form-group">
        <label class="form-label" for="userEmail">Email</label>
        <input v-model="currentUser.email" class="form-input" id="userEmail" autocomplete="off">
      </div>

      <div class="form-group">
        <label class="form-label" for="userLocation">Location</label>
        <input v-model="currentUser.location" class="form-input" id="userLocation" autocomplete="off">
      </div>

      <div class="form-group space-between">
        <button  @click.prevent="cancel" class="btn-ghost">Cancel</button>
        <button @click.prevent="save" type="submit" class="btn-blue">Save</button>
      </div>

    </div>

      <p class="text-xsmall text-faded text-center">Member since 2000, last visited 10 years ago</p>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

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

    methods: {
      save () {
        this.$store.dispatch('users/updateUser', {...this.currentUser})
        this.$router.push({name: 'Profile'})
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
