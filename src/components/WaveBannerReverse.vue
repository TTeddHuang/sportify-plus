<template>
  <div class="wave-wrapper overflow-hidden">
    <div class="wave-banner"></div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
/* 保持原来的满屏宽度、高度 180px */
.wave-banner {
  position: relative;
  background-image: url('../assets/images/Vector-3.png');
  background-position: center;
  height: 172px;
  max-width: 1920px;
}
.wave-banner::before,
.wave-banner::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 40px; // 模糊區高度
  z-index: 1;
  pointer-events: none;
}

.wave-banner::after {
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 9, 24, 1), transparent);
  filter: blur(8px);
}
</style>
