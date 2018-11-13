<template>
  <div class="flex-grid">
    <UserProfileCard
      v-if="!edit"
      :user="user"
    />
    <UserProfileCardEdit
      v-else
      :user="user"
    />
      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead">{{user.username}}'s recent activity</span>
        </div>

        <hr>

      <PostList :posts="userPosts" />

    </div>
  </div>
</template>
<script>
  import PostList from '@/components/PostList'
  import { mapGetters } from 'vuex'
  import UserProfileCard from '@/components/UserProfileCard'
  import UserProfileCardEdit from '@/components/UserProfileCardEdit'
  import asyncDataStatus from '@/mixins/asyncDataStatus'

  export default {
    components: {
      PostList,
      UserProfileCard,
      UserProfileCardEdit
    },

    mixins: [asyncDataStatus],

    props: {
      edit: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      ...mapGetters('auth', {
        'user': 'authUser'
      }),

      ...mapGetters('users', {
        'posts': 'userPosts'
      }),

      userPosts () {
        return this.posts(this.user['.key'])
      }
    },

    created () {
      const userPostsIds = this.user.posts ? this.user.posts : []
      this.$store.dispatch('posts/fetchPosts', {ids: userPostsIds}, {root: true})
        .then(() => this.asyncDataStatus_fetched())
    }

  }
</script>
