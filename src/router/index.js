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

const router = new Router({
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
      meta: {requiredAuth: true},
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
      meta: {requiredAuth: true},
      props: true // accept props from route
    },
    {
      path: '/register',
      name: 'Register',
      meta: {requiredGuest: true},
      component: Register
    },
    {
      path: '/signin',
      name: 'SignIn',
      meta: {requiredGuest: true},
      component: SignIn
    },
    {
      path: '/signout',
      name: 'SignOut',
      meta: {requiredAuth: true},
      beforeEnter (to, from, next) {
        store.dispatch('auth/signOut', {}, {root: true})
          .then(() => { next({name: 'Home'}) })
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {requiredAuth: true},
      props: true
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: Profile,
      meta: {requiredAuth: true},
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

router.beforeEach((to, from, next) => {
  console.log(`Navigate from ${from.name} to ${to.name}`)
  // to.meta.requiredAuth
  // will only work with the specific route, not with any nested routes

  store.dispatch('auth/initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.requiredAuth)) {
        user ? next() : next({name: 'SignIn', query: {redirectTo: to.path}})
      } else if (to.matched.some(route => route.meta.requiredGuest)) {
        user ? next({name: 'Home'}) : next()
      } else {
        next()
      }
    })
})

export default router
