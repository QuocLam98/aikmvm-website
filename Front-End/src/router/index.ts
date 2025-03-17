import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'
import HomeView from '@/views/HomeView.vue';
import Register from '@/views/Register.vue';
import DashBoardView from '@/views/DashBoardView.vue';
import Chat from '@/components/Chat.vue';
import SettingChat from '@/components/SettingChat.vue';
import StorageImage from '@/components/StorageImage.vue';

const routes = [
  { path: '/', component: HomeView }, // Trang chính
  { path: '/login', component: LoginView }, // Chỉ hiển thị LoginView khi vào /login
  { path: '/register', component: Register},
  { path: '/dashboard', component: DashBoardView,
    linkActiveClass: 'border-indigo-500',
    linkExactActiveClass: 'border-indigo-700',
    children: [
      {
        path: 'chat',
        component: Chat, // Hiển thị khi vào /chat/setting
      },
      {
        path: 'chatbox/setting',
        component: SettingChat, // Hiển thị khi vào /chat/setting
      },
      {
        path: 'chatbox/store',
        component: StorageImage, // Hiển thị khi vào /chat/setting
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'bg-black', // Class khi link được kích hoạt
  linkExactActiveClass: 'text-white',
})

export default router
