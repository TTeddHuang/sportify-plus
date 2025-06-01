<template>
  <div class="learning-center row container">
    <div class="side-nav col-3">
      <div class="px-3 py-5">
        <h3 class="fs-6 px-3 fw-bold">教練管理後台</h3>
        <hr class="divider my-5" />
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            :class="{ active: route.name === 'CoachNewCourse' }"
          >
            <router-link :to="{ name: 'CoachNewCourse' }" class="nav-link">
              建立新課程
            </router-link>
          </li>
          <li
            class="list-group-item"
            :class="{ active: route.name === 'CoachProfile' }"
          >
            <router-link :to="{ name: 'CoachProfile' }" class="nav-link">
              教練個人資料
            </router-link>
          </li>
          <li
            class="list-group-item"
            :class="{ active: route.name === 'CoachCourses' }"
          >
            <router-link :to="{ name: 'CoachCourses' }" class="nav-link">
              課程資料
            </router-link>
          </li>
          <li
            class="list-group-item"
            :class="{ active: route.name === 'CoachEarnings' }"
          >
            <router-link :to="{ name: 'CoachEarnings' }" class="nav-link">
              教練收益
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view class="col-9"></router-view>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="scss">
.container {
  max-width: 1296px;
  height: 100vh;
  margin: 0 auto;
}

.side-nav {
  border-left: 1px solid $primary-100;
  border-right: 1px solid $primary-100;
}

.side-nav {
  padding: 0;
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
</style>
