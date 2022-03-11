<template>
  <div>
    <div v-for="home in homes">
        {{home.title}}
    </div>
  </div>
</template>

<script>
import home from '../data/homes.json';

export default{
  data(){
    return{
      homes: home.slice(0,3),
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