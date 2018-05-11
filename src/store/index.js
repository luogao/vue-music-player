import Vue from 'vue';
import Vuex from 'vuex';
import LGPlayer from '../LG-Player';
import Request from '../api';

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
    volume: 1,
    currentSong: null,
    musicList: [],
    isPlaying: false,
    player: null,
    setMusicListId: null,
  },
  getters: {
    currentSong: state => state.musicList[state.currentIndex],
  },
  mutations: {
    syncMedia: (state, audio) => {
      Object.keys(state.media).forEach(key =>{
        state.media[key] = audio[key];
      });
    },
    setMusic: (state, music) => {
      state.currentMusic = music;
      console.log(state.currentMusic);
    },
    setMusicList: (state, list) => {
      state.musicList = list
    },
    next: (state) => {
      if (state.currentIndex === (state.musicList.length - 1)) {
        state.currentIndex = -1;
      }
      state.currentIndex += 1;
    },
    prev: (state) => {
      if (state.currentIndex === 0) {
        state.currentIndex = state.musicList.length;
      }
      state.currentIndex -= 1;
    },
    pause: ({ player }) => {
      player.pause();
    },
    init: (state) => {
      state.player = new LGPlayer();
    },
    setMusicList: (state, musicList) => {
      state.musicList = [...musicList];
    },
    setMusicListId: (state, id) => {
      state.musicListId = id;
    },
    setCurSong: (state, song) => {
      state.currentSong = { ...song };
    },
  },
  actions: {
    next: ({ commit }) => {
      setTimeout(() => {
        commit('next');
      }, 1000);
    },
    prev: ({ commit }) => {
      setTimeout(() => {
        commit('prev');
      }, 1000);
    },
    pause: ({ commit }) => {
      commit('pause');
    },
    setMusicList: ({ commit, state }, musicList) => {
      if (state.musicListId !== musicList.id) {
        commit('setMusicListId', musicList.id);
        commit('setMusicList', musicList.tracks);
      }
    },
    setCurSong: async ({ commit, dispatch }, song) => {
      const res = await Request.getMusic(song.id);
      const url = res.data.data[0].url;
      const _song = {
        ...song,
        url,
      };
      commit('setCurSong', _song);
    },
  },
});

export default store;
