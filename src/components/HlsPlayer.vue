<template>
  <video ref="video" class="hls-video" controls :poster="poster" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Hls from 'hls.js'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' }
})

const video = ref(null)
let hls = null

onMounted(() => {
  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(props.src)
    hls.attachMedia(video.value)
  } else if (video.value.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 原生支援 HLS
    video.value.src = props.src
  } else {
    console.error('目前瀏覽器不支援 HLS')
  }
})

onBeforeUnmount(() => {
  hls?.destroy()
})
</script>

<style scoped>
.hls-video {
  width: 100%;
  height: 600px;
  aspect-ratio: 16 / 9;
}
</style>
