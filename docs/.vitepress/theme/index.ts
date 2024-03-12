import DefaultTheme from 'vitepress/theme';
import Layout from './components/Layout.vue';
import './styles/index.css';

export default {
  extends: DefaultTheme,
  Layout, // 使用注入插槽的包装组件覆盖 Layout
};
