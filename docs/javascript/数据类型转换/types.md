# 数据类型转换

## 数据类型

最新的 ECMAScript 标准定义了 8 种数据类型：

- 七种原始数据类型:
  - Boolean
  - Number
  - BigInt
  - String
  - Symbol
  - undefined
  - null
- 以及对象（Object）

## typeof operand 的返回值

- typeof null，返回 'object'，typeof 其他原始数据类型，返回对应的类型。
- typeof Function 对象，返回 'function'，typeof 其他对象，返回 'object'。

## 类型转换

### 显式类型转换

- Boolean 函数  
  0、-0、NaN、0n、''、undefined、null 转为 false，其他转为 true。
- Number 函数
  - Number(原始数据类型)
    - Boolean：true 转为 1，false 转为 0。
    - BigInt：转为数值，可能会丢失精度。
    - String：如果可以被解析为数值则转换为相应的数值，否则得到 NaN。空字符串转为 0。
    - Symbol：报错，TypeError。
    - undefined：转为 NaN。
    - null：转为 0。
  - Number(对象)  
    调用对象的 Symbol.toPrimitive 方法，参数为 'number'。此时先调用对象自身的 valueOf 方法，如果返回值为原始类型，对该值使用 Number 方法获得转换结果，如果返回值为对象，再调用对象自身的 toString 方法，如果返回值为原始类型，对该值使用 Number 方法获得转换结果，否则报错。
- BigInt 函数
  - BigInt(原始数据类型)  
    除了布尔值、整数、可以被解析为大整数的字符串，其他值无法转为大整数。
  - BigInt(对象)  
    转换逻辑与 Number(对象) 类似。
- String 函数
  - String(原始数据类型)  
    转为相应的字符串（大整数转为字符串后不带 n）。
  - String(对象)  
    调用对象的 Symbol.toPrimitive 方法，参数为 'string'。此时先调用对象自身的 toString 方法，如果返回值为原始类型，对该值使用 String 方法获得转换结果，如果返回值为对象，再调用对象自身的 valueOf 方法，如果返回值为原始类型，对该值使用 String 方法获得转换结果，否则报错。
- Symbol 函数  
  Symbol(undefined) 转为 Symbol()，其他值先转为字符串，再转为相应的符号。

### 隐式类型转换

- 运算
  - 逻辑运算、条件（三元）运算：左操作数将转为布尔值。
  - 算术运算、位运算：操作数将转为数值。
  - 字符串运算：操作数将转为字符串。
  - 比较运算
    - ==、!=：转换逻辑与加号类似，详见下面对加号的解释。
    - &gt;、&gt;=、&lt;、&lt;=：操作数将转为数值。
  - in：左操作数非符号类型时，将转为字符串。
- 条件判断语句  
  条件表达式的结果将转为布尔值。
- 某些内置方法  
  比如 `alert()`、`parseFloat()` 要求参数是字符串，如果不是会将其转换为字符串。

#### 如何区分加号做字符串运算还是做算术运算？

操作数都是原始类型的情况下，如果有操作数是字符串就做字符串运算，否则就做算术运算。当操作数中存在对象时，调用对象的 Symbol.toPrimitive 方法，参数为 'defalut'。此时先调用对象自身的 valueOf 方法，如果返回值为原始类型就用该值进行运算，如果返回值为对象，再调用对象自身的 toString 方法，如果返回值为原始类型就用该值进行运算，否则报错，TypeError。
