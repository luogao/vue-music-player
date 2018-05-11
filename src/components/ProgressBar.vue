<template>
  <div class="progress-wrapper" @click="clickHandler($event)">
    <div ref="bar" class="progress-bar">
      <div class="played" :style="playedStyle">
        <div class="handler" @touchstart="touchStartHandler" @touchend="touchEndHandler" @touchmove="touchMoveHandler"></div>
      </div>
      <div class="loaded" :style="loadedStyle"></div>
    </div>
  </div>
</template>
<script>
import { getRelativePosition } from '../utils';
export default {
  name: 'progress-bar',
  data() {
    return {
      isHold: false,
      currentPlayed: 0,
    };
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
  watch: {
    played: {
      deep: true,
      handler(val) {
        if (this.isHold) return;
        this.currentPlayed = val;
      },
    }
  },
  computed: {
    playedStyle() {
      return {
        width: isNaN(this.currentPlayed) ? 0 :(this.currentPlayed * 100) + '%',
      }
    },
    loadedStyle() {
      return {
        width: isNaN(this.loaded) ? 0 :(this.loaded * 100) + '%',
      }
    },
  },
  created() {},
  methods: {
    clickHandler(e) {
      if (this.isHold) return;
      console.log('click')
      const target = this.$refs.bar;
      const { x } = getRelativePosition(target, e.clientX, e.clientY);
      const percent = x / target.clientWidth;
      this.$emit('change', percent);
    },
    touchStartHandler(e) {
      this.isHold = true;
    },
    touchEndHandler(e) {
      console.log('touchend')
      this.$emit('change', this.currentPlayed);
      setTimeout(() => this.isHold = false);
    },
    touchMoveHandler(e) {
      if (this.isHold) {
        const target = this.$refs.bar;
        const { x } = getRelativePosition(target, e.touches[0].clientX, e.touches[0].clientY);
        let percent = x / target.clientWidth;
        if (percent > 1) {
          percent = 1;
        } else if (percent < 0) {
          percent = 0;
        }
        this.currentPlayed = percent;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.progress-wrapper{
  z-index: 10;
  padding: 10px 0;
  .progress-bar{
    --progress-bar-height: 5px;
    --handler-width: 10px;
    width: 100%;
    height: var(--progress-bar-height);
    border-radius: 20px;
    background: #ccc;
    position: relative;
    .loaded,.played {
      border-radius: 20px;
      position: absolute;
      height: 100%;
    }
    .played {
      background: #000;
      z-index: 1;
      .handler{
        border-radius: 50%;
        width: var(--handler-width);
        height: var(--handler-width);
        background: #000;
        position: absolute;
        right: calc(var(--handler-width) / -2);
        top: calc((var(--handler-width) - var(--progress-bar-height)) / -2);
      }
    }
    .loaded {
      background: #000;
      z-index: 0;
      opacity: .1;
      transition: all .3s ease-out;
    }
  }
}
</style>
