---
title: Git 随手笔记
date: 2026-08-16 18:00:00
tags:
  - git
  - github
categories:
  - Git
---



# Git 随手笔记

1、git restore --staged <file>——效果和

git reset HEAD <file> 一样，都是取消暂存。

2、在当前所在的位置，新建文件夹

```bash
$ mkdir learngit
```

3、打印当前工作目录，把当前完整路径显示出来。

```bash
$ pwd
/Users/michael/learngit
```

4、ls（列出当前文件夹里的内容）、cd ..（退回上一级文件夹）



5、把仓库强制回退到指定的某次历史提交

```bash
$ git reset --hard 1094a
HEAD is now at 83b0afe append GPL
```

git reset 有三个模式，区别在于"回退之后，工作区和暂存区的文件怎么办"：

- --soft：只移动指针，文件一个字节都不动，回退掉的改动还留着且已暂存
- --mixed（默认）：移动指针，改动保留在工作区但未暂存
- --hard：移动指针，并且把工作区文件强制覆盖成那次提交的内容——未提交的本地修改直接丢弃，找不回来

```bash
git log
git reflog
```

6、cat readme.txt 的意思是：把 readme.txt 这个文件的内容显示在终端里

7、好难懂的 diff 啊！！？？

```bash
$ git diff HEAD -- readme.txt
diff --git a/readme.txt b/readme.txt
index 76d770f..a9c5755 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,4 +1,4 @@
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
-Git tracks changes.
+Git tracks changes of files.
```

a/ 代表旧版本（HEAD 里的），b/ 代表新版本（工作区的）

```bash
git diff                  # 工作区 vs 暂存区
git diff --cached         # 暂存区 vs 版本库（HEAD）
git diff HEAD             # 工作区 vs 版本库（HEAD）
git diff HEAD -- readme.txt   # 同上，但只看 readme.txt 这一个文件
```

```bash
# 1. 改一行 readme.txt，然后看"工作区 vs 暂存区"
git diff
# → 能看到改动（因为工作区新，暂存区旧）

# 2. add 之后再执行同一个命令
git add readme.txt
git diff
# → 什么都不显示！因为工作区和暂存区现在一样了

# 3. 这时看"暂存区 vs 版本库"
git diff --cached
# → 能看到改动（暂存区比 HEAD 新）

# 4. commit 之后
git commit -m "test"
git diff
git diff --cached
git diff HEAD
# → 三个全都不显示！因为三个区内容完全一致了
```

8、git checkout 和git reset 都怎么用，有什么区别

git checkout   — 本意是"切换"，兼职能"还原文件"

```bash
git checkout dev        # 切换到 dev 分支
git checkout -b dev     # 创建 dev 分支并切换过去

# 把工作区的文件还原
git checkout -- readme.txt
```

git reset  — 本意是"移动 HEAD 指针，回退历史"

```bash
# 回退版本
git reset --hard HEAD^      # 回退到上一个版本
git reset --hard 1094a      # 回退到指定提交

# 把文件从暂存区撤出来（取消 add）
git reset HEAD readme.txt
# 你 git add 错了文件，想从暂存区拿掉，但工作区的修改保留
```

HEAD^ 表示上一个提交，HEAD^^ 上上个，HEAD~100 往前 100 个

```bash
# 场景1：readme.txt 改乱了，想放弃修改（还没 add）
git checkout -- readme.txt     # ✓ 丢弃工作区修改

# 场景2：add 错了，想取消暂存（工作区修改保留）
git reset HEAD readme.txt      # ✓ 从暂存区撤出

# 场景3：commit 错了，想整体回退一个版本
git reset --hard HEAD^         # ✓ 历史和工作区一起回退
```

```bash
# 等价于 git checkout dev（切换分支）
git switch dev

# 等价于 git checkout -b dev（建分支）
git switch -c dev

# 等价于 git checkout -- readme.txt（丢弃工作区修改）
git restore readme.txt

# 等价于 git reset HEAD readme.txt（取消暂存）
git restore --staged readme.txt
```

9、默认分支的切换

让以后 git init 出来的仓库默认就是 main

这一条配完，以后你本地新建的所有仓库，第一个分支就叫 main，和 GitHub 默认保持一致，不会再出现 master。

```bash
git config --global init.defaultBranch main
```

当前仓库把 master 改名成 main

```bash
git branch -m master main
```

```bash
# 推送
git push -u origin main
```

10、从远程库克隆

```bash
cd /d/code              # 1. 先进入父目录

# 2. 克隆，自动创建 gitskills 子目录
git clone git@github.com:你的用户名/gitskills.git

cd gitskills          # 3. 进入克隆下来的项目

ls      # 4. 能看到 README.md 和隐藏的 .git 目录
```

11、分支相关命令

```bash
# 建分支：放一个指向当前提交的新指针，并切过去
git switch -c dev

# 切分支：把 HEAD 挪到 master（瞬间完成）
git switch master

# 合并：把 dev 这条线的成果并到当前分支
git merge dev

# 删分支：摘掉那个指针（提交历史还在）
git branch -d dev
```

```bash
# 查看：列出所有本地分支，带 * 的是当前所在分支
git branch

# 创建：新建一个叫 dev 的分支，但是不会切换
git branch dev
```

```bash
git branch dev       # 创建 dev，但不切换
git switch dev       # 切换到已有的 dev（分支必须已存在）
git switch -c dev    # 创建 dev 并立即切换过去（-c = create）
git checkout dev     # 老版写法，切换到 dev
git checkout -b dev  # 老版写法，创建并切换
```

```bash
git log --graph      # 查看分支合并图。
```

Fast-forward 的含义：

Fast-forward（快进）是 Git 合并分支时的一种最省事的情况：当你要合并的分支只是在你当前分支的基础上往前多走了几步，中间没有分叉时，Git 不需要做任何"合并计算"，直接把当前分支的指针往前挪到目标位置。

--no-ff：故意禁用快进

```bash
git merge --no-ff -m "merge feature1: add xxx功能" feature1
```

12、git stash的含义、用法、场景

git stash 的作用是：把工作区和暂存区里没提交的改动打包存进一个"临时储藏柜"，把工作区还原干净，之后随时可以取出来恢复。

```bash
git stash             # ① 半成品收进柜子，工作区瞬间干净
git switch master     # ② 安心切到 master
git switch -c hotfix  # ③ 建修复分支，改 bug，提交，合并，发布
git switch dev        # ④ 回到 dev 继续干活
git stash pop         # ⑤ 把柜子里的半成品倒出来，接着写
```

stash 用法全览：

```bash
# 最基本的用法
git stash

# 加备注，强烈推荐（柜子里东西多了好认）
git stash -m "写到一半的登录功能"

# 连"未跟踪的新文件"也一起收（默认只收已跟踪文件的改动）
git stash -u 
```

查看柜子里有什么：

```bash
git stash list
# stash@{0}: On dev: 写到一半的登录功能
# stash@{1}: WIP on master: a1b2c3d fix typo
```

从柜子里取出来：

```bash
# 取出最新一份（stash@{0}），取完从柜子里删掉
git stash pop

# 取出最新一份，但柜子里保留副本
git stash apply

# 指定取某一份
git stash apply stash@{1}
```

清理：

```bash
git stash drop stash@{0}  # 删掉某一份
git stash clear           # 清空整个柜子（慎用）
git stash show -p         # 查看某份 stash 里具体改了什么内容
```

13、cherry-pick 介绍：

cherry-pick 是什么

cherry-pick 英文原意是"摘樱桃"——从一堆里只挑自己要的。Git 里它的作用是：把另一个分支上的某一次（或几次）提交，单独"摘"过来，复制到当前分支上。（不是全要，是选取）

```bash
git cherry-pick C4的编号
```

C4' 是 C4 的复制品——改动内容一样，但提交编号变了（因为它嫁接在不同的历史上）。

用法：

```bash
# 1. 先站到"接收方"分支上
git switch master

# 2. 查看 dev 的提交历史，找到想要那个提交的编号
git log dev --oneline

# 3. 把那个提交摘过来
git cherry-pick a1b2c3d      
```

