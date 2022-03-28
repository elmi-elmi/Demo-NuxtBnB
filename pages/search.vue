<template>
  <div>
    <div class="app-search-results-page">
      <div class="app-search-results">
        <div class="app-search-results-listing">
          <h2 class="app-title">Stays in {{label}}</h2>
          <nuxt-link
              v-for="home in homes"
              :key="home.objectID"
              :to="`/home/${home.objectID}`"
          >
            <HomeRow
                class="app-house"
                :home="home"
                @mouseover.native="highlightMarker(home.objectID, true)"
                @mouseout.native="highlightMarker(home.objectID, false)"
            />
          </nuxt-link>
        </div>
        <div class="app-search-results-map">
          <div class="app-map" ref="map"></div>
        </div>
      </div>
    </div>

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
    highlightMarker(homeId, isHighLighted) {
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle("marker-highlight", isHighLighted);
    },
    updateMap() {
      this.$maps.showMap(
        this.$refs.map,
        this.lat,
        this.lng,
        this.getHomeMarkers()
      );
    },
    getHomeMarkers() {
      if (this.homes.length === 0) return null;
      return this.homes.map((home) => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID,
        };
      });
    },
  },
  async beforeRouteUpdate(to, from, next) {
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
    const data = await $dataApi.getHomeByLocation(query.lat, query.lng);

    return {
      homes: data.json.hits,
      lat: query.lat,
      lng: query.lng,
      label: query.label,
    };
  },
};
</script>

<style>
.marker {
  background-color: white;
  color: black;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 8px;
}

.marker-highlight {
  background-color: black;
  border: 1px solid lightgray;
  color: white !important;
}
</style>
