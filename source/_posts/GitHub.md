---
title: 如何将代码推送到GitHub
date: 2026-08-12 18:00:00
tags:
  - git
  - github
categories:
  - 简单git命令
---

## 一、github推送

### 【1】推送过程

#### 1、进入项目目录

```bash
cd /d/Project/PythonProject/study
```

#### 2、初始化 git 仓库

只第一次运行，重复运行无害

作用：把这个文件夹变成 Git 本地仓库

```bash
git init
```

#### 3、关联远程 GitHub 仓库

```bash
git remote add origin https://github.com/dubingjie/pyTest.git
```

如果之前绑定错地址，先执行这条清除旧地址：

```bash
git remote remove origin
```

查看当前绑定远程地址：

```bash
git remote -v
```

#### 4、将所有文件加入暂存区

. 代表当前目录全部文件

想单独添加某个文件：git add test.py

```bash
git add .
```

#### 5、提交到本地仓库

必须写提交备注

```bash
git commit -m "第一次上传代码"
```

#### 6、推送到 GitHub 远程仓库

第一次推送：

-u = --set-upstream 绑定本地分支和远程分支，只首次推送需要

```bash
git push -u origin master
```

后续再次更新代码，只需要简写：

```bash
git push
```

#### 7、完整流程

```bash
# 1. 添加修改文件
git add .
# 2. 本地提交，写更新说明
git commit -m "更新：新增xxx功能"
# 3. 推送到github
git push
```

#### 8、常用命令

```bash
# 查看当前在哪条分支
git branch

# 查看远程仓库地址
git remote -v

# 查看提交记录，确认有没有commit成功
git log

# 查看文件修改状态
git status
```

