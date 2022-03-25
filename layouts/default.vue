<template>
  <div>
    <header style="background-color: #777">
      <nuxt-link to="/">Home</nuxt-link>
      <input type="text" ref="citySearch" @changedd="changedm">
    </header>
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: "default",
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch)
  },
  methods: {
    changedm(event) {
      const place = event.detail
      if (!place.geometry) return

      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value
        }
      })
    }
  }
}
</script>

<style scoped>

</style>