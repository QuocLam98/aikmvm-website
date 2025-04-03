<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import '../assets/login.css';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const router = useRouter();

const validate = () => {
    emailError.value = '';
    passwordError.value = '';
    confirmPasswordError.value = '';
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
    } else if (!/[A-Z]/.test(password.value)) {
        passwordError.value = 'Mật khẩu phải chứa ít nhất một chữ in hoa';
        isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
        passwordError.value = 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt';
        isValid = false;
    } else if (!/[0-9]/.test(password.value) || !/[a-zA-Z]/.test(password.value)) {
        passwordError.value = 'Mật khẩu phải bao gồm cả chữ và số';
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        confirmPasswordError.value = 'Mật khẩu nhập lại không khớp';
        isValid = false;
    }

    return isValid;
};

const register = async () => {
    if (!validate()) return;
    errorMessage.value = '';
    try {
        await axios.post('http://localhost:3000/register', {
            email: email.value,
            password: password.value,
            name: email.value
        });

        router.push('/login'); // Chuyển hướng đến trang đăng nhập
    } catch (error: any) {
        errorMessage.value = error || 'Đăng ký thất bại';
        console.log(error)
    }
};
</script>

<template>
    <div class="w-100 h-screen login">
        <h1>AIknvm</h1>
        <div class="login-form">
            <div class="login-title">Đăng ký</div>

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

            <div class="flex flex-col gap-2">
                <label>Nhập lại mật khẩu</label>
                <input v-model="confirmPassword" type="password" class="input" placeholder="Nhập lại mật khẩu" />
                <p v-if="confirmPasswordError" class="text-red-500">{{ confirmPasswordError }}</p>
            </div>

            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <button @click="register" class="btn btn-neutral mt-4">Đăng ký</button>
            <a href="/login">Bạn đã có tài khoản?</a>
        </div>
    </div>
</template>