<template>
  <div class="list-item" @click="clickHandler" :class="active ? 'active' : ''">
    <span class="name">{{music.name}}</span><span class="artist"> - {{music.artists[0].name}}</span>
  </div>
</template>
<script>

export default {
  name: 'list',
  props: [
    'music',
    'active',
  ],
  methods: {
    clickHandler() {
      this.$emit('itemClick', this.music);
    },
  },
};
</script>
<style scoped lang="scss">
.list-item{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.name{
  font-size: 16px;
}
.artist{
  font-size: 12px;
  font-weight: 300;
}
.active{
  color: red;
}
</style>
