import Vue from 'vue';
import Vuex from 'vuex';
import LGPlayer from '../LG-Player';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    musicList: [
      1,
      2,
      3,
      4,
    ],
    currentIndex: 0,
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
  },
});

export default store;
