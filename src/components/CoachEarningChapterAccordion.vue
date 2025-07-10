<template>
  <div id="chapterAccordion" class="accordion">
    <div
      v-for="(chapter, idx) in chapters"
      :key="chapter.chapterNumber"
      class="accordion-item bg-white border rounded mb-2"
    >
      <h2 class="accordion-header">
        <button
          class="accordion-button bg-light fs-6 fw-bold custom-accordion-btn"
          type="button"
          @click="toggle(idx)"
        >
          <span>{{ chapter.title }}</span>
          <i
            class="ms-auto"
            :class="[
              'bi',
              openIndexes[idx] ? 'bi-chevron-up' : 'bi-chevron-down'
            ]"
          ></i>
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        :class="{ show: openIndexes[idx] }"
      >
        <div class="accordion-body w-100 p-0">
          <div class="row g-3">
            <div class="col-md-6 col-12">
              <Bar
                v-if="hasChartData(chapter)"
                :data="convertToBarChartData(chapter)"
                :options="barChartOptions"
                class="mb-3"
              />
            </div>
            <div class="col-md-6 col-12 text-sm text-gray-700 stats-box">
              <p>觀看人次: {{ chapter.totalViews.toLocaleString() }}</p>
              <p>上月新增人次: {{ chapter.lastMonth.toLocaleString() }}</p>
              <p>當月新增人次: {{ chapter.currentMonth.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
} from 'chart.js'

// 註冊 Chart.js 元件
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend)

const props = defineProps({
  chapters: {
    type: Array,
    required: true
  }
})
// 註冊 Chart.js 元件
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend)

const openIndexes = ref([])
// 檢查並制止Bar為空時渲染
function hasChartData(chapter) {
  const data = convertToBarChartData(chapter)
  return data.labels.length > 0 && data.datasets.length > 0
}

watch(
  () => props.chapters,
  val => {
    openIndexes.value = val.map(() => false)
  },
  { immediate: true }
)

function toggle(index) {
  openIndexes.value[index] = !openIndexes.value[index]
}

function convertToBarChartData(chapter) {
  return {
    labels: Object.keys(chapter.monthly),
    datasets: [
      {
        label: '觀看次數',
        data: Object.values(chapter.monthly),
        backgroundColor: '#60a5fa'
      }
    ]
  }
}

const barChartOptions = {
  responsive: true,
  scales: {
    y: { beginAtZero: true }
  },
  plugins: {
    legend: { display: false },
    title: { display: false }
  }
}
</script>
<style scoped>
h2 {
  margin-bottom: 0;
}
p {
  color: #001f3f;
  margin-bottom: 0;
}
.accordion-button::after {
  display: none;
}
.accordion-button.custom-accordion-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.accordion-body {
  padding-top: 24px;
}
.stats-box {
  padding-top: 24px;
  padding-left: 24px;
}
</style>
