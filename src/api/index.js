import axios from 'axios';
import Wyurl from './constants';

const PORT = "3000"

class MusicManager {
  constructor() {
    this.$http = axios.create({
      baseURL: `http://192.168.73.117:${PORT}`,
    });
  }

  getList(limit = 10) {
    return this.$http.get(`${Wyurl.TOPLIST}?limit=${limit}&cat=流行`);
  }

  getListDetail(id) {
    if (id) {
      return this.$http.get(`${Wyurl.LISTDETAIL}?id=${id}`);
    }
    return false;
  }

  getMusic(id) {
    if (id) {
      return this.$http.get(`${Wyurl.MUSIC}?id=${id}`);
    }
    return false;
  }

  search(name) {
    if (name) {
      return this.$http.get(`${Wyurl.SEARCH}?keywords=${name}`);
    }
    return false;
  }

  getLyric(id) {
    if (id) {
      return this.$http.get(`${Wyurl.LYRIC}?id=${id}`);
    }
    return false;
  }
}

export default new MusicManager();
