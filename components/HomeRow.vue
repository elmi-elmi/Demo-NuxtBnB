<template>
  <div>
    <div
      class="app-house-header"
      :style="`background-image:url(${home.images[0]})`"
    ></div>
    <div class="app-house-body">
      <img src="/images/icons/heart.svg" alt="icon" class="app-fav" />
      <h2>{{ home.title }}</h2>
      <div class="app-address">
        {{ home.location.address }}
        {{ home.location.city }}
        {{ home.location.state }}
      </div>
      <div class="app-omenities">
        <p>
          {{ pluralize(home.guests, "guest") }}
          {{ pluralize(home.bedrooms, "bedroom") }}
          {{ pluralize(home.beds, "bed") }}
          {{ pluralize(home.bathrooms, "bath") }}
        </p>
        <p>{{ features }}</p>
      </div>
      <div class="app-flex">
        <div class="app-rating">
          {{ home.reviewValue }} {{ home.reviewCount }}
        </div>
        <div class="app-price">
          {{ home.pricePerNight }} <span>/ night</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pluralize from "~/utils/pluralize";
export default {
  name: "HomeRow",
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  computed:{
    features(){
      return this.home.features.slice(0,3).join(', ')
    }
  },
  methods: {
    pluralize,
  },
};
</script>

<style scoped></style>
