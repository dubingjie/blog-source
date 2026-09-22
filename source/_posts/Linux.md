---
title: Linux 常用命令：文件、工具与系统管理
date: 2026-08-23 14:00:00
permalink: 2026/08/23/Linux/
description: 整理工具安装、文件操作、命令帮助与系统管理中常用的 Linux 命令。
study_order: 1
tags:
  - Linux
categories:
  - Linux 与网络
---


查看是否安装：--version

```bash
git --veresion
gh --version
```

查看安装路径：

```bash
which git
```

安装gh：

```bash
sudo apt install gh

# 登录
gh auth login

# 查看状态（是否登录成功）
gh auth status

# 创建公开仓库
gh repo create my-project --public

#上传代码
git init
git add
git commit
```

查看安装路径：

```bash
# 查看安装路径用 which
which git
which gh
```

常用的文件操作命令：

```bash
# 显示当前所在目录
pwd

# 显示当前用户名
whoami

# 列出当前目录内容
ls

# 详细格式列出内容（行首 d 是文件夹，- 是文件）
ls -l

# 显示所有文件，包括隐藏文件（. 开头的）
ls -a

# 创建名为 practice 的文件夹
mkdir practice

# 进入 practice 文件夹
cd practice

# 回到家目录
cd ~

# 回到上一级目录
cd ..

# 创建一个空文件
touch hello.txt

# 一次创建多个空文件
touch a.txt b.txt

# 写入内容到文件（覆盖原有内容）
echo "hello linux" > hello.txt

# 追加一行内容到文件末尾
echo "second line" >> hello.txt

# 查看文件内容
cat hello.txt

# 复制文件
cp hello.txt backup.txt

# 复制文件夹及其所有内容（必须加 -r）
cp -r notes notes_backup

# 把文件移动进文件夹
mv day1.txt notes/

# 一次移动多个文件进文件夹（最后一个是目标文件夹）
mv day1.txt day2.txt notes/

# 文件改名（移动和改名是同一个命令）
mv wed.txt wed_backup.txt

# 删除文件（没有回收站，删前先 ls 确认）
rm backup.txt

# 删除空文件夹（最安全的删法）
rmdir week2_extra

# 删除文件夹及里面所有内容（危险，想清楚再敲）
rm -r notes_backup

# 不进入文件夹，直接查看里面的内容
ls notes/

# 用 .. 往上走两层再查看 week2（相对路径）
ls ../../week2

# 用绝对路径查看（在任何位置都有效）
ls /home/dubingjie/practice/study_plan/week2

# 用 ~ 代表家目录写路径
ls ~/practice/study_plan/week2

# 查看敲过的所有命令历史
history

# 清屏（快捷键 Ctrl + L 效果相同）
clear

# 查看某命令是内部命令还是外部程序
type cd

# 查看内部命令的帮助
help cd

# 查看外部命令的简要帮助
ls --help

# 查看外部命令的完整手册（按 q 退出）
man ls
```

其他一些命令：

```bash
# 重启虚拟机
reboot
# 查看虚拟机的网络配置文件内容
cat /etc/netplan/50-cloud-init.yaml
```

