import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/pages/PageHome'
import ThreadShow from '@/pages/PageThreadShow'
import ThreadCreate from '@/pages/PageThreadCreate'
import ThreadEdit from '@/pages/PageThreadEdit'
import NotFound from '@/pages/PageNotFound'
import Forum from '@/pages/PageForum'
import Profile from '@/pages/PageProfile'
import Category from '@/pages/PageCategory'
import SignIn from '@/pages/PageSignIn'
import Register from '@/pages/PageRegister'

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
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: ThreadCreate,
      props: true // accept props from route
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true // accept props from route
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: ThreadEdit,
      props: true // accept props from route
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signout',
      name: 'SignOut',
      beforeEnter (to, from, next) {
        store.dispatch('auth/signOut', {}, {root: true})
          .then(() => { next({name: 'Home'}) })
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true,
      beforeEnter (to, from, next) {
        store.state.auth.authId ? next() : next({name: 'Home'})
      }
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
