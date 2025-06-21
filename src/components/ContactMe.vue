<script setup></script>

<template>
  <footer class="text-white py-11">
    <div class="mb-6">
      <div class="container text-center">
        <!-- Logo -->
        <a>
          <img
            src="@/assets/images/logo-s.png"
            alt="Logo"
            class="mb-4 mb-7"
            style="height: 50px"
          />
        </a>
        <!-- 導覽連結 -->
        <div class="d-flex justify-content-center gap-4 mb-3 flex-wrap">
          <a class="px-1 py-2">關於我們</a>
          <a class="px-1 py-2">聯絡我們</a>
          <a class="px-1 py-2">隱私權政策</a>
          <a class="px-1 py-2">使用者條款</a>
        </div>
      </div>
    </div>

    <div>
      <div class="d-flex justify-content-center gap-4 mb-5">
        <a class="text-primary-000" style="font-size: 32px"
          ><i class="bi bi-facebook"></i
        ></a>
        <a class="text-primary-000" style="font-size: 32px"
          ><i class="bi bi-instagram"></i
        ></a>
        <a class="text-primary-000" style="font-size: 32px"
          ><i class="bi bi-line"></i
        ></a>
      </div>

      <!-- 版權宣告 -->
      <div class="text-primary-000 text-center fs-8">
        ©2025 Sportify+ All Rights Reserved. 僅供個人學習，無任何商業用途
      </div>
    </div>
    <!-- 社群 icon -->
  </footer>
</template>

<style scoped lang="scss">
@import '@/assets/styles/all.scss';

a,
a:visited,
a:hover,
a:active,
a:focus {
  color: inherit;
  text-decoration: none;
}
</style>
