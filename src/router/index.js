import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    component: () => import('@/views/Layout/home.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: 'category/:id',
        component: () => import('@/views/Category/index.vue')
      },
      {
        path: 'category/sub/:id',
        component: () => import('@/views/subCategory/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  }
  ],
  scrollBehavior: () => ({ top: 0 , behavior: 'smooth' }),
})

export default router
