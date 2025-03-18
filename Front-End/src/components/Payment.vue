<script setup lang="ts">
import { ref, computed } from 'vue';

const progressValue = ref(0.104); // Giá trị thực tế (từ 0.001 đến 1)
const maxValue = 1;

const progressClass = computed(() => {
    return 'progress-primary'; // Màu xanh
});
</script>

<template>
    <div class="pb-10 pt-10 min-h-[calc(100vh-5rem)]">
        <div class="lg:px-10">
            <div class="card bg-white shadow mt-5">
                <div class="card-body">
                    <h1 class="card-title">
                        Thống kê sử dụng
                    </h1>
                    <div class="divide-y divide-dashed my-3">
                        <div></div>
                        <div></div>
                    </div>
                    <h2 class="card-title">
                        Tổng quan số tiền sử dụng
                    </h2>
                    <div class="flex">
                        <progress class="progress h-4 mt-1" :class="progressClass" :max="maxValue"
                            :value="progressValue"></progress>
                        <span class="ml-5 whitespace-nowrap">
                            <span class="text-primary">
                                {{ progressValue.toFixed(3) }} <strong>/</strong> {{ maxValue }}
                            </span> credit
                        </span>
                    </div>
                    <div class="divide-y divide-dashed my-3">
                        <div></div>
                        <div></div>
                    </div>
                    <h2 class="card-title">
                        Các gói đã đăng ký
                    </h2>
                    <div class="overflow-x-scroll">
                        <table class="table table-zebra">
                            <thead>
                                <tr>
                                    <th class="min-w-52">Tên</th>
                                    <th>Credit</th>
                                    <th>Lượt tìm só</th>
                                    <th>Ngày tạo</th>
                                    <th>Hết hạn</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="hover">
                                    <td><strong>Trial one year</strong><!----><!----></td>
                                    <td>0/1</td>
                                    <td>0/50</td>
                                    <td>17/03/2025</td>
                                    <td>17/03/2026</td>
                                    <td></td>
                                </tr>
                                <tr class="hover">
                                    <td><strong>Trial one week</strong><!----><!----></td>
                                    <td>0/1</td>
                                    <td>0/0</td>
                                    <td>17/03/2025</td>
                                    <td>24/03/2025</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-actions p-4 border-t border-base-300">
                    <button class="btn btn-success btn-outline" onclick="my_modal_2.showModal()"> Xem bảng giá &amp; gia hạn </button>
                </div>
            </div>
        </div>
    </div>
</template>