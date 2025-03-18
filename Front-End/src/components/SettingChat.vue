<script setup lang="ts">
import { ref, computed } from 'vue';

const maxLength = 15500;
const text = ref('');

const charCount = computed(() => `${text.value.length}/${maxLength}`);
</script>

<template>
    <div class="pb-10 pt-10 min-h-[calc(100vh-5rem)]">
        <div class="lg:px-10">
            <div class="bg-white p-8 flex flex-col rounded-md shadow gap-3">
                <h1 class="card-title">Cấu hình nội dung</h1>
                <select class="select">
                    <option disabled selected>Chọn 1 Bot AI</option>
                    <option>Giáo dục</option>
                    <option>Kinh tế</option>
                    <option>Xây dựng</option>
                </select>
                <div class="form-control">
                    <label class="label mb-3"><span>Số ký tự : </span><span class="text-sm opacity-80">{{ charCount }}</span></label>
                    <textarea class="textarea textarea-bordered w-full" rows="9" v-model="text"></textarea>
                </div>
                <div class="border-t border-dashed space-x-5 flex px-2 py-5 mt-3">
                    <button class="btn btn-success">
                        Lưu và training AI
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>