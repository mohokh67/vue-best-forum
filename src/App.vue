<template>
  <div id="app">
    <TheNavbar />
    <div class="container">
      <router-view :key="$route.path" v-show="showPage" @ready="pageReady" />
      <AppSpinner v-show="!showPage" />
    </div>
  </div>
</template>

<script>
  import TheNavbar from '@/components/TheNavbar'
  import AppSpinner from '@/components/AppSpinner'
  import Nprogress from 'nprogress'

  export default {

    components: {
      TheNavbar,
      AppSpinner
    },

    data () {
      return {
        showPage: false
      }
    },

    methods: {
      pageReady () {
        this.showPage = true
        Nprogress.done()
      }
    },

    created () {
      Nprogress.configure({
        speed: 313,
        showSpinner: false
      })
      Nprogress.start()

      this.$router.beforeEach((to, from, next) => {
        this.showPage = false
        Nprogress.start()
        next()
      })
    }

  }
</script>

<style>
@import "assets/css/style.css";
@import "~nprogress/nprogress.css";
</style>
