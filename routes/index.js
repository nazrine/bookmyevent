import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/components/HomeView.vue'
import ManagerDashboard from '@/components/ManagerDashboard.vue'
import EventDetailsView from '@/components/EventDetailsView.vue'
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'

const routes = [
    {path:'/', component: HomeView},
    {path:'/manager-dashboard', component: ManagerDashboard},
    {path:'/event-details', component: EventDetailsView},
    {path:'/about', component: About},
    {path: '/contact', component:Contact}
] 

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router