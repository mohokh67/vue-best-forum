<template>
  <div class="col-full">
    <h1>Welcome to the Forum</h1>
    <ThreadList :threads="threads"/>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import ThreadList from '@/components/ThreadList'
  // @ refers to src directory. The symbol has defined in webpack
  console.log(sourceData)

  export default {
    components: {
      ThreadList
    },

    data () {
      return {
        threads: Object.values(sourceData.threads),
        users: sourceData.users,
        posts: sourceData.posts
      }
    }
  }
</script>

<style scoped></style>
