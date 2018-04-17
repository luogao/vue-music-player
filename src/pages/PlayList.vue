<template>
  <div>
    <span v-if="playList">{{playList.tracks.length}}</span>
    <ul class="play-list">
      <li
        :class="currentSong === item? 'active' : ''"
        v-for="(item,index) in playList"
        :key="index"
      >
        <img :src="item.coverImgUrl" alt="" width="50" height="50">
        <span>
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'playlist',
  computed: {
    ...mapState([
      'playList',
    ]),
    ...mapGetters([
      'currentSong',
    ]),
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
  .play-list{
    list-style: none;
    padding: 0;
    li{
      margin-bottom: 1em;
      &.active{
        color: red;
      }
      img{vertical-align: middle;}
    }
  }
</style>

