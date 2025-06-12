<template>
  <div>
    <el-card style="width: 100%">
      <div class="flex-line">
        <div class="left-desc">请上传打印图</div>
        <el-upload
          class="avatar-uploader"
          accept="image/*"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleImageChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div>
        <el-upload
          action=""
          :before-upload="handleBeforeUpload"
          :show-file-list="false"
        >
          <el-button>上传录音/视频</el-button>
        </el-upload>
      </div>
    </el-card>
    <!-- <div class="container">
      <input type="file" accept="image/*" @change="handleImageUpload" />
      <canvas ref="canvas" style="display: none" />

      <div v-if="finalImage">
        <img
          :src="finalImage"
          alt="最终合成图"
          style="max-width: 100%; margin-top: 10px"
        />
      </div>
    </div> -->
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader {
  // 新增容器样式
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}

.flex-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  .left-desc {
    color: var(--el-text-color-regular);
  }
}
</style>
