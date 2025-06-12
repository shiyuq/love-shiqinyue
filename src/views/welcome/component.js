import { ElLoading, ElMessage, genFileId } from "element-plus";

import dayjs from "dayjs";
import ossService from "@/utils/oss";

export default {
  name: "MediaUploadPreview",
  data() {
    return {
      imageFile: null,
      previewImageUrl: "",
      imageFileList: [],

      mediaFile: null,
      previewMediaUrl: "",
      isVideo: false,
      mediaFileList: []
    };
  },
  methods: {
    revokeUrl(url) {
      if (url) {
        URL.revokeObjectURL(url);
      }
    },
    resetImage() {
      this.revokeUrl(this.previewImageUrl);
      this.previewImageUrl = "";
      this.imageFile = null;
      this.imageFileList = [];
      if (this.$refs.imageUploader) this.$refs.imageUploader.clearFiles();
    },
    resetMedia() {
      this.revokeUrl(this.previewMediaUrl);
      this.previewMediaUrl = "";
      this.mediaFile = null;
      this.isVideo = false;
      this.mediaFileList = [];
      if (this.$refs.mediaUploader) this.$refs.mediaUploader.clearFiles();
    },
    resetAll() {
      this.resetImage();
      this.resetMedia();
    },
    handleImageBeforeUpload(file) {
      // 限制图片格式和大小
      const isValidType = file.type.startsWith("image/");
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isValidType) {
        this.$message.error("只能上传图片文件");
        return false;
      }
      if (!isLt20M) {
        this.$message.error("图片大小不能超过 20MB");
        return false;
      }
      return true; // 允许上传，接下来触发 change 事件
    },
    handleExceed(files) {
      if (!files?.length) return;
      this.imageFile = null;
      this.previewImageUrl = "";
      this.imageFileList = [];
      const file = files[0];
      file.uid = genFileId();
      this.handleImageChange({
        raw: file,
        size: file.size,
        name: file.name,
        percentage: 0
      });
    },
    handleImageChange(file, fileList) {
      if (!file || !file.raw) return;
      this.resetImage();
      this.imageFile = file.raw;
      this.previewImageUrl = URL.createObjectURL(file.raw);
      this.imageFileList = [file];
    },
    handleMediaBeforeUpload(file) {
      // 限制音频视频格式和大小
      const isAudioOrVideo =
        file.type.startsWith("audio") || file.type.startsWith("video");
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (!isAudioOrVideo) {
        this.$message.error("只能上传音频或视频文件");
        return false;
      }
      if (!isLt300M) {
        this.$message.error("文件大小不能超过 300MB");
        return false;
      }
      return true;
    },
    handleExceedV2(files) {
      if (!files?.length) return;
      this.mediaFile = null;
      this.previewMediaUrl = "";
      this.isVideo = false;
      this.mediaFileList = [];
      const file = files[0];
      file.uid = genFileId();
      this.handleMediaChange({
        raw: file,
        size: file.size,
        name: file.name,
        percentage: 0
      });
    },
    handleMediaChange(file, fileList) {
      if (!file || !file.raw) return;
      this.resetMedia();
      this.mediaFile = file.raw;
      this.isVideo = file.raw.type.startsWith("video");
      this.previewMediaUrl = URL.createObjectURL(file.raw);
      this.mediaFileList = [file];
    },
    async submit() {
      if (!this.imageFile) {
        ElMessage.error("请上传要打印的图片");
        return;
      }
      if (!this.mediaFile) {
        ElMessage.error("请上传媒体文件");
        return;
      }
      let loading = null;
      try {
        loading = ElLoading.service({
          lock: true,
          text: "正在上传媒体文件...",
          background: "rgba(0, 0, 0, 0.7)"
        });
        await ossService.uploadToOSS(
          this.mediaFile,
          dayjs().format("YYYYMMDDHHmmss")
        );
        loading.close();
        loading = ElLoading.service({
          lock: true,
          text: "正在合成新图...",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          loading.close();
        }, 1000);
      } catch (error) {
        loading.close();
      }
      ElMessage.success("生成成功");
    }
  }
};
