<template>
  <section class="faq-section position-relative py-lg-12 text-white">
    <div class="container d-flex">
      <!-- 標題與裝飾 -->
      <div
        class="faq-header position-relative d-flex align-items-start justify-content-center mb-4"
      >
        <h2 class="me-3 fs-lg-2 fw-bold">如何開始教學</h2>
        <!-- 左下與右上角裝飾 -->
        <img :src="lineImg" alt="decor" class="corner-decor top-end" />
        <img :src="lineImg" alt="decor" class="corner-decor bottom-start" />
      </div>

      <!-- Accordion，置中顯示 -->
      <div
        id="faqAccordion"
        class="accordion w-100"
        style="max-width: 848px; margin-left: 120px"
      >
        <div
          v-for="(item, idx) in faqList"
          :key="idx"
          class="accordion-item bg-transparent border-0 mb-lg-9"
        >
          <h2 :id="`heading${idx}`" class="accordion-header">
            <button
              class="accordion-button collapsed bg-transparent text-white fs-lg-5"
              type="button"
              @click="toggle(idx)"
            >
              {{ item.question }}
              <i
                class="bi ms-auto"
                :class="openIndexes[idx] ? 'bi-chevron-up' : 'bi-chevron-down'"
              ></i>
            </button>
          </h2>
          <div
            :id="`collapse${idx}`"
            class="accordion-collapse collapse"
            :class="{ show: openIndexes[idx] }"
            :aria-labelledby="`heading${idx}`"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body fs-lg-6 text-primary-000 mb-lg-9 d-flex">
              <img
                v-if="item.image"
                :src="item.image"
                alt="faq image"
                class="faq-image me-lg-8"
              />
              <p class="mb-0">{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 回頂部按鈕 (右下角) -->
      <button
        class="btn btn-outline-light fs-lg-6 btn-top"
        @click="scrollToTop"
      >
        Top
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import lineImg from '@/assets/images/line-16.png'

// FAQ 問答內容
const faqList = [
  {
    question: 'Step 1 : 完成教練身分認證',
    answer:
      '註冊完成後，您需要進行教練身分驗證。請上傳身分證明文件，並填寫專業背景與經歷。放心，Sportify+ 平台不會公開您的個人資訊、聯絡方式或住址位置。 這很簡單，只需 3 個步驟，約 30 分鐘即可完成表單填寫。 資料送出後，我們將在 1～2 個工作天內完成認證並回覆您。我們提供認證指引與範例，協助您快速準備資料，確保申請流程順利完成，讓你能更快投入教學！',
    image: new URL('@/assets/images/passport.png', import.meta.url).href
  },
  {
    question: 'Step 2 : 規劃你的課表',
    answer:
      '決定你的教學主題、授課形式與內容大綱，設定課程長度、單元數與上課頻率。從基礎介紹到進階技巧，清楚劃分課程節奏，讓學員可以循序漸進地學習，提升整體學習體驗。透過系統化安排後台課表，讓每個學生都能一目了然自己的進度，輕鬆跟上訓練計畫。',
    image: new URL('@/assets/images/project.png', import.meta.url).href
  },
  {
    question: 'Step 3 : 拍攝影片並上傳',
    answer:
      '拿起攝影器材，挑選你最喜歡、最能展現教學風格的地點拍攝吧！不需要昂貴的設備或專業攝影棚，只要保持畫面清晰、收音穩定，就能展現最自然專業的一面。我們提供完整拍攝與剪輯指南，協助你規劃鏡位、語速與內容結構，讓你的教學影片更有質感又親切。',
    image: new URL('@/assets/images/take-video.png', import.meta.url).href
  },
  {
    question: 'Step 4 : 送出審核',
    answer:
      '上傳影片後，平台將進行內容與品質審核，確保課程結構清晰、畫面音質達標，並符合教學標準與風格指引。若審核中發現可以優化的地方，我們將提供具體的回饋建議，協助你調整細節，提升整體課程吸引力與專業度。順利通過審核後，你的課程將邁向正式上架的最後一哩路！',
    image: new URL('@/assets/images/send-review.png', import.meta.url).href
  },
  {
    question: 'Step 5 : 正式上架，領取分潤',
    answer:
      '通過審核後，你的課程將正式在平台上線，開始接觸來自各地的學員！根據每月的訂閱數量與學員人數，獲得穩定透明的分潤收入。我們提供清晰易讀的收益報表，幫助你追蹤每月成長與收益趨勢，讓你的教學事業持續擴展。',
    image: new URL('@/assets/images/profit.png', import.meta.url).href
  }
]

// 控制每個 accordion 展開狀態
const openIndexes = ref(faqList.map(() => false))
function toggle(idx) {
  openIndexes.value[idx] = !openIndexes.value[idx]
}

// 回頂部
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* 裝飾線圖檔 */
.corner-decor {
  position: absolute;
  color: #0d6efd;
  text-shadow:
    0 0 28px #005ca4,
    0 0 10.8px #005ca4,
    0 0 10.8px #005ca4;
}
.corner-decor.top-end {
  /* 右上 */
  top: -55px;
  right: -70px;
}
/* 左下 */
.corner-decor.bottom-start {
  top: 10px;
  left: -80px;
}
.accordion-button {
  padding: 0;
  padding-bottom: 24px;
  border: none;
  border-bottom: 1px solid #eceffd;
}
.accordion-button:focus {
  box-shadow: none;
}
.accordion-body {
  padding: 0;
  padding-top: 24px;
}
.text-gray-400 {
  color: rgba(255, 255, 255, 0.7);
}
.btn-outline-light {
  border-color: #f8f9fa;
  color: #f8f9fa;
}
.btn-top {
  position: absolute;
  right: 60px;
  bottom: -30px;
}
.accordion-button::after {
  display: none;
}
.faq-image {
  width: 160px;
  height: 160px;
  border-radius: 4px;
  object-fit: cover;
}
</style>
