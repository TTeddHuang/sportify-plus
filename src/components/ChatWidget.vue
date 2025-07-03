<template>
  <div class="chat-widget">
    <!-- 💬 按鈕，只在未打開時顯示 -->
    <div class="chat-toggle" v-if="!isOpen" @click="isOpen = true">💬</div>

    <!-- 聊天匡 -->
    <div class="chat-box" v-if="isOpen">
      <div class="chat-header" @click="isOpen = false">
        AI 客服
        <button class="chat-close" @click="isOpen = false">一</button>
      </div>
      <div class="chat-body" ref="chatBody">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message">
          <span :class="msg.role">{{ msg.text }}</span>
        </div>
      </div>
      <div class="chat-input">
        <input
          v-model="input"
          @keyup.enter="sendMessage"
          :disabled="loading"
          placeholder="請輸入訊息..."
        />
        <button @click="sendMessage" :disabled="loading || !input">送出</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import axios from 'axios'

const isOpen = ref(false)
const input = ref('')
const messages = ref([])
const loading = ref(false)
const chatBody = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!input.value.trim()) return

  const userMessage = input.value
  messages.value.push({ role: 'user', text: userMessage })
  input.value = ''
  loading.value = true
  await scrollToBottom()

  try {
    const res = await axios.post('https://sportify.zeabur.app/api/v1/chat', {
      message: userMessage
    })

    if (res.data && res.data.reply) {
      messages.value.push({ role: 'bot', text: res.data.reply })
    } else {
      messages.value.push({
        role: 'bot',
        text: '⚠️ 無法取得回覆，請稍後再試。'
      })
    }
  } catch (error) {
    messages.value.push({
      role: 'bot',
      text: '⚠️ 發送失敗，請檢查網路或稍後再試。'
    })
  } finally {
    loading.value = false
    await scrollToBottom()
  }
}
</script>

<style scoped lang="scss">
.chat-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

/* 💬 按鈕樣式 */
.chat-toggle {
  width: 56px;
  height: 56px;
  background: #000; // 黑色背景
  color: white; // 白色圖示
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  border: 2px solid white; // ✅ 加這一行，白色邊匡
  outline: none; // 避免點擊後出現預設框線
}

/* 聊天視窗樣式 */
.chat-box {
  width: 320px;
  height: 420px;
  background: #d4d4d4; // 淺灰色背景
  border: 1px solid #ccc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* header 有 ✕ 關閉鍵 */
.chat-header {
  background: #000; // 黑色背景
  color: white; // 白色文字
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  position: relative;

  .chat-close {
    position: absolute;
    top: 8px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
}

.chat-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  font-size: 14px;

  .chat-message {
    margin-bottom: 8px;

    .user {
      display: block;
      text-align: right;
      color: #007bff;
    }

    .bot {
      display: block;
      text-align: left;
      color: #333;
    }
  }
}

.chat-input {
  display: flex;
  border-top: 1px solid #ddd;

  input {
    flex: 1;
    padding: 8px;
    border: none;
    outline: none;
  }

  button {
    padding: 8px 12px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>
