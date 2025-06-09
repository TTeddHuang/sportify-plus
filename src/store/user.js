import { ref, computed } from 'vue'
import { getUserProfile } from '@/api/auth'

export const user = ref(null)

export const userRole = computed(() => {
  if (!user.value?.role) return null
  return user.value.role.toLowerCase()
})

export function setUser(data) {
  user.value = data
  localStorage.setItem('token', data.token)
}

export function clearUser() {
  user.value = null
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export async function initUser() {
  const token = localStorage.getItem('token')
  if (token && !user.value) {
    // 先從 localStorage 抓取資料
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.token === token) {
          user.value = userData
          return
        }
      } catch (error) {
        console.error('解析 localStorage 用戶資料失敗:', error)
      }
    }

    // 如果 localStorage 沒有資料或無效，才從 API 抓取
    try {
      const profile = await getUserProfile()
      const fullUser = {
        ...profile,
        token
      }
      user.value = fullUser
      localStorage.setItem('user', JSON.stringify(fullUser))
    } catch (error) {
      clearUser()
    }
  }
}
