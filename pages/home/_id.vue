<template>
  <div>
    <div style="display: flex">
      <img
          v-for="image in home.images"
          :src="image"
          alt="home"
          :key="image"
          width="200"
          height="150"
      />
    </div>
    {{ home.title }}<br/>
    ${{ home.pricePerNight }} / night <br/>
    <img
        src="../../static/images/marker.svg"
        alt="address"
        height="20"
        width="20"
    />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} <br/>
    <img
        src="../../static/images/star.svg"
        alt="address"
        height="20"
        width="20"
    />
    {{ home.reviewValue }} <br/>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }},
    {{ home.bathrooms }} bath<br/>
    {{ home.description }}<br/>
    <div style="height: 330px; width: 330px" ref="map"></div>
    <div v-for="review in reviews">
      <img :src="review.reviewer.image"/> <br/>
      {{ review.reviewer.name }} <br/>
      {{ review.rating }} <br/>
      {{ review.date }} <br/>
      <ShortText :text="review.comment" :target="200"/>
    </div>
    <img :src="home.host.image" height="100"/>
  </div>
</template>

<script>
// import homes from '~/data/homes.json';
export default {
  name: "id",
  components: {},

  head() {
    return {
      title: this.home.title,
    };
  },
  mounted() {
    console.log("mounted  _id.vue");
    this.$maps.showMap(
        this.$refs.map,
        this.home._geoloc.lat,
        this.home._geoloc.lng
    );
  },

  async asyncData({$dataApi, params, error}) {
    console.log("asyncData _id.vue fire........");

    const homeId = params.id;

    const homeResponse = await $dataApi.getHome(homeId);
    if (!homeResponse.ok) {
      console.log(
          "asyncData error",
          homeResponse.status,
          homeResponse.statusText
      );
      return error({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      });
    }

    const reviewResponse = await $dataApi.getReviewByHomeId(homeId);
    if (!reviewResponse.ok)
      return error({
        statusCode: reviewResponse.status,
        message: reviewResponse.statusText,
      });

    return {
      home: homeResponse.json,
      reviews: reviewResponse.json.hits,
    };
  },
};
</script>

<style scoped></style>
