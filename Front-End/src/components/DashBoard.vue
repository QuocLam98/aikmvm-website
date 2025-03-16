<script setup lang="ts">
import { ref, watch } from 'vue';
import '../assets/dashboard.css';

const isNavOpen = ref(false);

// Theo dõi sự thay đổi của checkbox để cập nhật trạng thái
watch(isNavOpen, (newVal) => {
    if (newVal == true) {

    }
});
</script>

<template>
    <div :class="['drawer', { 'lg:drawer-open': isNavOpen == true }]">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" v-model="isNavOpen" />
        <div class="drawer-content bg-base-300">
            <!-- Page content here -->
            <div class="navbar bg-base-100 border-b border-base-300">
                <label for="my-drawer" class="btn btn-square btn-ghost btn-hover">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#000" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
                    </svg>
                </label>
                <div class="navbar-start">
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
                    <a class="btn btn-ghost normal-case text-xl text-black btn-hover">AIkmvn</a>
                </div>
                <div class="navbar-end">
                    <button class="btn" onclick="my_modal_2.showModal()">Gia hạn</button>
                </div>
            </div>
            <div class="pb-10 min-heght container-flur">
                <div>

                </div>
            </div>
        </div>
        <div :class="['drawer-side border-r border-base-300', { 'hidden': isNavOpen == false }]">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
    </div>
    <dialog id="my_modal_2" class="modal">
        <div class="modal-box max-w-7xl xl:max-w-[95vw] w-full [&>button.absolute]:z-10 bg-base-200">
            <h3 class="text-lg font-bold">Hello!</h3>
            <p class="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>
