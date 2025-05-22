<template>
  <section class="subscription-plans py-lg-12">
    <div class="container">
      <h2 class="plans-title text-center mb-4 fs-lg-2 mb-lg-12">
        從這裡開始，一起尋找你喜歡的運動方式！
      </h2>
      <div class="table-responsive">
        <table class="table plan-table align-middle text-center mb-0">
          <tbody>
            <!-- 第一行：方案名稱 & 價錢 & 按鈕 -->
            <tr>
              <td class="label-cell fw-semibold fs-lg-6">方案</td>
              <td v-for="plan in plans" :key="plan.name">
                <div class="plan-card fs-lg-6 my-lg-12">
                  <h5 class="plan-name mb-5">{{ plan.name }} 方案</h5>
                  <p class="plan-price mb-5 fs-lg-3">
                    {{ plan.price }}<small class="ms-1 fs-lg-6">/月</small>
                  </p>
                  <button
                    :class="[
                      'btn',
                      'btn-lg',
                      plan.action.type === 'solid'
                        ? 'btn-primary-600'
                        : 'btn-outline-light'
                    ]"
                  >
                    <router-link
                      to="/users/subscription"
                      class="text-primary-000"
                    >
                      {{ plan.action.text }}
                    </router-link>
                  </button>
                </div>
              </td>
            </tr>
            <!-- 其餘行：各項規格，手動加粗處理 -->
            <tr v-for="row in rows" :key="row.label">
              <td class="label-cell fw-semibold fs-lg-6 py-lg-12 px-4">
                {{ row.label }}
              </td>
              <td
                v-for="(parts, idx) in row.values"
                :key="idx"
                class="fs-lg-4 fw-bold"
              >
                <span>
                  <span
                    v-for="(part, pidx) in parts"
                    :key="pidx"
                    :class="part.bold ? 'fs-lg-4 fw-bold' : 'fs-lg-6'"
                  >
                    {{ part.text }}
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="my-lg-12 py-lg-8 border border-primary-000 text-center"
        style="border-radius: 16px"
      >
        <div class="mb-lg-8">
          <p class="fs-lg-4 mb-lg-2">準備好開啟全新的健身旅程了嗎？</p>
          <p class="fs-lg-6">加入 Sportify+，和上千名會員一起改變生活。</p>
        </div>
        <button
          class="btn-primary-600 btn px-lg-5 py-lg-3 fs-lg-6"
          type="button"
        >
          <router-link to="/users/subscription" class="text-primary-000">
            免費試用 7日 Eagerness 方案
          </router-link>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// 訂閱方案資料
const plans = [
  {
    name: 'Wellness',
    price: 'NT$ 400',
    action: { text: '我要加入', type: 'outline' }
  },
  {
    name: 'Fitness',
    price: 'NT$ 700',
    action: { text: '我要加入', type: 'outline' }
  },
  {
    name: 'Eagerness',
    price: 'NT$ 900',
    action: { text: '免費試用 7 日', type: 'solid' }
  }
]

// 規格列資料，以陣列拆解文字與加粗區段
const rows = [
  {
    label: '觀看權限',
    values: [
      [
        { text: '可指定觀看 ', bold: false },
        { text: '1', bold: true },
        { text: ' 類別課程', bold: false }
      ],
      [
        { text: '可指定觀看 ', bold: false },
        { text: '3', bold: true },
        { text: ' 類別課程', bold: false }
      ],
      [
        { text: '可觀看 ', bold: false },
        { text: '所有', bold: true },
        { text: ' 類別課程', bold: false }
      ]
    ]
  },
  {
    label: '影片畫質',
    values: [
      [{ text: '720p', bold: true }],
      [{ text: '1080p', bold: true }],
      [{ text: '4k', bold: true }]
    ]
  },
  {
    label: '收看直播課程',
    values: [
      [{ text: '無', bold: true }],
      [{ text: '可', bold: true }],
      [{ text: '可', bold: true }]
    ]
  }
]
</script>

<style scoped lang="scss">
.table-responsive {
  border: 1px solid #eceffd;
  border-radius: 16px;
  overflow: hidden;
}
.subscription-plans {
  &,
  & * {
    color: $primary-000 !important;
  }
}
.plan-table {
  border-collapse: collapse;
  width: 100%;
}
.plan-table td,
.plan-table th {
  border: 1px solid #eceffd;
  vertical-align: middle;
  padding: 1.5rem;
  text-align: center;
}
.label-cell {
  text-align: center;
  font-weight: 600;
}
.plan-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.plan-name {
  font-weight: 600;
}
.plan-price {
  font-size: 1.75rem;
  font-weight: 700;
}
.btn-outline-light {
  background: transparent;
  border: 1px solid $primary-000;
}
/* Eagerness 欄背景色 */
.plan-table td:nth-child(4) {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
