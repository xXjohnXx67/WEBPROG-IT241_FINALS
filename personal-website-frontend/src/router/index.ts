import { createRouter, createWebHistory } from 'vue-router'
import GuestbookView from '../views/GuestbookView.vue'

const routes = [
  {
    path: '/',
    redirect: '/guestbook'
  },
  {
    path: '/guestbook',
    component: GuestbookView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
