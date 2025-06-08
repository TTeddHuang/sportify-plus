<template>
  <div class="form-panel p-8">
    <form class="container" @submit.prevent="handleSubmit">
      <div class="mb-3 row">
        <div class="col-8">
          <div
            class="profile-avatar ratio ratio-1x1 rounded-circle overflow-hidden mx-auto"
          >
            <img
              :src="profileImageFile"
              alt="個人照片"
              class="object-fit-cover"
            />
          </div>
          <div v-if="inputState === 'inEdit'" class="mt-8 text-center">
            <input
              ref="avatarInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleFileSelect(e, 'coachAvatar', 'upload-avatar')"
            />
            <button
              type="button"
              class="btn btn-primary-600"
              :disabled="isUploading"
              @click="triggerAvatarSelect"
            >
              {{ isUploading ? '上傳中...' : '選擇照片' }}
            </button>
          </div>
        </div>
        <div class="col-4">
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
        </div>
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
          :disabled="inputState === 'readOnly'"
          @change="handleFileSelect(e, 'bankbook', 'upload-bankbook')"
        />
        <img
          v-if="passBookURL"
          :src="passBookURL"
          alt="存摺封面預覽"
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
          :disabled="inputState === 'readOnly'"
          @change="handleFileSelect(e, 'license', 'upload-license')"
        />
        <!-- 多張證照預覽 -->
        <div v-if="licenseURLs.length > 0" class="mt-3">
          <div class="row">
            <div
              v-for="(url, index) in licenseURLs"
              :key="index"
              class="col-md-4 mb-2"
            >
              <img
                :src="url"
                :alt="`證照 ${index + 1}`"
                class="img-preview w-100"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="inputState === 'readOnly'" class="my-5 text-center">
        <button type="button" class="btn btn-primary-600" @click="toEdit">
          編輯個人資料
        </button>
      </div>
      <div
        v-else-if="inputState === 'inEdit'"
        class="my-5 text-center d-flex justify-content-evenly"
      >
        <button
          type="submit"
          class="btn btn-primary-600"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '儲存中...' : '確定修改' }}
        </button>
        <button
          type="button"
          class="btn btn-notification"
          :disabled="isSubmitting"
          @click="cancelEdit"
        >
          取消修改
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const inputState = ref('readOnly')
const avatarInput = ref(null)
const isSubmitting = ref(false)
const isUploading = ref(false)

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

// 備份資料
const backupData = ref({})

// 圖片相關狀態
const profileImageFile = ref(null)
const passBookFile = ref(null)
const passBookURL = ref('')
const licenseFiles = ref([])
const licenseURLs = ref([])

// 資料驗證
const validateForm = () => {
  const errors = []

  // 必填欄位驗證
  if (!coachProfile.value.coachName.trim()) {
    errors.push('教練名稱不能為空')
  }

  if (!coachProfile.value.name.trim()) {
    errors.push('真實姓名不能為空')
  }

  if (!coachProfile.value.tel.trim()) {
    errors.push('手機號碼不能為空')
  }

  // 手機號碼格式驗證
  const phoneRegex = /^09\d{8}$/
  if (coachProfile.value.tel && !phoneRegex.test(coachProfile.value.tel)) {
    errors.push('手機號碼格式不正確（請輸入09開頭的10位數字）')
  }

  // 身分證字號驗證
  const idRegex = /^[A-Z][1-2]\d{8}$/
  if (coachProfile.value.idNum && !idRegex.test(coachProfile.value.idNum)) {
    errors.push('身分證字號格式不正確')
  }

  // 銀行代號驗證（3位數字）
  const bankCodeRegex = /^\d{3}$/
  if (
    coachProfile.value.bankCode &&
    !bankCodeRegex.test(coachProfile.value.bankCode)
  ) {
    errors.push('銀行代號必須為3位數字')
  }

  // 銀行帳號驗證（10-16位數字）
  const bankAccountRegex = /^\d{10,16}$/
  if (
    coachProfile.value.bankAccount &&
    !bankAccountRegex.test(coachProfile.value.bankAccount)
  ) {
    errors.push('銀行帳號必須為10-16位數字')
  }

  if (errors.length > 0) {
    alert('表單驗證失敗：\n' + errors.join('\n'))
    return false
  }

  return true
}

// 照片檔案處理
const handleFileSelect = async (e, type) => {
  const files = e.target.files
  if (!files || files.length === 0) return

  // 檔案類型驗證
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      alert('僅支援圖片格式(PNG, JPG, JPEG)')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('檔案請勿超過2MB')
      return
    }
  }

  try {
    if (type === 'avatar') {
      profileImageFile.value = files[0]
    } else if (type === 'passBook') {
      passBookFile.value = files[0]
      if (passBookURL.value) {
        URL.revokeObjectURL(passBookURL.value)
      }
      passBookURL.value = URL.createObjectURL(files[0])
    } else if (type === 'license') {
      // 處理多張證照圖片
      licenseFiles.value = Array.from(files)

      // 清除舊的預覽 URL
      licenseURLs.value.forEach(url => URL.revokeObjectURL(url))
      licenseURLs.value = []

      // 創建新的預覽 URL
      licenseFiles.value.forEach(file => {
        licenseURLs.value.push(URL.createObjectURL(file))
      })
    }
  } catch (error) {
    console.error('上傳檔案失敗:', error)
    alert('檔案上傳失敗，請重新選擇')
  }
}

// 上傳單張圖片
const uploadImage = async (file, imgName, endpoint) => {
  if (!file) return null

  const formData = new FormData()
  formData.append(imgName, file)

  const token = localStorage.getItem('token')
  const response = await axios.post(
    `https://sportify.zeabur.app/api/v1/coaches/${endpoint}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data.data.url
}

// 上傳多張圖片
const uploadMultipleImages = async (files, imgName, endpoint) => {
  if (!files || files.length === 0) return []

  const formData = new FormData()
  files.forEach(file => {
    formData.append(imgName, file)
  })

  const token = localStorage.getItem('token')
  const response = await axios.post(
    `https://sportify.zeabur.app/api/v1/coaches/${endpoint}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return response.data.data.urls
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('請重新登入')
      router.push('/login')
    }

    const submitData = { ...coachProfile.value }
    // 上傳圖片並取得 URL
    if (profileImageFile.value) {
      try {
        submitData.profile_image_url = await uploadImage(
          profileImageFile.value,
          'upload-avatar'
        )
      } catch (error) {
        console.error('上傳頭像失敗:', error)
        alert('頭像上傳失敗，請稍後再試')
      }
    }

    if (passBookFile.value) {
      try {
        submitData.passbook_image_url = await uploadImage(
          passBookFile.value,
          'upload-passbook'
        )
      } catch (error) {
        console.error('上傳存摺封面失敗:', error)
        alert('存摺封面上傳失敗，請稍後再試')
      }
    }

    if (licenseFiles.value.length > 0) {
      try {
        submitData.license_image_urls = await uploadMultipleImages(
          licenseFiles.value,
          'upload-licenses'
        )
      } catch (error) {
        console.error('上傳證照失敗:', error)
        alert('證照上傳失敗，請稍後再試')
      }
    }

    // 提交主要資料
    const response = await axios.patch(
      'https://sportify.zeabur.app/api/v1/coaches/profile',
      submitData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data.status) {
      alert('個人資料更新成功！')
      inputState.value = 'readOnly'

      // 清除檔案狀態
      profileImageFile.value = null
      passBookFile.value = null
      licenseFiles.value = []

      // 重新載入最新資料
      await loadCoachProfile()
    } else {
      throw new Error(response.data.message || '更新失敗')
    }
  } catch (error) {
    console.error('提交失敗:', error)

    // 錯誤原因
  } finally {
    isSubmitting.value = false
  }
}

function toEdit() {
  backupData.value = JSON.parse(JSON.stringify(coachProfile.value))
  inputState.value = 'inEdit'
}

function cancelEdit() {
  // 恢復備份資料
  if (Object.keys(backupData.value).length > 0) {
    coachProfile.value = JSON.parse(JSON.stringify(backupData.value))
  }

  // 清除圖片預覽
  if (passBookURL.value) {
    URL.revokeObjectURL(passBookURL.value)
    passBookURL.value = ''
  }
  licenseURLs.value.forEach(url => URL.revokeObjectURL(url))
  licenseURLs.value = []

  // 清除檔案狀態
  profileImageFile.value = null
  passBookFile.value = null
  licenseFiles.value = []

  inputState.value = 'readOnly'
}

function triggerAvatarSelect() {
  avatarInput.value?.click()
}

// 取得教練資料
const loadCoachProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      'https://sportify.zeabur.app/api/v1/coaches/profile',
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (response.data.status) {
      coachProfile.value = response.data.data
    }
  } catch (error) {
    console.error('載入教練資料失敗:', error)
  }
}

onMounted(async () => {
  loadCoachProfile()
})
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

.profile-avatar {
  width: 300px;
}

.img-preview {
  max-width: 200px;
}
</style>
