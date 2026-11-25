---
title: Scene窗口拓展-Gizmos公共类
description: 记录 Unity编辑器中用于Scene窗口拓展的Gizmos公共类。
date: 2026-11-24
category: 编辑器拓展
folder:
  - 编辑器拓展
  - Scene窗口拓展
  - Gizmos
tags:
  - 编辑器拓展
sample: false
draft: false
---
# 一、Gizmos类是用来做什么的？
Gizmos和Handles一样，是用来让我们拓展Scene窗口的。
而Gizmos相对Handles来说，它主要专注于绘制辅助线、图标、形状等，而Handles主要用来绘制编辑器控制手柄等。

更多Gizmos相关
https://docs.unity3d.com/ScriptReference/Gizmos.html

# 二、Gizmos响应函数
在继承MonoBehaviour的脚本中实现以下函数，便可以在其中使用Gizmos来进行图形图像的绘制。
1. OnDrawGizmos() 在每帧调用，绘制的内容随时可以在Scene窗口中看见
2. OnDrawGizmosSelected() 仅当脚本依附的GameObject被选中时才会每帧调用绘制相关内容

它们的执行类似生命周期函数，Unity会帮助我们自动执行。

# 三、颜色、立方体、视锥
## 3.1 Gizmos修改颜色
```C#
Gizmos.color = Color.green;
```

## 3.2 Gizmos绘制立方体
```C#
Gizmos.DrawCube(中心点, 大小);
Gizmos.DrawWireCube(中心点, 大小);
```

## 3.3 Gizmos绘制视锥
```C#
Gizmos.DrawFrustum(绘制中心, FOV(Field of View,视野)角度, 远裁切平面, 近裁切平面, 屏幕长宽比); 
```
## 3.4 如何改变绘制内容的角度
```C#
//修改Gizmos绘制前的矩阵
//Gizmos.matrix
//Gizmos.matrix = this.transform.localToWorldMatrix;
Gizmos.matrix = Matrix4x4.TRS(位置, 角度, 缩放);
//还原矩阵
Gizmos.matrix = Matrix4x4.identity
```

# 四、贴图、图标
## 4.1 Gizmos绘制贴图
```C#
Gizmos.DrawGUITexture(new Rect(x, y, w, h), 图片信息);
```

## 4.2 Gizmos绘制图标
```C#
//图标需要放置在固定文件夹中
//Assets/Gizmos/中
Gizmos.DrawIcon(Vector3.up, "图标名");
```

# 五、线段、网格、射线
## 5.1 Gizmos绘制线段
```C#
Gizmos.DrawLine(起点, 终点);
```

## 5.2 Gizmos绘制网格
```C#
Gizmos.DrawMesh(mesh, 位置, 角度);
```

## 5.3 Gizmos绘制射线
```C#
Gizmos.DrawRay(起点, 方向); 
```

# 六、球体、网格线
## 6.1 Gizmos绘制球体
```C#
Gizmos.DrawSphere(中心点, 半径);
Gizmos.DrawWireSphere(中心点, 半径);
```

# 6.2 Gizmos绘制网格线
```C#
Gizmos.DrawWireMesh(mesh, 位置, 角度);
```

