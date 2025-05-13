<!-- src/components/SubscriptionSelector.vue -->
<template>
  <section class="subscription-plans mt-lg-10">
    <div class="container">
      <h2 class="text-center mb-lg-10">選擇你的訂閱方案</h2>
      <!-- 1. 目前方案顯示 -->

      <!-- 2. 方案卡片 -->
      <div class="row gx-5 gy-4">
        <div v-for="plan in plans" :key="plan.key" class="col-lg -4">
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
      <div class="text-center my-lg-12 fs-lg-4">
        您目前選擇
        <strong class="text-primary">
          {{ selectedPlanLabel }}
        </strong>
        <span v-if="!selectedPlan">(尚未選擇)</span>
        <p v-if="selectedCount < limit" class="text-danger">
          您需要選擇 {{ limit }} 種運動
        </p>
      </div>

      <!-- 3. 運動種類選擇（Eagerness 無需選擇） -->
      <div v-if="selectedPlan && limit < Infinity" class="mt-5">
        <div class="row gx-4">
          <div
            v-for="group in groups"
            :key="group.title"
            class="col-md-6 mb-4 text-center"
          >
            <h5 class="fw-semibold mb-2">{{ group.title }}</h5>
            <div class="d-flex justify-content-center flex-wrap">
              <button
                v-for="item in group.items"
                :key="item.label"
                class="btn me-2 mb-2"
                :class="
                  isSelected(item.label)
                    ? 'btn-primary'
                    : 'btn-grey-500 text-black'
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
        <!-- <p v-if="selectedCount < limit" class="text-danger">
          您需要選擇 {{ limit }} 種運動
        </p> -->
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
import { ref, computed, onMounted } from 'vue'
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

// 訂閱方案
const plans = ref([])
const limitMap = ref({})

// 運動項目
const groups = ref([])

onMounted(async () => {
  try {
    // 取得運動種類
    const sportsRes = await axios.get(
      'https://sportify-backend-1wt9.onrender.com/api/v1/users/show-sports-type'
    )
    const { indoor, outdoor } = sportsRes.data.data

    groups.value = [
      {
        title: '室內運動',
        items: indoor.map(item => ({
          label: item.name,
          iconName: labelToIcon[item.name] || 'default'
        }))
      },
      {
        title: '戶外運動',
        items: outdoor.map(item => ({
          label: item.name,
          iconName: labelToIcon[item.name] || 'default'
        }))
      }
    ]

    // ✅ 取得方案資料
    const planRes = await axios.get(
      'https://sportify-backend-1wt9.onrender.com/api/v1/users/plan-info'
    )
    const planData = planRes.data.data

    plans.value = planData.map(plan => {
      const resolutionLabel =
        plan.max_resolution === 2160
          ? '4K'
          : plan.max_resolution === 1080
            ? '1080p'
            : plan.max_resolution === 720
              ? '720p'
              : `${plan.max_resolution}p`

      return {
        key: plan.name.replace('方案', ''), // 例如 "Wellness"
        name: plan.name.replace('方案', ''),
        description: plan.intro,
        price: `NT$${plan.pricing}`,
        features: [
          plan.sports_choice > 0
            ? `任選 ${plan.sports_choice} 種課程類別`
            : '自由學習全平台所有課程',
          `最高可觀看達到 ${resolutionLabel}`,
          plan.livestream ? '可參與教練直播課程' : null
        ].filter(Boolean),
        buttonText: '選擇方案',
        buttonClass:
          plan.pricing === 0
            ? 'btn-outline-secondary'
            : plan.name.includes('Eagerness')
              ? 'btn-primary'
              : 'btn-outline-primary',
        bodyClass: '',
        titleClass: 'fs-lg-4'
      }
    })

    // ✅ 產生限制對照表
    limitMap.value = Object.fromEntries(
      planData.map(plan => [
        plan.name.replace('方案', ''), // e.g., "Wellness"
        plan.sports_choice === 0 ? Infinity : plan.sports_choice
      ])
    )
  } catch (err) {
    console.error('載入資料失敗', err)
  }
})

const limit = computed(() => limitMap.value?.[selectedPlan.value] ?? 0)
const selectedPlanLabel = computed(() => {
  const p = plans.value.find(p => p.key === selectedPlan.value)
  return p ? p.name + ' 方案' : ''
})

// 對照表
const labelToIcon = {
  瑜珈: 'yoga',
  皮拉提斯: 'pilates',
  重訓: 'weight-lifting',
  有氧: 'aerobic',
  舞蹈: 'dance',
  足球: 'football',
  單車: 'bicycle',
  籃球: 'basketball',
  登山: 'hiking',
  羽球: 'badminton',
  滑板: 'skateboard',
  游泳: 'swimming'
}

// state
const selectedPlan = ref('')
const selectedItems = ref([])

// methods & computed
function selectPlan(key) {
  selectedPlan.value = key
  selectedItems.value = []
}

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
