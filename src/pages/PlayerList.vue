<template>
  <div>
    <ul class="player-list">
      <li
        :class="currentSong === item? 'active' : ''"
        v-for="(item,index) in musicList"
        :key="index"
      >
        {{item}}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'playerlist',
  computed: {
    ...mapState([
      'musicList',
    ]),
    ...mapGetters([
      'currentSong',
    ]),
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
  .player-list{
    list-style: none;
    padding: 0;
    li{
      &.active{
        color: red;
      }
    }
  }
</style>

