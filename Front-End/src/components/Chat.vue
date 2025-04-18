<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

interface Bot {
  _id: string
  name: string
  createdAt: string
}

interface ChatMessage {
  sender: 'user' | 'bot'
  content: string
  createdAt: string
}

const selectedBot = ref<Bot | null>(null)
const bots = ref<Bot[]>([])
const messages = ref<ChatMessage[]>([])
const chatContainer = ref<HTMLElement | null>(null)

const page = ref(1)
const limit = 20
const hasMore = ref(true)
const loading = ref(false)
const newMessage = ref('')
const isBotTyping = ref(false);  // Trạng thái đang trả lời
const urlServer = import.meta.env.VITE_URL_SERVER

onMounted(async () => {
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');
  if (!email) return;

  try {
    let response;
    if (role === 'admin') {
      response = await axios.get(`https://${urlServer}/list-bot-admin`);
    } else {
      response = await axios.post(`https://${urlServer}/list-use-bot`, { email });
    }
    bots.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu bot:', error);
  }
})

const sendMessage = async () => {
  const content = newMessage.value.trim()
  if (!content || !selectedBot.value) return

  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')

  try {
    // Thêm tin nhắn user
    messages.value.push({
      sender: 'user',
      content,
      createdAt: new Date().toISOString()
    })

    // Reset input và cuộn
    newMessage.value = ''
    nextTick(() => {
      chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight })
    })

    // Hiển thị "bot đang trả lời..."
    isBotTyping.value = true
    messages.value.push({
      sender: 'bot',
      content: 'Đang trả lời...',
      createdAt: new Date().toISOString()
    })

    const response = await axios.post(`https://${urlServer}/create-message`, {
      bot: selectedBot.value._id,
      content,
      token
    })

    // Gỡ bỏ tin nhắn "Đang trả lời..."
    messages.value.pop()

    // Thêm nội dung thật sự của bot
    const { contentBot, createdAt } = response.data
    messages.value.push({
      sender: 'bot',
      content: contentBot,
      createdAt
    })

    nextTick(() => {
      chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight })
    })
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn:', error)
  } finally {
    isBotTyping.value = false
  }
}


async function fetchMessages(botId: string, userId: string, isLoadMore = false) {
  if (loading.value || !hasMore.value) return
  loading.value = true
  const token = localStorage.getItem('token')

  try {
    const res = await axios.post(`https://${urlServer}/list-message-bot/` + botId, {
      token,
      page: page.value,
      limit
    })

    const newMessages = res.data.data.flatMap((msg: any) => {
      const result: ChatMessage[] = []

      // Đảm bảo contentUser luôn trước contentBot
      if (msg.contentUser) {
        result.push({
          sender: 'user',
          content: msg.contentUser,
          createdAt: msg.createdAt
        })
      }

      if (msg.contentBot) {
        result.push({
          sender: 'bot',
          content: msg.contentBot,
          createdAt: msg.createdAt
        })
      }

      return result
    })

    // Sắp xếp theo thứ tự thời gian (từ mới nhất đến cũ nhất)
    // newMessages.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Nếu là load more tin nhắn, thêm vào đầu mảng
    if (isLoadMore) {
      messages.value = [...newMessages, ...messages.value]
    } else {
      // Nếu là lấy tin nhắn mới, thêm vào đầu mảng (tin nhắn mới sẽ luôn ở đầu)
      messages.value = [...newMessages, ...messages.value]
    }

    // Kiểm tra nếu không còn tin nhắn nữa
    if (newMessages.length < limit) {
      hasMore.value = false
    }
  } catch (error) {
    console.error('Lỗi khi lấy tin nhắn:', error)
  } finally {
    loading.value = false
  }
}

const selectBot = async (bot: Bot) => {
  messages.value = []
  selectedBot.value = bot

  const email = localStorage.getItem('email')
  if (email) {
    page.value = 1
    hasMore.value = true
    await fetchMessages(bot._id, email)
    await nextTick()

    // Cuộn đến cuối khi có tin nhắn mới
    chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight })
  }
}

function handleScroll() {
  const el = chatContainer.value
  if (!el || loading.value || !hasMore.value) return

  if (el.scrollTop < 50) {
    const prevHeight = el.scrollHeight
    page.value += 1
    const email = localStorage.getItem('email')
    if (selectedBot.value && email) {
      fetchMessages(selectedBot.value._id, email, true).then(() => {
        nextTick(() => {
          const newHeight = el.scrollHeight
          el.scrollTop = newHeight - prevHeight
        })
      })
    }
  }
}
</script>

<template>
  <div class="pb-10 pt-10 min-h-[calc(100vh-5rem)]">
    <div class="lg:px-10">
      <div class="drawer lg:drawer-open chat-container relative overflow-y-hidden shadow">
        <input type="checkbox" class="drawer-toggle">
        <div class="drawer-content">
          <div
            class="flex justify-between w-full bg-white px-2 chat-title shadow-md border-l border-b border-base-300 z-10">
            <div class="mt-2 grid grid-flow-col-dense place-content-center gap-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="false"
                  role="img" class="icon swap-on w-6 h-6 text-success" width="1em" height="1em" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M11.217 19.384A3.501 3.501 0 0 0 18 18.167V13l-6-3.35"></path>
                    <path d="M5.214 15.014A3.501 3.501 0 0 0 9.66 20.28L14 17.746V10.8"></path>
                    <path d="M6 7.63c-1.391-.236-2.787.395-3.534 1.689a3.474 3.474 0 0 0 1.271 4.745L8 16.578l6-3.348">
                    </path>
                    <path d="M12.783 4.616A3.501 3.501 0 0 0 6 5.833V10.9l6 3.45"></path>
                    <path d="M18.786 8.986A3.501 3.501 0 0 0 14.34 3.72L10 6.254V13.2"></path>
                    <path
                      d="M18 16.302c1.391.236 2.787-.395 3.534-1.689a3.474 3.474 0 0 0-1.271-4.745l-4.308-2.514L10 10.774">
                    </path>
                  </g>
                </svg>
              </div>
              <span class="font-semibold">
                {{ selectedBot?.name || 'Bot giáo dục' }}
              </span>
            </div>
          </div>

          <div v-if="selectedBot" ref="chatContainer"
            class="chat-scroll bg-zinc-50 border-l border-base-300 w-full shadow-inner py-2 overflow-y-auto"
            style="height: calc(10px - 7.6rem + 82vh);" @scroll="handleScroll">

            <div v-for="(message, index) in messages" :key="index"
              :class="message.sender === 'user' ? 'chat chat-end' : 'chat chat-start'">
              <div v-if="message.sender === 'bot'" class="chat-image avatar">
                  <!-- icon bot -->
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="false"
                  role="img" class="icon swap-on w-6 h-6 text-success" width="1em" height="1em" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M11.217 19.384A3.501 3.501 0 0 0 18 18.167V13l-6-3.35"></path>
                    <path d="M5.214 15.014A3.501 3.501 0 0 0 9.66 20.28L14 17.746V10.8"></path>
                    <path d="M6 7.63c-1.391-.236-2.787.395-3.534 1.689a3.474 3.474 0 0 0 1.271 4.745L8 16.578l6-3.348">
                    </path>
                    <path d="M12.783 4.616A3.501 3.501 0 0 0 6 5.833V10.9l6 3.45"></path>
                    <path d="M18.786 8.986A3.501 3.501 0 0 0 14.34 3.72L10 6.254V13.2"></path>
                    <path
                      d="M18 16.302c1.391.236 2.787-.395 3.534-1.689a3.474 3.474 0 0 0-1.271-4.745l-4.308-2.514L10 10.774">
                    </path>
                  </g>
                </svg>
              </div>
              <div class="chat-bubble">
                <span v-if="message.content === 'Đang trả lời...'">
                  Đang trả lời<span class="dot-typing"></span>
                </span>
                <span v-else>{{ message.content }}</span>
              </div>
            </div>

          </div>

          <div v-else class="flex items-center justify-center h-full text-gray-400">
            <p>Chọn một bot để bắt đầu trò chuyện</p>
          </div>

          <div class="bg-white py-2 px-3 border-l flex border-t border-base-300">
            <input v-model="newMessage" @keydown.enter="sendMessage" placeholder="Viết gì đó ..." type="text"
              class="input-chat w-full border-none focus-within:ring-0 px-0 focus-visible:outline-none"
              maxlength="1000" />
            <svg @click="sendMessage" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"
              class="icon w-10 h-10 ml-2 text-primary cursor-pointer transition-all active:scale-75" width="1em"
              height="1em" viewBox="0 0 48 48">
              <path fill="currentColor"
                d="M41.42 7.309s3.885-1.515 3.56 2.164c-.107 1.515-1.078 6.818-1.834 12.553l-2.59 16.99s-.216 2.489-2.159 2.922c-1.942.432-4.856-1.515-5.396-1.948c-.432-.325-8.094-5.195-10.792-7.575c-.756-.65-1.62-1.948.108-3.463L33.649 18.13c1.295-1.3 2.59-4.33-2.806-.65l-15.11 10.28s-1.727 1.083-4.964.109l-7.016-2.165s-2.59-1.623 1.835-3.246c10.793-5.086 24.068-10.28 35.831-15.15">
              </path>
            </svg>
          </div>
        </div>

        <div class="drawer-side list-bot scrollbar-none"><label class="drawer-overlay"></label>
          <div id="nMYDQlaP6BQ_0" class="bg-base-100 min-h-full">
            <div class="px-5 py-3 bg-gray-100 flex justify-between sticky top-0 z-10 shadow">
              <h2 class="font-semibold text-base my-auto">Danh sách AI</h2>
            </div>
            <ul class="menu p-4 w-72 pb-[25vh] text-base-content">
              <li v-for="bot in bots" :key="bot._id" class="w-full">
                <a class="w-full" @click="selectBot(bot)">
                  {{ bot.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<style>
.drawer-side h2,
svg {
  color: black;
}

.chat-container {
  max-height: 80vh;
}

.chat-scroll {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  scrollbar-width: none;
  overflow: auto;
  overflow-y: scroll;
  padding: 0px 8px;
}

.chat-scroll::-webkit-scrollbar {
  display: none;
}

.chat-bubble {
  max-width: 50% !important;
  background-color: #e9e9e9 !important;
  color: black;
}

.input-chat {
  color: black;
}
.dot-typing::after {
  content: ' .';
  animation: dots 1.5s steps(3, end) infinite;
}
@keyframes dots {
  0% { content: ' .'; }
  33% { content: ' ..'; }
  66% { content: ' ...'; }
  100% { content: ' .'; }
}
.chat-title {
    padding-top: 7px;
    padding-bottom: 7px;
}
.list-bot {
  width: 150px;
}
</style>