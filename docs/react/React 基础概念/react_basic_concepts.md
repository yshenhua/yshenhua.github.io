# React 基础概念

## 定义

React 是一个用于构建用户界面的 JavaScript 库。

## 特点

- 声明式编程，无需直接操作 DOM，开发效率比较高。
- 组件化，提高代码复用率，让代码更好维护。
- 跨平台，可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。

## 虚拟 DOM

虚拟 DOM 是对 DOM 的抽象，本质上是一个用来描述 DOM 结构的 JavaScript 对象。React 选用它主要为了解决开发效率和跨平台的问题。虚拟 DOM 工作的主要流程为：

1. 组件初始化时创建一个虚拟 DOM，通过 ReactDOM 之类的库将其渲染成真实 DOM。
2. 组件状态发生变化时生成新的虚拟 DOM，对比新旧虚拟 DOM，将需要更新的部分同步到真实 DOM。

## JSX

JSX 是 JavaScript 的语法扩展。JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。**注意 React DOM 使用 camelCase 命名约定来定义属性名称而不是用 HTML 属性名称。例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。**

## 单向数据流

在 React 中，组件状态始终由组件自身拥有，并且从该状态派生的任何数据或 UI 只能影响该组件及其后代组件。这种自顶向下的单向数据流保证了数据的可控性。
