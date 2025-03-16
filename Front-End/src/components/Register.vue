<script setup lang="ts">
import { ref } from 'vue';
import '../assets/login.css';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('');

const register = () => {
    if (!email.value) {
        toastMessage.value = 'Vui lòng nhập email!';
        toastType.value = 'alert-error white';
        toastIcon.value = 'error';
        showToast.value = true;
        return;
    }
    if (!password.value) {
        toastMessage.value = 'Vui lòng nhập mật khẩu!';
        toastType.value = 'alert-error white';
        toastIcon.value = 'error';
        showToast.value = true;
        return;
    }
    if (password.value !== confirmPassword.value) {
        toastMessage.value = 'Mật khẩu nhập lại không khớp!';
        toastType.value = 'alert-error white';
        toastIcon.value = 'error';
        showToast.value = true;
        return;
    }
    
    toastMessage.value = 'Đăng ký thành công!';
    toastType.value = 'alert-success';
    toastIcon.value = 'success';
    showToast.value = true;
};
</script>

<template>
    <div class="w-100 h-screen login">
        <h1>AIkmvn</h1>
        <div class="login-form">
            <div class="login-title">Đăng ký</div>

            <div class="flex flex-col gap-2">
                <label>Email</label>
                <input v-model="email" type="email" class="input" placeholder="Nhập email" />
            </div>

            <div class="flex flex-col gap-2">
                <label>Mật khẩu</label>
                <input v-model="password" type="password" class="input" placeholder="Nhập mật khẩu" />
            </div>

            <div class="flex flex-col gap-2">
                <label>Nhập lại mật khẩu</label>
                <input v-model="confirmPassword" type="password" class="input" placeholder="Nhập lại mật khẩu" />
            </div>

            <button @click="register" class="btn btn-neutral mt-4">Đăng ký</button>
            <a href="/login">Bạn đã có tài khoản?</a>
        </div>
    </div>

    <div v-if="showToast" class="toast toast-top toast-end">
        <div :class="['alert', toastType]">
            <svg v-if="toastIcon === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-if="toastIcon === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ toastMessage }}</span>
        </div>  
    </div>
</template>