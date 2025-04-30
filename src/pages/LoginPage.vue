<template>
  <div class="container mt-10">
    <div class="row">
      <div class="col-lg-6">
        <img src="../assets/images/logo.png" alt="" class="img-fluid" />
      </div>
      <div class="col-lg-6">
        <h2>登入</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">密碼</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              required
            />
          </div>
        </form>

        <!-- 註冊跳轉按鈕 -->
        <div class="mt-3">
          <button class="btn btn-primary-100 me-5">登入</button>
          <button class="btn btn-secondary-100" @click="goToRegister">
            還沒有帳號? 註冊
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

// 登入處理
async function handleLogin() {
  try {
    const res = await login({ email: email.value, password: password.value })
    localStorage.setItem('token', res.token)
    alert('登入成功')
    router.push('/profile')
  } catch (error) {
    console.error(error)
    alert(error.response?.data?.message || '登入失敗')
  }
}

// 跳轉到註冊頁面
function goToRegister() {
  router.push('/register')
}
</script>
