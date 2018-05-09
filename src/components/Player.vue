<template>
  <div class="player">
    123
  </div>
</template>
<script>
import { mapState } from 'vuex';
const mediaEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'readystatechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];


export default {
  name: 'player',
  data() {
    return {};
  },
  props: {
    config: {
      default: null,
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState([
      'audio',
      'media',
    ]),
  },
  components: {},
  created() {
    console.clear()
    console.log(this.audio)
    console.log(this.media)
    mediaEvents.forEach(event => {
      this.audio.addEventListener(event, evt => {
        this.$emit(event, evt);
      });
    });
  },
  methods: {

  },
};
</script>
<style scoped lang="scss">
.player{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
}
</style>
