export const categoryStyle = (name: string) => {
  const groups: Record<string, [string, string]> = {
    'UI':['◇','#a788c5'], '编辑器拓展':['⚙','#8baac1'], '数据持久化':['▤','#b59b78'],
    '网络模块':['⇄','#7baea5'], 'Shader开发':['✦','#ba8db6'], '编程语言':['{}','#8d9bc3'],
    '算法':['⌘','#a4aa77'], '游戏引擎':['△','#8cae97'], '热更新':['↻','#c49683'],
    '设计模式':['▧','#a492be'], '移动平台开发':['▯','#86a5ae'], 'MVC框架':['⊞','#a99f81'],
    '程序基础小框架（新版本）':['⊡','#999bc0']
  };
  const [icon, color] = groups[name] || ['✧','#ab90be'];
  return { icon, color };
};
