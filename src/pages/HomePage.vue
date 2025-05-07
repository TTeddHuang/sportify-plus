<template>
  <div>
    <div
      class="home d-flex flex-column justify-content-center align-items-center text-center"
    >
      <div>
        <h2 class="mb-3 fs-lg-2 fs-3">Sportify yourself</h2>
        <p class="fs-lg-5 fs-7">Anytime, Anywhere</p>
      </div>

      <div
        class="d-flex flex-lg-row flex-column gap-3 w-100 align-items-center"
      >
        <nav class="navbar w-100">
          <div class="container-fluid">
            <form
              class="d-flex flex-lg-row flex-column align-items-center mx-auto"
              style="max-width: 485px; width: 100%"
              role="search"
            >
              <div class="input-group w-100 ">
                <span class="input-group-text  bg-grey-000">
                  <i class="bi bi-search text-primary border border-0"></i>
                </span>
                <input
                  class="form-control rounded-end border-start-0 ps-0 bg-grey-000"
                  type="search"
                  placeholder="探索 Sportify+"
                  aria-label="Search"
                />
              </div>
              <button
                class="btn btn-primary-600 rounded-3 mt-lg-0 mt-3 w-lg-50 w-auto ms-5"
                style="max-width: 128px; width: 100%"
                type="submit"
              >
                開始探索
              </button>
            </form>
          </div>
        </nav>
      </div>
    </div>
    <div class="container text-center text-primary-000 py-10 fw-bold">
      <h2 class="mb-4 text-2xl font-bold">
        豐富多元的運動課程，任你自由探索！
      </h2>
      <div class="flex items-center justify-center gap-4 overflow-x-auto px-4">

        <div
          v-for="item in courseList"
          :key="item.name"
          class="flex flex-col items-center p-4 rounded-lg transition hover:scale-105 border border-purple-500"
          style="max-width: 224px;"
        >
        <div class="mt-2 text-lg">{{ item.name }}</div>
          <img
            :src="item.image"
            :alt="item.name"
            class="rounded"
                        style="max-width: 224px;"
          />

        </div>
      </div>
      <p class="mt-6 text-lg">
        Sportify+ 已經幫助超過
        <span class="text-pink-400 text-2xl font-bold">3,067</span>
        人，展開全新的運動旅程。
      </p>
    </div>
  </div>
</template>

<script setup>
const courseList = [
  { name: '皮拉提斯', image: new URL('@/assets/images/yoga.png', import.meta.url).href },
  { name: '重訓', image: '/images/weight.jpg' },
  { name: '登山', image: '/images/mountain.jpg' },
  { name: '籃球', image: '/images/basketball.jpg' },
  { name: '滑板', image: '/images/skateboard.jpg' }
]
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
