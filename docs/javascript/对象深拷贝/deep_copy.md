# 对象深拷贝

如果对象可以序列化，可以使用 [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 将对象转换为 JSON 字符串，然后使用 [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 将字符串转换回（新的）对象。

```js:no-line-numbers
const newObj = JSON.parse(JSON.stringify(obj));
```

许多 JavaScript 对象无法序列化，例如函数、符号、集合、Element 对象等，这个时候只能根据对应的类型重新创建数据。下面的 deepClone 方法实现了几种数据类型的深拷贝：

```js:no-line-numbers
function deepClone(value) {
  // 如果是基本数据类型，直接返回值（这里不对 symbol 和 function 做深拷贝，所以不排除）
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  // 获取对象类型
  const [, type] = /^\[object ([a-zA-Z]+)\]$/.exec(
    Object.prototype.toString.call(value)
  );

  // Date、RegExp
  if (type === 'Date' || type === 'RegExp') {
    return new value.constructor(value);
  }

  const result = new value.constructor();
  // Set
  if (type === 'Set') {
    for (const item of value) {
      result.add(deepClone(item));
    }
  }
  // Map
  else if (type === 'Map') {
    for (const [key, item] of value) {
      result.set(deepClone(key), deepClone(item));
    }
  }
  // Array、Object
  else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = deepClone(value[key]);
      }
    }
  }
  return result;
}
```

你可以根据实际需求增加对应的数据类型，比如：函数、符号、[类型化数组](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)等。另外，如果要深拷贝循环引用的对象，可以利用 [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 缓存处理过的对象：

```js:no-line-numbers
function deepClone(value) {
  ...
  // 如果缓存里有这个对象直接返回结果
  if (deepClone.cached.has(value)) {
    return deepClone.cached.get(value);
  }
  ...
  deepClone.cached.set(value, result);
  ...
}
deepClone.cached = new WeakMap();
```

[在 StackBlitz 中查看完整代码](https://stackblitz.com/edit/web-platform-bqr9z1?file=script.js)
