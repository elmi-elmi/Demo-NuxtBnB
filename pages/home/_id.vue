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
// import homes from '~/data/homes.json';
export default {
  name: "id",
  head() {
    return {
      title: this.home.title,
      script: [
        //     {
        //   src: "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js",
        //   src:https://maps.googleapis.com/maps/api/js?key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU",
        //   hid: "map",
        //   defer: true,
        // }
        // ,
        // {
        //   src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU&callback=initMap",
        //   hid: "map",
        //   defer: true,
        //   skip: process.client && window.mapLoaded
        // }
        ,
        // {
        //   innerHTML: "window.initMap = function(){window.mapLoaded = true;}",
        //   hid: 'map-init'
        // }
      ],
      // link: [{
      //   rel: 'stylesheet',
      //   href: 'https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
      // }],
      // __dangerouslyDisableSanitizersByTagID: {"map-init": ['innerHtml']}

    }
  },
  methods: {},
  mounted() {
    this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng);
    // const interval = setInterval(()=>{
    //   if(window.mapLoaded) {
    //     clearInterval(interval)
    //     this.showMap()
    //   };
    // }, 200)
    // const map = new mapboxgl.Map({
    //   accessToken: 'pk.eyJ1Ijoic2hhaHJva2hlbCIsImEiOiJjbDBudzExeDAwZjNzM2JtenczcHByZnlxIn0.hsLE0MhdDSdPitnkB3-Kfw',
    //   // container: 'map',
    //   container: this.$refs.map,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [+this.home._geoloc.lng, +this.home._geoloc.lat],
    //   zoom: 17
    // });
    // const marker = new mapboxgl.Marker({
    //   draggable: true
    // })
    //     .setLngLat([+this.home._geoloc.lng, +this.home._geoloc.lat])
    //     .addTo(map);
    //
    // map.on('load',initMap)


  },
  // data() {
  //   return {home: {}}
  // },
  async asyncData({$dataApi, params, error}) {
    console.log('asyncData fire ****')
    // this.home = homes.find(home => home.objectID === this.$route.params.id)
    const response = await $dataApi.getHome(params.id)
    if (!response.ok) {
      console.log('asyncData error', response.status, response.statusText)
      return error({statusCode: response.status, message: response.statusText})
    }
    return {
      home: response.json
    }
  }
}
</script>

<style scoped>

</style>