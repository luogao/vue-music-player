<template>
  <div class="volume-wrapper" @click="clickHandler($event)">
    <div ref="bar" class="volume-bar">
      <div class="played" :style="volumeStyle">
        <div class="handler"
          @touchstart="touchStartHandler"
          @touchend="touchEndHandler"
          @touchmove="touchMoveHandler"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRelativePosition } from '../utils';

export default {
  name: 'volume-bar',
  data() {
    return {
      isHold: false,
      currentVolume: 0,
    };
  },
  props: {
    volume: {
      default: 0.8,
      type: Number,
    },
  },
  watch: {
    volume: {
      deep: true,
      handler(val) {
        if (this.isHold) return;
        this.currentVolume = val;
      },
    },
  },
  computed: {
    volumeStyle() {
      return {
        width: isNaN(this.currentVolume) ? 0 : `${(this.currentVolume * 100)}%`,
      };
    },
  },
  created() {
    this.currentVolume = this.volume;
  },
  methods: {
    clickHandler(e) {
      if (this.isHold) return;
      const target = this.$refs.bar;
      const { x } = getRelativePosition(target, e.clientX, e.clientY);
      const percent = x / target.clientWidth;
      this.$emit('change', percent);
    },
    touchStartHandler() {
      this.isHold = true;
    },
    touchEndHandler() {
      this.isHold = false;
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
        this.currentVolume = percent;
        this.$emit('change', this.currentVolume);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.volume-wrapper{
  z-index: 10;
  padding: 10px 0;
  .volume-bar{
    --volume-bar-height: 5px;
    --handler-width: 10px;
    width: 100%;
    height: var(--volume-bar-height);
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
        top: calc((var(--handler-width) - var(--volume-bar-height)) / -2);
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
