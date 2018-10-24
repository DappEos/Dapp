import { RouteConfig } from 'vue-router';

export default [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  }
] as RouteConfig[];
