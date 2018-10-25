<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" alt="" class="avatar-xlarge">
      </p>

      <h1 class="title">{{user.username}}</h1>
      <p class="text-lead">{{user.name}}</p>
      <p class="text-justify">
        <span v-if="user.bio">{{user.bio}}</span>
        <span v-else>No bio available.</span>
      </p>

      <span class="online">{{user.username}} is online</span>

      <div class="stats">
        <span>{{userPostsCount}} posts</span>
        <span>{{userThreadsCount}} threads</span>
      </div>

      <hr>

      <p v-if="user.website" class="text-large text-center">
        <i class="fas fa-globe">
          <a :href="user.website">{{user.website}}</a>
        </i>
      </p>
    </div>

      <p class="text-xsmall text-faded text-center">sssss</p>
      <div class="text-center">
        <hr>
        <router-link :to="{name: 'ProfileEdit'}" class="btn-green btn-small">Edit Profile</router-link>
      </div>
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
