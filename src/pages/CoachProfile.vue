<template>
  <div class="form-panel p-8">
    <form class="container">
      <div class="mb-3">
        <label for="coachName" class="form-label">教練名稱</label>
        <input
          id="coachName"
          v-model.trim="coachProfile.coachName"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">真實姓名</label>
        <input
          id="name"
          v-model.trim="coachProfile.name"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="birthDay" class="form-label">出生年月日</label>
        <input
          id="birthDay"
          v-model.trim="coachProfile.birthDay"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="idNum" class="form-label">身分證字號</label>
        <input
          id="idNum"
          v-model.trim="coachProfile.idNum"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">手機</label>
        <input
          id="tel"
          v-model.trim="coachProfile.tel"
          type="tel"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="bankCode" class="form-label">銀行代號</label>
        <input
          id="bankCode"
          v-model.trim="coachProfile.bankCode"
          type="number"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="bankAccount" class="form-label">銀行帳號</label>
        <input
          id="bankAccount"
          v-model.trim="coachProfile.bankAccount"
          type="number"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">稱號</label>
        <input
          id="title"
          v-model.trim="coachProfile.title"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">專長類別</label>
        <input
          id="category"
          v-model.trim="coachProfile.category"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="specialtyIntro" class="form-label">專長介紹</label>
        <input
          id="specialtyIntro"
          v-model.trim="coachProfile.specialtyIntro"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="years" class="form-label">教學經驗</label>
        <input
          id="years"
          v-model.trim="coachProfile.years"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="experience" class="form-label">學經歷與得獎經歷</label>
        <input
          id="experience"
          v-model.trim="coachProfile.experience"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="license" class="form-label">證照與資格</label>
        <input
          id="license"
          v-model.trim="coachProfile.license"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="hobby" class="form-label">興趣</label>
        <input
          id="hobby"
          v-model.trim="coachProfile.hobby"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="motto" class="form-label">座右銘</label>
        <input
          id="motto"
          v-model.trim="coachProfile.motto"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="aboutMe" class="form-label">課程介紹</label>
        <textarea
          id="aboutMe"
          v-model="coachProfile.aboutMe"
          class="form-control"
          rows="5"
          :disabled="inputState === 'readOnly'"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="passBook" class="form-label">上傳存摺封面(單張)</label>
        <input
          id="passBook"
          type="file"
          class="form-control"
          accept="image/*"
          @change="selectImg(e, passBook)"
        />
        <img
          v-if="passBookURL"
          :src="passBookURL"
          alt="照片預覽"
          class="mt-3 img-preview"
        />
      </div>
      <div class="mb-3">
        <label for="licensePhoto" class="form-label"
          >證照與資格證上傳(多張)</label
        >
        <input
          id="licensePhoto"
          type="file"
          class="form-control"
          accept="image/*"
          multiple
          @change="selectImg(e, license)"
        />
        <!-- <img
          v-if="licenseURL"
          :src="licenseURL"
          alt="照片預覽"
          class="mt-3 img-preview"
        /> -->
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputState = ref('readOnly')
const coachProfile = ref({
  coachName: 'Jason',
  name: '林傑森',
  birthDay: '81/07/13',
  idNum: 'A123456789',
  tel: '0998777572',
  bankCode: '700',
  bankAccount: '12221221341345',
  title: 'master',
  category: '單車',
  specialtyIntro: '單車騎乘技巧、耐力訓練、比賽策略',
  years: '5年',
  experience: '單車教練5年，2023年國際自由車環台公路大賽亞軍',
  license: 'UCI 認證教練、CPR 證書',
  hobby: '自由潛水、攀岩',
  motto: '踩下去的每一刻，都是超越自己的一步。',
  aboutMe:
    '專業單車教練，專注提升騎乘技巧與體能訓練。無論你是新手還是進階車友，跟著我的課程一起突破極限，享受騎行樂趣！'
})
const passBookURL = ref('')
// const licenseURL = ref([])

function selectImg(e, type) {
  const file = e.target.files[0]
  const allowed = ['png', 'jpeg', 'webp']
  if (type === 'passBook') {
    const fileType = file.type.split('/').pop()
    if (!allowed.includes(fileType)) {
      return alert('僅支援圖片格式(png, jpg, jpeg, webp)')
    }

    if (file.size > 5 * 1024 * 1024) {
      return alert('檔案請勿超過5MB')
    }

    if (passBookURL.value) {
      URL.revokeObjectURL(passBookURL.value)
    }
    passBookURL.value = URL.createObjectURL(file)
  }
}
</script>

<style lang="scss">
.form-control {
  background-color: $grey-000;
  border-color: $primary-700;
  color: $grey-700;
  &:disabled {
    background-color: $grey-200;
    border-color: $grey-300;
    color: $grey-500;
  }
  &::placeholder {
    color: $grey-500;
  }
}

.img-preview {
  max-width: 200px;
}
</style>
