import { useAuthStore } from '@/stores/auth-store'
import TechsView from '@/views/TechsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProfileVue from '@/views/CreateProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: CreateProfileVue
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
