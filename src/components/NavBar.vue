<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header
    class="header navbar navbar-expand-lg border-bottom border-primary-000"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo-s.png" alt="Logo" class="img-fluid" />
        </router-link>
      </div>

      <!-- 桌面版選單（LG以上顯示） -->
      <nav class="d-none d-lg-block">
        <ul class="navbar-nav d-flex flex-row mb-0">
          <li class="nav-item me-3">
            <router-link
              to="/courses"
              class="nav-link"
              :class="{ active: route.path.startsWith('/courses') }"
              >課程分類</router-link
            >
          </li>
          <li class="nav-item me-3">
            <router-link
              to="/coaches"
              class="nav-link"
              :class="{ active: route.path.startsWith('/coaches') }"
              >教練列表</router-link
            >
          </li>
          <li class="nav-item me-3">
            <router-link
              to="/create-course"
              class="nav-link"
              :class="{ active: route.path.startsWith('/create-course') }"
              >我要開課</router-link
            >
          </li>
          <li class="nav-item me-3">
            <router-link
              to="/learning-center"
              class="nav-link"
              :class="{ active: route.path.startsWith('/learning-center') }"
              >學習中心</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link"
              :class="{
                active: route.path === '/login' || route.path === '/register'
              }"
              >登入/註冊</router-link
            >
          </li>
        </ul>
      </nav>

      <!-- 漢堡按鈕（LG以下顯示） -->
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

    <!-- 手機版 offcanvas 選單 -->
    <div
      class="offcanvas offcanvas-end d-lg-none"
      tabindex="-1"
      id="offcanvasMenu"
      aria-labelledby="offcanvasMenuLabel"
    >
      <div class="offcanvas-header"></div>
      <div class="offcanvas-body">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/courses" class="nav-link">課程分類</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/coaches" class="nav-link">教練列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/create-course" class="nav-link"
              >我要開課</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/learning-center" class="nav-link"
              >學習中心</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">登入/註冊</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/styles/all.scss';

a,
a:visited,
a:hover,
a:active,
a:focus {
  color: inherit;
  text-decoration: none;
}

.header {
  padding: 16px 0;
}

.logo img {
  max-width: 117px;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.nav-link {
  color: $primary-000;
  margin-left: 8px;
  text-decoration: none;
}

.nav-link:hover {
  background-color: $primary-300;
  color: $primary-700;
  border-radius: 8px;
}
.nav-link:focus {
  color: $primary-000;
}
.router-link-active {
  background-color: $primary-700;
  color: $primary-000;
  border-radius: 8px;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23ECEFFD' viewBox='0 0 30 30'%3e%3cpath stroke='%23ECEFFD' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
.nav-link {
  color: $primary-000;
  &:hover {
    background-color: $primary-300;
    color: $primary-700;
    border-radius: 8px;
  }
}

.router-link-active {
  background-color: $primary-700;
  color: $primary-000;
  border-radius: 8px;
}


.offcanvas .nav-link {
  color: #0044cc;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.offcanvas {
  top: 72px !important; // 強制頂部留出空間
  height: calc(100% - 72px) !important;
  border-top: 1px solid #ccc;
  // 預設寬度
  max-width: 207px;

}

// 手機選單內部文字置中
.offcanvas-body {
  display: flex;
  flex-direction: column;
  align-items: center; // 水平置中
}

.offcanvas-body .nav-link {
  text-align: center; // 文字置中
  width: 100%; // 滿寬方便點擊
}
</style>
