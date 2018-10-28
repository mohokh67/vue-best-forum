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
      ...mapGetters('auth', {
        'user': 'authUser'
      }),

      userPosts () {
        if (this.user.posts) {
          return Object.values(this.$store.state.posts.items)
            .filter(post => post.userId === this.user['.key'])
        }

        return []
      }
    }

  }
</script>
