<template>
  <div id="app">
    <router-view/>
    <player :config='config'></player>
  </div>
</template>

<script>
import Player from '@/components/Player';

export default {
  name: 'App',
  data() {
    return {
      config: {},
    }
  },
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
