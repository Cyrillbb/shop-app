import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/catalog',
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@/features/catalog').then((val) => val.ProductsView),
    },
  ],
});

export default router;
