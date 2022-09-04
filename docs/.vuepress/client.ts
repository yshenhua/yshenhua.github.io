import { defineClientConfig } from '@vuepress/client';
import HomeView from './components/HomeView.vue';

export default defineClientConfig({
  enhance({ app }) {
    app.component('HomeView', HomeView);
  },
});
