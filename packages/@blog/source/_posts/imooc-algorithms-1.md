---
title: 【慕课】重学算法 - part.2 高级排序 (1)
author: Mitscherlich
cover: https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/imooc-algorithms/how-faster-nlogn-than-n2.png
date: 2018-10-03 08:11:45
category: Essay
tags:
  - 算法
  - JavaScript
---

> 这系列文章是慕课网《算法与数据结构》实战课程老师的讲授内容笔记整理，其中有很多动图都是我参考老师的动画演示自己制作的，并提供 JS(es6) 版的代码示例。代码仓库：📦 https://github.com/Mitscherlich/Play-with-Algorithms-JS

虽然 $O(n^2)$ 级的排序算法实现简单，但显然不能因为不能应用在大规模数据上而不具有实际生产价值。接下来我们将学习几种相对高级的排序算法，它们分别有不同的应用优势，并且能够非常迅速的处理**数百万**级别的数据量，这使得他们成为了现代计算机科学和互联网行业的支柱算法，同时也为我们接下来将要介绍的其他算法与数据结构打下了基础。

### $O(nlog{n})$ 比 $O(n^2)$ 快多少？

首先来感性的认识一下，$O(nlog{n})$ 究竟比 $O(n^2)$ 快多少：

![img](http://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/imooc-algorithms/how-faster-nlogn-than-n2.png)

> 无图无真相

<!-- more -->

### 归并排序

归并排序是将为大家介绍的第一个高级排序算法。归并排序使用递归过程，首先将一个数组一分为二，想办法对这两部分进行排序，然后通过**归并 (Merge)** 操作将这两部分合并起来，最后得到一个排序的数组。简单来说，归并排序的算法流程为：

1. 将一个数组一分为二，分别对两个子数组进行排序；
2. 对子数组排序时，继续将子数组分为两部分，直到每部分只有不多于 1 个元素 (并不一定，接下来会有说明)；
3. 逐级向上归并，得到排序后的数组。

动画演示:

![img](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/imooc-algorithms/MergeSort.gif)

> 大家应该也不难看出，图示中对 8 个元素进行排序，一共分出来了 3 层，而 3 正是 $log_2{8}$ 的结果；事实上这也是这一类算法 $O(nlog{n})$ 级别复杂度的理论依据，在这里是通过不断二分，将排序拆分为了一个 $O(log_2{n})$ 级别的问题，再通过内层 $O(n)$ 级别的归并操作，最终得到了 $O(nlog_2{n})$ 的时间复杂度；广义地，如果是一个 m 分问题，最后的时间复杂度则是 $O(nlog_m{n})$。

#### 归并过程

从上面的流程中可以看出来，算法的关键就在于实现这个 `Merge` 操作。幸运的是，存在这样的操作，使得归并可以在 $O(n)$ 级别内完成。

我们先来看一下归并操作的动画演示：

![img](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/imooc-algorithms/Merge.gif)

归并操作的核心是在一个相同大小的辅助空间上，分别维护两个子数组 (已经排好序)，将合适的元素放置到原数组合适的位置上。简单来说，记原数组当前要放置的元素索引位置为 `k`，两个子数组待比较的元素索引分别为 `i` 和 `j`，则归并过程的算法可以表述为：

1. 比较 `i` 与 `j` 索引位置元素的大小，将较小(或大)的元素放置到原数组索引 `k` 的位置上；
2. 重复此步骤，直到 `i` 或者 `j` 超出子数组索引范围；
3. 若子数组仍有剩余元素，则依次放置到原数组末尾，直到子数组均遍历完成。

示例代码 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/03-Sorting-Advance/02-Merge-Sort.js">src/03-Sorting-Advance/02-Merge-Sort.js <sup class="fas fa-share-square"></sup></a>:

```js
// 将 arr[l...mid] 和 arr[mid+1...r] 两部分进行归并
function merge (array, l, mid, r, cb) {
  const aux = new Array(r - l + 1)
  for (let i = l; i <= r; i++) {
    aux[i - l] = array[i]
  }
  // 初始化，i 指向左半部分的起始索引位置 l；j 指向右半部分起始索引位置 mid+1
  let i = l
  let j = mid + 1
  for (let k = l; k <= r; k++) {
    if (i > mid) { // 如果左半部分元素已经全部处理完毕
      array[k] = aux[j++ - l]
    } else if (j > r) { // 如果右半部分元素已经全部处理完毕
      array[k] = aux[i++ - l]
    } else if (cb(aux[i - l], aux[j - l])) { // 左半部分所指元素 < 右半部分所指元素
      array[k] = aux[i++ - l]
    } else { // 左半部分所指元素 >= 右半部分所指元素
      array[k] = aux[j++ - l]
    }
  }
}

// 递归使用归并排序, 对 arr[l...r] 的范围进行排序
function mergeSort (array, l, r, cb) {
  if (l >= r) {
    return
  }
  const mid = Math.floor((l + r) / 2)
  mergeSort(array, l, mid, cb)
  mergeSort(array, mid + 1, r, cb)
  merge(array, l, mid, r, cb)
}

Array.prototype.mergeSort = function (cb) {
  const array = this.slice()
  const n = array.length
  mergeSort(array, 0, n - 1, cb)
  return array
}
```

稍加思索便可意识到，我们其实不必将数组细分至只有一个元素，对待一个小的数组，我们完全可以使用插入排序作为子过程来加速排序的进程：

示例代码 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/03-Sorting-Advance/03-Merge-Sort-Enhance.js">src/03-Sorting-Advance/03-Merge-Sort-Enhance.js <sup class="fas fa-share-square"></sup></a>:

```js
function insertSortPartial (array, l, cb) {
  for (let i = l + 1; i <= r; i++) {
    let e = array[i]
    let j
    for (j = i; j > l && !cb(array[j - 1], e); j--) {
      array[j] = array[j - 1]
    }
    array[j] = e
  }
  return array
}

// 递归使用归并排序, 对 arr[l...r] 的范围进行排序
function mergeSortEnhance (array, l, r, cb) {
  // 优化 1: 对于小规模数组, 使用插入排序
  if (r - l <= 15) {
    array = insertSortPartial(array, l, r, cb)
    return
  }
  const mid = Math.floor((l + r) / 2)
  mergeSortEnhance(array, l, mid, cb)
  mergeSortEnhance(array, mid + 1, r, cb)
  // 优化 2: 对于 arr[mid] <= arr[mid+1] 的情况, 不进行 merge
  // 对于近乎有序的数组非常有效, 但是对于一般情况, 有一定的性能损失
  if (!cb(array[mid], array[mid + 1])) {
    merge(array, l, mid, r, cb)
  }
}

Array.prototype.mergeSortEnhance = function (cb) {
  const array = this.slice()
  const n = array.length
  mergeSortEnhance(array, 0, n - 1, cb)
  return array
}
```

#### 自顶向下的归并排序

我们已经使用递归这种方法完成了归并操作的实现。然而在计算机上，递归操作往往需要软件保存递归过程中的堆栈信息，这在递归层数较深是会造成一定的性能浪费，我们也很容易就能写出一种不需要递归的、**自顶向下**的归并排序算法：

示例代码 <a href="https://github.com/Mitscherlich/Play-with-Algorithms-JS/blob/master/src/03-Sorting-Advance/04-Merge-Sort-Bottom-Up.js">src/03-Sorting-Advance/04-Merge-Sort-Bottom-Up.js <sup class="fas fa-share-square"></sup></a>:

```js
Array.prototype.mergeSortReverse = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let sz = 1; sz <= n; sz += sz) {
    for (let i = 0; i + sz < n; i += sz + sz) {
      // 对 arr[i...i+sz-1] 和 arr[i+sz...i+2*sz-1] 进行归并
      merge(array, i, i + sz - 1, Math.min(i + sz + sz - 1, n - 1), cb)
    }
  }
  return array
}

// Merge Sort Bottom Up 优化
Array.prototype.mergeSortReverseEnhance = function (cb) {
  const array = this.slice()
  const n = array.length
  // 对于小数组, 使用插入排序优化
  for (let i = 0; i < n; i += 16) {
    insertSortPartial(array, i, Math.min(i + 15, n - 1), cb)
  }

  for (let sz = 16; sz < n; sz += sz) {
    for (let i = 0; i + sz < n; i += sz + sz) {
      // 对于 arr[mid] <= arr[mid+1] 的情况, 不进行 merge
      if (!cb(array[i + sz - 1], array[i + sz])) {
        merge(array, i, i + sz - 1, Math.min(i + sz + sz - 1, n - 1), cb)
      }
    }
  }
  return array
}
```

### 小结

这一节我们用了较大的篇幅来讨论归并排序，不仅仅是因为他是我们学习的第一个 $O(nlog{n})$ 复杂度的高级排序算法，更因为它蕴含的排序思想，并且归并排序的性能也相当优越，在实际的测试中可以在 **1s** 中内排序 **100万**不同类型的数据，这也在后面的讲解中作为重要的性能指标的参考依据。
