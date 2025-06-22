# Sportify+ 前端專案

<p align="center">
  <img src="src/assets/images/homepage.png" alt="Sportify+ 首頁預覽" style="max-width: 100%; border-radius: 12px;" />
</p>

本專案為 Sportify+ 健身/運動平台的前端，使用 [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + [Bootstrap 5](https://getbootstrap.com/) 開發，支援教練、學員、管理員多角色功能，並串接 RESTful API。

---

## 目錄

- [安裝與啟動](#安裝與啟動)
- [專案指令](#專案指令)
- [專案結構](#專案結構)
- [主要功能](#主要功能)
- [專案技術](#專案技術)
- [開發工具建議](#開發工具建議)
- [程式碼規範](#程式碼規範)
- [其他說明](#其他說明)

---

## 安裝與啟動

1. 下載專案並進入資料夾
   ```
   git clone https://github.com/TTeddHuang/sportify-plus.git
   cd sportify-plus
   ```
2. 安裝相依套件（建議使用 package-lock.json 版本）
   ```
   npm ci
   ```
3. 啟動本地開發伺服器
   ```
   npm run dev
   ```
4. 打包專案
   ```
   npm run build
   ```
5. 預覽打包後內容
   ```
   npm run preview
   ```

---

## 專案結構

```
src/
  api/           # API 請求模組
  assets/        # 靜態資源（圖片、icon、樣式）
  components/    # 共用元件
  pages/         # 各頁面元件
  router/        # Vue Router 設定
  store/         # 狀態管理
  App.vue        # 入口元件
  main.js        # 入口 JS
```

---

## 主要功能

- **首頁/課程分類/教練列表**：瀏覽課程、教練資訊
- **會員系統**：註冊、登入、權限驗證
- **學員中心**：訂閱管理、課程學習、評價
- **教練後台**：課程建立、影片上傳、個人資料編輯
- **管理員後台**：課程/教練/會員審核與管理
- **搜尋/排序/分頁**：課程與教練支援關鍵字搜尋、分類、熱門/評價排序
- **RWD 響應式設計**：支援桌機、手機

---

## 專案技術

- 使用 [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) 快速建構
- 路由管理採用 [vue-router](https://router.vuejs.org/)
- UI 框架整合 [Bootstrap 5](https://getbootstrap.com/)
- 支援 HLS 串流播放（[hls.js](https://github.com/video-dev/hls.js)）
- 整合 [Mux](https://mux.com/) 串流上傳（@mux/upchunk、mux-embed）
- 支援拖曳排序（[vuedraggable](https://github.com/SortableJS/vue.draggable.next)）
- 輪播/滑動套件 [Swiper](https://swiperjs.com/)
- API 請求管理 [axios](https://axios-http.com/)

---

## 開發工具建議

- [VS Code](https://code.visualstudio.com/)  
  建議安裝以下擴充套件：
  - EditorConfig for VS Code
  - ESLint
  - Prettier - Code formatter
  - Vue - Official

---

## 程式碼規範

- 使用 [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) 自動格式化
- SCSS 變數與 Bootstrap 5 utility class 結合

---

## 其他說明

- **登入權限**：路由有權限守衛，未登入或權限不足會自動導向登入頁或首頁
- **Bootstrap Icons**：已於 `index.html` 引入
- **部署**：支援 GitHub Actions 自動部署（見 `.github/workflows/deploy.yml`）

---
