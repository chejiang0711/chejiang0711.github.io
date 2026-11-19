---
title: "Unity UGUI：UI 事件监听接口"
description: "记录 UGUI 常用事件接口、使用步骤，以及 PointerEventData 的关键参数。"
# 此日期为博客导入日期，不推断原始笔记的写作时间。
date: "2026-11-19"
category: "Unity UI"
folder: ["UI", "UGUI", "UGUI进阶"]
tags: ["UGUI", "事件监听"]
sample: false
draft: false
---

<!-- 从 Obsidian 复制导入，仅转换图片引用；保留原文，未进行技术校订。 -->

## 一、事件接口是用来解决什么问题的
目前所有的控件都只提供了常用的事件监听列表
如果想做一些类似长按，双击，拖拽等功能是无法制作的
或者想让Image和Text，RawImage三大基础控件能够响应玩家输入也是无法制作的

而事件接口就是用来处理类似问题
让所有控件都能够添加更多的事件监听来处理对应的逻辑
## 二、有哪些事件接口
### 2.1 常用事件接口
- IPointerEnterHandler - OnPointerEnter - 当指针进入对象时调用 （鼠标进入）
- IPointerExitHandler - OnPointerExit - 当指针退出对象时调用 （鼠标离开）
- IPointerDownHandler - OnPointerDown - 在对象上按下指针时调用 （按下）
- IPointerUpHandler - OnPointerUp - 松开指针时调用（在指针正在点击的游戏对象上调用）（抬起）
- IPointerClickHandler - OnPointerClick - 在同一对象上按下再松开指针时调用 （点击）

- IBeginDragHandler - OnBeginDrag - 即将开始拖动时在拖动对象上调用 （开始拖拽）
- IDragHandler - OnDrag - 发生拖动时在拖动对象上调用 （拖拽中）
- IEndDragHandler - OnEndDrag - 拖动完成时在拖动对象上调用 （结束拖拽）
### 2.2 不常用事件接口


<img src="../../images/ugui-event-interfaces/event-interfaces.png" alt="不常用事件接口笔记截图" loading="lazy" />


## 三、使用事件接口
1. 继承MonoBehavior的脚本继承对应的事件接口，引用命名空间
2. 实现接口中的内容
3. 将该脚本挂载到想要监听自定义事件的UI控件上


<img src="../../images/ugui-event-interfaces/event-namespace.png" alt="使用事件接口示例截图一" loading="lazy" />




<img src="../../images/ugui-event-interfaces/event-example.png" alt="使用事件接口示例截图二" loading="lazy" />


## 四、PointerEventData参数的关键内容
- 父类：BaseEventData

- pointerId： 鼠标左右中键点击鼠标的ID 通过它可以判断右键点击
- position：当前指针位置（屏幕坐标系）
- pressPosition：按下的时候指针的位置
- delta：指针移动增量
- clickCount：连击次数
- clickTime：点击时间

- pressEventCamera：最后一个OnPointerPress按下事件关联的摄像机
- enterEvetnCamera：最后一个OnPointerEnter进入事件关联的摄像机
## 五、优缺点
- 好处：
	需要监听自定义事件的控件挂载继承实现了接口的脚本就可以监听到一些特殊事件
	可以通过它实现一些长按，双击拖拽等功能
- 坏处：
	不方便管理，需要自己写脚本继承接口挂载到对应控件上，比较麻烦



