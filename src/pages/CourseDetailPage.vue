<template>
  <div>
    <div class="course-detail container py-5 text-white">
      <!-- 課程標題與統計 -->
      <div class="my-lg-12">
        <div class="d-lg-flex justify-content-between align-items-center">
          <h2 class="fw-bold mb-lg-0 mb-5 fs-lg-2 fs-4">
            {{ courseDetail[0]?.course?.name || '課程名稱載入中' }}
          </h2>
          <div class="d-flex align-items-center gap-5 gap-lg-8 mb-lg-0 mb-6">
            <div class="icon-custom">
              <i class="bi bi-star-fill text-secondary-600 me-1 fs-6"></i>
              <p>{{ courseDetail[0].course.score }}</p>
            </div>
            <div class="icon-custom">
              <i class="bi bi-person me-1 text-secondary-600 fs-6"></i>
              <p>{{ courseDetail[0].course.student_amount }} 位學生</p>
            </div>
            <div class="icon-custom">
              <i class="bi bi-clock me-1 text-secondary-600 fs-6"></i>
              <p>{{ courseDetail[0].course.hours }} 小時</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 課程圖片與介紹 -->
      <div class="gy-4 d-lg-flex mb-lg-12 mb-6">
        <div class="">
          <img
            :src="courseDetail[0].course.image_url"
            :alt="courseDetail[0].course.name"
            class="course-image rounded-3 d-block mb-5 mb-lg-0"
            width="320px"
            height="320px"
          />
        </div>
        <div>
          <div
            class="p-lg-8 p-5 rounded-4 border border-primary-000 ms-lg-12 h-100"
            style="background-color: rgba(255, 255, 255, 0.05)"
          >
            <h5 class="mb-lg-8 fw-bold">課程介紹</h5>
            <div>
              <p class="mb-5">
                從體態到強化，30天徹底喚醒你的核心力量！透過科學構築的皮拉提斯課表，集中鍛鍊腹部、背部與臀部深層肌群，全面提升穩定性、姿勢控制與運動表現。
              </p>
              <p class="mb-0">
                課程設計由淺入深，循序漸進，讓每一位學員無論基礎如何，都能跟隨節奏穩步進步。專業教練將引導你細緻感受每一次呼吸與收縮，啟動核心深層肌群，並有效預防運動傷害。不僅雕塑出緊實有力的線條，更讓你在日常生活中感受到身體協調與能量的提升。適合想要雕塑線條、提升核心力量，或打好運動基礎、迎接更多運動挑戰的你。<br />給自己30天，讓身體變得更強大，讓每一步都更有力量！
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 播放影片試看 -->
      <div class="mb-lg-12 mb-6">
        <div class="media-block position-relative d-block">
          <img src="@/assets/images/video1.png" class="rounded-2 video-cover" />
          <div class="play-icon position-absolute">
            <i class="bi bi-play-circle-fill"></i>
          </div>
        </div>
      </div>

      <!-- 教練介紹 -->
      <div
        class="border border-primary-000 rounded-4 p-lg-8 p-5 mb-lg-12 mb-6"
        style="background-color: rgba(255, 255, 255, 0.05)"
      >
        <div
          class="d-flex justify-content-between align-items-center mb-lg-8 mb-5"
        >
          <p class="fs-lg-5 fs-6 mb-0">教練介紹</p>
          <a
            :href="courseDetail[0].coach.coachPage_Url"
            target="_blank"
            class="btn btn-lg-m px-lg-0 py-lg-1 btn-outline-grey-400 mb-0 text-grey-000 fs-8"
          >
            教練詳細資訊
          </a>
        </div>
        <div class="d-lg-flex">
          <img
            :src="courseDetail[0].coach.profile_image_url"
            :alt="courseDetail[0].coach.name"
            class="rounded-3 me-lg-8 object-fit-cover mb-lg-0 mb-8 coach-image"
          />
          <div>
            <div
              class="d-lg-flex align-items-center gap-3 text-white flex-wrap mb-5"
            >
              <span class="fw-bold fs-lg-7">{{
                courseDetail[0].coach.name
              }}</span>
              <div class="py-lg-0 py-1">
                <!-- 小螢幕顯示：水平線 -->
                <div
                  class="d-block d-lg-none"
                  style="
                    width: 18px;
                    height: 2px;
                    background-color: rgba(255, 255, 255, 0.5);
                  "
                ></div>

                <!-- 桌機顯示：垂直線 -->
                <div
                  class="d-none d-lg-block"
                  style="
                    width: 2px;
                    height: 18px;
                    background-color: rgba(255, 255, 255, 0.5);
                  "
                ></div>
              </div>

              <span class="fw-bold fs-lg-7">
                {{ courseDetail[0].coach.title }}
              </span>
            </div>
            <div>
              <p>
                {{ courseDetail[0].coach.intro }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 章節介紹 -->
      <div
        class="rounded-4 p-lg-8 p-5 border border-primary-000 mb-lg-12 mb-6"
        style="background-color: rgba(255, 255, 255, 0.05)"
      >
        <div
          class="d-flex justify-content-between align-items-center mb-lg-8 mb-5"
        >
          <p class="fs-lg-5 fs-6 mb-0 fw-bold">章節介紹</p>
          <p
            class="btn px-lg-0 py-lg-1 btn-outline-grey-400 mb-0 text-grey-000 fs-8"
            @click="toggleAll"
          >
            {{ isAllOpen ? '全部收合' : '全部展開' }}
          </p>
        </div>
        <div id="courseDetail" class="accordion w-100">
          <div
            v-for="(item, idx) in courseDetail[0].chapters"
            :key="idx"
            class="accordion-item border-0 rounded-3 overflow-hidden"
            style="background-color: rgba(255, 255, 255, 0.05)"
          >
            <h2 :id="`heading${idx}`" class="accordion-header">
              <button
                class="accordion-button collapsed text-white fs-lg-6 p-5"
                type="button"
                @click="toggle(idx)"
              >
                {{ item.title }}
                <i
                  class="bi ms-auto"
                  :class="
                    openIndexes[idx] ? 'bi-chevron-up' : 'bi-chevron-down'
                  "
                ></i>
              </button>
            </h2>

            <div
              :id="`collapse${idx}`"
              class="accordion-collapse collapse"
              :class="{
                show: openIndexes[idx],
                'rounded-bottom-3': openIndexes[idx]
              }"
              :aria-labelledby="`heading${idx}`"
              data-bs-parent="#courseDetail"
            >
              <div class="accordion-body fs-lg-6 text-primary-000">
                <div v-if="openIndexes[idx]" class="hr-line mb-4"></div>
                <ul class="mb-0 list-unstyled">
                  <li v-for="(sub, i) in item.subtitles" :key="i">
                    {{ sub }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 課程評價 -->
      <div
        class="rounded-4 p-lg-8 p-5 border border-primary-000 mb-lg-12 mb-6"
        style="background-color: rgba(255, 255, 255, 0.05)"
      >
        <div
          class="d-flex justify-content-between align-items-center mb-lg-8 mb-5"
        >
          <div class="d-flex justify-content-between align-items-center">
            <p class="fs-lg-5 fs-6 mb-0 fw-bold">課程評價</p>
            <p class="mb-0 fs-lg-7 fs-9 ms-2">
              ({{ userRatings[0]?.ratingsWithUserNames.length || 0 }} 則評價)
            </p>
          </div>
          <p
            class="btn px-lg-0 py-lg-1 btn-outline-grey-400 mb-0 text-grey-000 fs-8"
            data-bs-toggle="modal"
            data-bs-target="#ratingsModal"
          >
            所有評價
          </p>
        </div>
        <!-- modal -->
        <div
          id="ratingsModal"
          class="modal fade"
          tabindex="-1"
          aria-labelledby="ratingsModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg custom-modal-width">
            <div class="modal-content">
              <div
                class="modal-header bg-grey-000 text-grey-900 p-lg-5 pb-lg-3 border-0"
              >
                <h5
                  id="ratingsModalLabel"
                  class="modal-title fw-bold text-primary-900 fs-lg-5 fs-6"
                >
                  課程評價
                </h5>
                <p class="mb-0 fs-lg-7 fs-9 ms-2 text-primary-900">
                  ({{ userRatings[0]?.ratingsWithUserNames.length || 0 }}
                  則評價)
                </p>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="px-lg-5 bg-grey-000">
                <hr
                  class="my-0"
                  style="height: 2px; background-color: #d2d2d2; border: none"
                />
              </div>

              <div
                class="modal-body bg-grey-000 text-grey-700 p-lg-5 rounded-bottom-3"
              >
                <div
                  v-for="rating in userRatings[0].ratingsWithUserNames"
                  :key="rating.id"
                  class="mb-4 p-lg-3 bg-primary-000 rounded-3"
                >
                  <div
                    class="d-flex border-bottom justify-content-between align-items-center pb-2"
                  >
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="fw-bold">{{ rating.username }}</div>

                      <div class="text-stars ms-lg-5">
                        <i
                          v-for="n in Math.floor(rating.score)"
                          :key="'full-' + n"
                          class="bi bi-star-fill me-1"
                        ></i>
                        <i
                          v-if="
                            rating.score % 1 >= 0.25 && rating.score % 1 < 0.75
                          "
                          class="bi bi-star-half me-1 text-warning"
                        ></i>
                        <i
                          v-for="n in 5 -
                          Math.floor(rating.score) -
                          (rating.score % 1 >= 0.25 && rating.score % 1 < 0.75
                            ? 1
                            : 0)"
                          :key="'empty-' + n"
                          class="bi bi-star text-secondary me-1"
                        ></i>
                      </div>
                    </div>

                    <div class="text-grey-600 fs-lg-8 small">
                      {{ rating.createdAt }}
                    </div>
                  </div>

                  <p class="mt-2 mb-0 text-grey-700">{{ rating.comment }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="ratings" class="accordion w-100">
          <div class="d-lg-flex gap-5 align-items-stretch">
            <div
              v-for="(rating, index) in latestThreeRatings"
              :key="rating.id"
              :class="[
                'card',
                'h-100',
                index === latestThreeRatings.length - 1 ? 'mb-0' : 'mb-5'
              ]"
              style="background-color: rgba(255, 255, 255, 0.05)"
            >
              <div class="card-body p-lg-5">
                <div
                  class="d-lg-block d-flex justify-content-between align-items-center mb-1"
                >
                  <h6 class="card-title fw-bold fs-lg-6 fs-8 mb-0 mb-lg-1">
                    {{ rating.username }}
                  </h6>
                  <h6
                    class="card-subtitle mb-lg-1 text-body-secondary mb-0 mb-lg-1"
                  >
                    <!-- 滿星 -->
                    <i
                      v-for="n in Math.floor(rating.score)"
                      :key="'full-' + n"
                      class="bi bi-star-fill text-warning me-1"
                    ></i>

                    <!-- 半星 -->
                    <i
                      v-if="rating.score % 1 >= 0.25 && rating.score % 1 < 0.75"
                      class="bi bi-star-half text-warning me-1"
                    ></i>

                    <!-- 空星 -->
                    <i
                      v-for="n in 5 -
                      Math.floor(rating.score) -
                      (rating.score % 1 >= 0.25 && rating.score % 1 < 0.75
                        ? 1
                        : 0)"
                      :key="'empty-' + n"
                      class="bi bi-star text-secondary me-1"
                    ></i>
                  </h6>
                </div>
                <div>
                  <p class="text-grey-400 fs-lg-8 fs-9 mb-5">
                    {{ rating.createdAt }}
                  </p>
                </div>

                <hr class="my-lg-5" />
                <p class="card-text fs-lg-6">
                  {{ rating.comment }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <WaveBanner />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WaveBanner from '@/components/WaveBanner.vue'

const courseDetail = [
  {
    course: {
      name: '身心平衡晨間瑜伽課程',
      score: 4.7,
      student_amount: 2346,
      hours: 33,
      image_url:
        'https://img.freepik.com/premium-photo/mature-fitness-coach-gym-beautiful-illustration-picture-generative-ai_146671-94599.jpg'
    },
    coach: {
      name: 'Michael',
      title: 'RYT 500認證導師',
      intro:
        '我是Michael，RYT500瑜伽認證導師，教學經驗12年，擅長陰瑜伽、修復瑜伽與情緒釋放導引。我曾進修印度阿育吠陀與能量呼吸法，期望用整合的方式幫助學員調整身體與情緒。',
      profile_image_url:
        'https://img.freepik.com/premium-photo/mature-fitness-coach-gym-beautiful-illustration-picture-generative-ai_146671-94599.jpg',
      coachPage_Url:
        'https://example.com/courses/coaches/2bca7644-3899-4e06-89a4-c35f737284d0/details'
    },
    chapters: [
      {
        title: 'Week 1：基礎認知與呼吸練習',
        subtitles: [
          'Day 1：課程介紹與設定目標',
          'Day 2：呼吸與身體覺察',
          'Day 3：基礎核心啟動',
          'Day 4：肩頸放鬆伸展',
          'Day 5：骨盆調整訓練',
          'Day 6：全身舒展',
          'Day 7：冥想與身心整合'
        ]
      },
      {
        title: 'Week 2：深層核心與體態重建',
        subtitles: [
          'Day 1：腹式呼吸與核心穩定',
          'Day 2：下背放鬆與強化',
          'Day 3：髖關節活動度提升',
          'Day 4：站姿體態矯正',
          'Day 5：肩胛穩定訓練',
          'Day 6：整合全身動作',
          'Day 7：柔軟度測驗與放鬆'
        ]
      },
      {
        title: 'Week 3：動作整合與挑戰練習',
        subtitles: [
          'Day 1：高強度核心挑戰',
          'Day 2：動態平衡與控制',
          'Day 3：側腹核心與旋轉控制',
          'Day 4：穩定下肢連動訓練',
          'Day 5：整合式皮拉提斯練習',
          'Day 6：個別問題重點加強',
          'Day 7：成果測驗與回顧'
        ]
      }
    ]
  }
]

// 初始化 openIndexes，每個章節預設是收合（false）
const openIndexes = ref(courseDetail.map(() => false))
function toggle(idx) {
  openIndexes.value[idx] = !openIndexes.value[idx]
}
//  判斷是否全部展開中
const isAllOpen = ref(false)

// 切換「全部展開 / 收合」
function toggleAll() {
  isAllOpen.value = !isAllOpen.value
  openIndexes.value = courseDetail[0].chapters.map(() => isAllOpen.value)
}

// 課程評價卡片顯示3則
const latestThreeRatings = computed(() => {
  const list = userRatings[0]?.ratingsWithUserNames || []
  return list
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
})

const userRatings = [
  {
    ratingsWithUserNames: [
      {
        id: '541eb68a-7728-47c7-8d9b-f0f942a38841',
        username: 'user',
        comment:
          '完全超乎期待！這堂30天皮拉提斯課程節奏安排得剛剛好，即使是平常沒運動習慣的人也能慢慢跟上，從呼吸到核心肌群控制都練得非常扎實，老師細心引導每個動作細節，讓人感覺既有成就感又很安心，30天下來明顯感受到身體變得更穩、更有力量！',
        score: 4.7,
        createdAt: '2025/05/11',
        updatedAt: '2025/05/11'
      },
      {
        id: '80f1629b-9e19-4b40-8997-f441a402cb41',
        username: 'user1',
        comment:
          '第一次嘗試皮拉提斯就愛上了！這個30天的課程安排得很完整，每個階段都有適合新手的練習與挑戰，教練講解非常清楚，讓人更容易掌握呼吸與動作節奏，核心力量也明顯進步了，覺得整個人的體態與姿勢都有變好，真的很推薦想要開始運動的人。',
        score: 4.6,
        createdAt: '2025/05/11',
        updatedAt: '2025/05/11'
      },
      {
        id: '80f1629b-9e19-4b40-8997-f441a402cb41',
        username: 'user2',
        comment:
          '太喜歡這門課了！一開始只是想試試看，沒想到30天下來真的有明顯的核心肌群進步感，不只是運動過程舒服，教練還特別注重動作的正確性與呼吸搭配，讓人覺得非常專業又安全，課程也很有彈性安排，即使平日很忙也能持續完成，非常有成就感。',
        score: 3,
        createdAt: '2025/05/11',
        updatedAt: '2025/05/11'
      },
      {
        id: '80f1629b-9e19-4b40-8997-f441a402cb41',
        username: 'user2',
        comment:
          '太喜歡這門課了！一開始只是想試試看，沒想到30天下來真的有明顯的核心肌群進步感，不只是運動過程舒服，教練還特別注重動作的正確性與呼吸搭配，讓人覺得非常專業又安全，課程也很有彈性安排，即使平日很忙也能持續完成，非常有成就感。',
        score: 3,
        createdAt: '2025/05/13',
        updatedAt: '2025/05/12'
      },
      {
        id: '80f1629b-9e19-4b40-8997-f441a402cb41',
        username: 'user2',
        comment:
          '太喜歡這門課了！一開始只是想試試看，沒想到30天下來真的有明顯的核心肌群進步感，不只是運動過程舒服，教練還特別注重動作的正確性與呼吸搭配，讓人覺得非常專業又安全，課程也很有彈性安排，即使平日很忙也能持續完成，非常有成就感。',
        score: 3,
        createdAt: '2025/05/13',
        updatedAt: '2025/05/13'
      },
      {
        id: '80f1629b-9e19-4b40-8997-f441a402cb41',
        username: 'user2',
        comment:
          '太喜歡這門課了！一開始只是想試試看，沒想到30天下來真的有明顯的核心肌群進步感，不只是運動過程舒服，教練還特別注重動作的正確性與呼吸搭配，讓人覺得非常專業又安全，課程也很有彈性安排，即使平日很忙也能持續完成，非常有成就感。',
        score: 3,
        createdAt: '2025/05/13',
        updatedAt: '2025/05/13'
      },
      {
        id: '80f1629b-9e19-4b40-8997-f441a402cb41',
        username: 'user2',
        comment:
          '太喜歡這門課了！一開始只是想試試看，沒想到30天下來真的有明顯的核心肌群進步感，不只是運動過程舒服，教練還特別注重動作的正確性與呼吸搭配，讓人覺得非常專業又安全，課程也很有彈性安排，即使平日很忙也能持續完成，非常有成就感。',
        score: 3,
        createdAt: '2025/05/13',
        updatedAt: '2025/05/13'
      },
      {
        id: '80f1629b-9e19-4b40-8997-f441a402cb41',
        username: 'user2',
        comment:
          '太喜歡這門課了！一開始只是想試試看，沒想到30天下來真的有明顯的核心肌群進步感，不只是運動過程舒服，教練還特別注重動作的正確性與呼吸搭配，讓人覺得非常專業又安全，課程也很有彈性安排，即使平日很忙也能持續完成，非常有成就感。',
        score: 3,
        createdAt: '2025/05/13',
        updatedAt: '2025/05/13'
      }
    ],
    meta: {
      sort: 'desc',
      sort_by: 'time',
      page: 1,
      limit: 20,
      total: 2,
      total_pages: 1,
      has_previous: false,
      has_next: false
    }
  }
]
</script>

<style scoped lang="scss">
.course-detail {
  min-height: 100vh;
}
.icon-custom {
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0;
    font-size: 24px;
    // 手機版 (小於 576px) 改為 16px
    @media (max-width: 575.98px) {
      font-size: 16px;
    }
  }
}
.course-image {
  width: 320px;
  height: 320px;
  object-position: center;
  object-fit: cover;

  @media (max-width: 992px) {
    width: 100%;
    height: 200px;
    object-position: top;
  }
}

.media-block {
  img {
    width: 100%;
    height: 600px;
    aspect-ratio: 2.16;
    position: relative;
    object-fit: cover;
  }
  .video-cover {
    object-fit: cover;
    filter: brightness(50%);
    border-radius: 12px;
    &:hover {
      filter: brightness(100%);
    }
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 48px;
    color: $primary-500;
    z-index: 2;
  }
}
.coach-image {
  width: 164px;
  height: 164px;
  object-fit: cover;
  object-position: center;

  @media (max-width: 992px) {
    width: 100%; // 小螢幕改成滿寬
    height: 164px; // 高度維持
    object-position: top;
  }
}
// 章節介紹
.accordion-body {
  padding: 24px;
  padding-top: 0;
}
.accordion-button {
  padding: 24px 0;
  border: none;
  background-color: transparent;
}
.accordion-button:focus {
  box-shadow: none;
}

.accordion-button::after {
  display: none;
}
.hr-line {
  width: 100%;
  height: 1px;
  background-color: $primary-000;
  margin: 0 auto 1rem;
  margin-bottom: 24px;
}
// 修正最後一個button不要有mb-5
.accordion-item {
  margin-bottom: 24px;
}
#courseDetail .accordion-item:last-child {
  margin-bottom: 0;
}
// modal
.custom-modal-width {
  max-width: 900px;
}
.card:last-child {
  margin-bottom: 0;
}
</style>
