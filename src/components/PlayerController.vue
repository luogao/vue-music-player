<template>
  <div>
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <button @click="next">下一首</button>
    <button @click="prev">上一首</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'playercontroller',
  methods: {
    ...mapActions([
      'next',
      'prev',
      'play',
      'pause',
    ]),
  },
};
</script>
