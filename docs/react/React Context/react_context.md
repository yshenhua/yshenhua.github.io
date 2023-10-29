# React Context

## Context 的作用

Context 允许父组件向其后代组件传递数据，而无需显式地通过 props 层层传递。

## 如何使用

### 创建

```tsx
const SomeContext = createContext(defaultValue);
```

### 提供数据

通过 `SomeContext.Provider` 来指定其后代组件的 SomeContext 值。

### 获取数据

1. 通过 `SomeContext.Consumer` 获取（Render Props 模式）；
2. 在类组件中使用 `static contextType` 来获取；
3. 在函数组件中调用 `useContext(SomeContext)` 来获取。

注：获取到的值为最近的 `SomeContext.Provider` 提供的数据，如果外层没有 `SomeContext.Provider` 则为创建 Context 时传入的 `defaultValue`。

## 减少使用 Context 导致的不必要渲染

1. 拆分 Context，组件只订阅需要使用的 Context；
2. 使用 `useMemo` 包裹组件的返回值，需要使用的数据作为依赖项；
3. [Context Selectors](https://github.com/reactjs/rfcs/pull/119)，这是 React 团队在 RFC 中的一个方案。开发者可以从 Context 中选择要使用的数据，组件重新渲染由该数据变化触发。社区上已经有了一些具体代码实现，比如 [use-context-selector](https://github.com/dai-shi/use-context-selector)。
