<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
  import CategoryList from '@/components/CategoryList'

  export default {
    components: {
      CategoryList
    },

    computed: {
      categories () {
        return Object.values(this.$store.state.categories.items)
      }
    },

    beforeCreate () {
      this.$store.dispatch('categories/fetchAllCategories', {}, {root: true})
        .then(categories => {
          categories.forEach(category => this.$store.dispatch('forums/fetchForums', {ids: Object.keys(category.forums)}, {root: true}))
        })
    }

  }
</script>
