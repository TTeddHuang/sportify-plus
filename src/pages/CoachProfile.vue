<template>
  <div class="form-panel p-8">
    <form class="container" @submit.prevent="handleSubmit">
      <div class="mb-3 row">
        <div class="col-8 text-center mt-8">
          <div
            class="profile-avatar ratio ratio-1x1 rounded-circle overflow-hidden mx-auto"
          >
            <img
              :src="profileImageFile"
              alt="個人照片"
              class="object-fit-cover"
            />
          </div>
          <span
            class="mt-6 fs-9"
            :class="
              coachProfile.is_verified
                ? 'badge bg-primary'
                : 'badge bg-notification'
            "
          >
            {{ coachProfile.is_verified ? '已通過審核' : '資料待審核' }}
          </span>
          <div v-if="inputState === 'inEdit'" class="mt-8 text-center">
            <input
              ref="avatarInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleFileSelect($event, 'coachAvatar')"
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
              v-model.trim="coachProfile.nickname"
              type="text"
              class="form-control"
              :disabled="inputState === 'readOnly'"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">真實姓名</label>
            <input
              id="name"
              v-model.trim="coachProfile.realname"
              type="text"
              class="form-control"
              :disabled="inputState === 'readOnly'"
            />
          </div>
          <div class="mb-3">
            <label for="birthDay" class="form-label">出生年月日</label>
            <input
              id="birthDay"
              v-model.trim="coachProfile.birthday"
              type="text"
              class="form-control"
              :disabled="inputState === 'readOnly'"
            />
          </div>
          <div class="mb-3">
            <label for="idNum" class="form-label">身分證字號</label>
            <input
              id="idNum"
              v-model.trim="coachProfile.id_number"
              type="text"
              class="form-control"
              :disabled="inputState === 'readOnly'"
            />
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">手機</label>
            <input
              id="tel"
              v-model.trim="coachProfile.phone_number"
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
          v-model.trim="coachProfile.bank_code"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="bankAccount" class="form-label">銀行帳號</label>
        <input
          id="bankAccount"
          v-model.trim="coachProfile.bank_account"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">稱號</label>
        <input
          id="title"
          v-model.trim="coachProfile.job_title"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="specialtyIntro" class="form-label">專長類別</label>
        <input
          id="specialtyIntro"
          v-model="skills"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">專長介紹</label>
        <input
          id="category"
          v-model.trim="coachProfile.skill_description"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="years" class="form-label">教學經驗(年)</label>
        <input
          id="years"
          v-model.trim="coachProfile.experience_years"
          type="text"
          class="form-control"
          :disabled="inputState === 'readOnly'"
        />
      </div>
      <div class="mb-3">
        <label for="experience" class="form-label">學經歷與得獎經歷</label>
        <textarea
          id="experience"
          v-model="coachProfile.experience"
          class="form-control"
          rows="3"
          :disabled="inputState === 'readOnly'"
        ></textarea>
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
        <label for="aboutMe" class="form-label">自我介紹</label>
        <textarea
          id="aboutMe"
          v-model="coachProfile.about_me"
          class="form-control"
          rows="5"
          :disabled="inputState === 'readOnly'"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="bankbook" class="form-label">上傳存摺封面(單張)</label>
        <input
          id="bankbook"
          type="file"
          class="form-control"
          accept="image/*"
          :disabled="inputState === 'readOnly' || isBankBookloading"
          @change="handleFileSelect($event, 'bankbook')"
        />
        <img :src="bankBookFile" class="mt-3 img-preview" />
      </div>
      <div class="mb-3">
        <label for="licensePhoto" class="form-label">證照與資格證上傳</label>

        <!-- 現有證照列表 -->
        <div v-if="coachLicenses.length > 0" class="mt-3">
          <div class="row">
            <div
              v-for="(license, index) in coachLicenses"
              :key="license.file_public_id || index"
              class="col-md-6 mb-3"
            >
              <div class="card">
                <div class="card-body">
                  <div class="position-relative mb-2">
                    <img :src="license.file_url" class="img-preview w-100" />
                    <button
                      v-if="inputState === 'inEdit'"
                      type="button"
                      class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                      @click="removeLicense(index)"
                    >
                      ×
                    </button>
                  </div>
                  <div class="mb-2">
                    <label class="form-label small">證照名稱</label>
                    <input
                      v-model="license.filename"
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="請輸入證照名稱"
                      :disabled="inputState === 'readOnly' || !license.file_url"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 新增證照按鈕（編輯模式時顯示） -->
        <div v-if="inputState === 'inEdit'" class="mt-3">
          <input
            ref="licenseInput"
            type="file"
            class="form-control"
            accept="image/*"
            style="display: none"
            @change="handleFileSelect($event, 'license')"
          />
          <button
            type="button"
            class="btn btn-outline-primary"
            :disabled="isLicenseloading"
            @click="triggerLicenseSelect"
          >
            {{ isLicenseloading ? '上傳中...' : '+ 新增證照' }}
          </button>
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
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
// import { useRouter } from 'vue-router'
import { user } from '@/store/user'

// const router = useRouter()
const inputState = ref('readOnly')
const avatarInput = ref(null)
const skills = ref(null)
const isSubmitting = ref(false)
const isUploading = ref(false)
const isBankBookloading = ref(false)
const isLicenseloading = ref(false)

const coachProfile = ref({})
const coachLicenses = ref([])
const submitData = ref({})

// 備份資料
const backupData = ref({})
const backupImage = ref({})

// 圖片相關狀態
const profileImageFile = ref(null)
const profileImageId = ref(null)
const bankBookFile = ref(null)
const bankBookId = ref(null)
const licenseInput = ref(null)

// 顯示技能列表
const skillsDisplay = computed(() => {
  if (!coachProfile.value.skills || !Array.isArray(coachProfile.value.skills)) {
    return ''
  }
  return coachProfile.value.skills.map(skill => skill.name).join('、')
})

// 資料驗證
const validateForm = () => {
  const errors = []

  // 必填欄位驗證
  if (!coachProfile.value.nickname.trim()) {
    errors.push('教練名稱不能為空')
  }

  if (!coachProfile.value.realname.trim()) {
    errors.push('真實姓名不能為空')
  }

  if (!coachProfile.value.phone_number.trim()) {
    errors.push('手機號碼不能為空')
  }

  // 手機號碼格式驗證
  const phoneRegex = /^09\d{8}$/
  if (
    coachProfile.value.phone_number &&
    !phoneRegex.test(coachProfile.value.phone_number)
  ) {
    errors.push('手機號碼格式不正確（請輸入09開頭的10位數字）')
  }

  // 身分證字號驗證
  const idRegex = /^[A-Z][1-2]\d{8}$/
  if (
    coachProfile.value.id_number &&
    !idRegex.test(coachProfile.value.id_number)
  ) {
    errors.push('身分證字號格式不正確')
  }

  // 銀行代號驗證（3位數字）
  const bankCodeRegex = /^\d{3}$/
  if (
    coachProfile.value.bank_code &&
    !bankCodeRegex.test(parseInt(coachProfile.value.bank_code))
  ) {
    errors.push('銀行代號必須為3位數字')
  }

  // 銀行帳號驗證（10-16位數字）
  const bankAccountRegex = /^\d{10,16}$/
  if (
    coachProfile.value.bank_account &&
    !bankAccountRegex.test(parseInt(coachProfile.value.bank_account))
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
const handleFileSelect = async ($event, type) => {
  const files = $event.target.files
  if (!files || files.length === 0) return
  console.log(files)
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
    if (type === 'coachAvatar') {
      isUploading.value = true
      const { url, publicId } = await uploadImage(
        files[0],
        'coachAvatar',
        'upload-avatar'
      )
      profileImageFile.value = url
      profileImageId.value = publicId
      isUploading.value = false
    } else if (type === 'bankbook') {
      isBankBookloading.value = true
      const { url, publicId } = await uploadImage(
        files[0],
        type,
        'upload-bankbook'
      )
      bankBookFile.value = url
      bankBookId.value = publicId
      isBankBookloading.value = false
    } else if (type === 'license') {
      isLicenseloading.value = true
      const uploadResult = await uploadMultipleImages(
        files,
        type,
        'upload-license'
      )

      // 添加到證照列表
      coachLicenses.value.push({
        file_url: uploadResult[0].url,
        file_public_id: uploadResult[0].publicId,
        filename: ''
      })

      console.log(uploadResult)
      console.log(coachLicenses.value)
      isLicenseloading.value = false
    }

    $event.target.value = ''
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
  const imageData = {
    url: response.data.data.url,
    publicId: response.data.data.publicId
  }
  return imageData
}

// 上傳多張圖片
const uploadMultipleImages = async (files, imgName, endpoint) => {
  if (!files || files.length === 0) return []

  const formData = new FormData()
  files.forEach(file => {
    formData.append(imgName, file)
  })
  console.log([...formData])
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

  const imageData = response.data.dataArray
  return imageData
}

// 移除證照
const removeLicense = index => {
  if (confirm('確定要刪除這張照片嗎？')) {
    coachLicenses.value.splice(index, 1)
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const token = localStorage.getItem('token')
    submitData.value = JSON.parse(JSON.stringify(coachProfile.value))

    console.log('coachProfile', coachProfile.value)

    if (profileImageId.value && profileImageFile.value) {
      submitData.value.profile_image_url = profileImageFile.value
      submitData.value.profile_image_public_id = profileImageId.value
    } else {
      delete submitData.value.profile_image_url
      delete submitData.value.profile_image_public_id
    }

    if (bankBookId.value && bankBookFile.value) {
      submitData.value.bankbook_copy_url = bankBookFile.value
      submitData.value.bankbook_copy_public_id = bankBookId.value
    } else {
      delete submitData.value.bankbook_copy_url
      delete submitData.value.bankbook_copy_public_id
    }
    console.log(coachLicenses.value)

    // 過濾證照資料：只保留 url、filename、publicId 都有值的物件
    const validLicenses = coachLicenses.value.filter(license => {
      const hasUrl = license.file_url && license.file_url.trim() !== ''
      const hasFilename = license.filename && license.filename.trim() !== ''
      const hasId =
        license.file_public_id && license.file_public_id.trim() !== ''

      console.log(
        `證照驗證 - URL: ${hasUrl}, Filename: ${hasFilename}, ID: ${hasId}`
      )

      return hasUrl && hasFilename && hasId
    })

    console.log('有效的證照資料:', validLicenses)

    if (validLicenses.length > 0) {
      submitData.value.license = validLicenses
        .map(file => file.filename)
        .join('、')
      submitData.value.license_data = validLicenses.map(file => ({
        filename: file.filename,
        file_url: file.file_url,
        file_public_id: file.file_public_id
      }))
    } else {
      delete submitData.value.license
      delete submitData.value.license_data
    }

    delete submitData.value.skills
    delete submitData.value.is_verified
    delete submitData.value.id
    delete submitData.value.email

    submitData.value.skill = skills.value

    console.log('submitData', submitData.value)

    // 提交主要資料
    const response = await axios.patch(
      `https://sportify.zeabur.app/api/v1/coaches/${coachProfile.value.id}`,
      submitData.value,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.data.status) {
      alert('個人資料更新成功！')
      inputState.value = 'readOnly'

      // 清除備份檔案
      backupData.value = {}
      backupImage.value = {}

      // 重新載入最新資料
      await loadCoachProfile()
    } else {
      cancelEdit()
      throw new Error(response.data.message || '更新失敗')
    }
  } catch (error) {
    console.error('提交失敗:', error)
    cancelEdit()
    // 錯誤原因
  } finally {
    isSubmitting.value = false
  }
}

function toEdit() {
  // 備份表單文字資料
  backupData.value = JSON.parse(JSON.stringify(coachProfile.value))
  // 備份照片類
  backupImage.value.profile = {
    url: profileImageFile.value,
    id: profileImageId.value
  }
  backupImage.value.bankbook = { url: bankBookFile.value, id: bankBookId.value }
  backupImage.value.licenses = JSON.parse(JSON.stringify(coachLicenses.value))

  inputState.value = 'inEdit'
}

function cancelEdit() {
  // 恢復備份資料
  if (Object.keys(backupData.value).length > 0) {
    coachProfile.value = JSON.parse(JSON.stringify(backupData.value))
  }

  profileImageFile.value = backupImage.value.profile.url
  profileImageId.value = backupImage.value.profile.id

  bankBookFile.value = backupImage.value.bankbook.url
  bankBookId.value = backupImage.value.bankbook.id

  coachLicenses.value = JSON.parse(JSON.stringify(backupImage.value.licenses))

  // 清除備份檔案
  backupData.value = {}
  backupImage.value = {}

  skills.value = skillsDisplay.value

  inputState.value = 'readOnly'
}

function triggerAvatarSelect() {
  avatarInput.value?.click()
}

// 觸發證照選擇
const triggerLicenseSelect = () => {
  licenseInput.value?.click()
}

// 取得教練資料
const loadCoachProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `https://sportify.zeabur.app/api/v1/coaches/${user.value?.id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    if (response.data.status) {
      const data = response.data.data
      coachLicenses.value = data.licenses.map(file => ({
        filename: file.name,
        file_public_id: file.file_public_id,
        file_url: file.file_url
      }))
      coachProfile.value = data.coachDetails || {}
      skills.value = skillsDisplay.value

      profileImageFile.value = coachProfile.value.profile_image_url
      bankBookFile.value = coachProfile.value.bankbook_copy_url

      delete coachProfile.value.created_at
      delete coachProfile.value.background_image_url
      delete coachProfile.value.background_image_public_id

      console.log('教練資料:', coachProfile.value)
      console.log('證照資料:', coachLicenses.value)
      console.log('原資料:', data)
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
  border-radius: 4px;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}
</style>
