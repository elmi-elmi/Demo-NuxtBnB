<template>
  <div>
    <div style="display:flex">
      <img v-for="image in home.images" :src="image" alt="home" :key="image" width="200" height="150">
    </div>
    {{ home.title }}<br/>
    ${{ home.pricePerNight }} / night <br/>
    <img src="../../static/images/marker.svg" alt="address" height="20" width="20"> {{ home.location.address }}
    {{ home.location.city }} {{ home.location.state }} <br/>
    <img src="../../static/images/star.svg" alt="address" height="20" width="20"> {{ home.reviewValue }} <br/>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }}, {{ home.bathrooms }} bath<br/>
    {{ home.description }}<br/>
    <div style="height: 330px;width: 330px" ref="map"></div>
  </div>
</template>

<script>
import homes from '~/data/homes.json';

export default {
  name: "id",
  head() {
    return {
      title: this.home.title,
      script: [{
        src: "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js",
        hid: "map",
        defer: true
      }],
      link: [{
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
      }]

    }
  },
  mounted() {
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1Ijoic2hhaHJva2hlbCIsImEiOiJjbDBudzExeDAwZjNzM2JtenczcHByZnlxIn0.hsLE0MhdDSdPitnkB3-Kfw',
      // container: 'map',
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [+this.home._geoloc.lng, +this.home._geoloc.lat],
      zoom: 17
    });
    const marker = new mapboxgl.Marker({
      draggable: true
    })
        .setLngLat([+this.home._geoloc.lng, +this.home._geoloc.lat])
        .addTo(map);

  },
  data() {
    return {home: {}}
  },
  created() {
    this.home = homes.find(home => home.objectID === this.$route.params.id)
  }
}
</script>

<style scoped>

</style>