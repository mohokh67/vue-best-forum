import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import ThreadSHow from '@/pages/PageThreadShow'
import NotFound from '@/pages/PageNotFound'
import Forum from '@/pages/PageForum'
import Profile from '@/pages/PageProfile'
import Category from '@/pages/PageCategory'

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
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true

    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadSHow,
      props: true // accept props from route
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: Profile,
      props: {edit: true}
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history' // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
})
