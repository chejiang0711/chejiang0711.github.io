export default function remarkNoteStructure() {
  return tree => {
    let hasTopHeading = false;
    function scan(node) {
      if (node.type === 'heading' && node.depth === 1) hasTopHeading = true;
      node.children?.forEach(scan);
    }
    scan(tree);
    function visit(node) {
      if (hasTopHeading && node.type === 'heading') node.depth = Math.min(6, node.depth + 1);
      // 兼容 Obsidian 中常见的语言写法，仅影响高亮，不修改代码文本。
      if (node.type === 'code' && node.lang) {
        const aliases = { 'c#': 'csharp', 'c++': 'cpp' };
        const lang = node.lang.toLowerCase();
        node.lang = aliases[lang] || lang;
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
