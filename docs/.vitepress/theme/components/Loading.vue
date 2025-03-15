<script setup lang="ts">
import { useRouter } from 'vitepress';
import { ref, watch } from 'vue';

const router = useRouter();
const loading = ref(false);
router.onBeforePageLoad = () => {
  loading.value = true;
};
router.onAfterPageLoad = () => {
  loading.value = false; // 加载失败不会触发
};
router.onAfterRouteChange = () => {
  loading.value = false;
};

const active = ref(false);
let timeoutId;
watch(loading, (loading) => {
  if (loading) {
    timeoutId = setTimeout(() => {
      active.value = true;
    }, 200);
  } else {
    clearTimeout(timeoutId);
    active.value = false;
  }
});
</script>

<template>
  <div class="progress-track" :class="{ active }">
    <div class="progress-bar"></div>
  </div>
</template>

<style scoped>
.progress-track {
  position: fixed;
  z-index: 90;
  inset: 0;
  height: 4px;
  background-color: rgba(from var(--vp-c-brand-1) r g b / 0.25);
  &:not(.active) {
    display: none;
  }
}

.progress-bar {
  width: 70%;
  height: 100%;
  background-color: var(--vp-c-brand-1);
  animation: 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite move;
}

@keyframes move {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}
</style>
