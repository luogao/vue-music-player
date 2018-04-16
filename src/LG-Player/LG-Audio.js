import { PlayState } from '../constants';
/* eslint-disable no-script-url */

class LGAudio {
  constructor(options) {
    this.options = options;
    this.src = null;
    this.playState = null;
    this.initAudio();
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
      console.log(1)
      return;
    }
    if (
      this.playState === PlayState.LOADING ||
      this.playState === PlayState.PLAYING
    ) {
      console.log(2)
      
      return;
    }
    if (this.audio.src !== this.src) {
      console.log(3)
      console.log(this.audio.src)
      console.log(this.src)
      this.loadAudio(); // 此时
      this.setPlayState(PlayState.LOADING);
    } else {
      console.log('resume')
      // resume
      this.audio.play();
    }
  }

  pause() {
    console.log('pause');
    this.audio.pause();
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

  setSound(src) {
    this.stop();
    if (
      this.playState === PlayState.LOADING ||
      this.playState === PlayState.PLAYING ||
      this.playState === PlayState.PAUSED
    ) {
      console.log(9)
      return;
    }
    this.src = src;
    this.setPlayState(PlayState.READY);
  }
}

export default LGAudio;
