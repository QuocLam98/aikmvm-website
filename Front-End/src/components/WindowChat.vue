<script setup lang="ts">
import '../assets/window-chat.css'
</script>

<template>
    <div class="window-chat">
        <div class="chat-header-layout">
            <a class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </a>
        </div>
        <div class="">
            <div class="chat chat-start">
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div class="chat-header">
                    Obi-Wan Kenobi
                    <time class="text-xs opacity-50">12:45</time>
                </div>
                <div class="chat-bubble">You were the Chosen One!</div>
                <div class="chat-footer opacity-50">Delivered</div>
            </div>
            <div class="chat chat-end">
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div class="chat-header">
                    Anakin
                    <time class="text-xs opacity-50">12:46</time>
                </div>
                <div class="chat-bubble">I hate you!</div>
                <div class="chat-footer opacity-50">Seen at 12:46</div>
            </div>
        </div>
    </div>
</template>