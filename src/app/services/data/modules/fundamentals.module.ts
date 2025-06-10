import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class FundamentalsModule {

  getModule(): Module {
    return {
      id: 'fundamentals',
      title: '基础知识',
      description: 'Python 语言基础概念',
      order: 1,
      lessons: [
        {
          id: 'variables',
          title: '变量和数据类型',
          type: 'tutorial',
          content: `
# Python 变量和数据类型

Python 是一种动态类型语言，这意味着你不需要显式声明变量的类型。

## 变量赋值
在 Python 中，变量赋值非常简单：

\`\`\`python
name = "张三"
age = 25
height = 1.75
is_student = True
\`\`\`

## 基本数据类型

### 1. 字符串 (str)
用于存储文本数据：
\`\`\`python
greeting = "你好，世界！"
message = '这也是一个字符串'
\`\`\`

### 2. 整数 (int)
用于存储整数：
\`\`\`python
count = 42
negative_number = -10
\`\`\`

### 3. 浮点数 (float)
用于存储小数：
\`\`\`python
pi = 3.14159
temperature = -5.5
\`\`\`

### 4. 布尔值 (bool)
用于存储真/假值：
\`\`\`python
is_active = True
is_finished = False
\`\`\`

## 检查变量类型
使用 \`type()\` 函数可以检查变量的类型：
\`\`\`python
print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(height))    # <class 'float'>
print(type(is_student)) # <class 'bool'>
\`\`\`
          `,
          codeExample: `# 尝试创建不同类型的变量
name = "你的名字"
age = 20
height = 1.70
is_learning_python = True

# 打印变量和它们的类型
print(f"姓名: {name}, 类型: {type(name)}")
print(f"年龄: {age}, 类型: {type(age)}")
print(f"身高: {height}, 类型: {type(height)}")
print(f"正在学习Python: {is_learning_python}, 类型: {type(is_learning_python)}")`,
          order: 1,
          completed: false
        },
        {
          id: 'variables-exercise',
          title: '变量练习',
          type: 'exercise',
          content: `
# 变量练习

通过这个练习，你将学会如何创建和使用不同类型的变量。

## 练习目标
1. 创建不同类型的变量
2. 使用变量进行计算
3. 格式化输出结果

## 要求
请完成以下任务：
1. 创建一个存储你姓名的字符串变量
2. 创建一个存储你年龄的整数变量
3. 创建一个存储你身高的浮点数变量
4. 计算并输出你的出生年份
5. 使用 f-string 格式化输出所有信息
          `,
          exercise: {
            id: 'variables-practice',
            description: '创建变量并进行基本计算',
            initialCode: `# 变量练习
# 请完成以下任务：

# 1. 创建一个存储你姓名的变量
name = ""  # 在这里输入你的姓名

# 2. 创建一个存储你年龄的变量
age = 0  # 在这里输入你的年龄

# 3. 创建一个存储你身高的变量（单位：米）
height = 0.0  # 在这里输入你的身高

# 4. 计算出生年份
current_year = 2024
birth_year = current_year - age

# 5. 使用 f-string 格式化输出
print(f"姓名: {name}")
print(f"年龄: {age}岁")
print(f"身高: {height}米")
print(f"出生年份: {birth_year}年")

# 6. 输出变量类型
print(f"\\n变量类型:")
print(f"name 的类型: {type(name)}")
print(f"age 的类型: {type(age)}")
print(f"height 的类型: {type(height)}")`,
            expectedOutput: `姓名: 张三
年龄: 20岁
身高: 1.75米
出生年份: 2004年

变量类型:
name 的类型: <class 'str'>
age 的类型: <class 'int'>
height 的类型: <class 'float'>`,
            hints: [
              '记住给字符串变量赋值时要使用引号',
              '整数不需要小数点，浮点数需要小数点',
              '使用 f-string 可以在字符串中嵌入变量：f"文本{变量}"',
              '使用 type() 函数可以查看变量的类型'
            ]
          },
          order: 2,
          completed: false
        },
        {
          id: 'strings',
          title: '字符串操作',
          type: 'tutorial',
          content: `
# Python 字符串操作

字符串是 Python 中最常用的数据类型之一。

## 字符串创建
\`\`\`python
single_quotes = '单引号字符串'
double_quotes = "双引号字符串"
triple_quotes = """三引号字符串
可以跨越多行"""
\`\`\`

## 字符串连接
\`\`\`python
first_name = "张"
last_name = "三"
full_name = first_name + last_name
print(full_name)  # 输出: 张三
\`\`\`

## 字符串格式化
\`\`\`python
name = "李四"
age = 25
# f-string (推荐)
message = f"我叫{name}，今年{age}岁"
print(message)
\`\`\`

## 常用字符串方法
\`\`\`python
text = "  Hello World  "
print(text.upper())      # 转大写
print(text.lower())      # 转小写
print(text.strip())      # 去除首尾空格
print(text.replace("World", "Python"))  # 替换
\`\`\`
          `,
          codeExample: `# 字符串操作练习
greeting = "你好"
name = "世界"

# 字符串连接
message = greeting + "，" + name + "！"
print(message)

# 使用 f-string
formatted_message = f"{greeting}，{name}！"
print(formatted_message)

# 字符串方法
text = "  Python 编程  "
print(f"原始: '{text}'")
print(f"去空格: '{text.strip()}'")
print(f"大写: '{text.upper()}'")
print(f"小写: '{text.lower()}'")`,
          order: 3,
          completed: false
        },
        {
          id: 'strings-exercise',
          title: '字符串练习',
          type: 'exercise',
          content: `
# 字符串练习

通过这个练习，你将掌握字符串的基本操作方法。

## 练习目标
1. 学会字符串的创建和连接
2. 掌握字符串格式化
3. 使用常用的字符串方法

## 要求
请完成以下字符串操作任务。
          `,
          exercise: {
            id: 'strings-practice',
            description: '练习字符串的各种操作方法',
            initialCode: `# 字符串练习
# 请完成以下任务：

# 1. 创建两个字符串变量
first_name = "张"
last_name = "三"

# 2. 将两个字符串连接成完整姓名
full_name = ""  # 请在这里完成字符串连接

# 3. 创建一个包含空格的字符串
messy_text = "  Python 编程很有趣  "

# 4. 使用字符串方法处理 messy_text
clean_text = ""  # 去除首尾空格
upper_text = ""  # 转换为大写
lower_text = ""  # 转换为小写

# 5. 使用 f-string 创建格式化字符串
age = 25
introduction = ""  # 使用 f-string 创建自我介绍

# 6. 输出所有结果
print(f"完整姓名: {full_name}")
print(f"原始文本: '{messy_text}'")
print(f"清理后: '{clean_text}'")
print(f"大写: '{upper_text}'")
print(f"小写: '{lower_text}'")
print(f"自我介绍: {introduction}")`,
            expectedOutput: `完整姓名: 张三
原始文本: '  Python 编程很有趣  '
清理后: 'Python 编程很有趣'
大写: 'PYTHON 编程很有趣'
小写: 'python 编程很有趣'
自我介绍: 我叫张三，今年25岁`,
            hints: [
              '使用 + 操作符可以连接字符串',
              'strip() 方法可以去除首尾空格',
              'upper() 和 lower() 方法可以转换大小写',
              'f-string 的语法是 f"文本{变量}文本"',
              '记住给字符串变量重新赋值'
            ]
          },
          order: 4,
          completed: false
        }
        // 更多课程将在后续添加
      ]
    };
  }
}
