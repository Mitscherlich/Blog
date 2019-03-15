---
title: '【#0】写给新手的 Android 入门指南 - 介绍篇'
author: Mitscherlich
cover: https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/The-Android-software-stack.png
date: 2018-05-14 12:21:00
category: Essay
tags:
  - Android
---

<img class="mb-4" src="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='-147 -70 294 345'%3E %3Cg fill='%2377C159'%3E %3Cuse stroke-width='14.4' xlink:href='%23b' stroke='%23FFF'/%3E %3Cuse xlink:href='%23a' transform='scale(-1,1)'/%3E %3Cg id='a' stroke='%23FFF' stroke-width='7.2'%3E %3Crect rx='6.5' transform='rotate(29)' height='86' width='13' y='-86' x='14'/%3E %3Crect id='c' rx='24' height='133' width='48' y='41' x='-143'/%3E %3Cuse y='97' x='85' xlink:href='%23c'/%3E %3C/g%3E %3Cg id='b'%3E %3Cellipse cy='41' rx='91' ry='84'/%3E %3Crect rx='22' height='182' width='182' y='20' x='-91'/%3E %3C/g%3E %3C/g%3E %3Cg stroke='%23FFF' stroke-width='7.2' fill='%23FFF'%3E %3Cpath d='m-95 44.5h190'/%3E%3Ccircle cx='-42' r='4'/%3E%3Ccircle cx='42' r='4'/%3E %3C/g%3E %3C/svg%3E" width="100">

这系列文章是原来的《写给新手的 Android 指南》的拆解版，内容大同小异，并且会展开讲解原来讲的不详细的地方。

**延伸阅读**：本系列的其他文章：

1. [【#1】写给新手的 Android 指南 - IDE 篇](/tech/2018/android-starter-1/)
<!-- 2. [【#2】写给新手的 Android 指南 - Gradle 篇](/tech/2018/android-starter-2/) -->
<!-- 3. [【#3】写给新手的 Android 指南 - GUI 篇](/tech/2018/android-starter-3/) -->
<!-- 4. [【#4】写给新手的 Android 指南 - 调试工具篇](/tech/2018/android-starter-4/) -->
<!-- 5. [【#5】写给新手的 Android 指南 - JNI 篇](/tech/2018/android-starter-5/) -->

阅读本文，你将花费约 `3min`，你将了解到以下内容：

0. [Android 的诞生与发展历史](#0x00-Android-的诞生与发展历史)
1. [Android 与 Linux 的关系](#0x01-Android-与-Linux-的关系)
2. [Eclipse 与 Android Studio 的爱恨情仇](#0x02-Eclipse-与-Android-Studio-的爱恨情仇)
3. [特色问题](#0x03-特色问题)

<!-- more -->

## 0x00. Android 的诞生与发展历史

据我们所知，Android 的诞生并非是 Google 与 Apple 的军备竞赛的产物。Android 最早用于智能相机系统，但随着智能手机的加速发展与来自 Google 的大力支持，Android 成为了一个相当具有竞争力的移动设备智能系统，并成功排挤掉了与 iOS 正火热竞争的 Windows Mobile (基于 Windows CE 内核)，即使后者不久后推出了基于 Windows NT 内核的 Windows Phone (7, 8, 8.1) 系列系统也于事无补，这导致 Windows 10 与其 UWP 平台在新一轮的移动竞赛中完全丧失了优势。

Android 是由以[安迪·鲁宾](https://zh.wikipedia.org/wiki/%E5%AE%89%E8%BF%AA%C2%B7%E9%B2%81%E5%AE%BE)为主的团队开发的基于 `Linux` 内核的嵌入式操作系统，稍后我们会讨论这一点。Google 在稍晚些成立了 [OHA](https://zh.wikipedia.org/wiki/%E9%96%8B%E6%94%BE%E6%89%8B%E6%A9%9F%E8%81%AF%E7%9B%9F) (Open Handset Alliance, 开放手持设备联盟) 并开放了 Android 系统的应用层源码，算是扛起了开源系统社区的另一面大旗。

根据统计数据显示，Android 系统仅用两年时间便于 2010 年末超越了曾经的王者 Nokia 的 Symbian 系统，成为世界上最大的智能手机操作系统。

关于 Android 系统的更多知识，你可以关注她的 [Wiki 页面](https://zh.wikipedia.org/wiki/Android)。

## 0x01. Android 与 Linux 的关系

上文中我们提到了 Android 是基于 Linux 内核的**嵌入式**操作系统，这便使得 Android 与 Linux 有了千丝万缕说不清道不明的关系，主要体现在架构的底层设计上。

众所周知，Linux 是使用 GPL 协议开源的类 UNIX 操作系统，需要注意的是 UNIX 并不是一款开放的而是闭源的商业操作系统，同时 Google 也期望 Android 不要像 Linux 那样收到太多社区的干预 ~~这更多是 Google 所谓安全隐私协议的要求~~，因此 Google 将硬件部分的抽象分离了出来，由 OEM 厂商开发并保持闭源，仅开放上层应用层的代码，开发者也仅能使用这部分的接口和开源的部分代码而已 ~~当然有很多办法调用系统私有接口，这里就不展开了~~。

![android](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/The-Android-software-stack.png)

> Android 系统软件架构

## 0x02. Eclipse 与 Android Studio 的爱恨情仇

Android Studio 于 2013 年 5 月 16 日于 Google I/O 发布，取代了 Eclipse 原来首席 Android 开发的地位。Eclipse 以其功能强大、插件丰富为人熟知，新秀 Android Studio 是基于 JetBrain IDEA IntelliJ 社区版开发的，宣传是“最智能的 IDE”。

但 JetBrain 公司的产品大多基于 Java 开发，其内存占用之恐怖一直为人诟病，Android Studio 同样也继承了这份缺陷。即使内存占用着实令很多低配置用户无法接受，但是其带来的智能提示也确实很棒，再配合各种好用的模版，用户学习成本大大降低。

好了好了不能再吹了 😂 ~~有广告嫌疑~~。

社区版 IDEA 和 Android Studio 功能是一样的，还有支持更多类型项目的开发 (如 RN，Spring-boot 等等)，如果想要完整的体验，可以入手旗舰版，如果有 EDU 教育邮箱，还可以在有效时间内体验免费的教育版软件，JetBrain 全线软件均支持哦～ ~~这真的不是广告~~。

## 0x03. 特色问题

由于众所周知的{% heimu GFW %}原因，Google 和 Android 官网现在不那么好访问，所以需要借助一点科学的手段，推荐免费 VPN [Lantern](https://github.com/getlantern/forum/issues/833)，如果只是浏览器内部使用，可以试试 Chrome 插件 [GGFWZS](https://ggfwzs.com)，现在还支持 360 (包括极速)、猎豹、百度等国内浏览器 {% heimu "其实就是 Chromium" %}。

### 参考链接

1. [Android - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Android)
