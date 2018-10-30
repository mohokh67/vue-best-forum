<template>
  <div v-if="ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
  import CategoryList from '@/components/CategoryList'
  import {mapActions} from 'vuex'

  export default {
    components: {
      CategoryList
    },

    computed: {
      categories () {
        return Object.values(this.$store.state.categories.items)
      }
    },

    data () {
      return {
        ready: false
      }
    },

    methods: {
      ...mapActions('categories', ['fetchAllCategories']),
      ...mapActions('forums', ['fetchForums'])
    },

    created () {
      this.fetchAllCategories()
        .then(categories => Promise.all(categories.map(category => this.fetchForums({ids: Object.keys(category.forums)}))))
        .then(() => {
          this.ready = true
        })
    }

  }
</script>
