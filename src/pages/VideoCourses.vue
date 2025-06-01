<template>
  <div class="container">
    <div class="d-flex">
      <!-- 左側選單 -->
      <div class="side-nav d-lg-block d-none">
        <div class="px-3 py-5">
          <h3 class="fs-6 px-3 fw-bold text-center">
            皮拉提斯-30天<br />
            炸裂核心肌群
          </h3>
          <hr class="divider my-5" />
          <ul class="list-group list-group-flush">
            <!-- 每個 li 代表一天的 Lesson -->
            <li
              v-for="(lesson, idx) in lessons"
              :key="lesson.id"
              class="list-group-item d-flex justify-content-between align-items-center"
              style="padding: 0.75rem 1rem"
            >
              <div class="d-flex flex-column">
                <span class="fw-bold"
                  >Day {{ lesson.day }}：{{ lesson.title }}</span
                >
                <small class="text-secondary">{{ lesson.duration }} 分鐘</small>
              </div>
              <!-- 右側圖示：已完成顯示打勾，否則顯示空圈 -->
              <div>
                <i
                  v-if="lesson.completed"
                  class="bi bi-check-circle-fill text-success fs-5"
                ></i>
                <i v-else class="bi bi-circle text-secondary fs-5"></i>
              </div>
            </li>
          </ul>

          <!-- <ul class="list-group list-group-flush">
            <li class="list-group-item active">
              <router-link to="/user/courses" class="nav-link">
                我的課程
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link to="/user/subscriptions" class="nav-link">
                訂閱紀錄
              </router-link>
            </li>

            <li class="list-group-item">
              <router-link to="/user/profile" class="nav-link">
                編輯個人資料
              </router-link>
            </li>
          </ul> -->
        </div>
      </div>
      <!-- 右側主區塊：你的專屬教練群 -->
      <div class="p-lg-8 w-100" style="max-width: 1056px">
        <h3 class="mb-lg-8">Day 4：死蟲式入門：找回深層穩定力</h3>
        <!-- 播放影片 -->
        <div class="mb-lg-12 mb-6">
          <div class="media-block position-relative d-block">
            <img
              src="@/assets/images/video1.png"
              class="rounded-2 video-cover"
            />
            <div class="play-icon position-absolute">
              <i class="bi bi-play-circle-fill"></i>
            </div>
          </div>
        </div>
        <!-- 課程標題與統計 -->
        <div class="my-lg-12">
          <div class="d-lg-flex justify-content-between align-items-center">
            <h2 class="fw-bold mb-lg-0 mb-5 fs-lg-2 fs-4">
              身心平衡晨間瑜伽課程
            </h2>
            <div class="d-flex align-items-center gap-5 gap-lg-8 mb-lg-0 mb-6">
              <div class="icon-custom">
                <i class="bi bi-star-fill text-secondary-600 me-1 fs-6"></i>
                <p>4.6</p>
              </div>
              <div class="icon-custom">
                <i class="bi bi-person me-1 text-secondary-600 fs-6"></i>
                <p>1322 位學生</p>
              </div>
              <div class="icon-custom">
                <i class="bi bi-clock me-1 text-secondary-600 fs-6"></i>
                <p>19 小時</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 課程圖片與介紹 -->
        <div class="gy-4 d-lg-flex mb-lg-12 mb-6">
          <div
            class="p-lg-8 p-5 rounded-4 border border-primary-000 h-100"
            style="background-color: rgba(255, 255, 255, 0.05)"
          >
            <h5 class="mb-lg-8 fw-bold">課程介紹</h5>
            <div>
              <p class="mb-5">
                這堂課為你量身打造30天的核心強化挑戰，從零開始，逐步進入高效訓練。課程以每日30分鐘為單位，針對腹部、背部、骨盆底等核心區域設計漸進式訓練內容，幫助你有效刺激深層肌群，改善駝背、腰痛與姿勢不良等問題。我們強調身體覺察與呼吸整合，讓你不只動得正確，也能「感受」每一個動作的力量與控制。課程同時融合皮拉提斯的訓練理念與現代解剖觀點，適合所有想增強核心穩定度、強化軀幹力量與塑造體態的人。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const lessons = ref([
  {
    id: 1,
    day: 1,
    title: '核心初體驗：學會腹式呼吸',
    duration: 15,
    completed: true
  },
  {
    id: 2,
    day: 2,
    title: '骨盆中立初探：建立正確對齊',
    duration: 13,
    completed: true
  },
  {
    id: 3,
    day: 3,
    title: '死蟲式入門：找回深層穩定力',
    duration: 21,
    completed: true
  },
  {
    id: 4,
    day: 4,
    title: '死蟲式入門：找回深層穩定力',
    duration: 21,
    completed: false
  },
  {
    id: 5,
    day: 5,
    title: '死蟲式入門：找回深層穩定力',
    duration: 21,
    completed: false
  }
])

const route = useRoute()
const courseId = route.params.courseId
const courseDetail = ref(null)
const openIndexes = ref([])
const userRatings = ref({
  paginatedData: [],
  meta: {
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      total_pages: 1,
      has_next: false,
      has_previous: false
    }
  }
})

// API 資料載入後再初始化 openIndexes
onMounted(async () => {
  try {
    const courseId = route.params.courseId
    const res = await axios.get(
      `https://sportify-backend-1wt9.onrender.com/api/v1/courses/${courseId}/details`
    )
    courseDetail.value = res.data.data

    // 初始化章節展開狀態
    openIndexes.value = courseDetail.value.chapters.map(() => false)

    // 取得評價資料
    const ratingsRes = await axios.get(
      `https://sportify-backend-1wt9.onrender.com/api/v1/courses/${courseId}/ratings`
    )
    userRatings.value = ratingsRes.data.data
  } catch (err) {
    console.error('載入課程詳細或評價資料失敗', err)
  }
})

function toggle(idx) {
  openIndexes.value[idx] = !openIndexes.value[idx]
}

const isAllOpen = ref(false)
function toggleAll() {
  isAllOpen.value = !isAllOpen.value
  openIndexes.value = courseDetail.value.chapters.map(() => isAllOpen.value)
}

const latestThreeRatings = computed(() =>
  userRatings.value.paginatedData
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
)

const currentPage = ref(1)
const pageSize = 5

const totalPages = computed(() =>
  Math.ceil(userRatings.value.meta.pagination.total / pageSize)
)

const paginatedRatings = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return userRatings.value.paginatedData.slice(start, end)
})

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

async function fetchRatings(courseId) {
  try {
    const res = await axios.get(
      `https://sportify-backend-1wt9.onrender.com/api/v1/courses/${courseId}/ratings`
    )
    userRatings.value = res.data.data
  } catch (error) {
    console.error('評價載入失敗', error)
  }
}

onMounted(() => {
  fetchRatings(courseId)
})
</script>

<style scoped lang="scss">
.side-nav {
  border-left: 1px solid $primary-100;
  border-right: 1px solid $primary-100;
  padding: 0;
  width: 240px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.container > .d-flex {
  align-items: stretch; // 這你已經有加了
  min-height: 100vh; // 關鍵：讓整個容器最小高度滿版
}

.media-block {
  img {
    width: 100%;
    height: 600px;
    aspect-ratio: 2.16;
    position: relative;
    object-fit: cover;
  }
  .video-cover {
    object-fit: cover;
    filter: brightness(50%);
    border-radius: 12px;
    &:hover {
      filter: brightness(100%);
    }
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 48px;
    color: $primary-500;
    z-index: 2;
  }
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

.divider {
  opacity: 1;
  border: 0;
  border-top: 1px solid $primary-000;
}

.list-group {
  .list-group-item {
    border: none;
    padding: 12px 16px;
    margin-bottom: 8px;
  }
  .active {
    border-radius: 4px;
    color: $primary-100;
  }
}

/* List item hover 效果（可以自行調整） */
.list-group-item:hover {
  background-color: $primary-600;
  cursor: pointer;
}
</style>
