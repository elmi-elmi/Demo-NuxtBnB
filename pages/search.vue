<template>
  <div>
    <div>results for {{ label }}</div>
    <div style="height: 530px; width: 530px; float: right" ref="map"></div>

    <div v-if="homes.length > 0">
      <nuxt-link v-for="home in homes" :key="home.objectID" :to="`/home/${home.objectID}`">
        <HomeRow :home="home" />
      </nuxt-link>
    </div>
    <div v-else>No results found</div>
  </div>
</template>

<script>
export default {
  name: "search",
  // watchQuery:['lat'],
  mounted() {
    this.updateMap();
  },
  methods: {
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers());
    },
    getHomeMarkers(){
      return this.homes.map(home=>{
        return {...home._geoloc}
      })
    }
  },
  async beforeRouteUpdate(to, from, next) {
    console.log("beforerouterUpdate");
    const data = await this.$dataApi.getHomeByLocation(
      to.query.lat,
      to.query.lng
    );
    this.homes = data.json.hits;

    this.lat = to.query.lat;
    this.lng = to.query.lng;
    this.label = to.query.label;
    this.updateMap();
    next();
  },
  async asyncData({ query, $dataApi }) {
    console.log("asyncdata in search .......");
    const data = await $dataApi.getHomeByLocation(query.lat, query.lng);
    console.log(data.json.hits);
    return {
      homes: data.json.hits,
      lat: query.lat,
      lng: query.lng,
      label: query.label,
    };
  },
};
</script>

<style scoped></style>
