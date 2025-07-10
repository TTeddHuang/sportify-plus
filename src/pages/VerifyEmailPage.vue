<template>
  <div class="container text-center py-10">
    <h2 v-if="status === 'loading'">驗證中，請稍候…</h2>
    <h2 v-else-if="status === 'success'">已完成信箱驗證！</h2>
    <h2 v-else>驗證失敗，連結可能已過期。</h2>

    <router-link class="btn btn-primary mt-4" to="/">返回首頁</router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const status = ref('loading')
const token = useRoute().query.token ?? ''

onMounted(async () => {
  if (!token) {
    status.value = 'fail'
    return
  }

  try {
    await axios.patch(
      'https://sportify.zeabur.app/api/v1/auth/user-verification',
      null,
      { params: { token } }
    )
    status.value = 'success'
  } catch (e) {
    status.value = 'fail'
  }
})
</script>
