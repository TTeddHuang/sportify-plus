import './assets/styles/all.scss'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router/router'

// 初始化 axios 攔截器 (自動載入 loading 功能)
import './utils/axiosSetup'

const app = createApp(App)

app.use(router)

app.mount('#app')
