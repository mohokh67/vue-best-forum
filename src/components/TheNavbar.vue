<template>
  <header class="header" id="header" v-clickedOutside="closeMobileNavbar">

    <router-link
      :to="{name: 'Home'}"
      class="logo"
    >
      <img src="../assets/img/vueschool-logo.svg">
    </router-link>

    <div class="btn-hamburger" @click="mobileNavOpen = !mobileNavOpen">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar" :class="{'navbar-open': mobileNavOpen}">
      <ul v-if="user">
        <li class="navbar-user" v-clickedOutside="closeDropdown">
          <a @click.prevent="userDropdownOpen = !userDropdownOpen">
            <img class="avatar-small" :src="user.avatar" alt="">
            <span>
                {{user.name}}
                <img class="icon-profile" src="../assets/img/arrow-profile.svg" alt="">
            </span>
          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div
            id="user-dropdown"
            :class="{'active-drop': userDropdownOpen}">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{name: 'Profile'}">View Profile</router-link>
              </li>
              <li class="dropdown-menu-item">
                <!-- <router-link :to="{name: 'SignOut'}">Sign out</router-link> -->
                <a @click.prevent="signOut">Sign out</a>
              </li>
            </ul>
          </div>
        </li>
        <li class="navbar-mobile-item"><router-link :to="{name: 'Profile'}">View Profile</router-link></li>
        <li class="navbar-mobile-item"><a @click.prevent="signOut">Sign out</a></li>
       </ul>

       <ul v-else>
          <li class="navbar-item">
            <router-link :to="{name: 'SignIn'}">Sign in</router-link>
          </li>
          <li class="navbar-item">
            <router-link :to="{name: 'Register'}">Register</router-link>
          </li>
       </ul>
    </nav>
  </header>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import clickedOutside from '@/directives/clickedOutside'

  export default {

    data () {
      return {
        userDropdownOpen: false,
        mobileNavOpen: false
      }
    },

    directives: {
      clickedOutside
    },

    computed: {
      ...mapGetters('auth', {
        'user': 'authUser'
      })
    },

    methods: {
      ...mapActions('auth', ['signOut']),

      closeDropdown () {
        this.userDropdownOpen = false
      },

      closeMobileNavbar () {
        this.mobileNavOpen = false
      }
    }

  }
</script>

<style scoped>

</style>
