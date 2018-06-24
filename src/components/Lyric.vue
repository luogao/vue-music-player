<template>
  <div class="lyric">

  </div>
</template>
<script>
import Request from '@api'
import { mapState } from 'vuex'

export default {
  name: 'lyric',
  data() {
    return {
      lyric: null
    }
  },
  computed: {
    ...mapState(['currentMusic']),
  },
  async mounted () {
    const { id } = this.currentMusic
    const res = await Request.getLyric(id)
    console.log(res)
  }
}
</script>
