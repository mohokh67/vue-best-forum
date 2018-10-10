import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ThreadSHow from '@/components/ThreadShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadSHow,
      props: true // accept props from route
    }
  ],
  mode: 'history' // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
})
