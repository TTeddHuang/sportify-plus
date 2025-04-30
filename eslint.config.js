import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import standard from '@vue/eslint-config-standard'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// ESLint Flat Config（扁平化配置） 的寫法，是從 ESLint v8 開始支援的方式，搭配 ESM module (.eslintrc.js → eslint.config.js

// 用 defineConfig 把一連串設定「像堆積木一樣組合」起來，而不是像 .eslintrc.js 那樣全部集中在一個物件裡
export default defineConfig([
  {
    // 指定哪些檔案會被這組規則掃描
    // name是自訂名稱，用於區分有不同規則時，各自範圍是哪些檔案
    name: 'app/files-to-lint',
    // 專案中的所有 JavaScript、Vue、TS 等檔案都會被 lint
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  // 排除掉打包資料夾、測試覆蓋率、node_modules 等不應該被 lint 的東西
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**']),

  {
    // 寫程式時可以使用像 window、document、process 這類全域變數而不報錯
    languageOptions: {
      // 來自 globals 套件，定義常見平台的全域變數
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // 加入 JS 的基本建議規則（由 ESLint 官方提供）
  js.configs.recommended,
  // 套用 Vue 3 的推薦規則（eslint-plugin-vue）,recommended 包含了完整檢查
  ...pluginVue.configs['flat/recommended'],
  // Vue 官方封裝好的 @vue/eslint-config-standard，對應 StandardJS 的程式碼風格
  ...standard,
  // 關閉會和 Prettier 打架的 ESLint 規則
  skipFormatting,
])
