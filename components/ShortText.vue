<template>
  <span>
    {{ displayText }}
    <button v-show="!isExpanded && isTooLong" @click="isExpanded = !isExpanded" type="button" class="link">
      read more
    </button>
    <button v-show="isExpanded && isTooLong" @click="isExpanded = !isExpanded" type="button" class =link>
      read less
    </button>
  </span>
</template>

<script>
export default {
  name: "ShortText",
  props: {
    text: { required: true, type: String },
    target: { type: Number, required: true },
  },
  computed: {
    isTooLong() {
      return this.chunks.length === 2;
    },
    displayText() {
      if (this.isExpanded || !this.isTooLong) return this.chunks.join("");
      else return this.chunks[0] + "...";
    },
  },
  data() {
    return {
      isExpanded: false,
      chunks: [],
    };
  },
  methods: {
    getChunks() {
      if (this.text.length < this.target || this.isExpanded) return [this.text];
      return [
        this.text.substring(0, this.target),
        this.text.substring(this.target),
      ];
    },
  },
  created() {
    this.chunks = this.getChunks();
  },
};
</script>

<style scoped>

  .link{
    color: blue;
    border:none;
    outline: none;
    background-color: white;
    text-decoration: underline ;
    cursor: pointer;

  }

  .link:focus{
    color: red;
  }

</style>
