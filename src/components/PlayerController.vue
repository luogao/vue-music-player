<template>
  <div>
    <button @click="prev">上一首</button>
    <button @click="toggle">{{media.paused ? '播放' : '暂停'}}</button>
    <button @click="next">下一首</button>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'playercontroller',
  computed: {
    ...mapState([
      'media',
    ]),
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
    next() {
      this.$emit('next');
    },
    prev() {
      this.$emit('prev');
    },
  },
};
</script>
<style scoped lang="scss">
  button{
    border: 1px solid #ccc;
  }
</style>
