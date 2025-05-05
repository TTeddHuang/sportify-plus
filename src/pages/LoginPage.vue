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
            <label class="form-label fs-5">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              required
              @blur="validateEmail"
            />
            <p v-if="emailError" class="text-danger mt-1">
              *不是正確Email格式! 123
            </p>
          </div>
          <div class="mb-3">
            <label class="form-label fs-5">密碼</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              required
              @blur="validatePassword"
            />
            <p v-if="passwordError" class="text-danger mt-1">*密碼格式錯誤!</p>
          </div>
        </form>

        <!-- 註冊跳轉按鈕 -->
        <div class="mt-3">
          <button
            class="btn btn-primary-100 btn-lg custom-btn mt-5"
            :disabled="emailError || passwordError"
          >
            登入
          </button>
          <div class="d-flex justify-content-between mt-5">
            <p class="mb-0">
              還沒有帳號?
              <router-link
                to="/register"
                class="text-primary-500 text-decoration-underline"
                >建立一個帳號</router-link
              >
            </p>
            <p class="mb-0">
              <router-link
                to="/forgot-password"
                class="text-primary-500 text-decoration-underline"
                >忘記密碼</router-link
              >
            </p>
          </div>
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
const emailError = ref(false)
const passwordError = ref(false)
const router = useRouter()

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = !emailPattern.test(email.value)
}

function validatePassword() {
  // 至少 1 小寫、1 大寫、1 數字、長度 8~16
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/
  passwordError.value = !passwordPattern.test(password.value)
}

// 登入處理
async function handleLogin() {
  validateEmail()
  if (emailError.value) return

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
<style scoped>
.custom-btn {
  display: block;
  margin: 0 auto;
  width: 200px;
  max-width: 100%;
}
</style>
