import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import GroupPage from '@/pages/GroupPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/groups',
    component: GroupPage
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundPage
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
