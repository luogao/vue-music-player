<template>
  <div id="app">
    <router-view/>
    <player ref="player" :volume="0" :music-list='musicList'></player>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Player from '@/components/Player';

export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'musicList',
    ]),
  },
  created() {
    // this.$store.commit('init');
  },
  components: {
    Player,
  },
};
</script>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
