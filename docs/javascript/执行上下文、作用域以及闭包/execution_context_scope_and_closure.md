# 执行上下文、作用域以及闭包

## 执行上下文

JavaScript 代码执行时，会创建对应的执行上下文(execution context 简称 EC)。执行上下文有全局上下文、函数上下文、eval 上下文三种。

全局上下文是最外层的执行上下文，也就是说它在执行上下文栈（也叫执行栈，调用栈）的栈底。在浏览器中，全局上下文就是 window 对象。全局上下文在应用程序退出前才会被销毁，比如关闭网页或退出浏览器。

函数上下文在函数被调用时创建。每调用一次函数，就会创建一个新的函数上下文，这个新的上下文会被推到调用栈上。在函数执行完之后，调用栈会弹出该函数上下文，将控制权返还给之前的执行上下文。

## 作用域

当前的执行上下文。JavaScript 有全局作用域、函数作用域和块级作用域。作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行。从当前作用域到全局作用域的关系链叫做作用域链。代码执行时的标识符解析是通过沿作用域链逐级搜索标识符名称完成的。搜索过程始终从作用域链的最前端开始，然后逐级往后，直到找到标识符。举个例子：

```js:no-line-numbers
let x = 'declared outside function';

function foo() {
    // 作用域链：函数（foo）作用域 -> 全局作用域
    x = 'inside function foo';

    function bar() {
        // 作用域链：函数（bar）作用域 -> 函数（foo）作用域 -> 全局作用域
        console.log(x); // inside function foo
    }

    bar();
}

foo();
console.log(x); // inside function foo
```
函数（foo）作用域中未找到 x 的定义就到全局作用域查找，所以执行函数 foo 的时候修改了全局作用域中的 x。同理，执行函数 bar 的时候输出的也是全局作用域中的 x，只不过在 foo 中被修改了。

## 闭包

闭包指的是引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的。将上例修改为：

```js:no-line-numbers
function foo() {
    let x = 'declared inside function foo';

    return function bar() {
        // 作用域链：函数（bar）作用域 -> 函数（foo）作用域 -> 全局作用域
        console.log(x); // declared inside function foo
    }
}

let baz = foo();
baz();
baz = null; // 解除对函数的引用，这样就可以释放内存了
```

函数 bar 内部用了函数（foo）作用域中定义的 x，函数 bar 就是一个闭包。我们通过 `let baz = foo();` 把函数 bar 赋值给了 baz 之后，baz 同时也引用了它的作用域链，可以使用这个作用域链上的所有变量。这样做的副作用是函数 foo 的活动对象不能在它执行完后销毁，因为函数 bar 的作用域链中任然有对它的引用。不过我们可以再解除对函数的引用，这样就可以释放内存了。

防抖函数（debounce）就是一个闭包的典型应用：

```js:no-line-numbers
function debounce(fn, delay) {
    let timer;
    return () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, delay)
    }
}
```