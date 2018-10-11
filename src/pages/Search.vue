<template>
  <div class="search-wrapper">
    <div class="input-wrapper">
      <input @keyup.enter="onSeach" type="text" placeholder="输入歌曲名" v-model="searchName">
    </div>

    <div class="result-wrapper">
      <div class="result-list">
        <ul>
          <li v-for="song in searchResult" :key="song.id" >
            <div class="result-item" @click.stop="play(song)">
              <span class="item-name">
                {{song.name}}
              </span>
              <span class="item-artist">
                - {{song.artist}}
              </span>
              <span class="item-duration">
                {{song.duration}}
              </span>
              <a @click.stop class="download-btn" :download="song.name" :href="song.url" target="_blank">下载</a>
            </div>
            <details>
              <summary>显示链接（若链接为空，说明下不了）</summary>
              <p>{{song.url}}</p>
              <!-- <button @click="copyUrl(song.url)">复制</button> -->
            </details>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import Request from "../api";
import { timeSecondsFormat } from "../utils";

let beforeSearch = "";

export default {
  name: "search",
  data() {
    return {
      searchName: "陈小春",
      searchResult: []
    };
  },
  mounted() {
    this.onSeach();
  },
  methods: {
    copyUrl(url) {
      const input = document.createElement("input");
      input.setAttribute("readonly", "readonly");
      input.setAttribute("value", url);
      document.body.appendChild(input);

      input.setSelectionRange(0, url.length);

      if (document.execCommand("copy")) {
        document.execCommand("copy");
        console.log("复制成功");
      }
      // document.body.removeChild(input);
    },
    async download(song) {
      const res = await Request.getMusic(song.id);
      console.log(res);
      const url = res.data.data[0].url;

      const aLink = document.createElement("a");
      const evt = document.createEvent("HTMLEvents");
      aLink.download = song.name;
      aLink.href = url;
      aLink.target = "_blank";
      aLink.click();

      console.log(aLink);
    },
    async play(sound) {
      console.log(sound);
      const res = await Request.getMusic(sound.id);
      console.log(res);
      const url = res.data.data[0].url;
      const soundData = {
        artist: sound.artist,
        id: sound.id,
        image: "",
        name: sound.name,
        url: url
      };
      console.log(soundData);
      this.$nextTick().then(this.$parent.$refs.player.play(soundData));
    },
    async onSeach() {
      const searchName = this.searchName;
      if (!searchName || beforeSearch === searchName) return;
      const res = await Request.search(searchName);
      const tracks = res.data.result.songs;
      const pArr = tracks.map(el => Request.getMusic(el.id));
      const resultArr = await Promise.all(pArr);
      const tracksWithUrl = resultArr.map((el, index) => {
        const url = el.data.data[0].url;
        return { ...tracks[index], url };
      });

      beforeSearch = searchName;
      this.searchResult = tracksWithUrl.map(el => {
        return {
          id: el.id,
          name: el.name,
          artist: el.artists[0] ? el.artists[0].name : "不知道叫啥名字",
          duration: timeSecondsFormat(el.duration / 1000),
          url: el.url
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.search-wrapper {
  .input-wrapper {
    margin: 50px auto 0 auto;
    text-align: center;
    input {
      width: 300px;
      height: 30px;
      padding: 0 5px;
      font-size: 16px;
    }
  }
  .result-wrapper {
    margin: 50px auto 0 auto;
    max-width: 980px;
    .result-list {
      ul {
        list-style: none;
        padding: 0;
      }
      details {
        padding-left: 20px;
        font-size: 14px;
        color: #212121;
        cursor: pointer;
        p {
          cursor: text;
        }
      }
      .result-item {
        padding: 10px 10px 8px 18px;
        border: 1px solid #fff;
        height: 43px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
          border: 1px solid #e1e1e1;
          background: #f2f2f2;
        }
        .item-name {
          font-size: 16px;
        }
        .item-artist {
          font-size: 12px;
          font-weight: 300;
        }
        .item-duration {
          font-size: 12px;
          font-weight: 300;
        }
        .download-btn {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
