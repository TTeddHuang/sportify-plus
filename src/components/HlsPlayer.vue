<template>
  <div class="player-wrapper">
    <video
      ref="video"
      class="hls-video"
      playsinline
      controls
      crossorigin="anonymous"
      :poster="poster"
      @click.prevent.stop="togglePlay"
    />
    <button
      v-show="!isPlaying"
      class="play-btn"
      aria-label="Play / Pause"
      @click.stop="togglePlay"
    >
      <i class="bi bi-play-fill" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Hls from 'hls.js'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' }
})

const video = ref(null)
const isPlaying = ref(false)
let hls = null

function setupPlayer(source) {
  if (!source) return
  if (hls) {
    hls.detachMedia()
    hls.loadSource(source)
    hls.attachMedia(video.value)
  } else if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(source)
    hls.attachMedia(video.value)
  } else if (video.value.canPlayType('application/vnd.apple.mpegurl')) {
    video.value.src = source // Safari
  } else {
    console.error('此瀏覽器不支援 HLS')
  }
}
function togglePlay() {
  if (!video.value) return
  isPlaying.value ? video.value.pause() : video.value.play()
}

onMounted(() => {
  setupPlayer(props.src)

  video.value.addEventListener('play', () => (isPlaying.value = true))
  video.value.addEventListener('pause', () => (isPlaying.value = false))
})

/* ▲▲  監聽 props.src，每次變動時重新載入  ▲▲ */
watch(
  () => props.src,
  newSrc => setupPlayer(newSrc)
)

onBeforeUnmount(() => {
  hls?.destroy()
  hls = null
})
</script>

<style scoped lang="scss">
.player-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.hls-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.play-btn {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  background: $primary-600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  color: #fff;
  cursor: pointer;
  z-index: 1; /* ★ 關鍵：高於 video */
  transition: background 0.25s;
}
.play-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}
</style>
