<template>
  <div class="learning-center row container">
    <div class="side-nav col-3">
      <div class="px-3 py-5">
        <h3 class="fs-6 px-3 fw-bold">學習中心</h3>
        <hr class="divider my-5" />
        <ul class="list-group list-group-flush">
          <li class="list-group-item">我的課程</li>
          <li class="list-group-item">訂閱紀錄</li>
          <li class="list-group-item active">編輯個人資料</li>
        </ul>
      </div>
    </div>
    <div class="user-profile col-9">
      <h2 class="fs-4">個人資料</h2>
      <div class="profile-group row">
        <div class="col-6">
          <div
            class="profile-avatar ratio ratio-1x1 rounded-circle overflow-hidden mx-auto"
          >
            <img
              src="https://ankemedia.com/wp-content/uploads/2021/12/%E6%88%91%E6%98%AF%E9%81%BA%E7%85%A7%E6%94%9D%E5%BD%B1%E5%B8%AB1-1.jpg"
              alt="個人照片"
              class="object-fit-cover"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <label class="form-label">會員名</label>
            <input type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">密碼</label>
            <input type="password" class="form-control" />
          </div>
          <button class="btn btn-primary-600 mt-1 d-block mx-auto">
            編輯個人資料
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1296px;
  margin: 0 auto;
}

.side-nav,
.user-profile {
  border: 1px solid $primary-100;
}

.side-nav {
  padding: 0;
}

.divider {
  opacity: 1;
  border: 0;
  border-top: 1px solid $primary-000;
}

.list-group {
  .list-group-item {
    border: none;
    padding: 12px 16px;
    margin-bottom: 8px;
  }
  .active {
    border-radius: 4px;
    color: $primary-100;
  }
}

.user-profile {
  padding: 40px;
  .profile-group {
    margin-top: 40px;
  }
  .profile-avatar {
    width: 300px;
  }
}

.btn-primary {
  padding: 8px 16px;
}
</style>
