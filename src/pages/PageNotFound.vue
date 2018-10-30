<template>
  <div class="col-full"
       :class="$style.centered"
  >
    <h1 :class="$style.headingLarge">Not Found</h1>
    <p :class="$style.textLarge">OoOoOops, we couldn't find what you are looking for. Take me to <router-link :to="{name:'Home'}">home</router-link>. </p>
  </div>

</template>

<script>
    export default {
      created () {
        this.$emit('ready') // Stop showing loading
      }
    }
</script>

<style module>
  .headingLarge {
    font-size: 100px;
  }

  .textLarge{
    font-size: 50px;
    font-weight: 100;
  }

  .centered{
    text-align: center;
  }

</style>
