<script setup lang="ts">
import '../assets/mainhome.css'
import WindowChat from './WindowChat.vue';
</script>

<template>
  <main id="main-home">
    <div class="about">
      <div class="container-flur">
        <div class="main-about grid grid-cols-2 gap-24">
          <WindowChat />
          <div class="flex flex-col">
            <strong class="text-strong">
              Chatbot tự động hỗ trợ tối ưu hóa công việc mà còn nâng cao chất lượng học tập và giao tiếp cho giáo viên,
              học sinh, sinh viên, cán bộ công chức, doanh nhân và mọi cá nhân muốn tận dụng AI vào cuộc sống.
            </strong>
            <strong class="text-strong">
              Một trợ lý thông minh, đầy trách nhiệm sẽ cùng đồng hành với bạn trong suốt quá trình học tập, công tác, kiếm tiền hay sáng tạo nội dung.
            </strong>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
