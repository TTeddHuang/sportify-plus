<template>
  <div class="form-panel p-8">
    <form class="container">
      <div class="mb-5">
        <label for="name" class="form-label">課程名稱</label>
        <input
          id="name"
          v-model.trim="form.name"
          type="text"
          class="form-control"
          placeholder="請輸入課程名稱"
          required
        />
      </div>
      <div class="mb-5">
        <label for="intro" class="form-label">課程介紹</label>
        <textarea
          id="intro"
          v-model="form.intro"
          class="form-control"
          rows="5"
          placeholder="請輸入課程介紹"
          required
        ></textarea>
      </div>
      <div class="mb-5">
        <label for="category" class="form-label">課程類別</label>
        <select
          id="category"
          v-model="form.category"
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
        <label for="photo" class="form-label">上傳封面照片</label>
        <input
          id="photo"
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
          v-if="previewURL"
          :src="previewURL"
          alt="照片預覽"
          class="mt-3 img-preview"
        />
      </div>
      <div class="mb-5">
        <label class="form-label">課程影片上傳</label>
        <draggable
          ref="draggableRef"
          @course-id-received="handleCourseIdReceived"
        ></draggable>
      </div>
      <div class="text-center mt-8">
        <button
          type="submit"
          class="btn btn-primary submit-btn"
          @click.prevent="formSubmit"
        >
          建立新課程
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import draggable from '@/components/VueDraggable.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const courseId = ref(null)
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
const form = reactive({ name: '', intro: '', category: '' })
const previewURL = ref('')
const draggableRef = ref(null)
const isSubmitting = ref(false)
const isUploadingThumbnail = ref(false)
const thumbnailUrl = ref('')
const thumbnailPublicId = ref('')

const handleCourseIdReceived = id => {
  courseId.value = id
  console.log('接收到 course_id:', id)
}

function formatChaptersData() {
  if (!draggableRef.value) return []

  const chapters = draggableRef.value.chapters

  return chapters.map((chapter, chapterIndex) => ({
    chapter_number: chapterIndex + 1,
    chapter_title: chapter.title,
    sub_chapter: chapter.sections.map((section, sectionIndex) => ({
      subchapter_id: section.id,
      sub_chapter_number: sectionIndex + 1,
      subtitle: section.title,
      filename: section.fileName
    }))
  }))
}

async function createCourse() {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('請先登入')
    return
  }

  const chapters = formatChaptersData()

  const courseData = {
    name: form.name,
    description: form.intro,
    sports_type: form.category,
    chapters
  }

  if (thumbnailUrl.value && thumbnailPublicId.value) {
    courseData.image_url = thumbnailUrl.value
    courseData.image_public_id = thumbnailPublicId.value
  }
  console.log(courseData)
  try {
    const response = await axios.patch(
      `https://sportify.zeabur.app/api/v1/coaches/courses/${courseId.value}`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.data.status) {
      alert('課程建立成功！')
      router.push('/coach/courses')
    } else {
      throw new Error(response.data.message || '建立課程失敗')
    }
  } catch (error) {
    console.error('建立課程失敗:', error)
    alert(`建立課程失敗: ${error.response?.data?.message || error.message}`)
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

  if (previewURL.value) {
    URL.revokeObjectURL(previewURL.value)
  }
  previewURL.value = URL.createObjectURL(file)

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
      console.log('封面照片上傳成功:', response.data.data)
    } else {
      throw new Error(response.data.message || '封面照片上傳失敗')
    }
  } catch (error) {
    console.error('封面照片上傳失敗:', error)
    alert(`封面照片上傳失敗: ${error.response?.data?.message || error.message}`)

    // 上傳失敗時清除預覽
    if (previewURL.value) {
      URL.revokeObjectURL(previewURL.value)
      previewURL.value = ''
    }
  } finally {
    isUploadingThumbnail.value = false
  }
}

async function formSubmit() {
  // 表單驗證
  if (!form.name.trim()) {
    alert('請輸入課程名稱')
    return
  }

  if (!form.intro.trim()) {
    alert('請輸入課程介紹')
    return
  }

  if (!form.category) {
    alert('請選擇課程類別')
    return
  }

  // 檢查是否有上傳封面照片
  if (!thumbnailUrl.value) {
    alert('請上傳課程封面照片')
    return
  }

  // 檢查是否有章節資料
  if (
    !draggableRef.value ||
    !draggableRef.value.chapters ||
    draggableRef.value.chapters.length === 0
  ) {
    alert('請至少建立一個章節')
    return
  }

  // 檢查章節是否有影片
  const chapters = draggableRef.value.chapters
  let hasVideo = false

  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (section.fileName) {
        hasVideo = true
        break
      }
    }
    if (hasVideo) break
  }

  if (!hasVideo) {
    alert('請至少上傳一個影片')
    return
  }

  isSubmitting.value = true

  try {
    await createCourse()
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
.img-preview {
  max-width: 200px;
}
</style>
