---
title: 从一道春招笔试题说起 [下]
author: Mitscherlich
# cover: https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/The-Android-software-stack.png
date: 2019-04-02 15:35:48
category: Note
tags:
  - Vue.js
  - JavaScript
  - 算法
---

<!-- [![](https://badge.juejin.im/entry/5ca1adfdf265da30717fc9ba/likes.svg?style=flat-square)](https://juejin.im/post/5ca1aa55f265da30b62190f6) -->

> 又上必有下，我又不是夏一鸽~

书接上文，[上一篇文章](/article/_2019-spring-interview-0/)分析并完成了一道简单的笔试题，那为什么还会有这篇文章呢？一个显而易见的道理是：越是简单的问题越有深挖的价值。首先我们来看这样的问题会出现在什么地方。

随着 ES6 语法的应用越来越广，相信已经有不少小伙伴抛弃了 `lodash` 的 `merge` 方法转而用 `Object.assign` 实现一个自己的 `merge` 操作；但毕竟 `lodash` 又方便又好用，有时候偷个懒就还是直接用 `lodash` 算了 (比如我)。`merge` 操作的应用场景很多，即使不会遇上上文的深拷贝问题，这个不经意的编码习惯还是会带来问题，例如我在 [hexo-theme-amber](https://github.com/Mitscherlich/hexo-theme-amber) 这个主题时就遇到了类似的问题。

<!-- more -->

> 前情提要：[hexo-theme-amber](https://github.com/Mitscherlich/hexo-theme-amber) 是用 Vue.js 开发的，使用了 Vuex 管理状态树


