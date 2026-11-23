---
title: EditorGUIUtility公共类
description: 记录 Unity编辑器中EditorGUIUtility公共类的用法。
date: 2026-11-23
category: 编辑器拓展
folder:
  - 编辑器拓展
  - EditorGUIUtility
tags:
  - 编辑器拓展
sample: false
draft: false
---
# 一、EditorGUIUtility公共类是用来做什么的？
EditorGUIUtility 是 EditorGUI 中的一个实用工具类,提供了一些 EditorGUI 相关的其他辅助API。

官方文档：
https://docs.unity3d.com/ScriptReference/EditorGUIUtility.html

# 二、资源加载
## 2.1 Editor Default Resources文件夹
Editor Default Resources 也是Unity当中的一个特殊文件夹，它的主要作用是放置提供给 EditorGUIUtility 加载的资源。
想要使用EditorGUIUtility公共类来加载资源，我们需要将资源放置在 Editor Default Resources 文件夹中。

## 2.2 加载资源（如果资源不存在返回null)
对应API：
**EditorGUIUtility.Load**

注意事项：
1. 只能加载Assets / Editor Default Resources/ 文件夹下的资源
2. 加载资源时，需要填写资源后缀名

## 2.3 加载资源（如果资源不存在会直接报错）
对应API：
**EditorGUIUtility.LoadRequired**

注意事项：
1. 只能加载Assets / Editor Default Resources/ 文件夹下的资源
2. 加载资源时，需要填写资源后缀名

# 三、搜索框查询、对象选中提示
## 3.1 搜索框查询
```C#
//  主要作用：
//  弹出一个搜索窗口，用于选择自己想要的资源
//  主要API：
EditorGUIUtility.ShowObjectPicker<资源类型>(默认被选中的对象, 是否允许查找场景对象, "查找对象名称过滤", 0);
//  参数1. 默认被选中的对象的引用
//  参数2. 是否允许查找场景对象
//  参数3. 查找对象名称过滤（比如这里的normal是指文件名称中有normal的会被搜索到）
//  参数4. controlID, 默认写0

//  获取选择对象：
//  主要API：
EditorGUIUtility.GetObjectPickerObject()

//  弹出的搜索窗口会通过发送事件的形式
//  通知开启它的窗口对象信息的变化
//  通过Event公共类可以获取其它窗口发送给自己的事件
//  Event.current 获取当前事件
//  commandName 获取事件命令的名字
//      ObjectSelectorUpdated 对象选择发生变化时发送
//      ObjectSelectorClosed 对象选择窗口关闭时发送
if (Event.current.commandName == "ObjectSelectorUpdated")
{
    //当选择发生更新时通知进入

}
else if (Event.current.commandName == "ObjectSelectorClosed")
{
    //当选择窗口关闭时通知进入

}
```

## 3.2 对象选中提示
```C#
EditorGUIUtility.PingObject(想要提示选中的对象);
```

# 四、窗口事件传递、坐标转换
## 4.1 窗口事件传递
```C#
Event e = EditorGUIUtility.CommandEvent("事件名");
//  获取到另一个窗口后，让该窗口调用SendEvent(e) 
//  在另一个窗口中可以通过
//  Event.current.type == EventType.ExecuteCommand 判断
//  Event.current.commandName == "事件名"判断

//在传递事件时 会自动将接受事件的窗口打开 不管对象是否有监听处理对应的内容
```

## 4.2 坐标转换
- 屏幕坐标系：原点为屏幕左上角
- GUI坐标系：原点为当前窗口左上角
<br/>
- GUIToScreenPoint:将点从GUI位置转换为屏幕空间
- GUIToScreenRect:将rect从GUI位置转换为屏幕空间
<br/>
- ScreenToGUIPoint:将点从屏幕空间转换为GUI位置
- ScreenToGUIRect:将rect从屏幕空间转换为GUI位置

# 五、指定区域使用对应鼠标指针
## 5.1 指定区域使用对应鼠标指针
```C#
AddCursorRect(Rect position, MouseCursor mouse);
```

MouseCursor鼠标光标类型枚举
1. Arrow             普通指针箭头
2. Text                文本文本光标
3. ResizeVertical      调整大小垂直调整大小箭头
4. ResizeHorizontal    调整大小水平调整大小箭头
5. Link                带有链接徽章的链接箭头
6. SlideArrow          滑动箭头带有小箭头的箭头，用于指示在数字字段处滑动
7. ResizeUpRight       调整大小向上向右调整窗口边缘的大小
8. ResizeUpLeft        窗口边缘为左
9. MoveArrow           带有移动符号的箭头旁边用于场景视图
10. RotateArrow         旁边有用于场景视图的旋转符号
11. ScaleArrow          旁边有用于场景视图的缩放符号
12. ArrowPlus           旁边带有加号的箭头
13. ArrowMinus          旁边带有减号的箭头
14. Pan                 用拖动的手拖动光标进行平移
15. Orbit               用眼睛观察轨道的光标
16. Zoom                使用放大镜进行缩放的光标
17. FPS                 带眼睛的光标和用于FPS导航的样式化箭头键
18. CustomCursor        当前用户定义的光标
19. SplitResizeUpDown   向上 - 向下调整窗口拆分器的大小箭头
20. SplitResizeLeftRight窗口拆分器的左 - 右调整大小箭头

# 六、绘制色板、绘制曲线
## 6.1 绘制色板
```C#
//在指定区域绘制一个色板矩形
EditorGUIUtility.DrawColorSwatch(Rect 绘制色板的矩形, Color 颜色);

//主要配合 EditorGUILayout.ColorField 颜色输入控件使用
```

## 6.2 绘制曲线
```C#
//在指定区域绘制曲线
EditorGUIUtility.DrawCurveSwatch(Rect 绘制曲线的范围,
                                 AnimationCurve 曲线,
                                 SerializedProperty 要绘制为SerializedProperty的曲线,
                                 Color 绘制曲线的颜色,
                                 Color 绘制背景的颜色);

//主要配合 EditorGUILayout.CurveField 曲线输入控件使用
```