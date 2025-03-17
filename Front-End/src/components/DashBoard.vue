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
                <li>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2" />
                            <path fill="currentColor"
                                d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2" />
                        </svg>
                        Chat
                    </a>
                </li>
                <li>
                    <details open>
                        <summary><span class="bg-clip-text bg-gradient-to-l from-primary to-secondary text-transparent">
                            <svg data-v-cf1ec82f="" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                                class="icon text-primary w-6 h-6" width="1em" height="1em" viewBox="0 0 24 24">
                                <g fill="none">
                                    <path
                                        d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z">
                                    </path>
                                    <path fill="currentColor"
                                        d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2">
                                    </path>
                                </g>
                            </svg> Chatbot AI
                        </span></summary>
                        <ul>
                            <li><a>Cấu hình câu trả lời</a></li>
                            <li><a>Kho ảnh và tài liệu</a></li>
                        </ul>
                    </details>
                </li>
                <li><a>Item 3</a></li>
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
