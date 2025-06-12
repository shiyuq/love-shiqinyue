<template>
  <div class="upload-container">
    <h2 class="title">
      <span style="color: #e81224">❤</span>记录宝宝的生活<span
        style="color: #e81224"
        >❤</span
      >
    </h2>

    <!-- 图片上传 -->
    <el-upload
      ref="imageUploader"
      class="upload-box"
      drag
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :before-upload="handleImageBeforeUpload"
      :file-list="imageFileList"
      accept="image/*"
      @change="handleImageChange"
    >
      <i class="el-icon-picture"></i>
      <div class="el-upload__text">点击上传图片</div>
      <div slot="tip" class="el-upload__tip">
        支持 jpg / png / jpeg，最大 20MB
      </div>
    </el-upload>

    <div v-if="imageFile" class="file-info">
      <p><strong>图片文件：</strong>{{ imageFile.name }}</p>
    </div>

    <div v-if="previewImageUrl" class="preview-area">
      <img :src="previewImageUrl" class="preview-image" />
    </div>

    <!-- 音频/视频上传 -->
    <el-upload
      ref="mediaUploader"
      class="upload-box"
      drag
      :limit="1"
      :on-exceed="handleExceedV2"
      :auto-upload="false"
      :before-upload="handleMediaBeforeUpload"
      :file-list="mediaFileList"
      accept="audio/*,video/*"
      @change="handleMediaChange"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">点击上传音频 / 视频(1分钟)</div>
      <div slot="tip" class="el-upload__tip">
        支持 mp3 / mp4 / wav 等，最大 300MB
      </div>
    </el-upload>

    <div v-if="mediaFile" class="file-info">
      <p><strong>文件名：</strong>{{ mediaFile.name }}</p>
      <p>
        <strong>大小：</strong
        >{{ (mediaFile.size / 1024 / 1024).toFixed(2) }} MB
      </p>
    </div>

    <div v-if="previewMediaUrl" class="preview-area">
      <video
        v-if="isVideo"
        controls
        :src="previewMediaUrl"
        class="preview-video"
      ></video>
      <audio
        v-else
        controls
        :src="previewMediaUrl"
        class="preview-audio"
      ></audio>
    </div>

    <div class="button-area">
      <el-button type="danger" @click="resetAll">重置</el-button>
      <el-button
        type="primary"
        :disabled="!mediaFile || !imageFile"
        @click="submit"
        >生成新图</el-button
      >
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
.upload-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);

  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .upload-box {
    border: 2px dashed #dcdfe6;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    cursor: pointer;

    &:hover {
      border-color: #409eff;
      background-color: #f0faff;
    }

    .el-upload__text {
      font-size: 16px;
      color: #666;
      margin-top: 10px;
    }

    .el-upload__tip {
      margin-top: 10px;
      color: #999;
      font-size: 13px;
    }
  }

  .file-info {
    margin-top: 10px;
    font-size: 15px;
    color: #333;
    line-height: 1.6;
  }

  .preview-area {
    margin-top: 20px;

    .preview-video,
    .preview-audio {
      width: 100%;
      border-radius: 10px;
      outline: none;
    }

    .preview-image {
      width: 100%;
      border-radius: 10px;
      object-fit: contain;
    }
  }

  .button-area {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    gap: 16px;
  }
}
</style>
