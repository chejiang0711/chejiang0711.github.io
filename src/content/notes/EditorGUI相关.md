---
title: EditorGUI相关
description: 记录 Unity编辑器中EditorGUI的用法。
date: 2026-11-23
category: 编辑器拓展
folder:
  - 编辑器拓展
  - EditorGUI
tags:
  - 编辑器拓展
sample: false
draft: false
---
# 一、EditorGUI是什么？
EditorGUI 类似 GUI，是一个主要用于绘制编辑器拓展 UI 的工具类。
它提供了一些 GUI 中没有的API，主要是 编辑器功能中会用到的一些 特殊控件。
而EditorGUILayout 类似于 GUILayout，是一个带有自动布局功能的 EditorGUI 绘制工具类。

我们经常会将 EditorGUI 和 GUI 混合使用 来制作一些编辑器拓展功能。
但是由于更多时候我们会用到自动布局功能，因此我们接下来着重讲解 EditorGUILayout 中的功能。
EditorGUI和它的区别仅仅是需要自己设置位置而已。

详细内容：
https://docs.unity.cn/cn/2022.3/ScriptReference/EditorGUILayout.html

# 二、文本、层级和标签、颜色
## 2.1 EditorGUILayout中的文本控件
```C#
EditorGUILayout.LabelField("文本标题", "文本内容");
```

## 2.2 EditorGUILayout中的层级、标签选择
```C#
//Layer
  int变量 = EditorGUILayout.LayerField("层级选择", int变量);
//Tag
  string变量 = EditorGUILayout.TagField("标签选择", string变量);
```

## 2.3 EditorGUILayout中的颜色获取
```C#
color变量 = EditorGUILayout.ColorField(new GUIContent("标题"), color变量, 是否显示拾色器, 是否显示透明度通道, 是否支持HDR);
```

# 三、枚举、选择、按下按钮
## 3.1 枚举选择控件
```C#
//枚举选择
枚举变量 = (枚举类型)EditorGUILayout.EnumPopup("枚举选择", 枚举变量);

//多选枚举
//(注意：多选枚举进行的是或运算，声明枚举时一定注意其中的赋值，并且一定要有多种情况的搭配值)
枚举变量 = (枚举类型)EditorGUILayout.EnumFlagsField("枚举多选", 枚举变量);
```

## 3.2 整数选择控件
```C#
int变量 = EditorGUILayout.IntPopup("整数单选框", int变量, 字符串数组, int数组);
```

# 3.3 按下就触发的按钮控件
```C#
EditorGUILayout.DropdownButton(new GUIContent("按钮上文字"), FocusType.Passive)

//FocusType枚举时告诉UI系统能够获得键盘焦点 当用户按Tab键时在控件之间进行切换
//Keyboard	该控件可接收键盘焦点。
//Passive 该控件不能接收键盘焦点。
```

# 四、对象关联、各类型输入
## 4.1 对象关联控件
```C#
对象变量 = EditorGUILayout.ObjectField(对象变量, typeof(对象类型), 是否允许关联场景上对象资源) as 对象类型;
```

## 4.2 各类型输入控件
```C#
int变量 = EditorGUILayout.IntField("Int输入框", int变量);
long变量 = EditorGUILayout.LongField("long输入框", long变量);
float变量 = EditorGUILayout.FloatField("Float 输入：", float变量);
double变量 = EditorGUILayout.DoubleField("double 输入：", double变量);

string变量 = EditorGUILayout.TextField("Text输入：", string变量);
vector2变量 = EditorGUILayout.Vector2Field("Vec2输入： ", vector2变量);
vector3变量 = EditorGUILayout.Vector3Field("Vec3输入： ", vector3变量);
vector4变量 = EditorGUILayout.Vector4Field("Vec4输入： ", vector4变量);
rect变量 = EditorGUILayout.RectField("rect输入： ", rect变量);
bounds变量 = EditorGUILayout.BoundsField("Bounds输入： ", bounds变量);
boundsInt变量 = EditorGUILayout.BoundsIntField("Bounds输入： ", boundsInt变量);

//注意：EditorGUILayout中还有一些Delayed开头的输入控件
//     他们和普通输入控件最主要的区别是：在用户按 Enter 键或将焦点从字段移开之前，返回值不会更改
```

# 五、折叠、折叠组
## 5.1 折叠控件
```C#
bool变量 = EditorGUILayout.Foldout(bool变量, "标题名");
if(bool变量)
{
	//控件
}
```

## 5.2 折叠组控件
```C#
bool变量 = EditorGUILayout.BeginFoldoutHeaderGroup(bool变量, "标题名");
if(bool变量)
{
	//控件
}
EditorGUILayout.EndFoldoutHeaderGroup();
```

# 六、开关、开关组
## 6.1 开关控件
```C#
bool变量 = EditorGUILayout.Toggle("普通开关", bool变量);

bool变量 = EditorGUILayout.ToggleLeft("开关在左侧", bool变量);
```

# 6.2 开关组控件
```C#
bool变量 = EditorGUILayout.BeginToggleGroup("开关组", bool变量);
//其他控件绘制
EditorGUILayout.EndToggleGroup();
```

# 七、滑动条、双滑块滑动条
## 7.1 滑动条控件
```C#
float变量 = EditorGUILayout.Slider("滑动条", float变量, 最小值, 最大值);
int变量 = EditorGUILayout.IntSlider("整数值滑动条", int变量, 最小值, 最大值);
```

## 7.2 双块滑动条控件
```C#
EditorGUILayout.MinMaxSlider("双块滑动条", ref 左侧值, ref 右侧值, 最小值, 最大值);
```

# 八、帮助框、间隔
## 8.1 帮助框控件
```C#
EditorGUILayout.HelpBox("一般提示", MessageType.None);
EditorGUILayout.HelpBox("感叹号提示", MessageType.Info);
EditorGUILayout.HelpBox("警告符号提示", MessageType.Warning);
EditorGUILayout.HelpBox("错误符号提示", MessageType.Error);
```

## 8.2 间隔控件
```C#
//控件1
EditorGUILayout.Space(10); //进行10个单位的间隔
//控件2
```

# 九、动画曲线、布局
## 9.1 动画曲线控件
```C#
AnimationCurve变量  = EditorGUILayout.CurveField("动画曲线：", AnimationCurve变量);
```

## 9.2 布局相关API
```C#
EditorGUILayout.BeginHorizontal(); //开始水平布局
//一大堆控件
EditorGUILayout.EndHorizontal();//结束水平布局

EditorGUILayout.BeginVertical();//开始垂直布局
//一大堆控件
EditorGUILayout.EndVertical();//结束垂直布局

Vector2布局 = EditorGUILayout.BeginScrollView(Vector2布局); //开启滚动视图
//一大堆控件
EditorGUILayout.EndScrollView(); //结束滚动视图
```