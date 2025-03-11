<script setup lang="ts">
import '../assets/mainhome.css'
import WindowChat from './WindowChat.vue';
</script>

<template>
  <main id="main-home">
    <div class="about">
      <div class="container-flur">
        <div class="main-about grid grid-cols-2 gap-24">
          <div class="h-[32rem]">
            <WindowChat />
          </div>
          <div class="flex flex-col">
            <strong class="text-strong">
              Chatbot tự động hỗ trợ tối ưu hóa công việc mà còn nâng cao chất lượng học tập và giao tiếp cho giáo viên,
              học sinh, sinh viên, cán bộ công chức, doanh nhân và mọi cá nhân muốn tận dụng AI vào cuộc sống.
            </strong>
            <strong class="text-strong">
              Một trợ lý thông minh, đầy trách nhiệm sẽ cùng đồng hành với bạn trong suốt quá trình học tập, công tác,
              kiếm tiền hay sáng tạo nội dung.
            </strong>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div class="benefit">
    <span class="bg-benefit"></span>
    <div class="container-benefit">
      <div class="benefit-cotent">
        <h1>Lợi ích vượt trội</h1>
        <div class="flex gap-8">
          <div class="card-benefit">
            <span class="icon-benefit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-50">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>

            </span>
            <h1>
              Tăng thời hoàn thành công việc
            </h1>
            <span>
              Bằng việc AI Chatbot tự động tư vấn và hỗ trợ trong công việc và học tập của bạn.
            </span>
          </div>
          <div class="card-benefit">
            <span class="icon-benefit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-50">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </span>
            <h1>
              Giảm 90% thời gian và chi phí
            </h1>
            <span>
              Với chi phí sử dụng hợp lý và thời gian trả kết quả theo yêu cầu của bạn.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
