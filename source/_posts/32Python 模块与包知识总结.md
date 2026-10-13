---
title: Python 模块与包知识总结
date: 2026-10-14
permalink: 2026/10/14/python-modules-packages-imports/
description: 整理 Python 模块与包的概念、模块导入与缓存机制、常见导入方式，以及 __init__.py 的初始化与导出作用，并总结循环导入的原因和处理方法。
categories:
  - Python
tags:
  - Python
  - 模块导入
  - 包
  - 代码组织
  - 循环导入
study_order: 13
---
# Python 模块与包知识总结

## 一、模块（Module）

### 1.1 什么是模块

- 模块就是一个 `.py` 文件，包含函数、类、变量等代码。
- 作用：把代码组织成可复用的单元，便于维护和调用。

### 1.2 模块的优点

- 极大提高程序员的效率。
- 多个功能由统一的接口进行调用。
- 避免命名冲突，代码结构清晰。

### 1.3 模块的内置属性 `__name__`

- 当模块被**直接运行**时，`__name__ == "__main__"`。
- 当模块被**导入**时，`__name__` 等于模块名。

```python
if __name__ == "__main__":
    # 只有直接运行该文件时才执行
    print("测试代码")
```



### 1.4 模块的导入机制

执行 `import foo` 时，底层发生以下事情：

1. **查找模块**：找到 `foo` 模块所在的 `.py` 文件。
2. **执行模块代码**：从上至下依次加载 `foo` 模块中的每一行代码（如果有打印信息，也会随加载而运行）。
3. **创建命名空间**：加载完成后，将 `foo` 模块内的名称空间加载到自己的文件中。
4. **缓存机制**：同一个模块只会被加载一次（缓存到 `sys.modules`）。

------

## 二、模块的导入方法

### 2.1 导入整个模块

```python
import math
print(math.sqrt(16))    # 使用时需加模块名前缀
```



### 2.2 模块起别名

```python
import numpy as np
arr = np.array([1, 2, 3])
```



### 2.3 一次导入多个模块

```python
import os, sys, math
```



### 2.4 导入模块中的成员

```python
from math import sqrt, pi
print(sqrt(25))    # 使用时无需前缀
```



### 2.5 成员起别名

```python
from math import sqrt as square_root
print(square_root(9))
```



### 2.6 导入所有成员（不推荐）

```python
from math import *
print(sqrt(16))
```



- 缺点：无法知道导入了哪些名字，容易覆盖同名变量，可读性差。
- 模块可通过 `__all__ = ["a", "b"]` 控制 `import *` 的导出内容。

### 2.7 导入包

```python
# 方式一：import 包.模块
import mypackage.math_utils
mypackage.math_utils.add(1, 2)

# 方式二：from 包 import 模块
from mypackage import math_utils
math_utils.add(1, 2)

# 方式三：from 包.模块 import 成员
from mypackage.math_utils import add
add(1, 2)
```



### 2.8 动态导入

```python
import importlib
math_module = importlib.import_module("math")
print(math_module.sqrt(16))
```

- 应用场景：插件系统、根据配置文件加载模块。

### 2.9 条件导入

```python
try:
    import ujson as json
except ImportError:
    import json
```

- 应用场景：兼容不同 Python 版本、可选依赖。

### 2.10 相对导入（包内部使用）

```python
from . import c          # 同级模块
from .. import a         # 上一级模块
from ..a import func_x   # 上一级模块的成员
```

- 只能在包内使用，不能在顶层脚本直接运行。
- `.` 表示当前目录，`..` 表示上一级。

### 2.11 导入方法对比

| 导入方式     | 示例                         | 使用方式      |
| :----------- | :--------------------------- | :------------ |
| 导入整个模块 | `import math`                | `math.sqrt()` |
| 模块起别名   | `import numpy as np`         | `np.array()`  |
| 导入成员     | `from math import sqrt`      | `sqrt()`      |
| 成员起别名   | `from math import sqrt as s` | `s()`         |
| 导入所有     | `from math import *`         | `sqrt()`      |
| 导入包内模块 | `from pkg import mod`        | `mod.func()`  |
| 动态导入     | `importlib.import_module()`  | 运行时决定    |
| 条件导入     | `try: import ujson`          | 兼容环境      |
| 相对导入     | `from . import a`            | 包内使用      |

### 2.12 导入顺序规范（PEP 8）

```python
# 1. 标准库
import os
import sys

# 2. 第三方库
import numpy as np
import pandas as pd

# 3. 本地模块
from mypackage import utils
```



------

## 三、包（Package）

### 3.1 什么是包

- 包是一个包含多个模块的目录，用于组织更大的项目。
- Python 3.3 之前必须在包内有 `__init__.py`；3.3 之后可以省略，但推荐保留。

### 3.2 目录结构示例

```
myproject/
├── main.py
└── mypackage/
    ├── __init__.py
    ├── math_utils.py
    └── string_utils.py
```

### 3.3 包与模块对比

| 对比项               | 模块 Module          | 包 Package              |
| :------------------- | :------------------- | :---------------------- |
| 本质                 | 一个 `.py` 文件      | 一个目录（含多个模块）  |
| 作用                 | 组织代码为可复用单元 | 组织多个模块为更大项目  |
| 导入                 | `import module`      | `import package.module` |
| 是否需 `__init__.py` | 不需要               | 3.3+ 可省略，建议保留   |

### 3.4 嵌套包（子包）

```
myproject/
├── main.py
└── pkg/
    ├── __init__.py
    └── subpkg/
        ├── __init__.py
        └── tools.py
```



```python
from pkg.subpkg import tools
tools.hello()

# 或
from pkg.subpkg.tools import hello
hello()
```



------

## 四、`__init__.py` 详解

### 4.1 `__init__.py` 是什么

- 一个特殊的文件（可以是空文件，也可以写代码）。
- 作用：标记文件夹是一个包。
- Python 3.3+ 可省略，但推荐保留。

### 4.2 三大作用

1. **标记文件夹为包**：让 Python 识别该目录为包。
2. **包初始化代码**：`import 包名` 时，`__init__.py` 会自动执行一次。
3. **包内注册模块 / 简化导入**：把包内常用功能提升到包级别。

### 4.3 包内注册示例

目录结构：

```
mypackage/
├── __init__.py
├── math_utils.py     # 定义了 add()
└── text_utils.py     # 定义了 upper()
```



```python
# mypackage/__init__.py
from .math_utils import add
from .text_utils import upper

__all__ = ["add", "upper"]
```



```python
# 使用者代码简化
from mypackage import add, upper
print(add(1, 2))
print(upper("hello"))
```



### 4.4 常见写法总结

```python
# 1. 空文件
# 什么都不写，仅标记这是个包

# 2. 注册常用模块/函数
from .math_utils import add, sub
from .text_utils import upper, lower

# 3. 定义包的元信息
__version__ = "1.0.0"
__author__ = "作者名"

# 4. 控制 import * 的导出
__all__ = ["add", "sub", "upper", "lower"]

# 5. 初始化代码
print("包已加载")
CONFIG = {"debug": True}
```



### 4.5 概念区分

| 概念     | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| 详细导入 | 从模块路径直接导入，如 `from pkg.math_utils import add`      |
| 包内注册 | 在 `__init__.py` 中把子模块的成员提升到包级别，如 `from .math_utils import add` |

------

## 五、循环导入问题

### 5.1 什么是循环导入

两个或多个模块**互相导入对方**，形成"你导入我，我导入你"的死循环。

```
a.py ←→ b.py
```

### 5.2 报错信息

- `AttributeError: partially initialized module ...`
- `ImportError`

### 5.3 出错原因

- Python 导入模块时是"边执行边加载"，互相等待会拿到半成品模块。
- 使用 `from b import func_b` 时更容易触发。

### 5.4 解决方法

**方法 1：把 `import` 放到函数内部（最常用）**

```python
# a.py
def func_a():
    import b          # 用到时才导入
    b.func_b()
```



**方法 2：把 `import` 放到文件末尾**

```python
# a.py
def func_a():
    b.func_b()

import b              # 放到最后
```



**方法 3：把共享部分抽到第三个模块（最优雅）**

```python
原结构：a.py ←→ b.py
新结构：a.py → c.py ← b.py
```



**方法 4：用 `import b` 代替 `from b import xxx`**

```python
# 容易出问题
from b import func_b

# 改成
import b
b.func_b()
```



**方法 5：只在类型注解中使用 `TYPE_CHECKING`**

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from b import B    # 只在类型检查时导入

def process(obj: "B") -> None:
    ...
```



### 5.5 方法对比

| 方案                          | 适用场景           |
| :---------------------------- | :----------------- |
| 函数内 import                 | 临时解决、快速修复 |
| import 放末尾                 | 快速绕过           |
| 抽到第三个模块                | 代码结构可以重构   |
| `import` 代替 `from...import` | 微调即可           |
| `TYPE_CHECKING`               | 仅类型注解用       |
