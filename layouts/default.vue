<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg" alt="logo">
      </div>
      <div class="app-search">
        <input type="text" ref="citySearch" @changedd="changedm" placeholder="Enter your address">
        <input type="text" class="datepicker" placeholder="Check in">
        <input type="text" class="datepicker" placeholder="Check out">
        <button>
          <img src="/images/icons/search.svg" alt="search">
        </button>
      </div>
      <div class="app-user-menu">
        <img src="/images/icons/house.svg" alt="house">
        <div class="name">Host</div>
        <img src="/images/user.jpg" alt="user" class="avatar">
      </div>
      <div id="googleButton"></div>
    </header>

    <nuxt />
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