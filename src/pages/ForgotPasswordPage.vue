<template>
  <div class="container mt-10">
    <div class="row">
      <div class="col-lg-6">
        <img src="../assets/images/logo.png" alt="" class="img-fluid" />
      </div>
      <div class="col-lg-6">
        <h2 class="mb-5">忘記密碼</h2>
        <p class="fs-5">輸入註冊帳號所使用的Email信箱，我們將發送一組密碼給您。</p>
        <form @submit.prevent="handleForgotPassword">
          <div class="mb-3">
            <label class="form-label fs-5">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              required
              @blur="validateEmail"
            />
            <p v-if="emailError" class="text-danger mt-1">*不是正確 Email 格式！</p>
          </div>

          <button class="btn btn-primary-100 btn-lg custom-btn mt-5" :disabled="emailError">發送重設連結</button>
        </form>

        <div class="d-flex justify-content-between mt-5">
          <p class="mb-0">
            已有帳號？<router-link to="/login" class="text-primary-500 text-decoration-underline">立即登入</router-link>
          </p>
          <p class="mb-0">
            <router-link to="/register" class="text-primary-500 text-decoration-underline">建立新帳號</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const emailError = ref(false)
const router = useRouter()

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = !emailPattern.test(email.value)
}

// 忘記密碼處理
async function handleForgotPassword() {
  validateEmail()
  if (emailError.value) return

  try {
    // 模擬 API 呼叫（你可以替換成正式 API）
    console.log(`模擬發送密碼重設連結到: ${email.value}`)
    alert('已發送密碼重設連結至您的 Email，請查看信箱。')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('無法發送密碼重設信，請稍後再試。')
  }
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
