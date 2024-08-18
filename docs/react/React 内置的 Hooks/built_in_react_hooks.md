# React 内置的 Hooks

## useState

```tsx
const [state, setState] = useState(initialState);
```

`useState` 接收一个初始状态或者一个返回初始状态的函数。它返回当前状态以及更新当前状态的 set 函数。首次渲染时，当前状态即初始状态；在后续的重新渲染中，当前状态始终是更新后最新的状态。set 函数接收一个新状态或者一个返回新状态的函数（该函数的入参是最新的状态值）。set 函数执行后，状态值在下一次渲染时更新（在调用 set 函数后读取状态仍会获得旧值）。与 class 组件中的 `setState()` 不同：1. set 函数不会自动合并更新对象。2. 这里 React 使用 [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较状态，如果下一个状态与当前状态相同，组件树不会重新渲染（某些情况下，当前组件可能仍然会被调用，但不影响其子组件，[在 CodeSandbox 中查看例子](https://codesandbox.io/p/devbox/react18-hooks-ygy39f?file=%2Fapp%2FuseState%2Fpage.tsx%3A11%2C34)）。

## useReducer

```tsx
const [state, dispatch] = useReducer(reducer, initialArg, init?);
```

`useReducer` 和 `useState` 一样也用来定义状态，不同的是它使用 `reducer` 来更新状态。`reducer` 必须是纯函数，它接收当前状态和动态，返回新的状态值。`initialArg` 为计算初始状态的值，如何计算初始状态由 `init` 决定，`init` 未指定时初始状态为 `initialArg`，否则为 `init(initialArg)`。`useReducer` 返回当前状态以及更新当前状态的 `dispatch` 函数。`dispatch` 函数执行之后当前组件会被调用，是否触发组件重新渲染由状态变化与否决定。

## useContext

```tsx
const value = useContext(SomeContext);
```

`useContext` 接收一个 [Context](./react-context) 对象并返回该 Context 的当前值。

## useEffect

```tsx
useEffect(setup, dependencies?);
```

`useEffect` 用于处理组件中的副作用。默认情况下 setup 函数将在每轮渲染结束（DOM 更新完成）后执行，但你可以添加依赖项让它只在某些状态改变时执行。空依赖时，只在首次渲染结束后执行。setup 函数可以返回一个清除函数。清除函数会在组件卸载前执行。如果 setup 函数被触发多次，在下一次执行开始之前执行上一次执行返回的清除函数。[在 CodeSandbox 中查看例子](https://codesandbox.io/p/devbox/react18-hooks-ygy39f?file=%2Fapp%2FuseEffect%2Fpage.tsx%3A3%2C1)

## useLayoutEffect

```tsx
useLayoutEffect(setup, dependencies?);
```

`useLayoutEffect` 和 `useEffect` 一样用于处理组件中的副作用，区别在于 `useLayoutEffect` 在所有的 DOM 变更之后（DOM 渲染之前）同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。[在 CodeSandbox 中查看例子](https://codesandbox.io/p/devbox/react18-hooks-ygy39f?file=%2Fapp%2FuseLayoutEffect%2Fpage.tsx%3A11%2C1)

## useInsertionEffect

```tsx
useInsertionEffect(setup, dependencies?);
```

`useInsertionEffect` 也是一个副作用 Hook，它专门被用于从 CSS-in-JS 库注入动态样式。它在 DOM 变动之前同步触发，因此不能在 `setup` 函数中获取 refs 或者更新状态。

## useRef

```tsx
const ref = useRef(initialValue);
```

`useRef` 返回一个 ref 对象，其 `.current` 属性的初始值为 initialValue。ref 对象的一个作用是通过 `ref` 属性附加到 React 元素上，[访问 DOM 节点或 React 组件](./react-component#访问)。除此之外，ref 对象还可以用来保存任意值，类似于一个 class 的实例属性。使用 `useRef()` 和创建一个 `{ current: ... }` 对象的区别是，它会在每次渲染时返回同一个 ref 对象，而不是重新创建一个。

## useImperativeHandle

```tsx
useImperativeHandle(ref, createHandle, dependencies?);
```

`useImperativeHandle` 可以在[转发 ref ](./react-component#访问)时自定义暴露给父组件的实例值，要与 `forwradRef` 一起使用。

## useCallback

```tsx
const cachedFn = useCallback(fn, dependencies);
```

`useCallback` 返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 函数。在随后的渲染过程中，如果依赖关系未更改，就返回上一次渲染中已存储的函数。`useCallback` 可以配合 [PureComponent](https://react.dev/reference/react/PureComponent) 或者 [memo](https://react.dev/reference/react/memo) 跳过子组件渲染。当函数要被作为依赖项的时候也可以借助 `useCallback` 实现。编写自定义 Hook 的时候，建议将返回的函数用 `useCallback` 包装起来。

## useMemo

```tsx
const cachedValue = useMemo(calculateValue, dependencies);
```

`useMemo` 可以在重新渲染之间缓存计算结果。在随后的渲染过程中，如果依赖关系未更改，`useMemo` 将返回之前计算的值，否则重新计算并返回新值。`useMemo` 可以跳过昂贵的重新计算。当然 `useMemo` 也可以配合 PureComponent 或者 memo 跳过子组件渲染。当复合类型要被作为依赖项的时候也可以借助 `useMemo` 实现。`useMemo(() => fn, deps)` 相当于 `useCallback(fn, deps)`。

## useTransition

```tsx
const [isPending, startTransition] = useTransition();
```

`useTransition` 可以在不阻塞 UI 的情况下更新状态。它返回一个数组，其中 `isPending` 表示是否存在挂起的转换，`startTransition` 函数用于将状态更新标记为非阻塞转换。它会触发两次渲染：第一次渲染状态不变，第二次渲染状态更新，`isPending` 更新为 false，此时的渲染可以被状态更新中断。[在 CodeSandbox 中查看例子](https://codesandbox.io/p/devbox/react18-hooks-ygy39f?file=%2Fapp%2FuseTransition%2Fpage.tsx%3A26%2C7-26%2C15)

## useDeferredValue

```tsx
const deferredValue = useDeferredValue(value);
```

`useDeferredValue` 接收一个你想要推迟渲染的值，触发两次渲染：第一次渲染返回原值，第二次渲染返回更新后的值，可以配合 `memo` 推迟组件的重新渲染。[在 CodeSandbox 中查看例子](https://codesandbox.io/p/devbox/react18-hooks-ygy39f?file=%2Fapp%2FuseDeferredValue%2Fpage.tsx%3A26%2C16-26%2C35)

## useId

```tsx
const id = useId();
```

`useId` 用于生成一个唯一且稳定的 ID。相比于递增的全局变量 nextId++ 会受渲染顺序的影响，`useId` 能够在组件树相同的情况下确保服务器和客户端生成的 ID 匹配。如果在单个页面上呈现多个独立的 React 应用程序，可以在 createRoot 或 hydrateRoot 调用时配置 identifierPrefix 让 ID 以指定的前缀开头。

## useDebugValue

```tsx
useDebugValue(value, format?)
```

`useDebugValue` 用于 React DevTools 中给自定义 Hook 添加标签。

## useSyncExternalStore

```tsx
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
```

`useSyncExternalStore` 的作用是订阅 React 外的数据。`subscribe` 订阅数据源并返回取消订阅的方法，`getSnapshot` 返回数据快照，`getServerSnapshot` 返回数据源中的初始数据快照，它也可以订阅浏览器的 API。[在 CodeSandbox 中查看例子](https://codesandbox.io/p/devbox/react18-hooks-ygy39f?file=%2Fapp%2FuseSyncExternalStore%2Fpage.tsx%3A13%2C1)
