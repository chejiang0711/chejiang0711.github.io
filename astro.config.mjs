import { defineConfig } from 'astro/config';
// 兼容个人主页仓库和项目仓库，避免部署到子目录后资源失效。
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
export default defineConfig({
  site: 'https://chejiang0711.github.io',
  base: repo && repo !== 'chejiang0711.github.io' ? `/${repo}` : '/',
  trailingSlash: 'always',
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
