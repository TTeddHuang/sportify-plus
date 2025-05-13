<template>
  <div>
    <div class="category-section-wrapper position-relative py-5">
      <div class="container text-center text-primary-000 py-lg-12 px-0">
        <h2 class="fw-bold mb-lg-12">豐富多元的運動課程，任你自由探索！</h2>

        <div class="swiper-wrapper-container position-relative mb-lg-12">
          <!-- <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div> -->
          <div
            class="swiper-button-prev swiper-button-prev-custom d-none d-md-flex"
          >
            <i class="bi bi-chevron-left"></i>
          </div>
          <div
            class="swiper-button-next swiper-button-next-custom d-none d-md-flex"
          >
            <i class="bi bi-chevron-right"></i>
          </div>
          <!-- <swiper
            :modules="[Navigation]"
            :slides-per-view="5"
            :space-between="44"
            navigation
            class="mySwiper"
          >
            <swiper-slide v-for="(cat, index) in categories" :key="index">
              <div class="category-card">
                <p class="category-title mt-lg-3 text-primary-000 fs-lg-4">
                  {{ cat.name }}
                </p>
                <div class="category-img-wrapper">
                  <img
                    v-if="cat.name === '皮拉提斯'"
                    :src="decoPilates"
                    class="decoration"
                    alt="裝飾方框"
                    :style="{ top: '60px', left: '-100px' }"
                  />
                  <img
                    v-if="cat.name === '滑板'"
                    :src="decoSkate"
                    class="decoration"
                    alt="裝飾方框"
                    :style="{ top: '-130px', right: '-61px' }"
                  />
                  <img :src="cat.image" class="category-img" alt="" />
                </div>
              </div>
            </swiper-slide>
          </swiper> -->
          <swiper
            v-bind="swiperOptions"
            class="mySwiper"
            :navigation="{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom'
            }"
          >
            <swiper-slide v-for="(cat, index) in categories" :key="index">
              <!-- 原本的 category-card 放這裡 -->
              <div class="category-card">
                <p class="category-title mt-lg-3 text-primary-000 fs-lg-4">
                  {{ cat.name }}
                </p>
                <div class="category-img-wrapper">
                  <img
                    v-if="cat.name === '皮拉提斯'"
                    :src="decoPilates"
                    class="decoration"
                    alt="裝飾方框"
                    :style="{ top: '60px', left: '-100px' }"
                  />
                  <img
                    v-if="cat.name === '滑板'"
                    :src="decoSkate"
                    class="decoration"
                    alt="裝飾方框"
                    :style="{ top: '-130px', right: '-61px' }"
                  />
                  <img :src="cat.image" class="category-img" alt="" />
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <p class="text-light mt-lg-8 fs-lg-4 mb-lg-12">
          Sportify+ 已經幫助超過
          <span class="text-primary-000 fs-lg-1 custom-text-highlight"
            >3,067</span
          >
          人，展開全新的運動旅程。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

import decoPilates from '@/assets/images/Frame-920.png'
import decoSkate from '@/assets/images/Frame-921.png'

const categories = ref([
  {
    name: '皮拉提斯',
    image: new URL('@/assets/images/yoga.png', import.meta.url).href
  },
  {
    name: '重訓',
    image: new URL('@/assets/images/weight-lifting.png', import.meta.url).href
  },
  {
    name: '登山',
    image: new URL('@/assets/images/hiking.png', import.meta.url).href
  },
  {
    name: '籃球',
    image: new URL('@/assets/images/basketball.png', import.meta.url).href
  },
  {
    name: '滑板',
    image: new URL('@/assets/images/skateboarding.png', import.meta.url).href
  }
])
const swiperOptions = {
  modules: [Navigation],
  slidesPerView: 5,
  spaceBetween: 44,
  breakpoints: {
    1200: { slidesPerView: 5 },
    992: { slidesPerView: 4 },
    768: { slidesPerView: 3 },
    576: { slidesPerView: 2 },
    0: { slidesPerView: 1 }
  },
  navigation: {
    nextEl: '.swiper-button-next-custom',
    prevEl: '.swiper-button-prev-custom'
  }
}
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
.custom-text-highlight {
  text-shadow:
    0 0 30px rgba(219, 164, 244, 1),
    0 0 16px rgba(219, 164, 244, 1);
}

.btn {
  min-width: 150px;
}
.mySwiper {
  overflow: visible !important;
}
.category-card {
  position: relative;
  border-radius: 16px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}
.category-img {
  position: relative;
  width: 224px;
  height: 224px;
  object-fit: cover;
  border-radius: 12px;
  z-index: 1;
}
.category-card:hover {
  transform: scale(1.05);
}
.category-title {
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
}
.text-highlight {
  color: #d36fff;
  font-size: 1.8rem;
  font-weight: bold;
}
.category-section-wrapper {
  overflow: visible;
  position: relative;
  // 讓箭頭/裝飾不被裁切

  .swiper-wrapper-container {
    position: relative;
    overflow: visible;

    // 顯示左右箭頭（swiper 內建類名）
    .swiper-button-prev,
    .swiper-button-next {
      top: 250px;
      transform: translateY(-80%);
      z-index: 20;
      width: 72px;
      height: 62px;
      font-size: 16px;
      border-radius: 8px;
      border: 2px solid #a8a8a8 !important;
    }
    // 左箭頭向左偏一點
    .swiper-button-prev {
      left: -48px;
    }
    // 右箭頭向右偏一點
    .swiper-button-next {
      right: -48px;
    }
  }
}
.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 24px;
  color: #d8defc;
}
.swiper-slide {
  overflow: visible;
}
.category-img-wrapper {
  position: relative;
  width: 224px;
  height: 224px;
  border-radius: 12px;

  // 這裡放陰影
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    box-shadow:
      0 0 30px rgba(219, 164, 244, 1),
      0 0 16px rgba(219, 164, 244, 1);
    z-index: -1;
  }
}
.decoration {
  position: absolute;
  width: 280px; /* 根據方框圖檔尺寸調整 */
  height: 280px;
  z-index: 0; /* 要蓋在陰影之下、圖之下，若陰影是 -1，再用 0 */
}
</style>
