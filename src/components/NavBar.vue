<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { user, initUser, clearUser } from '@/store/user'

const route = useRoute()
const router = useRouter()

const isLogin = computed(() => !!user.value)
const userName = computed(() => user.value?.name || '使用者')
const avatar = computed(
  () => user.value?.avatar || 'https://via.placeholder.com/40'
)

onMounted(() => {
  initUser()
})

function handleLogout() {
  clearUser()
  router.push('/')
}
</script>

<template>
  <header
    class="header navbar navbar-expand-lg border-bottom border-primary-000"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo-s.png" alt="Logo" class="img-fluid" />
        </router-link>
      </div>

      <nav class="d-none d-lg-block">
        <ul class="navbar-nav d-flex flex-row mb-0">
          <li class="nav-item me-3">
            <router-link
              to="/courses"
              class="nav-link text-primary-000"
              :class="{ active: route.path.startsWith('/courses') }"
              >課程分類</router-link
            >
          </li>
          <li class="nav-item me-3">
            <router-link
              to="/coaches"
              class="nav-link text-primary-000"
              :class="{ active: route.path.startsWith('/coaches') }"
              >教練列表</router-link
            >
          </li>
          <li class="nav-item me-3">
            <router-link
              to="/create-course"
              class="nav-link text-primary-000"
              :class="{ active: route.path.startsWith('/create-course') }"
              >我要開課</router-link
            >
          </li>
          <li class="nav-item me-3">
            <router-link
              to="/learning-center"
              class="nav-link text-primary-000"
              :class="{ active: route.path.startsWith('/learning-center') }"
              >學習中心</router-link
            >
          </li>

          <li v-if="isLogin" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center text-primary-000"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="avatar"
                alt="avatar"
                class="rounded-circle me-2"
                width="36"
                height="36"
              />
              {{ userName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link to="/profile" class="dropdown-item"
                  >個人資料</router-link
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="handleLogout"
                  >登出</a
                >
              </li>
            </ul>
          </li>

          <li v-else class="nav-item">
            <router-link to="/login" class="nav-link text-primary-000"
              >登入/註冊</router-link
            >
          </li>
        </ul>
      </nav>

      <button
        class="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasMenu"
        aria-controls="offcanvasMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

    <div
      id="offcanvasMenu"
      class="offcanvas offcanvas-end d-lg-none"
      tabindex="-1"
      aria-labelledby="offcanvasMenuLabel"
    >
      <div class="offcanvas-header"></div>
      <div class="offcanvas-body">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/courses" class="nav-link text-primary-000"
              >課程分類</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/coaches" class="nav-link text-primary-000"
              >教練列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/create-course" class="nav-link text-primary-000"
              >我要開課</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/learning-center" class="nav-link text-primary-000"
              >學習中心</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link text-primary-000"
              >登入/註冊</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/styles/all.scss';

.offcanvas {
  background-color: #ffffff !important; // 白色背景
  top: 56px !important; // 向下移動，避免遮住 navbar（根據實際 navbar 高度調整）
  height: calc(100% - 56px) !important;
  border-top: 1px solid #ccc;
  box-shadow: 0 4px 12 px rgba(0, 0, 0, 0.1);
}
.offcanvas .nav-link {
  color: $primary-600 !important;
  text-align: center;
}
</style>
