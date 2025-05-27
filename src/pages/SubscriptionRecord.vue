<template>
  <div class="container">
    <div class="d-flex">
      <!-- 左側選單 -->
      <div class="side-nav d-lg-block d-none">
        <div class="px-3 py-5">
          <h3 class="fs-6 px-3 fw-bold">學習中心</h3>
          <hr class="divider my-5" />
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item"
              :class="{ active: route.path === '/users/courses' }"
            >
              <router-link to="/users/courses" class="nav-link">
                我的課程
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/users/subscriptions' }"
            >
              <router-link to="/users/subscriptions" class="nav-link">
                訂閱紀錄
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/profile' }"
            >
              <router-link to="/profile" class="nav-link">
                編輯個人資料
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 外框顏色 -->
      <div class="p-lg-8 px-5 py-8 w-100" style="max-width: 1056px">
        <h2 class="fs-lg-4 mb-lg-8 mb-6">訂閱紀錄</h2>
        <p class="fs-6">目前方案</p>
        <div class="subscription-card">
          <div class="card-wrapper"></div>
          <div class="card-content">
            <h5>Wellness方案</h5>
            <p class="fs-6 fw-bold">下一次收費日期：2025/6/1</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="scss">
.side-nav {
  border-left: 1px solid $primary-100;
  border-right: 1px solid $primary-100;
  padding: 0;
  width: 240px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.container > .d-flex {
  align-items: stretch; // 這你已經有加了
  min-height: 100vh; // 關鍵：讓整個容器最小高度滿版
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

.page-link {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: $primary-000;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(48, 79, 254, 0.1);
  }
}
.page-item.active .page-link {
  background-color: $primary-700;
  color: $primary-100;
}

.page-item.disabled .page-link {
  opacity: 0.4;
  cursor: not-allowed;
}
.card-wrapper {
  background-color: $primary-600;
  border-radius: 15px 15px 0 0;
  height: 50px;
}
.card-content {
  border-radius: 15px;
  background-color: $primary-000;
  margin-top: -38px;
  padding: 24px;
  color: black;
}
</style>
