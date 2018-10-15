import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import ThreadSHow from '@/pages/PageThreadShow'
import NotFound from '@/pages/PageNotFound'
import Forum from '@/pages/PageForum'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true

    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadSHow,
      props: true // accept props from route
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history' // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
})
