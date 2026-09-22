# LinX 的学习博客

Hexo + 本地定制 Aerlume，发布地址 https://dubingjie.github.io 。

## 本地预览

需要 Node.js 22。首次运行 npm ci，再运行 npm run server -- --ip 127.0.0.1。Windows 也可运行 preview.cmd：优先使用 PATH 中的 Node，没有时使用本机的便携版。访问 http://127.0.0.1:4000 。

## 构建与检查

npm run clean
npm run build
npm run check

## 内容维护

文章位于 source/_posts。title 是展示标题；permalink 固定已有网址，修改标题后不要随意修改 permalink。description 写简短摘要。categories 选择 Python、开发工具、Linux 与网络、Web 与接口、数据库与容器之一。study_order 决定同专题内的学习顺序，首页依旧按日期倒序。新文章可以用 npx hexo new post "标题" 创建。正文从二级标题开始，代码块标记正确的语言。

## 外观维护

主题源码固定在 themes/aerlume，来源版本与许可证见其中的 UPSTREAM.md 和 LICENSE。主要定制：layout 模板、source/css/linx.css、source/js/linx.js、scripts/linx.js。原 Stellar 配置保留于 legacy/stellar，当前不加载。

## 发布边界

仅本地预览、构建不会发布。现有工作流在 main 分支推送或手动触发时构建并部署到 dubingjie.github.io。确认预览后再合并及发布；不要为预览运行 npm run deploy。
