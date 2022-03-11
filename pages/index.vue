<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float: left; margin:10px">
        <home-card :home="home"></home-card>
    </div>
  </div>
</template>

<script>
import home from '~/data/homes';
import HomeCard from "~/components/HomeCard";
export default {
  name: "index",
  components:{
    HomeCard
  },
  data() {
    return {
      homes: home.slice(0, 3),
    }
  }
}
</script>


<!--<script>-->
<!--export default {-->
<!--  name: "index"-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->