<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="header">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo-s.png" alt="Logo" class="img-fluid" />
        </router-link>
      </div>

      <nav class="nav">
        <ul class="list-unstyled d-flex mb-0">
          <li>
            <router-link
              to="/courses"
              class="nav-link btn"
              :class="{ active: route.path.startsWith('/courses') }"
              >課程分類</router-link
            >
          </li>
          <li>
            <router-link
              to="/coaches"
              class="nav-link btn"
              :class="{ active: route.path.startsWith('/coaches') }"
              >教練列表</router-link
            >
          </li>
          <li>
            <router-link
              to="/create-course"
              class="nav-link btn"
              :class="{ active: route.path.startsWith('/create-course') }"
              >我要開課</router-link
            >
          </li>
          <li>
            <router-link
              to="/learning-center"
              class="nav-link btn"
              :class="{ active: route.path.startsWith('/learning-center') }"
              >學習中心</router-link
            >
          </li>
          <li>
            <router-link
              to="/login"
              class="nav-link btn"
              :class="{
                active: route.path === '/login' || route.path === '/register'
              }"
            >
              登入/註冊
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/styles/all.scss';

a,
a:visited,
a:hover,
a:active,
a:focus {
  color: inherit;
  text-decoration: none;
}

.header {
  padding: 16px 0;
}

.logo img {
  max-width: 117px;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.nav-link {
  color: $primary-000;
  margin-left: 8px;
  text-decoration: none;
}

.nav-link:hover {
  background-color: $primary-300;
  color: $primary-700;
  border-radius: 8px;
}
.nav-link:focus {
  color: $primary-000;
}
.router-link-active {
  background-color: $primary-700;
  color: $primary-000;
  border-radius: 8px;
}
</style>
