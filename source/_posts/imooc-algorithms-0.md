---
title: 【慕课】重学算法 - part.1 排序基础
author: Mitscherlich
date: 2018-10-02 12:24:28
categories: essay
tags:
  - 算法
  - JavaScript
---

> 这系列文章是慕课网《算法与数据结构》实战课程老师的讲授内容笔记整理，其中有很多动图都是我参考老师的动画演示自己制作的 ~~(他做的太水了)~~，并提供 JS(es6) 版的代码示例。代码仓库：📦 https://github.com/Mitscherlich/Play-with-Algorithms-JS

近来无事，感觉本科的算法与数据结构这门课学得一塌糊涂，于是翻出慕课上的这门《算法与数据解构》课程，打算重学一遍算法，权当是复习了。

### 为什么要学习 $O(n^2)$ 的排序算法

基础的排序算法像：选择排序、插入排序、冒泡排序、希尔排序 (Shell Sort) 等，在某些特定的场合下 (例如：有大量重复键值或排序完全有序的数据) 会极度的不实用，即退化为 $O(n^2)$ 级别的排序算法，这在处理海量数据时极度不可接受，算法运行的时间将远远超出用户等待的预期。那么为什么还要学习这么基础的排序算法呢？

答案还是那两个字：**基础**。

基础排序往往实现简单，并且通过一系列的优化，在某些特定的场合会特别适用。例如插入排序，在遇到有大量重复键值的数据时，通过优化往往可以提前终止内层循环，使算法成为一个 $O(n)$ 时间复杂度的算法，这将大大提高算法的可用性，例如处理系统日志就是这样的一种问题，系统日志往往按时间有序生成，只有少数错误数据可能是乱序的，这时使用插入排序将特别高效。

另外，基础的排序算法通常还起到启发性的作用，或者作为高级排序算法的子过程，用于辅助优化一些高级排序算法 (例如：快速排序)，所以学好基础排序算法也十分必要。

{% fancybox imooc-algorithms https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/imooc-algorithms/apple-special-event-2018.JPG img-thumbnail %}

> 苹果 2018 年秋季 Special Event，图文无关

<!-- more -->

### 选择排序

选择排序是一种非常简单的排序算法。简单来说，选择排序算法的步骤就是：

1. 遍历整个数组，选择最小的(或最大的)元素；
2. 与当前未排序部分的第一个元素交换位置；
3. 重复1-2，直到整个数组排序完成。

动画演示：

{% fancybox imooc-algorithms https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/imooc-algorithms/Selection.gif img-thumbnail %}

示例代码 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/02-Sorting-Basic/01-Selection-Sort.js">src/02-Sorting-Basic/01-Selection-Sort.js <sup class="fas fa-share-square"></sup></a>:

```js
Array.prototype.selectionSort = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let i = 0; i < n; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (cb(array[j], array[minIndex])) {
        minIndex = j
      }
    }
    // es6 解构赋值: 需要 node ≥ 6
    [array[i], array[minIndex]] = [array[minIndex], array[i]]
  }
  return array
}
```

显然，选择排序是一个时间复杂度为 $O(n^2)$ 级别的排序算法，每次交换元素之前都必须遍历整个数组找到最小(或最大)元素，然后依次交换，最后完成排序。

这样的排序算法在数据量较小时还可以接受，但无论是乱序数组、有序数组还是有大量重复数据的数组，都将花费 $O(n^2)$ 级别的时间来完成，这在数据量逐渐增大时完全无法接受。

### 插入排序

{% fancybox imooc-algorithms https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/imooc-algorithms/trump.png %}

插入排序的过程很像是为一副扑克牌排序，每抽一张牌，就为它在已经排序好的序列中寻找一个合适的插入位置。简单来说，插入排序的算法步骤为：

1. 遍历数组，每遇到一个未排序的元素，就与其**前一个元素**比较，如果：
  a. 小于(或大于)该元素，则与之交换位置；
  b. 不大于(或不小于)该元素，则保持不变；
2. 重复直至数组有序。

动画演示:

{% fancybox imooc-algorithms https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/imooc-algorithms/Insert.gif img-thumbnail %}

示例代码 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/02-Sorting-Basic/02-Insertion-Sort.js">src/02-Sorting-Basic/02-Insertion-Sort.js <sup class="fas fa-share-square"></sup></a>:

```js
Array.prototype.insertSort = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let i = 1; i < n; i++) {
    // 寻找元素 array[i] 合适的插入位置
    for (let j = i; j > 0 && !cb(array[j - 1], array[j]); j--) {
      [array[j - 1], array[j]] = [array[j], array[j - 1]]
    }
  }
  return array
}
```

显然，插入排序仍需遍历整个数组，这使得他的算法复杂度仍然是 $O(n^2)$ 级别的。但是实际上插入过程中，如果遇到部分有序甚至完全有序的数组，那么内层循环其实提前就终止了；也就是说，在完全有序的数组上，插入排序可以退化为 $O(n)$ 级别的排序算法。

插入排序有一个显而易见的优化，就是在内层循环的每次比较后不直接交换元素位置，而是用一个临时变量保存待插入的元素，直到找到合适的插入位置，再进行实际的交换。

动画演示:

> TODO: 待补充

示例代码 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/02-Sorting-Basic/03-Insertion-Sort-Enhance.js">src/02-Sorting-Basic/03-Insertion-Sort-Enhance.js <sup class="fas fa-share-square"></sup></a>:

```js
Array.prototype.insertSortEnhance = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let i = 1; i < n; i++) {
    let e = array[i]
    let j = i
    // 寻找元素 array[i] 合适的插入位置
    for (; j > 0 && !cb(array[j - 1], e); j--) {
      array[j] = array[j - 1]
    }
    array[j] = e
  }
  return array
}
```

这样，将内层循环中的交换操作改成了赋值操作，那么性能应该会略微增强，但本质上还是 $O(n^2)$ 级别的算法。

### (选读) 冒泡排序

冒泡排序不用我太多介绍，大家在学校或者其他地方或多或少都学习过这种极为基础的排序算法。但是冒泡排序同选择排序一样都是灾难性的，都不具有跳出内层循环的机会，也就是说冒泡排序的算法复杂的一直都是 $O(n^2)$ 级别，这使得他不会被应用在大规模的数据排序上。这里也只是简单地给出示例代码，不做详细的讨论。

示例代码 1 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/02-Sorting-Basic/04-Bubble-Sort.js">src/02-Sorting-Basic/04-Bubble-Sort.js <sup class="fas fa-share-square"></sup></a>:

```js
Array.prototype.bubbleSort = function (cb) {
  const array = this.slice()
  let n = array.length
  let swapped
  do {
    swapped = false
    for (let i = 0; i < n; i++) {
      if (!cb(array[i - 1], array[i])) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]]
        swapped = true
      }
    }
    n--
  } while (swapped)
  return array
}
```

示例代码 2 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/02-Sorting-Basic/05-Bubble-Sort-Origin.js">src/02-Sorting-Basic/05-Bubble-Sort-Origin.js <sup class="fas fa-share-square"></sup></a>:

```js
// 大概是大部分教材上的实现
Array.prototype.bubbleSortOeigin = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (!cb(array[j], array[j + 1])) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
  }
  return array
}
```

示例代码 3 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/02-Sorting-Basic/06-Bubble-Sort-Enhance.js">src/02-Sorting-Basic/06-Bubble-Sort-Enhance.js <sup class="fas fa-share-square"></sup></a>:

```js
Array.prototype.bubbleSortEnhance = function (cb) {
  const array = this.slice()
  let n = array.length
  let rear
  do {
    rear = 0
    for (let i = 1; i < n; i++) {
      if (!cb(array[i - 1], array[i])) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]]
        // 记录最后一次的交换位置, 在此之后的元素在下一轮扫描中均不考虑
        rear = i
      }
    }
    n = rear
  } while (n > 0)
  return array
}
```

在实际的测试用例中，这三种实现仍有些微的性能差异。那么造成差异的原因是什么呢？这就给大家留作思考吧！

### (选读) 希尔排序

希尔排序是上文提到的**插入排序**的一个改进。插入排序在尝试移动数据时每次只移动一位，而希尔排序则尝试每次移动一个步长。那么不同的步长序列将影响最后的排序效率。

原始的希尔排序使用 `h = 1, 2, 4, ...` 这样的序列作为步长序列，这样最坏情况下时间复杂度 $O(n^2)$；现在已知最好的步长序列为 `h = 1, 5, 19, 41, 109...`，该序列来自于算式 $9 \times 4^i - 9 \times 2^i + 1$ 和 $2^{i+2} \times (2^{i+2} - 3) + 1$，这使得最坏算法复杂度降到了 $O(nlog^2{n})$。其他序列还包括斐波那契型等等，各自有不同的算法复杂度，但始终要劣于我们接下来要介绍的更高级的排序算法。由于算法复杂度的分析计算并不是本文的重点，所以上式的结果大家可以作为结论了解即可，或者有兴趣的同学可以搜索相关的论文，结合数学分析的知识进行详细的推导，这里就仅给出一个实现的示例代码：

示例代码 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/02-Sorting-Basic/07-Shell-Sort.js">src/02-Sorting-Basic/07-Shell-Sort.js <sup class="fas fa-share-square"></sup></a>:

```js
Array.prototype.shellSort = function (cb) {
  const array = this.slice()
  const n = array.length
  // 计算 increment sequence: 1, 4, 13, 40, 121, 364, 1093...
  let h = 1
  while (h < n / 3) {
    h = 3 * h + 1
  }

  while (h >= 1) {
    // h-sort the array
    for (let i = h; i < n; i++) {
      // 对 arr[i], arr[i-h], arr[i-2*h], arr[i-3*h]... 使用插入排序
      let e = array[i]
      let j
      for (j = i; j >= h && cb(e, array[j - h]); j -= h) {
        array[j] = array[j - h]
      }
      array[j] = e
    }
    h = Math.floor(h /= 3)
  }
  return array
}
```

### 参考链接

- [希尔排序- 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/希尔排序)
