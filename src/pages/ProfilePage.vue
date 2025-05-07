<template>
  <div class="learning-center row container">
    <div class="side-nav col-3">
      <div class="px-3 py-5">
        <h3 class="fs-6 px-3 fw-bold">學習中心</h3>
        <hr class="divider my-5" />
        <ul class="list-group list-group-flush">
          <li class="list-group-item">我的課程</li>
          <li class="list-group-item">訂閱紀錄</li>
          <li class="list-group-item active">編輯個人資料</li>
        </ul>
      </div>
    </div>
    <div class="user-profile col-9">
      <h2 class="fs-4">個人資料</h2>
      <div class="profile-group row">
        <div class="col-6">
          <div
            class="profile-avatar ratio ratio-1x1 rounded-circle overflow-hidden mx-auto"
          >
            <img
              src="https://ankemedia.com/wp-content/uploads/2021/12/%E6%88%91%E6%98%AF%E9%81%BA%E7%85%A7%E6%94%9D%E5%BD%B1%E5%B8%AB1-1.jpg"
              alt="個人照片"
              class="object-fit-cover"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <label class="form-label">會員名</label>
            <input
              v-model="userName"
              type="text"
              class="form-control"
              disabled
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              v-model="userEmail"
              type="email"
              class="form-control"
              disabled
            />
          </div>
          <button class="btn btn-primary-600 d-block my-5 mx-auto">
            編輯個人資料
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const userName = ref('elsa')
const userEmail = ref('1234@g23.com')

onMounted(async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const userId = await verifyLogin(token)
  const userData = await getUserData(token, userId)
  userName.value = userData.name
  userEmail.value = userData.email
})

// 驗證登入
async function verifyLogin(token) {
  try {
    const {
      data: { id }
    } = await axios.get(
      'https://sportify-backend-i00k.onrender.com/api/v1/auth/me',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return id
  } catch (error) {
    console.error(error)
  }
}
// 取得使用者資料
async function getUserData(token, userId) {
  try {
    const {
      data: { data }
    } = await axios.get(
      `https://sportify-backend-i00k.onrender.com/api/v1/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return data
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1296px;
  margin: 0 auto;
}

.side-nav {
  border: 1px solid $primary-100;
  border-top: none;
}

.side-nav {
  padding: 0;
}

.divider {
  opacity: 1;
  border: 0;
  border-top: 1px solid $primary-000;
}

.list-group {
  .list-group-item {
    border: none;
    padding: 12px 16px;
    margin-bottom: 8px;
  }
  .active {
    border-radius: 4px;
    color: $primary-100;
  }
}

.user-profile {
  padding: 40px;
  .profile-group {
    margin-top: 40px;
  }
  .profile-avatar {
    width: 300px;
  }
}
// input的樣式，可以考慮放到全域
.form-control {
  background-color: $grey-000;
  border-color: $primary-700;
  color: $grey-700;
  &:disabled {
    background-color: $grey-200;
    border-color: $grey-300;
    color: $grey-500;
  }
}

.btn-primary {
  padding: 8px 16px;
}
</style>
