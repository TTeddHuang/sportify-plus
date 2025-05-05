<template>
  <div class="container mt-10">
    <div class="row">
      <div class="col-lg-6">
        <img src="../assets/images/logo.png" alt="" class="img-fluid" />
      </div>
      <div class="col-lg-6">
        <h2>註冊</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-3 mt-3">
            <label class="form-label fs-5">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              @blur="validateEmail"
              required
            />
            <p v-if="emailError" class="text-danger mt-1">
              *不是正確Email格式!
            </p>
          </div>
          <div class="mb-3">
            <label class="form-label fs-5">密碼</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              @blur="validatePassword"
              required
            />
            <p v-if="passwordError" class="text-danger mt-1">
              *密碼格式錯誤!
            </p>
          </div>
          <div class="mb-3">
            <label class="form-label fs-5">確認密碼</label>
            <input
              v-model="checkPassword"
              type="password"
              class="form-control"
              @blur="validateCheckPassword"
              required
            />
            <p v-if="checkPasswordError" class="text-danger mt-1">
              密碼不一致
            </p>
          </div>
          <button class="btn btn-primary-200 custom-btn mt-5" :disabled="emailError || passwordError || checkPasswordError">註冊</button>
        </form>
        <div class="d-flex justify-content-between mt-5">
          <p class="mb-0">
            已有帳號？<router-link to="/login" class="text-primary-500 text-decoration-underline">立即登入</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { register } from '@/api/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const checkPassword = ref('')
const emailError = ref(false)
const passwordError = ref(false)
const checkPasswordError = ref(false)
const router = useRouter()

// 驗證 Email 格式
function validateEmail() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = !pattern.test(email.value)
}

// 驗證密碼格式
function validatePassword() {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/
  passwordError.value = !pattern.test(password.value)
  // 同步確認密碼驗證
  validateCheckPassword()
}

// 驗證確認密碼一致性
function validateCheckPassword() {
  checkPasswordError.value = password.value !== checkPassword.value
}

async function handleRegister() {

  validateEmail()
  validatePassword()
  validateCheckPassword()

  if (emailError.value || passwordError.value || checkPasswordError.value) return


  try {
    // const res = await register({ email: email.value, password: password.value })
    alert('註冊成功')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert(error.response?.data?.message || '註冊失敗')
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
