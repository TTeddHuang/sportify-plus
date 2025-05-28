<template>
  <div class="container d-flex flex-column">
    <h2 class="fs-2 fw-bold">{{ coachInfo.nickname }}</h2>
    <div class="d-flex justify-content-between">
      <img
        src="https://github.com/TTeddHuang/sportify-img/blob/main/jared-rice-NTyBbu66_SI-unsplash.jpg?raw=true"
        alt="教練照片"
        class="coach-avatar"
      />
      <div class="info-card">
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
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const coachInfo = ref({})

onMounted(async () => {
  const {
    data: { data }
  } = await axios.get(
    'https://sportify-backend-1wt9.onrender.com/api/v1/courses/coaches/2bca7644-3899-4e06-89a4-c35f737284d0'
  )
  coachInfo.value = data
})
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
  padding: 0;
  gap: 80px;
}

.coach-avatar {
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
}

.info-card {
  background-color: rgba(255, 255, 255, 0.05);
  width: 100%;
  height: 320px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: inset 0px 0px 0px 1px $primary-000;
  &:nth-of-type(1) {
    width: 896px;
  }
}
</style>
