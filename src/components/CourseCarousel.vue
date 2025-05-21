<template>
  <div class="position-relative swiper-wrapper-with-nav">
    <swiper
      slides-per-view="3"
      space-between="40"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }"
      :pagination="{ el: '.custom-pagination', clickable: true }"
      :breakpoints="{
        0: {
          slidesPerView: 1,
          spaceBetween: 32
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 35
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }"
      :modules="[Navigation, Pagination]"
      class="mySwiper"
    >
      <swiper-slide v-for="course in courses" :key="course.course_id">
        <div class="course-col">
          <div class="card course-card position-relative">
            <span class="badge fs-9 text-grey-700 position-absolute">
              {{ course.category }}
            </span>
            <div class="course-img-wrapper position-relative mb-5">
              <img
                :src="course.imgUrl"
                :alt="card - img - top"
                class="course-img rounded"
              />
            </div>
            <div class="card-body p-0">
              <h5 class="card-title fs-7 fw-bold mb-2">
                {{ course.title }}
              </h5>
              <div class="d-flex mb-2">
                <p class="fs-7 mb-0">{{ course.instructor.name }}</p>
                <span class="fs-7 px-2 mb-0">|</span>
                <p class="fs-7 mb-0">{{ course.instructor.title }}</p>
              </div>
              <div class="d-flex justify-content-between mb-lg-3 mb-2">
                <div class="icon-custom">
                  <i class="bi bi-star-fill text-secondary-600 me-1 fs-6"></i>
                  <p class="fs-8">{{ course.rating }}</p>
                </div>
                <div class="icon-custom">
                  <i class="bi bi-person me-1 text-secondary-600 fs-6"></i>
                  <p class="fs-8">{{ course.students }} 位學生</p>
                </div>
                <div class="icon-custom">
                  <i class="bi bi-clock me-1 text-secondary-600 fs-6"></i>
                  <p class="fs-8">{{ course.duration }} 小時</p>
                </div>
              </div>
              <p class="card-text mb-2">
                {{ course.description }}
              </p>
              <div class="card-link text-center py-1">
                <a href="#" class="text-grey-000">查看更多</a>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="custom-pagination my-8"></div>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import badmintonImg from '@/assets/images/badminton-command.png'
import weightImg from '@/assets/images/weight-command.png'
import yogaImg from '@/assets/images/yoga-command.png'

let swiperInstance = null

onMounted(() => {
  // Swiper DOM 完成後再抓到實例
  swiperInstance = document.querySelector('.mySwiper')?.swiper

  const handleResize = () => {
    swiperInstance?.update()
  }

  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
})

const courses = ref([
  {
    id: '1',
    title: '羽球基礎技術與移動訓練班',
    category: '羽球',
    rating: 4.3,
    students: 1988,
    duration: 42,
    instructor: {
      name: 'Daniel',
      title: 'BWF Level 1 世界羽聯認證教練'
    },
    imgUrl: badmintonImg,
    description:
      '穩扎穩打，從正確的動作與移動開始！本課程專注於基礎擊球技巧、步伐協調與場上位置感培養，幫助你打下穩固的羽球基礎。適合剛接觸羽球的初學者，或希望修正姿勢、提升比賽敏捷度的進階新手。'
  },
  {
    id: '2',
    title: '科學化重訓入門實戰',
    category: '重訓',
    rating: 4.3,
    students: 1988,
    duration: 42,
    instructor: {
      name: 'Ethan',
      title: 'NSCA 國家體能協會認證專家'
    },
    imgUrl: weightImg,
    description:
      '告別盲目訓練，從理解身體開始科學變強！本課程以正確動作模式為核心，結合科學化負重進程與肌力養成理論，讓你打好深蹲、硬舉、推舉等基礎動作，建立安全、有效的訓練習慣。 適合重訓新手或希望矯正動作、建立科學觀念的運動愛好者。'
  },
  {
    id: '3',
    title: '身心平衡晨間瑜伽課程',
    category: '有氧',
    rating: 4.8,
    students: 1988,
    duration: 1,
    instructor: {
      name: 'Kelly',
      title: 'RYT 500 國際瑜伽聯盟認證教師'
    },
    imgUrl: yogaImg,
    description:
      '開啟一天的最好方式，從一場深層連結身心的晨間瑜伽開始。透過溫和伸展與專注呼吸，喚醒沉睡的能量，釋放內在壓力，讓身心在晨光中達到最理想的平衡狀態。 無論是瑜伽初學者還是有經驗的練習者，都能在這堂課中找回自己的節奏與寧靜。我相信，每個球員都有屬於自己的風格與潛力，而我的使命，就是幫助他們在球場上找到定位，打出自信，打出影響力。'
  },
  {
    id: '3',
    title: '身心平衡晨間瑜伽課程',
    category: '有氧',
    rating: 4.8,
    students: 320,
    duration: 125,
    instructor: {
      name: 'Kelly',
      title: 'RYT 500 國際瑜伽聯盟認證教師'
    },
    imgUrl: yogaImg,
    description: '適合初學者的有氧課程，幫助你燃燒脂肪、強化心肺。'
  },
  {
    id: '3',
    title: '身心平衡晨間瑜伽課程',
    category: '有氧',
    rating: 4.8,
    students: 320,
    duration: 125,
    instructor: {
      name: 'Kelly',
      title: 'RYT 500 國際瑜伽聯盟認證教師'
    },
    imgUrl: yogaImg,
    description: '適合初學者的有氧課程，幫助你燃燒脂肪、強化心肺。'
  },
  {
    id: '3',
    title: '身心平衡晨間瑜伽課程',
    category: '有氧',
    rating: 4.8,
    students: 320,
    duration: 125,
    instructor: {
      name: 'Kelly',
      title: 'RYT 500 國際瑜伽聯盟認證教師'
    },
    imgUrl: yogaImg,
    description: '適合初學者的有氧課程，幫助你燃燒脂肪、強化心肺。'
  },
  {
    id: '3',
    title: '身心平衡晨間瑜伽課程',
    category: '有氧',
    rating: 4.8,
    students: 320,
    duration: 125,
    instructor: {
      name: 'Kelly',
      title: 'RYT 500 國際瑜伽聯盟認證教師'
    },
    imgUrl: yogaImg,
    description: '適合初學者的有氧課程，幫助你燃燒脂肪、強化心肺。'
  }
])
</script>

<style scoped lang="scss">
/* 波浪圖樣式 */

/* 卡片發光風格 */
.course-card {
  min-height: 550px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #eceffd;
  box-shadow: 0 0 5px rgba(94, 142, 221, 1);
  background-color: rgba(255, 255, 255, 0.1);
}
.plus-icon {
  position: absolute;
  font-size: 1.6rem;
  color: #0d6efd;
  text-shadow:
    0 0 28px #005ca4,
    0 0 10.8px #005ca4;
}
.plus-icon.top.start {
  top: -45px;
  left: -25px;
}
.plus-icon.bottom.end {
  bottom: -45px;
  right: -25px;
}
.badge {
  border: 1px solid $primary-400;
  background-color: $primary-100;
  color: $grey-700;
  border-radius: 100px;
  line-height: 1.5;
  z-index: 1;
  padding: 4px 8px;
  top: 36px;
  left: 36px;
}

//swiper樣式

.mySwiper {
  padding: 0; // 🔥 padding 交由箭頭來控制位置
  position: relative; // 為絕對定位的箭頭提供定位基準
  padding: 24px;
  margin-left: -20px;
  margin-right: -20px;
  overflow: hidden;
}

.swiper-slide {
  display: flex; // 可選，保持 coach-col 卡片撐滿
  justify-content: center;
  overflow: visible;
}
.course-col {
  width: 100%; // 滿版佔據 swiper-slide 空間
  max-width: none; // 不限制最大寬度
}

.course-img-wrapper {
  width: 100%;
  height: 240px;
  position: relative;
  overflow: visible;
}

.course-img {
  width: 100%;
  height: 330px;
  max-height: 100%;
  object-fit: cover;
}

/* 箭頭按鈕細框 + 高層級，不再被裁切 */

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
::v-deep(.swiper-button-prev),
::v-deep(.swiper-button-next) {
  position: absolute;
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
::v-deep(.swiper-button-prev) {
  left: 0;
}
::v-deep(.swiper-button-next) {
  right: 0;
}
.swiper-button-prev::after,
.swiper-button-next::after {
  display: none; // 隱藏原生箭頭
}
.swiper-wrapper-with-nav {
  position: relative;
  // overflow-x: hidden; //  防止箭頭超出畫面導致 X 軸
}
.icon-custom {
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0;
    font-size: 24px;
    // 手機版 (小於 576px) 改為 16px
    @media (max-width: 575.98px) {
      font-size: 16px;
    }
  }
}
.card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 72px;
}
</style>
