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
          <h2 class="fs-lg-4 mb-lg-8 mb-6">教練管理</h2>

          <div class="d-flex flex-wrap gap-lg-6 gap-1 ms-1 ms-lg-6 mb-5">
            <!-- 選擇類別（技能） -->
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ selectedSkill || '選擇類別' }}
              </button>
              <ul class="dropdown-menu">
                <!-- 全部選項 -->
                <li @click="() => (selectedSkill = '')">
                  <a class="dropdown-item" href="#">選擇類別</a>
                </li>
                <li
                  v-for="skill in skillOptions"
                  :key="skill"
                  @click="() => (selectedSkill = skill)"
                >
                  <a class="dropdown-item" href="#">{{ skill }}</a>
                </li>
              </ul>
            </div>
            <!-- 選擇教練（名稱） -->
            <div class="dropdown">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ selectedCoachName || '選擇教練' }}
              </button>
              <ul class="dropdown-menu">
                <!-- 全部選項 -->
                <li @click="() => (selectedCoachName = '')">
                  <a class="dropdown-item" href="#">選擇教練</a>
                </li>
                <li
                  v-for="name in coachOptions"
                  :key="name"
                  @click="() => (selectedCoachName = name)"
                >
                  <a class="dropdown-item" href="#">{{ name }}</a>
                </li>
              </ul>
            </div>
            <!-- 文字搜尋（教練名稱模糊搜尋） -->
            <div class="input-group" style="width: 200px; height: 42px">
              <input
                v-model="searchKeyword"
                type="text"
                class="form-control ps-2 border-start-0"
                placeholder="搜尋教練名稱..."
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
                  <th class="th-custom">教練編號</th>
                  <th class="th-custom">教練名稱</th>
                  <th class="th-custom">瀏覽次數</th>
                  <th class="th-custom">開課類別</th>
                  <th class="th-custom">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="coach in paginatedResults" :key="coach.coach_id">
                  <td class="td-custom">***{{ coach.coach_id.slice(-5) }}</td>
                  <td class="td-custom">{{ coach.coach_name }}</td>
                  <td class="td-custom">{{ coach.numbers_of_view }}</td>
                  <td class="td-custom">
                    <!-- 把 coach.coach_skills 這個陣列裡的每個 skill_name 都顯示出來 -->
                    {{
                      coach.coach_skills.length > 0
                        ? coach.coach_skills[0].skill_name
                        : '—'
                    }}
                  </td>
                  <td class="td-custom">
                    <button
                      class="btn btn-sm btn-primary"
                      @click="openDetailModal(coach.coach_id)"
                    >
                      檢視
                    </button>
                    <!-- 如果需要刪除功能，可以另外寫 deleteCoach(coach.coach_id) -->
                  </td>
                </tr>

                <tr v-if="coaches.length === 0 && !loading">
                  <td colspan="5" class="text-center text-muted">
                    沒有符合條件的教練
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 分頁 -->
        <div v-if="totalPages > 1" class="mt-11">
          <nav class="d-flex justify-content-center" style="padding-top: 4px">
            <ul class="pagination mb-0">
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                @click="changePage(currentPage - 1)"
              >
                <a class="page-link">上一頁</a>
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
                <a class="page-link">下一頁</a>
              </li>
            </ul>
          </nav>
        </div>

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
                  教練詳細資訊
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
                  <div class="col-lg-8 d-flex flex-column">
                    <div class="d-flex">
                      <div
                        class="mb-3 d-flex flex-column gap-3"
                        style="width: 60%"
                      >
                        <div class="me-4">
                          <strong>教練編號：</strong>
                          {{ selectedCoach?.id }}
                        </div>
                        <div class="me-4">
                          <strong>教練名稱：</strong>
                          {{ selectedCoach?.nickname }}
                        </div>
                        <div class="me-4">
                          <strong>Email：</strong
                          ><span>{{ selectedCoach?.email }}</span>
                        </div>
                        <div class="me-4">
                          <strong>手機：</strong
                          ><span>{{ selectedCoach?.phone_number }}</span>
                        </div>
                        <div class="me-4">
                          <strong>身分證字號：</strong
                          ><span>{{ selectedCoach?.id_number }}</span>
                        </div>
                        <div class="me-4">
                          <strong>專長類別：</strong
                          ><span
                            v-for="s in selectedCoach?.skills || []"
                            :key="s.name"
                            class="me-1"
                          >
                            {{ s.name }}
                          </span>
                        </div>
                      </div>
                      <div
                        class="mb-3 d-flex flex-column gap-3"
                        style="width: 40%"
                      >
                        <div class="me-4">
                          <strong>註冊時間：</strong
                          ><span> {{ selectedCoach?.created_at }}</span>
                        </div>

                        <div class="me-4">
                          <strong>本名：</strong
                          ><span>{{ selectedCoach?.realname }}</span>
                        </div>

                        <div class="me-4">
                          <strong>出生日期：</strong
                          ><span>{{ selectedCoach?.birthday }}</span>
                        </div>
                        <div class="me-4">
                          <strong>教學經驗：</strong
                          ><span>{{ selectedCoach?.experience_years }} 年</span>
                        </div>
                        <div class="me-4">
                          <strong>稱號：</strong
                          ><span>{{ selectedCoach?.job_title }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 text-center mt-5">
                    <img
                      :src="selectedCoach?.profile_image_url"
                      alt="教練大頭照"
                      class="rounded-circle mb-3"
                      style="width: 240px; height: 240px; object-fit: cover"
                    />
                  </div>
                </div>
                <!-- 這裡可以自由擺放要顯示的欄位，比如 coach_about_me、coach_title... -->
                <p>
                  <strong>專長介紹：</strong>
                  {{ selectedCoach?.skill_description }}
                </p>
                <p class="mb-3 fw-bold">自我介紹：</p>
                <div
                  class="border rounded p-3 mb-3"
                  style="background-color: #f8f9fa"
                >
                  <p>
                    {{ selectedCoach?.about_me }}
                  </p>
                </div>
                <p class="mb-3 fw-bold">學經歷與得獎經歷：</p>
                <div
                  class="border rounded p-3 mb-3"
                  style="background-color: #f8f9fa"
                >
                  <p>
                    {{ selectedCoach?.experience }}
                  </p>
                </div>

                <p>
                  <strong>感興趣的事物：</strong>
                  {{ selectedCoach?.hobby }}
                </p>
                <p>
                  <strong>最喜歡的一段話：</strong>
                  {{ selectedCoach?.favorite_words }}
                </p>
                <p>
                  <strong>座右銘：</strong>
                  {{ selectedCoach?.motto }}
                </p>
                <div>
                  <p>相關資格證明照片</p>
                  <img
                    :src="selectedCoach?.background_image_url"
                    alt="證明照片"
                    class="img-fluid rounded"
                    style="max-height: 200px"
                  />
                </div>
                <!-- ...如果有更多欄位，可以自行加在這裡 -->
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
        <!-- ※ Modal HTML 放在此處即可，不影響其他區塊排版 -->
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

// -----------------------------------------------
// === 教練列表相關狀態（把所有頁都拉下來） ===
// -----------------------------------------------

// 1. 用來存「前端合併所有分頁」的陣列
const allCoaches = ref([])

//  2. 取當前「某一頁」的資料，只供拆分 pagination 之用
//
const coaches = ref([])

// 用來存放「目前 Modal 正在顯示的教練物件」
const selectedCoach = ref(null)

const pagination = ref({
  page: 1,
  total: 0,
  total_pages: 1,
  has_next: false,
  has_previous: false
})

const loading = ref(false)
const error = ref(null)

// 由 pagination.value 計算出目前頁碼與總頁數
const currentPage = computed(() => pagination.value.page)
const totalPages = computed(() => pagination.value.total_pages)

// 篩選用的三個 ref，一定要都存在
const selectedSkill = ref('')
const selectedCoachName = ref('')
const searchKeyword = ref('')

// --------------------------------------------------
// 取得單一頁的教練資料，並回傳「data + pagination info」
// --------------------------------------------------
async function fetchCoachesPage(page = 1) {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(
      'https://sportify.zeabur.app/api/v1/admin/coaches',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { page } // 如果後端不接受 limit，就只傳 page
      }
    )
    if (!res.data.status) {
      throw new Error(res.data.message || '取得教練資料失敗')
    }
    // 回傳 { data: [...], pagination: {...} }
    return {
      data: res.data.data,
      pagination: res.data.meta.pagination
    }
  } catch (err) {
    console.error('fetchCoachesPage 失敗:', err.response?.data || err)
    throw err
  }
}

/**
 * 這支函式在元件載入時會呼叫一次，作用：
 *  1) 先去 GET /coaches?page=1
 *  2) 拿到 pagination.total_pages 之後，若 total_pages > 1，就迴圈把後面的每一頁都拉下來
 *  3) 最終把所有頁的資料合併到 allCoaches 裡
 */
async function fetchAllCoaches() {
  loading.value = true
  error.value = null
  allCoaches.value = []
  coaches.value = []

  try {
    // 把第一頁先拉下來
    const first = await fetchCoachesPage(1)
    coaches.value = first.data
    allCoaches.value.push(...first.data)

    // 設定 pagination info
    pagination.value.page = first.pagination.page
    pagination.value.total = first.pagination.total
    pagination.value.total_pages = first.pagination.total_pages
    pagination.value.has_next = first.pagination.has_next
    pagination.value.has_previous = first.pagination.has_previous

    // 如果總頁數大於1，就繼續把後續 pages 都拉下來
    const totalPagesCount = first.pagination.total_pages
    if (totalPagesCount > 1) {
      // 從 2 開始到 total_pages
      for (let p = 2; p <= totalPagesCount; p++) {
        const next = await fetchCoachesPage(p)
        allCoaches.value.push(...next.data)
      }
    }
  } catch (err) {
    error.value = err.response?.data?.message || '載入教練資料失敗'
  } finally {
    loading.value = false
  }
}

/**
 * 切分「分頁顯示」給前端 Table 用
 * 由 filteredCoaches 先做過濾、再把結果切成 pageSize，回傳當前 currentPage 那一小段
 */
const pageSize = 9 // 你要一頁顯示幾筆
const filteredCoaches = computed(() => {
  // 1) 先篩掉 allCoaches 裡不符合條件的
  return allCoaches.value.filter(coach => {
    // (A) 技能篩選：如果選了 selectedSkill，且此 coach.coach_skills 不包含，就排除
    if (selectedSkill.value) {
      const hasSkill = coach.coach_skills.some(
        s => s.skill_name === selectedSkill.value
      )
      if (!hasSkill) return false
    }
    // (B) 教練名稱下拉：如果選了 selectedCoachName，且名稱不一致，就排除
    if (
      selectedCoachName.value &&
      coach.coach_name !== selectedCoachName.value
    ) {
      return false
    }
    // (C) 文字搜尋：如果輸入了 searchKeyword，且 coach_name or coach_skills 裡都不包含，就排除
    if (searchKeyword.value) {
      const kw = searchKeyword.value.trim().toLowerCase()
      const nameMatch = coach.coach_name.toLowerCase().includes(kw)
      const skillNames = coach.coach_skills
        .map(s => s.skill_name.toLowerCase())
        .join(' ')
      const skillMatch = skillNames.includes(kw)
      if (!nameMatch && !skillMatch) return false
    }
    return true
  })
})
// 2) 將 filteredCoaches 切分成「當前頁」要顯示的那一段
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredCoaches.value.slice(start, start + pageSize)
})

/**
 * 換頁的時候，只需要改 currentPage.value 即可
 */
function changePage(page) {
  if (page < 1 || page > pagination.value.total_pages) return
  pagination.value.page = page
}

// 取得某位教練詳細資料
async function fetchCoachDetail(coachId) {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(
      `https://sportify.zeabur.app/api/v1/admin/coaches/${coachId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.data.status) {
      throw new Error(res.data.message || '讀取失敗')
    }
    // 注意：把 coachDetails 塞到 selectedCoach
    selectedCoach.value = res.data.data.coachDetails
    // 顯示 Modal
  } catch (err) {
    console.error('fetchCoachDetail 錯誤', err)
  }
}

// 「點擊檢視」要開 modal

function openDetailModal(coachId) {
  // const coach = allCoaches.value.find(c => c.coach_id === coachId)
  // if (!coach) return
  // selectedCoach.value = coach
  fetchCoachDetail(coachId)
  const modalEl = document.getElementById('detailModal')
  // eslint-disable-next-line no-undef
  const bs = new bootstrap.Modal(modalEl)
  bs.show()
}

// onMounted 先檢查管理者身分，通過才呼叫 fetchAllCoaches()
onMounted(async () => {
  const isAdmin = await checkAdmin()
  if (isAdmin) {
    await fetchAllCoaches()
  }
})

// 以下為「篩選條件下拉及搜尋」的邏輯
// --------------------------------------------------

// 1. 技能下拉項目：從 coaches.value 裡蒐集所有技能名稱 (去重)
const skillOptions = computed(() => {
  const set = new Set()
  allCoaches.value.forEach(coach => {
    coach.coach_skills.forEach(skill => {
      set.add(skill.skill_name)
    })
  })
  return Array.from(set)
})

// 2. 教練名稱下拉項目：從 coaches.value 裡蒐集所有 coach_name (去重)
const coachOptions = computed(() => {
  const set = new Set()
  allCoaches.value.forEach(coach => {
    set.add(coach.coach_name)
  })
  return Array.from(set)
})

// openDetailModal：如果你有要開「教練詳細 Modal」的邏輯，請在這裡補上
// -----------------------------------------
// function openDetailModal(coachId) {
// 這裡可自行呼叫 GET /admin/coaches/:coachId/details，
// 然後把資料放到某個 ref，並開啟 Bootstrap Modal
// console.log('點擊檢視教練', coachId)
// 例如：
// axios.get(`/api/v1/admin/coaches/${coachId}/details`, { headers: ... })
//   .then(res => { /* 塞資料 & show Modal */ })
// }
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
