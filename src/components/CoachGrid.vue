<!-- 會跑出X軸要再調整 -->
<template>
  <div class="position-relative swiper-wrapper-with-nav mt-3">
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
          spaceBetween: 0
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 36
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }"
      :modules="[Navigation, Pagination]"
      class="mySwiper"
    >
      <swiper-slide v-for="coach in coaches" :key="coach.id">
        <div class="coach-col">
          <div
            class="card coach-card position-relative mt-lg-12 mt-8"
            style="background-color: rgba(255, 255, 255, 0.1)"
          >
            <!-- 圖片區 -->
            <div class="coach-img-wrapper position-relative">
              <img
                :src="coach.image"
                :alt="coach.name"
                class="coach-img rounded"
              />
              <img :src="lineImg" alt="" class="plus-icon top start" />
              <img :src="lineImg" alt="" class="plus-icon bottom end" />
            </div>

            <!-- 文字區 -->
            <div class="card-body mt-5 rounded text-start p-0">
              <div class="d-flex align-items-center mb-2">
                <h5 class="card-title fw-bold fs-lg-4">{{ coach.name }}</h5>
                <span class="badge ms-2">{{ coach.tag }}</span>
              </div>
              <p class="fs-lg-6 fw-bold mb-2">{{ coach.title }}</p>
              <p class="card-text mb-2">{{ coach.description }}</p>
              <router-link
                :to="{
                  name: 'CoachDetails',
                  params: { coachId: coach.id }
                }"
                class="text-decoration-none text-grey-000 text-center d-block px-2 py-1"
              >
                查看更多
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="custom-pagination my-lg-12 mt-8 mb-12"></div>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import lineImg from '@/assets/images/line-16.png'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

const coaches = ref([])
const defaultImg = new URL('@/assets/images/denny.png', import.meta.url).href

async function fetchCoaches() {
  try {
    const { data } = await axios.get(
      'https://sportify.zeabur.app/api/v1/courses/coaches',
      {
        params: { page: 1 } // 依需要調整
      }
    )

    coaches.value = data.data.map(item => ({
      id: item.coach_id,
      name: item.coach_name,
      title: item.coach_title,
      description: item.coach_about_me,
      tag: item.coach_skills?.[0]?.skill_name ?? '其他',
      image: item.coach_profile_image_url ?? defaultImg // 後端若還沒給圖就放預設
    }))
  } catch (err) {
    console.error('教練列表載入失敗：', err)
  }
}

onMounted(fetchCoaches)

// const coaches = ref([
//   {
//     name: 'Denny',
//     tag: '籃球',
//     image: new URL('@/assets/images/denny.png', import.meta.url).href,
//     title: '前UBA一級球員',
//     description:
//       '大家好，我是 Denny，前UBA一級大專聯賽球員，現為專職籃球教練與戰術顧問。我的籃球旅程從國中校隊開始，打過無數場街頭鬥牛，也在正規比賽中累積了豐富的實戰經驗。退役後，我選擇把所學投入教學，希望能把「比...'
//   },
//   {
//     name: 'Ted',
//     tag: '登山',
//     image: new URL('@/assets/images/ted.png', import.meta.url).href,
//     title: '百岳登山家',
//     description:
//       '大家好，我是 Ted，會攻頂60座台灣百岳，擅長規劃長天數重裝行程，希望透過教學讓更多人安全親近山林。我同時也是一位合格的高山嚮導與登山安全講師，從郊山健行到百岳重裝，體驗過壯麗日出，也遇過風雪與迷途。...'
//   },
//   {
//     name: 'Ivy',
//     tag: '足球',
//     image: new URL('@/assets/images/ivy.png', import.meta.url).href,
//     title: 'AFC B級女教練',
//     description:
//       '大家好，我是 Ivy，目前是 AFC 亞洲足協 B 級認證的女足教練。從國中開始，我就是校隊的一員，深深愛上了足球這項充滿節奏與團隊精神的運動。一路走來，我參與了多場校際與地區性賽事，累積了豐富的場上經驗，也逐漸...'
//   },
//   {
//     name: 'Ivy',
//     tag: '足球',
//     image: new URL('@/assets/images/ivy.png', import.meta.url).href,
//     title: 'AFC B級女教練',
//     description:
//       '大家好，我是 Ivy，目前是 AFC 亞洲足協 B 級認證的女足教練。從國中開始，我就是校隊的一員，深深愛上了足球這項充滿節奏與團隊精神的運動。一路走來，我參與了多場校際與地區性賽事，累積了豐富的場上經驗，也逐漸...'
//   },
//   {
//     name: 'Ivy',
//     tag: '足球',
//     image: new URL('@/assets/images/ivy.png', import.meta.url).href,
//     title: 'AFC B級女教練',
//     description:
//       '大家好，我是 Ivy，目前是 AFC 亞洲足協 B 級認證的女足教練。從國中開始，我就是校隊的一員，深深愛上了足球這項充滿節奏與團隊精神的運動。一路走來，我參與了多場校際與地區性賽事，累積了豐富的場上經驗，也逐漸...'
//   }
// ])
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
  @media (max-width: 992px) {
    padding: 24px;
    width: 264px;
    height: 654px;
  }
}
.card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  overflow: hidden;
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
  padding: 0 12px; //  padding 交由箭頭來控制位置
  position: relative; // 為絕對定位的箭頭提供定位基準
  overflow: hidden;
  @media (min-width: 768px) {
    padding: 0 24px;
  }
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
  @media (max-width: 992px) {
    object-position: center top;
  }
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
  overflow: visible; // 防止箭頭超出畫面導致 X 軸
}
</style>
