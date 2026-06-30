import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/components/HomeView.vue'
import ManagerDashboard from '@/components/ManagerDashboard.vue'
import EventDetailsView from '@/components/EventDetailsView.vue'

const routes = [
    {path:'/', component: HomeView},
    {path:'/manager-dashboard', component: ManagerDashboard},
    {path:'/event-details', component: EventDetailsView}
] 

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router