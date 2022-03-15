<template>
  <div style="color:white;text-align:center; background-image:linear-gradient(to right,#123143,#133559); border-radius: 10px; width:20%;margin:0 auto;box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
    <h1>Error:</h1>
    <h3>{{ error.statusCode }}: {{ error.message }}</h3>
  </div>
</template>

<script>
export default {
  name: "error",
  head(){
    return {
      title:'Big Fuck'
    }
  },
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>