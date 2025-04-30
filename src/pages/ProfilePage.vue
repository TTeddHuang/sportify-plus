<template>
  <div class="container mt-5">
    <h2>個人資料</h2>
    <div v-if="user">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="user.email"
          type="email"
          class="form-control"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密碼</label>
        <input v-model="password" type="password" class="form-control" />
      </div>
      <button class="btn btn-primary" @click="handleUpdate">更新資料</button>
    </div>
    <div v-else>
      <p>載入中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserProfile, updateUserProfile } from '@/api/auth'
import { useRouter } from 'vue-router'

const user = ref(null)
const password = ref('')
const router = useRouter()

// 驗證使用者是否登入
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    // 如果沒有 token，跳轉到登入頁面
    router.push('/login')
    return
  }

  try {
    const res = await getUserProfile()
    user.value = res.data
  } catch (error) {
    console.error(error)
    router.push('/login')
  }
})

async function handleUpdate() {
  try {
    const updatedUser = await updateUserProfile({ password: password.value })
    alert('資料更新成功')
    user.value = updatedUser.data
  } catch (error) {
    console.error(error)
    alert(error.response?.data?.message || '資料更新失敗')
  }
}
</script>
