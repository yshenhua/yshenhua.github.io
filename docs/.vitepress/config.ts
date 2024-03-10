// {
//     text: '学习笔记',
//     children: [
//       {
//         text: '基础知识',
//         children: [
//           {
//             text: 'JavaScript',
//             link: '/javascript/',
//           },
//           {
//             text: 'TypeScript',
//             link: '/typescript/',
//           },
//           {
//             text: 'CSS',
//             link: '/css',
//           },
//           {
//             text: 'Node.js',
//             link: '/nodejs/',
//           },
//         ],
//       },
//       {
//         text: '框架',
//         children: [
//           {
//             text: 'Angular',
//             link: '/angular/',
//           },
//           {
//             text: 'React',
//             link: '/react/',
//           },
//           {
//             text: 'Vue.js',
//             link: '/vuejs/',
//           },
//         ],
//       },
//       {
//         text: '代码规范',
//         children: [
//           {
//             text: 'Prettier',
//             link: '/prettier/',
//           },
//         ],
//       },
//       {
//         text: '版本控制',
//         children: [
//           {
//             text: 'Git',
//             link: '/git/',
//           },
//         ],
//       },
//       {
//         text: '操作系统',
//         children: [
//           {
//             text: 'Microsoft Windows',
//             link: '/windows/',
//           },
//         ],
//       },
//     ],

import { defineConfig } from 'vitepress';

//   },
const nav = [
  {
    text: '基础知识',
    items: [
      {
        text: 'JavaScript',
        link: '/javascript/README.md',
      },
      {
        text: 'TypeScript',
        link: '/typescript/README.md',
      },
      {
        text: 'CSS',
        link: '/css/README.md',
      },
      {
        text: 'Node.js',
        link: '/nodejs/README.md',
      },
    ],
  },
  {
    text: '框架',
    items: [
      {
        text: 'Angular',
        link: '/angular/README.md',
      },
      {
        text: 'React',
        link: '/react/README.md',
      },
      {
        text: 'Vue.js',
        link: '/vuejs/README.md',
      },
    ],
  },
  {
    text: '代码规范',
    items: [
      {
        text: 'Prettier',
        link: '/prettier/README.md',
      },
    ],
  },
  {
    text: '版本控制',
    items: [
      {
        text: 'Git',
        link: '/git/README.md',
      },
    ],
  },
  {
    text: '操作系统',
    items: [
      {
        text: 'Microsoft Windows',
        link: '/windows/README.md',
      },
    ],
  },
];

const sidebar = {
  '/javascript/': [
    {
      text: '数据类型转换',
      link: '/javascript/数据类型转换/types.md',
    },
    {
      text: '对象深拷贝',
      link: '/javascript/对象深拷贝/deep_copy.md',
    },
    {
      text: '继承与原型链',
      link: '/javascript/继承与原型链/Inheritance_and_the_prototype_chain.md',
    },
    {
      text: '执行上下文、作用域以及闭包',
      link: '/javascript/执行上下文、作用域以及闭包/execution_context_scope_and_closure.md',
    },
    {
      text: 'JavaScript 运行机制',
      link: '/javascript/JavaScript%20运行机制/event_loop.md',
    },
    {
      text: 'Promise 对象',
      link: '/javascript/Promise%20对象/promise_object.md',
    },
    {
      text: 'async 函数',
      link: '/javascript/async%20函数/async_function.md',
    },
  ],
  '/css/': [
    {
      text: 'BFC 的特性及其常见应用',
      link: '/css/BFC%20的特性及其常见应用/block_formatting_context.md',
    },
  ],
  '/nodejs/': [
    {
      text: '使用 nvs 管理多个版本的 node.js',
      link: '/nodejs/使用%20nvs%20管理多个版本的%20node.js/use_nvs.md',
    },

    {
      text: '使用 nrm 管理 npm 注册表',
      link: '/nodejs/使用%20nrm%20管理%20npm%20注册表/use_nrm.md',
    },
    {
      text: '使用 Node.js 处理 HTTP 请求',
      link: '/nodejs/使用%20Node.js%20处理%20HTTP%20请求/use_http.md',
    },
    {
      text: '使用 send 实现静态资源托管',
      link: '/nodejs/使用%20send%20实现静态资源托管',
    },
  ],
};

export default defineConfig({
  lang: 'zh-Hans',
  title: '文燚的博客',
  description: '学习笔记',
  head: [['link', { rel: 'icon', href: 'https://github.githubassets.com/favicons/favicon.png' }]],
  themeConfig: {
    // logo: 'https://avatars.githubusercontent.com/u/23024424?v=4',
    nav,
    sidebar,
    lastUpdated: { text: '上次更新', formatOptions: { dateStyle: 'long' } },
    search: {
      provider: 'local',
    },
  },
});
