<template>
  <div class="app-background-grey">
    <div class="app-wrapper">
      <div class="app-double-column">
        <div class="app-padded-verical">
          <h2 class="app-sub-title">Description</h2>
          <div class="app-description">{{ home.description }}</div>
        </div>
        <div class="app-padded-verical">
          <div
            v-for="(feature, index) in home.features"
            :key="index"
            class="app-tag"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyDescription",
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
