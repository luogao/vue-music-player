<template>
  <div class="player">
    <player-controller></player-controller>
    <play-list></play-list>
  </div>
</template>
<script>
import PlayerController from '@/components/PlayerController';
import PlayList from '@/pages/PlayList';

export default {
  name: 'player',
  data() {
    return {};
  },
  components: {
    PlayerController,
    PlayList,
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.player{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
}
</style>
