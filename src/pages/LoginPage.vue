<template>
  <div class="container mt-10">
    <div class="row">
      <div class="col-lg-6 mb-5">
        <div class="image-wrapper position-relative d-inline-block">
          <img src="@/assets/images/logo.png" alt="logo" class="img-fluid" />

          <!-- 模糊遮罩：右、上、下 -->
          <div class="blur-overlay right"></div>
          <div class="blur-overlay top"></div>
          <div class="blur-overlay bottom"></div>
        </div>
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
              *不是正確Email格式!
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
            class="btn btn-primary-600 btn-lg custom-btn mt-5"
            :disabled="emailError || passwordError"
            @click="handleLogin"
          >
            登入
          </button>
          <!-- Google 登入設定 (不可見) -->
          <div
            id="g_id_onload"
            data-client_id="642563130821-35m2kh3959gmdv4h60u12e88p4mkbsf3.apps.googleusercontent.com"
            data-callback="handleGoogleLogin"
          ></div>
          <!-- Google 登入按鈕 (可見) -->
          <div
            class="g_id_signin"
            data-type="standard"
            data-theme="outline"
            data-size="large"
            data-text="signin_with"
            data-shape="rectangular"
            data-logo_alignment="left"
            data-width="200"
          ></div>

          <div class="d-flex justify-content-between mt-5">
            <p class="mb-0">
              還沒有帳號?
              <router-link
                to="/users/signup"
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
import { ref, onMounted } from 'vue'
import { login, googleLogin, getUserProfile } from '@/api/auth'
import { useRouter } from 'vue-router'
import { setUser } from '@/store/user'

const router = useRouter()
const email = ref('')
const password = ref('')
const emailError = ref(false)
const passwordError = ref(false)
const isLoading = ref(false)

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = !emailPattern.test(email.value)
}

function validatePassword() {
  // 至少 1 小寫、1 大寫、1 數字、長度 8~16
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/
  passwordError.value = !passwordPattern.test(password.value)
}

// 一般登入處理

async function handleLogin() {
  validateEmail()
  validatePassword()
  if (emailError.value || passwordError.value) return

  isLoading.value = true

  try {
    // 1️⃣ 登入取得 token
    const res = await login({ email: email.value, password: password.value })
    localStorage.setItem('token', res.token)

    // 2️⃣ 立即取得使用者完整資料

    const me = await getUserProfile()

    //  儲存完整使用者資訊
    localStorage.setItem('user', JSON.stringify(me))

    // 3️⃣ 寫入 user 狀態
    setUser({
      token: res.token,
      displayName: me.displayName,
      profile_image_url: me.profile_image_url || '',
      role: me.role
    })

    router.push('/')
  } catch (error) {
    console.error(error)
    alert(error.response?.data?.message || '登入失敗')
  } finally {
    isLoading.value = false
  }
}
// Google 登入處理
async function handleGoogleLogin(response) {
  isLoading.value = true
  try {
    const res = await googleLogin({ tokenId: response.credential })
    console.log('Google 登入成功:', res)
    localStorage.setItem('token', res.token)
    const me = await getUserProfile()
    localStorage.setItem('user', JSON.stringify(me))
    setUser({
      token: res.token,
      displayName: me.displayName,
      profile_image_url: me.profile_image_url || '',
      role: me.role
    })
    router.push('/')
  } catch (error) {
    console.error('Google 登入失敗:', error.response?.data || error.message)
  } finally {
    isLoading.value = false
  }
}
window.handleGoogleLogin = handleGoogleLogin
// 載入 Google Script
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})
</script>
<style scoped lang="scss">
.custom-btn {
  display: block;
  margin: 0 auto;
  width: 200px;
  max-width: 100%;
}
.g_id_signin {
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  width: 200px;
}
.blur-overlay {
  position: absolute;
  pointer-events: none;
  z-index: 2;

  &.right {
    top: 0;
    right: -19px;
    width: 80px;
    height: 216px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #000918);
  }

  &.top {
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to bottom, #000918, rgba(0, 0, 0, 0));
  }

  &.bottom {
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to top, #000918, rgba(0, 0, 0, 0));
  }
  @media (max-width: 991.98px) {
    &.right {
      right: -12px;
      width: 40px;
    }
    &.top {
      top: -3px;
      height: 30px;
    }
    &.bottom {
      bottom: -2px;
      height: 30px;
    }
  }
}
</style>
