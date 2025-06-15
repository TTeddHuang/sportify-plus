<template>
  <div v-if="courseDetail">
    <div class="container">
      <div class="d-flex">
        <!-- 左側選單 -->
        <div class="side-nav d-lg-block d-none">
          <div class="px-3 py-5">
            <h3 class="fs-6 px-3 fw-bold text-center">
              {{ courseName }}
            </h3>
            <hr class="divider my-5" />
            <ul class="list-group list-group-flush">
              <!-- 每個 li 代表一天的 Lesson -->
              <li
                v-for="(lesson, idx) in lessons"
                :key="idx"
                :class="{
                  finished: lesson.isFinished,
                  watching: lesson.isCurrentWatching
                }"
                class="list-group-item d-flex justify-content-between align-items-center rounded-1"
                style="padding: 0.75rem 1rem"
                @click="selectLesson(lesson)"
              >
                <div class="d-flex flex-column text-center w-100">
                  <p class="fs-9 mb-1" style="height: 42px">
                    {{ lesson.name }}
                  </p>
                  <div class="d-flex align-items-center justify-content-center">
                    <i
                      v-if="lesson.isFinished"
                      class="bi bi-check-circle-fill text-success fs-5 ms-2"
                    ></i>
                    <i v-else class="bi bi-circle text-secondary fs-5 ms-2"></i>
                    <p class="text-secondary mb-0 fs-9 ms-1">
                      {{
                        lesson.length !== '未提供'
                          ? lesson.length + ' 分鐘'
                          : '未提供'
                      }}
                      分鐘
                    </p>
                  </div>
                </div>
                <!-- 右側圖示：已完成顯示打勾，否則顯示空圈 -->
              </li>
            </ul>
          </div>
        </div>
        <!-- 右側主區塊：你的專屬教練群 -->
        <div class="p-lg-8 p-2 py-6 w-100" style="max-width: 1056px">
          <h3 class="mb-lg-8 mb-6">{{ currentLesson.name }}</h3>
          <!-- 播放影片 -->
          <div class="mb-lg-12 mb-6">
            <div class="media-block position-relative d-block">
              <!-- 假設後端有提供一個 video_url，這裡就用 currentLesson.video_url -->
              <!-- 下面只是示意，實際要看你的資料有哪些欄位 -->
              <img
                v-if="!currentLesson.video_url"
                src="@/assets/images/video1.png"
                class="rounded-2 video-cover"
              />
              <video
                v-else
                :src="currentLesson.video_url"
                class="rounded-2"
                controls
              ></video>
              <div class="play-icon position-absolute">
                <i class="bi bi-play-circle-fill"></i>
              </div>
            </div>
          </div>
          <!-- 課程標題與統計 -->
          <div class="my-lg-12">
            <div class="d-lg-flex justify-content-between align-items-center">
              <h2 class="fw-bold mb-lg-0 mb-5 fs-lg-2 fs-4">
                {{ courseDetail.course.name || '課程名稱載入中' }}
              </h2>
              <div
                class="d-flex align-items-center gap-5 gap-lg-8 mb-lg-0 mb-6"
              >
                <div class="icon-custom">
                  <i class="bi bi-star-fill text-secondary-600 me-1 fs-6"></i>
                  <p>{{ courseDetail.course.score }}</p>
                </div>
                <div class="icon-custom">
                  <i class="bi bi-person me-1 text-secondary-600 fs-6"></i>
                  <p>{{ courseDetail.course.numbers_of_view }} 瀏覽次數</p>
                </div>
                <div class="icon-custom">
                  <i class="bi bi-clock me-1 text-secondary-600 fs-6"></i>
                  <p>{{ courseDetail.course.hours }} 小時</p>
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
                  {{ courseDetail.course.description }}
                </p>
              </div>
            </div>
          </div>
          <!-- 教練介紹 -->
          <div
            class="border border-primary-000 rounded-4 p-lg-8 p-5 mb-lg-12 mb-6"
            style="background-color: rgba(255, 255, 255, 0.05)"
          >
            <div
              class="d-flex justify-content-between align-items-center mb-lg-8 mb-5"
            >
              <p class="fs-lg-5 fs-6 mb-0">教練介紹</p>
              <a
                :href="courseDetail.coach.coachPage_Url"
                target="_blank"
                class="btn px-3 py-1 btn-outline-grey-400 mb-0 text-grey-000 fs-8"
              >
                教練詳細資訊
              </a>
            </div>
            <div class="d-lg-flex">
              <img
                :src="courseDetail.coach.profile_image_url"
                :alt="courseDetail.coach.name"
                class="rounded-3 me-lg-8 object-fit-cover mb-lg-0 mb-8 coach-image"
              />
              <div>
                <div
                  class="d-lg-flex align-items-center gap-3 text-white flex-wrap mb-5"
                >
                  <span class="fw-bold fs-lg-7">{{
                    courseDetail.coach.name
                  }}</span>
                  <div class="py-lg-0 py-1">
                    <!-- 小螢幕顯示：水平線 -->
                    <div
                      class="d-block d-lg-none"
                      style="
                        width: 18px;
                        height: 2px;
                        background-color: rgba(255, 255, 255, 0.5);
                      "
                    ></div>

                    <!-- 桌機顯示：垂直線 -->
                    <div
                      class="d-none d-lg-block"
                      style="
                        width: 2px;
                        height: 18px;
                        background-color: rgba(255, 255, 255, 0.5);
                      "
                    ></div>
                  </div>

                  <span class="fw-bold fs-lg-7">
                    {{ courseDetail.coach.title }}
                  </span>
                </div>
                <div>
                  <p>
                    {{ courseDetail.coach.intro }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 章節介紹 -->
          <div
            class="rounded-4 p-lg-8 p-5 border border-primary-000 mb-lg-12 mb-6"
            style="background-color: rgba(255, 255, 255, 0.05)"
          >
            <div
              class="d-flex justify-content-between align-items-center mb-lg-8 mb-5"
            >
              <p class="fs-lg-5 fs-6 mb-0 fw-bold">章節介紹</p>
              <p
                class="btn px-3 py-1 btn-outline-grey-400 mb-0 text-grey-000 fs-8"
                @click="toggleAll"
              >
                {{ isAllOpen ? '全部收合' : '全部展開' }}
              </p>
            </div>
            <div id="courseDetail" class="accordion w-100">
              <div
                v-for="(item, idx) in courseDetail.chapters"
                :key="idx"
                class="accordion-item border-0 rounded-3 overflow-hidden"
                style="background-color: rgba(255, 255, 255, 0.05)"
              >
                <h2 :id="`heading${idx}`" class="accordion-header">
                  <button
                    class="accordion-button collapsed text-white fs-lg-6 p-5"
                    type="button"
                    @click="toggle(idx)"
                  >
                    {{ item.title }}
                    <i
                      class="bi ms-auto"
                      :class="
                        openIndexes[idx] ? 'bi-chevron-up' : 'bi-chevron-down'
                      "
                    ></i>
                  </button>
                </h2>

                <div
                  :id="`collapse${idx}`"
                  class="accordion-collapse collapse"
                  :class="{
                    show: openIndexes[idx],
                    'rounded-bottom-3': openIndexes[idx]
                  }"
                  :aria-labelledby="`heading${idx}`"
                  data-bs-parent="#courseDetail"
                >
                  <div class="accordion-body fs-lg-6 text-primary-000">
                    <div v-if="openIndexes[idx]" class="hr-line mb-4"></div>
                    <ul class="mb-0 list-unstyled">
                      <li v-for="(sub, i) in item.subtitles" :key="i">
                        {{ sub }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 課程評價 -->
          <div
            class="rounded-4 p-lg-8 p-5 border border-primary-000 mb-lg-12 mb-6"
            style="background-color: rgba(255, 255, 255, 0.05)"
          >
            <div
              class="d-flex justify-content-between align-items-center mb-lg-8 mb-5"
            >
              <div class="d-flex justify-content-between align-items-center">
                <p class="fs-lg-5 fs-6 mb-0 fw-bold">課程評價</p>
                <p class="mb-0 fs-lg-7 fs-9 ms-2">
                  ({{ userRatings.paginatedData?.length || 0 }} 則評價)
                </p>
              </div>
              <button
                class="btn px-3 py-1 btn-outline-grey-400 mb-0 text-grey-000 fs-8"
                data-bs-toggle="modal"
                data-bs-target="#ratingsModal"
              >
                所有評價
              </button>
            </div>
            <!-- modal -->
            <div
              id="ratingsModal"
              class="modal fade"
              tabindex="-1"
              aria-labelledby="ratingsModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg custom-modal-width">
                <div class="modal-content">
                  <div
                    class="modal-header bg-grey-000 text-grey-900 p-5 pb-3 border-0"
                  >
                    <h5
                      id="ratingsModalLabel"
                      class="modal-title fw-bold text-primary-900 fs-lg-5 fs-6"
                    >
                      課程評價
                    </h5>
                    <p class="mb-0 fs-lg-7 fs-9 ms-2 text-primary-900">
                      ({{ userRatings.paginatedData.length || 0 }}
                      則評價)
                    </p>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="px-5 bg-grey-000">
                    <hr
                      class="my-0"
                      style="
                        height: 2px;
                        background-color: #d2d2d2;
                        border: none;
                      "
                    />
                  </div>

                  <div
                    class="modal-body bg-grey-000 text-grey-700 p-5 rounded-bottom-3"
                  >
                    <div
                      v-for="rating in paginatedRatings"
                      :key="rating.id"
                      class="mb-4 p-3 bg-primary-000 rounded-3"
                    >
                      <div
                        class="d-lg-flex border-bottom justify-content-between align-items-center pb-2"
                      >
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <div class="fw-bold">{{ rating.username }}</div>

                          <div class="text-stars ms-5">
                            <i
                              v-for="n in Math.floor(rating.score)"
                              :key="'full-' + n"
                              class="bi bi-star-fill me-1"
                            ></i>
                            <i
                              v-if="
                                rating.score % 1 >= 0.25 &&
                                rating.score % 1 < 0.75
                              "
                              class="bi bi-star-half me-1 text-warning"
                            ></i>
                            <i
                              v-for="n in 5 -
                              Math.floor(rating.score) -
                              (rating.score % 1 >= 0.25 &&
                              rating.score % 1 < 0.75
                                ? 1
                                : 0)"
                              :key="'empty-' + n"
                              class="bi bi-star text-secondary me-1"
                            ></i>
                          </div>
                        </div>

                        <div class="text-grey-600 fs-lg-8 small">
                          {{ rating.createdAt }}
                        </div>
                      </div>

                      <p class="mt-2 mb-0 text-grey-700">
                        {{ rating.comment }}
                      </p>
                    </div>
                    <!-- Pagination 控制列 -->
                    <nav
                      class="d-flex justify-content-center"
                      style="padding-top: 4px"
                    >
                      <ul class="pagination mb-0">
                        <li
                          class="page-item bg-grey-000"
                          :class="{ disabled: currentPage === 1 }"
                          @click="changePage(currentPage - 1)"
                        >
                          <a class="page-link me-lg-12"
                            ><i
                              class="bi bi-chevron-left d-inline d-lg-none"
                            ></i>
                            <span class="d-none d-lg-inline">上一頁</span></a
                          >
                        </li>

                        <li
                          v-for="page in totalPages"
                          :key="page"
                          class="page-item mx-2"
                          :class="{ active: page === currentPage }"
                          @click="changePage(page)"
                        >
                          <a class="page-link">{{ page }}</a>
                        </li>

                        <li
                          class="page-item"
                          :class="{ disabled: currentPage === totalPages }"
                          @click="changePage(currentPage + 1)"
                        >
                          <a class="page-link ms-lg-12"
                            ><i
                              class="bi bi-chevron-right d-inline d-lg-none"
                            ></i>
                            <span class="d-none d-lg-inline">下一頁</span></a
                          >
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div id="ratings" class="accordion w-100">
              <div class="d-lg-flex gap-5 align-items-stretch">
                <div
                  v-for="(rating, index) in latestThreeRatings"
                  :key="rating.id"
                  :class="[
                    'card rating-card',
                    'h-100',
                    index === latestThreeRatings.length - 1 ? 'mb-0' : 'mb-5'
                  ]"
                  style="background-color: rgba(255, 255, 255, 0.05)"
                >
                  <div class="card-body p-lg-5">
                    <div
                      class="d-lg-block d-flex justify-content-between align-items-center mb-1"
                    >
                      <h6 class="card-title fw-bold fs-lg-6 fs-8 mb-0 mb-lg-1">
                        {{ rating.username }}
                      </h6>
                      <h6
                        class="card-subtitle mb-lg-1 text-body-secondary mb-0 mb-lg-1"
                      >
                        <!-- 滿星 -->
                        <i
                          v-for="n in Math.floor(rating.score)"
                          :key="'full-' + n"
                          class="bi bi-star-fill text-warning me-1"
                        ></i>

                        <!-- 半星 -->
                        <i
                          v-if="
                            rating.score % 1 >= 0.25 && rating.score % 1 < 0.75
                          "
                          class="bi bi-star-half text-warning me-1"
                        ></i>

                        <!-- 空星 -->
                        <i
                          v-for="n in 5 -
                          Math.floor(rating.score) -
                          (rating.score % 1 >= 0.25 && rating.score % 1 < 0.75
                            ? 1
                            : 0)"
                          :key="'empty-' + n"
                          class="bi bi-star text-secondary me-1"
                        ></i>
                      </h6>
                    </div>
                    <div>
                      <p class="text-grey-400 fs-lg-8 fs-9 mb-5">
                        {{ rating.createdAt }}
                      </p>
                    </div>

                    <hr class="my-lg-5" />
                    <p class="card-text fs-lg-6">
                      {{ rating.comment }}
                    </p>
                  </div>
                </div>
              </div>
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

// 1. 先準備要放 sidebar 資料的 ref
const courseName = ref('') // ← 這裡用來存 sidebar 回傳的 courseName
const lessons = ref([]) // ← 這裡用來存 sidebar 回傳的 chapter 陣列

// currentLesson 存「當下被選到的章節物件」
const currentLesson = ref({
  // 先放個預設值，避免 template 一開始就錯
  name: '',
  length: '',
  isFinished: false,
  isCurrentWatching: false
})

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
    const token = localStorage.getItem('token') // ← 確保你已經登入並且 token 在 localStorage
    const sidebarRes = await axios.get(
      `https://sportify.zeabur.app/api/v1/users/courses/${courseId}/sidebar`,
      {
        headers: {
          Authorization: `Bearer ${token}` // ← 把 token 加到 Authorization header
        }
      }
    )
    lessons.value = sidebarRes.data.data.chapter
    // 初始化 currentLesson：優先找出 isCurrentWatching 為 true 的
    const watching = lessons.value.find(item => item.isCurrentWatching)
    if (watching) {
      currentLesson.value = watching
    } else if (lessons.value.length > 0) {
      // 如果沒有人標註 isCurrentWatching，就用第一筆當預設
      currentLesson.value = lessons.value[0]
    }

    courseName.value = sidebarRes.data.data.courseName // ← 塞回傳的 courseName
    lessons.value = sidebarRes.data.data.chapter // ← 塞回傳的章節陣列

    const detailRes = await axios.get(
      `https://sportify.zeabur.app/api/v1/courses/${courseId}/details`
    )
    courseDetail.value = detailRes.data.data

    openIndexes.value = courseDetail.value.chapters.map(() => false)

    const ratingsRes = await axios.get(
      `https://sportify.zeabur.app/api/v1/courses/${courseId}/ratings`
    )
    userRatings.value = ratingsRes.data.data
  } catch (err) {
    console.error('載入資料失敗', err)
  }
})

function selectLesson(lesson) {
  currentLesson.value = lesson
}

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
      `https://sportify.zeabur.app/api/v1/courses/${courseId}/ratings`
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
  align-items: stretch;
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

.coach-image {
  width: 164px;
  height: 164px;
  object-fit: cover;
  object-position: center;

  @media (max-width: 992px) {
    width: 100%; // 小螢幕改成滿寬
    height: 164px; // 高度維持
    object-position: top;
  }
}

// 章節介紹
.accordion-body {
  padding: 24px;
  padding-top: 0;
}
.accordion-button {
  padding: 24px 0;
  border: none;
  background-color: transparent;
}
.accordion-button:focus {
  box-shadow: none;
}

.accordion-button::after {
  display: none;
}
.hr-line {
  width: 100%;
  height: 1px;
  background-color: $primary-000;
  margin: 0 auto 1rem;
  margin-bottom: 24px;
}
// 修正最後一個button不要有mb-5
.accordion-item {
  margin-bottom: 24px;
}
#courseDetail .accordion-item:last-child {
  margin-bottom: 0;
}

// modal
.custom-modal-width {
  max-width: 900px;
}
.card:last-child {
  margin-bottom: 0;
}
.page-link {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: $primary-700;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(48, 79, 254, 0.1);
  }
}

.page-item.active .page-link {
  background-color: $primary-700;
  color: $primary-100;
}

.page-item.disabled .page-link {
  opacity: 0.4;
  cursor: not-allowed;
}
.rating-card {
  width: 100%;
  max-width: 280px;

  @media (max-width: 992px) {
    max-width: 100%;
  }
}
</style>
