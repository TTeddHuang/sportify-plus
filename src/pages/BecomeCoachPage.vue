<template>
  <div class="hero-wrapper h-100">
    <div class="container">
      <div class="text-area">
        <div class="inner-content">
          <h1 class="mb-lg-8">與我們一起教學</h1>
          <p class="fs-lg-6">
            透過影片教學，分享你的專業技能、知識與獨特教學風格
          </p>
          <p class="fs-lg-6">
            透過 Sportify+ 平台，遠端指導來自各地的學生，拓展影響力
          </p>
          <p class="mb-lg-8 fs-lg-6">
            運用你的專業，創造彈性且可持續的額外收入
          </p>
          <router-link
            to="/coaches/signup"
            class="custom fs-lg-6 d-inline-flex justify-content-center align-items-center btn-lg"
            style="
              max-width: 128px;
              height: 62px;
              border-radius: 8px;
              box-sizing: border-box;
              padding: 0;
            "
          >
            成為教練
          </router-link>
        </div>
      </div>
    </div>
    <div class="image-area"></div>
  </div>
  <WaveBanner />
  <HowToStartTeaching />
  <WaveBannerReverse />
  <!-- CoachGrid -->
  <div class="coaches text-center my-lg-12 text-white">
    <div class="container">
      <h2 class="mb-lg-12">多種運動項目，涵蓋室內外100+位活躍教練</h2>
      <CoachGrid />
    </div>
  </div>
  <div class="bg-primary-900 py-lg-12">
    <div class="container">
      <h2 class="text-center mb-lg-8">加入我們，你也可以</h2>
      <router-link
        to="/coaches/signup"
        class="custom fs-lg-6 d-flex justify-content-center align-items-center btn-lg text-center w-100 mx-auto"
        style="
          max-width: 128px;
          height: 62px;
          border-radius: 8px;
          box-sizing: border-box;
          padding: 0;
        "
      >
        成為教練
      </router-link>
    </div>
  </div>
</template>

<script setup>
import WaveBanner from '@/components/WaveBanner.vue'
import WaveBannerReverse from '@/components/WaveBannerReverse.vue'
import HowToStartTeaching from '@/components/HowToStartTeaching.vue'
import CoachGrid from '@/components/CoachGrid.vue'
</script>

<style scoped lang="scss">
.custom {
  background-color: $primary-600;
  color: $primary-000;

  &:hover {
    background-color: $primary-300;
    border-color: $primary-300;
    color: $primary-700;
  }
}
.hero-wrapper {
  position: relative;
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* 包住 container 的區塊 */
.text-area {
  width: 50%;
  display: flex;
  align-items: center;
  z-index: 2;
}

.inner-content {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

/* 圖片區塊 */
.image-area {
  width: 50vw;
  height: 95vh; // ⭐ 保證圖片撐滿整個視窗高度
  position: absolute;
  right: 0;
  top: 0;
  background: url('@/assets/images/coach-logo.png') center top no-repeat;
  background-size: cover;
  z-index: 1;
}

/* 模糊遮罩 */
.image-area::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 100%;
  background: linear-gradient(to left, rgba(0, 9, 24, 0), rgba(0, 9, 24, 1));
  filter: blur(0px);
}
</style>
