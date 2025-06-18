<template>
  <div class="container d-flex flex-column">
    <h2 class="fs-2 fw-bold">{{ coachInfo.nickname }}</h2>
    <div class="d-lg-flex justify-content-between">
      <img
        :src="coachInfo.profile_image_url"
        alt="教練照片"
        class="coach-avatar"
      />
      <div class="info-card-about ms-lg-5">
        <h3 class="mb-8 fs-5 fw-bold">關於我</h3>
        <p>
          {{ coachInfo.about_me }}
        </p>
      </div>
    </div>
    <div class="info-card">
      <h3 class="mb-8 fs-5 fw-bold">個人經歷</h3>
      <p>
        {{ coachInfo.experience }}
      </p>
    </div>
    <div class="info-card">
      <h3 class="mb-8 fs-5 fw-bold">感興趣的事物</h3>
      <p>
        {{ coachInfo.hobby }}
      </p>
    </div>
    <div class="info-card">
      <h3 class="mb-8 fs-5 fw-bold">座右銘</h3>
      <p>
        {{ coachInfo.motto }}
      </p>
    </div>
  </div>
  <WaveBanner />
  <div class="container">
    <CoachCreatedCourse :coach-id="coachId" />
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import WaveBanner from '@/components/WaveBanner.vue'
import CoachCreatedCourse from '@/components/CoachCreatedCourse.vue'

const route = useRoute()

const coachId = ref(route.params.coachId)
const coachInfo = ref({})

async function fetchCoachDetail(id) {
  try {
    const { data } = await axios.get(
      `https://sportify.zeabur.app/api/v1/courses/coaches/${id}`
    )
    coachInfo.value = data.data // 依實際結構調整
  } catch (err) {
    console.error('讀取教練失敗', err)
  }
}

onMounted(() => fetchCoachDetail(coachId.value))

watch(
  () => route.params.coachId,
  newId => {
    if (newId) {
      coachId.value = newId
      fetchCoachDetail(newId)
    }
  }
)
</script>

<style scoped lang="scss">
h2,
h3,
p {
  margin-bottom: 0;
}

.container {
  max-width: 1296px;
  height: 100%;
  margin: 80px auto;
  padding: 16px;
  gap: 80px;
  @media (max-width: 992px) {
    padding: 0 24px;
    margin-top: 40px;
    margin-bottom: 40px;
    gap: 32px;
  }
}

.coach-avatar {
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 32px;
    height: 200px;
  }
}
.info-card-about {
  background-color: rgba(255, 255, 255, 0.05);
  width: 896px;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  padding: 40px;
  border-radius: 16px;
  box-shadow: inset 0px 0px 0px 1px $primary-000;
  &:nth-of-type(1) {
    width: 896px;
  }
  @media (max-width: 992px) {
    padding: 24px;
  }
}
.info-card {
  background-color: rgba(255, 255, 255, 0.05);
  width: 100%;

  height: 320px;
  max-height: 100%;
  padding: 40px;
  border-radius: 16px;
  box-shadow: inset 0px 0px 0px 1px $primary-000;
  &:nth-of-type(1) {
    width: 896px;
  }
  @media (max-width: 992px) {
    padding: 24px;
  }
}
</style>
