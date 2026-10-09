---
title: Python 包管理：pip、模块导入与虚拟环境
date: 2026-09-23
permalink: 2026/09/23/python-pip-packages-environments/
description: 整理 pip 安装、卸载和依赖导出命令，区分模块、包与库，并记录模块查找、虚拟环境及安装后无法导入的排查方法。
categories:
  - Python
tags:
  - Python
  - pip
  - 包管理器
  - 虚拟环境
study_order: 4
---
# pip 与包管理

## 一、pip 是什么

一句话：**pip 是 Python 的"应用商店"**，一条命令装别人写好的库。

类比：做菜不用从种菜开始，直接点外卖（`pip install`）送到厨房。

### 常用命令

```bash
pip install requests            # 装
pip uninstall requests          # 卸
pip list                        # 看装了啥
pip install requests==2.28.0    # 装指定版本
pip freeze > requirements.txt   # 导出依赖清单
pip install -r requirements.txt # 按清单还原环境
```

---

## 二、包 / 库 / 模块 / 第三方

### 精确含义

| 词     | 精确含义                 | 类比       |
| ------ | ------------------------ | ---------- |
| 模块   | 一个 `.py` 文件          | 一本书     |
| 包     | 一个文件夹（含多个模块） | 一个书架   |
| 库     | 口语，泛指代码集合       | 一个图书馆 |
| 第三方 | 非官方、需 pip 安装      | 别人写的   |

### 代码来源三类

| 类别     | 谁写的      | 例子                 | 要不要装  |
| -------- | ----------- | -------------------- | --------- |
| 标准库   | Python 官方 | `os`、`math`         | 不用装    |
| 第三方库 | 别人        | `requests`、`pandas` | 要 pip 装 |
| 自己写的 | 你          | `tools.py`           | 自己管    |

### 一张图

```
第三方库（口语，泛指一堆代码）
   └── 第三方包（文件夹，可 import）
          └── 第三方模块（单个 .py 文件）
```

---

## 三、Python 找包顺序

```
1. 当前目录
2. sys.path 里的目录（标准库 + 第三方库 + PYTHONPATH）
3. 找不到 → ModuleNotFoundError
```

### 为什么"装了却 import 不到"？

**99% 是因为"装包的 pip"和"跑代码的 Python"不是同一个。**

类比：把书放进了家里的书架，人却在公司找书。

### 排查命令

```bash
which python    # 看当前用哪个 python（Mac/Linux）
where python    # Windows
which pip       # 看 pip 指向哪
python -c "import sys; print(sys.path)"
```

### 虚拟环境

**虚拟环境 = 给每个项目一个专属货架**，避免版本打架。

```bash
python -m venv venv          # 创建
source venv/bin/activate     # 激活（Mac/Linux）
venv\Scripts\activate        # 激活（Windows）
```

---

## 四、实战场景

- 做数据分析：`pip install pandas numpy`
- 做爬虫：`pip install requests scrapy`
- 做 Web：`pip install django flask`
- 做 AI：`pip install torch transformers`
- 团队协作：`requirements.txt` 还原环境