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

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/users/signup', component: RegisterPage },
  { path: '/profile', component: ProfilePage },
  { path: '/forgot-password', component: ForgotPasswordPage },
  { path: '/coaches/signup', component: CoachRegisterPage },
  { path: '/users/subscription', component: UserSubscriptionPage },
  { path: '/become-coach', component: BecomeCoachPage },
  {
    path: '/courses/:courseId/details',
    name: 'CourseDetails',
    component: CourseDetailPage,
    props: true
  },
  { path: '/courses', component: CoursesPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
