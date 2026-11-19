# 魔法尚未编译

澈酱的游戏开发日志。Astro + Markdown 静态博客。

## 本地查看

使用 Node.js 24，首次运行 `npm install`，然后运行 `npm run dev`，打开终端显示的本地地址。`npm run build` 生成静态网站；`npm run preview` 预览构建结果。

## 写一篇笔记

复制 `templates/note.md` 到 `src/content/notes/英文短标题.md`，填写元数据并编写正文。文件名决定文章网址。发布时设 `draft: false`。示例文章的 `sample: true` 会显示示例提示；写成真实内容后改为 `false`。

日期使用带引号的 `YYYY-MM-DD`。分类可自行新增，筛选按钮会自动生成。支持 Markdown 标题、列表、图片和带语言名的代码块。正文二三级标题会自动进入目录。

图片存到 `public/images/`。个人主页仓库中可以使用 `/images/图片名.jpg`；项目子目录部署时，文章中图片路径应包含仓库前缀。

## GitHub Pages 发布

项目尚未上传或发布。推荐创建 `chejiang0711.github.io` 仓库，上传项目到 `main` 分支，然后在 Settings → Pages → Build and deployment 中选择 GitHub Actions。已有同名网站时先核对原内容，不要覆盖。

工作流会自动构建和发布。个人主页仓库对应 `https://chejiang0711.github.io/`；其他仓库对应 `https://chejiang0711.github.io/仓库名/`，配置会从 GitHub Actions 环境自动识别仓库名。

部署配置参考：https://docs.astro.build/en/guides/deploy/github/

## 修改外观

- `src/styles/global.css`：配色、排版、响应式布局。
- `src/pages/index.astro`：首页。
- `src/pages/about.astro`：个人简介。
- `public/images/hero.jpg`：用户提供的首页参考图；原作者信息尚未核实。

首页的 GitHub 链接使用 `chejiang0711`。初版不含评论、后台或访客统计。
