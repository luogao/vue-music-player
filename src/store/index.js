import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    audio: new Audio(),
    currentMusic: null,
    media: {
      autoplay: false,
      controller: null,
      crossOrigin: null,
      currentSrc: null,
      currentTime: 0,
      defaultMuted: false,
      duration: 0,
      ended: false,
      error: null,
      loop: false,
      muted: false,
      paused: true,
      readyState: null,
      buffered: null,
      src: null,
      volume: 1,
    },
    musicList: [],
    isPlaying: false,
    player: null,
    setMusicListId: null,
  },
  getters: {
    volume(state) {
      return state.media.volume;
    },
  },
  mutations: {
    syncMedia: (state, audio) => {
      Object.keys(state.media).forEach((key) => {
        state.media[key] = audio[key];
      });
    },
    setMusic: (state, music) => {
      state.currentMusic = music;
    },
    setMusicList: (state, musicList) => {
      state.musicList = [...musicList];
    },
    setMusicListId: (state, id) => {
      state.musicListId = id;
    },
    setVolume: (state, volume) => {
      state.audio.volume = volume;
    },
  },
  actions: {
    setMusicList: ({ commit, state }, musicList) => {
      if (state.musicListId !== musicList.id) {
        commit('setMusicListId', musicList.id);
        commit('setMusicList', musicList.tracks);
      }
    },
  },
});

export default store;
