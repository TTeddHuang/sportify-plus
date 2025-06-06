<template>
  <div class="container">
    <div class="d-flex">
      <!-- 左側選單 -->
      <div class="side-nav d-lg-block d-none">
        <div class="px-3 py-5">
          <h3 class="fs-6 px-3 fw-bold">學習中心</h3>
          <hr class="divider my-5" />
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item active"
              :class="{ active: route.path === '/user/courses' }"
            >
              <router-link to="/user/courses" class="nav-link">
                我的課程
              </router-link>
            </li>
            <li
              class="list-group-item"
              :class="{ active: route.path === '/user/subscriptions' }"
            >
              <router-link to="/user/subscriptions" class="nav-link">
                訂閱紀錄
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/user/profile' }"
            >
              <router-link to="/user/profile" class="nav-link">
                編輯個人資料
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右側主區塊：你的專屬教練群 -->
      <div class="p-lg-8 px-5 py-8 w-100" style="max-width: 1056px">
        <h2 class="fs-lg-4 mb-lg-8 mb-6">你的專屬教練群</h2>
        <div class="scrollable-btn-wrapper position-relative">
          <div
            class="scrollable-btn-group d-flex flex-row align-items-center mb-lg-8 mb-6"
            @scroll="onScroll"
          >
            <!-- 運動類別按鍵 -->
            <div
              class="btn-group types-btn-group gap-3"
              role="group"
              aria-label="Basic outlined button group"
            >
              <button
                href="#"
                class="btn btn-outline-grey-400"
                :class="{ active: !currentType && !isFavoriteOnly }"
                @click="
                  () => {
                    currentType = ''
                    isFavoriteOnly = false
                    currentPage = 1
                  }
                "
              >
                所有課程
              </button>
              <button
                href="#"
                class="btn btn-outline-grey-400"
                :class="{ active: isFavoriteOnly }"
                @click="
                  () => {
                    isFavoriteOnly = !isFavoriteOnly
                    currentType = ''
                    currentPage = 1
                  }
                "
              >
                已收藏
              </button>
              <button
                v-for="type in uniqueCourseTypes"
                :key="type"
                href="#"
                class="btn btn-outline-grey-400"
                :class="{ active: currentType === type && !isFavoriteOnly }"
                @click="
                  () => {
                    currentType = type
                    isFavoriteOnly = false
                    currentPage = 1
                  }
                "
              >
                {{ type }}
              </button>
            </div>
            <!-- 排序按鍵 -->
          </div>
          <div v-if="!hasScrolled && isOverflowing" class="scroll-hint"></div>
        </div>

        <div class="d-flex flex-wrap course-grid gap-lg-8 gap-md-6">
          <div
            v-for="course in pagedCourses"
            :key="course.course_id"
            class="mb-4 course-card"
          >
            <div class="card h-100 rounded-4 p-5 position-relative">
              <div class="img-wrapper position-relative">
                <div class="img-decorate">
                  <span class="badge bg-primary-100 fs-9 text-grey-700">{{
                    course.course_type
                  }}</span>
                  <i
                    :class="course.isFavorited ? 'bi-heart-fill' : 'bi-heart'"
                    class="bi heart"
                    @click="toggleFavorite(course)"
                  ></i>
                </div>

                <img
                  :src="course.course_image_url || learningCourseImg1"
                  class="card-img-top mb-5 rounded-3"
                  :alt="course.name"
                  style="object-fit: cover; height: 160px"
                />
                <div class="card-body p-0">
                  <h5 class="card-title fs-7 mb-2 fw-bold">
                    {{ course.coach_name }}
                  </h5>
                  <p class="card-text mb-2 fs-7">
                    {{ course.coach_title }}
                  </p>
                  <a href="#" class="btn btn-primary-600 w-100 mb-2"
                    >點擊上課</a
                  >

                  <a
                    href="#"
                    class="btn btn-outline-grey-400 w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                    @click.prevent="openRatingModal(course)"
                  >
                    {{ course.isRated ? '查看評分' : '為此課程評分' }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 評分 Modal -->
        <div
          id="ratingModal"
          ref="modalRef"
          class="modal fade"
          tabindex="-1"
          aria-labelledby="ratingModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog custom-modal-width">
            <div class="modal-content rounded-4 p-5 bg-grey-000">
              <div class="modal-header border-bottom text-grey-900 p-0 pb-3">
                <h5
                  id="ratingModalLabel"
                  class="modal-title fw-bold text-primary-900"
                >
                  評分
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body p-0 mb-6">
                <!-- 評分顯示 -->
                <div class="d-flex justify-content-center my-6 gap-6">
                  <i
                    v-for="i in 5"
                    :key="i"
                    class="bi"
                    :class="
                      i <= rating
                        ? 'bi-star-fill text-warning'
                        : 'bi-star text-grey-400'
                    "
                    style="font-size: 32px; cursor: pointer"
                    @click="isEditing && (rating = i)"
                  ></i>
                </div>
                <!-- 評語輸入 or 顯示 -->
                <div v-if="isEditing">
                  <textarea
                    v-model="comment"
                    class="form-control bg-grey-000 text-grey-500"
                    rows="4"
                    placeholder="請分享你的課程心得"
                    maxlength="100"
                  ></textarea>
                  <div class="text-end mt-1 fs-8 text-grey-500">
                    {{ comment.length }}/100
                  </div>
                </div>
                <div v-else>
                  <p class="text-grey-700">{{ comment }}</p>
                </div>
              </div>
              <div class="modal-footer border-0 p-0">
                <template v-if="isEditing">
                  <button
                    type="button"
                    class="btn btn-primary w-100"
                    :disabled="!rating || !comment"
                    @click="submitRating"
                  >
                    送出
                  </button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-primary-600 w-100"
                    @click="isEditing = true"
                  >
                    編輯
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-11">
          <nav class="d-flex justify-content-center" style="padding-top: 4px">
            <ul class="pagination mb-0">
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                @click="changePage(currentPage - 1)"
              >
                <a class="page-link me-lg-11">上一頁</a>
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
                <a class="page-link ms-lg-11">下一頁</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { user, initUser } from '@/store/user'

import learningCourseImg1 from '@/assets/images/learningCourse-1.png'

const modalInstance = ref(null)

const route = useRoute()

const currentType = ref('')
const currentPage = ref(1)
const isFavoriteOnly = ref(false)
const rating = ref(0)
const comment = ref('')
const selectedCourse = ref(null)

const isEditing = ref(false)

const courses = ref([])

const uniqueCourseTypes = computed(() => {
  const types = courses.value.map(c => c.course_type)
  return [...new Set(types)] // 用 Set 過濾重複類別
})

const filteredCourses = computed(() => {
  let filtered = courses.value

  // 篩選課程分類
  if (currentType.value) {
    filtered = filtered.filter(c => c.course_type === currentType.value)
  }

  // 篩選已收藏
  if (isFavoriteOnly.value) {
    filtered = filtered.filter(c => c.isFavorited)
  }

  return filtered
})

const toggleFavorite = async course => {
  const token = localStorage.getItem('token')
  const userData = user.value
  const userId = userData?.id || userData?._id
  const courseId = course.course_id || course.id
  if (!userData || !token) {
    alert('請先登入才能收藏課程')
    return
  }
  if (!token || !userId || !courseId) return

  try {
    if (course.isFavorited) {
      // 取消收藏
      await axios.delete(
        `https://sportify-backend-1wt9.onrender.com/api/v1/users/${userId}/favorites/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      course.isFavorited = false
    } else {
      // 加入收藏
      await axios.post(
        `https://sportify-backend-1wt9.onrender.com/api/v1/users/${userId}/favorites/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      course.isFavorited = true
    }
  } catch (error) {
    console.error('收藏操作失敗:', error)
  }
}

// 按鈕閃爍提醒可滑動
const hasScrolled = ref(false)
const onScroll = () => {
  hasScrolled.value = true
}
const isOverflowing = ref(false)

const checkOverflow = () => {
  const wrapper = document.querySelector('.scrollable-btn-group')
  if (!wrapper) return
  const isMobile = window.innerWidth <= 530
  isOverflowing.value = isMobile && wrapper.scrollWidth > wrapper.clientWidth
}

const fetchUserCourses = async token => {
  try {
    const res = await axios.get(
      'https://sportify-backend-1wt9.onrender.com/api/v1/users/courses',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    courses.value = res.data.data.map(course => ({
      ...course,
      isRated: course.isRated || false,
      isFavorited: course.isFavorited || false
    }))
  } catch (err) {
    console.error('載入課程失敗:', err)
  }
}

// 4. 修正 onMounted 中的初始化順序
onMounted(async () => {
  checkOverflow()
  window.addEventListener('resize', checkOverflow)

  await initUser()
  const token = localStorage.getItem('token')
  if (!token) {
    route.push('/login')
    return
  }

  await fetchUserCourses(token)

  for (const course of courses.value) {
    await fetchUserRatingByCourseId(course)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkOverflow)
})

const submitRating = async () => {
  const userData = user.value

  if (!userData || !userData.id) {
    console.warn('尚未登入或使用者資料未初始化')
    return
  }

  const token = localStorage.getItem('token')
  if (!selectedCourse.value || !userData || !token) return

  const userId = userData.id
  const courseId = selectedCourse.value.course_id || selectedCourse.value.id

  const postUrl = `https://sportify-backend-1wt9.onrender.com/api/v1/users/${userId}/ratings/${courseId}`
  const patchUrl = `https://sportify-backend-1wt9.onrender.com/api/v1/users/${userId}/rating/${courseId}`

  const payload = {
    score: rating.value,
    comment: comment.value
  }

  try {
    // 嘗試送出 POST
    console.log('送出的 URL:', postUrl)
    console.log('送出的 payload:', payload)

    await axios.post(postUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    selectedCourse.value.isRated = true // 成功新增才設定為已評價

    alert('評分送出成功！')
  } catch (error) {
    const message = error.response?.data?.message
    if (message === '已有評價資料') {
      // 改用 PATCH 送出
      try {
        console.warn('已有評價資料，自動改為 PATCH')

        await axios.patch(patchUrl, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        alert('評分已更新！')
      } catch (patchErr) {
        console.error('修改評價失敗:', patchErr)
        alert('修改評價失敗，請稍後再試')
        return
      }
    } else {
      console.error('送出評價失敗:', error)
      alert('送出失敗，請稍後再試')
      return
    }
  }

  // 更新 local state
  const index = courses.value.findIndex(c => (c.course_id || c.id) === courseId)
  if (index !== -1) {
    courses.value[index].isRated = true
  }

  rating.value = 0
  comment.value = ''

  // 關閉 modal
  const modalEl = document.getElementById('ratingModal')
  if (modalEl) {
    const modalInstance =
      // eslint-disable-next-line no-undef
      bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl)
    modalInstance.hide()
  }
}

// 1. 修正 openRatingModal 函數中的使用者資料取得
const openRatingModal = async course => {
  selectedCourse.value = course

  const userData = user.value
  const username = userData.displayName
  const token = localStorage.getItem('token')

  if (!userData || !username) {
    console.warn('使用者資料錯誤')
    return
  }
  if (!userData || !userData.id) {
    console.warn('尚未登入或使用者資料未初始化')
    return
  }
  const courseId = course.course_id || course.id
  if (!courseId) {
    console.warn('課程 ID 缺失')
    return
  }

  try {
    const res = await axios.get(
      `https://sportify-backend-1wt9.onrender.com/api/v1/users/courses/${courseId}/ratings`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    const allRatings = res.data.data?.paginatedData || []
    const userRating = allRatings.find(r => r.username === username)

    if (userRating) {
      rating.value = userRating.score
      comment.value = userRating.comment || ''
      isEditing.value = false
      course.isRated = true
    } else {
      rating.value = 0
      comment.value = ''
      isEditing.value = true
      course.isRated = false
    }

    // 開啟 Modal
    const modalEl = document.getElementById('ratingModal')
    if (modalEl) {
      modalInstance.value =
        // eslint-disable-next-line no-undef
        bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl)
      modalInstance.value.show()
    }
  } catch (err) {
    console.error('查詢評價失敗', err)
    rating.value = 0
    comment.value = ''
    isEditing.value = true
    course.isRated = false
  }
}

// 2. 修正 fetchUserRatings 函數
const fetchUserRatingByCourseId = async course => {
  const token = localStorage.getItem('token')
  const userWrapper = JSON.parse(localStorage.getItem('user'))
  const userData = userWrapper?.data || userWrapper

  if (!course || (!course.id && !course.course_id)) return

  const courseId = course.course_id || course.id

  try {
    const res = await axios.get(
      `https://sportify-backend-1wt9.onrender.com/api/v1/users/courses/${courseId}/ratings`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const ratings = res.data.data?.paginatedData || []

    // 比對使用者是否有留言（這裡假設比對 username）
    const match = ratings.find(r => r.username === userData.displayName)

    if (match) {
      course.isRated = true
      course.ratingData = match // 方便後續 modal 用
    } else {
      course.isRated = false
      course.ratingData = null
    }
    const allRatings = res.data.data?.paginatedData || []
    return allRatings.find(r => r.username === user.value.displayName) || null
  } catch (err) {
    console.error('查詢課程評價失敗', err)
    course.isRated = false
    course.ratingData = null
  }
}

const pageSize = 6
const pagedCourses = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredCourses.value.slice(start, start + pageSize)
})
const totalPages = computed(() =>
  Math.ceil(filteredCourses.value.length / pageSize)
)
function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
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
.scrollable-btn-wrapper {
  position: relative;
  max-width: 100%;
  overflow: hidden;
}
.scroll-hint {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 40px;
  pointer-events: none;
  background: linear-gradient(to left, $primary-300, transparent);
  z-index: 10;

  // 可加上閃爍動畫讓它被注意到
  animation: pulse-hint 1.5s ease-in-out infinite;
}

@keyframes pulse-hint {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.2;
  }
}
.scrollable-btn-group {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  display: block;
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Chrome、Safari、Edge
  }
  .btn-group {
    display: flex;
    flex-wrap: nowrap;
    min-width: max-content; // 讓它延伸超過容器寬
  }

  // 手機版下才套用 max-width 限制
  @media (max-width: 992px) {
    margin-left: -1rem; // 滑動時讓按鈕能靠齊邊
    margin-right: -1rem;
    padding: 0 1rem;
  }
}

.types-btn-group.btn-group > .btn {
  display: inline-flex;
  align-items: center;
  border: 0;
  border-radius: 8px;
  color: $primary-000;
  box-shadow: inset 0 0 0 1px $grey-400;
  &:hover {
    background-color: $primary-300;
    color: $primary-700;
  }
  &:active,
  &.active,
  &:focus-visible {
    background-color: $primary-700;
    color: $primary-000;
  }
}
.course-grid {
  .course-card {
    width: 100%; // 預設手機版 1 欄

    @media (min-width: 768px) {
      width: calc((100% - 40px) / 2); // 平板 2 欄（gap: 40px）
    }

    @media (min-width: 992px) {
      width: calc((100% - 80px) / 3); // 桌機 3 欄（gap: 40px * 2）
    }
  }
}
.card {
  border: 1px solid rgba(236, 239, 253, 1); // 邊框色
  box-shadow: 0 0 5px 0 rgba(94, 142, 221, 1); // Drop shadow
  background-color: rgba(252, 252, 252, 0.1);
}
.img-decorate {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  padding: 12px;
}
.badge {
  box-shadow: inset 0px 0px 0px 1px $primary-400;
  border-radius: 100px;
  line-height: 150%;
  padding: 4px 8px;
}
.heart {
  font-size: 24px;
  border-radius: 4px;
  padding: 8px;
  color: #e30000;
  background-color: rgba(252, 252, 252, 0.5);
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.heart::before {
  vertical-align: top; // 置中
}
// modal style
textarea::placeholder {
  color: $grey-400; // modal placeholder
}
.custom-modal-width {
  max-width: 488px;
}
.form-control {
  min-height: 175px;
  resize: none;
}

.page-link {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: $primary-000;
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
</style>
