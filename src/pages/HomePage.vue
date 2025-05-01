<template>
  <div
    class="home d-flex flex-column justify-content-center align-items-center text-center"
  >
    <div>
      <h2 class="mb-3 fs-2">Sporify yourself</h2>
      <p class="fs-5">Anytime, Anywhere</p>
    </div>

    <div class="d-flex gap-3">
      <nav class="navbar">
       <div class="container-fluid">
        <form class="d-flex" role="search">
        <div class="input-group">
          <span class="input-group-text bg-white ">
            <i class="bi bi-search text-primary border border-0"></i>
          </span>
          <input class="form-control me-2 rounded-end border-start-0 ps-0" type="search" placeholder="探索 Sportify+" aria-label="Search">
          <button class="btn btn-primary-600 rounded-3" type="submit">開始探索</button>
        </div>
        </form>
        </div>
      </nav>
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
