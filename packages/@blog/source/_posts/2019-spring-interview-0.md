---
title: 从一道春招笔试题说起 [上]
author: Mitscherlich
# cover: https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/The-Android-software-stack.png
date: 2019-04-01 13:30:08
category: Note
tags:
  - 算法
---

<!-- [![](https://badge.juejin.im/entry/5ca1adfdf265da30717fc9ba/likes.svg?style=flat-square)](https://juejin.im/post/5ca1aa55f265da30b62190f6) -->

先来看这样一道题：

> 给定一个字典(对象)，假设其中部分键值是有 '.' 号的字符串，试设计一个 `nested` 函数，使得其变成一个复合对象 (假设不存在重复键值)。

<details><summary>示例：</summary>
<!-- make browser happy :) -->

给定对象：
```js
const obj = {
  'A': 1,
  'B.A': 2,
  'B.B': 3,
  'CC.D.E': 4,
  'CC.D.F': 5
}
```

应得到层级化对象：
```js
const nestedObj = {
  'A': 1,
  'B': {
    'A': 2,
    'B': 3
  },
  'CC': {
    'D': {
      'E': 4,
      'F': 5
    }
  }
}
```
</details>

<!-- more -->

题目其实很简单，考察的也就是基本的 JS 字符串和数组操作，我很快实现了这样一种代码：

```js
// version 1.0
const nested = obj => {
  const res = {}
  for (const key of Object.keys(obj)) {
    if (key.indexOf('.') > -1) {
      const [target, ...newKey] = key.split('.')
      res[target] = nested({ [newKey.join('.')]: obj[key] }) // 递归处理剩余部分
    } else res[key] = obj[key]
  }
  return res
}
```

<details><summary>运行结果：</summary>
<!-- make browser happy :) -->

```js
const obj = { 'A': 1, 'B.A': 2, 'B.B': 3, 'CC.D.E': 4, 'CC.D.F': 5 }

console.log(nested(obj))
// { A: 1, B: { B: 3 }, CC: { D: { F: 5 } } }
```
</details>

运行代码，很快发现了问题：这样直接赋值显然会覆盖掉已将存在的深层对象。这显然是不合理的，于是我使用 `Object.assign` 替代了原来赋值操作：

```diff
// version 1.1
const nested = obj => {
  const res = {}
  for (const key of Object.keys(obj)) {
    if (key.indexOf('.') > -1) {
      const [target, ...newKey] = key.split('.')
-      res[target] = nested({ [newKey.join('.')]: obj[key] }) // 递归处理剩余部分
+      res[target] = Object.assign(
+        res[target] ? res[target] : {},
+        nested({ [newKey.join('.')]: obj[key] }) // 递归处理剩余部分
+      )
    } else res[key] = obj[key]
  }
  return res
}
```

> 注意 `Object.assign` 不能向 `Nil` (也就是 `null` 和 `undefined`) 赋值，所以这里用三目运算符进行了包裹

<details><summary>运行结果：</summary>
<!-- make browser happy :) -->

```js
const obj = { 'A': 1, 'B.A': 2, 'B.B': 3, 'CC.D.E': 4, 'CC.D.F': 5 }

console.log(nested(obj))
// { A: 1, B: { B: 3 }, CC: { D: { F: 5 } } }
```
</details>

运行代码，问题依然存在。

查阅 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)，`Object.assign` 确实可以用于合并对象，而且浅层对象(≤2)的合并也都没有问题。

这使我想到了 `lodash` 提供的 [`merge`](https://lodash.com/docs/#merge) 方法，先拿来主义一下：

```diff
// version 1.2
+ const { merge } = require('lodash')

const nested = obj => {
  const res = {}
  for (const key of Object.keys(obj)) {
    if (key.indexOf('.') > -1) {
      const [target, ...newKey] = key.split('.')
-      res[target] = Object.assign(
+      res[target] = merge(
+        res[target] ? res[target] : {},
+        nested({ [newKey.join('.')]: obj[key] }) // 递归处理剩余部分
+      )
    } else res[key] = obj[key]
  }
  return res
}
```

<details><summary>运行结果：</summary>
<!-- make browser happy :) -->

```js
const obj = { 'A': 1, 'B.A': 2, 'B.B': 3, 'CC.D.E': 4, 'CC.D.F': 5 }

console.log(nested(obj))
// { A: 1, B: { A: 2, B: 3 }, CC: { D: { E: 4, F: 5 } } }
```
</details>

运行代码，成功！正确返回了预期的结果，可这是为什么呢？

继续查阅 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)，浏览到 [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill) 一节，这里是为了使不能原生支持 `assign` 的浏览器用上这个函数，大体上可以看作 `assign` 的源代码。可以看到，其实 `assign` 操作也只进行了一层遍历，并没有递归的处理 `value` 类行为 `object` 的值，使得深度 ≥ 1 的对象依然被覆盖；重新浏览文档，在[深拷贝问题](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone)一节也确实提到了对象的覆盖问题，例如：

```js
const obj1 = { A: 1, B: { C: 2 } }
const obj1 = { A: 2, B: { D: 3 } }

console.log(Object.assign({}, obj1, obj2)) // ==> { A: 2, B: { D: 3 } }
                                           // B.C 丢失了，因为前一个对象中的 { B: [Object] } 被后续的对象中的 { B: [Object] } 覆盖了
```

到 [Github](https://github.com/lodash/lodash) 翻阅 `lodash.merge` 的源码，`lodash` 的 `merge` 操作是通过不断递归深拷贝来实现对象合并的，这样就不存在覆盖问题，例如：

```js
const obj1 = { A: 1, B: { C: 2 } }
const obj1 = { A: 2, B: { D: 3 } }

console.log(Object.assign({}, obj1, obj2)) // ==> { A: 2, B: { C: 2, D: 3 } }
                                           // B.C 被正确合并了
```

基于这个思路，我简单实现了一个 `merge` 函数，修改原代码如下：

```diff
// version 2.0
- const { merge } = require('lodash')

+ const baseMerge = (target, from) => {
+   const [newTarget, ...newFrom] = from
+   if (newFrom.length > 1) {
+     return baseMerge(target, [baseMerge(newTarget, newFrom)])
+   } else {
+     const keys = Object.keys(newTarget)
+     for (const key of keys) {
+       if (target.hasOwnProperty(key)) {
+         if (typeof target[key] === 'object') {
+           baseMerge(target[key], [newTarget[key]])
+         } else {
+           target[key] = newTarget[key]
+         }
+       } else target[key] = newTarget[key]
+     }
+     return target
+   }
+ }

+ const merge = (target, ...from) => baseMerge(target, Array.from(from))

const nested = obj => {
  const res = {}
  for (const key of Object.keys(obj)) {
    if (key.indexOf('.') > -1) {
      const [target, ...newKey] = key.split('.')
      res[target] = merge(
        res[target] ? res[target] : {},
        nested({ [newKey.join('.')]: obj[key] }) // 递归处理剩余部分
      )
    } else res[key] = obj[key]
  }
  return res
}
```

<details><summary>运行结果：</summary>
<!-- make browser happy :) -->

```js
const obj = { 'A': 1, 'B.A': 2, 'B.B': 3, 'CC.D.E': 4, 'CC.D.F': 5 }

console.log(nested(obj))
// { A: 1, B: { A: 2, B: 3 }, CC: { D: { E: 4, F: 5 } } } // 成功！
```
</details>

当然，这个 `merge` 函数与 `lodash` 实现的相比显然是不完善的，但根据题设，这里指存在对象和基本类型，所以这种简易实现应该也够用了。以上便是我对这道题的完整解题思路，如有任何问题或者好的建议，还请大家不吝指正。

## 参考链接

- [Object.assign() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [Lodash Documentation](https://lodash.com/docs/4.17.11#merge)
