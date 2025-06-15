<template>
  <div>
    <div class="card-section d-flex flex-wrap gap-8 ms-8">
      <div
        v-for="course in courses"
        :key="course.course_id"
        class="card position-relative"
      >
        <span
          class="badge fs-9 text-primary-000 position-absolute"
          :class="
            course.is_approved === '已審核' ? 'badge-approved' : 'badge-pending'
          "
          >{{ course.is_approved }}</span
        >
        <img
          :src="course.picture_url"
          class="card-img-top"
          alt="card-img-top"
        />
        <div class="card-body">
          <h5 class="card-title fs-7-bold">{{ course.title }}</h5>
          <div class="d-flex">
            <p class="fs-7">{{ coach.nickname }}</p>
            <span class="fs-7 px-2">I</span>
            <p class="fs-7">{{ coach.job_title }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="d-flex align-items-center">
              <span class="material-symbols-outlined star"> star </span
              ><span>{{ course.score }}</span>
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
            {{ course.description }}
          </p>
          <div class="card-link">
            <button class="btn btn-primary">編輯課程</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const coach = ref([])
const courses = ref([])

async function getCourses() {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('無登入 token')
      return
    }

    const res = await axios.get(
      'https://sportify.zeabur.app/api/v1/coaches/courses',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    courses.value = res.data.data.courses
    coach.value = res.data.data.coach
    console.log(courses.value)
    console.log(coach.value)
  } catch (error) {
    console.error('取得課程失敗:', error)
  }
}
onMounted(async () => await getCourses())
</script>

<style scoped lang="scss">
.card-section {
  margin-top: 40px;
  margin-bottom: 80px;
}

.card {
  max-width: 405.3px;
  min-width: 327px;
  height: 550px;
  border: 0px;
  border-radius: 16px;
  box-shadow:
    0px 0px 5px #5e8edd,
    inset 0px 0px 0px 1px $primary-000;
  padding: 24px;
}

.badge {
  font-weight: 600;
  border-radius: 100px;
  line-height: 150%;
  padding: 4px 8px;
  top: 36px;
  left: 36px;
  &.badge-approved {
    background-color: $success;
  }
  &.badge-pending {
    background-color: $notification;
  }
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
}
</style>
