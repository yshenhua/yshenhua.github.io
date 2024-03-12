import { defineConfig } from 'vitepress';
import catalog, { Group, items } from './theme/data/catalog';

const sidebar = Object.fromEntries(
  items.map((item) => [
    `/${item.folder}/`,
    catalog[item.group].map((item1, _index, { length }) => {
      // 侧边栏组存在多项时显示折叠按钮
      let collapsed;
      if (length > 1) {
        collapsed = false;
      }
      return {
        text: item1.text,
        collapsed,
        items: item1.items.map((item2) => ({
          text: item2.folder,
          link: `/${item1.folder}/${item2.folder}/${item2.file}`,
        })),
      };
    }),
  ]),
);

export default defineConfig({
  lang: 'zh-Hans',
  title: '文燚的博客',
  description: '学习笔记',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://github.githubassets.com/favicons/favicon.png',
      },
    ],
    [
      'script',
      {
        async: 'true',
        crossorigin: 'anonymous',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7660586877202674',
      },
    ],
  ],
  // srcDir: './docs', // 相对于项目根目录
  cleanUrls: true,
  themeConfig: {
    // logo: '/logo.svg', // 文件放置在源目录（srcDir）的 public 目录中
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    outline: { label: '页面导航', level: [2, 3] },
    returnToTopLabel: '回到顶部',
    lastUpdated: { text: '上次更新', formatOptions: { dateStyle: 'long' } },
    docFooter: { prev: '上一篇', next: '下一篇' },
    nav: [{ text: '学习笔记', link: '/catalog/', activeMatch: '/.' }],
    sidebar,
    search: { provider: 'local', options: { translations: { button: { buttonText: '搜索' } } } },
  },
});
