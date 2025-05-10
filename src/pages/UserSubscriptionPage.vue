<!-- src/components/SubscriptionSelector.vue -->
<template>
  <section class="subscription-plans py-lg-12">
    <div class="container">
      <!-- 1. 目前方案顯示 -->

      <!-- 2. 方案卡片 -->
      <div class="row gx-5 gy-4">
        <div v-for="plan in plans" :key="plan.key" class="col-lg-4">
          <div
            class="card h-100 rounded-4 border border-primary-000"
            :class="{
              'border-3 border-secondary-700': selectedPlan === plan.key
            }"
          >
            <div
              class="card-body p-4 d-flex flex-column"
              :class="[plan.bodyClass]"
            >
              <h5
                class="card-title mb-3 text-center fw-bold"
                :class="plan.titleClass"
              >
                {{ plan.name }} 方案
              </h5>
              <p class="card-text mb-4 plan-desc">
                {{ plan.description }}
              </p>
              <h2 class="fw-bold mb-4 text-center">
                {{ plan.price }}
                <small class="text-muted fs-6">/每月</small>
              </h2>
              <ul class="list-unstyled flex-grow-1 mb-4 text-center">
                <li v-for="(feat, i) in plan.features" :key="i" class="mb-2">
                  • {{ feat }}
                </li>
              </ul>
              <button
                class="mt-auto btn btn-lg btn-primary"
                :class="plan.buttonClass"
                @click="selectPlan(plan.key)"
              >
                {{ plan.buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mb-4 fs-lg-4">
        您目前選擇
        <strong class="text-primary">
          {{ selectedPlanLabel }}
        </strong>
        <span v-if="!selectedPlan">(尚未選擇)</span>
      </div>

      <!-- 3. 運動種類選擇（Eagerness 無需選擇） -->
      <div v-if="selectedPlan && limit < Infinity" class="mt-5">
        <div class="row gx-4">
          <div v-for="group in groups" :key="group.title" class="col-md-6 mb-4">
            <h5 class="fw-semibold mb-2">{{ group.title }}</h5>
            <div>
              <button
                v-for="item in group.items"
                :key="item.label"
                class="btn me-2 mb-2"
                :class="
                  isSelected(item.label)
                    ? 'btn-primary'
                    : 'btn-outline-secondary'
                "
                :disabled="!isSelected(item.label) && selectedCount >= limit"
                @click="toggle(item.label)"
              >
                <img
                  v-if="icons[item.iconName]"
                  :src="icons[item.iconName]"
                  class="me-1"
                  width="24"
                  height="24"
                />
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>
        <p v-if="selectedCount < limit" class="text-danger">
          您需要選擇 {{ limit }} 種運動
        </p>
      </div>

      <!-- 4. 送出按鈕 -->
      <div class="text-center mt-4">
        <button
          class="btn btn-success btn-lg"
          :disabled="!canSubmit"
          @click="submit"
        >
          選購方案
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

// 1. 用 import.meta.glob，並加上 eager: true
const iconModules = import.meta.glob('../assets/icons/*.png', {
  eager: true
})
// 2. 轉成 { 檔名: 圖片 URL } 的物件
const icons = Object.fromEntries(
  Object.entries(iconModules).map(([path, module]) => {
    // path 會像 "../assets/icons/weight.png"
    const name = path.split('/').pop().replace('.png', '')
    return [name, module.default]
  })
)

// 方案資料
const plans = [
  {
    key: 'Wellness',
    name: 'Wellness',
    description:
      '這是入門級方案，讓您每月可以選擇觀看一種類別的課程，專注於提升身心健康，適合有特定需求的使用者。',
    price: 'NT$400',
    features: ['可指定觀看一種類別課程', '最高可觀看達到 720p'],
    buttonText: '選擇方案',
    buttonClass: 'btn-outline-primary',
    bodyClass: '',
    titleClass: 'fs-lg-4'
  },
  {
    key: 'Fitness',
    name: 'Fitness',
    description:
      '無論是瑜伽、足球或重量訓練，任意組合你喜歡的課程類別，挑戰自己，讓每次運動都充滿成就感！',
    price: 'NT$700',
    features: [
      '任選組合三種類別課程',
      '最高可觀看達到 1080p',
      '可參與教練直播課程'
    ],
    buttonText: '選擇方案',
    buttonClass: 'btn-outline-primary',
    bodyClass: '',
    titleClass: 'fs-lg-4'
  },
  {
    key: 'Eagerness',
    name: 'Eagerness',
    description:
      '全平台無限開放，隨時隨地挑選你喜歡的課程，無限挑戰，讓運動成為習慣，打造最強身體！',
    price: 'NT$900',
    features: [
      '自由學習全平台所有課程',
      '最高可觀看達到 4K',
      '可參與教練直播課程'
    ],
    buttonText: '選擇方案',
    buttonClass: 'btn-primary',
    bodyClass: '',
    titleClass: 'fs-lg-4'
  }
]

// 選擇限制
const limitMap = {
  Wellness: 1,
  Fitness: 3,
  Eagerness: Infinity
}

// 運動分組
const groups = [
  {
    title: '室內運動',
    items: [
      { label: '重量訓練', iconName: 'weight-lifting' },
      { label: '游泳',     iconName: 'swimming' },
      { label: '瑜珈',     iconName: 'yoga' },
      { label: '皮拉提斯', iconName: 'pilates' },
      { label: '拳擊',     iconName: 'boxing' },
      { label: '溜冰',     iconName: 'ice-skate' }
    ]
  },
  {
    title: '戶外運動',
    items: [
      { label: '登山',     iconName: 'hiking' },
      { label: '直排輪',   iconName: 'roller-skate' },
      { label: '滑板',     iconName: 'skateboard' },
      { label: '攀岩',     iconName: 'climbing' },
      { label: '街舞',     iconName: 'street-dance' },
      { label: '球類運動', iconName: 'ball-sports' },
      { label: '自行車',   iconName: 'bicycle' }
    ]
  }
]

// state
const selectedPlan = ref('')
const selectedItems = ref([])

// methods & computed
function selectPlan(key) {
  selectedPlan.value = key
  selectedItems.value = []
}

const limit = computed(() => limitMap[selectedPlan.value] || 0)
const selectedCount = computed(() => selectedItems.value.length)

function isSelected(item) {
  return selectedItems.value.includes(item)
}

function toggle(item) {
  if (isSelected(item)) {
    selectedItems.value = selectedItems.value.filter(i => i !== item)
  } else if (selectedCount.value < limit.value) {
    selectedItems.value.push(item)
  }
}

const selectedPlanLabel = computed(() => {
  const p = plans.find(p => p.key === selectedPlan.value)
  return p ? p.name + ' 方案' : ''
})

const canSubmit = computed(() => {
  if (!selectedPlan.value) return false
  if (selectedPlan.value === 'Eagerness') return true
  return selectedCount.value === limit.value
})

// 提交
async function submit() {
  const payload = {
    subscription_name: selectedPlanLabel.value,
    course_type: selectedPlan.value === 'Eagerness' ? [] : selectedItems.value
  }
  try {
    await axios.post('/api/subscription', payload)
    alert('送出成功！')
  } catch (err) {
    console.error(err)
    alert('送出失敗')
  }
}
</script>

<style scoped lang="scss">
/* 你的原本樣式都保留，以下示範新增的部分 */
.plan-desc {
  /* 固定描述高度，讓卡片一致 */
  min-height: 96px;
  overflow: hidden;
}
</style>
