<template>
  <div class="container">
    <div class="d-flex">
      <!-- 左側選單 -->
      <div class="side-nav d-lg-block d-none">
        <div class="px-3 py-5">
          <h3 class="fs-6 px-3 fw-bold">學習中心</h3>
          <hr class="divider my-5" />
          <ul class="list-group list-group-flush">
            <li class="list-group-item">我的課程</li>
            <li class="list-group-item">訂閱紀錄</li>
            <li class="list-group-item active">編輯個人資料</li>
          </ul>
        </div>
      </div>
      <!-- 右側主區塊：你的專屬教練群 -->
      <div class="p-lg-8 px-5 py-8 w-100" style="max-width: 1056px">
        <h2 class="fs-lg-4 mb-lg-8 mb-6">你的專屬教練群</h2>
        <div
          class="scrollable-btn-group d-flex flex-row justify-content-between mb-lg-8 mb-6"
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
            <!-- 什麼時候要讓其他分類這個下拉選單出現? -->
            <!-- <div class="dropdown">
          <button
            id="dropdownMenuButton"
            class="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            其他分類
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#">登山</a></li>
            <li><a class="dropdown-item" href="#">有氧</a></li>
            <li><a class="dropdown-item" href="#">滑板</a></li>
          </ul>
        </div> -->
          </div>
          <!-- 排序按鍵 -->
        </div>

        <div class="d-flex flex-wrap course-grid gap-lg-8 gap-md-6">
          <div
            v-for="course in filteredCourses"
            :key="course.id"
            class="mb-4 border rounded-4 course-card"
          >
            <div class="card h-100 rounded-4 border p-5 position-relative">
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
                  :src="course.picture"
                  class="card-img-top mb-5 rounded-3"
                  :alt="course.name"
                  style="object-fit: cover; height: 160px"
                />
                <div class="card-body p-0">
                  <h5 class="card-title fs-7 mb-2">{{ course.name }}</h5>
                  <p class="card-text mb-2">
                    {{ course.coach }}
                  </p>
                  <a href="#" class="btn btn-primary-600 w-100 mb-2"
                    >點擊上課</a
                  >
                  <a href="#" class="btn btn-outline-grey-400 w-100"
                    >為此課程評分</a
                  >
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
import { ref, computed } from 'vue'

import learningCourseImg1 from '@/assets/images/learningCourse-1.png'
import learningCourseImg2 from '@/assets/images/learningCourse-2.png'
import learningCourseImg3 from '@/assets/images/learningCourse-3.png'
import learningCourseImg4 from '@/assets/images/learningCourse-4.png'
import learningCourseImg5 from '@/assets/images/learningCourse-5.png'
import learningCourseImg6 from '@/assets/images/learningCourse-6.png'

const currentType = ref('')
const currentPage = ref(1)
const isFavoriteOnly = ref(false)

const courses = ref([
  {
    id: 'course-001',
    name: '全方位塑造優雅體態',
    picture: learningCourseImg1,
    coach: 'Cindy',
    course_type: '皮拉提斯',
    isFavorited: false
  },
  {
    id: 'course-002',
    name: '從零開始打造強壯體態',
    picture: learningCourseImg2,
    coach: 'Kelly',
    course_type: '重訓',
    isFavorited: false
  },
  {
    id: 'course-003',
    name: '皮拉提斯30天炸裂核心肌群',
    picture: learningCourseImg3,
    coach: 'Chloe',
    course_type: '皮拉提斯',
    isFavorited: false
  },
  {
    id: 'course-004',
    name: '深層修復放鬆瑜伽',
    picture: learningCourseImg4,
    coach: 'Cameron',
    course_type: '瑜伽',
    isFavorited: false
  },
  {
    id: 'course-005',
    name: '身心平衡晨間瑜伽',
    picture: learningCourseImg5,
    coach: 'Shane',
    course_type: '瑜伽',
    isFavorited: false
  },
  {
    id: 'course-006',
    name: '晚安舒眠陰瑜伽',
    picture: learningCourseImg6,
    coach: 'Marjorie',
    course_type: '瑜伽',
    isFavorited: false
  }
])

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
const toggleFavorite = course => {
  course.isFavorited = !course.isFavorited
}
</script>

<style scoped lang="scss">
.side-nav {
  border-left: 1px solid $primary-100;
  border-right: 1px solid $primary-100;
}

.side-nav {
  padding: 0;
  width: 240px;
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

.scrollable-btn-group {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;

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
</style>
