---
title: Selection公共类
description: 记录 Unity编辑器中Selection公共类的用法。
date: 2026-11-23
category: 编辑器拓展
folder:
  - 编辑器拓展
  - Selection
tags:
  - 编辑器拓展
sample: false
draft: false
---
# 一、Selection公共类是用来做什么的？
主要用来获取当前在Unity编辑器中选择的对象，只能用于编辑器开发中。

Selection公共类 更多API
https://docs.unity.cn/cn/2022.1/ScriptReference/Selection.html

# 二、常用静态成员
## 2.1 获取当前选择的Object
```C#
//获取当前在面板上选择的游戏物体Object
//未选择则返回Null
//选择多个则返回第一个选择的游戏物体
Selection.activeObject
```

## 2.2 获取当前选择的GameObject
```C#
//获取当前在面板上选择的游戏物体GameObject
//未选择则返回Null
//选择多个则返回第一个选择的游戏物体
Selection.activeGameObject
```

## 2.3 获取当前选择的Transform
```C#
//获取当前在面板上选择的游戏物体的Transform
//未选择则返回Null
//选择多个则返回第一个选择的游戏物体
Selection.activeTransform

//只能获取到场景中的对象的Transform
```

## 2.4 获取当前选择的所有Object
```C#
//获取当前在面板上选择的物体数组
//未选择则返回Null
Selection.objects 
```

## 2.5 获取当前选择的所有GameObject
```C#
//获取当前在面板上选择的游戏物体或Project中预设体 GameObject数组
//未选择则返回Null
Selection.gameObjects
//可以遍历获取所有信息
```

## 2.6 获取当前选择的所有Transform
```C#
//获取当前在面板上选择的游戏物体Transform数组
//未选择则返回Null
Selection.transforms
//可以遍历获取所有信息
```

# 三、常用静态方法
## 3.1 判断某个对象是否被选中
```C#
Selection.Contains 判断某个对象是否被选中
```

## 3.2 筛选对象
```C#
//从当前选择对象中，筛选出想要的内容
Selection.GetFiltered(类型, 筛选模式)
Selection.GetFiltered<类型>(筛选模式)

//  筛选模式：SelectionMode
//  Unfiltered: 不过滤
//  TopLevel: 只获取最上层对象，子对象不获取
//  Deep: 父对象、子对象都获取
//  ExcludePrefab: 排除预设体
//  Editable: 只选择可编辑的对象
//  OnlyUserModifiable: 仅用户可修改的内容
//  Assets: 只返回资源文件夹下的内容
//  DeepAssets: 如果存在子文件夹，其中的内容也获取
//  如果要混用 位或 | 即可
```

## 3.3 当选中变化时会调用的委托
```C#
Selection.selectionChanged += 函数;//选择的物体变化时调用
```