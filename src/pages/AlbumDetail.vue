<template>
  <div>
    <h2>{{playListInfo? playListInfo.name:null}}</h2>
    <p v-html="playListInfo? playListInfo.description:''"></p>
    <div>
      <ul class="music-list">
        <li
          v-for="(item,index) in albumDetailTracks"
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
      albumDetailTracks: [],
    };
  },
  computed: {
    ...mapState(['musicList']),
  },
  created() {
    this.getListDetail();
  },
  methods: {
    ...mapActions([
      'setMusicList',
      'setCurSong'
    ]),
    async getListDetail() {
      const { id } = this.$route.params;
      const res = await Request.getListDetail(id);
      const { tracks, ...playListInfo } = res.data.result;
      const pArr = tracks.map(el => {
        return Request.getMusic(el.id)
      });
      const resultArr = await Promise.all(pArr);
      const tracksWithUrl = resultArr.map((el,index) => {
        let url = el.data.data[0].url;
        return {...tracks[index], url};
      });
      this.albumDetailTracks = [...tracksWithUrl];
      this.playListInfo = {
        ...playListInfo,
      };
    },
    async play(id) {
      let selectedMusic = this.albumDetailTracks.filter(el => el.id === id)[0];
      if (this.musicList && this.musicList.id !== this.$route.params.id) {
        let musicList = {
          id: this.$route.params.id,
          tracks: this.albumDetailTracks,
        };
        this.setMusicList(musicList);
      };
      this.$nextTick().then(this.$parent.$refs.player.play(selectedMusic));
    },
  },
};
</script>
<style scoped lang="scss"></style>

