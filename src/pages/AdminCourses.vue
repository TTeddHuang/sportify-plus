<template>
  <div class="container">
    <div class="d-flex">
      <!-- 左側選單 -->
      <div class="side-nav d-lg-block d-none">
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
              <router-link to="/admin/subscriptions" class="nav-link">
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
      <!-- 外框顏色 -->
      <div class="p-lg-8 px-5 py-8 w-100" style="max-width: 1056px">
        <div class="d-flex gap-6">
          <h2 class="fs-lg-4 mb-lg-8 mb-6">課程管理</h2>
          <!--  下拉選單：所有課程 -->
          <div class="dropdown">
            <button
              id="dropdownCategory"
              class="btn btn-primary-600 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedCategory }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownCategory">
              <li
                v-for="cat in categoryOptions"
                :key="cat"
                @click="selectedCategory = cat"
              >
                <a class="dropdown-item" href="#">{{ cat }}</a>
              </li>
            </ul>
          </div>

          <!--  下拉選單：選擇講師 -->
          <div class="dropdown">
            <button
              id="dropdownInstructor"
              class="btn btn-primary-600 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedInstructor }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownInstructors">
              <li
                v-for="instr in instructorOptions"
                :key="instr"
                @click="selectedInstructor = instr"
              >
                <a class="dropdown-item" href="#">{{ instr }}</a>
              </li>
            </ul>
          </div>

          <!--  下拉選單：選擇狀態 -->
          <div class="dropdown">
            <button
              id="dropdownStatus"
              class="btn btn-primary-600 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedStatus }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownStatus">
              <li
                v-for="st in statusOptions"
                :key="st"
                @click="selectedStatus = st"
              >
                <a class="dropdown-item" href="#">{{ st }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="subscription-card">
          <div class="card-wrapper"></div>
          <div class="card-content p-5 mb-5">
            <div class="table-responsive">
              <table class="table table-striped mb-0 align-middle">
                <thead class="">
                  <tr class="text-start">
                    <th class="th-custom">類別</th>
                    <th class="th-custom">課程代號</th>
                    <th class="th-custom">課程名稱</th>
                    <th class="th-custom">上架時間</th>
                    <th class="th-custom">教練名稱</th>
                    <th class="th-custom">狀態</th>
                    <th class="th-custom">詳細資訊</th>
                    <th class="th-custom">課程評價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="course in filteredCourses" :key="course.id">
                    <td class="td-custom">
                      {{ course.category }}
                    </td>
                    <td class="td-custom">***{{ course.id.slice(-5) }}</td>
                    <td class="td-custom">{{ course.title }}</td>
                    <td class="td-custom">
                      {{ formatDateWithoutLib(course.created_at) }}
                    </td>
                    <td class="td-custom">{{ course.instructor }}</td>

                    <td class="td-custom">
                      <span
                        class=""
                        :class="course.is_active ? '' : 'text-warning'"
                      >
                        {{ course.is_active ? '上架中' : '待審核' }}
                      </span>
                    </td>
                    <td class="td-custom">
                      <button
                        class="btn btn-sm btn-primary"
                        @click="openDetailModal(course.id)"
                      >
                        檢視
                      </button>
                    </td>
                    <td class="td-custom">
                      <!-- 按下這個按鈕就開 modal，並呼叫 openRatingsModal -->
                      <button
                        class="btn btn-sm btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#ratingsModal"
                        @click="() => openRatingsModal(course.id)"
                      >
                        評價
                      </button>
                    </td>
                  </tr>
                  <!-- 如果篩選後沒資料，顯示提示列 -->
                  <tr v-if="filteredCourses.length === 0 && !loading">
                    <td colspan="8" class="text-center text-muted">
                      沒有符合條件的課程
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- modal -->
        <div
          id="ratingsModal"
          class="modal fade"
          tabindex="-1"
          aria-labelledby="ratingsModalLabel"
        >
          <div class="modal-dialog modal-lg custom-modal-width">
            <div class="modal-content">
              <div
                class="modal-header bg-grey-000 text-grey-900 p-lg-5 pb-lg-3 border-0"
              >
                <h5
                  id="ratingsModalLabel"
                  class="modal-title fw-bold text-primary-900 fs-lg-5 fs-6"
                >
                  課程評價
                </h5>
                <p class="mb-0 fs-lg-7 fs-9 ms-2 text-primary-900">
                  ({{ userRatings.paginatedData.length || 0 }} 則評價)
                </p>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="px-lg-5 bg-grey-000">
                <hr
                  class="my-0"
                  style="height: 2px; background-color: #d2d2d2; border: none"
                />
              </div>

              <div
                class="modal-body bg-grey-000 text-grey-700 p-lg-5 rounded-bottom-3"
              >
                <div
                  v-for="rating in paginatedRatings"
                  :key="rating.id"
                  class="mb-4 p-lg-3 bg-primary-000 rounded-3"
                >
                  <div
                    class="d-flex border-bottom justify-content-between align-items-center pb-2"
                  >
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="fw-bold">{{ rating.username }}</div>

                      <div class="text-stars ms-lg-5">
                        <i
                          v-for="n in Math.floor(rating.score)"
                          :key="'full-' + n"
                          class="bi bi-star-fill me-1"
                        ></i>
                        <i
                          v-if="
                            rating.score % 1 >= 0.25 && rating.score % 1 < 0.75
                          "
                          class="bi bi-star-half me-1 text-warning"
                        ></i>
                        <i
                          v-for="n in 5 -
                          Math.floor(rating.score) -
                          (rating.score % 1 >= 0.25 && rating.score % 1 < 0.75
                            ? 1
                            : 0)"
                          :key="'empty-' + n"
                          class="bi bi-star text-secondary me-1"
                        ></i>
                      </div>
                    </div>

                    <div class="text-grey-600 fs-lg-8 small">
                      {{ rating.createdAt }}
                    </div>
                  </div>

                  <p class="mt-2 mb-0 text-grey-700">{{ rating.comment }}</p>
                </div>

                <!-- Pagination 控制列 -->
                <nav
                  class="d-flex justify-content-center"
                  style="padding-top: 4px"
                >
                  <ul class="pagination mb-0">
                    <li
                      class="page-item bg-grey-000"
                      :class="{ disabled: currentRatingPage === 1 }"
                      @click="changeRatingPage(currentRatingPage - 1)"
                    >
                      <a class="page-link me-12">上一頁</a>
                    </li>

                    <li
                      v-for="page in totalRatingPages"
                      :key="page"
                      class="page-item mx-2"
                      :class="{ active: page === currentRatingPage }"
                      @click="changeRatingPage(page)"
                    >
                      <a class="page-link">{{ page }}</a>
                    </li>

                    <li
                      class="page-item"
                      :class="{
                        disabled: currentRatingPage === totalRatingPages
                      }"
                      @click="changeRatingPage(currentRatingPage + 1)"
                    >
                      <a class="page-link ms-12">下一頁</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <!-- ※ 建議把 Modal HTML 放在這裡（也就是 container 底部、在所有內容之後） -->
        <div
          id="detailModal"
          class="modal fade"
          tabindex="-1"
          aria-labelledby="detailModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl">
            <div class="modal-content bg-grey-000 text-grey-500">
              <!-- --- Modal 標頭 --- -->
              <div class="modal-header">
                <h5 id="detailModalLabel" class="modal-title">課程詳細資訊</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <!-- --- Modal 主體 --- -->
              <div class="modal-body">
                <div class="row">
                  <!-- 左半部：文字描述 (代號、狀態、上架時間、類別、教練名字、介紹) -->
                  <div class="col-md-8">
                    <div class="mb-3 d-flex flex-wrap">
                      <div class="me-4">
                        <strong>課程代號：</strong
                        ><span>{{ selectedDetail.code }}</span>
                      </div>
                      <div class="me-4">
                        <strong>課程狀態：</strong
                        ><span>{{ selectedDetail.status }}</span>
                      </div>
                      <div class="me-4">
                        <strong>上架時間：</strong
                        ><span>{{ selectedDetail.publishedAt }}</span>
                      </div>
                      <div class="me-4">
                        <strong>課程類別：</strong
                        ><span>{{ selectedDetail.category }}</span>
                      </div>
                      <div class="me-4">
                        <strong>教練名稱：</strong
                        ><span>{{ selectedDetail.instructor }}</span>
                      </div>
                    </div>
                    <div class="mb-3">
                      <strong>課程介紹：</strong>
                      <div
                        class="border rounded p-3"
                        style="background-color: #f8f9fa"
                      >
                        {{ selectedDetail.description }}
                      </div>
                    </div>
                    <!-- 課程圖片 -->
                    <div class="mb-3">
                      <strong>課程照片：</strong><br />
                      <img
                        :src="selectedDetail.thumbnailUrl"
                        alt="課程照片"
                        class="img-fluid rounded"
                      />
                    </div>
                    <!-- 課程影片 (accordion) -->
                    <div class="mb-3">
                      <strong>課程影片：</strong>
                      <div id="courseVideoAccordion" class="accordion">
                        <div
                          v-for="(video, index) in selectedDetail.videos"
                          :key="video.id"
                          class="accordion-item"
                        >
                          <h2
                            :id="`headingVideo${index}`"
                            class="accordion-header"
                          >
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              :data-bs-target="`#collapseVideo${index}`"
                              aria-expanded="false"
                              :aria-controls="`collapseVideo${index}`"
                            >
                              {{ `${index + 1}. ${video.title}` }}
                            </button>
                          </h2>
                          <div
                            :id="`collapseVideo${index}`"
                            class="accordion-collapse collapse"
                            :aria-labelledby="`headingVideo${index}`"
                            data-bs-parent="#courseVideoAccordion"
                          >
                            <div class="accordion-body">
                              <div class="ratio ratio-16x9">
                                <iframe
                                  :src="video.url"
                                  title="Video"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 右半部：教練頭像（可自訂排版） -->
                  <div class="col-md-4 text-center">
                    <img
                      :src="selectedDetail.instructorAvatar"
                      alt="教練頭像"
                      class="rounded-circle"
                      style="width: 150px; height: 150px; object-fit: cover"
                    />
                  </div>
                </div>
                <!-- 下面可以再加「審核建議」之類的表單欄位 -->
                <div class="mt-4">
                  <strong>審核建議：</strong>
                  <textarea
                    v-model="selectedDetail.reviewComment"
                    class="form-control bg-grey-000"
                    rows="3"
                    placeholder="輸入審核建議..."
                  ></textarea>
                </div>
              </div>

              <!-- --- Modal 底部：按鈕 --- -->
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  取消
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="submitReview"
                >
                  送出
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- ※ Modal HTML 放在這邊就好，與上方的表格元件並列，並不會影響到其他區塊的排版 -->

        <!-- 分頁（若需要） v-if="meta.total_pages > 1" -->
        <div class="mt-11">
          <nav class="d-flex justify-content-center" style="padding-top: 4px">
            <ul class="pagination mb-0">
              <li
                class="page-item"
                :class="{ disabled: currentCoursePage === 1 }"
                @click="changeCoursePage(currentCoursePage - 1)"
              >
                <a class="page-link me-lg-11">上一頁</a>
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

const route = useRoute()

//
// === 課程列表相關狀態 ===
//
const courses = ref([])

// 存放當前正在「檢視」的那筆課程詳細資料
const selectedDetail = ref({
  // 課程基本
  id: '',
  name: '',
  score: 0,
  student_amount: 0,
  hours: 0,
  image_url: '',
  description: '',
  // 教練欄位
  coach: {
    id: '',
    name: '',
    title: '',
    intro: '',
    profile_image_url: '',
    coachPage_Url: ''
  },
  // 章節清單
  chapters: []
})

const pagination = ref({
  total: 0,
  page: 1,
  limit: 20,
  total_pages: 1,
  has_next: false,
  has_previous: false
})

const loading = ref(false)
const error = ref(null)

// 這三個 ref 分別綁定「目前選到的分類／講師／狀態」
const selectedCategory = ref('全部課程')
const selectedInstructor = ref('全部講師')
const selectedStatus = ref('全部狀態')

// 把 courses 裡面所有的 category、instructor 拿出來做成「唯一值陣列」
const categoryOptions = computed(() => {
  // 先收集所有 category，再去重、並在最前面加入「全部課程」
  const set = new Set()
  courses.value.forEach(c => set.add(c.category))
  return ['全部課程', ...Array.from(set)]
})

const instructorOptions = computed(() => {
  const set = new Set()
  courses.value.forEach(c => set.add(c.instructor))
  return ['全部講師', ...Array.from(set)]
})

// 狀態選項固定三項（全部/上架中/待審核）
const statusOptions = ['全部狀態', '上架中', '待審核']

// 由 pagination.value 計算出目前課程頁碼與總頁數
const currentCoursePage = computed(() => pagination.value.page)
const totalCoursePages = computed(() => pagination.value.total_pages)

function formatDateWithoutLib(isoString) {
  if (!isoString) return ''
  const datePart = isoString.slice(2, 10) // "2025-05-28" → "25-05-28"
  const timePart = isoString.slice(11, 16) // "22:00"
  return `${datePart} ${timePart}`
}

async function fetchCourses() {
  loading.value = true
  error.value = null

  try {
    const token = localStorage.getItem('token')
    // 不帶任何參數，因為後端不接受 page/limit
    const res = await axios.get(
      'https://sportify.zeabur.app/api/v1/admin/courses',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (res.data.status) {
      courses.value = res.data.data
      if (res.data.pagination) {
        const p = res.data.pagination
        pagination.value.page = p.page
        pagination.value.limit = p.limit
        pagination.value.total = p.total
        pagination.value.total_pages = p.total_pages
        pagination.value.has_next = p.has_next
        pagination.value.has_previous = p.has_previous
      }
    } else {
      error.value = res.data.message || '取得課程資料失敗'
    }
  } catch (err) {
    console.error('課程列表載入失敗:', err.response?.data || err)
    error.value = err.response?.data?.message || '伺服器錯誤，請稍後再試'
  } finally {
    loading.value = false
  }
}

function changeCoursePage(page) {
  if (page < 1 || page > pagination.value.total_pages) return
  // 後端一次就回傳所有資料，不需要重新帶參數
  fetchCourses()
}

function onEdit(courseId) {
  console.log('編輯課程：', courseId)
}

onMounted(() => {
  fetchCourses()
})

//

// === 依「所選分類 / 講師 / 狀態」來做篩選的 computed ===
//
const filteredCourses = computed(() => {
  return courses.value.filter(c => {
    // 1) 分類篩選
    const matchCategory =
      selectedCategory.value === '全部課程' ||
      c.category === selectedCategory.value

    // 2) 講師篩選
    const matchInstructor =
      selectedInstructor.value === '全部講師' ||
      c.instructor === selectedInstructor.value

    // 3) 狀態篩選
    //    後端的 is_active:true →「上架中」
    //                false →「待審核」
    const statusLabel = c.is_active ? '上架中' : '待審核'
    const matchStatus =
      selectedStatus.value === '全部狀態' ||
      statusLabel === selectedStatus.value

    return matchCategory && matchInstructor && matchStatus
  })
})

//

// === 評價 Modal 相關狀態 ===
//

// 存放要查看評價的那堂課 ID
const selectedCourseId = ref(null)

// 存放該課程的評價陣列與分頁資訊
const userRatings = ref({
  paginatedData: [],
  pagination: {
    page: 1,
    limit: 5,
    total: 0,
    total_pages: 1,
    has_next: false,
    has_previous: false
  }
})

const loadingRatings = ref(false)

// 由 userRatings.value.pagination 計算出目前評價頁碼與總頁數
const currentRatingPage = computed(() => userRatings.value.pagination.page)
const totalRatingPages = computed(
  () => userRatings.value.pagination.total_pages
)

// 當按下「檢視評價」按鈕時呼叫，先將 courseId 存起並抓第 1 頁評價
function openRatingsModal(courseId) {
  selectedCourseId.value = courseId
  fetchRatings(courseId, 1)
}

// 向後端拿該課程、指定頁的評價
async function fetchRatings(courseId, page = 1) {
  loadingRatings.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(
      `https://sportify.zeabur.app/api/v1/admin/courses/${courseId}/ratings`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit: userRatings.value.pagination.limit }
      }
    )

    if (res.data.status) {
      userRatings.value.paginatedData = res.data.data.paginatedData
      userRatings.value.pagination = res.data.data.meta.pagination
    } else {
      userRatings.value.paginatedData = []
      userRatings.value.pagination = {
        page: 1,
        limit: userRatings.value.pagination.limit,
        total: 0,
        total_pages: 1,
        has_next: false,
        has_previous: false
      }
    }
  } catch (err) {
    console.error('取得評價失敗：', err.response?.data || err)
    userRatings.value.paginatedData = []
    userRatings.value.pagination = {
      page: 1,
      limit: userRatings.value.pagination.limit,
      total: 0,
      total_pages: 1,
      has_next: false,
      has_previous: false
    }
  } finally {
    loadingRatings.value = false
  }
}

// 分頁列點擊時，切換到指定頁
function changeRatingPage(page) {
  if (page < 1 || page > userRatings.value.pagination.total_pages) return
  fetchRatings(selectedCourseId.value, page)
}

// 讓 template 使用：paginatedRatings = userRatings.value.paginatedData
const paginatedRatings = computed(() => userRatings.value.paginatedData)

// openDetailModal：呼叫 GET /courses/:id/details，然後補值並用 Bootstrap JS 打開 Modal
async function openDetailModal(courseId) {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(
      `https://sportify.zeabur.app/api/v1/courses/${courseId}/details`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (res.data.status) {
      const payload = res.data.data

      // 直接把 API 回來的 data.course 與 data.coach、data.chapters 塞進去：
      selectedDetail.value.id = payload.course.id || ''
      selectedDetail.value.name = payload.course.name || ''
      selectedDetail.value.score = payload.course.score || 0
      selectedDetail.value.student_amount = payload.course.student_amount || 0
      selectedDetail.value.hours = payload.course.hours || 0
      selectedDetail.value.image_url = payload.course.image_url || ''
      selectedDetail.value.description = payload.course.description || ''

      // 教練資料
      selectedDetail.value.coach.id = payload.coach.id || ''
      selectedDetail.value.coach.name = payload.coach.name || ''
      selectedDetail.value.coach.title = payload.coach.title || ''
      selectedDetail.value.coach.intro = payload.coach.intro || ''
      selectedDetail.value.coach.profile_image_url =
        payload.coach.profile_image_url || ''
      selectedDetail.value.coach.coachPage_Url =
        payload.coach.coachPage_Url || ''

      // 章節清單
      selectedDetail.value.chapters = Array.isArray(payload.chapters)
        ? payload.chapters.map(ch => ({
            title: ch.title,
            subtitles: Array.isArray(ch.subtitles) ? ch.subtitles : []
          }))
        : []

      // 打開 Bootstrap Modal
      const modalEl = document.getElementById('detailModal')
      const bsModal = new bootstrap.Modal(modalEl)
      bsModal.show()
    }
  } catch (err) {
    console.error('載入課程詳細失敗：', err)
    alert('無法載入課程詳細，請稍後再試')
  }
}

// 4) 當使用者按下「送出審核建議」時，POST 範例（可依後端實際規定調整）
//
async function submitReview() {
  try {
    const token = localStorage.getItem('token')
    // 假設後端要的 payload 只需要 reviewComment
    await axios.post(
      `https://sportify.zeabur.app/api/v1/admin/courses/${selectedDetail.value.id}/review`,
      { comment: selectedDetail.value.reviewComment || '' },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    // 關掉 Modal
    const modalEl = document.getElementById('detailModal')
    const bsModal = bootstrap.Modal.getInstance(modalEl)
    bsModal.hide()
    alert('審核建議已送出')
  } catch (err) {
    console.error('送出審核建議失敗：', err)
    alert('送出審核建議失敗，請稍後再試')
  }
}

onMounted(fetchCourses)
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
</style>
