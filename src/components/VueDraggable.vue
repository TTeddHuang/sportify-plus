<script setup>
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import { v4 as uuidv4 } from 'uuid'

/* ---------- state ---------- */
const chapters = ref([])
const isDragging = ref(false)
const draggedItem = ref(null)

/* ---------- computed ---------- */
const totalSections = computed(() =>
  chapters.value.reduce((total, chapter) => total + chapter.sections.length, 0)
)

/* ---------- helpers ---------- */
const addChapter = () =>
  chapters.value.push({
    id: uuidv4(),
    title: '新章節',
    collapsed: false,
    sections: []
  })

const addSection = chapter => {
  if (chapter.collapsed) {
    chapter.collapsed = false
  }
  chapter.sections.push({
    id: uuidv4(),
    title: '新小節',
    file: null,
    fileName: '',
    fileSize: 0
  })
}

const onFileChange = (section, file) => {
  if (file) {
    section.file = file
    section.fileName = file.name
    section.fileSize = file.size
    console.log('檔案已選取:', file.name)
  } else {
    section.file = null
    section.fileName = ''
    section.fileSize = 0
  }
  saveOrder()
}

// ✅ 檢查檔案是否存在
const hasFile = section => {
  return section.file && section.fileName
}

const saveOrder = () => {
  // console.log('新排序', JSON.parse(JSON.stringify(chapters.value)))
  // 可以在這裡呼叫 API 保存
  // await saveChaptersOrder(chapters.value)
}

// ✅ 新增：處理 Enter 鍵事件
const handleKeydown = event => {
  if (event.key === 'Enter') {
    event.preventDefault() // 阻止預設行為
    event.target.blur() // 讓輸入框失去焦點，觸發 @blur 保存
  }
}

// 刪除功能
const removeChapter = index => {
  if (confirm('確定要刪除這個章節嗎？')) {
    chapters.value.splice(index, 1)
    saveOrder()
  }
}

const removeSection = (chapter, sectionIndex) => {
  if (confirm('確定要刪除這個小節嗎？')) {
    chapter.sections.splice(sectionIndex, 1)
    saveOrder()
  }
}

// 拖曳狀態管理
const onDragStart = item => {
  isDragging.value = true
  draggedItem.value = item
}

const onDragEnd = () => {
  isDragging.value = false
  draggedItem.value = null
}

// 章節折疊功能
const toggleChapter = chapter => {
  chapter.collapsed = !chapter.collapsed
}

// ✅ 移除檔案
const removeFile = section => {
  section.file = null
  section.fileName = ''
  section.fileSize = 0
  saveOrder()
}

// ✅ 格式化檔案大小
const formatFileSize = bytes => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

defineExpose({
  chapters
})
</script>

<template>
  <div class="draggable-container">
    <!-- 工具列 -->
    <div class="toolbar">
      <div class="stats">
        總計: {{ chapters.length }} 章節 / {{ totalSections }} 小節
      </div>
      <div class="actions">
        <button class="primary" @click.prevent="addChapter">＋ 新增章節</button>
      </div>
    </div>

    <!-- 拖曳區域 -->
    <draggable
      v-model="chapters"
      item-key="id"
      handle=".chapter-handle"
      animation="200"
      :class="{ 'is-dragging': isDragging }"
      @start="onDragStart"
      @end="onDragEnd"
      @change="saveOrder"
    >
      <template #item="{ element: chapter, index: chapterIndex }">
        <div
          class="chapter-card"
          :class="{
            collapsed: chapter.collapsed
          }"
        >
          <div class="chapter-header">
            <span class="chapter-handle handle material-symbols-outlined">
              drag_indicator
            </span>
            <input
              v-model="chapter.title"
              class="chapter-title"
              placeholder="大章節名稱"
              @blur="saveOrder"
              @keydown="handleKeydown"
            />
            <div class="chapter-actions">
              <button
                class="icon-btn"
                title="新增小節"
                @click.prevent="addSection(chapter)"
              >
                <span class="material-symbols-outlined"> add </span>
              </button>
              <button
                class="icon-btn danger"
                title="刪除章節"
                @click.prevent="removeChapter(chapterIndex)"
              >
                <span class="material-symbols-outlined"> delete </span>
              </button>
              <button
                class="icon-btn"
                :title="chapter.collapsed ? '展開' : '折疊'"
                @click.prevent="toggleChapter(chapter)"
              >
                <span class="material-symbols-outlined">
                  {{ chapter.collapsed ? 'stat_1' : 'stat_minus_1' }}
                </span>
              </button>
            </div>
          </div>
          <!-- 小節區域 -->
          <div v-show="!chapter.collapsed" class="sections-container">
            <draggable
              v-model="chapter.sections"
              item-key="id"
              :group="{ name: 'sections', pull: true, put: true }"
              handle=".section-handle"
              animation="180"
              @start="onDragStart"
              @end="onDragEnd"
              @change="saveOrder"
            >
              <template #item="{ element: section, index: sectionIndex }">
                <div class="section-item">
                  <span class="section-handle handle material-symbols-outlined">
                    drag_indicator
                  </span>
                  <input
                    v-model="section.title"
                    class="section-title"
                    placeholder="小章節名稱"
                    @blur="saveOrder"
                    @keydown="handleKeydown"
                  />
                  <!-- ✅ 檔案處理區域 -->
                  <div class="file-section">
                    <!-- 如果沒有檔案，顯示上傳按鈕 -->
                    <div v-if="!hasFile(section)" class="file-upload">
                      <input
                        :id="`file-${section.id}`"
                        type="file"
                        accept="video/*"
                        class="file-input"
                        @change="onFileChange(section, $event.target.files[0])"
                      />
                      <label :for="`file-${section.id}`" class="file-label">
                        <span class="material-symbols-outlined">upload</span>
                        選擇影片
                      </label>
                    </div>

                    <!-- 如果有檔案，顯示檔案資訊 -->
                    <div v-else class="file-info">
                      <div class="file-details">
                        <span class="file-name">{{ section.fileName }}</span>
                        <span class="file-size">{{
                          formatFileSize(section.fileSize)
                        }}</span>
                      </div>
                      <button
                        class="icon-btn danger small"
                        title="移除檔案"
                        @click.prevent="removeFile(section)"
                      >
                        <span class="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </div>
                  <button
                    class="icon-btn danger"
                    title="刪除小節"
                    @click.prevent="removeSection(chapter, sectionIndex)"
                  >
                    <span class="material-symbols-outlined"> delete </span>
                  </button>
                </div>
              </template>
            </draggable>

            <!-- 空狀態提示 -->
            <div v-if="chapter.sections.length === 0" class="empty-sections">
              <p>尚無小節，點擊上方 ＋ 新增</p>
            </div>
          </div>
        </div>
      </template>
    </draggable>

    <!-- 空狀態 -->
    <div v-if="chapters.length === 0" class="empty-state">
      <h3>尚未建立章節</h3>
      <p>點擊「新增章節」開始建立您的課程</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
}

.stats {
  color: #666;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
}

.chapter-card {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  background: #fff;
  transition: all 0.2s ease;
}

.chapter-card:hover {
  border-color: #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chapter-card.selected {
  border-color: #007acc;
  background: #f0f8ff;
}

.chapter-card.collapsed {
  opacity: 0.7;
}

.chapter-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
}

.chapter-title {
  flex: 1;
  border: none;
  background: transparent;
  font-weight: 600;
  font-size: 16px;
}

.chapter-actions {
  display: flex;
  gap: 4px;
}

.sections-container {
  padding: 8px 0;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.section-item:last-child {
  border-bottom: none;
}

.section-item.selected {
  background: #f0f8ff;
}

.section-title {
  flex: 1;
  border: none;
  background: transparent;
  padding: 4px 8px;
  border-radius: 4px;
}

.section-title:focus {
  background: white;
  border: 1px solid #007acc;
}

.handle {
  cursor: grab;
  user-select: none;
  font-size: 16px;
  color: #999;
  padding: 4px;
}

.handle:hover {
  color: #666;
}

.handle:active {
  cursor: grabbing;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.icon-btn:hover {
  background: #f0f0f0;
}

.icon-btn.danger:hover {
  background: #ffe6e6;
  color: #d32f2f;
}

.icon-btn.primary {
  background: #007acc;
  color: white;
}

.file-info {
  font-size: 12px;
  color: #666;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-sections {
  text-align: center;
  padding: 20px;
  color: #999;
  font-style: italic;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.is-dragging {
  opacity: 0.8;
}

button.primary {
  background: #007acc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button.primary:hover {
  background: #005a9e;
}

/* ✅ 檔案處理樣式 */
.file-section {
  min-width: 200px;
}

.file-upload {
  position: relative;
}

.file-input {
  display: none;
}

.file-label {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f8f9fa;
  border: 1px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #666;
  transition: all 0.2s ease;
}

.file-label:hover {
  background: #e9ecef;
  border-color: #007acc;
  color: #007acc;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #e8f5e8;
  border: 1px solid #4caf50;
  border-radius: 4px;
  min-width: 180px;
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #2e7d32;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  display: block;
  font-size: 10px;
  color: #4caf50;
}

.icon-btn.small {
  padding: 2px 4px;
  font-size: 12px;
}

.icon-btn.small .material-symbols-outlined {
  font-size: 14px;
}
</style>
