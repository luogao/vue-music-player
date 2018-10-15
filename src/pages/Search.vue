<template>
  <div class="search-wrapper">
    <div class="input-wrapper">
      <input ref="searchInput" @keyup.enter="onSeach" type="text" placeholder="输入歌曲名" v-model="searchName">
    </div>
    <div class="result-wrapper">
      <div class="page-message">{{pageMessage}} <a href="#" @click="clearResult" v-if="searchResult.length > 0" class="clear-result-btn"> 清除 </a> </div>
      <div class="result-list">
        <ul>
          <li v-for="song in searchResult" :key="song.id" >
            <div class="result-item" @click.stop="play(song)">
              <div>
                <span class="item-name">
                  {{song.name}}
                </span>
                <span class="item-artist">
                  - {{song.artist}}
                </span>
                <span class="item-duration">
                  {{song.duration}}
                </span>
              </div>
              <a @click.stop class="download-btn" :download="song.name" :href="song.url" target="_blank">下载</a>
            </div>
            <details>
              <summary>显示链接（若链接为空，说明下不了）</summary>
              <p>{{song.url ? song.url : '空'}}</p>
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
      searchName: "",
      searchResult: [],
      pageMessage: "请搜索歌曲，敲击‘回车键’开始搜索"
    };
  },
  mounted() {
    this.onSeach();
  },
  methods: {
    clearResult() {
      this.searchName = "";
      this.searchResult = [];
      this.$refs.searchInput.focus();
      this.pageMessage = "请搜索歌曲，敲击‘回车键’开始搜索";
    },
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
      this.pageMessage = `搜索 “${searchName}” 中，请稍后`;
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
      this.pageMessage = `搜索 “${searchName}” 完成，结果如下👇`;
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
      padding: 0;
      font-size: 18px;
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      font-weight: 300;
    }
  }
  .result-wrapper {
    margin: 30px auto 0 auto;
    padding: 15px 15px 150px 15px;
    max-width: 600px;
    .page-message {
      text-align: center;
      font-size: 16px;
      font-weight: 300;
      .clear-result-btn {
        font-size: 14px;
        color: darkred;
      }
    }
    .result-list {
      ul {
        list-style: none;
        padding: 0;
        li {
          padding-bottom: 10px;
          border-bottom: 1px solid #e1e1e1;
        }
      }
      details {
        font-size: 14px;
        color: #212121;
        cursor: pointer;
        p {
          cursor: text;
          word-break: break-all;
        }
      }
      .result-item {
        padding: 10px 10px 8px 0;
        border: 1px solid #fff;
        height: 43px;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:hover {
          border: 1px solid #e1e1e1;
          background: #f2f2f2;
        }
        .item-name {
          font-size: 16px;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          white-space: nowrap;
          vertical-align: middle;
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
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
