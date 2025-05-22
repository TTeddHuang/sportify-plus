<template>
  <section class="faq-section position-relative py-lg-12 text-white">
    <div class="container d-flex">
      <!-- 標題與裝飾 -->
      <div
        class="faq-header position-relative d-flex align-items-start justify-content-center mb-4"
      >
        <h2 class="me-3 fs-lg-2 fw-bold">FAQ</h2>
        <!-- 左下與右上角裝飾 -->
        <img :src="lineImg" alt="decor" class="corner-decor top-end" />
        <img :src="lineImg" alt="decor" class="corner-decor bottom-start" />
      </div>

      <!-- Accordion，置中顯示 -->
      <div
        id="faqAccordion"
        class="accordion w-100"
        style="max-width: 900px; margin-left: 120px"
      >
        <div
          v-for="(item, idx) in faqList"
          :key="idx"
          class="accordion-item bg-transparent border-0"
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
            <div class="accordion-body fs-lg-6 text-primary-000">
              {{ item.answer }}
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
    question: '我沒有運動基礎，適合使用 Sportify+ 嗎？',
    answer:
      '完全沒問題！Sportify+ 提供豐富且多樣化的課程，特別設計給沒有運動基礎或剛入門的使用者，從簡單易學的基礎動作開始，搭配專業教練詳細的講解，逐步引導你建立正確的運動觀念與技巧，讓你放心踏出運動的第一步，並逐漸達成更高的運動目標。'
  },
  {
    question: 'Sportify+ 有提供免費試用期嗎？',
    answer:
      '是的，Sportify+ 提供 7 日免費試用，讓你可以無風險地體驗所有功能與課程。'
  },
  {
    question: 'Sportify+ 可以同時在幾個裝置上使用？',
    answer:
      '你可以在最多三台裝置上同時登入使用，包括手機、平板和桌機，方便你隨時隨地運動學習。'
  },
  {
    question: '我可以使用手機上課嗎？',
    answer:
      '當然可以！Sportify+ 完全支援 iOS 與 Android 手機，介面優化後的操作體驗流暢，讓你輕鬆跟著影片動起來。'
  },
  {
    question: '如果觀看時遇到問題，該如何處理？',
    answer:
      '若在觀看影片時遇到任何問題，請先確認網路連線穩定，再刷新頁面；若仍無法解決，請聯繫客服，我們會在 24 小時內協助你。'
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
  top: -55px;
  right: -60px;
}
.corner-decor.bottom-start {
  top: 10px;
  left: -70px;
}
.accordion-button {
  padding: 24px 0;
  border: none;
  border-bottom: 1px solid #eceffd;
}
.accordion-button:focus {
  box-shadow: none;
}
.accordion-body {
  padding-top: 24px;
  padding-left: 0;
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
</style>
