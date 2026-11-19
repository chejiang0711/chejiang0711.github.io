---
title: "第一道魔法：让场景里的方块转起来"
description: "从一个小小的旋转方块开始，记录脚本、组件与场景之间的联系。"
date: "2026-11-19"
category: "Unity 基础"
tags: ["C#", "Transform", "入门"]
unity: "2019.4+"
sample: true
---

## 这次想实现什么

创建一个持续旋转的方块，观察脚本如何影响场景中的物体。这是一篇排版示例，不代表已经在你的 Unity 工程中运行验证。

## 场景准备

1. 创建一个空场景，并添加 Cube。
2. 新建 `RotateExample.cs` 脚本。
3. 将脚本挂到 Cube 上，确保相机能看到它。

## 写下第一段咒语

```csharp
using UnityEngine;

public class RotateExample : MonoBehaviour
{
    // 暴露每秒旋转角度，便于在 Inspector 中调整效果。
    [SerializeField] private float degreesPerSecond = 45f;

    private void Update()
    {
        // 使用帧间隔换算旋转量，减少帧率差异带来的速度变化。
        transform.Rotate(Vector3.up, degreesPerSecond * Time.deltaTime);
    }
}
```

## 如何检查效果

进入播放模式后，观察方块是否绕自身 Y 轴持续旋转。调整 Inspector 中的速度，比较不同数值的效果。

> 如果没有旋转，先检查脚本是否挂载、组件是否启用，以及 Console 是否存在编译错误。

## 留给下一次的实验

- 换一个旋转轴，观察结果。
- 把旋转方向反过来。
- 尝试在运行过程中暂停旋转。
