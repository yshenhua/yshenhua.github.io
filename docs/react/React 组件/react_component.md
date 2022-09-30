# React 组件

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

## 创建

React 的组件可以定义为 class 或函数的形式。使用 ES6 的 class 来定义组件：

```tsx:no-line-numbers
import { Component } from 'react';

class MyComponent extends Component {
  render() {
    return <h1>Hello MyComponent</h1>;
  }
}
```

定义组件最简单的方式就是编写 JavaScript 函数，使用函数定义一个等效的组件：

```tsx:no-line-numbers
function MyComponent() {
  return <h1>Hello MyComponent</h1>;
}
```

注意：组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。

## 渲染

以 React DOM 为例，调用 `root.render()` 函数，传入组件作为参数：

```tsx:no-line-numbers
import * as ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<MyComponent />);
```

组件可以在其输出中引用其他组件。通常来说，一个 React 应用程序只需要让顶层组件执行一次 `root.render()` 即可。

## Props

当 React 看到表示组件的元素时，它会将 JSX 属性作为一个对象传递给该组件。我们称这个对象为 props。简而言之，props 就是用于接收组件外部的数据的一个对象。

### 传递

传递数据就是给 React 元素添加属性。在 JSX 中，元素属性的值是一个包裹在 `{}` 中的表达式。其中有一些简便的写法：

#### 字符串字面量

如果属性值是一个字符串字面量可以直接赋值给元素属性，例如：

```tsx:no-line-numbers
<MyComponent message="hello world" />
// 等价于
<MyComponent message={'hello world'} />
```

需要注意的是此时的值是未转义的。例如你想传递字符串 `<` 时，应该写成 `&lt;`。

#### 属性值 true 省略

如果你没给元素属性赋值，它的默认值是 `true`。（React 官方不建议省略属性值。这样实现只是为了保持和 HTML 中标签属性的行为一致。）

#### 属性展开

如果你已经有了一个 props 对象，你可以使用展开运算符 `...` 在 JSX 中传递整个 props 对象，例如：

```tsx:no-line-numbers
const myComponentProps = {
  name: '二狗',
  age: 2,
  breed: 'collie',
};
<MyComponent {...myComponentProps} />
// 等价于
<MyComponent name="二狗" age={2} breed="collie" />
```

#### 子元素

子元素将作为特定属性 `props.children` 传递给组件，例如：

```tsx:no-line-numbers
<MyComponent>名称：<h4>二狗</h4></MyComponent>
// 等价于
<MyComponent children={['名称：', <h4>二狗</h4>]} />
```

### 接收

类组件使用父类 `Component` 中的 `props` 属性接收数据：

```tsx:no-line-numbers
import { Component } from 'react';

class MyComponent extends Component {
  render() {
    const { message } = this.props;
    return <h1>{message}</h1>;
  }
}
```

函数组件使用函数形参接收数据：

```tsx:no-line-numbers
function MyComponent(props) {
  const { message } = props;
  return <h1>{message}</h1>;
}
```

为了保证了数据的可控性，所有 React 组件都必须像[纯函数](https://en.wikipedia.org/wiki/Pure_function)一样保护它们的 props 不被更改。（React 本身对 props 对象进行了冻结，但无法保证对象内部的引用类型被修改。）

### 类型检查

React 推荐使用 [Flow](https://flow.org/) 或 [TypeScript](https://www.typescriptlang.org/) 等 JavaScript 扩展来对整个应用程序做类型检查。如果你不使用这些扩展，也可以使用 React 提供的 [prop-types 库](https://www.npmjs.com/package/prop-types)对组件的 props 进行类型检查：

```tsx:no-line-numbers
import PropTypes from 'prop-types';

// 定义组件：
...

// 限制 props 的类型：
MyComponent.propTypes = {
  message: PropTypes.string,
};

// 指定 props 的默认值：
MyComponent.defaultProps = {
  message: 'Hello MyComponent',
};
```

### Render Props

Render Props 是一种在 React 中用于复用组件逻辑的技巧，实现方法为——在组件中实现复用的状态逻辑代码，然后将一个返回 React 元素的函数当作组件的 prop 值传入，在组件内部通过调用此函数来实现需要的渲染。例如：

```tsx:no-line-numbers
import type { ReactElement } from 'react';
import { Component } from 'react';

interface MouseProps {
  render: (mouse: MouseState) => ReactElement;
}
interface MouseState {
  x: number;
  y: number;
}
class Mouse extends Component<MouseProps, MouseState> {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MyComponent extends Component {
  render() {
    return (
      <Mouse
        render={(mouse) => (
          <>
            <h1>移动鼠标!</h1>
            <p>
              当前的鼠标位置是 ({mouse.x}, {mouse.y})
            </p>
          </>
        )}
      />
    );
  }
}
```

例中 `<Mouse>` 组件封装了监听 `mousemove` 事件和存储鼠标 (x, y) 位置的行为，并且可以通过 `render` 方法 让 `<Mouse>` 能够动态决定什么需要渲染。

Render Props 也可以和 `props.children` 结合使用。

## State

State 与 props 类似，都是一个用来保存信息的对象，这个对象可以控制组件的渲染输出。但是 state 是私有的，是在组件内被组件自己管理的。当 state 改变了，该组件（包括其后代组件）就会重新渲染。类组件使用父类 `Component` 中定义的 `state` 属性（默认值为 `null`）和 `setState()` 方法来初始化和更新组件状态：

```tsx:no-line-numbers
import { Component } from 'react';

class MyComponent extends Component {
  constructor() {
    super();

    this.state = { count: 1 };

    setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  render() {
    const { count } = this.state;
    return <h1>count: {count}</h1>;
  }
}
```

`setState()` 的第一个参数接受一个 updater 函数 `(state, props) => stateChange` 或对象 `stateChange`，之后 `stateChange` 会浅层合并到新的 state 中。updater 函数中的 state 和 props 都是最新，不会被异步机制（在事件处理函数内部的 `setState` 是异步的）或闭包等因素影响。如果后续状态取决于当前状态，建议使用函数形式的参数。

函数组件本身没有 state，你需要通过在函数组件里调用 State Hook 来给它添加 state，例如：

```tsx:no-line-numbers
import { useMemo, useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(1);

  useMemo(() => {
    setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);

  return <h1>count: {count}</h1>;
}
```

## 事件处理

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件处理器使用 camelCase（小驼峰式命名）而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
- 不能通过返回 `false` 的方式阻止默认行为，只能显式地使用 `preventDefault`。

```tsx:no-line-numbers
import { Component } from 'react';

class MyComponent extends Component<{}, { n: number }> {
  state = { n: 0 };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { n } = this.state;
    this.setState({ n: n + 1 });
  };

  render() {
    const { n } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <p>提交了{n}次</p>
        <button type="submit">提交</button>
      </form>
    );
  }
}
```

在 JavaScript 中，class 的方法默认不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)this。上例用了 [Public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) 语法，将事件处理函数的实现通过箭头函数赋值，从而正确绑定 this，这等价于：

```tsx:no-line-numbers
constructor() {
  super();

  ...

  this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const { n } = this.state;
  this.setState({ n: n + 1 });
}
```

当然你也可以在回调中使用箭头函数，但每次渲染组件时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。比如[这个例子](https://stackblitz.com/edit/react-ts-k52q9l?file=src%2FApp.tsx)中使用 `React.PureComponent` 的组件会因该回调函数的影响而无法达到预期效果。所以建议尽量不要使用该方式以防出现性能问题。前面 [Render Props](#render-props) 的例子也存在这个问题。

### 向事件处理程序传递参数

通过箭头函数或 Function.prototype.bind 来实现：

```tsx:no-line-numbers
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// 等价于
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

当然你也可以直接定义一个[高阶函数](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function#returning_a_function)：

```tsx:no-line-numbers
deleteRow = (id) => (e) => { };

...

<button onClick={this.deleteRow(id)}>Delete Row</button>
```

因为这些方式其实是等价的，所以都存在“每次渲染组件时都会创建不同的回调函数”的问题。

## Refs

Refs 是 React 提供的一种访问 DOM 节点或 React 组件的方式。官方给出了几个应用场景：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

### 创建

Refs 使用 `createRef()` 创建，通过 `ref` 属性附加到 React 元素上。

```tsx:no-line-numbers
import { Component, createRef } from 'react';

class MyComponent extends Component {
  myRef = createRef();

  render() {
    return <h1 ref={this.myRef}>Hello MyRef</h1>;
  }
}
```

在 `createRef()` 出现之前，React 还提供了两种管理 refs 的方式：[字符串类型的 refs](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs) 和[回调 refs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)。

在函数组件内部，可以通过 [useRef](https://reactjs.org/docs/hooks-reference.html#useref) 来创建 Refs，这样的 ref 对象在组件的整个生命周期内保持不变。

```tsx:no-line-numbers
import { useRef } from 'react';

function MyComponent() {
  const myRef = useRef(null);

  return <h1 ref={myRef}>Hello MyRef</h1>;
}
```

### 访问

当 ref 对象被传递给 `render` 中的元素时，对该节点的引用可以在 ref 对象的 `current` 属性中被访问。根据节点类型的不同，`current` 属性的值有所不同：

- 当节点是 HTML 元素时，该值是底层 DOM 元素；
- 当节点是类组件时，该值是组件的挂载实例；
- 当节点是函数组件时，无法直接在上面使用 ref 属性，不过可以借助 [forwardRef](https://reactjs.org/docs/react-api.html#reactforwardref) 将其接受的 ref 属性转发到其组件树下的另一个组件中。forwradRef 也可与 [useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle) 结合使用，自定义暴露给父组件的实例值，[在 StackBlitz 中查看例子](https://stackblitz.com/edit/react-ts-ru4fyk?file=src%2FApp.tsx)。

React 会在组件挂载时给 `current` 属性传入对应的值，并在组件卸载时传入 `null` 值。ref 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。

## 生命周期

类组件包含生命周期方法，你可以重写这些方法，以便于在运行过程中特定的阶段执行这些方法。根据[生命周期图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)，整个过程分为挂载、更新、卸载三个阶段。

### 挂载

挂载阶段组件实例被创建并插入 DOM 中，这个过程中 React 会依次调用 [`constructor()`](https://reactjs.org/docs/react-component.html#constructor)、[`static getDerivedStateFromProps()`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)、[`render()`](https://reactjs.org/docs/react-component.html#render)、[`componentDidMount()`](https://reactjs.org/docs/react-component.html#componentdidmount)。如果该组件存在子组件，执行 `render()` 之后会开始挂载子组件，待子组件挂载完成之后触发 `componentDidMount()` 的调用，例如：

```tsx:no-line-numbers
import { Component } from 'react';

class MyChildComponent extends Component {
  state = {};

  constructor(props) {
    console.log('child constructor');
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('child getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('child componentDidMount');
  }

  render() {
    console.log('child render');
    return <span>个</span>;
  }
}

class MyComponent extends Component {
  state = { count: 0 };

  constructor(props) {
    console.log('constructor');
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    console.log('render');
    const { count } = this.state;
    return (
      <>
        <span>{count}</span>
        <MyChildComponent />
      </>
    );
  }
}
```

输出结果为：

```bash:no-line-numbers
constructor
getDerivedStateFromProps
render
child constructor
child getDerivedStateFromProps
child render
child componentDidMount
componentDidMount
```

`getDerivedStateFromProps` 的存在只有一个目的：让组件在 props 变化时更新 state，比如[根据 props 变化得出当前滚动方向](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)和[根据 props 变化加载外部数据](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data-when-props-change)。

### 更新

当组件的 props 或 state 发生变化时会触发更新。更新阶段的生命周期调用顺序为：[`static getDerivedStateFromProps()`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)、[`shouldComponentUpdate()`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)、[`render()`](https://reactjs.org/docs/react-component.html#render)、[`getSnapshotBeforeUpdate()`](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)、[`componentDidUpdate()`](https://reactjs.org/docs/react-component.html#componentdidupdate)。如果该组件存在子组件，执行 `render()` 之后会开始更新子组件，待子组件的 `render()` 执行之后，依次触发子组件和父组件的 `getSnapshotBeforeUpdate()`，之后再依次触发子组件和父组件的 `componentDidUpdate()`，例如：

```tsx:no-line-numbers
import { Component } from 'react';

class MyChildComponent extends Component {
  state = {};

  static getDerivedStateFromProps(props, state) {
    console.log('child getDerivedStateFromProps');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('child shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('child getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('child componentDidUpdate');
  }

  render() {
    console.log('child render');
    return <span>个</span>;
  }
}

class MyComponent extends Component<{}, { count: number }> {
  state = { count: 0 };

  updateState = () => {
    console.log('########## Update State ##########');
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
  }

  render() {
    console.log('render');
    const { count } = this.state;
    return (
      <div>
        <span>{count}</span>
        <MyChildComponent />
        <button onClick={this.updateState}>Update State</button>
      </div>
    );
  }
}
```

点击 Update State 按钮后的输出结果为：

```bash:no-line-numbers
getDerivedStateFromProps
shouldComponentUpdate
render
child getDerivedStateFromProps
child shouldComponentUpdate
child render
child getSnapshotBeforeUpdate
getSnapshotBeforeUpdate
child componentDidUpdate
componentDidUpdate
```

`shouldComponentUpdate()` 的返回值用来判断是否重新渲染组件，默认为 `true`。首次渲染或使用 [`forceUpdate()`](https://reactjs.org/docs/react-component.html#forceupdate) 时不会调用该方法。

`getSnapshotBeforeUpdate()` 能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。它的返回值将作为参数传递给 `componentDidUpdate()`。

调用 `forceUpdate()` 强制让组件重新渲染，会跳过该组件的 `shouldComponentUpdate()`（不影响后代组件）。在 `componentDidUpdate()` 之后会调用 `forceUpdate()` 的回调函数。

### 卸载

卸载阶段组件从 DOM 中移除，会调用 [`componentWillUnmount() `](https://reactjs.org/docs/react-component.html#componentwillunmount)。

### 函数组件的生命周期

函数组件没有生命周期方法，但可以通过 [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) 等 [Hooks](https://reactjs.org/docs/hooks-intro.html) 去模拟生命周期。

## 错误边界

错误边界是一种 React 组件，这种组件可以捕获后代组件的错误（整个子组件树的渲染期间、生命周期方法以及构造函数中的错误），并根据需要打印错误、展示降级 UI，而不是渲染那些发生崩溃的子组件。

如果一个类组件中定义了 [`static getDerivedStateFromError()`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror) 或 [`componentDidCatch()`](https://reactjs.org/docs/react-component.html#componentdidcatch) 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 `static getDerivedStateFromError()` 渲染备用 UI，使用 `componentDidCatch()` 打印错误信息。[在 CodeSandbox 中查看例子](https://codesandbox.io/s/react18-error-boundaries-72vj9e?file=/src/ErrorBoundary.tsx)

## 高阶组件

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。从语法上讲，高阶组件是一个函数。函数内部返回一个新的组件，该组件提供复用的状态逻辑代码。被包装组件作为函数参数传入，通过 props 接收复用的状态。将前面带有 render prop 的 `<Mouse>` 组件的功能用 withMouse HOC 来实现：

```tsx:no-line-numbers
interface WithMouseState {
  x: number;
  y: number;
}

interface WithMouseHOCProps {
  mouse: WithMouseState;
}

function withMouse(WrappedComponent: JSXElementConstructor<WithMouseHOCProps>) {
  class WithMouse extends Component<{}, WithMouseState> {
    static displayName = `WithMouse(${WrappedComponent.name})`;

    state = { x: 0, y: 0 };

    handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    };

    render() {
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
          <WrappedComponent {...this.props} mouse={this.state} />
        </div>
      );
    }
  }

  return WithMouse;
}

function MyComponent({ mouse }: WithMouseHOCProps) {
  return (
    <>
      <h1>移动鼠标!</h1>
      <p>
        当前的鼠标位置是 ({mouse.x}, {mouse.y})
      </p>
    </>
  );
}

// 现在使用 withMouse(MyComponent) 就可以实现预期效果
```

编写 HOC 时应该遵循以下约定：

- HOC 应该透传与自身无关的 props，参考上例。
- 最大化可组合性，参考 Redux 的 [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect) 函数。
- 包装显示名称以便轻松调试，设置类组件的 `static displayName` 属性，参考上例。

注意事项：

- 不要在 render 方法中使用 HOC，不然会导致每次渲染子组件都会进行卸载然后重新挂载。这不仅仅是性能问题，重新挂载组件会导致该组件及其所有子组件的状态丢失。
- 务必复制静态方法，可以使用 [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) 自动拷贝所有非 React 静态方法。另一个可行的方案是直接将需要的静态方法导出。
- Refs 不会被传递，不过可以[借助 forwardRef 来进行 Refs 转发](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)。
