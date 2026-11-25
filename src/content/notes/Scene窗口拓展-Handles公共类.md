---
title: Scene窗口拓展-Handles公共类
description: 记录 Unity编辑器中用于Scene窗口拓展的Handles公共类。
date: 2026-11-24
category: 编辑器拓展
folder:
  - 编辑器拓展
  - Scene窗口拓展
  - Handles
tags:
  - 编辑器拓展
sample: false
draft: false
---
# 一、Handles公共类的作用
Handles类提供了很多API，让我们可以在Scene窗口中绘制我们的自定义内容。
它和GUI、EditorGUI类似，只不过它专门提供给Scene窗口使用。

想要在Scene窗口中显示自定义内容，我们需要在对应的响应函数中进行处理。

Handles更多内容
https://docs.unity3d.com/ScriptReference/Handles.html

# 二、Scene窗口更新响应函数
关键点：
前两个步骤 和自定义Inspector窗口显示内容 一致
1. 单独为某一个脚本实现一个自定义脚本，并且脚本需要继承Editor
  一般该脚本命名为 自定义脚本名 + Editor
2. 在该脚本前加上特性
  命名空间：UnityEditor
  特性名：CustomEditor(想要自定义脚本类名的Type)

3. 在该脚本中实现void OnSceneGUI()方法
  该方法会在我们选中挂载自定义脚本的对象时自动更新
  注意：只有选中时才会执行，没有选中不执行

# 三、自定义窗口中监听Scene窗口更新响应函数
可以在自定义窗口显示时，
- 监听更新事件
SceneView.duringSceneGui += 事件函数
- 窗口隐藏或销毁时移除事件
SceneView.duringSceneGui -= 事件函数

# 四、文本、线段、虚线
## 4.1 Handles中的颜色控制
```C#
//在调用Handles中的绘制API之前 设置颜色即可
Handles.color = new Color(0, 1, 1, 0.3f);
```

## 4.2 Handles中的文本控件
```C#
Handles.Label(显示位置, 文本内容);
```

## 4.3 Handles中的线段控件
```C#
Handles.DrawLine(起点, 终点, 粗细);
```

## 4.4 Handles中的虚线控件
```C#
Handles.DrawDottedLine(起点, 终点, 粗细);
```

# 五、弧线、圆、立方体，几何体
## 5.1 Handles中的弧线(圆弧)
```C#
//绘制线框弧线
Handles.DrawWireArc(圆心, 法线, 绘制朝向, 角度, 半径); 
//绘制填充弧线
Handles.DrawSolidArc(圆心, 法线, 绘制朝向, 角度, 半径); 
```

## 5.2 Handles中的圆
```C#
//绘制填充圆
Handles.DrawSolidDisc(圆心, 法线, 半径); 
//绘制线框圆
Handles.DrawWireDisc(圆心, 法线, 半径); 
```

## 5.3 Handles中的立方体线框
```C#
Handles.DrawWireCube(中心点, xyz大小);
```

## 5.4 Handles中的几何体
```C#
Handles.DrawAAConvexPolygon(几何体各顶点);
```

# 六、移动、旋转、缩放
## 6.1 Handles中的移动轴
```C#
Vector3 Handles.DoPositionHandle(位置, 角度);
Vector3 Handles.PositionHandle(位置, 角度);
```

## 6.2 Handles中的旋转轴
```C#
Quaternion Handles.DoRotationHandle(角度, 位置);
Quaternion Handles.RotationHandle(角度, 位置);
```

## 6.3 Handles中的缩放轴
```C#
Vector3 Handles.DoScaleHandle(缩放, 位置, 角度, HandleUtility.GetHandleSize(位置));
Vector3 Handles.ScaleHandle(缩放, 位置, 角度, HandleUtility.GetHandleSize(位置));

//HandleUtility.GetHandleSize方法的作用是
//获取给定位置的操纵器控制柄的世界空间大小
//使用当前相机计算合适的大小
//它决定了控制柄的缩放大小
```

# 七、自由移动、自由旋转
## 7.1 Handles中的自由移动
```C#
//一个不受约束的移动控制柄
//这个把手可以在所有方向上自由移动
Vector3 Handles.FreeMoveHandle(位置, 句柄大小, 移动步进值(按住ctrl键时会按该单位移动), 渲染控制手柄的回调函数);
//句柄大小一般配合HandleUtility.GetHandleSize函数使用

//渲染控制手柄的常用回调函数:
//Handles.RectangleHandleCap:一个矩形形状的控制手柄，通常用于表示一个平面的控制面
//Handles.CircleHandleCap:一个圆形的控制手柄，通常用于表示一个球体的控制面
//Handles.ArrowHandleCap:一个箭头形状的控制手柄，通常用于表示方向
```

## 7.2 Handles中的自由旋转
```C#
Quaternion Handles.FreeRotateHandle(角度, 位置, 句柄大小);
```

# 八、显示GUI
## 8.1 Scene中显示GUI
```C#
Handles.BeginGUI();
//GUI相关代码
Handles.EndGUI();
```

## 8.2 获取Scene窗口大小
```C#
//获取当前Scene窗口信息
SceneView.currentDrawingSceneView
//它继承自EditorWindow，因此通过position就能得到它的大小
```