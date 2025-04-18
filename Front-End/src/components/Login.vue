<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import '../assets/login.css';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const emailError = ref('');
const passwordError = ref('');
const router = useRouter();
const urlServer = import.meta.env.VITE_URL_SERVER

const validate = () => {
    emailError.value = '';
    passwordError.value = '';
    let isValid = true;

    if (!email.value) {
        emailError.value = 'Email không được để trống';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = 'Email không hợp lệ';
        isValid = false;
    }

    if (!password.value) {
        passwordError.value = 'Mật khẩu không được để trống';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.value = 'Mật khẩu phải có ít nhất 6 ký tự';
        isValid = false;
    }

    return isValid;
};

const login = async () => {
    if (!validate()) return;
    errorMessage.value = '';
    try {
        const response = await axios.post(`http://${urlServer}/login`, {
            email: email.value,
            password: password.value,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('email', response.data.email);
        router.push('/dashboard');
    } catch (error: any) {
        errorMessage.value = error.response?.data?.message || 'Đăng nhập thất bại';
    }
};
</script>

<template>
    <div class="w-100 h-screen login">
        <h1>AIknvm</h1>
        <div class="login-form">
            <div class="login-title">Đăng nhập</div>

            <div class="flex flex-col gap-2">
                <label>Email</label>
                <input v-model="email" type="email" class="input" placeholder="Nhập email" />
                <p v-if="emailError" class="text-red-500">{{ emailError }}</p>
            </div>

            <div class="flex flex-col gap-2">
                <label>Mật khẩu</label>
                <input v-model="password" type="password" class="input" placeholder="Nhập mật khẩu" />
                <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
            </div>

            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <button @click="login" class="btn btn-neutral mt-4">Login</button>

            <a href="/register" class="">Bạn chưa có tài khoản?</a>
        </div>
    </div>
</template>