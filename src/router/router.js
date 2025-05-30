import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue'
import CoachRegisterPage from '@/pages/CoachRegisterPage.vue'
import UserSubscriptionPage from '@/pages/UserSubscriptionPage.vue'
import BecomeCoachPage from '@/pages/BecomeCoachPage.vue'
import CourseDetailPage from '@/pages/CourseDetailPage.vue'
import CoursesPage from '@/pages/CoursesPage.vue'
import LearningCourses from '@/pages/LearningCourses.vue'
import SubscriptionRecord from '@/pages/SubscriptionRecord.vue'
import CoachesPage from '@/pages/CoachesPage.vue'
import CoachDetailPage from '@/pages/CoachDetailPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/users/signup', component: RegisterPage },

  { path: '/forgot-password', component: ForgotPasswordPage },
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
  {
    path: '/user/courses',
    component: LearningCourses,
    meta: { requiresAuth: true, hideFooter: true }
  },
  {
    path: '/user/subscriptions',
    component: SubscriptionRecord,
    meta: { hideFooter: true }
  },
  {
    path: '/user/profile',
    component: ProfilePage,
    meta: { hideFooter: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    return next('/login')
  }

  // 已登入的使用者進入 login 頁，自動導向首頁
  if (to.path === '/login' && token) {
    return next('/')
  }

  next()
})

export default router
