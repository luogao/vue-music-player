<template>
  <div>
    <button class="list-toggler">{{musicList.length}}</button>
    <div class="list-body">
      <ul>
        <li v-for="(music, index) in musicList" :key="music.id">
          {{index + 1}} {{music.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'list',
  computed: {
    ...mapState([
      'musicList',
    ]),
  },
  methods: {
  },
  created() {
    console.log(this.musicList)
  },
};
</script>
<style scoped lang="scss">
.list-toggler{
  border: none;
  background: #000;
  color: #fff;
  font-size: 12px;
  border-radius:20px;
  outline: none;
  &:active{
    opacity: .8;
  } 
}
.list-body{
  max-height: 30vh;
  position: fixed;
  overflow: auto;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100vw;
  z-index: 10;
  box-shadow: 0px -1px 15px -1px rgba(0, 0, 0, 0.3);
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
