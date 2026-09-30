---
title: Python 函数进阶知识点总结
date: 2026-09-30
permalink: 2026/09/30/python-advanced-functions-scope-annotations/
description: 整理命名关键字参数、函数与容器类型注解、名称空间、LEGB 作用域、global、nonlocal 和函数作为返回值的用法。
categories:
  - Python
tags:
  - Python
  - 函数
  - 参数传递
  - 类型注解
  - 作用域
  - 闭包
study_order: 10
---
# Python 函数进阶知识点总结

---

# 一、命名关键字参数

## 是什么

> 写在 `*` 后面的参数，调用时必须用 `key=value` 的形式传，不能用位置传。

## 语法

```python
def register(name, age, *, sex, height):
    print(name, age, sex, height)
```

- `*` 前面的 `name`、`age`：普通位置参数
- `*` 后面的 `sex`、`height`：命名关键字参数，必须用 `key=value` 传
- `*` 只是分隔符号，不接收值

## 正确与错误

```python
register('Dream', 18, sex='male', height='1.8m')   # 正确

register('Dream', 18, 'male', '1.8m')              # 错误：不能按位置传
register('Dream', 18, height='1.8m')               # 错误：sex 没传
```

## 默认值

```python
def register(name, age, *, sex='male', height):
    print(name, age, sex, height)

register('Dream', 18, height='1.8m')   # sex 用默认值
```

## 有 `*args` 时不用再写 `*`

```python
def register(name, age, *args, sex='male', height):
    print(name, age, args, sex, height)
```

`*args` 后面的参数自动就是命名关键字参数。

## 总结

> 命名关键字参数 = 写在 `*` 后面的参数，必须用 `key=value` 传，不能用位置传。

---

# 二、函数注解

## 是什么

> 给函数的参数和返回值贴个"类型标签"，说明它们"应该"是什么类型。

**只是提示，不是强制。**

## 语法

```python
def add(x: int, y: int) -> int:
    return x + y
```

- `x: int`：参数 x 应该是 int
- `y: int`：参数 y 应该是 int
- `-> int`：返回值应该是 int

## 关键：不强制

```python
print(add("hello", "world"))   # 输出 helloworld，不报错
```

## 常见类型

```python
from typing import List, Dict, Union, Optional, Any

x: int
y: float
s: str
b: bool

nums: List[int]                    # 整数列表
d: Dict[str, int]                  # 键 str、值 int 的字典
n: Union[int, float]               # 可以是 int 或 float
name: Optional[str]                # 可以是 str 或 None
data: Any                          # 任意类型
```

## 和命名关键字参数一起用

```python
def register(name: str, age: int, *, sex: str = 'male', height: str) -> None:
    print(name, age, sex, height)
```

## 总结

> 函数注解就是给参数和返回值贴类型标签，只是提示，不强制。

---

# 三、为什么需要容器类型注解

## 问题

```python
def process(data: list):
    ...
```

光写 `list` 不够，因为列表里可以装任何东西：

```python
[1, 2, 3]              # 整数
["a", "b"]             # 字符串
[{"name": "Dream"}]    # 字典
```

调用者不知道里面该放什么。

## 解决

```python
from typing import List

def process(data: List[int]):
    ...
```

现在信息完整：**是列表，且每个元素是 int。**

## 常见容器类型

| 写法              | 含义                          |
| ----------------- | ----------------------------- |
| `List[int]`       | 整数列表                      |
| `Dict[str, int]`  | 键 str、值 int 的字典         |
| `Tuple[str, int]` | 第一个 str、第二个 int 的元组 |
| `Set[int]`        | 整数集合                      |

## List 和 Tuple 的区别

- `List[int]`：每个元素都是 int，长度不限
- `Tuple[str, int]`：固定位置，第一个必须是 str，第二个必须是 int

```python
Tuple[str, int]     # ("Dream", 18)   正确
Tuple[str, int]     # (18, "Dream")   顺序反了
```

## 嵌套读法：从外往里读

```python
List[Dict[str, int]]
```

读作：一个列表，里面每个元素是字典，字典的键是 str，值是 int。

## 总结

> 容器类型注解 = 不只说明"这是容器"，还说明"容器里装的是什么类型"。

---

# 四、名称空间和作用域

## 名称空间是什么

> 存放"变量名 -> 变量值"映射关系的地方，可以理解成一个大字典。

## 名称空间有 3 种

| 名称空间 | 产生时机     | 存了什么                 |
| -------- | ------------ | ------------------------ |
| 内建     | 解释器启动时 | print、len、int 等内置   |
| 全局     | 文件运行时   | 文件顶层定义的变量、函数 |
| 局部     | 函数调用时   | 函数内部的变量           |

## 作用域是什么

> 变量能被访问到的范围。

## 作用域有 4 种

| 作用域        | 说明             |
| ------------- | ---------------- |
| 局部 Local    | 函数内部         |
| 内嵌 Enclosed | 外层函数（闭包） |
| 全局 Global   | 整个文件         |
| 内建 Built-in | 所有文件         |

## 查找顺序：LEGB

```text
局部 -> 内嵌 -> 全局 -> 内建
```

从里往外找，找到就停。

## 修改关键字

| 关键字     | 作用                       |
| ---------- | -------------------------- |
| `global`   | 在函数里改全局变量         |
| `nonlocal` | 在内嵌函数里改外层函数变量 |

## 总结

> - 名称空间：变量名和值存放的地方，分内建、全局、局部
> - 作用域：变量能生效的范围，分内建、全局、局部、内嵌
> - 查找顺序：局部 -> 内嵌 -> 全局 -> 内建
> - 改全局用 `global`，改外层用 `nonlocal`

---

# 五、global 和 nonlocal 详解

## 示例

```python
user_dict = {"age": 99}
age = 18

def func():
    global age          # 声明：改全局的 age
    age = 19

    age_ = age          # 局部变量 age_

    user_dict["age"] = 999   # 不用 global 也能改

    def inner():
        nonlocal age_   # 声明：改 func 里的 age_
        age_ = 38
        user_dict["age"] = 888

    inner()
    print(age_)         # 38

func()
print(age)              # 19
print(user_dict["age"]) # 888
```

## 核心规则

| 情况               | 需要 global/nonlocal 吗 |
| ------------------ | ----------------------- |
| 不可变类型重新赋值 | 需要                    |
| 可变类型改内容     | 不需要                  |
| 可变类型重新赋值   | 需要                    |

## 不可变 vs 可变

| 类型   | 例子            |
| ------ | --------------- |
| 不可变 | int、str、tuple |
| 可变   | list、dict、set |

```python
def func():
    user_dict["age"] = 999   # 改内容，不用 global
```

```python
def func():
    global user_dict
    user_dict = {"age": 0}   # 重新赋值，需要 global
```

## 总结

> - `global`：函数里改全局变量
> - `nonlocal`：内嵌函数里改外层函数变量
> - 可变类型改内容不用声明，重新赋值要声明

---

# 六、闭包函数

## 是什么

> 闭包 = 内嵌函数 + 引用外层变量 + 外层返回内层。

三个条件同时满足才是闭包。

## 最简单的例子

```python
def outer(x):
    def inner(y):
        return x + y
    return inner

add_5 = outer(5)
print(add_5(3))   # 8
```

`outer(5)` 执行完后，`x=5` 本该消失，但因为 `inner` 还在用它，所以被保存了下来。

## 为什么叫闭包

> 内层函数把外层变量"包"起来了，带着一起走。

`add_5` 不只是一个函数，它还带着 `x=5`。

## 计数器例子

```python
def counter():
    count = 0
    def add():
        nonlocal count
        count += 1
        return count
    return add

c = counter()
print(c())   # 1
print(c())   # 2
print(c())   # 3
```

核心价值：让变量在函数结束后依然保留。

## 三个条件

| 条件             | 说明                      |
| ---------------- | ------------------------- |
| 有内嵌函数       | 函数里定义了另一个函数    |
| 内层用了外层变量 | inner 引用了 outer 的变量 |
| 外层返回内层     | outer 把 inner 返回出去   |

## 有什么用

1. 保存状态（计数器）
2. 生成定制函数

```python
def multiply(n):
    def inner(x):
        return x * n
    return inner

double = multiply(2)
triple = multiply(3)
print(double(5))   # 10
print(triple(5))   # 15
```

3. 装饰器的基础

## 总结

> 闭包 = 内嵌函数 + 引用外层变量 + 外层返回内层。

---

# 七、函数作为返回值与 main()() 解析

## 示例

```python
login_dict = {}

def login():
    print("欢迎来到登陆功能")

def register():
    print("欢迎来到注册功能")

def main():
    if not login_dict.get("is_login"):
        return login      # 注意：没括号
    else:
        return register

print(main()())
```

## 拆解 main()()

```python
main()      # 返回 login 函数
main()()    # 就是 login()
```

等价于：

```python
result = main()
result()
```

## 输出

```text
欢迎来到登陆功能
None
```

第二行 None 是因为 `login()` 没有 return。

## 关键区别

| 写法             | 含义               |
| ---------------- | ------------------ |
| `return login`   | 返回函数本身       |
| `return login()` | 调用函数，返回结果 |

```python
return login      # 返回函数本身，后面可加 () 调用
return login()    # 直接调用，返回 None，后面加 () 会报错
```

## 总结

> `main()()` = 先调用 main 拿到一个函数，再调用那个函数。
> 不加括号是返回函数本身，加括号才是调用。

---

# 八、闭包进阶：装饰器雏形

## 示例

```python
login_dict = {}

def login():
    print("欢迎来到登陆功能")

def register():
    print("欢迎来到注册功能")

def outer(func):
    print(f"func >>>>> {func}")

    def inner():
        print(f"inner func >>>>> {func}")
        if not login_dict.get("username"):
            func()

    return inner

print(outer(login)())
print(outer(register)())
```

## 在干什么

1. `outer` 接收一个函数
2. 里面定义 `inner`
3. `inner` 判断是否登录，没登录就调用 `func()`
4. `outer` 返回 `inner`

## outer(login)() 解析

```python
outer(login)        # 返回 inner 函数
outer(login)()      # 调用 inner()
```

执行过程：

```text
1. outer(login)
   -> 打印 func >>>>> <function login ...>
   -> 返回 inner

2. outer(login)()
   -> 打印 inner func >>>>> <function login ...>
   -> 没登录，调用 login()
   -> 打印 欢迎来到登陆功能
```

## 核心意义

> 不直接调用 login，而是先用 outer 包装一层，加一个"检查是否登录"的判断。

```python
login()          # 直接执行，没检查
outer(login)()   # 先检查，没登录才执行
```

这就是装饰器的思想。

## 和装饰器的关系

```python
login = outer(login)   # 手动包装
```

用 `@` 语法糖：

```python
@outer
def login():
    print("欢迎来到登陆功能")
```

`@outer` 等价于 `login = outer(login)`。

## 总结

> outer 是包装函数，接收一个函数，返回一个新函数 inner。
> inner 在执行原函数前加了登录检查。
> 这就是闭包，也是装饰器的雏形。

---

# 九、为什么两个 login 打印的内存地址不一样

## 结论

> 其实是同一个函数，同一次运行里地址一定一样。
> 笔记里不同，是因为那是分两次运行或手动抄的示例。

## 验证

```python
def login():
    print("欢迎")

def outer(func):
    print(f"outer 里的地址: {id(func)}")
    def inner():
        print(f"inner 里的地址: {id(func)}")
    return inner

outer(login)()
```

输出两个 `id` 完全一样。

## 地址不同的可能原因

1. 分两次运行记录（每次运行地址都重新分配）
2. 手动抄写时随手写的示例
3. 中途重新定义了 login

## 关键点

- 同一个函数对象，同一次运行地址一定相同
- 不同次运行，地址会变
- 判断是不是同一个函数，看 `id()`

## 总结

> 同一次运行，同一个函数，地址一定一样；
> 不同次运行，地址就会变；
> 笔记里的地址只是示意，不是真实对比依据。