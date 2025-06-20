<template>
  <div>
    <div class="d-flex flex-wrap course-grid gap-lg-8 gap-md-6 pt-8 ps-8">
      <div
        v-for="course in courses"
        :key="course.course_id"
        class="mb-4 course-card"
      >
        <div class="card h-100 rounded-4 p-5 position-relative">
          <div class="img-wrapper position-relative">
            <div class="img-decorate">
              <span
                class="badge fs-9 text-primary-000"
                :class="
                  course.is_approved === '已審核'
                    ? 'badge-approved'
                    : 'badge-pending'
                "
              >
                {{ course.is_approved }}
              </span>
            </div>

            <div class="img-container">
              <img
                v-if="course.picture_url"
                :src="course.picture_url"
                class="card-img-top mb-5 rounded-3"
                :alt="course.title"
              />
              <div
                v-else
                class="card-img-top mb-5 rounded-3 no-image d-flex align-items-center justify-content-center"
              >
                <span class="material-symbols-outlined text-muted">image</span>
              </div>
            </div>
          </div>

          <div class="card-body p-0">
            <h5 class="card-title fs-7 mb-3 fw-bold">
              {{ course.title }}
            </h5>

            <div class="d-flex justify-content-between mb-3">
              <p class="d-flex align-items-center mb-0">
                <span class="material-symbols-outlined star"> star </span>
                <span>{{ course.score }}</span>
              </p>
              <p class="d-flex align-items-center mb-0">
                <span class="material-symbols-outlined"> person </span>
                <span>{{ course.numbers_of_view }}</span>
              </p>
              <p class="d-flex align-items-center mb-0">
                <span class="material-symbols-outlined"> schedule </span>
                <span>{{ course.total_hours }}h</span>
              </p>
            </div>

            <p class="card-text mb-4">
              {{ course.description }}
            </p>

            <div class="mt-auto">
              <button
                class="btn btn-primary-600 w-100"
                @click="openEditModal(course)"
              >
                編輯課程
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="editCourseModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="editCourseModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content bg-grey-000">
          <div class="modal-header border-0">
            <h5 id="editCourseModalLabel" class="modal-title text-primary-900">
              編輯課程
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-5">
            <form @submit.prevent="updateCourse">
              <div class="mb-5">
                <label for="editName" class="form-label">課程名稱</label>
                <input
                  id="editName"
                  v-model.trim="editForm.name"
                  type="text"
                  class="form-control"
                  placeholder="請輸入課程名稱"
                  required
                />
              </div>

              <div class="mb-5">
                <label for="editIntro" class="form-label">課程介紹</label>
                <textarea
                  id="editIntro"
                  v-model="editForm.intro"
                  class="form-control"
                  rows="5"
                  placeholder="請輸入課程介紹"
                  required
                ></textarea>
              </div>

              <div class="mb-5">
                <label for="editCategory" class="form-label">課程類別</label>
                <select
                  id="editCategory"
                  v-model="editForm.category"
                  class="form-select"
                  required
                >
                  <option disabled value="">請選擇類別</option>
                  <option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>

              <div class="mb-5">
                <label for="editPhoto" class="form-label">更新封面照片</label>
                <input
                  id="editPhoto"
                  type="file"
                  class="form-control"
                  accept="image/*"
                  :disabled="isUploadingThumbnail"
                  @change="selectImg"
                />
                <div v-if="isUploadingThumbnail" class="mt-2 text-primary">
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  封面照片上傳中...
                </div>
                <img
                  v-if="editPreviewURL || editForm.currentImageUrl"
                  :src="editPreviewURL || editForm.currentImageUrl"
                  alt="照片預覽"
                  class="mt-3 img-preview"
                />
              </div>

              <div class="mb-5">
                <label class="form-label">課程影片管理</label>
                <draggable
                  ref="editDraggableRef"
                  :initial-data="editForm.chapters"
                  :course-id="editForm.id"
                  @course-id-received="handleCourseIdReceived"
                ></draggable>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0 justify-content-center">
            <button
              type="button"
              class="btn btn-grey-400 me-3"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary-600"
              :disabled="isSubmitting"
              @click="updateCourse"
            >
              <span
                v-if="isSubmitting"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              {{ isSubmitting ? '更新中...' : '更新課程' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import draggable from '@/components/VueDraggable.vue'
import axios from 'axios'

const coach = ref([])
const courses = ref([])
const editForm = ref({
  id: null,
  name: '',
  intro: '',
  category: '',
  currentImageUrl: '',
  chapters: []
})

const categories = [
  '瑜珈',
  '單車',
  '登山',
  '皮拉提斯',
  '足球',
  '籃球',
  '羽球',
  '重訓',
  '滑板',
  '有氧',
  '舞蹈',
  '游泳'
]

const editPreviewURL = ref('')
const editDraggableRef = ref(null)
const isSubmitting = ref(false)
const isUploadingThumbnail = ref(false)
const thumbnailUrl = ref('')
const thumbnailPublicId = ref('')

async function getCourses() {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('無登入 token')
      return
    }

    const res = await axios.get(
      'https://sportify.zeabur.app/api/v1/coaches/courses',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    courses.value = res.data.data.courses
    coach.value = res.data.data.coach
  } catch (error) {
    console.error('取得課程失敗:', error)
  }
}

async function openEditModal(course) {
  try {
    // 取得課程詳細資料
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `https://sportify.zeabur.app/api/v1/coaches/courses/${course.course_id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (response.data.status) {
      const courseData = response.data.data
      console.log('課程資料:', courseData)

      // 填入表單資料
      editForm.value.id = course.course_id
      editForm.value.name = courseData.name
      editForm.value.intro = courseData.description
      editForm.value.category = courseData.sports_type
      editForm.value.currentImageUrl = courseData.image_url
      editForm.value.currentImageID = courseData.image_public_id
      editForm.value.chapters = courseData.chapters

      // 清除之前的預覽圖片和上傳狀態
      editPreviewURL.value = ''
      thumbnailUrl.value = ''
      thumbnailPublicId.value = ''

      await nextTick()

      // 打開 Modal
      const modalEl = document.getElementById('editCourseModal')
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(modalEl)
      modal.show()
    }
  } catch (error) {
    console.error('載入課程詳細資料失敗:', error)
    alert('載入課程資料失敗，請稍後再試')
  }
}

async function selectImg(e) {
  const file = e.target.files[0]
  if (!file) return

  const allowed = ['png', 'jpeg', 'jpg']
  const type = file.type.split('/').pop()
  if (!allowed.includes(type)) {
    alert('僅支援圖片格式(png, jpg, jpeg)')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('檔案請勿超過5MB')
    return
  }

  if (editPreviewURL.value) {
    URL.revokeObjectURL(editPreviewURL.value)
  }
  editPreviewURL.value = URL.createObjectURL(file)

  await uploadCourseThumbnail(file)
}

async function uploadCourseThumbnail(file) {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('請先登入')
    return
  }

  isUploadingThumbnail.value = true

  try {
    const formData = new FormData()
    formData.append('courseThumbnail', file)

    const response = await axios.post(
      'https://sportify.zeabur.app/api/v1/coaches/upload-course-thumbnail',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.data.status) {
      thumbnailUrl.value = response.data.data.url
      thumbnailPublicId.value = response.data.data.publicId
    } else {
      throw new Error(response.data.message || '封面照片上傳失敗')
    }
  } catch (error) {
    console.error('封面照片上傳失敗:', error)
    alert(`封面照片上傳失敗: ${error.response?.data?.message || error.message}`)

    if (editPreviewURL.value) {
      URL.revokeObjectURL(editPreviewURL.value)
      editPreviewURL.value = ''
    }
  } finally {
    isUploadingThumbnail.value = false
  }
}

function formatChaptersData() {
  if (!editDraggableRef.value) return []

  const chapters = editDraggableRef.value.chapters
  console.log(chapters)
  return chapters.map((chapter, chapterIndex) => ({
    chapter_number: chapterIndex + 1,
    chapter_title: chapter.title,
    sub_chapter: chapter.sections.map((section, sectionIndex) => ({
      subchapter_id: section.id,
      sub_chapter_number: sectionIndex + 1,
      subtitle: section.title,
      filename: section.fileName || ''
    }))
  }))
}

async function updateCourse() {
  // 表單驗證
  if (!editForm.value.name.trim()) {
    alert('請輸入課程名稱')
    return
  }

  if (!editForm.value.intro.trim()) {
    alert('請輸入課程介紹')
    return
  }

  if (!editForm.value.category) {
    alert('請選擇課程類別')
    return
  }

  isSubmitting.value = true

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('請先登入')
      return
    }

    const chapters = formatChaptersData()

    const courseData = {
      name: editForm.value.name,
      description: editForm.value.intro,
      sports_type: editForm.value.category,
      image_url: editForm.value.currentImageUrl,
      image_public_id: editForm.value.currentImageID,
      chapters
    }

    // 如果有上傳新的封面照片
    if (thumbnailUrl.value && thumbnailPublicId.value) {
      courseData.image_url = thumbnailUrl.value
      courseData.image_public_id = thumbnailPublicId.value
    }

    console.log('courseData', courseData)
    const response = await axios.patch(
      `https://sportify.zeabur.app/api/v1/coaches/courses/${editForm.value.id}`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log('editForm', editForm.value)
    console.log('courseData', courseData)
    if (response.data.status) {
      alert('課程更新成功！')

      // 關閉 Modal
      const modalEl = document.getElementById('editCourseModal')
      // eslint-disable-next-line no-undef
      const modal = bootstrap.Modal.getInstance(modalEl)
      modal.hide()

      // 重新載入課程列表
      await getCourses()
    } else {
      throw new Error(response.data.message || '更新課程失敗')
    }
  } catch (error) {
    console.error('更新課程失敗:', error)
    alert(`更新課程失敗: ${error.response?.data?.message || error.message}`)
  } finally {
    isSubmitting.value = false
  }
}

const handleCourseIdReceived = id => {
  console.log('接收到 course_id:', id)
}

onMounted(async () => await getCourses())
</script>

<style scoped lang="scss">
.course-grid {
  .course-card {
    width: 100%; // 預設手機版 1 欄

    @media (min-width: 768px) {
      width: calc((100% - 40px) / 2); // 平板 2 欄
    }

    @media (min-width: 992px) {
      width: calc((100% - 80px) / 3); // 桌機 3 欄
    }
  }
}

.card {
  border: 1px solid rgba(236, 239, 253, 1);
  box-shadow: 0 0 5px 0 rgba(94, 142, 221, 1);
  background-color: rgba(252, 252, 252, 0.1);
}

.img-decorate {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end; // 改為右對齊，只顯示審核狀態
  position: absolute;
  padding: 12px;
  z-index: 10;
}

.img-container {
  width: 100%;
  height: 160px; // 固定高度
  margin-bottom: 20px;
}

.badge {
  box-shadow: inset 0px 0px 0px 1px $primary-400;
  border-radius: 100px;
  line-height: 150%;
  padding: 4px 8px;
  font-weight: 600;

  &.badge-approved {
    background-color: $success;
  }
  &.badge-pending {
    background-color: $notification;
  }
}

.card-img-top {
  width: 100%;
  height: 160px;
  object-fit: cover;

  &.no-image {
    background-color: #f8f9fa;
    border: 1px dashed #dee2e6;

    .material-symbols-outlined {
      font-size: 48px;
      color: #6c757d;
    }
  }
}

.card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-title {
  line-height: 1.5;
  font-weight: 700;
}

.material-symbols-outlined {
  color: $secondary-600;
  padding-right: 4px;
  font-size: 18px;

  &.star {
    font-variation-settings: 'FILL' 1;
  }
}

.card-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
