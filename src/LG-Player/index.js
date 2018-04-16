import LGAudio from './LG-Audio';
import { PlayMode } from '../constants';
/* eslint-disable no-underscore-dangle */

class LGPlayer {
  constructor(options = {}) {
    this.options = options;
    this.sound = null;
    this.playState = null;
    this.volume = 1;
		this.muted = false;
    this.audio = new LGAudio();
    this.playList = options.playList || [];
  }

  play() {
    if(playList.length > 0 && !this.sound){
      if(this.mode !== PlayMode.RANDOM){
        this.setSound(this.playList[0])
      }
      this.audio.play();
    }
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

  setSound(sound) {
    this.sound = sound;
    this.audio.setSound(sound.src);
  }
}

export default LGPlayer;
