<template>
  <div>
    <audio src=""></audio>
    <player-controller></player-controller>
    <player-list></player-list>
  </div>
</template>
<style scoped lang="scss"></style>
<script>
import PlayerController from '@/components/PlayerController';
import PlayerList from '@/pages/PlayerList';

export default {
  name: 'player',
  data() {
    return {};
  },
  created() {
    this.$store.commit('init');
  },
  components: {
    PlayerController,
    PlayerList,
  },
};
</script>
