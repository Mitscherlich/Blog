---
title: 告别 Hexo，拥抱 Vuepress
author: Mitscherlich
date: 2019-03-15 14:26:17
cover: http://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/migrate-from-hexo-to-vuepress/cover.png
category: Note
---

![Migrate from hexo to vuepress](http://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/migrate-from-hexo-to-vuepress/cover.png)

Hexo 是我使用过的第一个静态博客生成器，它不仅非常出色的完成了完成了我的 Markdown 笔记编辑和管理的任务，同时提供了出色的 API 接口，用于主题和插件开发；甚至，它还可以说是我入门前端的老师，我的前端学习之旅就是在一边摸索 Hexo 中一边学习成长的。

但天下没有不散的宴席，通过我近些年来的学习积累，我愈发需要一个更加强大的、更自主可控的博客引擎，于是我选择在今天与 Hexo say good bye～

女士们先生们，让我们掌声有请 Vuepress 闪亮登场 :tada:

## 为什么是 Vuepress
Vuepress 是一个完全基于 vue.js 的文档生成器，同时官方提供了完整的插件用于进行博客开发。如果你浏览 Vuepress 的官方网站你会注意到：这就是用 Vuepress 开发的！通过使用 Vue 编写主题，你可以方便的为你的博客集成任何你想要的功能！

当然，我尝试过在 Hexo 中引入 Vue 进行主题开发，事实上我也已经这么做了。受到 [hexo-theme-lite](https://github.com/HeskeyBaozi/hexo-theme-lite) 的启发，我在去年设计编写了我自己的 Hexo 主题 [hexo-theme-amber](https://github.com/Mitscherlich/hexo-theme-amber)，主要利用了 [hexo-generator-restful](https://github.com/yscoder/hexo-generator-restful) 获取来自 Hexo 的数据，但这也带来了新的问题：SEO 不友好。Hexo 原本的主题是基于模版引擎的，生成的是静态的 HTML 文档，但 vue 生成的是 js bundle，用于 SPA —— 事实上，SEO 不友好也是所有 SPA 的通病。Vuepress 完美的解决了这个问题，不再生成一个 SPA 而是在本地直接渲染出静态页面，同时也能极大的提升首屏加载性能。

引入 Vue 最大的好处是主题的开发更通用了，如你所见，现在这个博客的主题正是我从原来的 Hexo 主题移植过来的 :)

<!-- more -->

### 为什么不是:
是的，Vuepress 仍并不是最完美的解决方案 —— 永远没有完美的解决方案不是吗？我在放弃 Hexo 的过程中也做了许多的取舍，最关键的一条就是 git based 与 CMS 的取舍。

![google blog platform](http://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/migrate-from-hexo-to-vuepress/google-blog-platform.png)

当你使用搜索引擎搜索 `blog platform` 时，大部分搜索引擎都会给你推荐几款成熟的、商业化的博客引擎，例如你应该耳熟能详的 [WordPress](http://wordpress.com/) 或者开源的 [Ghost](https://ghost.org/)，后者是用 Node.js 写就的。如果你需要的是一个能部署在自己服务器上的博客引擎，那么大胆的选择他们，他们更加成熟，并且有更健壮的社区来维护。

就我个人而言，我现在无法使用 CMS 的原因非常简单：我无力负担一整套服务器 + CDN 的开销。选择 git based 博客的好处是你不用担心服务器和流量的开销，也不用担心设计不好的程序使服务器成为 hacker 的肉鸡。Github Pages 服务会帮助你的当大部分的攻击 —— 事实上这也是他们自身的需要。

至于 SSR 解决方案，Vuepress 并不是独一家。大名鼎鼎的 Nuxt.js 正是 Vue 官方推荐的 SSR 框架。Nuxt 可以用于设计 git based 博客吗？当然可以，但这显然有些屈才了，如果你需要自己设计开发后端逻辑，Nuxt 是你的不二之选。但你没有理由放弃 Vuepress 官方提供的许多方便的插件，不是吗？

综上，Vuepress 是我个人认为当下最合适的选择。

### 就是这样了？
就是这样了！但这显然不会是结束，我不会放弃开发一个完整的独立博客引擎，或许等那一天我真能买得起一台 $40/month 的服务器时，你就能看到了（笑
