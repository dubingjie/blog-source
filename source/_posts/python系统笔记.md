---
title: Python 笔记
date: 2026-08-23 14:00:00
tags:
  - Python
categories:
  - Python
---



# 一、Python 基础

## 【一】基本语法：

### 【1】注释语法：

#### 1、什么是注释？

注释就是对代码的解释和说明，注释的内容不会被执行

#### 2、如何进行注释？

单行注释：# + 空格 + 注释内容

多行注释：3个单引号或者3个双引号 + 回车

不要随便套！！！

### 【2】变量

#### 1、什么是变量？

变量是容器，用来存储和管理数据

#### 2、变量的定义和调用

内部原理：在内存中开辟一块内存空间，让这个空间存储值，用变量名去指向这个地址，从而拿到变量值。

变量名 = 变量值

```python
name = "dream"
```

#### 3、变量名的命名规范

变量名可以是字母、数字、下划线，但不能以数字开头。

#### 4、变量名的命名风格

- 大驼峰：每一个单词的首字母都大写。

- 小驼峰：第一个单词首字母小写，后面的单词首字母都大写。

- 纯小写加下划线

#### 5、变量的三大特性

变量内存地址、变量类型、变量值

- 变量值：直接打印变量名就能看到变量值

- 变量类型：通过type这个方法查看变量类型

```python
userName = "dream"
print(userName)
print(type(userName))
```

- 变量的内存地址：通过 id 这个方法来查看变量的内存地址

```python
age = 18
print(type(age))
print(id(age))
print(id(userName))
```

每次查看变量的内存地址都会变化：每一次在重新运行代码的时候都会开辟内存空间。

### 【3】常量

#### 1、什么是常量？

在程序运行过程中值不会发生改变的量

#### 2、定义常量：

用全大写的字母来代表常量（在Python中的常量被定义后是可以改变的，但我们的习惯是不会改变）

在其他语言，比如Java、Go语言，定义完常量之后是不能够改变的。

```python
PORT = 3306
print(PORT)
PORT = 9936
print(PORT)
```



### 【4】PEP8 编码规范

官方提供的规范（一般我们也不遵守）

### 【5】八大基本数据类型

数字类型（整数类型（int），浮点类型（float））

字符串类型（str）

列表类型（list）

字典类型（dict）

布尔类型（bool）

元组类型（tuple）

集合类型（set）

### 【6】数字类型

整数或者浮点数

```python
num1 = 100
num2 = 200
num3 = num1 + num2
print(type(num1))
print(type(num2))
print(num3)

f1 = 1.2
f2 = 2.4
f3 = f1 + f2
print(f3)     # 3.5999999999999996
print(type(f3))
```

**浮点数在计算机中的表示方式，导致计算结果不准确。**

**有一些能够解决这个问题的办法，自己查吧**。

### 【7】字符串类型

#### 1、字符串的含义

字符串就是一段文本信息，用于处理文字、字符等

```python
name = "dream"
print(type(name))
```

#### 2、字符串的语法

- 单引号包裹起来的字符
- 双引号包裹起来的字符
- 三个单引号包裹起来的字符
- 三个双引号包裹起来的字符

```python
# 字符串的四种表示方法
name = "dream"
print(name, type(name))
name = 'hope'
print(name, type(name))
name = '''angle'''
print(name, type(name))
name = """LinX"""
print(name, type(name))
```

会产生引号嵌套问题！

混着嵌套可以

```python
# 带双引号嵌套可能会出现问题，要注意
print("my name is dream, and I hope your life is 'wonderful'")
print('my name is dream, and I hope your life is "wonderful"')
```

3个单引号或者3个双引号可以放多行字符

```python
# 3个单引号或者3个双引号可以放多行字符
name = '''
1
2
3
'''
print(name, type(name))
```

### 【8】补充字符串的使用方法

#### 1、字符串和数字的加法和乘法：

```python
# 补充一些字符串儿的方法
# 数字进行乘法得到乘法的结果
print(2 * 2)
# 如果是字符串乘以数字，就会变成重复打印字符串，在一行打印，不会换行
print("d" * 5)

# 数字进行加法，得到加法的结果
print(5 + 5)
# 字符串加数字是不可以的！！！！因为类型不一样，无法运算
# print("d" + 1)
# 字符串+字符串表示字符串的拼接
print("dd" + "55")
```

#### 2、字符串的索引取值：

- 正向索引取值
- 负向索引取值

```python
# 字符串的索引取值
# 正向索引取值
#  d  r  e  a  m
#  0  1  2  3  4
print("dream"[1])
print("dream"[2])
# 负向索引取值
#  d  r  e  a  m
# -5 -4 -3 -2  -1
print("dream"[-1])
```

### 【9】字符串的格式化输出语法

- 用百分号占位

- format方法输出：用 {} 占位

- 用变量名去占位：可以换位置的

- f"{name}"

```python
# 字符串的格式化输出语法
sentence1 = "my name is dream, and my age is 18"
sentence2 = "my name is hope, and my age is 20"
sentence3 = "my name is opp, and my age is 22"

# 为了简化上面这种写法，于是就有了格式化输出语法

# （1）用百分号占位
# %s 字符串
# %d 整数
# %f 浮点数
# %x 16进制整数
sentence4 = "my name is %s, and my age is %s"
print(sentence4 % ("dream", 18))
print(sentence4 % ("LinX", 20))

# （2） format方法输出：用 {} 占位
sentence = "my name is {}, and my age is {}"
print(sentence.format("dream", 28))
print(sentence.format("aaa", 24))
# format 只能按照固定的顺序传参数
# 可以用关键字占据指定位置
sentence = "my name is {name}, and my age is {age}"
print(sentence.format(name="hope", age=20))
# 用变量名去占位：可以换位置的
print(sentence.format(age=18, name="LinX"))

# （3）f"{name}"
name = "dream1"
age = 19
sentence = f"my name is {name}, my age is {age}"
print(sentence)
```



### 【10】列表类型

#### 1、列表类型的定义

列表是用来存取多个相同属性的值，方便存取。

也可以存取不同属性的值。

#### 2、列表类型的语法

```python
# 列表类型
# 分为正向索引和负向索引
user_names = ["dream", "hope", "opp"]
print(user_names)
print(user_names[0])
print(user_names[-1])

# 列表也可以是不同的数据类型
data_info1 = ["dream", 18, "male", 1.75]
print(data_info1)

# 列表还可以嵌套列表
data_info2 = ["dream", "hope", "opp", [18, 20, 22, ["music", "run", "swim"]]]

# 打印
print(data_info2[3])
print(f"my name is {data_info2[0]}, my age is {data_info2[3][0]}, my hobby is {data_info2[3][3][0]}")
```



### 【11】字典类型

#### 1、字典类型的定义

如果我们需要用一个变量记录多个值，但多个值是不同属性的。

比如人的姓名、身高、年龄用列表可以存，但列表是用索引对应值的，不太好找，所以我们可以用字典。

字典类型，使用key value形式来存储数据的。

#### 2、字典类型的语法

{"key" : "value"}

key：一般是对 value 的描述信息，建议用字符串类型。

value 是真正的数据

**字典不能够索引取值！！！**

```python
# 字典类型
# 以key和value的形式来存的
person_info = {
    "name": "dream",
    "age": "18",
    "gender": "male",

}

# 取字典类型的数据
# 方式一：字典["key"]    如果取一个没有的值会报错
print(person_info["name"])
print(person_info["age"])
# print(person_info["hobby"])

# 方式二：字典.get("key")   不会报错，但是会输出None
print(person_info.get("gender"))
print(person_info.get("hobby"))

# 列表和字典可以组合嵌套
# 练习
info = {
    "name": "dream",
    "age": 28,
    "addr": {
        "country": "china",
        "info": [666, 999, {"编号": 123456, "hobby": ["read", "swim", "music"]}]
    }
}
# 格式化输出：不会换行
print(f"my name is {info["name"]}, "
      f"my age is {info["age"]}, "
      f"my country is {info["addr"]["country"]}, "
      f"my hobby is {info["addr"]["info"][2]["hobby"][0]}")

# 另一种写法：
print(f'''
    my name is {info["name"]}, 
    my age is {info["age"]}, 
    my country is {info["addr"]["country"]}, 
    my hobby is {info["addr"]["info"][2]["hobby"][0]}
''')
```



### 【12】布尔类型

布尔类型只有两个值，True 或者 False。

用于判断 、循环

语法：变量名 = True或False

- 在Python中为真 True：

除了假的情况以外的其他情况都是真的

- 在Python中为真 False：

False、0、空的变量（空的字符串、空的列表、空的字典......）、

```python
# 布尔类型
print(bool(False))
print(bool(True))
print(bool(0))
print(bool(1))
print(bool(""))     # False
print(bool([]))     # False
print(bool({}))     # False
print(bool(" "))    # True
```



### 【13】元组类型（tuple）

- 元组是一种不可变的序列类型，类似于列表，用于存储多个有序元素

- 元组与列表的主要区别在于，元组的元素不能被修改、删除或添加，它是不可变的数据类型。

- 元组通常用于存储相关联的数据，保持数据的完整性。


**注意：如果一个字符串后面加了一个逗号，那它就不是字符串，是元组。**

**如果元组里面只有一个元素，没有逗号，那它就是一个字符串。（或者其他类型）**

**当元组中只有一个元素的时候，要加逗号**

**如果是字符串或者整数类型的时候，加上逗号就变成元组。**

```python
# 元组类型：不能被修改删除
num_list = [1, 2, 3]
print(num_list[0])
num_list[0] = 999
print(num_list[0])
# 元组类型修改会报错
num_tuple = (1, 2, 3)
print(num_tuple[0])
# num_tuple[0] = 10
print(num_tuple[0])

# 如果一个字符串后面加了一个逗号，那它就不是字符串，是元组。
name = "dream",
print(name, type(name))   # tuple类型
# 如果元组里面只有一个元素，没有逗号，那它就是一个字符串。（或者其他类型）
name_tuple = ("dream")
print(name_tuple, type(name_tuple))    # str类型
# 当元组中只有一个元素的时候，要加逗号
# 如果是字符串或者整数类型的时候，加上逗号就变成了元组。

# 可以用变量来接收元组的内容。
# 元组按照位置解包。
name_age = ("dream", 18)
name, age = ("dream", 18)
print(name, age)     # dream 18
```



###  【14】集合类型（set）

#### 1、集合的基本知识。

集合类型，用于存储无序且不重复的元素。

语法：以单个元素的形式在大括号中存储。

**集合里面不能放列表、元组或字典，只能放数字、字符串、布尔值！！**

```python
# 集合类型：存储无序且不重复的元素。
# 语法：以单个元素的形式在大括号中存储。
# 对于数字位置是固定的、随机的。
num_set = {1, 2, 3, 1, 1, 1}
print(num_set, type(num_set))       # {1, 2, 3} <class 'set'>

# 对于字符串或其他类型，顺序会乱。
dream_set = {"d", "r", "e", "a", "m"}
print(dream_set)      # {'d', 'e', 'r', 'm', 'a'}

# 集合里面只能放数字、字符串、布尔值。不能放元组、列表、字典。
# set_list = {[1, 2]}    # 会报错
set_list = {True}
print(set_list)
```

#### 2、集合的并、交、差、补。

```python
# 集合运算：并交差补
# 并集
# 交集
# 差集：两个集合中独有的元素放到一个集合中。
# 补集

# 【1】向集合中添加元素。
# 顺序会改变。
name_set = {"dream", "opp"}
name_set.add("hope")
print(name_set)

# 【2】集合中删除元素。
# 按照指定的值删除指定元素。
name_set.remove("opp")
print(name_set)

# 【3】几何运算。
set_a = {1, 2, 3, 4, 5, 6}
set_b = {4, 5, 6, 7, 8, 9}
# （1）并集
print(set_a.union(set_b))
# （2）交集
print(set_a.intersection(set_b))
# （3）差集
print(set_a.difference(set_b))
```



### 【15】程序与用户交互

输入、输出

```python
# 程序与用户交互

# 用户输入内容
username = input("请输入用户名：")
print(username)
password = input("请输入密码：")
print(password)
num1 = input("num1:")
num2 = input("num2:")
# 用户输入的类型是字符串类型，因此相加是字符串拼接。
num3 = num1 + num2
print(num3)
# 可以使用强制类型转换
num4 = int(num1) + int(num2)
print(num4)

# 输出：print()语句
print("dream")
name = "dream"
print(name)
# print()有一个默认的参数：end = "\n"  换行
print("dream\nhope")
print(1, end="*")
print(2)
print(3)
```



### 【16】基本运算符

算术运算符、逻辑运算符、比较运算符、增量运算符。

```python
# 基本运算符。
# 【1】算术运算符：加减乘除，取余、幂次方、取模
a = 10
b = 3
print(a % b)    # 取余数
print(a ** b)
print(a // b)   # 取商

# 【2】比较运算符:

# 【3】赋值运算符
print(a)
a %= b
print(a)
a *= b
print(a)
a //= b
print(a)

# 1、链式复制
a = b = c = d = 10
print(a, b, c, d)
# 2、交叉赋值
a = 10
b = 20
a, b = b, a
print(a, b)

# 3、解压赋值
# 可以将列表、元组、集合等能够索引取值的类型中的每一个元素赋给一个变量。
num_list = [1, 2, 3]
a, b, c = num_list
print(a, b, c)
# 多了少了都不行，要正好。
# a, b = num_list    # 报错
# print(a, b)
# a, b, c, d = num_list    # 报错
# print(a, b, c, d)

# 正确的写法：下划线用来接收后面的参数
a, b, _ = num_list    # 不报错
print(a, b)

# 4、逻辑运算符:与或非:and   or   not
a = 10
b = -10
print((a > 0) and (b < 0))
print((a > 0) or (b < 0))
print(not (a > 0))
# 运算优先级：not > and >or
print((5 > 0) and (10 > 0) and (3 < 0))    # False
print((5 > 0) or (10 > 0) or (3 < 0))    # True
# 提高运算的优先级，可以加括号

# 5、成员运算
# 判断某个成员在某个成员里面:  in  /  not in
num_list = [1, 2, 3]
print(1 in num_list)    # True
print(6 in num_list)    # False
print(6 not in num_list)    # True

# 6、身份运算
# 判断这个值是否是另一个值
a = 1
b = "1"
print(a is b)    # False
print(a is not b)    # True
print(a == b)    # False
print(a != b)    # True
```



### 【17】== 和 is 的区别

```python
# == 比较的是两个值是否相等。
# is 比较的是值和内存地址是否相等。
name = "dream"    # 与 name_one 地址相同
print(id(name))
name_one = "dream"
print(id(name_one))   # 与dream 地址相同
print(name == name_one)    # True
print(name is name_one)    # True
```



### 【18】流程控制语句

顺序结构、分支结构、循环结构。

#### 1、顺序结构

程序按照顺序依次执行代码，一句接一句地执行。

#### 2、分支结构

程序在执行过程中达到某一条件才会执行。

1  单分支结构。

2  双分支结构。

3  多分支结构。

```python
# 流程控制语句
# 顺序结构、分支结构、循环结构
# 顺序结构
print("a")
print("b")
print("c")

# 分支结构
# 单分支结构。
score = 98
if score > 90:
    print("优秀")

# 双分支结构
score = 70
if score >= 60:
    print("及格")
else:
    print("不及格")

# 多分支
score = 80
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("E")
```



#### 3、登录注册练习

```python
# 练习：登录注册
username = input("请输入用户名：")
password = input("请输入密码：")
username_true = "123"
password_true = "123"
if username == username_true and password == password_true:
    print("登录成功")
else:
    if username == username_true and password != password_true:
        print("密码错误！")
    elif username != username_true and password == password_true:
        print("用户名错误！")
    else:
        print("用户名和密码都错误！")
        
        
if username == username_true and password == password_true:
    print("登录成功！")
else:
    print("用户名或密码错误！")
```



#### 4、循环结构

重复执行代码，直至代码达到某个条件终止。

```python
# 循环结构
count = 0
while count < 5:
    print(count)
    count += 1

# 关键字:rang
# 可以生成一个特定区间的数字列表
# 还有步长的概念，可以自己查一查
print(list(range(1, 5)))
print(tuple(range(1, 5)))
print(set(range(1, 5)))

# 重复执行代码 执行次数
# range 结束的数字是取不到的
for i in range(0, 3):
    print(i)
    print("你好")
print("--------------------")
# 默认 range 从零开始
for i in range(3):
    print(i)
    print("你好")

# for 关键字的用法：
# 便利出来d r e a m
name = "dream"
for i in name:
    print(i)
# 遍历出来1 2 3 4
data_str = [1, 2, 3, 4]
for i in data_str:
    print(i)
# 用for遍历字典的时候只能拿到键，不能拿到值
data_str = {"1": "2", "2": "4"}
for i in data_str:
    print(i)

for i in range(1, 6):
    print(i)

# continue 关键字
# 条件满足的时候，不用执行任何代码，跳过本次循环执行下一次循环
count = 0
while count < 5:
    if count == 3:
        print("已跳过本次循环")
        count += 1
        continue
    else:
        print(count)
    count += 1

# break 关键字
# 当循环执行达到某一条件时，直接结束循环
count = 0
while count < 5:
    if count == 3:
        print("已跳过本次循环")
        count += 1
        continue
    elif count == 4:
        break
    else:
        print(count)
    count += 1

# 标志位：
count = 0
tag = True
while tag:
    if count == 3:
        print("已跳过本次循环")
        count += 1
        continue
    elif count == 4:
        tag = False
    else:
        print(count)
    count += 1

# while else语法：
# 当执行完while循环之后，进入else
# 如果while中加了break，那么else也不会执行
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print(count)

# len 方法，可以计算当前类型中的元素个数
data_str = [1, 2, 3, 4]
print(len(data_str))

```



### 【19】练习：猜年龄

```python
# 练习：猜年龄
age_true = 18
count = 0
while count < 3:
    age = input("请输入你要猜的年龄：")
    if int(age) > age_true:
        print("猜大了")
    elif int(age) < age_true:
        print("猜小了")
    else:
        print("猜对了")
        break
    count += 1
if count == 3:
    print("三次机会已经用完了")

# 进阶：
age_true = 20
while True:
    count = 0
    flag = 0
    while count < 3:
        age = input("请输入你要猜的年龄：")
        if int(age) > age_true:
            print("猜大了")
        elif int(age) < age_true:
            print("猜小了")
        else:
            print("猜对了")
            flag = 1
            break
        count += 1
    if flag == 1:
        break
    tag = input("三次机会已经用完了，是否继续猜：Y/N")
    if tag == "N":
        break
```



### 【20】三元运算

只适用于简短的逻辑运算。

元组判断表达式和字典判断表达式，自己查一查吧。

```python
# 三元运算
# 三元运算可以代替if else
# 为真的结果 if 条件 else 条件为假的结果
a, b = 100, 200
print(a if a > b else b)
if a > b:
    print(a)
else:
    print(b)
```



### 【21】整数类型的内置方法

```python
# 整数类型的内置方法
# 【1】强制类型转换
num_str = "55"
num_str_int = int(num_str)
print(num_str, type(num_str))
print(num_str_int, type(num_str_int))

# 【2】进制转换
# 十进制
# 二进制
print(bin(999))    # 0b1111100111
# 八进制
print(oct(999))    # 0o1747
# 十六进制
print(hex(999))    # 0x3e7

# int也能做类型转换
print(int("0b1111100111", 2))   # 999
print(int("0o1747", 8))         # 999
print(int("0x3e7", 16))         # 999
```



### 【22】浮点数类型的内置方法及补充

```python
# 浮点数类型的内置方法
# 【1】强制类型转换
print(float("1.11"))

# 整数类型和浮点数类型方法补充
# 判断当前字符串是否符合整数类型格式
num1 = b'4'    # bytes
print(num1, type(num1))     # b'4' <class 'bytes'>
num2 = "4"
num3 = "四"
# 【2】判断当前数字是否符合数字类型
print(num1.isdigit())    # True
print(num2.isdigit())    # True
print(num3.isdigit())    # False

# num1 没有 .isdecimal() 这个方法
print(num2.isdecimal())    # True
print(num3.isdecimal())    # False

# 应用
age = input("请输入年龄：")
if age.isdigit():
    age = int(age)
else:
    print("请输入合法的数字！")
```

在Python里面没有任何的方法能够判断当前字符串是否符合浮点数类型！！！



### 【23】字符串的内置方法

有一些常用的记住，其他的用到的时候再查就行。

强制类型转换：将其他类型转换为字符串。

#### 1、优先记住的内置方法

```python
# 字符串的内置方法
# 【一】优先记住的内置方法
# 【1】字符串拼接：+
print("1" + "2" + "3" + "4" + "5")
# 扩充方法：''.join(可迭代类型)   借助列表或者元组
print(''.join(["1", "2", "3"]))
# '字符'   以特殊的字符进行分隔
print('|'.join(["1", "2", "3"]))

# 【2】字符串索引取值
# 正向索引、负向索引
name = "dream"
print(name[0])
print(name[-1])
# 注意：字符串可以索引取值，但是不支持索引改值
# name[0] = "s"

# 【3】切片：按照指定位置将某部分隔离出来
# 字符串[起始索引:终止索引:步长]：根据索引区间将整体某部分切离出来
print("dream"[1:3])    # re
print("dream"[1:4:2])  # ra
print("dream"[-3:-1])  # ea
# 字符串[::-1] :将整个字符串进行反转
print("dream"[::-1])

# 【4】计算长度：len(变量名)
print(len("dream"))

# 【5】成员运算
# 判断某个字符是否在某个成员内
print("dr" in "dream")  # True1

# 【6】去除特殊字符  默认去除左右两边的
# "$dream$"  将首尾的$去掉
# strip 的默认值是空格或者换行
print("$dream$".strip("$"))
name_str = "  dream"
print(name_str)
print(name_str.strip())
data_str_one = '''
dream
dream
dream
'''
print(data_str_one)
print(data_str_one.strip())
# 控制左右去除的位置
# 去除左面的特殊字符
print("$dream$".lstrip("$"))
# 去除右面的特殊字符
print("$dream$".rstrip("$"))

# 【7】切分字符串
# 按照指定的分隔符将字符串进行切割,并且分割符会消失。切完之后变成列表
names = "dream|hope|opp"
print(names.split("|"))

user_pwd = "username:password"
username, password = user_pwd.split(":")
print(f"username: {username}")
print(f"password: {password}")

# 【8】遍历字符串
# for 循环遍历
# while 循环用索引取值

# 【9】字符串重复
# 字符串 * 数字
print("dream" * 3)

# 【10】大小写转换
username = "UserName"
# 转换成全大写
print(username.upper())
# 转换成全小写
print(username.lower())

# 【11】首尾字符判断：判断当前字符串是否以X开头，以X结尾
print("dream"[0] == "d")
print("dream"[-1] == "m")
print("dream".startswith("d"))
print("dream".endswith("m"))

# 【12】格式化输出语法
# %s
# {}     {name}     .format()
# f"{name}"

# 【13】替换指定字符：字符串是不能用索引改值的！！
# 前面放旧内容，后面放新内容
print("dream".replace("d", "a"))

# 【14】判断当前字符串是否符合整数类型
print("10".isdigit())
```



#### 2、了解即可的内置方法

```python
# 【二】了解的内置方法
# 【1】查找：在字符串中查找某个字符所在的索引位置
# find 从左向右找，找到一个就返回，不再继续找，查找不存在的返回-1
print("dream".find("a"))
# rfind 从右向左找，找到一个就返回，不再继续找，查找不存在的返回-1
print("dream".rfind("a"))
print("dream".find("x"))   # -1

# 【2】index 从左向右找，找到一个就返回，不再继续找，查找不存在的会报错
print("dream".index("a"))
# rindex 从右向左找，找到一个就返回，不再继续找，查找不存在的会报错
print("dream".rindex("a"))
# print("dream".index("x"))  # 会报错

# 【3】统计当前字符在当前字符串中出现的次数
print("dream".count("a"))

# 【4】填充
# 填充在两侧：.center(填充的数据长度，需要填充的字符)
name = "dream"
print(name.center(len(name) + 2, "*"))  # *dream*
# 如果填充的长度是奇数，优先填充右侧，然后再填充左侧
print(name.center(len(name) + 3, "*"))  # *dream**

# 左对齐
print(name.rjust(len(name) + 3, "-"))  # ---dream
# 左对齐
print(name.ljust(len(name) + 3, "-"))  # dream---
# 填充0
# 默认使用0填充至指定的长度，并且是从左向右填充
print(name.zfill(len(name) + 3))  # 000dream

# 【5】首字母大写
sentence = "my name is dream."
print(sentence.capitalize())

# 【6】大小写翻转
name = "UserName"
print(name.swapcase())

# 【7】让整句话的每一个单词首字母大写
# 每个单词要用空格隔开，否则不生效
print(sentence.title())
```



### 【24】列表的内置方法

```python
# 列表的内置方法
# 【1】强制类型转换：可以将可迭代类型转化为列表类型
# 列表在强制类型转换字典的时候，转换的是键，没有值
print(list("dream"))
print(list((1, 2, 3, 4)))
print(list({10, 20, 30}))
print(list({"name": "dream", "age": 18}))
# 强调：列表转换成字符串以后，再转换列表是没办法转回到列表的!!
data_list = [6, 7, 8, 9]
data_str = str(data_list)
print(data_str)
data_str_list = list(data_str)
print(data_str_list)

# 【2】索引取值：正向、负向

# 【3】切片：和字符串一样，顾头不顾尾
# 列表[起始索引:终止索引:步长]
num_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(num_list[0:3])     # 1、2、3
print(num_list[0:3:2])   # 1、3
print(num_list[::-1])    # 反转

# 【4】计算长度 len()

# 【5】成员运算：判断某个元素是否在当前列表中：in   not in

# 【6】向列表中添加元素
# （1）直接追加在结尾
num_list_one = [1, 2, 3, 4]
num_list_one.append(5)
print(num_list_one)

# （2）插入到指定的索引位置   insert(索引位置, 值)
num_list_one.insert(0, 999)

# （3）直接将整个列表添加合并到一起
# 用 for 循环
num_list_two = [6, 7, 8, 9]
for i in num_list_two:
    num_list_one.append(i)
print(num_list_one)
# 内置方法：extend  扩展列表
num_list_one.extend(num_list_two)
print(num_list_one)

# 【7】删除列表中的元素
# （1）按照指定的值删除指定的元素
num_list_one = [999, 2, 3, 4, 5, 6]
num_list_one.remove(999)
print(num_list_one)
# （2）弹出指定元素
# 默认弹出最后一个元素，可以指定弹出索引对应的元素，弹出的元素会消失
print(num_list_one.pop())
print(num_list_one)
print(num_list_one.pop(0))
print(num_list_one)

# remove没有返回值，pop有返回值！！

# （3）删除指定索引对应的元素
del num_list_one[0]   # 没有返回值
print(num_list_one)

# （4）直接将列表清空
num_list_one.clear()
print(num_list_one)

# 【8】反转
num_list_one = [1, 2, 3, 4, 5, 6]
print(num_list_one[::-1])    # 拿到的是颠倒后的值，原来的不变
num_list_one.reverse()       # 颠倒列表，原本的变了
print(num_list_one)

# 【9】对列表排序
num_list_one = [2, 4, 5, 6, 8, 1]
# 默认的排序方式是从小到大，可以先排序再翻转，也可以reverse=True。
num_list_one.sort()    # 没有返回值
print(num_list_one)
num_list_one = [2, 4, 5, 6, 8, 1]
num_list_one.sort(reverse=True)
print(num_list_one)

# sorted 返回的是排序好的列表
num_list = [2, 4, 5, 6, 8, 1]
print(sorted(num_list))

# 【10】列表遍历循环：for循环，while循环
```



### 【25】元组的内置方法

元组要加逗号！！

元组不支持修改和删除！！

```python
# 元组的内置方法
# 【1】强制类型转换：可以将可迭代类型转换为元组
print(tuple("dream"))
print(tuple(["dream", "dream", "dream"]))
print(tuple({"name": "dream", "age": 18}))   # 只转键，不转值
print(tuple({1, 2, 3}))

# 【2】索引取值
num_tuple = (1, 2, 3, 4)
print(num_tuple)

# 【3】切片：
print(num_tuple[1:3])
print(num_tuple[0:3:2])
print(num_tuple[::-1])   # 反转
# 元组没有 sort 方法
# 元组可以索引取值，但是不可以索引修改值

# 【4】计算长度：len

# 【5】成员运算：in   not in

# 【6】遍历循环：for循环  while循环

# 【7】元组拼接
num1 = (1, 2, 3)
num2 = (4, 5, 6)
# 要添加列表1 或者元组1，会返回一个新的元组
print(num1.__add__((1,)))
for i in num2:
    num1 = num1.__add__((i,))
print(num1)
# 或者
num1 = num1.__add__(num2)
print(num1)
# 或者直接用 + 进行拼接
num1 = (1, 2, 3)
num2 = (4, 5, 6)
print(num1 + num2)

# 【8】元组可以重复
print(num1 * 2)
```



### 【25】字典类型内置方法

```python
# 字典类型内置方法
# 【1】取值
# 字典中没有的键，如果用中括号取值就会报错
data_dict = {"name": "dream", "age": 18, "gender": "male"}
print(data_dict["name"])
# 字典中用get取值，如果没有这个键，返回None
print(data_dict.get("name"))
print(data_dict.get("hobby"))   # None
# 取不到的时候可以指定默认值
print(data_dict.get("hobby", "music"))   # music

# 【2】计算长度 len()
print(len(data_dict))

# 【3】成员运算：判断某个键是否在字典中，返回bool值，只能判断键，不能判断值
print("name" in data_dict)   # True
print("dream" in data_dict)   # False

# 【4】增加：无则添加，有则修改
data_dict["hobby"] = "music"
print(data_dict)

# 字典.update({key:value})
data_dict_new = {"id": "001", "addr": "shanghai"}
# 遍历新字典添加到旧字典中
# for i in data_dict_new:
#     data_dict[i] = data_dict_new[i]
# 或者：下面这段代码是有点问题的：键只能用一次
'''
for i in data_dict_new:
    key = i
    data_dict.update(key=data_dict_new[i])
print(data_dict)
'''
# 或者：字典.update(新字典)
'''
data_dict.update(data_dict_new)
print(data_dict)
'''

# 或者：setdefault()
for i in data_dict_new:
    data_dict.setdefault(i, data_dict_new[i])
print(data_dict)

# 【5】删除
data_dict = {"name": "dream", "age": 18, "gender": "male"}
# （1）del 字典[key]  ：按照键删除字典中对应的键值对
del data_dict["name"]
print(data_dict)

# （2）用 pop(key) 弹出：有返回值，键值对也会消失
print(data_dict.pop("age"))
print(data_dict)

# （3）清空字典：clear
data_dict.clear()
print(data_dict)

# （4）弹出默认的最后一个位置的键值对：.popitem()
data_dict = {"name": "dream", "age": 18, "gender": "male"}
res = data_dict.popitem()
print(res)
print(data_dict)

# 【6】补充方法：
# （1）取出字典中所有的键
print(data_dict.keys())
# <class 'dict_keys'>类型，可以被当做列表用
print(data_dict.keys(), type(data_dict.keys()))

# （2）获取字典中的值
print(data_dict.values())

# （3）获取字典中的键值对：.items()
print(data_dict.items())

# 取出字典中的数据
for key, value in data_dict.items():
    print(f"key: {key}")
    print(f"value: {value}")

# 【7】可以for循环遍历
```



### 【26】集合的内置方法

集合的特点是无序、不重复

```python
# 集合类型的内置方法
# 【1】强制类型转换：可以将其他类型转化为集合
print(set("dream|dream"))
print(set(list("dream|dream")))
print(set(tuple("dream|dream")))
print(set({"a": "1", "b": 2, "c": "3"}))

# 【2】添加单个元素
num_set = {1, 2, 3, 4, 5}
num_set.add(6)   # 没有返回值，直接修改原来的集合
print(num_set)

# 【3】一次性添加多个元素  .update(放一个列表或者元组)
num_set.update([10, 20, 30])
print(num_set)

# 【4】删除元素 remove 没有这个元素会报错
num_set.remove(10)
print(num_set)
# pop() 方法和之前学的不太一样，因为集合是无序的，默认去掉索引零的位置，每次都会变

# 【5】删除指定的元素：discard 没有这个元素不会报错，只会什么也不显示
num_set = set("dream")
num_set.discard("m")
print(num_set)

# 【6】其他方法
# 计算长度 len
# 便利循环 for while
# 成员运算 in / not in
```



### 【27】大作业

#### 1、多用户登录注册























