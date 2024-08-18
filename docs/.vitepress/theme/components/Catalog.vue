<script setup lang="ts">
import { useRouter } from 'vitepress';
import { rewriteFilePath } from '../utils';
import catalog from '../data/catalog';
import hrefStore from '../stores/hrefs';

const router = useRouter();
const handleClick = (toHref) => {
  hrefStore.set(new URL(toHref, location.origin).href);
  router.go(toHref);
};
</script>

<template>
  <div class="container">
    <h1 id="目录">目录<a class="header-anchor" href="#目录" aria-label='Permalink to "目录"'>​</a></h1>
    <template v-for="(items, group) in catalog" :key="group">
      <h2 :id="group">
        {{ group }}<a class="header-anchor" :href="`#${group}`" :aria-label="`Permalink to &quot;${group}&quot;`">​</a>
      </h2>
      <div class="group">
        <div v-for="item1 in items" :key="item1.text" :class="['group-content', item1.className].join(' ')">
          <h3 class="text">{{ item1.text }}</h3>
          <a
            v-for="item2 in item1.items"
            :key="item2.text"
            @click="handleClick(`/${item1.folder}/${rewriteFilePath(item2.file)}`)"
            class="link"
            :class="{ active: rewriteFilePath(item2.file) === hrefStore.item2 }"
          >
            <p class="text">{{ item2.folder }}</p>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  box-sizing: content-box;
  max-width: 1152px;
  padding: 0 24px 32px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .container {
    padding: 48px 32px;
  }
}

h1,
h2 {
  font-weight: 600;
  letter-spacing: -0.02em;
  position: relative;
  font-weight: 600;
  outline: none;
}

h1 {
  line-height: 40px;
  font-size: 28px;
}
@media (min-width: 768px) {
  h1 {
    font-size: 32px;
  }
}

h2 {
  line-height: 32px;
  font-size: 24px;
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}

h3 {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

p {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.text {
  font-size: 14px;
  padding: 4px 0;
  line-height: 24px;
  transition: color 0.25s;
}

.header-anchor {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: -0.87em;
  font-weight: 500;
  user-select: none;
  opacity: 0;
  text-decoration: none;
  color: var(--vp-c-brand-1);
  transition: color 0.25s, opacity 0.25s;
}
.header-anchor::before {
  content: var(--vp-header-anchor-symbol);
}

h2 .header-anchor {
  top: 24px;
}

h1:hover .header-anchor,
h2:hover .header-anchor {
  opacity: 1;
}

.group {
  column-count: 1;
}
@media (min-width: 768px) {
  .group {
    column-count: 2;
  }
}
@media (min-width: 1280px) {
  .group {
    column-count: 3;
  }
  .break-before-column {
    break-before: column;
  }
}

.group-content {
  break-inside: avoid;
  margin-bottom: 10px;
}

.link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.link.active::after {
  content: '阅读中...';
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
  border-radius: 4px;
  font-size: 13px;
  line-height: 1;
  padding: 4px 8px;
}

.link:hover p,
.link.active:hover::after {
  color: var(--vp-c-brand-1);
}
</style>
