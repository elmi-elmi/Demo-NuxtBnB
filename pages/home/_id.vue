<template>
  <div>
    <div class="app-container">
      <PropertyGallery :images="home.images"/>
      <PropertyDetails :home="home" />
      <PropertyDescription :home="home"/>
    </div>
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
      <img :src="review.reviewer.image" alt="reviewer"/> <br/>
      {{ review.reviewer.name }} <br/>
      {{ review.rating }} <br/>
      {{ review.date }} <br/>
      <ShortText :text="review.comment" :target="200"/>
    </div>
    <!--    <img :src="home.host.image" height="100" />-->
    <img :src="user.image" alt="user"/> <br/>
    {{ user.name }} <br/>
    {{ formatData(user.joined) }}
    {{ user.reviewCount }} <br/>
    {{ user.description }}
  </div>
</template>

<script>
export default {
  name: "id",
  components: {},


  head() {
    return {
      title: this.home.title,
    };
  },

  methods: {
    formatData(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    },
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
    const responses = await Promise.all([
      $dataApi.getHome(homeId),
      $dataApi.getReviewByHomeId(homeId),
      $dataApi.getUserByHomeId(homeId),
    ]);
    const badResponse = responses.find((response) => !response.ok);
    if (badResponse)
      return error({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      });
    // const homeId = params.id;
    // const homeResponse = await $dataApi.getHome(homeId);
    // if (!homeResponse.ok) {
    //   console.log(
    //     "asyncData error",
    //     homeResponse.status,
    //     homeResponse.statusText
    //   );
    //   return error({
    //     statusCode: homeResponse.status,
    //     message: homeResponse.statusText,
    //   });
    // }
    //
    // const reviewResponse = await $dataApi.getReviewByHomeId(homeId);
    // if (!reviewResponse.ok)
    //   return error({
    //     statusCode: reviewResponse.status,
    //     message: reviewResponse.statusText,
    //   });
    //
    // const userResponse = await $dataApi.getUserByHomeId(homeId);
    // if (!userResponse) {
    //   return error({
    //     statusCode: reviewResponse.status,
    //     message: userResponse.statusText,
    //   });
    // }

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    };
  },
};
</script>

<style scoped></style>
