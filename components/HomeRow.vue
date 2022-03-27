<template>
  <div>
  <div style="clear: left; padding:15px;">  </div>

  <img :src="home.images[0]" style="width: 200px; float:left; padding-right: 10px " alt="home"  />
    {{ home.title }}<br />
    {{ home.location.address }}
    {{ home.location.city }}
    {{ home.location.state }}<br />

    {{ pluralize(home.guests, "guest") }}
    {{ pluralize(home.bedrooms, "bedroom") }}
    {{ pluralize(home.beds, "bed") }}
    {{ pluralize(home.bathrooms, "bath") }} <br />

    ${{ home.pricePerNight }} / night <br />
    <img src="../static/images/star.svg" alt="address" height="20" width="20" />
    {{ home.reviewValue }} ({{home.reviewCount}})<br />
  </div>
</template>

<script>
import pluralize from '~/utils/pluralize';
export default {
  name: "HomeRow",
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pluralize,
  },
};
</script>

<style scoped></style>
