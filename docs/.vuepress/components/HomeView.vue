<template>
  <BaseCanvas :width="width" :height="height" :shapes="shapes" :options="options" @click="click" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseCanvas from './base/BaseCanvas/BaseCanvas.vue';
import imageSrc from './the_yellow_house.webp';

// image
const image = new Image();
image.src = imageSrc; // console.log(image instanceof Image);
// canvas
const canvasWidth = document.body.offsetWidth;
const canvasHeight = document.body.offsetHeight;
// title 98->499.57 72->367.03 58->295.66
const titleFontSize = canvasWidth > 540 ? 98 : canvasWidth > 390 ? 72 : 58;
const titleX = canvasWidth / 2;
const titleY = canvasHeight / 8;
const titleMaxWidth = canvasWidth - 20;
// container
const containerWidth = canvasWidth > 540 ? 400 : canvasWidth > 390 ? 300 : canvasWidth > 320 ? 240 : canvasWidth - 80;
const containerHeight = canvasWidth > 540 ? 150 : 120;
const containerX = (canvasWidth - containerWidth) / 2;
const containerY = (canvasHeight / 3) * 2 - containerHeight / 2;
// content
const contentWidth = containerWidth - 20;
const contentX = canvasWidth / 2;
const contentY = (canvasHeight / 3) * 2;

export default defineComponent({
  name: 'HomeView',
  components: { BaseCanvas },
  data() {
    return {
      width: canvasWidth,
      height: canvasHeight,
      options: {
        fit: 'cover',
      },
      shapes: [
        {
          type: 'image',
          image,
        },
        {
          type: 'text',
          fixed: true,
          text: '文燚的博客',
          x: titleX,
          y: titleY,
          maxWidth: titleMaxWidth,
          options: {
            fillStyle: 'rgba(0, 0, 0, .9)',
            font: `bold ${titleFontSize}px serif`,
            textAlign: 'center',
            textBaseline: 'top',
          },
        },
        {
          type: 'rect',
          fixed: true,
          x: containerX,
          y: containerY,
          width: containerWidth,
          height: containerHeight,
          options: {
            fillStyle: 'rgba(255, 255, 255, .5)',
          },
        },
        {
          type: 'text',
          fixed: true,
          text: '学习笔记',
          x: contentX,
          y: contentY,
          maxWidth: contentWidth,
          options: {
            fillStyle: 'rgba(0, 0, 0, .9)',
            font: 'bold 42px serif',
            textAlign: 'center',
            textBaseline: 'middle',
          },
        },
      ],
    };
  },
  methods: {
    click(ponint, { offsetX, offsetY }) {
      if (
        offsetX > containerX &&
        offsetX < containerX + containerWidth &&
        offsetY > containerY &&
        containerY < containerY + containerHeight
      ) {
        window.location.href = '/javascript/';
      }
    },
  },
});
</script>

<style>
canvas {
  background: aliceblue;
}
</style>
