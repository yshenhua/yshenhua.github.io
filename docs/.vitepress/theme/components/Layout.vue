<script setup lang="ts">
import { useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { onMounted } from 'vue';
import hrefStore from '../stores/hrefs';
import { initObserverAdsbygoogle } from '../utils';
import Loading from './Loading.vue';

onMounted(() => {
  hrefStore.set();
  initObserverAdsbygoogle();
});

const router = useRouter();
const handleClick = () => {
  hrefStore.set();
  router.go(hrefStore.group ? `/catalog/#${hrefStore.group}` : '/catalog/');
};
</script>

<template>
  <Loading />
  <DefaultTheme.Layout>
    <template #sidebar-nav-before>
      <div class="catalog-group">
        <a class="link" @click="handleClick">
          <h1 class="text">目录 / {{ hrefStore.group }}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
            width="18"
            height="18"
            class="back"
          >
            <path
              d="M589.312 624.64zM276.48 543.232l199.68 199.68c16.896 16.896 45.056 16.896 62.464 0s16.896-45.056 0-62.464l-124.416-124.416H737.28c24.064 0 44.032-19.456 44.032-44.032 0-24.064-19.456-44.032-44.032-44.032H413.696l124.416-124.416c16.896-16.896 16.896-45.056 0-62.464-8.704-8.704-19.968-12.8-31.232-12.8s-22.528 4.096-30.72 12.8l-199.68 199.68c-16.896 17.92-16.896 45.568 0 62.464zM920.064 793.6c-4.608 0-9.216-1.024-13.824-4.096-11.776-7.68-15.36-23.552-8.192-35.328 20.992-33.792 37.888-70.144 49.664-107.52 4.096-13.312 18.432-20.992 32.256-16.896 13.312 4.096 20.992 18.432 16.896 32.256-12.8 41.984-31.744 82.432-54.784 119.808-5.12 7.68-13.312 11.776-22.016 11.776z"
            ></path>
            <path
              d="M511.488 1019.392c-255.488 0-476.16-193.536-504.32-453.12-14.336-134.656 24.576-267.264 109.568-372.736S323.072 22.016 457.728 7.68c134.656-14.336 267.264 24.576 372.736 109.568 105.472 84.992 171.52 205.824 185.856 340.992 1.536 13.312 2.56 26.624 2.56 39.936 0.512 14.336-10.752 26.112-25.088 26.112-13.824 0-26.112-10.752-26.112-25.088-0.512-11.776-1.024-24.064-2.56-35.84-12.8-121.344-72.192-229.888-167.424-306.176C702.976 80.896 583.68 45.568 462.848 58.88 342.016 71.68 233.472 131.072 157.184 225.792c-76.8 94.72-111.616 214.016-98.816 334.848 26.624 249.856 252.416 431.616 502.272 404.992 78.848-8.704 154.624-37.376 218.624-83.968 11.264-8.192 27.648-5.632 35.84 5.632 8.192 11.264 5.632 27.648-5.632 35.84a503.0144 503.0144 0 0 1-243.2 93.184c-18.432 2.048-36.352 3.072-54.784 3.072z"
            ></path>
          </svg>
        </a>
      </div>
    </template>
    <template #doc-footer-before>
      <!-- 文章结尾展示广告 -->
      <ins
        id="adsbygoogle-ins"
        class="adsbygoogle"
        data-ad-client="ca-pub-7660586877202674"
        data-ad-slot="1726013858"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.catalog-group {
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 10px;
}
@media (min-width: 960px) {
  .catalog-group {
    width: calc(var(--vp-sidebar-width) - 64px);
    margin-bottom: 0;
  }
}

.link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.text {
  flex-grow: 1;
  padding: 4px 0;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.back {
  flex-shrink: 0;
  fill: var(--vp-c-text-3);
  transition: fill 0.25s;
}

.link:hover .back {
  fill: var(--vp-c-text-2);
}

.adsbygoogle {
  display: block;
}
.adsbygoogle[data-ad-status='filled'] {
  margin-bottom: 14px;
}
.adsbygoogle[data-ad-status='unfilled'] {
  display: none;
}
</style>
