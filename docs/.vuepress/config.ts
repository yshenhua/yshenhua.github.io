import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  lang: 'en-US',
  title: '文燚的博客',
  description: 'Just playing around',

  themeConfig: {
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
  },
})