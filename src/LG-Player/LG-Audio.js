import { PlayState } from '../constants';
/* eslint-disable no-script-url */

class LGAudio {
  constructor(options) {
    this.options = options;
    this.src = null;
    this.playState = null;
    this.initAudio();
    this.bindEvents();
  }

  initAudio() {
    const audio = new Audio();
    audio.loop = false;
    audio.autoplay = false;
    audio.preload = 'none';
    audio.src = 'javascript:void(0)';
    this.audio = audio;
  }

  loadAudio() {
    this.audio.src = this.src;
    this.metaDataLoaded = false;
    this.audio.load();
    this.audio.play();
  }

  stop() {
    if (
      this.playState === null ||
      this.playState === PlayState.READY ||
      this.playState === PlayState.STOPED ||
      this.playState === PlayState.FINISHED
    ) {
      return;
    }
    this.setPlayState(PlayState.STOPED);
    this.resetAudio();
  }

  play() {
    if (!this.src) {
      return;
    }
    if (
      this.playState === PlayState.LOADING ||
      this.playState === PlayState.PLAYING
    ) {
      return;
    }
    if (this.audio.src !== this.src) {
      this.loadAudio();
      this.setPlayState(PlayState.LOADING);
    } else {
      // resume
      this.audio.play();
    }
  }

  pause() {
    this.audio.pause();
    this.setPlayState(PlayState.PAUSED);
  }

  resetAudio() {
    this.audio.src = 'javascript:void(0)';
  }

  setPlayState(playState) {
    if (this.playState !== playState) {
      this.playState = playState;
    }
  }

  setVolume(volume) {
    const formatted = Math.min(Math.max(0, parseFloat(volume)), 1);
    this.audio.volume = formatted;
  }

  getVolume() {
    return this.audio.volume;
  }

  setSong(song) {
    this.stop();
    if (
      this.playState === PlayState.LOADING ||
      this.playState === PlayState.PLAYING ||
      this.playState === PlayState.PAUSED
    ) {
      return;
    }
    this.src = song.url;
    this.setPlayState(PlayState.READY);
    console.log(this.src)
  }

  bindEvents() {
    const audio = this.audio;
    audio.addEventListener('timeupdate', function(){
      // console.log(audio.currentTime)
    }, false);
  }

}

export default LGAudio;
