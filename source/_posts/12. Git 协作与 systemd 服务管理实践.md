---
title: Git 协作与 systemd 服务管理实践
date: 2026-08-29 21:00:00
permalink: 2026/08/29/8月29日 笔记/
description: 记录仓库克隆、忽略规则和 Git 协作中的问题，以及 systemd 服务管理的实践。
study_order: 5
tags:
  - Git
  - GitHub
  - gitignore
  - systemd
categories:
  - 开发工具
---


## 一、遇到的问题

### 【1】从 GitHub 上拉取源代码

#### 1、用 HTTPS 直接克隆：

公开仓库，不用配任何凭证

但不能 push

```bash
cd ~/    # 或者你想放项目的目录
git clone https://github.com/dubingjie/touchFish.git
```

#### 2、用 SSH 方式：

```bash
# 1. 把公钥加到 GitHub（如已加过可跳过）
cat ~/.ssh/id_ed25519.pub
# 复制输出内容，到 GitHub → Settings → SSH and GPG keys 里 New SSH key 粘贴

# 2. 测试连接（看到 "Hi dubingjie! You've successfully authenticated" 即成功）
ssh -T git@github.com

# 3. 用 SSH 地址克隆
git clone git@github.com:dubingjie/touchFish.git
```



### 【2】依赖安装

```bash
# 1. 进入项目，创建虚拟环境
cd ~/touchFish
python3 -m venv .venv

# 2. 安装依赖（fastapi + uvicorn）
.venv/bin/pip install -r backend/requirements.txt

# 3. 启动后端（单端口模式，后端直接托管前端）
cd backend
../.venv/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8001
```



### 【3】改端口

API 请求会自动发到页面所在的地址和端口

```js
const API = location.origin;
```



### 【4】systemd 服务

打开Linux，要执行一次启动命令：

```bash
cd ~/touchFish/backend
../.venv/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8001
```



每次开机都要敲一遍很麻烦，可以把它做成 systemd 服务，实现开机自动启动、崩溃自动拉起。

```ini
# /etc/systemd/system/touchfish.service
[Unit]
Description=touchFish backend
After=network.target

[Service]
WorkingDirectory=/root/touchFish/backend
ExecStart=/root/touchFish/.venv/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8001
Restart=always

[Install]
WantedBy=multi-user.target
```



然后：

```bash
systemctl daemon-reload
systemctl enable --now touchfish   # 立即启动 + 开机自启
```



日常管理命令（改代码后需要重启时用）：

```bash
systemctl restart touchfish   # 重启
systemctl status touchfish    # 查看状态
systemctl stop touchfish      # 停止
journalctl -u touchfish -f    # 看实时日志
```



### 【5】桥接 和 NAT 的区别

#### 1、NAT 模式（默认）：

- 虚拟机"藏"在 Windows 后面，借用 Windows 的身份上网。
- 虚拟机没有局域网里独立的 IP，它和 Windows 之间是 VMware 内部搭的一个小网络，Windows 扮演"路由器"的角色给它做地址转换。
- 结果：虚拟机可以主动访问外网和局域网（单向出去没问题），但局域网里其他机器（包括  Windows 自己）没法主动找到虚拟机——因为它没有独立地址。
- 想让 Windows 访问 NAT 模式下的虚拟机，就得手动做端口转发：告诉 VMware "Windows 的 8001 端口收到的请求，转交给虚拟机"。这就是要用 SSH 端口转发的原因——在那种网络模式下这是唯一的路。

#### 2、桥接模式

- VMware 把虚拟机的网卡直接"桥接"到 Windows 的真实物理网卡上，相当于虚拟机直接插到了家里的路由器/交换机上。
- 路由器给虚拟机单独分配一个局域网 IP（就是 192.168.3.180），和 Windows 平起平坐。
- 结果：局域网里任何设备（Windows、手机、其他电脑）都能直接访问虚拟机，就像访问一台真实存在的独立电脑一样。



### 【6】.gitignore 文件

#### 1、.gitignore 文件 是什么？

.gitignore 是交给 git 的一张**"名单"**，名单上写的文件/文件夹，git 一律无视——git add . 时不会加进去，也就不会上传到 GitHub。

```bash
# 例如
.venv/              # 整个文件夹忽略
__pycache__/        # 整个文件夹忽略
backend/data.json   # 忽略这个具体文件
*.log               # 忽略所有 .log 结尾的文件
```



#### 2、什么时候用？

**凡是"不该进仓库"或"没必要进仓库"的东西，都放进去。具体三类：**

1. 会自动生成的

   • Python 的 .venv/ 虚拟环境（几百 MB，每个人 clone 后自己建，内容还和操作系统有关）

   • __pycache__/ 缓存（Python 运行自动生成）

   • 前端项目里的 node_modules/

2. 包含隐私或机密的

    • .env 文件（里面通常是数据库密码、API 密钥）
    • 配置文件里的账号密码

3. 每台机器各自不同的（传上去会互相覆盖）

   backend/data.json 摸鱼存档——它在 Windows 和虚拟机上是两份不同的数据，一旦入 git，两边同步时互相覆盖



#### 3、怎么用？

放在项目根目录（和 .git 文件夹同级），文件名必须正好是 .gitignore



#### 4、怎么知道该放什么？

有通用模板，不用自己想（蛮有意思的。。。）

• GitHub 新建仓库时，有个 Add .gitignore 下拉框，选 Python 就自动生成一份 Python 项目的标准名单
• 网上搜 "python gitignore" 能找到官方推荐模板
• 踩过一次坑就记住了（比如有人把 500MB 的 venv 传上仓库，clone 到怀疑人生，这辈子都不会忘）



### 【7】前端工具库

不用手写，用 npm 下载

下载来的所有第三方库，全部装进项目目录下的一个文件夹里——这就是 node_modules/

- 用 Vue / React 搭界面
- 用 ECharts 画图表
- 用 lodash 处理数据



项目的 package.json 文件（相当于 Python 的 requirements.txt）



执行 npm install，npm 照着清单自动下载生成 node_modules/



| Python 世界      | Node.js 前端世界 |
| ---------------- | ---------------- |
| requirements.txt | package.json     |
| pip install      | npm install      |
| .venv/           | node_modules/    |



### 【8】Windows ---> GitHub ---> Linux

#### 1、Windows 侧：把项目推到 GitHub

第 1 步：在 GitHub 网页建仓库

第 2 步：在 Git Bash 里推送

```bash
git config --global user.name "dubingjie"
git config --global user.email "GitHub注册邮箱"
git init
git add .
git commit -m "xxx"
git branch -M main
git remote add origin https://github.com/dubingjie/touchFish.git
git push -u origin main
```

第 4 步：以后每次改代码同步

```bash
git add .
git commit -m "说明改了什么"
git push
```

补充：以后新建的仓库都默认用 main

```bash
git config --global init.defaultBranch main
```



#### 2、虚拟机侧：配 SSH key，免密拉代码

```bash
ssh-keygen -t ed25519        # 一路回车
cat ~/.ssh/id_ed25519.pub    # 复制这串公钥
git clone git@github.com:dubingjie/touchFish.git
```

把公钥粘贴到 GitHub → Settings → SSH keys。

之后 git clone git@github.com:账号/touchFish.git 就不需要密码了。

