<script setup lang="ts">
import '../assets/login.css'
</script>

<template>
    <div class="w-100 login">
        <h1>
            AIkmvn
        </h1>
        <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
            <legend class="fieldset-legend">Đăng nhập</legend>

            <label class="fieldset-label">Email</label>
            <input type="email" class="input" placeholder="nhâp email" />

            <label class="fieldset-label">Mật khẩu</label>
            <input type="password" class="input" placeholder="nhập mật khẩu" />

            <button class="btn btn-neutral mt-4">Login</button>

            <a href="/register" class="fieldset-label">Bạn chưa có tài khoản ?</a>
        </fieldset>
    </div>
</template>