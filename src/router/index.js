import Vue from 'vue';
import Router from 'vue-router';
import AlbumDetail from '@/pages/AlbumDetail';
import AlbumList from '@/pages/AlbumList';
import Search from '@/pages/Search';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AlbumList',
      component: AlbumList,
    },
    {
      path: '/album/detail/:id',
      name: 'AlbumDetail',
      component: AlbumDetail,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
  ],
});
