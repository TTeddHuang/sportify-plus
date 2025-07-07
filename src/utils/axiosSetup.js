import axios from 'axios'
import loadingService from '@/utils/loadingService'

// 設置 axios 全域攔截器
axios.interceptors.request.use(
  config => {
    loadingService.show()

    return config
  },
  error => {
    // 請求錯誤時隱藏 loading
    loadingService.hide()
    console.error('❌ 請求錯誤:', error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // 只有在沒有跳過全域 loading 的情況下才隱藏 loading
    if (!response.config.skipGlobalLoading) {
      loadingService.hide()
    }

    return response
  },
  error => {
    // 只有在沒有跳過全域 loading 的情況下才隱藏 loading
    if (!error.config?.skipGlobalLoading) {
      loadingService.hide()
    }

    console.error(
      '❌ 響應錯誤:',
      error.response?.status,
      error.response?.data || error.message
    )

    // 處理常見錯誤
    if (error.response?.status === 401) {
      // Token 過期處理
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      console.warn('⚠️ Token 過期，請重新登入')
    }

    return Promise.reject(error)
  }
)

export default axios
