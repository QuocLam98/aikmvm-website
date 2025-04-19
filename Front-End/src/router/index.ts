import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'
import HomeView from '@/views/HomeView.vue';
import Register from '@/views/Register.vue';
import DashBoardView from '@/views/DashBoardView.vue';
import Chat from '@/components/Chat.vue';
import SettingChat from '@/components/SettingChat.vue';
import StorageImage from '@/components/StorageImage.vue';
import Payment from '@/components/Payment.vue';
import ListUser from '@/components/ListUser.vue';
import ListBot from '@/components/ListBot.vue';
import ListChat from '@/components/ListChat.vue';
import Verify from '@/components/Verify.vue';

const routes = [
  { path: '/', component: HomeView }, // Trang chính
  { path: '/login', component: LoginView }, // Chỉ hiển thị LoginView khi vào /login
  { path: '/register', component: Register},
  { path: '/verify', component: Verify},
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
      {
        path: 'payment',
        component: Payment, // Hiển thị khi vào /chat/setting
      },
      {
        path: 'list-user',
        component: ListUser, // Hiển thị khi vào /chat/setting
      },
      {
        path: 'list-bot',
        component: ListBot, // Hiển thị khi vào /chat/setting
      },
      {
        path: 'list-chat',
        component: ListChat, // Hiển thị khi vào /chat/setting
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'linkActiveClass', // Class khi link được kích hoạt
  linkExactActiveClass: 'linkExactActiveClass',
})

export default router
