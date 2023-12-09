import { useAuthStore } from '@/stores/auth-store'
import ProfileView from '@/views/ProfileView.vue'
import TechsView from '@/views/TechsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/techs',
      name: 'techs',
      component: TechsView,
      beforeEnter:  () => {
        const { isTech} = useAuthStore();
        return isTech;
      }
      
    }
  ]
})

export default router
