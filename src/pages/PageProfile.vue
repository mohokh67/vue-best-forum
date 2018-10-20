<template>
  <div class="flex-grid">
    <UserProfileCard
      v-if="!edit"
      :user="user"
      :userPostsCount="userPostsCount"
      :userThreadsCount="userThreadsCount"
    />
    <UserProfileCardEdit
      v-else
      :user="user"
      :userPostsCount="userPostsCount"
      :userThreadsCount="userThreadsCount"
    />
      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead">ssssssssss</span>
          <a href="#">ssssss</a>
        </div>

        <hr>

      <PostList :posts="userPosts" />

    </div>
  </div>
</template>
<script>
  import PostList from '@/components/PostList'
  import { mapGetters } from 'vuex'
  import { countObjectProperties } from '@/helpers'
  import UserProfileCard from '@/components/UserProfileCard'
  import UserProfileCardEdit from '@/components/UserProfileCardEdit'

  export default {
    components: {
      PostList,
      UserProfileCard,
      UserProfileCardEdit
    },

    props: {
      edit: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      ...mapGetters({
        'user': 'authUser'
      }),

      userPostsCount () {
        return countObjectProperties(this.user.posts)
      },

      userThreadsCount () {
        return countObjectProperties(this.user.threads)
      },

      userPosts () {
        if (this.user.posts) {
          return Object.values(this.$store.state.posts)
            .filter(post => post.userId === this.user['.key'])
        }

        return []
      }
    }

  }
</script>
