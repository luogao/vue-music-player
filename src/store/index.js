import Vue from 'vue';
import Vuex from 'vuex';
import LGPlayer from '../LG-Player';
import Request from '../api';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    audio: new Audio(),
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
      src: null,
      volume: 1,
    },
    volume: 1,
    musicList: [],
    currentSong: null,
    playList: null,
    isPlaying: false,
    player: null,
  },
  getters: {
    currentSong: state => state.musicList[state.currentIndex],
  },
  mutations: {
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
    play: ({ player }) => {
      player.play();
    },
    pause: ({ player }) => {
      player.pause();
    },
    init: (state) => {
      state.player = new LGPlayer();
    },
    setPlayList: (state, playList) => {
      if (state.playList && state.playList.id !== playList.id) {
        state.playList = { ...playList };
      }
      if (!state.playList) {
        state.playList = { ...playList };
      }
      state.player.setPlayList(state.playList);
    },
    setCurSong: (state, song) => {
      state.currentSong = { ...song };
      state.player.setSong(state.currentSong);
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
    play: ({ commit }) => {
      commit('play');
    },
    pause: ({ commit }) => {
      commit('pause');
    },
    setPlayList: ({ commit }, playList) => {
      commit('setPlayList', playList);
    },
    setCurSong: async ({ commit, dispatch }, song) => {
      const res = await Request.getMusic(song.id);
      const url = res.data.data[0].url;
      const _song = {
        ...song,
        url,
      };
      commit('setCurSong', _song);
      dispatch('play');
    },
  },
});

export default store;
