<template>
  <div class="col-full">
    <h1>Welcome to the Forum</h1>
    <ForumList :forums="forums"/>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import ForumList from '@/components/ForumList'
  // @ refers to src directory. The symbol has defined in webpack
  console.log(sourceData)

  export default {
    components: {
      ForumList
    },

    data () {
      return {
        forums: Object.values(sourceData.forums),
        users: sourceData.users,
        posts: sourceData.posts
      }
    }
  }
</script>

<style scoped></style>
