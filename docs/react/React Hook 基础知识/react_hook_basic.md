# React Hook 基础知识

## 什么是 Hook？

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。它本质上是一个用来复用组件状态逻辑的函数。

## React 引入 Hook 的具体原因

1. Render Props、高阶组件等抽象层组成的组件会形成“嵌套地狱”，而 Hook 可以在不改变组件结构的情况下复用状态逻辑。
2. 按照生命周期划分逻辑会使复杂组件变得难以理解，Hook 可以将组件中互相关联的部分拆分成对应的函数，而不是强制按照生命周期划分。这使得代码更加清晰，更好管理。
3. class 难以理解，学习成本较高，也给目前的预编译工具带来了一些问题（不能很好的压缩、热重载出现不稳定的情况）。Hook 使你在非 class 的情况下可以使用更多的 React 特性。

## 最基础的 React Hook

函数组件本身没有 state，但现在可以通过调用 State Hook 来给它添加 state，比如：

```tsx:no-line-numbers
import { useState, type FC } from 'react';

const MyComponent: FC = () => {
  const [count, setCount] = useState(1);
  const handleClick = () => setCount(count + 1);

  return (
    <>
      <p>count: {count}</p>
      <button onClick={handleClick}>+1</button>
    </>
  );
};
```

函数组件没有生命周期方法，但现在可以通过调用 Effect Hook 来模拟生命周期，而且可以根据状态逻辑划分代码，比如：

```tsx:no-line-numbers
import { useEffect, useState, type FC } from 'react';

const getTimeString = () => new Date().toLocaleTimeString();

const MyComponent: FC = () => {
  // 状态逻辑1
  const [timeString, setTimeString] = useState(getTimeString);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeString(getTimeString);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 状态逻辑2
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('no data');
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setData('some data');
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <p>当前时间：{timeString}</p>
      <p>模拟数据：{loading ? 'loading...' : data}</p>
    </>
  );
};
```

## Hook 使用规则

Hook 比普通函数更为严格。我们只能在函数组件（或自定义 Hook）的顶层调用它。如果想在循环、条件或嵌套函数中调用 Hook，可以提取一个新的组件并在组件内部使用它。React 提供了一个 ESLint 插件 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 来帮助我们检查 Hook 的使用是否符合这个规则。

## 自定义 Hook

除了 React 内置的 Hook，我们也可以将现有的 Hook 组合成新的 Hook，达到复用组件状态逻辑的效果。比如，我们把上例中的 `timeString` 状态与相关逻辑提取到一个自定义 Hook 中：

```tsx:no-line-numbers
import { useEffect, useState } from 'react';

const getTimeString = () => new Date().toLocaleTimeString();

const useTimeString = () => {
  const [timeString, setTimeString] = useState(getTimeString);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeString(getTimeString);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return timeString;
}
```

在需要该状态逻辑的组件中，我们直接使用 `useTimeString` 即可：

```tsx:no-line-numbers
import { useEffect, useState, type FC } from 'react';
import { useTimeString } from 'src/hooks';

const MyComponent: FC = () => {
  // 状态逻辑1
  const timeString = useTimeString();

  // 状态逻辑2
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('no data');
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setData('some data');
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <p>当前时间：{timeString}</p>
      <p>模拟数据：{loading ? 'loading...' : data}</p>
    </>
  );
};
```
