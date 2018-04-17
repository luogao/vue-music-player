<template>
  <div>
    <player-controller></player-controller>
    <play-list></play-list>
    <album-list></album-list>
  </div>
</template>
<style scoped lang="scss"></style>
<script>
import PlayerController from '@/components/PlayerController';
import PlayList from '@/pages/PlayList';
import AlbumList from '@/pages/AlbumList';

export default {
  name: 'player',
  data() {
    return {};
  },
  components: {
    PlayerController,
    PlayList,
    AlbumList,
  },
};
</script>
