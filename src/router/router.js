import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue'
import ResetPasswordPage from '@/pages/ResetPasswordPage.vue'
import CoachRegisterPage from '@/pages/CoachRegisterPage.vue'
import UserSubscriptionPage from '@/pages/UserSubscriptionPage.vue'
import BecomeCoachPage from '@/pages/BecomeCoachPage.vue'
import CourseDetailPage from '@/pages/CourseDetailPage.vue'
import CoursesPage from '@/pages/CoursesPage.vue'
import LearningCourses from '@/pages/LearningCourses.vue'
import SubscriptionRecord from '@/pages/SubscriptionRecord.vue'
import CoachesPage from '@/pages/CoachesPage.vue'
import CoachDetailPage from '@/pages/CoachDetailPage.vue'
import CoachConsoleLayout from '@/pages/CoachConsoleLayout.vue'
import CoachNewCourse from '@/pages/CoachNewCourse.vue'
import CoachProfile from '@/pages/CoachProfile.vue'
import CoachCourses from '@/pages/CoachCourses.vue'
import CoachEarnings from '@/pages/CoachEarnings.vue'
import VideoCourses from '@/pages/VideoCourses.vue'
import AdminCourses from '@/pages/AdminCourses.vue'
import AdminCoaches from '@/pages/AdminCoaches.vue'
import AdminUsers from '@/pages/AdminUsers.vue'

import { user, userRole } from '@/store/user'

const routes = [
  // 不需登入，所有身分均可觀看
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/users/signup', component: RegisterPage },

  { path: '/forgot-password', component: ForgotPasswordPage },
  {
    path: '/api/v1/auth/reset-password',
    name: 'ResetPassword',
    component: ResetPasswordPage
  },
  { path: '/coaches/signup', component: CoachRegisterPage },
  { path: '/users/subscription', component: UserSubscriptionPage },
  { path: '/become-coach', component: BecomeCoachPage },
  { path: '/courses', component: CoursesPage },
  {
    path: '/courses/:courseId/details',
    name: 'CourseDetails',
    component: CourseDetailPage,
    props: true
  },
  { path: '/coaches', component: CoachesPage },
  {
    path: '/coaches/:coachId',
    name: 'CoachDetails',
    component: CoachDetailPage,
    props: true
  },
  // 學員後台，需登入，需學員身分
  {
    path: '/user/courses',
    component: LearningCourses,
    meta: { requiresAuth: true, requiredRole: 'user', hideFooter: true }
  },
  {
    path: '/user/courses/:courseId/details',
    name: 'VideoCourses',
    component: VideoCourses,
    props: true,
    meta: { requiresAuth: true, requiredRole: 'user', hideFooter: true }
  },
  {
    path: '/user/subscriptions',
    component: SubscriptionRecord,
    meta: { requiresAuth: true, requiredRole: 'user', hideFooter: true }
  },
  {
    path: '/user/profile',
    component: ProfilePage,
    meta: { requiresAuth: true, requiredRole: 'user', hideFooter: true }
  },
  // 教練後台，需登入，需教練身分
  {
    path: '/coach',
    component: CoachConsoleLayout,
    meta: { requiresAuth: true, requiredRole: 'coach', hideFooter: true },
    children: [
      { path: '', redirect: { name: 'CoachCourses' } },
      {
        path: 'courses/new',
        name: 'CoachNewCourse',
        component: CoachNewCourse
      },
      { path: 'profile', name: 'CoachProfile', component: CoachProfile },
      { path: 'courses', name: 'CoachCourses', component: CoachCourses },
      { path: 'earnings', name: 'CoachEarnings', component: CoachEarnings }
    ]
  },
  // 管理者後台，需登入，需管理者身分
  {
    path: '/admin/courses',
    name: 'AdminCourses',
    component: AdminCourses,
    meta: { requiresAuth: true, requiredRole: 'admin', hideFooter: true }
  },
  {
    /* 新增：帶 courseId 參數（/admin/courses/123） */
    path: '/admin/courses/:courseId',
    name: 'AdminCourseDetail', // ← 新名字
    component: AdminCourses, // 同一隻元件
    props: true, // 可選：讓 courseId 自動成為 prop
    meta: { requiresAuth: true, requiredRole: 'admin', hideFooter: true }
  },
  {
    path: '/admin/coaches',
    component: AdminCoaches,
    meta: { requiresAuth: true, requiredRole: 'admin', hideFooter: true }
  },
  {
    path: '/admin/users',
    component: AdminUsers,
    meta: { requiresAuth: true, requiredRole: 'admin', hideFooter: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

router.beforeEach(async (to, from) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredRoleRecord = to.matched.find(record => record.meta.requiredRole)
  const requiredRole = requiredRoleRecord?.meta.requiredRole

  // 需觀看權限但尚未登入
  if (requiresAuth && !token) {
    return { name: 'Login' }
  }

  // 已登入的使用者進入 login 頁，自動導向首頁
  if (to.path === '/login' && token) {
    return { name: 'Home' }
  }

  if (requiresAuth && token && requiredRole) {
    if (!user.value) {
      const { initUser } = await import('@/store/user')
      await initUser()
    }

    const currentRole = userRole.value

    if (currentRole !== requiredRole) {
      return { name: 'Home' }
    }
  }
})

export default router
