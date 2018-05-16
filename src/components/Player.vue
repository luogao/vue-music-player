<template>
  <div class="player">
    <div v-if="currentMusic">
      <img width="50" height="50" :src="currentMusic.album.blurPicUrl" alt="">
      {{currentMusic.name}} {{currentIndex}}
      {{passedTime}} / {{fullTime}}
      <progress-bar :played="played" :loaded="loaded" @change="progressHandler"></progress-bar>
      <volume-bar style="width:100px" @change="volumeHandler" :volume="volume"></volume-bar>
      <player-controller
        @toggle="toggle"
        @next="changeMusic('next')"
        @prev="changeMusic('prev')"
      >
      </player-controller>
      <list></list>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import PlayerController from './PlayerController';
import VolumeBar from './VolumeBar';
import ProgressBar from './ProgressBar';
import List from './List';
import { ReadyState } from '../constants';
import { timeSecondsFormat } from '../utils';

const mediaEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'readystatechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];

export default {
  name: 'player',
  data() {
    return {};
  },
  props: {
    musicList: {
      default() {
        return [];
      },
      type: Array,
      required: true,
    },
    preload: {
      default: 'auto',
      type: String,
    },
    autoplay: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters([
      'volume',
    ]),
    ...mapState([
      'audio',
      'media',
      'currentMusic',
    ]),
    currentIndex() {
      return this.musicList.findIndex(el => el.id === this.currentMusic.id);
    },
    fullTime() {
      return timeSecondsFormat(this.media.duration);
    },
    passedTime() {
      return timeSecondsFormat(this.media.currentTime);
    },
    played() {
      return this.media.currentTime / this.media.duration;
    },
    loaded() {
      if (Number.parseInt(this.media.readyState, 10) >= ReadyState.HAVE_FUTURE_DATA) {
        return this.media.buffered.end(this.media.buffered.length - 1) / this.media.duration;
      }
      return 0;
    },
  },
  components: {
    PlayerController,
    ProgressBar,
    VolumeBar,
    List,
  },
  watch: {
    currentMusic: {
      deep: true,
      handler(val) {
        this.play(val);
      },
    },
  },
  created() {
    const currentMusic = this.currentMusic;
    if (currentMusic) this.play(null, currentMusic);
    mediaEvents.forEach((event) => {
      this.audio.addEventListener(event, (evt) => {
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
      'setVolume',
    ]),
    play(music) {
      if (!music) {
        if (!this.currentMusic.url && this.musicList.length > 0) this.play(this.musicList[0]);
        else if (Number.parseInt(this.media.readyState, 10) >= ReadyState.HAVE_FUTURE_DATA) {
          this.audio.play();
        }
        return 0;
      }
      if (this.currentMusic && music.id === this.currentMusic.id && !this.audio.paused) {
        return 0;
      }
      this.setMusic(music);
      return new Promise((resolve) => {
        this.audio.src = music.url;
        this.audio.preload = this.preload;
        this.audio.autoplay = this.autoplay;
        this.audio.volume = this.volume;
        this.audio.oncanplay = () => {
          this.audio.play();
          resolve();
        };
      });
    },
    pause() {
      this.audio.pause();
    },
    toggle() {
      if (this.audio.paused) {
        this.play();
      } else {
        this.pause();
      }
    },
    prevIndex() {
      if (this.musicList.length > 1) {
        return this.currentIndex - 1 < 0 ? this.musicList.length - 1 : this.currentIndex - 1;
      }
      return 0;
    },
    nextIndex() {
      if (this.musicList.length > 1) {
        return (this.currentIndex + 1) % this.musicList.length;
      }
      return 0;
    },
    async changeMusic(type) {
      const index = type === 'next' ? this.nextIndex() : this.prevIndex();
      const music = this.musicList[index];
      await this.play(music);
    },
    endedHandler() {
      this.changeMusic('next');
    },
    volumeHandler(percent) {
      this.setVolume(percent * 1);
    },
    progressHandler(percent) {
      const changeTime = percent * this.media.duration;
      this.setCurrentTime(changeTime);
    },
    setCurrentTime(time) {
      if ('fastSeek' in this.audio) {
        this.audio.fastSeek(time);
        return this.media.currentTime;
      }
      if (Number.parseInt(this.media.readyState, 10) >= ReadyState.HAVE_FUTURE_DATA) {
        this.audio.currentTime = time;
        return this.media.currentTime;
      }
      return this.media.currentTime;
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
  box-sizing: border-box;
  img{
    border-radius: 50%;
  }
  .volume{
    width: 80px;
  }
}
</style>
