<script setup lang="ts">
import '../assets/mainhome.css'
import WindowChat from './WindowChat.vue';
import { ref } from 'vue';

// Xác định kiểu dữ liệu cho openIndex
const openIndex = ref<number | null>(null);

// Xác định kiểu dữ liệu cho mảng items
interface AccordionItem {
  title: string;
  content: string;
}

const items = ref<AccordionItem[]>([
  {
    title: "Tại sao nên chọn Chatbot AIknvm ?",
    content: "AIknvm là AI chatbot đầu tiên tại Việt Nam tập trung sử dụng sức mạnh trí tuệ nhân tạo để hỗ trợ làm việc và học tập, giúp giảm thời gian và hiệu quả"
  },
  {
    title: "AIknvm có cung cấp dịch vụ miễn phí không ?",
    content: "Có. AIknvm cung cấp dịch vụ dùng thử miễn phí với 2 credits để bạn trải nghiệm AI Chatbot trước khi quyết định sử dụng gói dịch vụ trả phí. Lưu ý là mỗi tài khoản chỉ có thể đăng ký sử dụng miễn phí 1 lần duy nhất."
  },
  {
    title: "Tôi dùng thử miễn phí thì có bị giới hạn tính năng không?",
    content: "Không, bạn có thể sử dụng AI Chatbot miễn phí với 2 credit với đầy đủ tính năng tuy nhiên tốc độ xử lý sẽ ở mức chậm. Trong thời gian này, bạn có thể trải nghiệm đầy đủ các tính năng của AI Chatbot AIknvm để xem liệu có phù hợp với nhu cầu của bạn hay không. Nếu bạn muốn tiếp tục sử dụng sau khi kết thúc thời gian dùng thử, bạn có thể chọn các gói dịch vụ phù hợp với bạn để tiếp tục tận hưởng các ưu đãi và tính năng của AI Chatbot AIknvm."
  },
  {
    title: 'Tôi dùng thử miễn phí có được hỗ trợ không?',
    content: 'Có. Đội ngũ của AIknvm luôn sẵn sàng để được hỗ trợ bạn bất cứ vấn đề nào liên quan đến sản phảm và dịch vụ của chúng tôi'
  },
  {
    title: 'Cách tính credit như thế nào?',
    content: 'AI Chatbot AIknvm được xây dựng trên nền tảng trí tuệ nhân tạo ChatGPT. Do đó, chúng tôi quy định 1 credit tương đương với 1 USD. Khi bạn sử dụng AI Chatbot AIknvm để trả lời các câu hỏi của khách hàng, theo cách tính phí của ChatGPT, cứ 750 từ = 0.002 đô. Vậy với 50.000đ bạn có thể trả lời cho khách hàng đến 750.000 từ. Bình quân nếu mỗi câu trả lời là 50 từ thì mỗi ngày chatbot AI AIknvm có thể giúp bạn trả lời khoảng 15.000 câu hỏi.'
  },
  {
    title: 'Cách thức thanh toán khi nâng cấp lên gói trả phí ?',
    content: 'Để thanh toán, bạn có thể sử dụng các phương thức thanh toán như chuyển khoản ngân hàng, thanh toán qua ví điện tử. Tài khoản của bạn sẽ được kích hoạt ngay khi chúng tôi nhận được chuyển khoản'
  },
  {
    title: 'Đơn hàng của tôi sẽ được duyệt trong bao lâu ?',
    content: 'Tài khoản của bạn sẽ được cập nhật trong khoảng từ 10 đến 15 phút kể từ khi chúng tôi nhận được thông tin thanh toán (kể cả chủ nhật và các ngày lễ tết).'
  },
  {
    title: 'Điều gì sẽ xảy ra khi dùng hết credit ?',
    content: 'Khi sử dụng hết credit, để có thể tiếp tục sử dụng dịch vụ AI Chatbot AIknvm, bạn có thẻ thanh toán mua thêm credit. Nếu không, AI Chatbot AIknvm sẽ không thể thực hiện các chức năng như trước và ngừng hỗ trợ.'
  }
]);

// Hàm mở/đóng Accordion
const toggleAccordion = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
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
            <strong class="text-strong text-black">
              Chatbot tự động hỗ trợ tối ưu hóa công việc mà còn nâng cao chất lượng học tập và giao tiếp cho giáo viên,
              học sinh, sinh viên, cán bộ công chức, doanh nhân và mọi cá nhân muốn tận dụng AI vào cuộc sống.
            </strong>
            <strong class="text-strong text-black">
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
              Tăng thời gian hoàn thành công việc
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
  <div class="feature">
    <div class="container-flur">
      <div class="feature-content">
        <h1>
          Tính năng của ChatBot AIknvm
        </h1>
        <div class="feature-list-item">
          <div class="feature-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M9.5 3a7.5 7.5 0 0 0-6.797 10.675a68 68 0 0 0-.681 3.142a.996.996 0 0 0 1.153 1.17c.623-.11 1.978-.36 3.236-.65A7.5 7.5 0 1 0 9.5 3m-.038 16a7.47 7.47 0 0 0 5.1 2a7.5 7.5 0 0 0 3.088-.663c1.043.244 2.186.488 2.913.64a1.244 1.244 0 0 0 1.467-1.5c-.162-.703-.418-1.795-.671-2.803A7.503 7.503 0 0 0 17.015 6.41a8.4 8.4 0 0 1 .8 2.048a6 6 0 0 1 2.747 5.042a5.96 5.96 0 0 1-.665 2.747l-.13.253l.07.276c.228.895.467 1.9.642 2.65a112 112 0 0 1-2.74-.61l-.264-.062l-.243.121c-.804.4-1.71.625-2.67.625a6 6 0 0 1-2.92-.756a8.5 8.5 0 0 1-2.18.256" />
            </svg>
            <span>Trả lời theo kịch bản hoặc theo ngữ cảnh</span>
          </div>
          <div class="feature-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 20 20">
              <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                <path
                  d="M5.604 5.45a6.44 6.44 0 0 0-1.883 5.278a.5.5 0 0 1-.994.105a7.44 7.44 0 0 1 2.175-6.096c2.937-2.897 7.675-2.85 10.582.098s2.888 7.685-.05 10.582a7.43 7.43 0 0 1-5.097 2.142a7.5 7.5 0 0 1-2.14-.271a.5.5 0 0 1 .266-.964a6.5 6.5 0 0 0 1.856.235a6.42 6.42 0 0 0 4.413-1.854c2.541-2.506 2.562-6.61.04-9.168s-6.627-2.594-9.168-.088" />
                <path
                  d="M3.594 11.363a.5.5 0 0 1-.706.04l-1.72-1.53a.5.5 0 1 1 .664-.746l1.72 1.53a.5.5 0 0 1 .042.706" />
                <path
                  d="M2.82 11.3a.5.5 0 0 0 .7.1l2-1.5a.5.5 0 1 0-.6-.8l-2 1.5a.5.5 0 0 0-.1.7M10 6.5a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5" />
                <path d="M13.5 10.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5" />
              </g>
            </svg>
            <span>Thời gian trả lời nhanh chóng</span>
          </div>
          <div class="feature-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path stroke-dasharray="40" stroke-dashoffset="40"
                  d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="40;0" />
                </path>
                <path stroke-dasharray="12" stroke-dashoffset="12" d="M10.5 13.5l-7.5 7.5">
                  <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0" />
                </path>
              </g>
            </svg>
            <span>Tìm kiếm dữ liệu trên các nguồn tài nguyên</span>
          </div>
          <div class="feature-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path fill="currentColor"
                  d="M17.255 1.625a1 1 0 0 1 1.412-.078A9.98 9.98 0 0 1 22 9c0 5.091-3.804 9.294-8.725 9.92l-.275.03V20h3a1 1 0 0 1 .117 1.993L16 22H8a1 1 0 0 1-.117-1.993L8 20h3v-1.05a10 10 0 0 1-7.333-4.42a1 1 0 1 1 1.666-1.107a8 8 0 0 0 6.36 3.571l.318.006a8 8 0 0 0 5.322-13.963a1 1 0 0 1-.078-1.412M12 2a7 7 0 1 1 0 14a7 7 0 0 1 0-14m0 2a5 5 0 1 0 0 10a5 5 0 0 0 0-10" />
              </g>
            </svg>
            <span>Hỗ trợ đa ngôn ngữ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="price">
    <span class="price-bg"></span>
    <div class="container-benefit">
      <div class="price-content">
        <h1>
          Bảng giá dịch vụ
        </h1>
        <div class="price-list">
          <div class="price-item">
            <div class="price-item-header bg-blue-500 text-white">
              Nhận 2 credits
            </div>
            <div class="price-item-title text-black">
              Miễn phí
            </div>
            <div class="price-item-cotent">
              <ul>
                <li>
                  <div aria-label="info" class="status status-info"></div> Hỏi mọi thứ trên ChatGPT
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> chỉ đăng ký 1 lần duy nhất với 1 tài khoản
                </li>
              </ul>
              <button class="btn btn-active btn-primary">Đăng ký ngay</button>
            </div>
          </div>
          <div class="price-item">
            <div class="price-item-header bg-blue-500 text-white">
              Nhận 5 credits
            </div>
            <div class="price-item-title text-black">
              50k VNĐ
            </div>
            <div class="price-item-cotent">
              <ul>
                <li>
                  <div aria-label="info" class="status status-info"></div> Hỏi mọi thứ trên ChatGPT
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Trả lời nhanh hơn
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Tối ưu câu trả lời theo ý muốn
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Sử dụng đến khi hết credits
                </li>
              </ul>
              <button class="btn btn-active btn-primary">Đăng ký ngay</button>
            </div>
          </div>
          <div class="price-item">
            <div class="price-item-header bg-blue-500 text-white">
              Nhận 12 credits
            </div>
            <div class="price-item-title text-black">
              100k VNĐ
            </div>
            <div class="price-item-cotent">
              <ul>
                <li>
                  <div aria-label="info" class="status status-info"></div> Hỏi mọi thứ trên ChatGPT
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Trả lời nhanh hơn
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Tối ưu câu trả lời theo ý muốn
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Sử dụng đến khi hết credits
                </li>
              </ul>
              <button class="btn btn-active btn-primary">Đăng ký ngay</button>
            </div>
          </div>
          <div class="price-item">
            <div class="price-item-header bg-blue-500 text-white">
              Nhận 18 credits
            </div>
            <div class="price-item-title text-black">
              150k VNĐ
            </div>
            <div class="price-item-cotent">
              <ul>
                <li>
                  <div aria-label="info" class="status status-info"></div> Hỏi mọi thứ trên ChatGPT
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Trả lời nhanh hơn
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Tối ưu câu trả lời theo ý muốn
                </li>
                <li>
                  <div aria-label="info" class="status status-info"></div> Sử dụng đến khi hết credits
                </li>
              </ul>
              <button class="btn btn-active btn-primary">Đăng ký ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="faq">
    <div class="container-flur">
      <div class="faq-cotent">
        <h1>
          FAQs - Câu hỏi thường gặp
        </h1>
        <div>
          <div v-for="(item, index) in items" :key="index"
            class="collapse collapse-plus border border-base-300 bg-base-200"
            :class="{ 'collapse-open': openIndex === index }">
            <div class="collapse-title font-semibold" @click="toggleAccordion(index)">
              <span>{{ item.title }}</span>
            </div>
            <div class="collapse-content text-sm">
              <span>{{ item.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
