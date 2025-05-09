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
              <div class="input-group w-100">
                <span class="input-group-text bg-grey-000">
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
    <CategoryCarousel
      :categories="categories"
      :slides-per-view="5"
      :space-between="44"
    />
    <DetailCarousel />
    <CoachGrid />
    <SubscriptionPlans />
    <FAQ />
  </div>
</template>

<script setup>
import CategoryCarousel from '@/components/CategoryCarousel.vue'
import DetailCarousel from '@/components/DetailCarousel.vue'
import CoachGrid from '@/components/CoachGrid.vue'
import SubscriptionPlans from '@/components/SubscriptionPlans.vue'
import FAQ from '@/components/FAQ.vue'
</script>

<style lang="scss">
@import '../assets/styles/all.scss';
.home {
  min-height: 80vh;
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
