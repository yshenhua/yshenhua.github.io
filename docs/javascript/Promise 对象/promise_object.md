# Promise 对象

## 什么是 Promise？

Promise 是异步编程的一种解决方案，相比回调函数和事件更合理、更强大。它可以避免回调地狱的问题，并且支持多并发的请求。从语法上讲，Promise 是一个对象，从它可以获取异步操作的消息。

## Promise 的状态

Promise 有三种状态：
- pending 初始状态也叫等待状态；
- fulfilled 成功状态；
- rejected 失败状态。

创建 Promise 实例后，它会立即执行，进入 pending 状态。可通过 resolve 转变为 fulfilled 状态，或者通过 reject 转变为 rejected 状态，状态改变后不可逆，任何时候都可以得到这个结果。

## 手写实现 Promise

按照规范 [Promises/A+](https://promisesaplus.com/)，手写实现 Promise：

1. 定义 Promise 类，在 constructor 中立即执行传入的 executor；

```js:no-line-numbers
class MyPromise {
  constructor(executor) {
    executor(resolve, reject);
  }
}
```

2. 定义 Promise 状态，在 constructor 中定义 state 为 pending 状态，定义 value 和 reason 为 undefined，同时添加 resolve、reject 方法更改状态，executor 执行出错时调用 reject 方法；

```js:no-line-numbers
const PENDING = 'pending';
const FULFILLED = 'fulFilled';
const REJECTED = 'rejected';

...

this.state = PENDING;
this.value = undefined;
this.reason = undefined;

const resolve = (value) => {
  if (this.status === PENDING) {
    this.status = FULFILLED;
    this.value = value;
  }
}

const reject = (reason) => {
  if (this.status === PENDING) {
    this.status = REJECTED;
    this.reason = reason;
  }
}

try {
  executor(resolve, reject);
} catch (e) {
  reject(e);
}
```

3. 定义 then 方法，执行传入的回调函数；

```js:no-line-numbers
then(onFulfilled, onRejected) {
  if (this.status === FULFILLED) {
    onFulfilled(this.value);
  }

  if (this.status === REJECTED) {
    onRejected(this.reason);
  }
}
```

4. 在 constructor 中定义 onFulfilledCallbacks 和 onRejectedCallbacks 数组，如果 executor 中的任务是异步的，在 then 方法中订阅，然后在 resolve、reject 方法中发布；

```js:no-line-numbers
this.onFulfilledCallbacks = [];
this.onRejectedCallbacks = [];

...

// 发布
this.onFulfilledCallbacks.forEach((fn) => fn());

...

// 发布
this.onRejectedCallbacks.forEach((fn) => fn());

...

if (this.status === PENDING) {
  // 订阅
  this.onFulfilledCallbacks.push(() => {
    onFulfilled(this.value);
  });
  this.onRejectedCallbacks.push(() => {
    onRejected(this.reason);
  });
}
```

5. 在 then 方法中返回一个新的 promise，在 onFulfilled 或者 onRejected 执行完成后调用 resolvePromise 方法，出错时执行该 promise 的 reject 回调；

```js:no-line-numbers
let promise2 = new Promise((resolve, reject) => {
  if (this.status === FULFILLED) {
    setTimeout(() => {
      try {
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }, 0);
  }

  if (this.status === REJECTED) {
    setTimeout(() => {
      try {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }, 0);
  }

  if (this.status === PENDING) {
    // 订阅
    this.onFulfilledCallbacks.push(() => {
      try {
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
    this.onRejectedCallbacks.push(() => {
      try {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }
});

return promise2;
```

6. 定义 resolvePromise 方法，当 x 为 promise2 时抛出 TypeError，当 x 为 object（不包括 null）或者 function 类型时执行 then 方法，否则 resolve(x)；如果 then 不是 funtion 类型直接 resolve(x)，否则执行 then 方法，同时指定 this 为 x，第一个回调中 resolve(y)，第二个回调中 reject(r)，为了保证这两个回调只触发一次，定义一个 called 来标记，过程中如果抛出错误则执行 reject 回调；

```js:no-line-numbers
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  let called = false;

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolve(y);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```

7. 定义 catch 方法；

```js:no-line-numbers
catch(errorCallback) {
  return this.then(null, errorCallback);
}
```

## Promise.all()、Promise.race() 和 Promise.allSettled()

- [Promise.all()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

所有的 promise 都成功时返回一个结果数组，否则失败返回最先失败的结果。

- [Promise.race()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

在多个 promise 中返回获取速度最快的结果，无论其是成功还是失败。

- [Promise.allSettled()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

所有的 promise 都结束时返回一个结果数组，始终能够得到每一个 promise 成功或者失败的结果。
