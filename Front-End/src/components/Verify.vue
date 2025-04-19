<!-- Verify.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const message = ref('Đang xác minh...')
const urlServer = import.meta.env.VITE_URL_SERVER

onMounted(async () => {
  const token = route.query.token
  if (typeof token === 'string') {
    const res = await axios.get(`http://${urlServer}/verify?token=${token}`)
    message.value = res.data.message
  } else {
    message.value = 'Thiếu token'
  }
})
</script>