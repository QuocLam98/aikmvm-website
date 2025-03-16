<script setup lang="ts">
import '../assets/login.css'


</script>

<template>
    <div class="w-100 h-screen login">
        <h1>
            AIkmvn
        </h1>
        <div class="login-form">
            <div class="login-title">Đăng nhập</div>

            <div class="flex flex-col gap-2">
                <label class="">Email</label>
                <input type="email" class="input " placeholder="nhâp email" />
            </div>

            <div class="flex flex-col gap-2">
                <label class="">Mật khẩu</label>
                <input type="password" class="input " placeholder="nhập mật khẩu" />
            </div>

            <button class="btn btn-neutral mt-4">Login</button>

            <a href="/register" class="">Bạn chưa có tài khoản ?</a>
        </div>
    </div>
</template>