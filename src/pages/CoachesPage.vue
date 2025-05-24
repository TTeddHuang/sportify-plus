<template>
  <div class="container">
    <h1 class="fs-2 primary-000 my-10">教練列表</h1>
    <div class="d-flex flex-row justify-content-between">
      <!-- 運動類別按鍵 -->
      <div
        class="btn-group types-btn-group gap-1"
        role="group"
        aria-label="Basic outlined button group"
      >
        <button
          class="btn btn-outline-primary"
          :class="{ active: currentType === '' }"
          @click="((currentType = ''), (currentPage = 1))"
        >
          教練類別
        </button>
        <button
          v-for="skill in skills"
          :key="skill.skill_id"
          class="btn btn-outline-primary"
          :class="{ active: currentType === skill.skill_id }"
          @click="((currentType = skill.skill_id), (currentPage = 1))"
        >
          {{ skill.course_type }}
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
    </div>
    <div class="card-section d-flex flex-wrap gap-8">
      <!-- 單一卡片範本-start -->
      <div
        v-for="coach in coaches"
        :key="coach.coach_id"
        class="card position-relative"
      >
        <!-- 教練技能需要嗎? 有複數&空陣列 如何處理 -->
        <!-- <span
          class="badge bg-primary-100 fs-9 text-grey-700 position-absolute"
          >{{ coach.coach_skills[0].skill_name }}</span
        > -->
        <!-- API缺少照片URL，先用random user API 擋一下 -->
        <img
          :src="`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`"
          class="card-img-top"
          alt="card-img-top"
        />
        <div class="card-body">
          <h5 class="card-title fs-7-bold">
            {{ coach.coach_name }}
          </h5>
          <div class="d-flex">
            <p class="fs-7">{{ coach.coach_title }}</p>
          </div>
          <p class="card-text">
            {{ coach.coach_about_me }}
          </p>
          <div class="card-link">
            <a href="#">查看更多</a>
          </div>
        </div>
      </div>
      <!-- 單一卡片範本-end -->
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center mb-0">
        <li
          class="page-item mx-7"
          :class="{ disabled: !pagination.has_previous }"
        >
          <a class="page-link" @click="currentPage--">上一頁</a>
        </li>
        <li
          v-for="page in pagination.total_pages"
          :key="page"
          class="page-item mx-5"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" @click="currentPage = page">{{ page }}</a>
        </li>
        <li class="page-item mx-7" :class="{ disabled: !pagination.has_next }">
          <a class="page-link" @click="currentPage++">下一頁</a>
        </li>
      </ul>
    </nav>
  </div>
  <WaveBannerReverse />
</template>

<script setup>
import WaveBannerReverse from '@/components/WaveBannerReverse.vue'

import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 技能列表
const skills = ref([])
const coaches = ref([])
const pagination = ref({})

const currentPage = ref(Number(route.query.page) || 1)
const currentType = ref(route.query.skillId || '')

async function fetchCoaches() {
  const { data } = await axios.get(
    `https://sportify-backend-1wt9.onrender.com/api/v1/courses/coaches`,
    {
      params: {
        page: currentPage.value,
        skillId: currentType.value
      }
    }
  )
  coaches.value = data.data
  pagination.value = data.meta.pagination
}

async function fetchSkill() {
  const { data } = await axios.get(
    `https://sportify-backend-1wt9.onrender.com/api/v1/courses/course-type`
  )
  skills.value = data.data
}

onMounted(async () => {
  await fetchCoaches()
  await fetchSkill()
})

watch([currentPage, currentType], () => {
  router.push({
    path: '/coaches',
    query: {
      page: currentPage.value,
      skillId: currentType.value
    }
  })
  fetchCoaches()
  fetchSkill()
})
</script>

<style scoped lang="scss">
.container {
  padding: 0;
  max-width: 1296px;
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
  transform: translate(0px, 480px);
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
  -webkit-line-clamp: 4;
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
</style>
