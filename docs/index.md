---
layout: home
hero:
  name: 文燚的博客
  text:
  tagline: 随便记点什么来证明我身处这个世界
  image:
    src: /images/words.png
    alt: 文燚的博客
  actions:
    - theme: brand
      text: 查看学习笔记
      link: /catalog/
    - theme: alt
      text: GitHub 主页
      link: https://github.com/yshenhua
pageClass: home-page
features:
  - icon: 🛠️
    title: 继承与原型链
    details: JavaScript 是一门基于对象（Object-Based）的语言，与 Java、C++ 等面向对象（Object-Oriented）的语言不同，它本身没有提供类（class）的实现。那么，它是怎么实现继承的呢...
    link: /javascript/Inheritance-and-the-prototype-chain
  - icon: 🚀
    title: 使用 VitePress 快速搭建静态站点
    details: 我们可以通过 npx vitepress init 命令构建一个基本项目，也可以用 npm i vitepress -D 将 vitepress 安装到现有项目中。安装完成后，通过 npx vitepress dev 命令可以启动本地开发服务器。同...
    link: /vuejs/use-vitepress
  - icon: 📝
    title: 更多...
    link: /catalog/
---

<footer style="text-align: center; margin-top: 64px;">
  <span style="font-size: 14px; color: var(--vp-c-text-2); padding: 24px;">网站使用 VitePress 构建</span>
</footer>
