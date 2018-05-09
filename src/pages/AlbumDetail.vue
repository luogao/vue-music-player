<template>
  <div>
    <h2>{{playListInfo? playListInfo.name:null}}</h2>
    <p v-html="playListInfo? playListInfo.description:''"></p>
    <div>
      <ul class="music-list">
        <li
          v-for="(item,index) in musicList"
          :key="index"
        >
          <img :src="item.album.blurPicUrl" alt="" width="50" height="50">
          <a href="javascript:;" @click="play(item.id)">
            {{item.name}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Request from '../api';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'playlistdetail',
  data() {
    return {
      playListInfo: null,
      musicList: [],
    };
  },
  computed: {
    ...mapState(['playList']),
  },
  created() {
    this.getListDetail();
  },
  methods: {
    ...mapActions([
      'setPlayList',
      'setCurSong'
    ]),
    async getListDetail() {
      const { id } = this.$route.params;
      const res = await Request.getListDetail(id);
      const { tracks, ...playListInfo } = res.data.result;
      this.musicList = [...tracks];
      this.playListInfo = {
        ...playListInfo,
      };
    },
    play(id) {
      let currentSong = this.musicList.filter(el => el.id === id)[0];
      if (this.playList && this.playList.id !== this.$route.params.id) {
        let playList = {
          id: this.$route.params.id,
          tracks: this.musicList,
        };
        this.setPlayList(playList);
      }
      this.setCurSong(currentSong);
    },
  },
};
</script>
<style scoped lang="scss"></style>

