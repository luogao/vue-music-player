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
          <img :src="item.image" alt="" width="50" height="50">
          <a href="javascript:;" @click="play(item.id)">
            {{item.name}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import Request from '../api';

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
    ]),
    async getListDetail() {
      const { id } = this.$route.params;
      const res = await Request.getListDetail(id);
      const { tracks, ...playListInfo } = res.data.playlist ? res.data.playlist : res.data.result;
      const pArr = tracks.map(el => Request.getMusic(el.id));
      const resultArr = await Promise.all(pArr);
      const tracksWithUrl = resultArr.map((el, index) => {
        const url = el.data.data[0].url;
        return { ...tracks[index], url };
      });
      const formatData = tracksWithUrl.map((el) => {
        const dataItem = {
          id: el.id,
          name: el.name,
          image: el.al.picUrl,
          artist: el.ar[0].name,
          url: el.url,
        };
        return dataItem;
      });
      this.albumDetailTracks = [...formatData];
      this.playListInfo = {
        ...playListInfo,
      };
    },
    async play(id) {
      const selectedMusic = this.albumDetailTracks.filter(el => el.id === id)[0];
      if (this.musicList && this.musicList.id !== this.$route.params.id) {
        const musicList = {
          id: this.$route.params.id,
          tracks: this.albumDetailTracks,
        };
        this.setMusicList(musicList);
      }
      console.log(selectedMusic)
      this.$nextTick().then(this.$parent.$refs.player.play(selectedMusic));
    },
  },
};
</script>
<style scoped lang="scss"></style>

