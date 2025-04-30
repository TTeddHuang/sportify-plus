<template>
  <div class="container mt-10">
    <div class="row">
      <div class="col-lg-6">
        <img src="../assets/images/logo.png" alt="" class="img-fluid" />
      </div>
      <div class="col-lg-6">
        <h2>註冊</h2>
        <form @submit.prevent="handleRegister">
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
          <div class="mb-3">
            <label class="form-label">確認密碼</label>
            <input
              v-model="checkPassword"
              type="password"
              class="form-control"
              required
            />
          </div>
          <button class="btn btn-primary-200">註冊</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { register } from '@/api/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function handleRegister() {
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
