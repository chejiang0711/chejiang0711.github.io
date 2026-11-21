import remarkSoftBreaks from './src/lib/remark-soft-breaks.mjs';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
// 兼容个人主页仓库和项目仓库，避免部署到子目录后资源失效。
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
export default defineConfig({
  site: 'https://chejiang0711.github.io',
  base: repo && repo !== 'chejiang0711.github.io' ? `/${repo}` : '/',
  trailingSlash: 'always',
  // 与 Obsidian 的普通换行习惯保持一致，空行仍用于分段。
  markdown: { processor: unified({ remarkPlugins: [remarkSoftBreaks] }), shikiConfig: { theme: 'github-dark', transformers: [{ pre(node) { node.properties['data-language'] = this.options.lang; } }] } },
});
