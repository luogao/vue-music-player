<template>
  <div>
    <button @click="toggle" class="list-toggler">{{musicList.length}}</button>
    <div class="list-body" v-if="showList">
      <ul>
        <li v-for="music in musicList" :key="music.id">
          <item
            @itemClick="handleChange"
            :active="currentId === music.id"
            :music="music"
          >
          </item>
        </li>
      </ul>
    </div>
    <div @click.self="toggle" class="list-overlay" v-if="showList"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Item from './Item';

export default {
  name: 'list',
  data() {
    return {
      showList: false,
    };
  },
  computed: {
    ...mapState([
      'musicList',
    ]),
  },
  props: [
    'currentId',
  ],
  components: {
    Item,
  },
  watch: {
    showList: {
      deep: true,
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.$nextTick().then(this.setActiveItem(this.currentId));
          }, 0);
        }
      },
    },
    currentId: {
      deep: true,
      handler(val) {
        if (this.showList) {
          this.setActiveItem(val);
        }
      },
    },
  },
  methods: {
    toggle() {
      this.showList = !this.showList;
    },
    handleChange(music) {
      this.$emit('change', music);
    },
    setActiveItem(id) {
      const li = document.querySelector('.list-body li');
      const itemHeight = li.scrollHeight;
      const container = document.querySelector('.list-body');
      const index = this.musicList.findIndex(el => el.id === id);
      container.scrollTop = (itemHeight + 1) * index;
    },
  },
};
</script>
<style scoped lang="scss">
.list-overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: .8;
  z-index: 0;
}
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
  max-height: 60vh;
  position: fixed;
  overflow: auto;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100vw;
  z-index: 10;
  box-shadow: 0px -1px 15px -1px rgba(0, 0, 0, 0.3);
  transform: none;
  animation: upshow .3s ease;
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    li{
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
  }
}
@keyframes upshow{
  from {
    transform: translateY(100%);
    opacity: .5;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
