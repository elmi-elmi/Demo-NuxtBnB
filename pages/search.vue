<template>
  <div>
    <div>{{ lat }} / {{ lng }} / {{ label }}</div>
    <div v-for="home in homes" :key="home.objectID">
      {{home.title}}
    </div>
  </div>

</template>

<script>
export default {
  name: "search",
  watchQuery:['lat'],
  async asyncData({query, $dataApi}) {
    console.log('asyncdata in search .......')
    const data = await $dataApi.getHomeByLocation(query.lat, query.lng)
    console.log(data.json.hits)
    return {
      homes: data.json.hits,
      lat: query.lat,
      lng: query.lng,
      label: query.label
    }
  }
}
</script>

<style scoped>

</style>