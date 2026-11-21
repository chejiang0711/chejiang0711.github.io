// 将 Markdown 文本中的软换行转换为显式换行，不处理代码和原始 HTML。
export default function remarkSoftBreaks() {
  return function transform(tree) {
    function visit(node) {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.flatMap(child => {
        if (child.type !== 'text') {
          visit(child);
          return [child];
        }
        const lines = child.value.split(/\r\n|\r|\n/);
        if (lines.length === 1) return [child];
        return lines.flatMap((value, index) =>
          index === 0 ? [{ type: 'text', value }] :
            [{ type: 'break' }, { type: 'text', value }]
        );
      });
    }
    visit(tree);
  };
}
