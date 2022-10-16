# async 函数

async 函数是 [AsyncFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 构造函数的实例，可以使用 `async` 关键字声明，这个关键字可以用在函数声明、函数表达式、箭头函数和方法上。async 函数的返回值是一个 Promise 对象。async 函数中可以使用 `await` 操作符，await 表达式会暂停当前 async 函数的执行，等待 Promise 处理完成。

```js:no-line-numbers
function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function fn() {
  await sleep(5000);
  return 'ok';
}

fn().then(console.log); // 5s 后打印出 ok
```

## 串行和并行

当一个 async 函数中有多个 await 操作的时候要注意并行串行的问题：

```js:no-line-numbers
// 串行
async function fn() {
  const res1 = await doPromise1();
  const res2 = await doPromise2();
  // do someting ...
}

// 并行
async function fn() {
  const p1 = doPromise1();
  const p2 = doPromise2();
  const res1 = await p1;
  const res2 = await p2;
  // do someting ...
}
```

## 实现原理

async/await 本质上是一个 [generator 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)和 co 的语法糖：

```js:no-line-numbers
function co(it) {
  return new Promise((resolve, reject) => {
    const next = function(data) {
      const { value, done } = it.next(data);
      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(res => {
          next(res);
        });
      }
    }

    next();
  });
}

function *fn() {
  yield sleep(5000);
  return 'ok';
}

co(fn()).then(console.log); // 5s 后打印出 ok
```
