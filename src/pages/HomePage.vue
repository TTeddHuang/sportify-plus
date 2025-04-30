<template>
  <div
    class="home d-flex flex-column justify-content-center align-items-center text-center"
  >
    <h1 class="mb-4">歡迎來到我們的運動平台！</h1>
    <p class="mb-5">快來加入我們，開始你的學習之旅吧！</p>

    <div class="d-flex gap-3">
      <router-link to="/login" class="btn btn-primary-200 btn-lg">
        立即登入
      </router-link>
      <router-link to="/register" class="btn btn-secondary-200 btn-lg">
        註冊帳號
      </router-link>
    </div>
  </div>
</template>

<script setup>
// 不需要 script
</script>

<style scoped lang="scss">
@import '../assets/styles/all.scss';
.home {
  min-height: 80vh;
  padding: 40px;
  background-color: $primary-900; /* 你可以自訂背景色 */
  color: $primary-000; /* 你的主文字色 */

  background-image: url('../assets/images/banner-l.png'); /* 替換為你的圖片路徑 */
  background-size: cover; /* 圖片覆蓋整個區域 */
  background-position: center; /* 圖片居中 */
  background-repeat: no-repeat; /* 不重複 */
}

.btn {
  min-width: 150px;
}
</style>
