<!-- 會跑出X軸要再調整 -->
<template>
  <div>

    <div class="wave-wrapper">

    </div>

    <section class="coaches text-center my-lg-12 text-white">
      <div class="container">
        <h2 class="mb-lg-12">你的專屬教練群</h2>

        <!-- 使用 Flex 排版，自訂固定寬度 -->
        <div class="d-flex flex-wrap justify-content-center gap-4">
          <div v-for="coach in coaches" :key="coach.name" class="coach-col">
            <div class="card coach-card position-relative">
              <!-- 圖片區 (固定寬高) -->
              <div class="coach-img-wrapper position-relative">
                <img
                  :src="coach.image"
                  :alt="coach.name"
                  class="coach-img rounded"
                />
                <!-- 四角＋號 -->
                <img :src="lineImg" alt="" class="plus-icon top start" />
                <img :src="lineImg" alt="" class="plus-icon bottom end" />
              </div>

              <!-- 文字區 -->
              <div
                class="card-body bg-dark bg-opacity-75 mt-3 rounded text-start"
              >
                <h5 class="card-title mb-1">
                  {{ coach.name }}
                  <span class="badge bg-light text-dark ms-2">{{
                    coach.tag
                  }}</span>
                </h5>
                <p class="card-text text-light">
                  {{ coach.description }}
                </p>
                <a
                  href="#"
                  class="stretched-link text-decoration-none text-white"
                >
                  查看更多
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import lineImg from '@/assets/images/line-16.png'

const coaches = ref([
  {
    name: 'Denny',
    tag: '籃球',
    image: new URL('@/assets/images/denny.png', import.meta.url).href,
    description:
      '大家好，我是 Denny，前UBA一級大專聯賽球員，現為專職籃球教練與戰術顧問。我的籃球旅程從國中校隊開始，打過無數場街頭鬥牛，也在正規比賽中累積了豐富的實戰經驗。退役後，我選擇把所學投入教學，希望能把「比賽...'
  },
  {
    name: 'Ted',
    tag: '登山',
    image: new URL('@/assets/images/ted.png', import.meta.url).href,
    description:
      '大家好，我是 Ted，會攻頂60座台灣百岳，擅長規劃長天數重裝行程，希望透過教學讓更多人安全親近山林。我同時也是一位合格的高山嚮導與登山安全講師，從郊山健行到百岳重裝，體驗過壯麗日出，也遇過風雪與迷途。...'
  },
  {
    name: 'Ivy',
    tag: '足球',
    image: new URL('@/assets/images/ivy.png', import.meta.url).href,
    description:
      '大家好，我是 Ivy，目前是 AFC 亞洲足協 B 級認證的女足教練。從國中開始，我就是校隊的一員，深深愛上了足球這項充滿節奏與團隊精神的運動。一路走來，我參與了多場校際與地區性賽事，累積了豐富的場上經驗，也逐漸...'
  }
])
</script>

<style scoped lang="scss">
/* 波浪圖樣式 */
.wave-wrapper {
  width: 100%;
  max-width: 1920px;
  height: 172px;
  background-image: url('../assets/images/Frame-923.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.coach-col {
  flex: 0 0 325.33px;
}
.coach-img-wrapper {
  width: 325.33px;
  height: 330px;
  position: relative;
  overflow: visible; /* 允許裝飾線超出 */
}
.coach-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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
</style>
