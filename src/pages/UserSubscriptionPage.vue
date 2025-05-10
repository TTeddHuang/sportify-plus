<template>
  <section class="subscription-plans py-lg-12">
    <div class="container">
      <h2 class="plans-title text-center mb-lg-12 mb-5 fs-lg-2">
        選擇你的訂閱方案
      </h2>
      <div class="row gx-5 gy-4">
        <div v-for="plan in plans" :key="plan.name" class="col-lg-4">
          <div class="card h-100 rounded-4 border border-primary-000">
            <div
              class="card-body p-4 d-flex flex-column"
              :class="plan.bodyClass"
            >
              <h5 class="card-title mb-3 text-center" :class="plan.titleClass">
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
              <a href="#" class="mt-auto btn btn-lg" :class="plan.buttonClass">
                {{ plan.buttonText }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const plans = ref([
  {
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
])
</script>

<style scoped lang="scss">
.plan-desc {
  min-height: 96px;
  height: 96px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
