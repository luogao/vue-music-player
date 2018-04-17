
<template>
  <div>
    专辑列表
    <ul class="album-list">
      <li
        v-for="(item,index) in albumList"
        :key="index"
      >
        <img :src="item.coverImgUrl" alt="" width="50" height="50">
        <router-link :to="{ name:'AlbumDetail', params: { id: item.id } }">
          {{item.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import Request from '../api';

export default {
  name: 'albumlist',
  data() {
    return {
      albumList: [],
    };
  },
  mounted() {
    this.getAlbumList(10);
  },
  methods: {
    async getAlbumList(limit) {
      const res = await Request.getList(limit);
      this.albumList = {
        ...res.data.playlists,
      };
    },
  },
};
</script>
<style scoped lang="scss"></style>

