<template>
  <div class="wave-wrapper">
    <div class="wave-banner"></div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.wave-banner {
  position: relative;
  background-image: url('../assets/images/Vector-2.png');
  background-position: center;
  height: 172px;
  max-width: 1920px;
}
.wave-wrapper {
  width: 100%;
  overflow-x: hidden;
}
.wave-banner::before,
.wave-banner::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 10px; // 模糊區高度
  z-index: 1;
  pointer-events: none;
}

.wave-banner::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(0, 9, 24, 1), transparent);
  filter: blur(3px);
}
</style>
