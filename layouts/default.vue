<template>
<div>
  <header style="background-color: #777">
    <nuxt-link to="/">Home</nuxt-link>
    <input type="text" ref="citySearch">
  </header>

  <Nuxt/></div>
</template>

<script>
export default {
  name: "default",
  mounted() {
      this.$maps.makeAutoComplete(this.$refs.citySearch)
  }
}
</script>

<style scoped>

</style>