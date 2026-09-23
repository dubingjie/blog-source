---
title: Python 文件操作：读写模式、异常处理与推导式
date: 2026-09-23
permalink: 2026/09/23/python-file-io-exceptions-comprehensions/
description: 整理文件打开模式、读取与写入、指针操作和字符串拆分连接，并归纳异常处理、断言、推导式、矩阵转置与生成器表达式。
categories:
  - Python
tags:
  - Python
  - 文件操作
  - 异常处理
  - 推导式
  - 生成器
study_order: 8
---
# Python 文件操作与进阶知识总结

## 一、文件打开模式

| 模式 | 可读 | 可写 | 打开时行为         | 用途           |
| ---- | ---- | ---- | ------------------ | -------------- |
| `r`  | 是   | 否   | 文件必须存在       | 读文本         |
| `w`  | 否   | 是   | 清空文件           | 覆盖写         |
| `a`  | 否   | 是   | 光标在末尾         | 追加写         |
| `r+` | 是   | 是   | 不清空，光标在开头 | 读写           |
| `rb` | 是   | 否   | 二进制读           | 图片/音频/视频 |
| `wb` | 否   | 是   | 二进制写（清空）   | 保存二进制文件 |

要点

- 文本文件用 `r/w/a`，二进制文件用 `rb/wb`
- 图片、音频、视频、压缩包必须用二进制模式
- 用文本模式读二进制会报：`'utf-8' codec can't decode byte 0xff...`
- 二进制读到的是 `bytes` 对象，形如 `b'\xff\xd8\xff\xe0...'`

---

## 二、文件读取方法

| 方法             | 作用                      | 返回类型 |
| ---------------- | ------------------------- | -------- |
| `fp.read()`      | 读全部（等价 `read(-1)`） | `str`    |
| `fp.read(n)`     | 读 n 个字符               | `str`    |
| `fp.readline()`  | 读一行                    | `str`    |
| `fp.readlines()` | 读所有行                  | `list`   |
| `for line in fp` | 逐行迭代                  | `str`    |

要点

- `read(n)` 单位是字符，从当前光标往后读
- 连续 `read(n)` 是分段往后读
- 文件指针只往前走，读完再读返回空
- 想重新读用 `fp.seek(0)`

---

## 三、文件指针操作

| 方法                  | 作用                                 |
| --------------------- | ------------------------------------ |
| `fp.tell()`           | 查看当前指针字节位置                 |
| `fp.seek(位置)`       | 移动到指定位置                       |
| `fp.seek(0)`          | 回到开头                             |
| `fp.seek(偏移, 起点)` | 起点：`0` 开头 / `1` 当前 / `2` 末尾 |

要点

- `tell()` 和 `seek()` 都按字节算
- 中文在 UTF-8 下占 3 个字节
- 文本模式下 `seek` 只建议用 `seek(0)`
- 二进制模式 `rb` 下可随意 `seek`

---

## 四、文件写入方法

| 方法                  | 参数       | 自动换行     |
| --------------------- | ---------- | ------------ |
| `fp.write(s)`         | 一个字符串 | 否           |
| `fp.writelines(list)` | 一个列表   | 否           |
| `fp.writable()`       | 无         | 判断是否可写 |

要点

- `write` 和 `writelines` 都不自动加换行，要换行自己写 `\n`
- `writelines` 标准用法是传列表
- `with` 块内可连续多次 write
- `w` 模式打开即清空文件

---

## 五、join 与 split

join：列表转字符串

```python
"|".join(["dream", "521", "18"])   # "dream|521|18"
```

- 分隔符只在元素之间出现，末尾不会多
- 只能拼接字符串列表，有数字要先转：`"|".join(str(x) for x in lst)`

split：字符串转列表

```python
"dream|521|18".split("|")   # ["dream", "521", "18"]
```

末尾分隔符的坑

```python
"dream|521|18|男|ok|".split("|")
# ['dream', '521', '18', '男', 'ok', '']   末尾多个空串
```

建议写入用 `"|".join(...)`，读取就能干净地拆。

---

## 六、异常处理

语法框架

```python
try:
    # 可能出错的代码
except 异常类型:
    # 出错后怎么办
else:
    # 没出错时执行（可选）
finally:
    # 无论如何都执行（可选）
```

四个关键字

| 关键字    | 作用           |
| --------- | -------------- |
| `try`     | 试着执行       |
| `except`  | 捕获异常       |
| `else`    | 没出错时执行   |
| `finally` | 无论如何都执行 |

执行顺序

- 出错：走 `except`，不执行 `else`
- 没出错：不执行 `except`，走 `else`
- `finally` 永远执行

常见异常

| 异常                | 触发场景                        |
| ------------------- | ------------------------------- |
| `ValueError`        | 类型对但值不对，如 `int("abc")` |
| `TypeError`         | 类型不对，如 `1 + "a"`          |
| `ZeroDivisionError` | 除以 0                          |
| `IndexError`        | 列表下标越界                    |
| `KeyError`          | 字典键不存在                    |
| `FileNotFoundError` | 文件不存在                      |
| `AttributeError`    | 对象没有该属性/方法             |

使用原则

- 精确捕获具体异常，别用 `except: pass`
- `finally` 做收尾
- 用 `raise` 主动报业务错误

---

## 七、assert 断言

语法

```python
assert 条件, "异常信息"
```

等价于

```python
if not 条件:
    raise AssertionError("异常信息")
```

与 raise 对比

|          | `raise`              | `assert`              |
| -------- | -------------------- | --------------------- |
| 写法     | `if not 条件: raise` | `assert 条件, "信息"` |
| 异常类型 | 自定义               | 固定 `AssertionError` |
| 用途     | 正式错误拦截         | 调试 / 内部检查       |
| 能否禁用 | 不能                 | 能（`python -O`）     |

正式错误检查用 `raise`，`assert` 只用于调试。

---

## 八、推导式

三种类型

| 类型       | 符号 | 语法                               | 结果   |
| ---------- | ---- | ---------------------------------- | ------ |
| 列表推导式 | `[]` | `[表达式 for x in 可迭代 if 条件]` | `list` |
| 字典生成式 | `{}` | `{键: 值 for x in 可迭代 if 条件}` | `dict` |
| 集合推导式 | `{}` | `{表达式 for x in 可迭代 if 条件}` | `set`  |

字典和集合都用 `{}`，区别是有没有冒号 `:`。

万能翻译

```python
[表达式 for x in 可迭代 if 条件]
```

等价于

```python
result = []
for x in 可迭代:
    if 条件:
        result.append(表达式)
```

if 与 if-else 的位置

```python
[i for i in range(10) if i % 2 == 0]              # if 在后面，筛选
["偶" if i % 2 == 0 else "奇" for i in range(5)]  # if-else 在前面，变换
```

多个 for 的顺序

```python
[i * j for i in num_one for j in num_two]
```

从左到右，从外到内，先外后内。

等价于

```python
for i in num_one:        # 外层
    for j in num_two:    # 内层
        ...
```

嵌套推导式

```python
[[line[i] for line in res] for i in range(len(res[0]))]
```

- 外层 `[]` 的 for 是外层循环
- 内层 `[]` 是内层循环

"左边是外层"只适用于同一方括号里并列的多个 for。

笛卡尔积与一一配对

| 写法                          | 逻辑       | 结果个数              |
| ----------------------------- | ---------- | --------------------- |
| `[i*j for i in A for j in B]` | 交叉相乘   | `len(A) × len(B)`     |
| `[a*b for a,b in zip(A,B)]`   | 同位置配对 | `min(len(A), len(B))` |

---

## 九、矩阵转置

原始数据

```python
res = [[1, 2, 3, 4],
       [5, 6, 7, 8],
       [9, 10, 11, 12]]   # 3 行 4 列
```

转置思路

固定一列，把每一行在该列的元素收集起来，成为新的一行。

三种写法

```python
# 写法 1：双重 for
num_list = []
for i in range(len(res[0])):
    inner = []
    for line in res:
        inner.append(line[i])
    num_list.append(inner)

# 写法 2：嵌套推导式
num_list = [[line[i] for line in res] for i in range(len(res[0]))]

# 写法 3：zip（推荐）
num_list = [list(col) for col in zip(*res)]
```

结果

```python
[[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]   # 4 行 3 列
```

zip 要点

- `zip` 每次返回的是元组
- `list(col)` 把元组转成列表
- `zip(*res)` 中的 `*` 是解包

| 写法                               | 每个元素类型 | 结果                       |
| ---------------------------------- | ------------ | -------------------------- |
| `list(zip(*res))`                  | `tuple`      | `[(1,5,9), (2,6,10), ...]` |
| `[list(col) for col in zip(*res)]` | `list`       | `[[1,5,9], [2,6,10], ...]` |

---

## 十、生成器表达式

语法

```python
(i for i in range(10) if i % 2 == 0)   # 圆括号
```

与列表推导式对比

| 写法                     | 类型         | 特点                         |
| ------------------------ | ------------ | ---------------------------- |
| `[i for i in range(10)]` | 列表推导式   | 立刻算全部，占内存           |
| `(i for i in range(10))` | 生成器表达式 | 懒计算，用一个取一个，省内存 |

特点

- 打印出来是 `<generator object <genexpr> at 0x...>`
- 只能用一次

```python
gen = (i for i in range(5))
print(list(gen))   # [0,1,2,3,4]
print(list(gen))   # []  空了
```

- 取值方式

```python
list(gen)         # 全部取出
for i in gen:     # 遍历
next(gen)         # 一个一个取
```

为什么用生成器

省内存。处理海量数据时，生成器一次只留一个元素，列表则要全部存内存。

---

## 十一、速查表

读取方法

| 方法             | 返回   | 单位     |
| ---------------- | ------ | -------- |
| `read()`         | `str`  | 全部     |
| `read(n)`        | `str`  | n 个字符 |
| `readline()`     | `str`  | 一行     |
| `readlines()`    | `list` | 所有行   |
| `for line in fp` | `str`  | 一行     |

模式对比

| 模式 | 读   | 写   | 清空 |
| ---- | ---- | ---- | ---- |
| `r`  | 是   | 否   | 否   |
| `w`  | 否   | 是   | 是   |
| `a`  | 否   | 是   | 否   |
| `r+` | 是   | 是   | 否   |

推导式对比

| 类型         | 符号        | 结果        |
| ------------ | ----------- | ----------- |
| 列表推导式   | `[]`        | `list`      |
| 字典生成式   | `{k:v ...}` | `dict`      |
| 集合推导式   | `{x ...}`   | `set`       |
| 生成器表达式 | `()`        | `generator` |

---

## 十二、核心记忆口诀

1. 文本用 `r/w/a`，二进制用 `rb/wb`
2. 文件指针只往前走，回头要用 `seek(0)`
3. `tell/seek` 按字节算，中文占 3 字节
4. `write/writelines` 都不自动换行，要换行自己加 `\n`
5. `join` 末尾不多个分隔符，`split` 遇末尾分隔符会多空串
6. 异常四件套：`try / except / else / finally`
7. `assert` 是 `if not ... raise` 的简写，`-O` 会禁用
8. 推导式多个 for：从左到右，从外到内
9. `zip` 吐元组，要列表就 `list()`
10. 生成器省内存，但只能用一次