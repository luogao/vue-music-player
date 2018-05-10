<template>
  <div class="player">
    <img width="50" height="50" :src="currentMusic.album.blurPicUrl" alt="">
    {{currentMusic.name}}
    <div>
      <button>next</button>
      <button @click="toggle">{{media.paused? 'play' : 'pause'}}</button>
      <button>prev</button>
    </div>
  </div>
</template>
<script>
import PlayerController from './PlayerController'
import { mapState, mapMutations } from 'vuex';
import { ReadyState } from '../constants'
const mediaEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'readystatechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];

export default {
  name: 'player',
  data() {
    return {};
  },
  props: {
    musicList: {
      default: [],
      type: Array,
      required: true,
    },
    volume: {
      default: 1,
      type: Number,
    },
  },
  computed: {
    ...mapState([
      'audio',
      'media',
      'currentMusic',
    ]),
  },
  components: {
    PlayerController,
  },
  watch:{
    'musicList': {
      deep: true,
      handler(val) {
        console.log('musicList', val);
      },
    },
    'currentMusic': {
      deep: true,
      handler(val) {
        console.log('currentMusic', val)
        this.play(val)
      },
    },
  },
  created() {
    const currentMusic = this.currentMusic;
    if (currentMusic) this.play(null, currentMusic);
    mediaEvents.forEach(event => {
      this.audio.addEventListener(event, evt => {
        this.syncMedia(this.audio);
        this.$emit(event, evt);
      });
    });
    this.syncMedia(this.audio);
  },
  methods: {
    ...mapMutations([
      'syncMedia',
      'setMusic',
    ]),
    play(music) {
      console.log('music', music)
      if (!music) {
        if (!this.currentMusic.url && this.musicList.length > 0) this.play(this.musicList(0)); // 默认播放第一个歌曲
        else if (Number.parseInt(this.media.readyState) >= ReadyState.HAVE_FUTURE_DATA) this.audio.play();
        return 0;
      }
      if (typeof music !== 'object' && music) music = this.musicList[index];
      if (this.currentMusic && music.id === this.currentMusic.id && !this.audio.paused) {
        return;
      }
      this.setMusic(music)
      return new Promise(resolve => {
        this.audio.src = music.url;
        this.audio.preload = this.preload;
        this.audio.autoplay = this.autoplay;
        this.audio.volume = this.volume;
        this.audio.oncanplay = function() {
          this.play();
          resolve();
        }
      })
    },
    pause() {
      this.audio.pause()
    },
    toggle() {
      console.log(this.media.paused)
      this.audio.paused ? this.play() : this.pause();
    }
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
  border-top: 1px solid #ccc;
  padding: 10px;
  img{
    border-radius: 50%;
  }
}
</style>
