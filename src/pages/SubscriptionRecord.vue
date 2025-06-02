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
              <p v-else class="fs-6 text-muted mb-0">已到期／不續訂</p>
            </div>
            <div class="mb-lg-0 mb-5 ms-lg-9">
              <p class="fs-4 fw-bold mb-lg-6">可觀看類別</p>
              <div class="d-flex">
                <!-- 只有一個「全類別」按鈕 -->
                <template v-if="courseTypes.length > 3">
                  <button class="btn btn-primary-600">全類別</button>
                </template>

                <!-- 否則才一個一個列出各別類別按鈕 -->
                <template v-else>
                  <button
                    v-for="(type, idx) in courseTypes"
                    :key="type.id"
                    class="btn btn-primary-600"
                    :class="{ 'me-2': idx < courseTypes.length - 1 }"
                  >
                    {{ type.name }}
                  </button>
                </template>
              </div>
            </div>
            <div class="mb-lg-0 mb-5 ms-lg-10">
              <p class="fs-4 fw-bold mb-lg-6">NT$ {{ records[0].price }}</p>
              <button
                class="btn btn-secondary-700 fw-bold"
                :disabled="isCancelling"
                @click="onCancelClick"
              >
                {{ isCancelling ? '取消中...' : '取消訂閱' }}
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

const route = useRoute()

// 1. 資料列表
const records = ref([])
// 2. 後端 meta
const meta = ref({ page: 1, total_pages: 1 })
// 3. 本地 currentPage（用來綁 UI）
const currentPage = ref(1)
// 4. 計算 totalPages
const totalPages = computed(() => meta.value.total_pages)

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
        nextPayment: item.next_payment
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

// 6. 切頁函式
function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  fetchSubscriptions(page)
}

// 用來存放後端回傳的「可觀看課程類別」陣列
const courseTypes = ref([])

async function fetchCourseTypes() {
  const token = localStorage.getItem('token')
  if (!token) {
    // 如果你需要強制登入才能拿，就自己跳到 login
    return
  }

  try {
    const res = await axios.get(
      'https://sportify.zeabur.app/api/v1/users/course-type',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (res.data.status) {
      courseTypes.value = res.data.data
      // 範例回傳 data 形如：[ { id: "...", name: "瑜珈" }, ... ]
    }
  } catch (err) {
    console.error('取得課程類別失敗：', err)
  }
}

// 取消訂閱
const isCancelling = ref(false)

async function onCancelClick() {
  if (isCancelling.value) return
  isCancelling.value = true

  try {
    // 1. 向你自己的後端拿「送給綠界取消訂閱的參數」
    const token = localStorage.getItem('token')
    const res = await axios.post(
      '/api/v1/users/cancel-payment',
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (!res.data.status || !res.data.data) {
      throw new Error(res.data.message || '後端參數取得失敗')
    }

    const { MerchantID, MerchantTradeNo, Action, TimeStamp, CheckMacValue } =
      res.data.data

    // 2. 用這五個欄位動態建立一個隱藏 form，並自動送到綠界的取消訂閱網址
    const ecpayUrl =
      'https://payment-stage.ecpay.com.tw/Cashier/CreditCardPeriodAction'

    // 建一個 <form>，把必要的 <input> 都塞進去
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', ecpayUrl)
    form.style.display = 'none' // 隱藏在頁面上

    // helper：封裝一個 createHiddenInput(name, value)
    const createHiddenInput = (name, value) => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', name)
      input.setAttribute('value', value)
      return input
    }

    form.appendChild(createHiddenInput('MerchantID', MerchantID))
    form.appendChild(createHiddenInput('MerchantTradeNo', MerchantTradeNo))
    form.appendChild(createHiddenInput('Action', Action))
    form.appendChild(createHiddenInput('TimeStamp', TimeStamp))
    form.appendChild(createHiddenInput('CheckMacValue', CheckMacValue))

    // 把 form 暫時加入到 document.body
    document.body.appendChild(form)

    // 自動送出表單
    form.submit()

    // （選擇性）送出之後可以把 form 從 DOM 移除
    document.body.removeChild(form)
  } catch (err) {
    console.error('取消訂閱流程失敗：', err)
    alert(err.response?.data?.message || err.message || '取消訂閱失敗')
  } finally {
    isCancelling.value = false
  }
}
// 7. 初始呼叫
onMounted(async () => {
  await initUser()
  fetchSubscriptions(1)
  fetchCourseTypes()
})
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
