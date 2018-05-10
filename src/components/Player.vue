<template>
  <div class="player">
    <div v-if="currentMusic">
      <img width="50" height="50" :src="currentMusic.album.blurPicUrl" alt="">
      {{currentMusic.name}} {{currentIndex}}
      {{fulltime}}
    </div>
    <div>
      <button @click="changeMusic('prev')">prev</button>
      <button @click="toggle">{{media.paused? 'play' : 'pause'}}</button>
      <button @click="changeMusic('next')">next</button>
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
    currentIndex() {
      return this.musicList.findIndex(el => el.id === this.currentMusic.id);
    },
    fulltime() {
      return this.timeSecondsFormat(this.media.duration)
    },
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
    this.audio.addEventListener('ended', this.endedHandler);
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
      this.audio.pause();
    },
    toggle() {
      console.log(this.media.paused)
      this.audio.paused ? this.play() : this.pause();
    },
    prevIndex () {
      if (this.musicList.length > 1) {
        return this.currentIndex - 1 < 0 ? this.musicList.length - 1 : this.currentIndex - 1;
      } else {
        return 0;
      }
    },
    nextIndex () {
      if (this.musicList.length > 1) {
        return (this.currentIndex + 1) % this.musicList.length;
      } else {
        return 0;
      }
    },
    async changeMusic (type) {
      const index = type === 'next' ? this.nextIndex() : this.prevIndex();
      const music = this.musicList[index];
      await this.play(music);
    },
    endedHandler () {
      this.changeMusic('next');
    },
    timeSecondsFormat (time){
      time = time || 0
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${this.padStart(minutes.toString(), 2, '0')}:${this.padStart(seconds.toString(), 2, '0')}`
    },
    padStart(target, targetLength,padString) {
      // https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
      targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
      padString = String((typeof padString !== 'undefined' ? padString : ' '));
      if (this.length > targetLength) {
        return String(target);
      }
      else {
        targetLength = targetLength-target.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0,targetLength) + String(target);
      }
    },
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
