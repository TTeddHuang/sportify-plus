<!-- 會跑出X軸要再調整 -->
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
          spaceBetween: 10
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
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
        <div class="card position-relative">
          <span
            class="badge bg-primary-100 fs-9 text-grey-700 position-absolute"
          >
            {{ course.course_type }}
          </span>
          <img
            :src="course.course_image_url"
            class="card-img-top"
            alt="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title fs-7-bold">{{ course.course_name }}</h5>
            <div class="d-flex">
              <p class="fs-7">{{ course.coach_name }}</p>
              <span class="fs-7 px-2">|</span>
              <p class="fs-7">{{ course.coach_title }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="d-flex align-items-center">
                <span class="material-symbols-outlined star"> star </span>
                <span>{{ course.course_score }}</span>
              </p>
              <p class="d-flex align-items-center">
                <span class="material-symbols-outlined"> person </span>
                <span>{{ course.student_amount }}</span
                >位學生
              </p>
              <p class="d-flex align-items-center">
                <span class="material-symbols-outlined"> schedule </span>
                <span>{{ course.total_hours }}</span
                >小時
              </p>
            </div>
            <p class="card-text">
              {{ course.course_description }}
            </p>
            <div class="card-link">
              <a href="#">查看更多</a>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="custom-pagination my-lg-8"></div>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import lineImg from '@/assets/images/line-16.png'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

const courses = ref([
  {
    course_id: '1',
    course_type: '籃球',
    course_image_url: 'xxx.png',
    course_name: '高效運球技巧',
    coach_name: 'Denny',
    coach_title: '前UBA球員',
    course_score: 4.9,
    student_amount: 320,
    total_hours: 3,
    course_description: '本課程教你從零開始學會控球技巧...'
  },
  {
    course_id: '1',
    course_type: '籃球',
    course_image_url: 'xxx.png',
    course_name: '高效運球技巧',
    coach_name: 'Denny',
    coach_title: '前UBA球員',
    course_score: 4.9,
    student_amount: 320,
    total_hours: 3,
    course_description: '本課程教你從零開始學會控球技巧...'
  },
  {
    course_id: '1',
    course_type: '籃球',
    course_image_url: 'xxx.png',
    course_name: '高效運球技巧',
    coach_name: 'Denny',
    coach_title: '前UBA球員',
    course_score: 4.9,
    student_amount: 320,
    total_hours: 3,
    course_description: '本課程教你從零開始學會控球技巧...'
  },
  {
    course_id: '1',
    course_type: '籃球',
    course_image_url: 'xxx.png',
    course_name: '高效運球技巧',
    coach_name: 'Denny',
    coach_title: '前UBA球員',
    course_score: 4.9,
    student_amount: 320,
    total_hours: 3,
    course_description: '本課程教你從零開始學會控球技巧...'
  },
  {
    course_id: '1',
    course_type: '籃球',
    course_image_url: 'xxx.png',
    course_name: '高效運球技巧',
    coach_name: 'Denny',
    coach_title: '前UBA球員',
    course_score: 4.9,
    student_amount: 320,
    total_hours: 3,
    course_description: '本課程教你從零開始學會控球技巧...'
  }
])

const coaches = ref([
  {
    name: 'Denny',
    tag: '籃球',
    image: new URL('@/assets/images/denny.png', import.meta.url).href,
    title: '前UBA一級球員',
    description:
      '大家好，我是 Denny，前UBA一級大專聯賽球員，現為專職籃球教練與戰術顧問。我的籃球旅程從國中校隊開始，打過無數場街頭鬥牛，也在正規比賽中累積了豐富的實戰經驗。退役後，我選擇把所學投入教學，希望能把「比...'
  },
  {
    name: 'Ted',
    tag: '登山',
    image: new URL('@/assets/images/ted.png', import.meta.url).href,
    title: '百岳登山家',
    description:
      '大家好，我是 Ted，會攻頂60座台灣百岳，擅長規劃長天數重裝行程，希望透過教學讓更多人安全親近山林。我同時也是一位合格的高山嚮導與登山安全講師，從郊山健行到百岳重裝，體驗過壯麗日出，也遇過風雪與迷途。...'
  },
  {
    name: 'Ivy',
    tag: '足球',
    image: new URL('@/assets/images/ivy.png', import.meta.url).href,
    title: 'AFC B級女教練',
    description:
      '大家好，我是 Ivy，目前是 AFC 亞洲足協 B 級認證的女足教練。從國中開始，我就是校隊的一員，深深愛上了足球這項充滿節奏與團隊精神的運動。一路走來，我參與了多場校際與地區性賽事，累積了豐富的場上經驗，也逐漸...'
  },
  {
    name: 'Ivy',
    tag: '足球',
    image: new URL('@/assets/images/ivy.png', import.meta.url).href,
    title: 'AFC B級女教練',
    description:
      '大家好，我是 Ivy，目前是 AFC 亞洲足協 B 級認證的女足教練。從國中開始，我就是校隊的一員，深深愛上了足球這項充滿節奏與團隊精神的運動。一路走來，我參與了多場校際與地區性賽事，累積了豐富的場上經驗，也逐漸...'
  },
  {
    name: 'Ivy',
    tag: '足球',
    image: new URL('@/assets/images/ivy.png', import.meta.url).href,
    title: 'AFC B級女教練',
    description:
      '大家好，我是 Ivy，目前是 AFC 亞洲足協 B 級認證的女足教練。從國中開始，我就是校隊的一員，深深愛上了足球這項充滿節奏與團隊精神的運動。一路走來，我參與了多場校際與地區性賽事，累積了豐富的場上經驗，也逐漸...'
  }
])
</script>

<style scoped lang="scss">
/* 波浪圖樣式 */

/* 卡片發光風格 */
.coach-card {
  height: 696px;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #eceffd;
  box-shadow:
    0 0 24px rgba(94, 142, 221, 1),
    0 0 5px rgba(94, 142, 221, 1);
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
  height: 29px;
  width: 48px;
  line-height: 1.5;
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
.coach-col {
  width: 100%; // 滿版佔據 swiper-slide 空間
  max-width: none; // 不限制最大寬度
}

.coach-img-wrapper {
  width: 100%;
  height: 330px;
  position: relative;
  overflow: visible;
}

.coach-img {
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
</style>
