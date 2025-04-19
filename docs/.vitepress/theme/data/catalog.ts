enum Group {
  One = '基础知识',
  Two = '框架',
  Three = '代码规范',
  Four = '版本控制',
  Five = '操作系统',
}

const items = [
  {
    group: Group.One,
    text: 'JavaScript',
    folder: 'javascript',
    items: [
      { folder: '数据类型转换', file: 'types' },
      { folder: '对象深拷贝', file: 'deep_copy' },
      { folder: '继承与原型链', file: 'Inheritance_and_the_prototype_chain' },
      { folder: '执行上下文、作用域以及闭包', file: 'execution_context_scope_and_closure' },
      { folder: 'JavaScript 运行机制', file: 'event_loop' },
      { folder: 'Promise 对象', file: 'promise_object' },
      { folder: 'async 函数', file: 'async_function' },
    ],
  },
  {
    group: Group.One,
    text: 'CSS',
    folder: 'css',
    items: [{ folder: 'BFC 的特性及其常见应用', file: 'block_formatting_context' }],
  },
  {
    group: Group.One,
    text: 'Node.js',
    folder: 'nodejs',
    className: 'break-before-column',
    items: [
      { folder: '使用 nvs 管理多个版本的 node.js', file: 'use_nvs' },
      { folder: '使用 nrm 管理 npm 注册表', file: 'use_nrm' },
      { folder: '使用 Node.js 处理 HTTP 请求', file: 'use_http' },
    ],
  },
  {
    group: Group.Two,
    text: 'React',
    folder: 'react',
    items: [
      { folder: 'React 基础概念', file: 'react_basic_concepts' },
      { folder: 'React 组件', file: 'react_component' },
      { folder: 'React Context', file: 'react_context' },
      { folder: 'React Hook 基础知识', file: 'react_hook_basic' },
      { folder: 'React 内置的 Hooks', file: 'built_in_react_hooks' },
    ],
  },
  {
    group: Group.Two,
    text: 'Vue.js',
    folder: 'vuejs',
    items: [
      { folder: 'Vue 组件基础（组合式 API）', file: 'vue_component_basic' },
      { folder: '使用 VitePress 快速搭建静态站点', file: 'use_vitepress' },
    ],
  },
  {
    group: Group.Three,
    text: 'Prettier',
    folder: 'prettier',
    items: [{ folder: '如何使用 Prettier？', file: 'use_prettier' }],
  },
  {
    group: Group.Four,
    text: 'Git',
    folder: 'git',
    items: [
      { folder: 'Git 常用命令', file: 'git_common_commands' },
      { folder: 'Git 身份验证', file: 'git_authentication' },
      { folder: '使用 commitlint 规范 commit 信息', file: 'use_commitlint' },
    ],
  },
  {
    group: Group.Five,
    text: 'Microsoft Windows',
    folder: 'windows',
    items: [{ folder: '如何制作启动盘？', file: 'make_startup_disk' }],
  },
];

interface Item2 {
  folder: string;
  file: string;
}

interface Item1 {
  text: string;
  folder: string;
  className?: string;
  items: Item2[];
}

const catalog: Record<string, Item1[]> = Object.fromEntries(Object.values(Group).map((group) => [group, []]));
items.forEach(({ group, ...item }) => catalog[group].push(item));

export { Group, items };
export default catalog;
