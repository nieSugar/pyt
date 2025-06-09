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
          order: 2,
          completed: false
        }
        // 更多课程将在后续添加
      ]
    };
  }
}
