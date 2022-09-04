<template>
  <canvas
    ref="canvasRef"
    :width="width"
    :height="height"
    @mousewheel="handleMouseWheel"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUpOrOut"
    @mouseout="handleMouseUpOrOut"
    @mousemove="handleMouseMove"
    @click="handleClick"
  ></canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useCanvas from './useCanvas';

export default defineComponent({
  name: 'BaseCanvas',
  emits: ['click'],
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    shapes: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const canvasApis = useCanvas(props, { emit });

    return {
      ...canvasApis,
    };
  },
});
</script>
