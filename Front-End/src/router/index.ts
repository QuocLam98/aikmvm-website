import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'
import HomeView from '@/views/HomeView.vue';
import Register from '@/views/Register.vue';
import DashBoardView from '@/views/DashBoardView.vue';

const routes = [
  { path: '/', component: HomeView }, // Trang chính
  { path: '/login', component: LoginView }, // Chỉ hiển thị LoginView khi vào /login
  { path: '/register', component: Register},
  { path: '/dashboard', component: DashBoardView}
];
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
