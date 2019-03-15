---
title: '【#1】写给新手的 Android 入门指南 - IDE 篇'
author: Mitscherlich
cover: https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/studio-homepage-hero_2x.jpg
date: 2018-05-16 12:05:00
category: Essay
tags:
  - Android
---

<img class="mb-4" src="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='-147 -70 294 345'%3E %3Cg fill='%2377C159'%3E %3Cuse stroke-width='14.4' xlink:href='%23b' stroke='%23FFF'/%3E %3Cuse xlink:href='%23a' transform='scale(-1,1)'/%3E %3Cg id='a' stroke='%23FFF' stroke-width='7.2'%3E %3Crect rx='6.5' transform='rotate(29)' height='86' width='13' y='-86' x='14'/%3E %3Crect id='c' rx='24' height='133' width='48' y='41' x='-143'/%3E %3Cuse y='97' x='85' xlink:href='%23c'/%3E %3C/g%3E %3Cg id='b'%3E %3Cellipse cy='41' rx='91' ry='84'/%3E %3Crect rx='22' height='182' width='182' y='20' x='-91'/%3E %3C/g%3E %3C/g%3E %3Cg stroke='%23FFF' stroke-width='7.2' fill='%23FFF'%3E %3Cpath d='m-95 44.5h190'/%3E%3Ccircle cx='-42' r='4'/%3E%3Ccircle cx='42' r='4'/%3E %3C/g%3E %3C/svg%3E" width="100">

这系列文章是原来的《写给新手的 Android 指南》的拆解版，内容大同小异，并且会展开讲解原来讲的不详细的地方。

**延伸阅读**：本系列的其他文章：

0. [【#0】写给新手的 Android 指南 - 介绍篇](/article/android-starter-0/)
<!-- 2. [【#2】写给新手的 Android 指南 - Gradle 篇](/article/android-starter-2/) -->
<!-- 3. [【#3】写给新手的 Android 指南 - GUI 篇](/article/android-starter-3/) -->
<!-- 4. [【#4】写给新手的 Android 指南 - 调试工具篇](/article/android-starter-4/) -->
<!-- 5. [【#5】写给新手的 Android 指南 - JNI 篇](/article/android-starter-5/) -->

阅读本文将花费大约 `8min`，完成实践将花费 `25-30min` 不等，您将了解到以下内容：

0. [开始之前](#0x00-开始之前)
1. [使用 Android Studio](#0x01-使用-Android-Studio)
2. [使用 IntelliJ IDEA](#0x02-使用-IntelliJ-IDEA)
3. [创建 AVD](#0x03-创建-AVD)
4. [常见问题](#0x04-常见问题)

<!-- more -->

## 0x00. 开始之前

在上一节中，我们介绍了两种可以用于开发 Android 应用的集成开发环境 (Integrated Development Environment, IDE) —— JetBrain 公司的 IntelliJ IDEA 和继承自其社区版的 Android Studio。介于完全不想参与到版本论和与 Eclipse 孰优孰劣的争端中，还请各位同学**自行选择**自己喜欢的 IDE 或**根据老师上课时使用的环境**来选择，不要受本文选择的干扰 (需要注意版本的地方都会用醒目的 `⚠️ 注意` 表示)。由于笔者手头只有 macOS 系统，以下内容均以 macOS 系统环境为准。

好了，废话不多说，让我们进入正题吧！

## 0x01. 使用 Android Studio

![android studio](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/studio-homepage-hero_2x.jpg)

> 官网截图

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_000.png)

上一话我们提到了，Android Studio 其实是基于 IntelliJ IDEA 的阉割版，完整的功能分别在其社区版和旗舰版中提供，我们接下来再谈。

使用 Android Studio 各平台版本并无二异，在 Windows 下你甚至不需要准备 MinGW 环境，需要做的仅仅是正确安装 JDK 即可。

### 0. 第一次运行

下载解压后，第一次运行 Android Studio 会自动运行配置向导来帮助用户完成初始化设置和 SDK 的设置。

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_001.png)

如果你之前安装过 Android Studio，向导会在默认位置找到你的配置目录，如果你修改了你的配置目录，你可能需要手动找到你的配置目录并导入原先的配置。

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_002.png)

点击下一步 (next)，会进入 Android SDK 的配置向导，如果你出现了下图中的错误，不用理会，点击取消 (cancel) 继续即可，这是由于国内具有特色的网络环境导致的 ~~请自备梯子~~。

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_003.png)

接下来，选择你想要放置 Android SDK 的位置；如果你已经下载或安装过 Android SDK，你可以手动选择他的位置 (这里我已经安装过了):

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_004.png)

### 1. 新建工程

打开 Android Studio，在主界面上选择 "Start a new Android project":

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_005.png)

接着填写项目名称等信息:

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_006.png)

选择最低将支持的 SDK 登记，默认为 `4.0.3 (Ice cream sandwich)`，这是 Google 于 2010 年推出的一款 Android 系统，现在是最低的兼容版本:

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_007.png)

接下来，选择默认视图的模版，建议新手同学保持默认的 `Empty Activity` 不变，感兴趣的同学可以选择其他的模版来学习复杂样式的视图是如何组织代码和样式的，这里我们在后面的章节再探讨:

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_008.png)

填写默认视图的类名和对应的资源文件名，默认即可:

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_009.png)

可以注意到该页面上还有两个复选框，第一个是生成一个 XML 文件来创建视图，第二个是是否使用兼容性视图，因为我们知道，Android 系统经过了很多次迭代与重构，仅视图框架部分就有了很大的变化与安全性改动，想要你的应用兼容旧的 Android 系统设备，那你应该保持勾选这个复选框，它们的区别在于兼容性视图将使用 `android.support.v7.app.AppCompatActivity` 这个类作为视图的基类。

然后点击 `finish` 就可以完成项目的创建了，

### 0x02. 使用 IntelliJ IDEA

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/idea_overview_5_1.png)

> *是不是很像 Android Studio*

JetBrain 公司的旗舰 IDE，功能十分强大，还有免费的社区版，功能绝对可以满足大部分学生党甚至微创企业的开发需求，哦对了，如果你有有效的校园 `.edu` 邮箱，你还可以申请免费的教育版全套软件 ~~可以狠狠的薅一把资本主义羊毛~~。

#### 1. 新建工程

使用 IDEA 建立 Android 工程的过程于 Android Studio 大同小异，这里就只陈列一下过程截图:

1. 选择 Android Project (Android Studio 无此步骤)

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_010.png)

2. 填写项目相关信息

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_011.png)

3. 选择视图模版

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_012.png)

4. 填写类名与资源文件名

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_013.png)

### 0x03. 创建 AVD

创建好了工程，你就可以进入代码编写与布局设计的步骤了，但想要调试运行你的应用，你还需要一台 Android 设备或者 Android 虚拟设备 (Android Virtual Device, AVD)。

下面以 IntelliJ IDEA 为例，演示如何创建一台 AVD:

1. 在菜单栏中找到 `tools` 菜单下的 `Android` 子菜单:

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_014.png)

2. 选择 `AVD Manager` 选单

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_015.png)

3. 点击 `Create Virtual Device` 按钮

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_016.png)

4. 选择系统镜像

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_017.png)

5. 填写设备信息

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_018.png)

6. 完成！

### 0x04. 常见问题

在创建工程时，可能遇到界面长期卡在下图所示阶段，这是由于 Gradle 构建工具下载失败导致的，参照我们下一章对于 Gradle 问题的详细处理来解决这个问题:

![screenshot](https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-03/image_019.png)
