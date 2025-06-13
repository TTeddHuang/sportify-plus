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
          @change="selectImg"
        />
        <img
          v-if="previewURL"
          :src="previewURL"
          alt="照片預覽"
          class="mt-3 img-preview"
        />
      </div>
      <div class="mb-5">
        <label class="form-label">課程影片上傳</label>
        <draggable ref="draggableRef"></draggable>
      </div>
      <div class="text-center mt-8">
        <button
          type="submit"
          class="btn btn-primary submit-btn"
          @click.prevent="formSubmit"
        >
          建立新課程
        </button>
        <!-- 測試按鈕 -->
        <button
          type="button"
          class="btn btn-primary ml-2"
          @click="getDraggableData"
        >
          取得章節資料
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import draggable from '@/components/VueDraggable.vue'

const categories = ['瑜珈', '單車', '登山', '皮拉提斯']
const form = reactive({ name: '', intro: '', category: '' })
const previewURL = ref('')
const draggableRef = ref(null)

function getDraggableData() {
  if (draggableRef.value) {
    // 取得所有章節資料
    const chapters = draggableRef.value.chapters
    console.log('所有章節資料:', chapters)

    // 取得所有章節的 ID
    const chapterIds = chapters.map(chapter => chapter.id)
    console.log('章節 IDs:', chapterIds)

    // 取得所有小節的 ID
    const sectionIds = []
    chapters.forEach(chapter => {
      chapter.sections.forEach(section => {
        sectionIds.push(section.id)
      })
    })
    console.log('小節 IDs:', sectionIds)
  }
}

function selectImg(e) {
  const file = e.target.files[0]
  const allowed = ['png', 'jpeg']
  const type = file.type.split('/').pop()
  if (!allowed.includes(type)) {
    return alert('僅支援圖片格式(png, jpg, jpeg)')
  }

  if (file.size > 5 * 1024 * 1024) {
    return alert('檔案請勿超過5MB')
  }

  if (previewURL.value) {
    URL.revokeObjectURL(previewURL.value)
  }
  previewURL.value = URL.createObjectURL(file)
}

function formSubmit() {
  console.log('已送出資料', { ...form })
}
</script>

<style scoped lang="scss">
.img-preview {
  max-width: 200px;
}
</style>
