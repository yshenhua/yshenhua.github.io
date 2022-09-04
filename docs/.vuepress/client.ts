import { defineClientConfig } from '@vuepress/client';

export default defineClientConfig({
  async enhance({ app }) {
    if (!__VUEPRESS_SSR__) {
      const HomeViewModule = await import('./components/HomeView.vue');
      app.component('HomeView', HomeViewModule.default);
    }
  },
});
