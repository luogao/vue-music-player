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
      lyric: null,
    }
  },
  computed: {
    ...mapState(['currentMusic']),
  },
  async mounted () {
    const { id } = this.currentMusic
    const res = await Request.getLyric(id)
    console.log(res.data.lrc.lyric ? res.data.lrc.lyric : '暂无歌词')
    this.parseLyric(res.data.lrc.lyric)
  },
  methods: {
    parseLyric(lyric_s) {
      if (!lyric_s) return []
      lyric_s = lyric_s.replace(/([^\]^\n])\[/g, (match, p1) => p1 + '\n[')
      const lyric = lyric_s.split('\n')
      console.log(lyric)
      lyric.forEach(item => {
        const lrcTimes = item.match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g)
        console.log(lrcTimes)
      })
    },
  },
}
</script>
