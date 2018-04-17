import LGAudio from './LG-Audio';
import { PlayMode } from '../constants';
/* eslint-disable no-underscore-dangle */

class LGPlayer {
  constructor(options = {}) {
    this.options = options;
    this.song = null;
    this.playState = null;
    this.volume = 1;
    this.muted = false;
    this.audio = new LGAudio();
    this.playList = [];
  }

  setPlayList(playList) {
    this.playList = playList;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
  }

  setPlayState(playState) {
    this.audio.setPlayState(playState);
  }

  _setVolume(volume) {
    this.audio.setVolume(volume);
  }

  setVolume(volume) {
    const formatted = Math.min(Math.max(0, parseFloat(volume)), 1);
    this.volume = formatted;
    this._setVolume(this.muted ? 0 : formatted);
  }

  getVolume() {
    return this.volume;
  }

  mute() {
    this.muted = true;
    this._setVolume(0);
  }

  unmute() {
    this.muted = false;
    this._setVolume(this.volume);
  }

  setSong(song) {
    this.song = song;
    this.audio.setSong(song);
  }
}

export default LGPlayer;
