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
              :class="{ active: route.path === '/admin/users' }"
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
              :class="{ active: route.path === '/admin/data-analysis' }"
            >
              <router-link to="/admin/data-analysis" class="nav-link">
                報表管理
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- 右側主區塊 -->
      <div class="p-lg-8 px-5 py-8 w-100" style="max-width: 1056px">
        <div class="d-lg-flex">
          <h2 class="fs-lg-4 mb-lg-8 mb-6">會員管理</h2>

          <div class="d-flex flex-wrap gap-lg-6 gap-1 ms-1 ms-lg-6 mb-5">
            <!-- 選擇類別 -->
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ selectedPlan || '選擇方案' }}
              </button>
              <ul class="dropdown-menu">
                <!-- 全部選項 -->
                <li @click="selectedPlan = ''">
                  <a class="dropdown-item" href="#">選擇方案</a>
                </li>
                <!-- 依 planOptions 生成每一個方案 -->
                <li
                  v-for="plan in planOptions"
                  :key="plan"
                  @click="selectedPlan = plan"
                >
                  <a class="dropdown-item" href="#">{{ plan }}</a>
                </li>
              </ul>
            </div>
            <!-- 文字搜尋（教練名稱模糊搜尋） -->
            <div class="input-group" style="width: 200px; height: 42px">
              <input
                v-model="searchKeyword"
                type="text"
                class="form-control ps-2 border-start-0"
                placeholder="搜尋會員名稱..."
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>

        <div class="card-wrapper"></div>
        <div class="card-content p-5 mb-5">
          <div class="table-responsive">
            <table class="table table-striped mb-0 align-middle wide-table">
              <thead>
                <tr>
                  <th class="th-custom">會員編號</th>
                  <th class="th-custom">會員名稱</th>
                  <th class="th-custom">Email</th>
                  <th class="th-custom">註冊時間</th>
                  <th class="th-custom">目前方案</th>
                  <th class="th-custom">詳細資訊</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user.id">
                  <td class="td-custom">***{{ user.id.slice(-5) }}</td>
                  <td class="td-custom">{{ user.name }}</td>
                  <td class="td-custom">{{ user.email }}</td>
                  <td class="td-custom">{{ formatDate(user.createdAt) }}</td>
                  <td class="td-custom">
                    <template v-if="user.plan === 'fitness方案'">
                      fitness方案
                    </template>

                    <template v-else-if="user.plan === 'wellness方案'">
                      wellness方案
                    </template>

                    <template v-else-if="user.plan === 'eagerness方案'">
                      eagerness方案
                    </template>
                    <template v-else>未訂閱</template>
                  </td>
                  <td class="td-custom">
                    <button
                      class="btn btn-sm btn-primary"
                      @click="openDetailModal(user)"
                    >
                      檢視
                    </button>
                    <!-- 如果需要刪除功能，可以另外寫 -->
                  </td>
                </tr>

                <tr v-if="users.length === 0">
                  <td colspan="5" class="text-center text-muted">
                    暫無會員資料
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination 控制列 -->
        <nav class="d-flex justify-content-center" style="padding-top: 4px">
          <ul class="pagination mb-0">
            <li
              class="page-item"
              :class="{ disabled: currentCoursePage === 1 }"
              @click="changeCoursePage(currentCoursePage - 1)"
            >
              <a class="page-link me-lg-11 me-5">上一頁</a>
            </li>
            <li
              v-for="page in totalCoursePages"
              :key="page"
              class="page-item"
              :class="{ active: page === currentCoursePage }"
              @click="changeCoursePage(page)"
            >
              <a class="page-link">{{ page }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentCoursePage === totalCoursePages }"
              @click="changeCoursePage(currentCoursePage + 1)"
            >
              <a class="page-link ms-lg-11 ms-5">下一頁</a>
            </li>
          </ul>
        </nav>

        <!-- 以下示範「檢視詳細」的 Modal 結構，可以照需求自行填入欄位 -->
        <div
          id="detailModal"
          class="modal fade"
          tabindex="-1"
          aria-labelledby="detailModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl">
            <div class="modal-content bg-grey-000 text-grey-700 p-5">
              <div class="modal-header border-grey-200">
                <h5 id="detailModalLabel" class="modal-title text-primary-900">
                  會員詳細資訊
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <!-- 左半：文字與課程資訊 (占 8/12) -->
                  <div class="col-lg-8 d-flex flex-column">
                    <div class="d-flex">
                      <div
                        class="mb-3 d-flex flex-column gap-3"
                        style="width: 60%"
                      >
                        <div class="me-4">
                          <strong>會員編號：</strong
                          ><span>{{ selectedUser?.id }}</span>
                        </div>
                        <div class="me-4">
                          <strong>會員名稱：</strong
                          ><span>{{ selectedUser?.name }}</span>
                        </div>
                        <div class="me-4">
                          <strong>Email：</strong
                          ><span>{{ selectedUser?.email }}</span>
                        </div>
                        <div class="me-4">
                          <strong>訂閱期間：</strong
                          ><span>{{ selectedUser?.period || '—' }}</span>
                        </div>
                      </div>
                      <div
                        class="mb-3 d-flex flex-column gap-3"
                        style="width: 40%"
                      >
                        <div class="me-4">
                          <strong>目前方案：</strong
                          ><span>{{ selectedUser?.plan || '未訂閱' }}</span>
                        </div>

                        <div class="me-4">
                          <strong>註冊時間：</strong
                          ><span>{{
                            formatDate(selectedUser?.createdAt)
                          }}</span>
                        </div>

                        <div class="me-4">
                          <strong>所選課程：</strong
                          ><span>{{
                            Array.isArray(selectedUser?.course_type) &&
                            selectedUser.course_type.length > 0
                              ? selectedUser.course_type.join('、')
                              : '未訂閱'
                          }}</span>
                        </div>
                        <div class="me-4">
                          <strong>下次付款日：</strong
                          ><span>{{ selectedUser?.next_payment || '—' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 右半：教練頭像 (占 4/12) -->
                  <div class="col-lg-4 text-center mt-5">
                    <img
                      alt="會員頭像"
                      class="rounded-circle mb-2"
                      style="width: 240px; height: 240px; object-fit: cover"
                    />
                  </div>
                </div>
                <p class="fs-6 fw-bold">訂閱紀錄</p>
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
                <div class="modal-footer justify-content-center border-0">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    關閉
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

//
// === 身分驗證：只有 role === 'ADMIN' 才能繼續進入此頁面 ===
//
async function checkAdmin() {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace({ path: '/' })
      return false
    }
    const res = await axios.get('https://sportify.zeabur.app/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.data?.status && res.data.data?.role === 'ADMIN') {
      return true
    } else {
      router.replace({ path: '/' })
      return false
    }
  } catch (err) {
    console.error('身分驗證失敗：', err)
    router.replace({ path: '/' })
    return false
  }
}

//  取當前「某一頁」的資料，只供拆分 pagination 之用
//
// ↓ 以下為假資料範例，請依需求自行改用後端 API
const users = ref([
  {
    id: 'c1f33da0',
    name: 'Kevin',
    email: 'kevin@example.com',
    profile_image_url: 'https://example.com/profile/kevin.jpg',
    plan: 'fitness方案',
    course_type: ['足球', '皮拉提斯', '單車'],
    createdAt: '2024-08-15T10:00:00Z',
    period: '2024/09/01 - 2024/09/30',
    end_at: '2024/09/30',
    next_payment: '2024/10/01'
  },
  {
    id: 'd4b21a6f',
    name: 'Annie',
    email: 'annie@example.com',
    profile_image_url: 'https://example.com/profile/annie.jpg',
    plan: 'wellness方案',
    course_type: ['游泳'],
    createdAt: '2024-08-21T15:22:11Z',
    period: '2024/09/01 - 2024/09/30',
    end_at: '2024/09/30',
    next_payment: '2024/10/01'
  },
  {
    id: 'ewfgre47',
    name: 'Cindy',
    email: 'cindy@example.com',
    profile_image_url: 'https://example.com/profile/cindy.jpg',
    plan: 'eagerness方案',
    course_type: [],
    createdAt: '2024-08-28T09:45:00Z',
    period: '2024/09/01 - 2024/09/30',
    end_at: '2024/09/30',
    next_payment: '2024/10/01'
  },
  {
    id: 'x8y7z6w5',
    name: 'Bob',
    email: 'bob@example.com',
    profile_image_url: 'https://example.com/profile/bob.jpg',
    plan: '', // 空字串代表未訂閱
    course_type: [],
    createdAt: '2024-08-30T11:30:00Z',
    period: '',
    end_at: '',
    next_payment: ''
  }
])

// 用來篩選的三個 ref
const selectedPlan = ref('') // 目前下拉選到哪個方案
const searchKeyword = ref('') // 文字搜尋會員名稱
const selectedUser = ref(null) // Modal 裡顯示的會員物件

// 下拉選單的四個選項
const planOptions = ['fitness方案', 'wellness方案', 'eagerness方案', '未訂閱']

// 根據 selectedPlan 做篩選
const filteredUsers = computed(() => {
  return users.value.filter(u => {
    // (A) 先比對文字搜尋（如果有輸入關鍵字，就 name 必須包含）
    if (searchKeyword.value) {
      const kw = searchKeyword.value.trim().toLowerCase()
      if (!u.name.toLowerCase().includes(kw)) {
        return false
      }
    }

    // (B) 再比對 下拉「方案」 的篩選
    if (selectedPlan.value) {
      if (selectedPlan.value === '未訂閱') {
        // 「未訂閱」：當 u.plan === ''（空字串） 才算
        return u.plan === ''
      }
      // 其餘兩個方案直接跟 u.plan 比
      return u.plan === selectedPlan.value
    }

    // 如果 selectedPlan.value 是空字串 → 就不做任何排除
    return true
  })
})
const pagination = ref({
  page: 1,
  total: users.value.length,
  total_pages: Math.ceil(filteredUsers.value.length / pageSize),
  has_next: false,
  has_previous: false
})

// 由 pagination.value 計算出目前頁碼與總頁數
const currentPage = computed(() => pagination.value.page)
const totalPages = computed(() => {
  // filteredUsers 改變時，分頁數要同步更新
  const t = Math.ceil(filteredUsers.value.length / pageSize)
  pagination.value.total_pages = t
  return t
})

const pageSize = 2 // 假設一頁顯示 2 筆(測試用可改成 20 或 10)
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredUsers.value.slice(start, start + pageSize)
})

/**
 * 換頁的時候，只需要改 currentPage.value 即可
 */
function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  pagination.value.page = page
}

// 格式化日期：YYYY/MM/DD HH:mm
function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const Y = d.getFullYear()
  const M = String(d.getMonth() + 1).padStart(2, '0')
  const D = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${Y}/${M}/${D} ${h}:${m}`
}

// 載入用戶訂閱紀錄
// 用來存放訂閱紀錄列表
const records = ref([])

// 後端回傳的分頁 meta
const meta = ref({ page: 1, total_pages: 1 })

// 把從後端拿到的 raw 欄位 mapping 成我們要的格式
async function fetchSubscriptions(page = 1) {
  const token = localStorage.getItem('token')
  const userWrapper = JSON.parse(localStorage.getItem('user'))
  const userId = userWrapper?.data?.id || userWrapper?.id
  if (!token || !userId) {
    // 如果沒登入，就跳回登入頁
    router.push('/login')
    return
  }

  try {
    const res = await axios.get(
      'https://sportify.zeabur.app/api/v1/users/subscriptions',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { page }
      }
    )
    if (res.data.status) {
      // Map 後端回來的 data 欄位到我們想顯示的格式
      records.value = res.data.data.map(item => ({
        id: item.id,
        date: item.purchased_at, // 購買日期
        orderNumber: item.order_number, // 訂單編號
        plan: item.plan, // 方案
        period: item.period, // 訂閱期間
        paymentMethod: item.payment_method, // 付款方式
        invoiceUrl: item.invoice_image_url, // 發票連結
        price: item.price, // 金額
        nextPayment: item.next_payment // 下一次付款日期（如果需要也可以顯示）
      }))

      // 更新 meta
      meta.value = res.data.meta
      // 同步本地 currentPage
      currentPage.value = res.data.meta.page
    }
  } catch (err) {
    console.error('取得訂閱紀錄失敗：', err.response?.data || err)
  }
}

// onMounted 先檢查管理者身分，通過才呼叫 fetchAllCoaches()
onMounted(async () => {
  const isAdmin = await checkAdmin()
  if (!isAdmin) return

  // 由於這裡都是「假資料」，因此不需要再呼叫 fetch API
  // 但如果改成真實後端，就放在這裡呼叫 fetchMemberList() 並更新 users.value
})

function openDetailModal(user) {
  selectedUser.value = user
  const modalEl = document.getElementById('detailModal')
  // eslint-disable-next-line no-undef
  new bootstrap.Modal(modalEl).show()
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
  text-align: center;
  @media (max-width: 992px) {
    font-size: 16px;
  }
}
.td-custom {
  color: $primary-900;
  background: $primary-000;
  font-size: 14px;
  text-align: center;
}
.table-striped > tbody > tr:nth-of-type(odd) > td {
  background-color: $primary-000; /* 你想要的斑馬底色 */
}
textarea {
  resize: none;
}
/* AdminCourses.vue 或同級的 .scss 文件 */
textarea::placeholder {
  color: $grey-200;
  opacity: 1;
}
.table-responsive {
  overflow-x: auto;
}
@media (max-width: 900px) {
  .wide-table {
    min-width: 900px;
  }
}
@media (max-width: 1024px) {
  .side-nav {
    display: none;
  }
}
</style>
