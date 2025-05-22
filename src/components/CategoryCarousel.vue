<template>
  <div class="category-swiper-wrapper position-relative py-5">
    <div class="swiper-button-prev swiper-button-prev-custom d-none d-md-flex">
      <i class="bi bi-chevron-left"></i>
    </div>
    <div class="swiper-button-next swiper-button-next-custom d-none d-md-flex">
      <i class="bi bi-chevron-right"></i>
    </div>

    <div class="container text-center text-primary-000 py-lg-12 px-0">
      <h2 class="fw-bold mb-lg-12">豐富多元的運動課程，任你自由探索！</h2>

      <swiper
        :modules="[Navigation, Pagination]"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom'
        }"
        :breakpoints="{
          0: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
          1440: { slidesPerView: 5, spaceBetween: 20 }
        }"
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
        <div class="custom-pagination my-lg-8"></div>
      </swiper>

      <p class="text-light mt-lg-8 fs-lg-4 mb-lg-12">
        Sportify+ 已經幫助超過
        <span class="text-primary-000 fs-lg-1 custom-text-highlight"
          >3,067</span
        >
        人，展開全新的運動旅程。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

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
</script>

<style scoped lang="scss">
@import '../assets/styles/all.scss';

.category-swiper-wrapper {
  position: relative;
  overflow-x: hidden;

  .swiper-button-prev,
  .swiper-button-next {
    transform: translateY(-80%);
    z-index: 20;
    width: 48px;
    height: 48px;
    font-size: 16px;
    color: $primary-100;
    border-radius: 8px;
    border: 2px solid #a8a8a8;
    top: 50%;
  }
  .swiper-button-prev {
    left: 0;
  }
  .swiper-button-next {
    right: 0;
  }
}
.mySwiper {
  overflow: visible;
  padding: 24px 0;
}
.category-card {
  position: relative;
  border-radius: 16px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
}
.category-title {
  font-weight: bold;
  font-size: 1.1rem;
  color: $primary-000;
}
.category-img-wrapper {
  position: relative;
  width: 224px;
  height: 224px;
  border-radius: 12px;
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
.category-img {
  position: relative;
  width: 224px;
  height: 224px;
  object-fit: cover;
  border-radius: 12px;
  z-index: 1;
}
.decoration {
  position: absolute;
  width: 280px;
  height: 280px;
  z-index: 0;
}
.custom-text-highlight {
  text-shadow:
    0 0 30px rgba(219, 164, 244, 1),
    0 0 16px rgba(219, 164, 244, 1);
}
::v-deep(.custom-pagination) {
  display: flex;
  justify-content: center;
  gap: 24px;
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: #d2d2d2;
    opacity: 1;
    border-radius: 50%;
    transition: background-color 0.3s;
  }
  .swiper-pagination-bullet-active {
    background: #e7ff37;
  }
}
.swiper-button-prev::after,
.swiper-button-next::after {
  display: none; // ⛔️ 隱藏原生箭頭
}
</style>
