<template>
  <div>
    <div style="display:flex">
      <img v-for="image in home.images" :src="image" alt="home" :key="image" width="200" height="150">
    </div>
    {{ home.title }}<br/>
    ${{ home.pricePerNight }} / night <br/>
    <img src="../../static/images/marker.svg" alt="address" height="20" width="20"> {{home.location.address}} {{home.location.city}} {{home.location.state}} <br/>
    <img src="../../static/images/star.svg" alt="address" height="20" width="20"> {{home.reviewValue}} <br/>
    {{home.guests}} guests, {{home.bedrooms}}  rooms, {{home.beds}}, {{home.bathrooms}} bath<br/>
  </div>
</template>

<script>
import homes from '~/data/homes.json';

export default {
  name: "id",
  head(){
    return{
      title:this.home.title
    }
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