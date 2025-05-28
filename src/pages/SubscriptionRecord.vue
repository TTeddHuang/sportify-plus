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
              :class="{ active: route.path === '/users/courses' }"
            >
              <router-link to="/users/courses" class="nav-link">
                我的課程
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/users/subscriptions' }"
            >
              <router-link to="/users/subscriptions" class="nav-link">
                訂閱紀錄
              </router-link>
            </li>

            <li
              class="list-group-item"
              :class="{ active: route.path === '/profile' }"
            >
              <router-link to="/profile" class="nav-link">
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
          <div class="card-content p-5 d-flex flex-column gap-4 mb-5">
            <!-- 第一列：三個標題 -->
            <div class="d-flex justify-content-between">
              <p class="fs-4 fw-bold mb-0">Wellness方案</p>
              <p class="fs-4 fw-bold mb-0">可觀看類別</p>
              <p class="fs-4 fw-bold mb-0">NT$ 400</p>
            </div>

            <!-- 第二列：三個內容（同時垂直置中）-->
            <div class="d-flex justify-content-between align-items-center">
              <!-- 1. 日期 -->
              <p class="fs-6 fw-bold mb-0">下一次收費日期：2025/6/1</p>

              <!-- 2. 類別按鈕群 -->
              <div class="d-flex">
                <button class="btn btn-primary-600 me-2">瑜珈</button>
                <button class="btn btn-primary-600 me-2">單車</button>
                <button class="btn btn-primary-600">足球</button>
              </div>

              <!-- 3. 取消訂閱 -->
              <button class="btn btn-secondary-700 fw-bold">取消訂閱</button>
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
                  <tr class="text-center">
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
                    <td>{{ item.purchased_at }}</td>
                    <td>{{ item.order_number }}</td>
                    <td>{{ item.plan }}</td>
                    <td>{{ item.period }}</td>
                    <td>{{ item.payment_method }}</td>
                    <td>
                      <a
                        :href="item.invoice_image_url"
                        target="_blank"
                        class="text-decoration-none"
                      >
                        檢視
                      </a>
                    </td>
                    <td class="text-end">NT$ {{ item.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 分頁（若需要） -->
            <nav
              v-if="meta.total_pages > 1"
              aria-label="訂閱紀錄分頁"
              class="mt-3"
            >
              <ul class="pagination justify-content-center mb-0">
                <li class="page-item" :class="{ disabled: !meta.has_previous }">
                  <button class="page-link" @click="changePage(meta.page - 1)">
                    上一頁
                  </button>
                </li>
                <li class="page-item disabled">
                  <span class="page-link"
                    >{{ meta.page }} / {{ meta.total_pages }}</span
                  >
                </li>
                <li class="page-item" :class="{ disabled: !meta.has_next }">
                  <button class="page-link" @click="changePage(meta.page + 1)">
                    下一頁
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { initUser } from '@/store/user'

const route = useRoute()

const subscriptions = ref([])
const meta = ref({
  page: 1,
  total_pages: 1,
  has_next: false,
  has_previous: false
})

async function fetchSubscriptions(page = 1) {
  const token = localStorage.getItem('token')
  const userWrapper = JSON.parse(localStorage.getItem('user'))
  const userId = userWrapper?.data?.id || userWrapper?.id

  if (!token || !userId) {
    route.push('/login')
    return
  }

  try {
    const res = await axios.get(
      `https://sportify-backend-1wt9.onrender.com/api/v1/users/subscriptions`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    if (res.data.status) {
      subscriptions.value = res.data.data
      meta.value = res.data.meta
    }
  } catch (err) {
    console.error('取得訂閱紀錄失敗：', err)
  }
}

function changePage(page) {
  if (page >= 1 && page <= meta.value.total_pages) {
    fetchSubscriptions(page)
  }
}

onMounted(async () => {
  await initUser()
  await fetchSubscriptions()
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
}
</style>
