import axios from 'axios';
import Wyurl from './constants';

class MusicManager {
  constructor() {
    this.$http = axios.create({
      baseURL: 'http://localhost:5000',
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
}

export default new MusicManager();
