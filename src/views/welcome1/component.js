import { Plus } from "@element-plus/icons-vue";
import QRCode from "qrcode";

export default {
  name: "welcome",
  data() {
    return {
      title: "你好啊小玥玥",
      imageUrl: null,
      uploadedImage: null,
      finalImage: null
    };
  },
  components: { Plus },
  methods: {
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async e => {
        this.uploadedImage = e.target.result;
        await this.mergeImageWithQRCode(this.uploadedImage);
      };
      reader.readAsDataURL(file);
    },

    async mergeImageWithQRCode(imageBase64) {
      // 加载原图
      const image = new Image();
      image.src = imageBase64;
      await new Promise(resolve => (image.onload = resolve));

      // 生成二维码
      const qrCodeDataUrl = await QRCode.toDataURL("https://www.baidu.com", {
        margin: 2,
        scale: 10
      });
      const qrImage = new Image();
      qrImage.src = qrCodeDataUrl;
      await new Promise(resolve => (qrImage.onload = resolve));

      // 画到 canvas
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, image.width, image.height);

      const qrSize = Math.floor(image.width * 0.15);
      ctx.drawImage(
        qrImage,
        image.width - qrSize,
        image.height - qrSize,
        qrSize,
        qrSize
      );

      this.finalImage = canvas.toDataURL("image/png");
    },

    downloadImage() {
      const link = document.createElement("a");
      link.href = this.finalImage;
      link.download = "merged-image.jpg";
      link.click();
    },

    handleImageChange(uploadFile) {
      const file = uploadFile.raw;

      if (!file) return;

      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
