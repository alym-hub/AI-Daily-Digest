# AI Daily Digest

一个放在桌面上的 AI / 计算机新闻摘要小项目，适合用来练 Python、整理学习记录，也适合作为 GitHub 主页项目展示。

## 怎么打开

直接双击 `index.html`，就能看到好看的本地网页界面。

## 怎么生成 Markdown 摘要

在这个文件夹里运行：

```bash
python generate_digest.py
```

脚本会读取 `data/sample-news.json`，生成 `digest.md`。

## 你可以继续升级

- 把 `sample-news.json` 换成你每天看到的 AI 新闻。
- 给 `generate_digest.py` 加上真实 RSS 抓取。
- 上传到 GitHub，作为你的第一个 AI 学习项目。
- 给 GitHub 个人主页 README 放一张这个项目的截图。
