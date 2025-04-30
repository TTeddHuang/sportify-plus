import 'bootstrap/scss/bootstrap.scss'
import './assets/styles/all.scss'

// import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router/router'

const app = createApp(App)

app.use(router)

app.mount('#app')
