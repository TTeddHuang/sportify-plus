<template>
  <div class="container mb-lg-12 mb-8">
    <h1 class="fs-2 primary-000 my-lg-10 my-8">
      {{
        route.query.keyword ? `搜尋結果：${route.query.keyword}` : '課程分類'
      }}
    </h1>
    <div class="d-xxl-flex flex-row justify-content-between">
      <!-- 運動類別按鍵 -->

      <div class="types-btn-wrapper gap-1">
        <div
          class="btn-group types-btn-group gap-1 mb-xxl-3 mb-5 d-flex"
          role="group"
          aria-label="Basic outlined button group"
        >
          <button
            href="#"
            class="btn btn-outline-primary flex-shrink-0 text-nowrap flex-grow-0"
            :class="{ active: currentType === '' }"
            @click="handleCategoryClick('')"
          >
            所有課程
          </button>
          <button
            v-for="skill in skills"
            :key="skill.skill_id"
            href="#"
            class="btn btn-outline-primary flex-shrink-0 text-nowrap"
            :class="{ active: currentType === skill.skill_id }"
            @click="() => handleCategoryClick(skill.skill_id)"
          >
            {{ skill.course_type }}
          </button>
        </div>
      </div>

      <!-- 排序按鍵 -->
      <div class="d-flex gap-1 align-items-center sort-btn-group mb-xxl-3 mb-5">
        <span>排序：</span>
        <button
          type="button"
          class="btn btn-primary"
          :class="{ active: currentSort === 'popular' }"
          @click="() => handleSortClick('popular')"
        >
          最熱門
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :class="{ active: currentSort === 'score' }"
          @click="() => handleSortClick('score')"
        >
          評價最高
        </button>
      </div>
    </div>
    <div class="card-section d-flex flex-wrap gap-lg-8 gap-5">
      <!-- 單一卡片範本-start -->
      <div
        v-for="course in paginatedCourses"
        :key="course.course_id"
        class="card position-relative"
      >
        <span
          class="badge bg-primary-100 fs-9 text-grey-700 position-absolute"
          >{{ course.course_type }}</span
        >
        <img
          :src="`${course.course_image_url}`"
          class="card-img-top"
          alt="card-img-top"
        />
        <div class="card-body">
          <h5 class="card-title fs-7-bold">{{ course.course_name }}</h5>
          <div class="d-flex">
            <p class="fs-7">{{ course.coach_name }}</p>
            <span class="fs-7 px-2">I</span>
            <p class="fs-7">{{ course.coach_title }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="d-flex align-items-center">
              <span class="material-symbols-outlined star"> star </span
              ><span>{{ course.course_score }}</span>
            </p>
            <p class="d-flex align-items-center">
              <span class="material-symbols-outlined"> person </span
              ><span>{{ course.numbers_of_view }}</span
              >瀏覽次數
            </p>
            <p class="d-flex align-items-center">
              <span class="material-symbols-outlined"> schedule </span
              ><span>{{ course.total_hours }}</span
              >小時
            </p>
          </div>
          <p class="card-text">
            {{ course.course_description }}
          </p>
          <div class="card-link">
            <router-link
              :to="{
                name: 'CourseDetails',
                params: { courseId: course.course_id }
              }"
              class="stretched-link"
              >查看更多</router-link
            >
          </div>
        </div>
      </div>
      <!-- 單一卡片範本-end -->
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center mb-0">
        <li class="page-item mx-lg-7" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="handlePageClick(currentPage - 1)"
            ><i class="bi bi-chevron-left d-inline d-lg-none"></i>
            <!-- lg 以上顯示文字 -->
            <span class="d-none d-lg-inline">上一頁</span></a
          >
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item mx-lg-5"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" @click="handlePageClick(page)">{{ page }}</a>
        </li>

        <li
          class="page-item mx-lg-7"
          :class="{ disabled: currentPage === totalPages }"
        >
          <a class="page-link" @click="handlePageClick(currentPage + 1)"
            ><i class="bi bi-chevron-right d-inline d-lg-none"></i>
            <span class="d-none d-lg-inline">下一頁</span></a
          >
        </li>
      </ul>
    </nav>
  </div>
  <WaveBannerReverse />
</template>

<script setup>
import WaveBannerReverse from '@/components/WaveBannerReverse.vue'

import axios from 'axios'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 技能列表
const skills = ref([])
const filters = ref({})
const pagination = ref({})

const currentPage = ref(Number(route.query.page) || 1)
const currentType = ref(route.query.skillId || '')
const currentSort = ref(route.query.sortBy || 'popular')

// 搜尋結果分頁
const allCourses = ref([])
const pageSize = 9
const paginatedCourses = ref([])

const debugInfo = ref({
  fetchCount: 0,
  lastFetchParams: null,
  routerPushCount: 0,
  lastRouterPush: null
})

const totalPages = computed(() =>
  route.query.keyword
    ? Math.ceil(allCourses.value.length / pageSize)
    : pagination.value.total_pages || 1
)

function handlePageClick(page) {
  // 防止超出範圍
  if (page < 1 || page > totalPages.value) return

  console.log(`📄 分頁點擊:`, page, '當前頁:', currentPage.value)

  currentPage.value = page

  // 處理搜尋模式下的分頁
  if (route.query.keyword) {
    console.log('🔍 搜尋模式分頁')
    paginateCourses()
    return
  }

  // 處理一般模式下的分頁
  const query = {
    page: currentPage.value,
    skillId: currentType.value,
    sortBy: currentSort.value
  }

  // 🔍 除錯：記錄路由推送
  debugInfo.value.routerPushCount++
  debugInfo.value.lastRouterPush = {
    type: 'page',
    query: { ...query },
    timestamp: new Date().toISOString()
  }

  console.log(`🚀 路由推送 #${debugInfo.value.routerPushCount} (分頁):`, query)

  router.push({
    path: '/courses',
    query
  })
}

function paginateCourses() {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  paginatedCourses.value = allCourses.value.slice(start, end)
}

async function fetchCourses() {
  const keyword = route.query.keyword || ''

  // 🔍 除錯：記錄 API 請求
  debugInfo.value.fetchCount++
  const params = {
    keyword,
    page: currentPage.value,
    skillId: currentType.value,
    sortBy: currentSort.value
  }
  debugInfo.value.lastFetchParams = {
    ...params,
    timestamp: new Date().toISOString()
  }

  console.log(`🔍 API 請求 #${debugInfo.value.fetchCount}:`, params)

  if (keyword) {
    const { data } = await axios.get(
      `https://sportify.zeabur.app/api/v1/courses/search-courses`,
      {
        params: { keyword }
      }
    )
    allCourses.value = data.data || []
    paginateCourses()
  } else {
    const { data } = await axios.get(
      `https://sportify.zeabur.app/api/v1/courses`,
      {
        params: {
          page: currentPage.value,
          skillId: currentType.value,
          sortBy: currentSort.value
        }
      }
    )
    paginatedCourses.value = data.data
    filters.value = data.meta.filter
    pagination.value = data.meta.pagination
  }

  console.log(`✅ API 回應 #${debugInfo.value.fetchCount}:`, {
    coursesCount: paginatedCourses.value.length,
    totalPages: totalPages.value
  })
}

async function fetchSkill() {
  const { data } = await axios.get(
    `https://sportify.zeabur.app/api/v1/courses/course-type`
  )
  skills.value = data.data
}

function handleCategoryClick(skillId) {
  console.log(`🎯 分類點擊:`, skillId)

  currentType.value = skillId
  currentPage.value = 1

  const query = {
    page: currentPage.value,
    skillId: currentType.value,
    sortBy: currentSort.value
  }
  // 🔍 除錯：記錄路由推送
  debugInfo.value.routerPushCount++
  debugInfo.value.lastRouterPush = {
    type: 'category',
    query: { ...query },
    timestamp: new Date().toISOString()
  }
  console.log(`🚀 路由推送 #${debugInfo.value.routerPushCount} (分類):`, query)

  router.push({
    path: '/courses',
    query
  })
}

function handleSortClick(sortKey) {
  console.log(`🎯 排序點擊:`, sortKey, '當前排序:', currentSort.value)

  currentSort.value = sortKey
  currentPage.value = 1

  const query = {
    page: currentPage.value,
    skillId: currentType.value,
    sortBy: currentSort.value
  }

  // 🔍 除錯：記錄路由推送
  debugInfo.value.routerPushCount++
  debugInfo.value.lastRouterPush = {
    type: 'sort',
    query: { ...query },
    timestamp: new Date().toISOString()
  }

  console.log(`🚀 路由推送 #${debugInfo.value.routerPushCount} (排序):`, query)

  router.push({
    path: '/courses',
    query
  })
}

onMounted(async () => {
  console.log('📍 組件掛載，初始參數:', {
    page: currentPage.value,
    skillId: currentType.value,
    sortBy: currentSort.value,
    keyword: route.query.keyword
  })

  await fetchCourses()
  await fetchSkill()
})

watch(
  [currentPage, currentType, currentSort],
  ([newPage, newType, newSort], [oldPage, oldType, oldSort]) => {
    console.log('📊 狀態變化:', {
      page: { old: oldPage, new: newPage },
      type: { old: oldType, new: newType },
      sort: { old: oldSort, new: newSort },
      hasKeyword: !!route.query.keyword
    })
  },
  { deep: true }
)

watch(
  () => route.query.keyword,
  (newKeyword, oldKeyword) => {
    console.log('🔍 關鍵字變化:', { old: oldKeyword, new: newKeyword })
    fetchCourses()
  }
)

watch(
  () => route.query,
  (newQuery, oldQuery) => {
    console.log('🛣️ 路由查詢參數變化:', { old: oldQuery, new: newQuery })

    // 只有在非搜尋模式下才同步狀態並抓取資料
    if (!newQuery.keyword) {
      const page = Number(newQuery.page) || 1
      const skillId = newQuery.skillId || ''
      const sortBy = newQuery.sortBy || 'popular'

      console.log('🔄 準備同步狀態:', { page, skillId, sortBy })

      // 同步狀態
      currentPage.value = page
      currentType.value = skillId
      currentSort.value = sortBy

      // 抓取資料
      fetchCourses()
    } else {
      console.log('🔄 搜尋模式，跳過狀態同步')
    }
  },
  { immediate: false }
)
</script>

<style scoped lang="scss">
.container {
  // padding: 0;
  // max-width: 1296px;
  @media (max-width: 992px) {
    padding: 0 24px;
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

.sort-btn-group {
  > .btn {
    padding: 8px 16px;
    background-color: $body-bg;
    border: 0;
    border-color: $body-bg;
    color: $grey-000;
    &:hover {
      background-color: $primary-300;
      color: $primary-700;
    }
    &.active {
      background-color: $primary-700;
      color: $primary-000;
    }
  }
}

.dropdown-toggle {
  border: 0;
  padding: 8px 20px 8px 16px;
  box-shadow: inset 0 0 0 1px $grey-400;
  &::after {
    margin-left: 19px;
    border-top: 5px solid;
    border-right: 5px solid transparent;
    border-bottom: 0;
    border-left: 5px solid transparent;
  }
}

.dropdown-menu {
  min-width: 100%;
  background-color: $grey-000;
  box-shadow: inset 0 0 0 1px $grey-400;
  padding: 8px;
  border: 0px;
  // transform: translate(0px, 480px);
  & li {
    &:not(:last-child) {
      padding-bottom: 8px;
    }
    > .dropdown-item {
      color: $primary-600;
      text-align: center;
      padding: 12px 41.5px;
    }
  }
}

.card-section {
  margin: 40px 0px 80px 0px;
  @media (max-width: 992px) {
    margin: 32px 0px 40px 0px;
  }
}

.card {
  width: 405.3px;
  max-width: 100%;
  min-width: 327px;
  height: 550px;
  border: 0px;
  border-radius: 16px;
  box-shadow:
    0px 0px 5px #5e8edd,
    inset 0px 0px 0px 1px $primary-000;
  padding: 24px;
  background: rgba(252, 252, 252, 0.1);
  @media (max-width: 576px) {
    min-width: 100%;
  }
}

.badge {
  box-shadow: inset 0px 0px 0px 1px $primary-400;
  border-radius: 100px;
  line-height: 150%;
  padding: 4px 8px;
  top: 36px;
  left: 36px;
}

.card-img-top {
  height: 240px;
  object-fit: cover;
}

.card-body {
  padding: 24px 0px 0px 0px;
  div {
    margin-bottom: 12px;
  }
  p,
  span {
    margin-bottom: 0;
  }
}

// 後面考慮直接改共用scss檔
.fs-7-bold {
  line-height: 1.5;
  font-weight: 700;
}
.fs-7 {
  line-height: 1.5;
}

.material-symbols-outlined {
  color: $secondary-600;
  padding-right: 8px;
  &.star {
    font-variation-settings: 'FILL' 1;
  }
}

.card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.card-link {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0px;
  & a {
    color: $grey-000;
  }
}

.pagination > .page-item > .page-link {
  border: 0;
  color: $body-color;
  background-color: $body-bg;
  padding: 8px 16px;
  &:hover {
    color: $primary-700;
    background-color: $primary-300;
  }
}

.page-item.active .page-link {
  color: $primary-100;
  background-color: $primary-700;
}

.page-item.disabled .page-link {
  opacity: 0.4;
}

.page-item {
  @media (max-width: 992px) {
    margin: 0 5px;
  }
}
.types-btn-wrapper {
  overflow-x: auto; // 保留橫向捲動
}
/* Chrome/Safari/Webkit */
.types-btn-wrapper::-webkit-scrollbar {
  display: none;
}
.pagination .page-link {
  cursor: pointer;
}
</style>
