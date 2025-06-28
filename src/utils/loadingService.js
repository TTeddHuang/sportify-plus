import { createApp } from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

class LoadingService {
  constructor() {
    this.loadingInstance = null
    this.pendingRequests = 0
  }

  show() {
    this.pendingRequests++
    
    // 如果已經有 loading 在顯示，就不重複建立
    if (this.loadingInstance) return

    // 建立 loading 元件
    const app = createApp(Loading, {
      active: true,
      'is-full-page': true,
      color: '#ffffff',
      'background-color': 'rgba(0, 0, 0, 0.5)',
      opacity: 0.8,
      width: 64,
      height: 64,
      'z-index': 9999
    })

    // 掛載到頁面
    const container = document.createElement('div')
    container.id = 'global-loading'
    document.body.appendChild(container)
    
    this.loadingInstance = {
      app,
      container,
      instance: app.mount(container)
    }
  }

  hide() {
    this.pendingRequests--
    
    // 當所有請求都完成時才隱藏 loading
    if (this.pendingRequests > 0 || !this.loadingInstance) return

    try {
      // 清理 DOM 和 Vue 實例
      this.loadingInstance.app.unmount()
      document.body.removeChild(this.loadingInstance.container)
      this.loadingInstance = null
    } catch (error) {
      console.error('隱藏 loading 時發生錯誤:', error)
      this.loadingInstance = null
    }
  }

  // 強制清除 (緊急情況使用)
  forceHide() {
    this.pendingRequests = 0
    const container = document.getElementById('global-loading')
    if (container) {
      document.body.removeChild(container)
    }
    this.loadingInstance = null
  }
}

// 導出單例實例
export default new LoadingService()
