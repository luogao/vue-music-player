import Vue from 'vue';
import Router from 'vue-router';
import Player from '@/pages/Player';
import AlbumDetail from '@/pages/AlbumDetail';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Player',
      component: Player,
    },
    {
      path: '/album/detail/:id',
      name: 'AlbumDetail',
      component: AlbumDetail,
    },
  ],
});
