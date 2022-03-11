<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float: left; margin:10px">
        <home-card :home="home"></home-card>
    </div>
  </div>
</template>

<script>
import home from '~/data/homes';
export default {
  name: "index",
  head(){

    return{
      title:"Homepage",
      meta:[{
        name:"description",
        content:"This is a homepage!",
        hid:"description",
      }]

    }
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