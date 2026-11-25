---
title: CompilationPipeline公共类
description: 记录 Unity编辑器中的CompilationPipeline公共类。
date: 2026-11-25
category: 编辑器拓展
folder:
  - 编辑器拓展
  - CompilationPipeline
tags:
  - 编辑器拓展
sample: false
draft: false
---
# 一、CompilationPipeline公共类是用来做什么的
它是 Unity 编辑器中的一个公共类，用于处理代码编译相关的操作和事件。
对于我们来说，我们最常用的是利用它得知代码是否编译结束。
比如动态生成脚本时，我们需要在编译结束后才能使用新的脚本。

更多内容
https://docs.unity3d.com/ScriptReference/Compilation.CompilationPipeline.html

# 二、常用内容
1. CompilationPipeline.assemblyCompilationFinished
  命名空间：UnityEditor.Compilation;
  主要作用：当一个程序集编译结束会主动调用该回调函数
  传入的两个参数分别是：
    string arg1 : 编译完成的程序集名
    CompilerMessage[] arg2: 编译完成后产生的编译消息数组，包括编译警告和错误信息
<br>
2. CompilationPipeline.compilationFinished
  命名空间：UnityEditor.Compilation;
  主要作用：当所有程序集编译结束会主动调用该回调函数
  参数：
  object obj: ActiveBuildStatus 活动生成状态对象