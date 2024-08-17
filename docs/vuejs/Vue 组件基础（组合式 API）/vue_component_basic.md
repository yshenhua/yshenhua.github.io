# Vue 组件基础（组合式 API）

## 定义

以一个包含 Vue 特定选项的 JavaScript 对象来定义：

```js
import { ref } from 'vue';

export default {
  setup() {
    const msg = ref('123');
    return { msg };
  },
  template: `<h1>{{ msg }}</h1>`,
};
```

当使用构建步骤时，可以将 Vue 组件定义在一个单独的 `.vue` 文件中，这被叫做[单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc.html) (简称 SFC)：

```vue
<script setup>
import { ref } from 'vue';

const msg = ref('Hello MyComponent');
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

## 使用

调用 `createApp()` 函数，传入组件作为参数，这里组件叫做根组件：

```js
import { createApp } from 'vue';

const app = createApp(MyComponent); // 创建应用实例
app.mount('#app'); // 挂载应用
```

组件可以在其 `template` 中引用其他组件。大多数真实的应用都是由一棵嵌套的、可重用的组件树组成的。在没有使用 `<script setup>` 的组件中，使用组件需要先被注册：

```js
import MyComponent from './MyComponent.js';

export default {
  // components 对象用于注册对当前组件实例可用的组件
  components: {
    MyComponent,
  },
  setup() {
    // ...
  },
  template: `<MyComponent />`,
};
```

在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
<script setup>
import MyComponent from './MyComponent.vue';
</script>

<template>
  <MyComponent />
</template>
```

另外也可以使用 Vue 应用实例的 [`component()`](https://cn.vuejs.org/api/application.html#app-component) 方法，让组件在当前 Vue 应用中全局可用。全局注册不需要在使用它的父组件中显示导入，但这也使组件之间的依赖关系变得不那么明确，并且对 tree-shaking 很不友好。

## Props

向组件中传递数据可以通过组件的 props。一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是[透传 attributes](https://cn.vuejs.org/guide/components/attrs.html#fallthrough-attributes)。

```js
export default {
  props: { msg: String },
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.msg);
  },
  template: `<h1>{{msg}}</h1>`,
};
```

在使用 `<script setup>` 的单文件组件中，props 可以使用 [`defineProps()`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明：

```vue
<script setup>
const props = defineProps({ msg: String });

console.log(props.msg);
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

传递 props 就是给组件添加对应的特性，想要动态绑定 props 使用 [v-bind 指令](https://cn.vuejs.org/api/built-in-directives.html#v-bind)即可：

```vue
<!-- 传入字符串值 -->
<MyComponent msg="Hello MyComponent" />

<!-- 根据一个变量的值动态传入 -->
<MyComponent :msg="response.message" />
```

另外，传递 prop 时还有一些细节：

- 为了和 HTML attribute 对齐，我们通常会将其写为 kebab-case 形式（定义时应使用 camelCase 形式）；
- 仅写上 prop 但不传值，会隐式转换为 `true`；
- 使用没有参数的 v-bind 可以将一个对象的所有属性都当作 props 传入。

## 事件处理

Vue 使用 [v-on 指令](https://cn.vuejs.org/api/built-in-directives.html#v-on)（简写为 @）来监听事件，并在事件触发时执行对应的事件处理器。当用于 DOM 元素时监听[原生 DOM 事件](https://developer.mozilla.org/en-US/docs/Web/Events)，当用于组件则监听组件抛出的事件：

```vue
<script setup>
const handleClick = () => {
  alert('Click MyComponent');
};
</script>

<template>
  <MyComponent @click="handleClick" />
</template>
```

我们可以通过 `emits` 选项定义组件会抛出的事件，从 `setup()` 函数的第二个参数，即 setup 上下文对象上可以访问到 `emit` 函数：

```js
export default {
  emits: ['click'], // 定义组件会抛出的事件
  setup(props, ctx) {
    const handleClick = (event) => {
      ctx.emit('click', event); // 抛出 click 事件
    };
    return { handleClick };
  },
  template: `<button @click="handleClick">Click</button>`,
};
```

在使用 `<script setup>` 的单文件组件中，可以通过 [`defineEmits()`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明需要抛出的事件：

```vue
<script setup>
const emit = defineEmits(['click']); // 声明组件可能触发的所有事件

const handleClick = (event) => {
  emit('click', event); // 抛出 click 事件
};
</script>

<template>
  <button @click="handleClick">Click</button>
</template>
```

## 响应式状态

在组合式 API 中，推荐使用 `ref()` 函数来声明响应式状态。`ref()` 接收参数，并将其包裹在一个响应式的 ref 对象中返回。当 ref 被修改时，会触发追踪它的组件进行重新渲染。

```vue
<script setup>
import { ref } from 'vue';

const time = ref();
const updateTime = () => {
  time.value = new Date().toLocaleTimeString(); // 修改 ref 对象
  return updateTime;
};
setInterval(updateTime(), 1000);
</script>

<template>
  <!-- 在模板中使用顶级的 ref 时会自动解包，不需要附加 .value -->
  <span>{{ time }}</span>
</template>
```

关于其他响应式 API，详见[官方文档](https://cn.vuejs.org/api/reactivity-core.html)。

## 双向绑定

双向绑定是指当数据（响应式状态）发生变化时对应的 DOM 元素也会相应地更新，反之操作 DOM 元素（如输入文本）时对应的数据也会被更新。Vue 使用 [v-model 指令](https://cn.vuejs.org/api/built-in-directives#v-model)在表单输入元素或组件上创建双向绑定：

```vue
<script setup>
import { ref } from 'vue';

const text = ref();
const onSubmit = () => alert(`text is ${text.value}`);
</script>

<template>
  <input v-model="text" />
  <button @click="onSubmit">Submit</button>
</template>
```

其本质上是 v-bind 和 v-on 的语法糖：

```vue
<script setup>
import { ref } from 'vue';

const text = ref();
const onSubmit = () => alert(`text is ${text.value}`);
</script>

<template>
  <input :value="text" @input="(event) => (text = event.target.value)" />
  <button @click="onSubmit">Submit</button>
</template>
```

v-model 会根据所使用的元素自动使用对应的 DOM 属性和事件组合：

- `<input>` 和 `<textarea>` 会绑定 value 属性并侦听 input 事件；
- `<input type="checkbox">` 和 `<input type="radio">` 会绑定 checked 属性并侦听 change 事件；
- `<select>` 会绑定 value 属性并侦听 change 事件。

除了这些元素，我们还可以创建支持双向绑定的组件。从 Vue 3.4 开始，推荐的实现方式是使用 [`defineModel()`](https://cn.vuejs.org/api/sfc-script-setup#definemodel) 宏。`defineModel()` 返回的值是一个 ref。它可以像其他 ref 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：

```vue
<script setup>
const model = defineModel();
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="model++">Increment</button>
</template>
```

## 模板引用

元素的 `ref` 特性用于注册元素或子组件的引用，引用可以存储在 ref 对象里：

```vue
<script setup>
import { ref } from 'vue';

const input = ref(null);
const onSubmit = () => console.log(input.value); // input 元素
</script>

<template>
  <input ref="input" />
  <button @click="onSubmit">Submit</button>
</template>
```

## 插槽

一些情况下我们会希望能和 HTML 元素一样向组件传递模板内容，比如：

```vue
<MyComponent><span class="icon">√</span>PASS</MyComponent>
```

这可以通过 Vue 组件的插槽来实现，将 `<slot>` 作为一个占位符放到 `<MyComponent>` 的模板中，父组件传递进来的内容会渲染在这里：

```vue
<button><slot /></button>
```

最终渲染出的 DOM 会是这样：

```html
<button><span class="icon">√</span>PASS</button>
```

在 `<slot>` 标签之间的内容会作为默认内容，父组件没有提供插槽内容时会渲染默认内容。

`<slot>` 元素上的特殊特性 `name` 可以给插槽分配一个唯一的 ID，这样的插槽被称为具名插槽。组件可以定义多个具名插槽。为具名插槽传入内容，需要使用一个含 [v-slot 指令](https://cn.vuejs.org/api/built-in-directives.html#v-slot)（简写为 #）的 `<template>` 元素包裹内容，比如：

```vue
<MyComponent>
  <template #icon> <!-- #icon 是 v-slot:icon 的简写 -->
    <!-- 名为 icon 的插槽内容 -->
  </template>
  <template #label>
    <!-- 名为 label 的插槽内容 -->
  </template>
</MyComponent>
```

`<slot>` 元素上的其他特性会作为插槽内容的 props，通过 v-slot 的绑定值接收。

## 动态组件

Vue 的 `<component>` 元素用于渲染动态组件或元素：

```vue
<script setup>
import { getDirectoryDetail } from 'src/api';
import Loading from './Loading.vue';
import LocalList from './LocalList.vue';
import RemoteList from './RemoteList.vue';

const props = defineProps(['id']);
const detail = ref();
getDirectoryDetail(props.id).then((data) => {
  detail.value = data;
});
</script>

<template>
  <component :is="detail ? (detail.isLocal ? LocalList : RemoteList) : Loading" />
</template>
```

被传给 `is` 的值可以是 HTML 标签名、被注册的组件名或者导入的组件对象。当动态组件切换时，被切换掉的组件会被卸载，其效果和 [v-if 指令](https://cn.vuejs.org/guide/essentials/conditional#v-if)相同。
