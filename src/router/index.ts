import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      redirect: '/catalog',
    },
    {
      name: 'catalog',
      path: '/catalog',
      component: () => import('@/features/catalog').then((val) => val.ProductsView),
    },
    {
      name: 'product',
      path: '/product/:id',
      props: true,
      component: () => import('@/features/product-detail').then((val) => val.ProductPage),
    },
  ],
});

export default router;
