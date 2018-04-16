import Vue from 'vue';
import Router from 'vue-router';
import Player from '@/pages/Player';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Player',
      component: Player,
    },
  ],
});
