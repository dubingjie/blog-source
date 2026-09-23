---
title: Python 对象与内存：重新赋值、原地修改和推导式
date: 2026-09-20
permalink: 2026/09/20/python-objects-memory-comprehensions/
description: 通过函数传参示例区分重新赋值与原地修改，记录内存溢出和内存泄漏的区别，以及推导式、字符串拆分和 zip 的用法。
categories:
  - Python
tags:
  - Python
  - 函数
  - 内存
  - 推导式
study_order: 3
---
# 9月20日笔记

主要内容：

1、编程语言排行榜

2、python 中的变量名、内存地址、赋值等

3、内存颗粒（图片）

4、重新赋值和原地修改

5、内存溢出（Out of Memory）



## 【1】重新赋值和原地修改

重新赋值不会影响外面的变量

```python
def test(x):
    x = 100  # 重新赋值，相当于换了把新锁

a = 10
test(a)
print(a)  # 还是 10，外面的 a 没变
```

只有可变对象才能原地修改，而且改了之后外面的变量也会跟着变，因为大家指向的是同一个对象。

```python
def test(lst):
    lst.append(4)  # 原地修改，打开了同一把锁改东西

a = [1, 2, 3]
test(a)
print(a)  # [1, 2, 3, 4] ← 外面的 a 被改了！
```



| 传参类型                  | 函数内重新赋值（`x = ...`） | 函数内原地修改（`.append()` 等） |
| ------------------------- | --------------------------- | -------------------------------- |
| 不可变（int、str、tuple） | 外面不变 ✅                  | 不可变对象没法原地修改 ❌         |
| 可变（list、dict、set）   | 外面不变 ✅                  | 外面会变！ ⚠️                     |

Python 传参传的是引用的副本。函数里重新赋值不会影响外面（不管什么类型），但原地修改可变对象会影响外面。



## 【2】内存溢出

内存溢出：程序需要的内存空间，超过了系统能提供的上限。

- 内存泄漏 = 住了房间不退出（长期问题，慢慢消耗）
- 内存溢出 = 所有房间都用完了（急性结果，程序崩溃）



## 【3】python for 循环升级



```python
# for user_info in user_data.values():
#     data = '|'.join([str(value) for value in user_info.values()])
#     print(data)
#
# data = ['|'.join([str(value) for value in user_info.values()]) for user_info in user_data.values()]
#
# print(data)
```



```python
with open("1.text", 'r', encoding="utf-8") as fp:
    data = fp.read().split(" ")
```



- `fp.read()` 读到整个字符串：`"hello world python"`
- `.split(" ")` 按空格切成列表：`["hello", "world", "python"]`



**推导式：**

```python
[表达式  for 变量 in 可迭代对象  if 条件]
   ↑            ↑                  ↑
 要放进去的    遍历            筛选条件
```



zip 的用法：

```python
res_list = [a * b for a, b in zip(num_one, num_two)]
print(res_list)   # [4, 10, 18]
```
