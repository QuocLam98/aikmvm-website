<script setup lang="ts">
import { ref, computed, watch, onMounted, reactive } from 'vue'
import axios from 'axios'

interface user {
  _id: string,
  name: string,
}
interface bot {
  _id: string,
  name: string,
}
// Interface dữ liệu người dùng
interface Message {
  _id: string
  user: user
  bot: bot
  contentUser: string,
  contentBot: string,
  creditCost: number,
  createdAt: string
}

// State
const messages = ref<Message[]>([])
const totalItems = ref(0)
const currentPage = ref(1)
const perPage = ref(10)
const perPageOptions = ref([10, 20, 50, 100])
const loading = ref(false)
const urlServer = import.meta.env.VITE_URL_SERVER

const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value))
const visiblePages = computed(() => {
  const pages: number[] = []
  const range = 10
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i <= range ||
      i > totalPages.value - range ||
      (i >= currentPage.value - range && i <= currentPage.value + range)
    ) {
      pages.push(i)
    }
  }
  return pages
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await axios.get(`http://${urlServer}/list-message`, {
      params: {
        page: currentPage.value,
        limit: perPage.value
      }
    })
    messages.value = response.data.data
    console.log(messages.value)
    totalItems.value = response.data.total
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
  } finally {
    loading.value = false
  }
}

watch([currentPage, perPage], fetchUsers)
onMounted(fetchUsers)

const changePerPage = () => {
  currentPage.value = 1
}
</script>

<template>
  <div class="lg:px-10 pb-10 pt-10 min-h-[calc(100vh-5rem)]">
    <div class="p-4 bg-base-200 shadow">
      <div class="">
        <div v-if="loading" class="text-center py-5 text-lg font-semibold text-gray-500">
          Đang tải dữ liệu...
        </div>

        <div v-else class="overflow-x-auto">
          <table class="table table-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên người dùng</th>
                <th>Tên bot</th>
                <th>Tin nhắn gửi lên</th>
                <th>Tin nhắn trả về</th>
                <th>Số tiền đã sử dụng</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(message, index) in messages" :key="index">
                <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                <td>{{ message.user.name }}</td>
                <td>{{ message.bot.name }}</td>
                <td>{{ message.contentUser }}</td>
                <td>{{ message.contentBot }}</td>
                <td class="text-center">{{ message.creditCost }}$</td>
                <td>{{ message.createdAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination controls -->
        <!-- Pagination controls -->
        <div class="flex justify-between items-center mt-4" v-if="totalItems > 0">
          <div class="join">
            <button class="join-item btn" :disabled="currentPage === 1" @click="currentPage--">
              Prev
            </button>

            <button v-if="currentPage > 3" class="join-item btn" @click="currentPage = 1">1</button>
            <span v-if="currentPage > 3" class="join-item btn">...</span>

            <button v-for="page in visiblePages" :key="page" class="join-item btn"
              :class="{ 'btn-active': page === currentPage }" @click="currentPage = page">
              {{ page }}
            </button>

            <span v-if="currentPage < totalPages - 2" class="join-item btn">...</span>
            <button v-if="currentPage < totalPages - 2" class="join-item btn" @click="currentPage = totalPages">
              {{ totalPages }}
            </button>

            <button class="join-item btn" :disabled="currentPage === totalPages" @click="currentPage++">
              Next
            </button>
          </div>

          <!-- Chọn số bản ghi / trang -->
          <select v-model="perPage" @change="changePerPage" class="select select-bordered">
            <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>

        <!-- Nếu không có dữ liệu -->
        <div v-else class="text-center mt-4 text-gray-500">
          Không có dữ liệu để hiển thị.
        </div>

      </div>
    </div>
  </div>
</template>

<style>
thead,
tfoot {
  color: black;
}

.join button {
  background-color: #f4f4f4;
  color: black;
}

.btn-ghost:hover {
  background-color: unset;
  color: black
}

.select {
  width: 65px;
  background-color: white;
  border: 1px black solid;
}

.modal input,
.modal textarea {
  background-color: #f4f4f4;
  color: black;
}
</style>