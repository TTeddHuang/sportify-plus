<template>
  <div class="container">
    <div class="d-flex">
      <!-- 左側選單 -->
      <div class="side-nav d-lg-block d-none">
        <div class="px-3 py-5">
          <h3 class="fs-6 px-3 fw-bold">學習中心</h3>
          <hr class="divider my-5" />
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item"
              :class="{ active: route.path === '/user/courses' }"
            >
              <router-link to="/user/courses" class="nav-link">
                我的課程
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/user/subscriptions' }"
            >
              <router-link to="/user/subscriptions" class="nav-link">
                訂閱紀錄
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/user/profile' }"
            >
              <router-link to="/user/profile" class="nav-link">
                編輯個人資料
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 外框顏色 -->
      <div class="p-lg-8 px-5 py-8 w-100" style="max-width: 1056px">
        <h2 class="fs-lg-4 mb-lg-8 mb-6">訂閱紀錄</h2>
        <p class="fs-6">目前方案</p>
        <div class="subscription-card">
          <div class="card-wrapper"></div>
          <div
            v-if="records.length > 0"
            class="card-content p-5 d-lg-flex gap-12 mb-5"
          >
            <div class="mb-lg-0 mb-5">
              <p class="fs-4 fw-bold mb-lg-6 mb-1">{{ records[0].plan }}</p>
              <p
                v-if="records.length > 0 && records[0].nextPayment"
                class="fs-6 fw-bold mb-0 pe-lg-3 py-lg-1"
              >
                下一次收費日期：{{ records[0].nextPayment }}
              </p>
              <p v-else class="fs-6 mb-0">已到期／不續訂</p>
            </div>
            <div class="mb-lg-0 mb-5 ms-lg-9">
              <p class="fs-4 fw-bold mb-lg-6">可觀看類別</p>
              <p v-if="courseType.length > 3" class="btn btn-primary-600 me-2">
                所有
              </p>
              <div v-else class="d-flex">
                <p
                  v-for="type in courseType"
                  :key="type.skill_id"
                  class="btn btn-primary-600 me-2"
                >
                  {{ type.course_type }}
                </p>
              </div>
            </div>
            <div class="mb-lg-0 mb-5 ms-lg-10">
              <p class="fs-4 fw-bold mb-lg-6">NT$ {{ records[0].price }}</p>
              <button
                class="btn btn-secondary-700 fw-bold"
                @click="unsubscribe(records[0].tradeNo)"
              >
                取消訂閱
              </button>
            </div>
          </div>
        </div>
        <p class="fs-6">訂閱紀錄</p>
        <div class="subscription-card">
          <div class="card-wrapper"></div>
          <div class="card-content p-5 mb-5">
            <div class="table-responsive">
              <table class="table table-striped mb-0 align-middle">
                <thead class="">
                  <tr class="text-start">
                    <th class="th-custom">日期</th>
                    <th class="th-custom">訂單編號</th>
                    <th class="th-custom">付款內容</th>
                    <th class="th-custom">訂閱期間</th>
                    <th class="th-custom">付款方式</th>
                    <th class="th-custom">發票</th>
                    <th class="th-custom">金額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in records" :key="item.id">
                    <td class="td-custom">{{ item.date }}</td>
                    <td class="td-custom">{{ item.orderNumber }}</td>
                    <td class="td-custom">{{ item.plan }}</td>
                    <td class="td-custom">{{ item.period }}</td>
                    <td class="td-custom">{{ item.paymentMethod }}</td>
                    <td class="td-custom">
                      <a
                        :href="item.invoiceUrl"
                        target="_blank"
                        class="text-decoration-none"
                      >
                        檢視
                      </a>
                    </td>
                    <td class="td-custom">NT$ {{ item.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 分頁（若需要） v-if="meta.total_pages > 1" -->
        <div class="mt-11">
          <nav class="d-flex justify-content-center" style="padding-top: 4px">
            <ul class="pagination mb-0">
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                @click="changePage(currentPage - 1)"
              >
                <a class="page-link me-lg-11">上一頁</a>
              </li>

              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item mx-2"
                :class="{ active: page === currentPage }"
                @click="changePage(page)"
              >
                <a class="page-link">{{ page }}</a>
              </li>

              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
                @click="changePage(currentPage + 1)"
              >
                <a class="page-link ms-lg-11">下一頁</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { initUser } from '@/store/user'
import { cancelPayment } from '@/api/cancelPayment'

const route = useRoute()

// 1. 資料列表
const records = ref([])
// 2. 後端 meta
const meta = ref({ page: 1, total_pages: 1 })
// 3. 本地 currentPage（用來綁 UI）
const currentPage = ref(1)
// 4. 計算 totalPages
const totalPages = computed(() => meta.value.total_pages)
// 存放課程類別
const courseType = ref([])

// 5. 抓資料
async function fetchSubscriptions(page = 1) {
  const token = localStorage.getItem('token')
  const userWrapper = JSON.parse(localStorage.getItem('user'))
  const userId = userWrapper?.data?.id || userWrapper?.id
  if (!token || !userId) return route.push('/login')

  try {
    const res = await axios.get(
      'https://sportify.zeabur.app/api/v1/users/subscriptions',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { page }
      }
    )
    // 呼叫取得課程類別API並存放
    courseType.value = await getCourseType(token)

    if (res.data.status) {
      // 你要的欄位映射
      records.value = res.data.data.map(item => ({
        id: item.id,
        date: item.purchased_at,
        orderNumber: item.order_number,
        plan: item.plan,
        period: item.period,
        paymentMethod: item.payment_method,
        invoiceUrl: item.invoice_image_url,
        price: item.price,
        nextPayment: item.next_payment,
        tradeNo: item.merchant_trade_no
      }))
      // 更新後端回傳的 meta
      meta.value = res.data.meta
      // 同步本地 currentPage
      currentPage.value = res.data.meta.page
    }
  } catch (err) {
    console.error('取得訂閱紀錄失敗：', err.response?.data || err)
  }
}

// 取得可觀看課程類別API
async function getCourseType(token) {
  const res = await axios.get(
    'https://sportify.zeabur.app/api/v1/users/course-type',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.data.data
}

// 6. 切頁函式
function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  fetchSubscriptions(page)
}

// 7. 初始呼叫
onMounted(async () => {
  await initUser()
  fetchSubscriptions(1)
})

async function unsubscribe(MerchantTradeNo) {
  const token = localStorage.getItem('token')
  await cancelPayment(token, MerchantTradeNo)
}
</script>

<style scoped lang="scss">
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

.page-link {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: $primary-000;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(48, 79, 254, 0.1);
  }
}
.page-item.active .page-link {
  background-color: $primary-700;
  color: $primary-100;
}

.page-item.disabled .page-link {
  opacity: 0.4;
  cursor: not-allowed;
}
.card-wrapper {
  background-color: $primary-600;
  border-radius: 15px 15px 0 0;
  height: 50px;
}
.card-content {
  border-radius: 15px;
  background-color: $primary-000;
  margin-top: -38px;
  padding: 24px;
  color: black;
}
.th-custom {
  color: $primary-900;
  background: $primary-000;
  font-size: 20px;
}
.td-custom {
  color: $primary-900;
  background: $primary-000;
  font-size: 14px;
}
.table-striped > tbody > tr:nth-of-type(odd) > td {
  background-color: $primary-000; /* 你想要的斑馬底色 */
}
</style>
