<template>
  <div id="app">
    <router-view/>
    <player></player>
  </div>
</template>

<script>
import Player from '@/pages/Player';

export default {
  name: 'App',
  created() {
    this.$store.commit('init');
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
