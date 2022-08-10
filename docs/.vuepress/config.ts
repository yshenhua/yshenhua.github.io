import { defineUserConfig } from 'vuepress';
import { defaultTheme } from '@vuepress/theme-default';

export default defineUserConfig({
  base: '/',
  lang: 'zh',
  title: '文燚的博客',
  description: 'Just playing around',
  head: [['link', { rel: 'icon', href: 'https://github.githubassets.com/favicons/favicon.png' }]],
  theme: defaultTheme({
    logo: 'https://avatars.githubusercontent.com/u/23024424?v=4',
    navbar: [
      {
        text: '学习笔记',
        children: [
          {
            text: '基础知识',
            children: [
              {
                text: 'JavaScript',
                link: '/javascript/',
              },
              {
                text: 'TypeScript',
                link: '/typescript/',
              },
              {
                text: 'CSS',
                link: '/css',
              },
            ],
          },
          {
            text: '框架',
            children: [
              {
                text: 'Angular',
                link: '/angular/',
              },
              {
                text: 'React',
                link: '/react/',
              },
              {
                text: 'Vue.js',
                link: '/vuejs/',
              },
            ],
          },
          {
            text: '代码规范',
            children: [
              {
                text: 'Prettier',
                link: '/prettier/',
              },
            ],
          },
          {
            text: '版本控制',
            children: [
              {
                text: 'Git',
                link: '/git/',
              },
            ],
          },
          {
            text: '操作系统',
            children: [
              {
                text: 'Microsoft Windows',
                link: '/windows/',
              },
            ],
          },
        ],
      },
    ],
    repo: 'yshenhua',
    editLink: false,
    lastUpdatedText: '上次更新',
    contributorsText: '作者',
    toggleColorMode: '',
  }),
});
