---
title: 用 Node.js 给树莓派写了个控制台
author: Mitscherlich
date: 2018-10-28 18:07:09
categories: essay
tags:
  - Node.js
  - 树莓派
  - 摸鱼
---

{% fancybox rpi-dashboard https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-10-28/9355618.jpg img-thumbnail %}

> 雪乃坐镇保佑不出 bug

大一的时候就买了很多树莓派，因为那时候还啥也不会，就大部分时间放在角落里吃灰。最近考古看到一篇外国老哥[用树莓配搭建 Hadoop 集群][hadoop-post]的文章，就把树莓派拿出来重新改造了一下，作为智能家居中心使用。好在当初就是用 **lego** 搭的外壳，现在要翻修也很容易，已经捣鼓之后看起来就像上面那样。为了能在 `iOS` 上用 `HomeKit` 控制家里的几个小米的智能灯，我选择了 [HomeAssistant][home-assistant] 作为智能家居中心，但树莓派的散热就成了个问题。

本来买树莓派的时候就带了风扇，但都是直接插在树莓派的供电接口上的，也就是说，`3.3v` 供电的 `GPIO` 引脚是没法驱动 `5v` 工作电压的风扇的，而且另一方面这小风扇非常吵，而且整天整晚的开着承轴受不了(已经挂了一个了)，所以我就去万能的某宝买了一个建准的[磁悬浮风扇](http://m.uqlsi.top/h.3jMqxrW)，`6cm` 的风径可以给两个树莓派同时散热。事实证明磁悬浮风扇果然名不虚传，风量大还真的一点声音都没有。但为了延长承轴寿命，还是要设计一套可以通过编程控制的风扇控制程序。

<!-- more -->

经过一番搜索，我参考了[这篇][rpi-cooling-post]文章。上面已经说过了，`3.3v` 的 `GPIO` 是没法直接给风扇供电的，所以我选择了博文中的三极管方案，设计了这样的电路：

{% fancybox rpi-dashboard https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-10-28/87061433.jpg img-thumbnail %}

> 在线的 CircuteLab 没有 `motor`，用 `lamp` 将就一下吧

我和博文中一样选择了 `S9012` 的 `PNP` 型三极管，风扇正极与树莓派 `5v` 引脚相连，负极与三极管发射极相连，三极管基极与你想要使用的 `GPIO` 引脚(比如我这里就是 `8` 号引脚 (`GPIO 14`)) 相连，集电极接地即可。参考下面的树莓派引脚图：

{% fancybox rpi-dashboard https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-10-28/30029839.jpg img-thumbnail %}

> ⚠️ 注意 `rpio` 的引脚编号和实际的 `gpio` 端口号不完全对应，下面会讲到

接下来，通过 `node.js` 编程控制风扇自动停启。使用 `node.js` 是为了下面和控制台对接方便，示例代码如下：

```js
const GPIO = require('rpio')
const PIN = 8 // 这里的 8 号引脚对应 gpio 14，其余请查阅 rpi gpio 手册：https://pinout.xyz/
const TEMP_LOW = 38 // 低于 38 摄氏度则停止运行
const TEMP_HIGH = 42 // 高于 42 摄氏度则开启风扇

const TEMP_FILE = '/sys/class/thermal/thermal_zone0/temp'

/**
 * 读取树莓派当前温度
 * return {Number} 当前温度
 */
function cpuTemp () {
  return parseFloat(require('fs').readFileSync(TEMP_FILE)) / 1000
}

setInterval(function () {
  temp = cpuTemp()
  console.log(`Current temp is ${temp}`)
  if (isClose) {
    if (temp > TEMP_HIGH) {
      GPIO.write(PIN, GPIO.LOW)
      console.log('Open air cooler')
      isClose = false
    }
  } else {
    if (temp < TEMP_LOW) {
      GPIO.write(PIN, GPIO.HIGH)
      console.log('Close air cooler')
      isClose = true
    }
  }
}, 2000) // 每 2s 刷新一次
```

> 对了，这里有个坑忘了说。包括我参考的那篇博客在内，大部分网络上的资料都是通过给接口高电平来开启风扇的，但事实上这是以 `NPN` 型三极管计算的结果，要使得 `PNP` 工作于放大状态应该使**发射结正偏**而**集电结反偏**，如果 `GPIO` 引脚这时给高电平是没法使三极管正常工作的，所以这里给低电平才对。
> 为了验证这个我还把尘封的模电书找了出来好好复习了一下。

用 `Node` 编写控制台后端还比较简单，主要架构就是 `express` 做服务端，`bootstrap materialize design` + `d3.js` 做前端页面，再通过 `socket.io` 作为 `WebSocket` 通讯就行了。虽然简单但代码比较繁琐，就不在这里贴出来了，给个视频意思一下：

{% dplayer url=/assets/rpi-dashboard/preview.mp4 %}

> 性感风扇在线调戏

不过我不清楚是不是 `d3.js` 的锅，反正现在性能不是很好，长时间运行后树莓派倒是不烫了，电脑的 CPU 却下不来了~~大雾~~，估计反复操作 `DOM`性能开销还是太大了，等明年再用 `Vue` 重构吧。

### 参考链接

- [Build a Raspberry Pi Hadoop Cluster to Run Spark on YARN - DQYDJ][hadoop-post]
- [树莓派 根据 CPU 温度控制风扇起停][rpi-cooling-post]

[home-assistant]: https://www.home-assistant.io/hassio/
[hadoop-post]: https://dqydj.com/raspberry-pi-hadoop-cluster-apache-spark-yarn/
[rpi-cooling-post]: https://testerhome.com/topics/8068
