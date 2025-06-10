<template>
  <div>
    <div
      class="home d-flex flex-column justify-content-center align-items-center text-center"
    >
      <div>
        <h2 class="mb-3 fs-lg-2 fs-1" style="font-weight: 800">
          Sportify yourself
        </h2>
        <p class="fs-lg-5 fs-7 mb-lg-9 mb-8">Anytime, Anywhere</p>
      </div>

      <div
        class="d-flex flex-lg-row flex-column gap-3 w-100 align-items-center"
      >
        <nav class="navbar w-100">
          <div class="container-fluid">
            <form
              class="d-flex flex-lg-row flex-column align-items-center mx-auto px-lg-0 px-2"
              style="max-width: 485px; width: 100%"
              role="search"
            >
              <div class="input-group w-100">
                <span class="input-group-text bg-grey-000">
                  <i class="bi bi-search text-primary border border-0"></i>
                </span>
                <input
                  class="form-control rounded-end border-start-0 ps-0 bg-grey-000 search-input"
                  type="search"
                  placeholder="探索 Sportify+"
                  aria-label="Search"
                />
              </div>
              <button
                class="btn btn-primary-600 rounded-3 mt-lg-0 mt-5 w-lg-50 w-auto ms-lg-5"
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
    <WaveBanner />
    <!-- 專屬教練CoachGrid -->
    <div class="coaches text-center mt-lg-12 text-white mt-10">
      <div class="container">
        <h2 class="mb-lg-0">你的專屬教練群</h2>
        <CoachGrid />
      </div>
    </div>

    <SubscriptionPlans />
    <WaveBannerReverse class="mt-3 mb-8" />
    <FAQ />
  </div>
</template>

<script setup>
import CategoryCarousel from '@/components/CategoryCarousel.vue'
import DetailCarousel from '@/components/DetailCarousel.vue'
import CoachGrid from '@/components/CoachGrid.vue'
import SubscriptionPlans from '@/components/SubscriptionPlans.vue'
import FAQ from '@/components/FAQ.vue'
import WaveBanner from '@/components/WaveBanner.vue'
import WaveBannerReverse from '@/components/WaveBannerReverse.vue'
</script>

<style scoped lang="scss">
@import '../assets/styles/all.scss';
.home {
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 你可以自訂背景色 */
  color: $primary-000; /* 你的主文字色 */
  background-blend-mode: darken;
  background-image: url('../assets/images/banner-l.png'); /* 替換為你的圖片路徑 */
  background-size: cover; /* 圖片覆蓋整個區域 */
  background-position: center; /* 圖片居中 */
  background-repeat: no-repeat; /* 不重複 */
}

.btn {
  min-width: 128px;
  height: 62px;
  @media (max-width: 992px) {
    height: 40px;
    width: 96px;
  }
}
.form-control::placeholder {
  color: $grey-500;
  opacity: 1;
}
.input-group {
  width: 333px;
  height: 62px;
  @media (max-width: 992px) {
    width: 327px;
    height: 40px;
  }
}
.search-input:focus {
  outline: none;
  box-shadow: none;
}
.input-group {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;

  &:focus-within {
    border: 2px solid #5b6ef5;
    box-shadow: 0 0 0 2px rgba(91, 110, 245, 0.2);
  }

  .input-group-text,
  .form-control {
    color: $grey-700;
    border: none;
    background-color: transparent;
    box-shadow: none;
  }

  .form-control:focus {
    outline: none;
  }
}
</style>
