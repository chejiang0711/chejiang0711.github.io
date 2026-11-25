---
title: EditorUtility公共类
description: 记录 Unity编辑器中的EditorUtility公共类。
date: 2026-11-24
category: 编辑器拓展
folder:
  - 编辑器拓展
  - EditorUtility
tags:
  - 编辑器拓展
sample: false
draft: false
---
# 一、EditorUtility公共类是用来做什么的？
它是 Unity 编辑器中的一个实用工具类，提供了一系列用于编辑器脚本和自定义编辑器的实用功能。

更多内容
https://docs.unity3d.com/ScriptReference/EditorUtility.html

# 二、在哪里使用EditorUtility公共类中的相关内容
在编辑器相关处都可以使用EditorUtility公共类中的相关内容。
它主要提供的是一些辅助功能，可以在编辑器拓展开发的任意地方使用。
但一定注意，它属于编辑器功能，无法被打包出去，只能在Unity编辑器中使用。

# 三、编辑器默认窗口相关
## 3.1 显示提示窗口
```C#
EditorUtility.DisplayDialog("标题", "显示信息", "确定键名");
//注意：窗口显示会阻塞逻辑
```

## 3.2 显示三键提示面板
```C#
int EditorUtility.DisplayDialogComplex("标题", "显示信息", "按钮1名字", "按钮3名字", "按钮2名字");
//返回值 0-按钮1按下 1-按钮3按下 2-按钮2按下
//注意：窗口显示会阻塞逻辑
```

## 3.3 进度条相关
```C#
//显示进度条
EditorUtility.DisplayProgressBar("进度条", "显示信息", 进制值0~1);
//关闭进度条
EditorUtility.ClearProgressBar();

//注意：进度条窗口不会卡逻辑，但是需要配合关闭进度条使用
```

# 四、文件面板相关
## 4.1 显示 文件 存储面板
```C#
//通常用于在编辑器中保存新创建的文件或选择文件的保存路径
string path = EditorUtility.SaveFilePanel("窗口标题", "打开的目录", "保存的文件的名称", "文后缀格式")
```

## 4.2 显示 文件 存储面板(默认指定在Asset文件夹中)
```C#
//与 SaveFilePanel 类似，但是它将保存路径限制在项目目录中，只允许用户选择项目内的文件夹作为保存路径
string path = EditorUtility.SaveFilePanelInProject("窗口标题", "保存的文件的名称", "后缀格式", "在对话框窗口中显示的文本摘要");
```

## 4.3 显示 文件夹 存储面板
```C#
//通常用于在编辑器中选择文件夹作为保存路径，用于保存文件或执行其他与文件夹相关的操作
string path = EditorUtility.SaveFolderPanel("窗口标题", "文件夹", "默认名称");
```

## 4.4 显示打开 文件 面板
```C#
//通常用于在编辑器中选择文件进行打开或执行其他与文件相关的操作
string path = EditorUtility.OpenFilePanel("窗口标题", "文件路径", "后缀格式");
```

## 4.5 显示打开 文件夹 面板
```C#
//通常用于在编辑器中选择文件夹进行打开或执行其他与文件夹相关的操作
string path = EditorUtility.OpenFolderPanel("窗口标题", "文件夹", "默认名称");
```

# 五、压缩纹理和查找对象依赖项
## 5.1 压缩纹理
```C#
EditorUtility.CompressTexture(Texture2D texture, TextureFormat format, TextureCompressionQuality quality);
```

## 5.2 查找对象依赖项
```C#
object[] EditorUtility.CollectDependencies(Object[] roots);
//返回对象所依赖的所有资源列表
```

