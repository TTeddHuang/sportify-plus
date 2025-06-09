<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { user, userRole, initUser, clearUser } from '@/store/user'

const route = useRoute()
const router = useRouter()

const isLogin = computed(() => !!user.value)
const userName = computed(() => user.value?.displayName || '使用者')
const avatar = computed(() => {
  const url = user.value?.profile_image_url
  return url && url !== 'null' ? url : null
})

// 角色判斷
const isUser = computed(() => userRole.value === 'user')
const isCoach = computed(() => userRole.value === 'coach')
const isAdmin = computed(() => userRole.value === 'admin')

// 根據角色權限顯示不同類別
const navItems = computed(() => {
  const baseItems = [
    { to: '/courses', label: '課程分類', show: true },
    { to: '/coaches', label: '教練列表', show: true }
  ]

  if (!isLogin.value) {
    baseItems.push({ to: '/become-coach', label: '我要開課', show: true })
  }

  return baseItems.filter(item => item.show)
})

const centerLink = computed(() => {
  if (isCoach.value) return '/coach/courses'
  if (isUser.value) return '/user/courses'
  if (isAdmin.value) return '/admin'
  return ''
})

const centerLabel = computed(() => {
  if (isCoach.value) return '教練後台'
  if (isUser.value) return '學習中心'
  if (isAdmin.value) return '管理後台'
  return ''
})

const menuItems = computed(() => {
  if (isCoach.value) {
    return [
      { to: '/coach/courses/new', label: '建立新課程', icon: 'bi-plus-circle' },
      { to: '/coach/courses', label: '我的課程資料', icon: 'bi-collection' },
      { to: '/coach/profile', label: '編輯個人資料', icon: 'bi-person-gear' },
      { to: '/coach/earnings', label: '收益管理', icon: 'bi-graph-up' }
    ]
  } else if (isUser.value) {
    return [
      { to: '/user/courses', label: '我的課程' },
      { to: '/user/subscriptions', label: '訂閱紀錄' },
      { to: '/user/profile', label: '編輯個人資料' }
    ]
  } else if (isAdmin.value) {
    return [
      { to: '/admin/courses', label: '課程管理' },
      { to: '/admin/users', label: '會員管理' },
      { to: '/admin/coaches', label: '教練管理' },
      { to: '/admin/reports', label: '報表管理' }
    ]
  }
  return []
})

onMounted(async () => {
  await initUser()
})

function handleLogout() {
  clearUser()
  router.push('/')
}

</script>

<template>
  <header
    class="header navbar navbar-expand-lg border-bottom border-primary-000 py-3"
  >
    <div class="container d-flex align-items-center">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo-s.png" alt="Logo" class="img-fluid" />
        </router-link>
      </div>

      <nav class="d-none d-lg-block ms-auto">
        <ul class="navbar-nav d-flex flex-row mb-0 align-items-center">
          <li v-for="item in navItems" :key="item.to" class="nav-item me-3">
            <router-link
              :to="item.to"
              class="nav-link text-primary-000"
              :class="{ active: route.path.startsWith(item.to) }"
              >{{ item.label }}</router-link
            >
          </li>
          <li v-if="isLogin" class="nav-item me-3">
            <router-link
              :to="centerLink"
              class="nav-link text-primary-000"
              :class="{
                active:
                  route.path.startsWith('/user') ||
                  route.path.startsWith('/coach') ||
                  route.path.startsWith('/admin')
              }"
            >
              {{ centerLabel }}
            </router-link>
          </li>

          <li v-if="isLogin" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center text-primary-000"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                class="rounded-circle me-2 d-flex justify-content-center align-items-center"
                style="width: 40px; height: 40px"
              >
                <img
                  v-if="avatar"
                  :src="avatar"
                  alt="avatar"
                  class="rounded-circle w-100 h-100"
                />
                <span
                  v-else
                  class="default-avatar rounded-circle text-white fw-bold d-flex justify-content-center align-items-center w-100 h-100"
                >
                  {{ userName.charAt(0).toUpperCase() }}
                </span>
              </div>
              <span class="user-name">{{ userName }}</span>
            </a>

            <ul class="dropdown-menu dropdown-menu-end">
              <li v-for="item in menuItems" :key="item.to">
                <router-link :to="item.to" class="dropdown-item">
                  {{ item.label }}
                </router-link>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="handleLogout">
                  登出
                </a>
              </li>
            </ul>
          </li>
          <li v-else class="nav-item">
            <router-link to="/login" class="nav-link text-primary-000">
              登入/註冊
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- 平板或手機板、漢堡圖示 -->
      <div class="d-flex align-items-center">
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasMenu"
          aria-controls="offcanvasMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="isLogin" class="d-lg-none ms-3 dropdown">
          <a
            class="nav-link dropdown-toggle d-flex align-items-center text-primary-000"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div
              class="rounded-circle d-flex justify-content-center align-items-center overflow-hidden"
              style="width: 40px; height: 40px"
            >
              <img
                v-if="avatar"
                :src="avatar"
                alt="avatar"
                class="w-100 h-100 object-fit-cover"
              />
              <span
                v-else
                class="default-avatar text-white fw-bold d-flex justify-content-center align-items-center w-100 h-100"
              >
                {{ userName.charAt(0).toUpperCase() }}
              </span>
            </div>
          </a>

          <ul class="dropdown-menu dropdown-menu-end mt-2">
            <li v-for="item in menuItems" :key="item.to">
              <router-link :to="item.to" class="dropdown-item">
                {{ item.label }}
              </router-link>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="handleLogout">
                登出
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      id="offcanvasMenu"
      class="offcanvas offcanvas-end d-lg-none"
      tabindex="-1"
      aria-labelledby="offcanvasMenuLabel"
      data-bs-dismiss="offcanvas"
    >
      <div class="offcanvas-header"></div>
      <div class="offcanvas-body">
        <ul class="navbar-nav">
          <li v-for="item in navItems" :key="item.to" class="nav-item">
            <router-link :to="item.to" class="nav-link text-primary-000">
              {{ item.label }}
            </router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link :to="centerLink" class="nav-link text-primary-000">
              {{ centerLabel }}
            </router-link>
          </li>
          <li v-else class="nav-item">
            <router-link to="/login" class="nav-link text-primary-000">
              登入/註冊
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/styles/all.scss';

.offcanvas {
  background-color: $grey-000 !important; // 白色背景
  top: 56px !important; // 向下移動，避免遮住 navbar（根據實際 navbar 高度調整）
  height: calc(100% - 56px) !important;
  border-top: 1px solid #ccc;
  box-shadow: 0 4px 12 px rgba(0, 0, 0, 0.1);
}
.offcanvas .nav-link {
  color: $primary-600 !important;
  text-align: center;
}
.dropdown-menu {
  background-color: $grey-000; // 白底
  color: $primary-600; // 主色文字
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.dropdown-menu .dropdown-item {
  color: $primary-600; // 確保選單項目也是主色
  padding: 16px 12px;
}

.dropdown-menu .dropdown-item:hover {
  background-color: $primary-100; // hover 效果可自行定義
  color: $primary-800;
}
.default-avatar {
  background-color: $primary-600;
}
.navbar-nav .dropdown-toggle::after {
  display: none;
}
.d-lg-none .dropdown-toggle::after {
  display: none;
}
.default-avatar {
  background-color: $primary-600;
  font-size: 14px;
}
</style>
