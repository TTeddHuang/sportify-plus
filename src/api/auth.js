import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // 改成你後端的API基礎URL
  headers: {
    'Content-Type': 'application/json'
  }
})

// 登入 API
export async function login({ email, password }) {
  const response = await api.post('/login', { email, password })
  return response.data
}

// 註冊 API
export async function register({ email, password }) {
  const response = await api.post('/register', { email, password })
  return response.data
}

// 驗證登入狀態 API
export async function getUserProfile() {
  const token = localStorage.getItem('token') // 從 localStorage 獲取 token
  const response = await api.get('/profile', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

// 修改會員資料 API
export async function updateUserProfile({ password }) {
  const token = localStorage.getItem('token')
  const response = await api.put(
    '/profile',
    { password },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return response.data
}
