---
title: Inspector窗口拓展
description: 记录 Unity编辑器中的Inspector窗口拓展。
date: 2026-11-23
category: 编辑器拓展
folder:
  - 编辑器拓展
  - Inspector窗口拓展
tags:
  - 编辑器拓展
sample: false
draft: false
---
# 一、基础知识
## 1.1 Inspector窗口自定义显示指什么？
我可以完全自定义某一个脚本在Inspector窗口的相关显示。

## 1.2 SerializedObject和SerializedProperty的作用
SerializedObject 和 SerializedProperty
主要用于在 Unity 编辑器中操作和修改序列化对象的属性。
它们通常在自定义编辑器中使用，以创建更灵活、可定制的属性面板。

我们只需要记住简单的规则
SerializedObject 代表脚本对象
SerializedProperty 代表脚本对象中的属性

SerializedObject: https://docs.unity.cn/cn/2022.1/ScriptReference/SerializedObject.html
SerializedProperty: https://docs.unity.cn/cn/2022.1/ScriptReference/SerializedProperty.html

## 1.3 脚本在Inspector窗口中显示的内容
```C#
[Serializable]
public class ItemData
{
    public string itemName;
    public int count;
}

public class InspectorExample : MonoBehaviour
{
    // 数组和 List 的元素类型可序列化时，可以直接显示。
    [SerializeField] private int[] numbers = new int[0];
    [SerializeField] private List<string> names = new List<string>();

    // 自定义类型标记 Serializable 后，可以展开编辑成员。
    [SerializeField] private ItemData item = new ItemData();
    [SerializeField] private List<ItemData> items = new List<ItemData>();
}

[CustomEditor(typeof(InspectorExample))]
public class InspectorExampleEditor : Editor
{
    private SerializedProperty numbers;
    private SerializedProperty names;
    private SerializedProperty item;
    private SerializedProperty items;

    private void OnEnable()
    {
        // 名称必须与组件中的字段名称一致，包括大小写。
        numbers = serializedObject.FindProperty("numbers");
        names = serializedObject.FindProperty("names");
        item = serializedObject.FindProperty("item");
        items = serializedObject.FindProperty("items");
    }

    public override void OnInspectorGUI()
    {
        // 从目标组件同步数据，随后通过序列化属性编辑。
        serializedObject.Update();

        EditorGUILayout.LabelField("数组与 List", EditorStyles.boldLabel);
        EditorGUILayout.PropertyField(numbers, true);
        EditorGUILayout.PropertyField(names, true);

        EditorGUILayout.Space();
        EditorGUILayout.LabelField("自定义类型与属性", EditorStyles.boldLabel);
        EditorGUILayout.PropertyField(item, true);
        EditorGUILayout.PropertyField(items, true);

        // 提交修改，接入 Unity 的 Undo 和 Prefab 属性修改流程。
        serializedObject.ApplyModifiedProperties();
    }

```
关键步骤：
1. 单独为某一个脚本实现一个自定义脚本，并且脚本需要继承Editor
  一般该脚本命名为 自定义脚本名 + Editor
2. 在该脚本前加上特性
  命名空间：UnityEditor
  特性名：CustomEditor(想要自定义脚本类名的Type)
3. 声明对应SerializedProperty序列化属性 对象
  主要通过它和自定义脚本中的成员进行关联
  可以利用继承Editor后的成员serializedObject中的FindProperty("成员变量名")方法关联对应成员;
比如：SerializedProperty mySerializedProperty;
mySerializedProperty = serializedObject.FindProperty("自定义脚本中的成员名");
一般在OnEnable函数中初始化
4. 重写OnInspectorGUI函数
该函数控制了Inspector窗口中显示的内容
只需要在其中重写内容便可以自定义窗口
注意：其中的逻辑需要包裹在这两句代码之间
**serializedObject.Update();**
**serializedObject.ApplyModifiedProperties();**
## 1.4 获取脚本依附的对象
Editor中的target成员变量
```C#
[CustomEditor(typeof(Player))]
public class PlayerEditor : Editor
{
    public override void OnInspectorGUI()
    {
        // target 是正在编辑的 Player 组件。
        Player player = (Player)target;

        // gameObject 才是组件依附的游戏对象。
        GameObject obj = player.gameObject;

        EditorGUILayout.LabelField("对象名称", obj.name);
    }
}
```
# 二、数组、List属性
## 2.1 数组、List属性在Inspector窗口显示 基础方式
```C#
//主要知识点：
EditorGUILayout.PropertyField(SerializedProperty对象, 标题);
//该API会按照属性类型自己去处理控件绘制的逻辑
```

**选择odin插件**
```C#
// 显示元素索引，方便查看和编辑数组。
    [ListDrawerSettings(ShowIndexLabels = true)]
    public string[] itemNames;
    [System.Serializable]
//List<T> 也可以使用这些标签。
```

## 2.2 数组、List属性在Inspector窗口显示 自定义方式
如果我们不想要Unity默认的绘制方式去显示 数组、List相关内容,我们也可以完全自定义布局方式
主要知识点：
利用SerializedProperty中数组相关的API来完成自定义
1. arraySize 获取数组或List容量
2. InsertArrayElementAtIndex(索引) 为数组在指定索引插入默认元素（容量会变化）
3. DeleteArrayElementAtIndex(索引) 为数组在指定索引删除元素（容量会变化）
4. GetArrayElementAtIndex(索引) 获取数组中指定索引位置的 SerializedProperty 对象

# 三、自定义属性
## 3.1 自定义属性 在Inspector窗口显示 基础方式
```C#
//主要知识点：
EditorGUILayout.PropertyField(SerializedProperty对象, 标题);
//该API会按照属性类型自己去处理控件绘制的逻辑
```

**选择odin插件**
```C#
public class Player : MonoBehaviour
{
    // 由 Unity 保存实际数值，隐藏字段以避免重复显示。
    [SerializeField, HideInInspector]
    private int health = 100;

    // 由 Odin 显示属性；编辑时通过 setter 校验数值。
    [ShowInInspector]
    public int Health
    {
        get => health;
        set => health = Mathf.Max(0, value);
    }

    // 只有 getter 的计算属性，也可以显示供查看。
    [ShowInInspector]
    public bool IsAlive => health > 0;
}
```

## 3.2 自定义属性 在Inspector窗口显示 自定义方式
如果我们不想要Unity默认的绘制方式去显示 自定义数据结构类 相关内容
我们也可以完全自定义布局方式
主要知识点：
1.SerializedProperty.FindPropertyRelative(属性)
2.serializedObject.FindProperty(属性.子属性)

# 四、字典属性
## 4.1 如何在Inspector窗口编辑字典成员
1. Unity默认是不支持Dictionary在Inspector窗口被显示的，我们可以利用两个List（或数组）成员来间接设置Dictionary

2. **可以选择odin插件**
```C#
public class DictionaryExample : SerializedMonoBehaviour
{
    // 由 Odin 序列化字典，保存 Inspector 中配置的键值。
    [DictionaryDrawerSettings(KeyLabel = "名称", ValueLabel = "数量")]
    public Dictionary<string, int> items = new Dictionary<string, int>();
}
//SerializedMonoBehaviour是 Odin 提供的组件基类，可以理解为“带 Odin 序列化能力的 MonoBehaviour”。
//它本身继承自 Unity 的 MonoBehaviour。
```

3. 新版本的Unity6.6支持字典在Inspector窗口显示
```C#
// 显式启用字典序列化，Inspector 自动显示键值编辑界面。
    [SerializeField]
    private Dictionary<string, int> items = new Dictionary<string, int>();
```

## 4.2 ISerializationCallbackReceiver接口
该接口是Unity提供的用于序列化和反序列化时执行自定义逻辑的接口，
实现该接口的类能够在对象被序列化到磁盘或从磁盘反序列化时执行一些额外代码。
接口中函数：
- OnBeforeSerialize: 在对象被序列化之前调用
- OnAfterDeserialize: 在对象从磁盘反序列化后调用

由于我们需要用两个List存储Dictionary的具体值，
相当于字典中的真正内容是存储在两个List中的，
所以我们需要在
- OnBeforeSerialize序列化之前：将Dictionary里的数据存入List中进行序列化，
- OnAfterDeserialize反序列化之后：将List中反序列化出来的数据存储到Dictionary中。

## 4.3 利用两个List在Inspector窗口中自定义Dictionary显示
由于我们在Inspector窗口中显示的信息的数据来源是List，
因此我们只需要利用List在Inspector窗口中自定义显示即可。

