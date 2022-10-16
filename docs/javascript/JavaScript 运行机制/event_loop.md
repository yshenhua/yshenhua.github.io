# JavaScript 运行机制

## Event Loop（事件循环）

JavaScript 是单线程的。JavaScript 的并发是通过 Event Loop（事件循环）机制来实现的。Event Loop 大体有三个部分组成：调用栈（call stack)、消息队列（Message Queue）、微任务队列（Microtask Queue）。JavaScript 引擎运行时从全局栈的代码开始一行一行执行。

1. 遇到函数调用时会创建对应的函数上下文并把它推入调用栈中，我们叫它栈桢（Frame），当遇到函数嵌套时会堆积栈帧。当函数返回后，调用栈会弹出对应的栈桢。
2. 遇到异步任务后会交给浏览器的对应模块处理，不影响后续代码的执行。异步任务获得结果后，其回调函数被插入消息队列成为消息。调用栈为空时，Event Loop 会处理消息队列中的消息（回到步骤 1）。
3. ES6 开始有了微任务的概念。遇到 promise.then 等产生的微任务会被插入到微任务队列中，它在调用栈被清空时立即执行（回到步骤 1）。微任务队列的优先级大于消息队列，当调用栈和微任务队列都空了才会开始处理消息队列。

## 宏任务与微任务

由 JavaScript 引擎产生的任务是微任务，由宿主 API(setTimeout 等)产生的任务是宏任务。在浏览器环境中，会产生微任务的有 Promise、MutationObserver。微任务早于宏任务执行。

```js:no-line-numbers
setTimeout(() => {
  console.log(1);
}, 0);

new Promise((resolve) => {
  resolve();
  console.log(2);
})
  .then(() => {
    Promise.resolve()
      .then(() => {
        console.log(3);
      })
      .then(() => {
        console.log(4);
      });
  })
  .then(() => {
    console.log(5);
  });

console.log(6);

// 输出顺序：2 6 3 5 4 1
```

## Web Worker

使用 Web Worker 可以开启一个额外的线程。我们可以在这个独立线程中执行费时的任务，而让主线程不会因此被阻塞/放慢。线程之间通过 message 消息进行通信，比如：

```js:no-line-numbers
// main.js
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  const worker = new Worker('./worker.js');
  worker.postMessage(9876543210);
  worker.onmessage = function (e) {
    console.log(e.data);
    worker.terminate();
  };
});

// worker.js
function sum(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

onmessage = function(e) {
  const workerResult = sum(e.data);
  postMessage(workerResult);
};
```

Worker 不能直接操作 DOM。Worker 在另一个全局上下文中运行，与当前的 window 不同，具体支持哪些 Web APIs 请查看 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)。Worker 脚本必须与当前网址同域，不过 Worker 中的 [`importScripts`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) 方法可以加载跨域的文件。

除了专用的 Worker，还有 [SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)（支持多个页面共享的 Worker），以及 [ServiceWorker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker)（能够拦截和重定向请求的 Worker）。
