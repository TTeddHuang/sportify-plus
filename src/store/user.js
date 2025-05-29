import { ref } from 'vue'
import { getUserProfile } from '@/api/auth'

export const user = ref(null)

export function setUser(data) {
  user.value = data
  localStorage.setItem('token', data.token)
}

export function clearUser() {
  user.value = null
  localStorage.removeItem('token')
}

export async function initUser() {
  const token = localStorage.getItem('token')
  if (token && !user.value) {
    try {
      const profile = await getUserProfile()
      const fullUser = {
        ...profile,
        token
      }
      user.value = fullUser
      localStorage.setItem('user', JSON.stringify(fullUser))
    } catch {
      clearUser()
    }
  }
}
