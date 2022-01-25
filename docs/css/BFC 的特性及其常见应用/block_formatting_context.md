# BFC 的特性及其常见应用

## 什么是 BFC

BFC（Block Formatting Context——块格式化上下文）是 Web 页面的可视化 CSS 渲染的一部分。它是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。简单来说，BFC 是一个独立的渲染区域，它遵循以下渲染规则。

## BFC 的渲染规则

1. BFC 在 Web 页面上是一个独立的容器，容器内外互不影响
2. 和标准文档流一样，BFC 内的元素垂直方向的边距会发生重叠
3. BFC 不会与浮动元素的盒子重叠
4. 计算 BFC 高度时即使子元素浮动也参与计算

## 如何创建 BFC

MDN web docs 现在给出创建BFC的方法有以下几种（[原文链接](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)）：
1. 根元素或包含根元素的元素
2. 浮动元素（元素的 float 不是 none）
3. 绝对定位元素（元素的 position 为 absolute 或 fixed）
4. 行内块元素（元素的 display 为 inline-block）
5. 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
6. 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
7. 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
8. overflow 值不为 visible 的块元素
9. display 值为 flow-root 的元素
10. contain 值为 layout、content或 strict 的元素
11. 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
12. 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
13. 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
14. column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中

## BFC 的应用场景

### 解决块级元素垂直方向的边距重叠问题

```html
<section id="father">
  <style>
    #father {
      background-color: pink;
      overflow: hidden;
    }
    #father .child {
      background-color: red;
      margin: 15px auto 20px;
    }
  </style>
  <div class="child">这是第一个div</div>
  <div class="child">这是第二个div</div>
</section>
```

![block_formatting_context_1](/images/block_formatting_context_1.jpg)

由于块级元素垂直方向的边距会发生重叠，第一个 div 和第二个 div 之间的间距并不是 15px 加上 20px 后的 35px，而是 20px（较大的margin值），为了解决边距重叠的问题，让第两个 div 之间的间距变成 35px，可以在 div 外面创建一个 BFC，比如：

```html
<div style="overflow:hidden">
  <div class="child">这是第二个div</div>
</div>
```

![block_formatting_context_2](/images/block_formatting_context_2.jpg)

因为 BFC 是一个独立的容器，容器内外互不影响，所以这里两个 div 之间的间距就变成了 35px。

### 清除浮动

```html
<section id="father">
  <style>
    #father {
      background-color: pink;
    }
    #father .child {
      font-size: 58px;
      float: left;
    }
  </style>
  <div class="child">这是一个浮动元素</div>
</section>
```

![block_formatting_context_3](/images/block_formatting_context_3.jpg)

子元素浮动后，父元素失去了高度，为了清除浮动带来的这个影响可以将父元素设置成一个 BFC：

![block_formatting_context_4](/images/block_formatting_context_4.jpg)

```css
#father {
  background-color: pink;
  overflow: auto;
}
```

因为 BFC 计算高度时，即使子元素是浮动元素也参与计算，所以这里的父元素高度就等于子元素高度而不是之前的 0 了。

### 解决元素浮动后发生重叠的问题

```html
<section id="father">
  <style>
    #father {
      background-color: red;
    }
    #father .left {
      background-color: pink;
      width: 100px;
      height: 100px;
      float: left;
    }
    #father .right {
      background-color: #ccc;
      height: 120px;
    }
  </style>
  <div class="left"></div>
  <div class="right"></div>
</section>
```

![block_formatting_context_5](/images/block_formatting_context_5.jpg)

如图，左边的元素浮动之后，由于脱离标准文档流叠在了右边的元素上，为了让两个元素不重叠，我们把右边的元素设置成 BFC：

```css
#father .right {
  background-color: #ccc;
  height: 120px;
  overflow: auto;
}
```

![block_formatting_context_6](/images/block_formatting_context_6.jpg)

因为BFC不会与浮动元素的盒子重叠，所以这里右边的元素就不会叠在左边的浮动元素下面了。
