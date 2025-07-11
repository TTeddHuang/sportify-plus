<!-- 管理員後台報表 -->
<template>
  <div class="container">
    <div class="d-flex">
      <!-- 左側選單 -->
      <div class="side-nav">
        <div class="px-3 py-5">
          <h3 class="fs-6 px-3 fw-bold">管理後臺</h3>
          <hr class="divider my-5" />
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item"
              :class="{ active: route.path === '/admin/courses' }"
            >
              <router-link to="/admin/courses" class="nav-link">
                課程管理
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/admin/subscriptions' }"
            >
              <router-link to="/admin/users" class="nav-link">
                會員管理
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/admin/coaches' }"
            >
              <router-link to="/admin/coaches" class="nav-link">
                教練管理
              </router-link>
            </li>
            <li
              class="list-group-item"
              :class="{ active: route.path === '/admin/coaches' }"
            >
              <router-link to="/admin/reports" class="nav-link">
                報表管理
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右側主區塊 -->
      <div class="p-lg-8 px-2 py-8 w-100" style="max-width: 1056px">
        <!-- 報表名稱與圖表區間 -->
        <div class="card-wrapper"></div>
        <div class="card-content p-5 mb-5">
          <div>
            <div class="d-flex align-items-center gap-3 mb-2">
              <h3>平台儀表板</h3>
              <div>
                <label class="form-label">開始月份</label>
                <VDatePicker
                  v-model="startMonth"
                  mode="month"
                  locale="zh-TW"
                  show-months
                  :columns="1"
                  :popover="popoverOptions"
                />
              </div>
              <div>
                <label class="form-label">結束月份</label>
                <VDatePicker
                  v-model="endMonth"
                  mode="month"
                  locale="zh-TW"
                  show-months
                  :columns="1"
                  :popover="popoverOptions"
                />
              </div>
              <button class="btn btn-primary" @click="applyFilter">查詢</button>
              <!-- 選擇起始月份與結束月份 -->
            </div>
            <div>
              <!-- 數據三欄三張卡片 -->
              <div class="row mb-4 justify-content-space-around">
                <div class="col-12 col-md-4 mb-3">
                  <h6>總收入</h6>
                  <p>今年 {{ reportData.summary.totalIncome }}</p>
                  <p>本月 {{ reportData.summary.currentMonthIncome }}</p>
                </div>
                <div class="col-12 col-md-4 mb-3">
                  <h6>活躍會員數</h6>
                  <p>訂閱總數 {{ reportData.summary.totalMembers }}</p>
                  <p>本月新增 {{ reportData.summary.newMembersThisMonth }}</p>
                </div>
                <div class="col-12 col-md-4 mb-3">
                  <h6>教練與課程數</h6>
                  <p>教練總數 {{ reportData.summary.totalCoaches }}</p>
                  <p>課程總數 {{ reportData.summary.totalCourses }}</p>
                </div>
              </div>
              <!-- 圖表兩欄 -->
              <div class="row mb-4 align-items-center">
                <div class="col-12 col-md-4 mb-3">
                  <h5>訂閱方案人數比例圖</h5>
                  <Pie
                    v-if="reportData.subscriptionPieChartData"
                    :data="reportData.subscriptionPieChartData"
                    :options="pieChartOptions"
                  ></Pie>
                </div>
                <div class="col-12 col-md-8 mb-3">
                  <h5>訂閱運動種類人數一覽</h5>
                  <Bar
                    v-if="reportData.barChartData"
                    :data="reportData.barChartData"
                    :options="barChartOptions"
                  ></Bar>
                </div>
              </div>
              <div
                class="one-column-chart-container row mb-4 align-items: center"
              >
                <h5>訂閱方案人數變化</h5>
                <Line
                  v-if="lineChartData"
                  :data="lineChartData"
                  :options="lineChartOptions"
                ></Line>
              </div>
              <div
                class="one-column-chart-container row mb-4 align-items: center"
              >
                <h5>教練分潤比例圖</h5>
                <Pie
                  v-if="reportData.coachProfitPieChartData"
                  :data="reportData.coachProfitPieChartData"
                  :options="coachProfitPieChartOptions"
                ></Pie>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Interaction
} from 'chart.js'

import { Pie, Bar, Line } from 'vue-chartjs'
import { DatePicker as VDatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()

// 註冊chart.js元件
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
)

// 儲存api回傳資料
const reportData = ref({
  summary: {
    totalIncome: 0,
    currentMonthIncome: 0,
    totalMembers: 0,
    newMembersThisMonth: 0,
    totalCoaches: 0,
    totalCourses: 0
  }
})
const lineChartData = ref(null)

// 設定月份

// 預設為前6個月到當月
const today = dayjs()
const sixMonthsAgo = today.subtract(6, 'month').startOf('month')

// 狀態
const startMonth = ref(sixMonthsAgo.toDate())
const endMonth = ref(today.startOf('month').toDate())

// popover options: 讓 datepicker 以彈出模式顯示
const popoverOptions = {
  placement: 'bottom-start'
}

// 送出選取月份
const applyFilter = () => {
  if (!startMonth.value || !endMonth.value) {
    alert('請選擇起始月份與結束月份')
    return
  }

  const start = dayjs(startMonth.value)
  const end = dayjs(endMonth.value)

  if (start.isAfter(end)) {
    alert('開始月份不能晚於結束月份')
    return
  }

  const startString = start.format('YYYY-MM')
  const endString = end.format('YYYY-MM')

  console.log(`查詢從 ${startString} 到 ${endString}的報表`)
}

// 取得後台報表資料
const loadReportData = async () => {
  try {
    // 假資料
    const subscriptionPieData = [
      { name: 'Wellness', proportion: 30, amount: 180 },
      { name: 'Fitness', proportion: 40, amount: 240 },
      { name: 'Eagerness', proportion: 30, amount: 180 }
    ]

    const sportsTypeData = {
      swimming: 200,
      basketball: 320,
      workout: 120,
      mountainClimbing: 250
    }
    const coachProfitData = [
      { name: 'coachA', share: 36, amount: 18000 },
      { name: 'coachB', share: 32, amount: 16000 },
      { name: 'coachC', share: 20, amount: 10000 },
      { name: 'others', share: 12, amount: 6000 }
    ]
    reportData.value = {
      summary: {
        totalIncome: 12345,
        currentMonthIncome: 11900,
        totalMembers: 100,
        newMembersThisMonth: 3,
        totalCoaches: 6,
        totalCourses: 7
      },
      subscriptionPieChartData: {
        labels: subscriptionPieData.map(s => s.name),
        datasets: [
          {
            label: '訂閱方案',
            data: subscriptionPieData.map(s => s.proportion)
          }
        ],
        rawAmounts: subscriptionPieData.map(s => s.amount)
      },
      barChartData: {
        labels: Object.keys(sportsTypeData).map(k => k),
        datasets: [
          {
            label: '人數',
            data: Object.values(sportsTypeData)
          }
        ]
      },
      coachProfitPieChartData: {
        labels: coachProfitData.map(c => c.name),
        datasets: [
          {
            label: '分潤比例',
            data: coachProfitData.map(c => c.share)
          }
        ],
        rawAmounts: coachProfitData.map(c => c.amount)
      }
    }
    // const token = localStorage.getItem('token')
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2YTEyMmUwLThiMzEtNDU3NS1hODhjLTlmNDVhNDUwYmUwMiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MjE4MTExMSwiZXhwIjoxNzU0NzczMTExfQ.RnyyWo_Rj5uDoX1ldUamhgklVjuwMEYVUy6-8sXT0Ng'
    // const response = await axios.get(
    //   `http://localhost:8080/api/v1/admin/data-analysis`
    // )
  } catch (err) {
    console.err('讀取管理員報表資料失敗')
  }
}
onMounted(() => {
  loadReportData()
  lineChartData.value = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      { label: '總訂閱數', data: [400, 420, 450, 470, 500, 520] },
      { label: 'Wellness', data: [200, 220, 250, 170, 200, 220] },
      { label: 'Fitness', data: [100, 100, 90, 150, 150, 150] },
      { label: 'Eagerness', data: [100, 100, 110, 150, 150, 150] }
    ]
  }
})

// 轉換line chart資料
// function transformLineChartData (apiData){
//     if(!apiData||apiData.length===0){
//         return{
//             labels:[],
//             datasets:[]
//         }
//     }
//     const labels=apiData.map(item=>item.)
// }

// 圖表隨機顏色
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// 圖表options

const barChartOptions = {
  responsive: true,
  scales: {
    y: { beginAtZero: true }
  },
  plugins: { legend: { display: true }, title: { display: true } },
  text: '訂閱運動種類人數一覽'
}
// 訂閱人數比例的圓餅圖options
const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const dataset = tooltipItem.dataset // 取得對應data物件
          const index = tooltipItem.dataIndex // 取得資料索引
          const value = dataset.data[index]
          const rawAmounts = tooltipItem.chart.data.rawAmounts // 整個data物件，rawAmounts是自定義的金額
          const amount = rawAmounts ? rawAmounts[index] : 0
          return `${tooltipItem.label}: ${value}% / ${amount}人`
        }
      }
    }
  }
}

// 教練分潤比例的圓餅圖options
const coachProfitPieChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        // 設定hover時會顯示的資訊
        label: function (tooltipItem) {
          const dataset = tooltipItem.dataset // 取得對應data物件
          const index = tooltipItem.dataIndex // 取得資料索引
          const value = dataset.data[index]
          const rawAmounts = tooltipItem.chart.data.rawAmounts // 整個data物件，rawAmounts是自定義的金額
          const amount = rawAmounts ? rawAmounts[index] : 0
          return `${tooltipItem.label}: ${value}% / NT$${amount.toLocaleString()}`
        }
      }
    }
  }
}

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false, // 圖表填滿容器高度
  scales: {
    x: { title: { display: true, text: '月份' } },
    y: { beginAtZero: true, title: { display: true, text: '訂閱人數' } }
  },
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: '訂閱方案人數變化'
    },
    tooltip: {
      mode: 'index', // hover時顯示x軸對應所有dataset
      intersect: false
    },
    Interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }
}
</script>

<style scoped lang="scss">
h6 {
  margin-bottom: 1rem;
}
.side-nav {
  border-left: 1px solid $primary-100;
  border-right: 1px solid $primary-100;
  padding: 0;
  width: 240px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
@media (max-width: 1024px) {
  .side-nav {
    display: none;
  }
}
.container > .d-flex {
  align-items: stretch; // 這你已經有加了
  min-height: 100vh; // 關鍵：讓整個容器最小高度滿版
}

.divider {
  opacity: 1;
  border: 0;
  border-top: 1px solid $primary-000;
}

.list-group {
  .list-group-item {
    border: none;
    padding: 12px 16px;
    margin-bottom: 8px;
  }
  .active {
    border-radius: 4px;
    color: $primary-100;
  }
}

.card-wrapper {
  background-color: $primary-600;
  border-radius: 15px 15px 0 0;
  height: 50px;
}
.card-content {
  border-radius: 15px;
  background-color: $grey-000;
  border: 1px solid $primary-600;
  margin-top: -38px;
  padding: 24px;
  color: black;
}
.one-column-chart-container {
  max-width: 600px;
  height: 450px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
