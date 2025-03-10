<script setup lang="ts">
import '../assets/header.css'
</script>

<template>
    <header id="main-header">
        <div class="container-flur">
            <div class="header-home">
                <div class="">
                    <a class="btn btn-ghost text-xl">Aikmvn</a>
                </div>
                <div class="header-button">
                    <ul class="hidden lg:flex lg-li">
                        <li href="/" class="text-xl">
                            <a href="/">
                                Giới thiệu
                            </a>
                        </li>
                        <li href="/" class="text-xl">
                            <a href="/">
                                Tính năng
                            </a>
                        </li>
                        <li href="/" class="text-xl">
                            <a href="/">
                                Hướng dẫn                                
                            </a>
                        </li>
                        <li class="button-login">
                            <a href="/">
                                ĐĂNG NHẬP
                            </a>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul class="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </header>
</template>
