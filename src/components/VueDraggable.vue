<script setup>
import { ref, computed } from 'vue'
// import draggable from 'vuedraggable'
import { nanoid } from 'nanoid'

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
  chapters.value.push({ id: nanoid(), title: '新章節', sections: [] })

const addSection = chapter =>
  chapter.sections.push({ id: nanoid(), title: '新小節', file: null })

const onFileChange = (section, file) => {
  section.file = file
}

const saveOrder = () => {
  console.log('新排序', JSON.parse(JSON.stringify(chapters.value)))
  // 可以在這裡呼叫 API 保存
  // await saveChaptersOrder(chapters.value)
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

// 複製功能
const duplicateChapter = chapter => {
  const newChapter = {
    ...JSON.parse(JSON.stringify(chapter)),
    id: nanoid(),
    title: `${chapter.title} (副本)`
  }
  newChapter.sections.forEach(section => {
    section.id = nanoid()
  })
  chapters.value.push(newChapter)
}

// 章節折疊功能
const toggleChapter = chapter => {
  chapter.collapsed = !chapter.collapsed
}

// 批量操作
const selectAll = ref(false)
const selectedItems = ref(new Set())

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value.clear()
  } else {
    chapters.value.forEach(chapter => {
      selectedItems.value.add(chapter.id)
      chapter.sections.forEach(section => {
        selectedItems.value.add(section.id)
      })
    })
  }
  selectAll.value = !selectAll.value
}
</script>

<template>
  <div class="draggable-container">
    <!-- 工具列 -->
    <div class="toolbar">
      <div class="stats">
        總計: {{ chapters.length }} 章節 / {{ totalSections }} 小節
      </div>
      <div class="actions">
        <button @click="toggleSelectAll">
          {{ selectAll ? '取消全選' : '全選' }}
        </button>
        <button class="primary" @click="addChapter">＋ 新增章節</button>
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
            collapsed: chapter.collapsed,
            selected: selectedItems.has(chapter.id)
          }"
        >
          <div class="chapter-header">
            <span class="chapter-handle handle">⋮⋮</span>

            <input
              type="checkbox"
              :checked="selectedItems.has(chapter.id)"
              @change="toggleSelection(chapter.id)"
            />

            <input
              v-model="chapter.title"
              class="chapter-title"
              placeholder="大章節名稱"
              @blur="saveOrder"
            />

            <div class="chapter-actions">
              <button
                class="icon-btn"
                :title="chapter.collapsed ? '展開' : '折疊'"
                @click="toggleChapter(chapter)"
              >
                {{ chapter.collapsed ? '▶' : '▼' }}
              </button>

              <button
                class="icon-btn"
                title="複製章節"
                @click="duplicateChapter(chapter)"
              >
                📋
              </button>

              <button
                class="icon-btn"
                title="新增小節"
                @click="addSection(chapter)"
              >
                ＋
              </button>

              <button
                class="icon-btn danger"
                title="刪除章節"
                @click="removeChapter(chapterIndex)"
              >
                🗑️
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
                <div
                  class="section-item"
                  :class="{ selected: selectedItems.has(section.id) }"
                >
                  <span class="section-handle handle">⋮⋮</span>

                  <input
                    type="checkbox"
                    :checked="selectedItems.has(section.id)"
                    @change="toggleSelection(section.id)"
                  />

                  <input
                    v-model="section.title"
                    class="section-title"
                    placeholder="小章節名稱"
                    @blur="saveOrder"
                  />

                  <input
                    type="file"
                    accept="video/*"
                    @change="onFileChange(section, $event.target.files[0])"
                  />

                  <span v-if="section.file" class="file-info">
                    📎 {{ section.file.name }}
                  </span>

                  <button
                    class="icon-btn danger"
                    title="刪除小節"
                    @click="removeSection(chapter, sectionIndex)"
                  >
                    ✕
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
      <p>點擊「新增章節」開始建立您的課程結構</p>
      <button class="primary" @click="addChapter">＋ 新增第一個章節</button>
    </div>
  </div>
</template>

<style scoped>
.draggable-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

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
</style>
