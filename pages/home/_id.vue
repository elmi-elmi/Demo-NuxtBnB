<template>
  <div>
    <div class="app-container">
      <PropertyGallery :images="home.images"/>
      <PropertyDetails :home="home" />
      <PropertyDescription :home="home"/>
      <PropertyMap :home="home"/>
      <PropertyReviews :reviews="reviews"/>
      <PropertyHost :user="user"/>
    </div>

  </div>
</template>

<script>
import shortDate from "../../utils/shortDate";
export default {
  name: "id",
  components: {},


  head() {
    return {
      title: this.home.title,
    };
  },

  methods: {
    shortDate
  },


  async asyncData({$dataApi, params, error}) {
    const homeId = params.id;
    const responses = await Promise.all([
      $dataApi.getHome(homeId),
      $dataApi.getReviewByHomeId(homeId),
      $dataApi.getUserByHomeId(homeId),
    ]);
    const badResponse = responses.find((response) => !response.ok);
    if (badResponse)
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    };
  },
};
</script>

<style scoped></style>
