<template>
  <div class="progress-bar" @click.prevent="clickHandler($event)">
    <div class="played" :style="playedStyle"></div>
    <div class="loaded" :style="loadedStyle"></div>
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
    loaded: {
      default: 0,
      type: Number,
      required: true,
    },
  },
  watch: {},
  computed: {
    playedStyle() {
      return {
        width: isNaN(this.played) ? 0 :(this.played * 100) + '%',
      }
    },
    loadedStyle() {
      return {
        width: isNaN(this.loaded) ? 0 :(this.loaded * 100) + '%',
      }
    }
  },
  created() {},
  methods: {
    clickHandler(e) {
      const target = e.currentTarget;
      const targetLeft = target.getBoundingClientRect().left;
      const x = e.clientX - targetLeft;
      const percent = x / target.clientWidth;
      this.$emit('change', percent)
      console.log(percent)
      console.log(targetLeft)
    }
  }
};
</script>
<style scoped lang="scss">
  .progress-bar{
    width: 100%;
    height: 5px;
    border-radius: 20px;
    overflow: hidden;
    background: #ccc;
    position: relative;
    margin: 20px 0;
    .loaded,.played {
      position: absolute;
      height: 100%;
    }
    .played {
      background: #000;
      z-index: 1;
    }
    .loaded {
      background: #000;
      z-index: 0;
      opacity: .1;
      transition: all .3s ease-out;
    }
  }
</style>
