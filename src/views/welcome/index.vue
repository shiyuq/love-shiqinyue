<template>
  <div>
    <div class="container">
      <input type="file" accept="image/*" @change="handleImageUpload" />
      <canvas ref="canvas" style="display: none" />

      <div v-if="finalImage">
        <img
          :src="finalImage"
          alt="最终合成图"
          style="max-width: 100%; margin-top: 10px"
        />
        <button @click="downloadImage">下载图片</button>
      </div>
    </div>
  </div>
</template>

<script src="./component.js"></script>
