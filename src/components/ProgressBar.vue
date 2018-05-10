<template>
  <div class="progress-bar">
    <div class="played" :style="playedStyle"></div>
  </div>
</template>
<script>

export default {
  name: 'progress-bar',
  data() {
    return {};
  },
  props: {
    played: {
      default: 0,
      type: Number,
      required: true,
    },
  },
  watch: {},
  computed: {
    playedStyle() {
      return {
        width: isNaN(this.played) ? 0 :(this.played * 100) + '%'
      }
    }
  },
  created() {},
  methods: {}
};
</script>
<style scoped lang="scss">
  .progress-bar{
    width: 100%;
    height: 5px;
    border-radius: 20px;
    overflow: hidden;
    background: #ccc;
    .played {
      background: #000;
      height: 5px;
    }
  }
</style>
