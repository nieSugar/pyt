import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course, Module, Lesson, UserProgress } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private currentCourseSubject = new BehaviorSubject<Course | null>(null);
  private currentLessonSubject = new BehaviorSubject<Lesson | null>(null);
  private userProgressSubject = new BehaviorSubject<UserProgress | null>(null);

  public currentCourse$ = this.currentCourseSubject.asObservable();
  public currentLesson$ = this.currentLessonSubject.asObservable();
  public userProgress$ = this.userProgressSubject.asObservable();

  constructor() {
    this.loadCourse();
    this.loadUserProgress();
  }

  private loadCourse(): void {
    // 加载默认的 Python 基础课程
    const course: Course = {
      id: 'python-basics',
      title: 'Python 基础教程',
      description: '从零开始学习 Python 编程语言',
      totalLessons: 60,
      estimatedTime: '80 小时',
      difficulty: 'beginner',
      modules: this.getDefaultModules()
    };

    this.currentCourseSubject.next(course);
  }

  private getDefaultModules(): Module[] {
    return [
      {
        id: 'fundamentals',
        title: '基础知识',
        description: 'Python 语言基础概念',
        order: 1,
        lessons: [
          {
            id: 'variables',
            title: '变量和数据类型',
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
            type: 'tutorial',
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
            type: 'tutorial',
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
          },
          {
            id: 'numbers',
            title: '数字和数学运算',
            content: `
# Python 数字和数学运算

Python 支持多种数字类型和丰富的数学运算。

## 数字类型

### 整数 (int)
\`\`\`python
positive = 42
negative = -17
zero = 0
big_number = 1000000
\`\`\`

### 浮点数 (float)
\`\`\`python
pi = 3.14159
temperature = -5.5
scientific = 1.23e-4  # 科学计数法
\`\`\`

## 基本运算符
\`\`\`python
a = 10
b = 3

print(a + b)    # 加法: 13
print(a - b)    # 减法: 7
print(a * b)    # 乘法: 30
print(a / b)    # 除法: 3.333...
print(a // b)   # 整除: 3
print(a % b)    # 取余: 1
print(a ** b)   # 幂运算: 1000
\`\`\`

## 数学函数
\`\`\`python
import math

print(abs(-5))        # 绝对值: 5
print(round(3.7))     # 四舍五入: 4
print(max(1, 5, 3))   # 最大值: 5
print(min(1, 5, 3))   # 最小值: 1
print(math.sqrt(16))  # 平方根: 4.0
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 数学运算练习
import math

# 基本运算
a = 15
b = 4

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")

# 数学函数
numbers = [3.7, -2.1, 5.9, -1.3]
print(f"\\n数字列表: {numbers}")
print(f"绝对值: {[abs(x) for x in numbers]}")
print(f"四舍五入: {[round(x) for x in numbers]}")
print(f"最大值: {max(numbers)}")
print(f"最小值: {min(numbers)}")

# 计算圆的面积
radius = 5
area = math.pi * radius ** 2
print(f"\\n半径为 {radius} 的圆的面积: {area:.2f}")`,
            exercise: {
              id: 'numbers-exercise-1',
              description: "编写一个程序计算两个数的所有基本运算结果",
              initialCode: `# 请完成以下程序
num1 = 20
num2 = 6

# TODO: 计算并打印以下结果
# 1. 加法
# 2. 减法
# 3. 乘法
# 4. 除法
# 5. 整除
# 6. 取余
# 7. 幂运算

print("计算结果:")
# 在这里写你的代码`,
              expectedOutput: `计算结果:
20 + 6 = 26
20 - 6 = 14
20 * 6 = 120
20 / 6 = 3.3333333333333335
20 // 6 = 3
20 % 6 = 2
20 ** 6 = 64000000`,
              hints: [
                "使用 f-string 格式化输出",
                "记住运算符的优先级",
                "注意除法和整除的区别"
              ]
            },
            order: 3,
            completed: false
          },
          {
            id: 'input-output',
            title: '输入输出操作',
            content: `
# Python 输入输出操作

学习如何与用户交互，获取输入和显示输出。

## 输出 - print() 函数

### 基本输出
\`\`\`python
print("Hello, World!")
print("你好，世界！")
\`\`\`

### 多个值输出
\`\`\`python
name = "张三"
age = 25
print("姓名:", name, "年龄:", age)
print("姓名:", name, "年龄:", age, sep=" | ")  # 自定义分隔符
\`\`\`

### 格式化输出
\`\`\`python
name = "李四"
score = 95.5
# f-string (推荐)
print(f"学生 {name} 的成绩是 {score:.1f} 分")
# format 方法
print("学生 {} 的成绩是 {:.1f} 分".format(name, score))
\`\`\`

## 输入 - input() 函数

### 基本输入
\`\`\`python
name = input("请输入你的姓名: ")
print(f"你好, {name}!")
\`\`\`

### 数字输入
\`\`\`python
# input() 总是返回字符串，需要转换类型
age_str = input("请输入你的年龄: ")
age = int(age_str)  # 转换为整数

# 或者一步完成
age = int(input("请输入你的年龄: "))
height = float(input("请输入你的身高(米): "))
\`\`\`

## 实用技巧
\`\`\`python
# 多行输出
print("""这是一个
多行
输出示例""")

# 不换行输出
print("加载中", end="")
for i in range(3):
    print(".", end="")
print(" 完成!")
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 输入输出练习
print("=== 个人信息收集程序 ===")

# 获取用户输入
name = input("请输入你的姓名: ")
age = int(input("请输入你的年龄: "))
height = float(input("请输入你的身高(米): "))
city = input("请输入你的城市: ")

# 格式化输出
print("\\n=== 你的信息 ===")
print(f"姓名: {name}")
print(f"年龄: {age} 岁")
print(f"身高: {height:.2f} 米")
print(f"城市: {city}")

# 计算一些信息
birth_year = 2024 - age
print(f"\\n推算出生年份: {birth_year}")

if height > 1.7:
    print("你的身高比较高!")
else:
    print("你的身高很标准!")`,
            exercise: {
              id: 'input-output-exercise-1',
              description: "创建一个简单的计算器程序，获取两个数字和运算符，然后计算结果",
              initialCode: `# 简单计算器程序
print("=== 简单计算器 ===")

# TODO: 获取用户输入
# 1. 第一个数字
# 2. 运算符 (+, -, *, /)
# 3. 第二个数字

# TODO: 根据运算符进行计算

# TODO: 输出结果

print("计算完成!")`,
              expectedOutput: `=== 简单计算器 ===
请输入第一个数字: 10
请输入运算符 (+, -, *, /): +
请输入第二个数字: 5
结果: 10.0 + 5.0 = 15.0
计算完成!`,
              hints: [
                "使用 float() 转换输入的数字",
                "使用 if-elif-else 判断运算符",
                "注意除法时分母不能为0"
              ]
            },
            order: 4,
            completed: false
          }
        ]
      },
      {
        id: 'control-flow',
        title: '控制流',
        description: '条件语句和循环结构',
        order: 2,
        lessons: [
          {
            id: 'conditions',
            title: '条件语句',
            content: `
# Python 条件语句

条件语句让程序能够根据不同情况执行不同的代码。

## if 语句

### 基本语法
\`\`\`python
age = 18
if age >= 18:
    print("你已经成年了")
\`\`\`

### if-else 语句
\`\`\`python
score = 85
if score >= 60:
    print("及格了！")
else:
    print("不及格，需要努力")
\`\`\`

### if-elif-else 语句
\`\`\`python
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 70:
    print("中等")
elif score >= 60:
    print("及格")
else:
    print("不及格")
\`\`\`

## 比较运算符
\`\`\`python
a = 10
b = 5

print(a == b)   # 等于: False
print(a != b)   # 不等于: True
print(a > b)    # 大于: True
print(a < b)    # 小于: False
print(a >= b)   # 大于等于: True
print(a <= b)   # 小于等于: False
\`\`\`

## 逻辑运算符
\`\`\`python
age = 20
has_license = True

# and 运算符
if age >= 18 and has_license:
    print("可以开车")

# or 运算符
if age < 18 or not has_license:
    print("不能开车")

# not 运算符
if not has_license:
    print("需要考驾照")
\`\`\`

## 嵌套条件
\`\`\`python
weather = "晴天"
temperature = 25

if weather == "晴天":
    if temperature > 20:
        print("适合出门")
    else:
        print("有点冷，多穿点")
else:
    print("不适合出门")
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 条件语句练习
print("=== 成绩等级判定系统 ===")

# 模拟不同的成绩
scores = [95, 87, 76, 65, 45]

for score in scores:
    print(f"\\n成绩: {score}")

    if score >= 90:
        grade = "A"
        comment = "优秀！继续保持！"
    elif score >= 80:
        grade = "B"
        comment = "良好，再努力一点就能达到优秀"
    elif score >= 70:
        grade = "C"
        comment = "中等，还有提升空间"
    elif score >= 60:
        grade = "D"
        comment = "及格，但需要更加努力"
    else:
        grade = "F"
        comment = "不及格，需要重新学习"

    print(f"等级: {grade}")
    print(f"评语: {comment}")

# 复合条件示例
print("\\n=== 活动参与资格检查 ===")
age = 16
has_permission = True
is_member = False

print(f"年龄: {age}, 有许可: {has_permission}, 是会员: {is_member}")

if age >= 18:
    print("✓ 年龄符合要求")
elif age >= 16 and has_permission:
    print("✓ 未成年但有监护人许可")
else:
    print("✗ 年龄不符合要求")

if is_member or age >= 21:
    print("✓ 可以参加高级活动")
else:
    print("✗ 只能参加基础活动")`,
            exercise: {
              id: 'conditionals-exercise-1',
              description: "编写一个程序判断一个年份是否为闰年",
              initialCode: `# 闰年判断程序
# 闰年规则：
# 1. 能被4整除但不能被100整除的年份是闰年
# 2. 能被400整除的年份是闰年

year = 2024

# TODO: 编写判断逻辑
# 提示：使用 % 运算符检查是否能整除

print(f"{year}年是闰年: ???")`,
              expectedOutput: `2024年是闰年: True`,
              hints: [
                "闰年的条件：(year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)",
                "使用逻辑运算符 and 和 or",
                "测试几个年份：2000(闰年), 1900(不是), 2024(闰年)"
              ]
            },
            order: 1,
            completed: false
          },
          {
            id: 'loops',
            title: '循环语句',
            content: `
# Python 循环语句

循环让程序能够重复执行代码块。

## for 循环

### 遍历数字范围
\`\`\`python
# range(start, stop, step)
for i in range(5):
    print(f"第 {i+1} 次循环")

for i in range(1, 6):
    print(f"数字: {i}")

for i in range(0, 10, 2):
    print(f"偶数: {i}")
\`\`\`

### 遍历字符串
\`\`\`python
word = "Python"
for char in word:
    print(f"字符: {char}")
\`\`\`

### 遍历列表
\`\`\`python
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(f"水果: {fruit}")

# 带索引的遍历
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

## while 循环

### 基本语法
\`\`\`python
count = 0
while count < 5:
    print(f"计数: {count}")
    count += 1
\`\`\`

### 用户输入循环
\`\`\`python
password = ""
while password != "123456":
    password = input("请输入密码: ")
    if password != "123456":
        print("密码错误，请重试")
print("密码正确！")
\`\`\`

## 循环控制

### break - 跳出循环
\`\`\`python
for i in range(10):
    if i == 5:
        break
    print(i)  # 输出 0, 1, 2, 3, 4
\`\`\`

### continue - 跳过当前迭代
\`\`\`python
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 输出 1, 3, 5, 7, 9
\`\`\`

## 嵌套循环
\`\`\`python
# 打印乘法表
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} × {j} = {i*j}")
    print()  # 空行
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 循环语句练习
print("=== for 循环示例 ===")

# 1. 基本计数
print("1. 倒计时:")
for i in range(5, 0, -1):
    print(f"{i}...")
print("发射！🚀")

# 2. 遍历列表
print("\\n2. 购物清单:")
shopping_list = ["牛奶", "面包", "鸡蛋", "苹果", "香蕉"]
for index, item in enumerate(shopping_list, 1):
    print(f"{index}. {item}")

# 3. 字符串处理
print("\\n3. 字符统计:")
text = "Hello Python"
vowels = "aeiouAEIOU"
vowel_count = 0
for char in text:
    if char in vowels:
        vowel_count += 1
print(f"'{text}' 中有 {vowel_count} 个元音字母")

print("\\n=== while 循环示例 ===")

# 4. 猜数字游戏
import random
secret_number = random.randint(1, 10)
guess_count = 0
max_guesses = 3

print(f"4. 猜数字游戏 (1-10，最多{max_guesses}次机会):")
while guess_count < max_guesses:
    try:
        guess = int(input(f"第{guess_count + 1}次猜测: "))
        guess_count += 1

        if guess == secret_number:
            print(f"🎉 恭喜！你猜对了！数字是 {secret_number}")
            break
        elif guess < secret_number:
            print("太小了！")
        else:
            print("太大了！")

        if guess_count == max_guesses:
            print(f"😔 游戏结束！正确答案是 {secret_number}")
    except ValueError:
        print("请输入一个有效的数字！")
        guess_count -= 1

# 5. 嵌套循环 - 打印图案
print("\\n5. 星星图案:")
for i in range(1, 6):
    for j in range(i):
        print("⭐", end="")
    print()`,
            exercise: {
              id: 'loops-exercise-1',
              description: "编写一个程序计算1到100之间所有偶数的和",
              initialCode: `# 计算1到100之间所有偶数的和
total = 0
count = 0

# TODO: 使用循环计算偶数和
# 方法1: 使用 for 循环和 range
# 方法2: 使用 while 循环

print(f"1到100之间共有 {count} 个偶数")
print(f"它们的和是: {total}")`,
              expectedOutput: `1到100之间共有 50 个偶数
它们的和是: 2550`,
              hints: [
                "偶数的特征：number % 2 == 0",
                "可以用 range(2, 101, 2) 直接生成偶数",
                "记得统计偶数的个数"
              ]
            },
            order: 2,
            completed: false
          }
        ]
      },
      {
        id: 'data-structures',
        title: '数据结构',
        description: '列表、字典、元组和集合',
        order: 3,
        lessons: [
          {
            id: 'lists',
            title: '列表 (List)',
            content: `
# Python 列表 (List)

列表是Python中最常用的数据结构，用于存储有序的元素集合。

## 创建列表
\`\`\`python
# 空列表
empty_list = []
empty_list2 = list()

# 有元素的列表
fruits = ["苹果", "香蕉", "橙子"]
numbers = [1, 2, 3, 4, 5]
mixed = ["张三", 25, True, 3.14]
\`\`\`

## 访问列表元素
\`\`\`python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]

# 正向索引
print(fruits[0])    # 苹果 (第一个)
print(fruits[1])    # 香蕉 (第二个)

# 负向索引
print(fruits[-1])   # 葡萄 (最后一个)
print(fruits[-2])   # 橙子 (倒数第二个)

# 切片
print(fruits[1:3])  # ['香蕉', '橙子']
print(fruits[:2])   # ['苹果', '香蕉']
print(fruits[2:])   # ['橙子', '葡萄']
\`\`\`

## 修改列表
\`\`\`python
fruits = ["苹果", "香蕉", "橙子"]

# 修改单个元素
fruits[1] = "草莓"
print(fruits)  # ['苹果', '草莓', '橙子']

# 添加元素
fruits.append("葡萄")        # 末尾添加
fruits.insert(1, "芒果")     # 指定位置插入

# 删除元素
fruits.remove("苹果")        # 删除指定值
deleted = fruits.pop()       # 删除并返回最后一个
deleted2 = fruits.pop(0)     # 删除并返回指定位置
\`\`\`

## 列表方法
\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

print(len(numbers))          # 长度: 8
print(numbers.count(1))      # 计数: 2
print(numbers.index(4))      # 查找索引: 2

numbers.sort()               # 排序
print(numbers)               # [1, 1, 2, 3, 4, 5, 6, 9]

numbers.reverse()            # 反转
print(numbers)               # [9, 6, 5, 4, 3, 2, 1, 1]
\`\`\`

## 列表推导式
\`\`\`python
# 传统方法
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# 列表推导式
squares = [i ** 2 for i in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# 带条件的列表推导式
even_squares = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 列表操作练习
print("=== 学生成绩管理系统 ===")

# 创建学生成绩列表
students = ["张三", "李四", "王五", "赵六"]
scores = [85, 92, 78, 96]

print("原始数据:")
for i, student in enumerate(students):
    print(f"{student}: {scores[i]}分")

# 添加新学生
students.append("钱七")
scores.append(88)

print("\\n添加新学生后:")
for student, score in zip(students, scores):
    print(f"{student}: {score}分")

# 计算统计信息
average = sum(scores) / len(scores)
max_score = max(scores)
min_score = min(scores)

print(f"\\n统计信息:")
print(f"平均分: {average:.1f}")
print(f"最高分: {max_score}")
print(f"最低分: {min_score}")

# 找出优秀学生 (90分以上)
excellent_students = []
for i, score in enumerate(scores):
    if score >= 90:
        excellent_students.append(students[i])

print(f"\\n优秀学生 (90分以上): {excellent_students}")

# 使用列表推导式
high_scores = [score for score in scores if score >= 90]
print(f"优秀成绩: {high_scores}")

# 成绩排序 (保持学生和成绩对应)
student_score_pairs = list(zip(students, scores))
student_score_pairs.sort(key=lambda x: x[1], reverse=True)

print("\\n按成绩排序:")
for student, score in student_score_pairs:
    print(f"{student}: {score}分")`,
            exercise: {
              id: 'lists-exercise-1',
              description: "编写一个程序管理购物清单，实现添加、删除、查找商品功能",
              initialCode: `# 购物清单管理程序
shopping_list = ["牛奶", "面包", "鸡蛋"]

print("当前购物清单:", shopping_list)

# TODO: 实现以下功能
# 1. 添加 "苹果" 到清单
# 2. 删除 "面包"
# 3. 在第2个位置插入 "香蕉"
# 4. 检查 "牛奶" 是否在清单中
# 5. 统计清单中商品数量
# 6. 将清单按字母顺序排序

print("最终购物清单:", shopping_list)`,
              expectedOutput: `当前购物清单: ['牛奶', '面包', '鸡蛋']
最终购物清单: ['苹果', '牛奶', '香蕉', '鸡蛋']`,
              hints: [
                "使用 append() 添加元素",
                "使用 remove() 删除元素",
                "使用 insert() 在指定位置插入",
                "使用 in 关键字检查元素是否存在",
                "使用 sort() 排序列表"
              ]
            },
            order: 1,
            completed: false
          },
          {
            id: 'dictionaries',
            title: '字典 (Dictionary)',
            content: `
# Python 字典 (Dictionary)

字典是存储键值对的数据结构，类似于现实中的字典。

## 创建字典
\`\`\`python
# 空字典
empty_dict = {}
empty_dict2 = dict()

# 有数据的字典
student = {
    "name": "张三",
    "age": 20,
    "grade": "大二",
    "scores": [85, 92, 78]
}

# 使用 dict() 函数
person = dict(name="李四", age=25, city="北京")
\`\`\`

## 访问字典元素
\`\`\`python
student = {"name": "张三", "age": 20, "grade": "大二"}

# 使用键访问
print(student["name"])      # 张三
print(student.get("age"))   # 20

# get() 方法的优势 - 避免KeyError
print(student.get("phone", "未提供"))  # 未提供

# 获取所有键、值、键值对
print(student.keys())       # dict_keys(['name', 'age', 'grade'])
print(student.values())     # dict_values(['张三', 20, '大二'])
print(student.items())      # dict_items([('name', '张三'), ...])
\`\`\`

## 修改字典
\`\`\`python
student = {"name": "张三", "age": 20}

# 添加或修改
student["grade"] = "大二"    # 添加新键值对
student["age"] = 21         # 修改现有值

# 批量更新
student.update({"city": "上海", "phone": "123456"})

# 删除
del student["phone"]        # 删除指定键
age = student.pop("age")    # 删除并返回值
student.clear()             # 清空字典
\`\`\`

## 字典遍历
\`\`\`python
scores = {"数学": 95, "英语": 87, "物理": 92}

# 遍历键
for subject in scores:
    print(f"{subject}: {scores[subject]}")

# 遍历键值对
for subject, score in scores.items():
    print(f"{subject}: {score}")

# 遍历值
for score in scores.values():
    print(f"成绩: {score}")
\`\`\`

## 字典推导式
\`\`\`python
# 创建平方字典
squares = {i: i**2 for i in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 筛选字典
high_scores = {k: v for k, v in scores.items() if v >= 90}
\`\`\`

## 嵌套字典
\`\`\`python
students = {
    "张三": {"age": 20, "scores": [85, 92, 78]},
    "李四": {"age": 21, "scores": [90, 88, 95]},
    "王五": {"age": 19, "scores": [78, 85, 82]}
}

# 访问嵌套数据
print(students["张三"]["age"])           # 20
print(students["李四"]["scores"][0])     # 90
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 字典操作练习
print("=== 学生信息管理系统 ===")

# 创建学生数据库
students_db = {
    "S001": {
        "name": "张三",
        "age": 20,
        "major": "计算机科学",
        "scores": {"数学": 95, "英语": 87, "编程": 92}
    },
    "S002": {
        "name": "李四",
        "age": 21,
        "major": "软件工程",
        "scores": {"数学": 88, "英语": 90, "编程": 95}
    },
    "S003": {
        "name": "王五",
        "age": 19,
        "major": "数据科学",
        "scores": {"数学": 92, "英语": 85, "编程": 89}
    }
}

# 显示所有学生信息
print("所有学生信息:")
for student_id, info in students_db.items():
    name = info["name"]
    age = info["age"]
    major = info["major"]
    avg_score = sum(info["scores"].values()) / len(info["scores"])
    print(f"{student_id}: {name}, {age}岁, {major}专业, 平均分: {avg_score:.1f}")

# 添加新学生
new_student = {
    "name": "赵六",
    "age": 20,
    "major": "人工智能",
    "scores": {"数学": 96, "英语": 88, "编程": 94}
}
students_db["S004"] = new_student

# 查找特定学生
search_id = "S002"
if search_id in students_db:
    student = students_db[search_id]
    print(f"\\n查找结果 - {search_id}:")
    print(f"姓名: {student['name']}")
    print(f"专业: {student['major']}")
    print("各科成绩:")
    for subject, score in student["scores"].items():
        print(f"  {subject}: {score}分")

# 统计分析
print("\\n=== 统计分析 ===")

# 计算各专业人数
majors = {}
for info in students_db.values():
    major = info["major"]
    majors[major] = majors.get(major, 0) + 1

print("各专业人数:")
for major, count in majors.items():
    print(f"  {major}: {count}人")

# 找出编程成绩最高的学生
best_programming_score = 0
best_student = ""
for student_id, info in students_db.items():
    programming_score = info["scores"].get("编程", 0)
    if programming_score > best_programming_score:
        best_programming_score = programming_score
        best_student = info["name"]

print(f"\\n编程成绩最高: {best_student} ({best_programming_score}分)")`,
            exercise: {
              id: 'dictionaries-exercise-1',
              description: "创建一个简单的词频统计程序，统计文本中每个单词出现的次数",
              initialCode: `# 词频统计程序
text = "python is great python is easy python is powerful"

# TODO: 实现词频统计
# 1. 将文本分割成单词列表
# 2. 创建字典统计每个单词的出现次数
# 3. 显示统计结果
# 4. 找出出现次数最多的单词

word_count = {}

print("词频统计结果:")
print("出现次数最多的单词:")`,
              expectedOutput: `词频统计结果:
python: 3
is: 3
great: 1
easy: 1
powerful: 1
出现次数最多的单词: python (3次)`,
              hints: [
                "使用 split() 方法分割字符串",
                "使用 get() 方法安全地获取字典值",
                "使用 max() 函数找出最大值"
              ]
            },
            order: 2,
            completed: false
          }
        ]
      },
      {
        id: 'functions',
        title: '函数',
        description: '函数定义、参数和返回值',
        order: 4,
        lessons: [
          {
            id: 'function-basics',
            title: '函数基础',
            content: `
# Python 函数基础

函数是组织代码的重要方式，让代码更加模块化和可重用。

## 定义函数
\`\`\`python
def greet():
    print("你好，世界！")

# 调用函数
greet()  # 输出: 你好，世界！
\`\`\`

## 带参数的函数
\`\`\`python
def greet_person(name):
    print(f"你好，{name}！")

greet_person("张三")  # 输出: 你好，张三！

# 多个参数
def add_numbers(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add_numbers(5, 3)  # 输出: 5 + 3 = 8
\`\`\`

## 返回值
\`\`\`python
def calculate_area(length, width):
    area = length * width
    return area

# 使用返回值
room_area = calculate_area(5, 4)
print(f"房间面积: {room_area} 平方米")

# 返回多个值
def get_name_age():
    return "张三", 25

name, age = get_name_age()
print(f"姓名: {name}, 年龄: {age}")
\`\`\`

## 默认参数
\`\`\`python
def greet_with_title(name, title="先生"):
    print(f"你好，{title}{name}！")

greet_with_title("张三")        # 你好，先生张三！
greet_with_title("李四", "女士")  # 你好，女士李四！
\`\`\`

## 关键字参数
\`\`\`python
def create_profile(name, age, city="未知", job="未知"):
    print(f"姓名: {name}")
    print(f"年龄: {age}")
    print(f"城市: {city}")
    print(f"职业: {job}")

# 使用关键字参数
create_profile("张三", 25, job="程序员", city="北京")
\`\`\`

## 可变参数
\`\`\`python
# *args - 可变位置参数
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3, 4, 5))  # 15

# **kwargs - 可变关键字参数
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="张三", age=25, city="北京")
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 函数练习
print("=== 函数基础练习 ===")

# 1. 简单函数
def welcome():
    print("欢迎来到Python学习平台！")

welcome()

# 2. 带参数的函数
def calculate_bmi(weight, height):
    """计算BMI指数"""
    bmi = weight / (height ** 2)
    return round(bmi, 2)

def get_bmi_category(bmi):
    """根据BMI值判断体重类别"""
    if bmi < 18.5:
        return "偏瘦"
    elif bmi < 24:
        return "正常"
    elif bmi < 28:
        return "偏胖"
    else:
        return "肥胖"

# 测试BMI计算
print("\\n=== BMI计算器 ===")
weight = 70  # 公斤
height = 1.75  # 米

bmi = calculate_bmi(weight, height)
category = get_bmi_category(bmi)

print(f"体重: {weight}kg, 身高: {height}m")
print(f"BMI: {bmi}")
print(f"体重类别: {category}")

# 3. 默认参数和关键字参数
def create_student_card(name, student_id, grade="未知", major="未知"):
    """创建学生卡信息"""
    card_info = f"""
╔══════════════════════════════╗
║          学生卡              ║
║                              ║
║ 姓名: {name:<20} ║
║ 学号: {student_id:<20} ║
║ 年级: {grade:<20} ║
║ 专业: {major:<20} ║
╚══════════════════════════════╝
    """
    return card_info

print("\\n=== 学生卡生成器 ===")
card1 = create_student_card("张三", "2024001")
card2 = create_student_card("李四", "2024002", grade="大二", major="计算机科学")

print(card1)
print(card2)

# 4. 可变参数
def calculate_average(*scores):
    """计算平均分"""
    if not scores:
        return 0
    return sum(scores) / len(scores)

def print_student_report(name, **subjects):
    """打印学生成绩报告"""
    print(f"\\n=== {name} 的成绩报告 ===")
    total_score = 0
    subject_count = 0

    for subject, score in subjects.items():
        print(f"{subject}: {score}分")
        total_score += score
        subject_count += 1

    if subject_count > 0:
        average = total_score / subject_count
        print(f"平均分: {average:.1f}")

# 测试可变参数
print("\\n=== 成绩统计 ===")
avg1 = calculate_average(85, 92, 78, 96)
avg2 = calculate_average(88, 90, 85)

print(f"第一组平均分: {avg1:.1f}")
print(f"第二组平均分: {avg2:.1f}")

print_student_report("张三", 数学=95, 英语=87, 物理=92, 化学=89)
print_student_report("李四", 语文=88, 数学=90, 英语=85)`,
            exercise: {
              id: 'functions-exercise-1',
              description: "编写一个温度转换器，包含摄氏度转华氏度和华氏度转摄氏度的函数",
              initialCode: `# 温度转换器
def celsius_to_fahrenheit(celsius):
    """将摄氏度转换为华氏度"""
    # TODO: 实现转换公式 F = C * 9/5 + 32
    pass

def fahrenheit_to_celsius(fahrenheit):
    """将华氏度转换为摄氏度"""
    # TODO: 实现转换公式 C = (F - 32) * 5/9
    pass

def temperature_converter(temp, unit):
    """温度转换器主函数"""
    # TODO: 根据单位调用相应的转换函数
    # unit: 'C' 表示输入是摄氏度，'F' 表示输入是华氏度
    pass

# 测试函数
print("温度转换测试:")
print(f"0°C = {celsius_to_fahrenheit(0)}°F")
print(f"32°F = {fahrenheit_to_celsius(32)}°C")
print(f"25°C = {temperature_converter(25, 'C')}°F")
print(f"77°F = {temperature_converter(77, 'F')}°C")`,
              expectedOutput: `温度转换测试:
0°C = 32.0°F
32°F = 0.0°C
25°C = 77.0°F
77°F = 25.0°C`,
              hints: [
                "摄氏度转华氏度: F = C * 9/5 + 32",
                "华氏度转摄氏度: C = (F - 32) * 5/9",
                "使用 if-else 判断单位类型"
              ]
            },
            order: 1,
            completed: false
          }
        ]
      },
      {
        id: 'object-oriented',
        title: '面向对象编程',
        description: '类、对象、继承和多态',
        order: 5,
        lessons: [
          {
            id: 'classes-objects',
            title: '类和对象',
            content: `
# Python 类和对象

面向对象编程(OOP)是一种编程范式，它使用"对象"来设计应用程序和计算机程序。

## 什么是类和对象？

**类(Class)** 是对象的蓝图或模板，定义了对象的属性和方法。
**对象(Object)** 是类的实例，是具体的实体。

## 定义类
\`\`\`python
class Student:
    # 类属性
    school = "Python学院"

    # 构造方法
    def __init__(self, name, age, grade):
        # 实例属性
        self.name = name
        self.age = age
        self.grade = grade
        self.courses = []

    # 实例方法
    def introduce(self):
        return f"我是{self.name}，今年{self.age}岁，{self.grade}年级"

    def add_course(self, course):
        self.courses.append(course)
        print(f"{self.name}选修了{course}课程")

    def get_courses(self):
        return self.courses
\`\`\`

## 创建对象
\`\`\`python
# 创建学生对象
student1 = Student("张三", 20, "大二")
student2 = Student("李四", 19, "大一")

# 访问属性
print(student1.name)        # 张三
print(student1.school)      # Python学院

# 调用方法
print(student1.introduce()) # 我是张三，今年20岁，大二年级
student1.add_course("Python编程")
student1.add_course("数据结构")
\`\`\`

## 类属性 vs 实例属性

- **类属性**: 所有实例共享的属性
- **实例属性**: 每个实例独有的属性

\`\`\`python
print(student1.school)  # Python学院 (类属性)
print(student2.school)  # Python学院 (类属性)

# 修改类属性
Student.school = "高级Python学院"
print(student1.school)  # 高级Python学院
print(student2.school)  # 高级Python学院
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 学生管理系统示例
print("=== 学生管理系统 ===")

class Student:
    # 类属性 - 学校名称
    school = "Python编程学院"
    student_count = 0  # 学生总数

    def __init__(self, name, age, major):
        # 实例属性
        self.name = name
        self.age = age
        self.major = major
        self.courses = []
        self.gpa = 0.0

        # 每创建一个学生，总数加1
        Student.student_count += 1
        self.student_id = f"S{Student.student_count:03d}"

    def introduce(self):
        """自我介绍"""
        return f"学号: {self.student_id}, 姓名: {self.name}, 专业: {self.major}"

    def enroll_course(self, course_name, credits=3):
        """选课"""
        course = {"name": course_name, "credits": credits, "grade": None}
        self.courses.append(course)
        print(f"{self.name} 成功选修 {course_name} ({credits}学分)")

    def set_grade(self, course_name, grade):
        """设置成绩"""
        for course in self.courses:
            if course["name"] == course_name:
                course["grade"] = grade
                print(f"{self.name} 的 {course_name} 成绩: {grade}")
                self.calculate_gpa()
                return
        print(f"未找到课程: {course_name}")

    def calculate_gpa(self):
        """计算GPA"""
        total_points = 0
        total_credits = 0

        for course in self.courses:
            if course["grade"] is not None:
                total_points += course["grade"] * course["credits"]
                total_credits += course["credits"]

        if total_credits > 0:
            self.gpa = total_points / total_credits
        else:
            self.gpa = 0.0

    def get_transcript(self):
        """获取成绩单"""
        print(f"\\n=== {self.name} 的成绩单 ===")
        print(f"学号: {self.student_id}")
        print(f"专业: {self.major}")
        print(f"学校: {Student.school}")
        print("课程列表:")

        for course in self.courses:
            grade_str = str(course["grade"]) if course["grade"] is not None else "未评分"
            print(f"  {course['name']} ({course['credits']}学分): {grade_str}")

        print(f"当前GPA: {self.gpa:.2f}")

    @classmethod
    def get_school_info(cls):
        """类方法 - 获取学校信息"""
        return f"学校: {cls.school}, 在校学生: {cls.student_count}人"

    @staticmethod
    def is_passing_grade(grade):
        """静态方法 - 判断是否及格"""
        return grade >= 60

# 创建学生对象
print("创建学生...")
student1 = Student("张三", 20, "计算机科学")
student2 = Student("李四", 19, "软件工程")
student3 = Student("王五", 21, "数据科学")

# 学生自我介绍
print("\\n学生介绍:")
print(student1.introduce())
print(student2.introduce())
print(student3.introduce())

# 选课
print("\\n选课阶段:")
student1.enroll_course("Python编程", 4)
student1.enroll_course("数据结构", 3)
student1.enroll_course("算法分析", 3)

student2.enroll_course("Java编程", 4)
student2.enroll_course("软件工程", 3)

# 设置成绩
print("\\n成绩录入:")
student1.set_grade("Python编程", 95)
student1.set_grade("数据结构", 88)
student1.set_grade("算法分析", 92)

student2.set_grade("Java编程", 85)
student2.set_grade("软件工程", 90)

# 查看成绩单
student1.get_transcript()
student2.get_transcript()

# 使用类方法和静态方法
print("\\n学校信息:")
print(Student.get_school_info())

print("\\n成绩判断:")
print(f"95分是否及格: {Student.is_passing_grade(95)}")
print(f"45分是否及格: {Student.is_passing_grade(45)}")`,
            exercise: {
              id: 'classes-objects-exercise-1',
              description: "创建一个图书类(Book)，包含书名、作者、价格等属性，以及显示信息和打折的方法",
              initialCode: `# 图书管理系统
class Book:
    # TODO: 定义类属性
    library_name = "Python图书馆"

    def __init__(self, title, author, price, isbn):
        # TODO: 定义实例属性
        pass

    def display_info(self):
        # TODO: 显示图书信息
        pass

    def apply_discount(self, discount_percent):
        # TODO: 应用折扣
        pass

    def is_expensive(self):
        # TODO: 判断是否为昂贵图书(价格>100)
        pass

# 测试代码
book1 = Book("Python编程从入门到实践", "埃里克·马瑟斯", 89.0, "978-7-115-42802-8")
book2 = Book("深度学习", "伊恩·古德费洛", 168.0, "978-7-115-46174-2")

print("=== 图书信息 ===")
book1.display_info()
book2.display_info()

print("\\n=== 应用折扣 ===")
book1.apply_discount(20)  # 8折
book2.apply_discount(15)  # 8.5折

print("\\n=== 折扣后信息 ===")
book1.display_info()
book2.display_info()`,
              expectedOutput: `=== 图书信息 ===
书名: Python编程从入门到实践
作者: 埃里克·马瑟斯
价格: ¥89.00
ISBN: 978-7-115-42802-8
是否昂贵: 否

书名: 深度学习
作者: 伊恩·古德费洛
价格: ¥168.00
ISBN: 978-7-115-46174-2
是否昂贵: 是

=== 应用折扣 ===
Python编程从入门到实践 应用20%折扣，新价格: ¥71.20
深度学习 应用15%折扣，新价格: ¥142.80

=== 折扣后信息 ===
书名: Python编程从入门到实践
作者: 埃里克·马瑟斯
价格: ¥71.20
ISBN: 978-7-115-42802-8
是否昂贵: 否

书名: 深度学习
作者: 伊恩·古德费洛
价格: ¥142.80
ISBN: 978-7-115-46174-2
是否昂贵: 是`,
              hints: [
                "在__init__方法中初始化title, author, price, isbn属性",
                "display_info方法应该打印所有图书信息",
                "apply_discount方法计算折扣后价格: price * (1 - discount_percent/100)",
                "is_expensive方法返回price > 100的布尔值"
              ]
            },
            order: 1,
            completed: false
          },
          {
            id: 'attributes-methods',
            title: '属性和方法',
            content: `
# 属性和方法深入理解

在面向对象编程中，属性和方法是类的核心组成部分。

## 实例属性 vs 类属性

### 实例属性
每个对象独有的属性，在 \`__init__\` 方法中定义。

### 类属性
所有实例共享的属性，在类中直接定义。

\`\`\`python
class Car:
    # 类属性
    wheels = 4
    manufacturer = "通用汽车"

    def __init__(self, brand, model, year):
        # 实例属性
        self.brand = brand
        self.model = model
        self.year = year
        self.mileage = 0
        self.is_running = False
\`\`\`

## 方法类型

### 1. 实例方法
最常见的方法，第一个参数是 \`self\`。

\`\`\`python
def start_engine(self):
    if not self.is_running:
        self.is_running = True
        print(f"{self.brand} {self.model} 引擎启动")
    else:
        print("引擎已经在运行")
\`\`\`

### 2. 类方法 (@classmethod)
使用 \`@classmethod\` 装饰器，第一个参数是 \`cls\`。

\`\`\`python
@classmethod
def get_manufacturer_info(cls):
    return f"制造商: {cls.manufacturer}, 标准轮胎数: {cls.wheels}"
\`\`\`

### 3. 静态方法 (@staticmethod)
使用 \`@staticmethod\` 装饰器，不需要 \`self\` 或 \`cls\` 参数。

\`\`\`python
@staticmethod
def calculate_fuel_efficiency(distance, fuel_used):
    if fuel_used == 0:
        return 0
    return distance / fuel_used
\`\`\`

## 属性访问控制

### 公有属性
默认情况下，所有属性都是公有的。

### 私有属性
以双下划线开头的属性是私有的。

\`\`\`python
class BankAccount:
    def __init__(self, account_number, initial_balance):
        self.account_number = account_number  # 公有属性
        self.__balance = initial_balance      # 私有属性

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False
\`\`\`

## 属性装饰器

使用 \`@property\` 装饰器创建属性的getter和setter。

\`\`\`python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("温度不能低于绝对零度")
        self._celsius = value

    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 汽车管理系统 - 属性和方法示例
print("=== 汽车管理系统 ===")

class Car:
    # 类属性
    wheels = 4
    manufacturer = "Python汽车公司"
    total_cars = 0

    def __init__(self, brand, model, year, price):
        # 实例属性
        self.brand = brand
        self.model = model
        self.year = year
        self.__price = price  # 私有属性
        self.mileage = 0
        self.is_running = False
        self.fuel_level = 100  # 油量百分比

        # 每创建一辆车，总数加1
        Car.total_cars += 1
        self.car_id = f"CAR{Car.total_cars:03d}"

    # 实例方法
    def start_engine(self):
        """启动引擎"""
        if self.fuel_level <= 0:
            print(f"{self.brand} {self.model} 没有燃料，无法启动")
            return False

        if not self.is_running:
            self.is_running = True
            print(f"{self.brand} {self.model} 引擎启动成功")
            return True
        else:
            print(f"{self.brand} {self.model} 引擎已经在运行")
            return False

    def stop_engine(self):
        """停止引擎"""
        if self.is_running:
            self.is_running = False
            print(f"{self.brand} {self.model} 引擎已停止")
        else:
            print(f"{self.brand} {self.model} 引擎已经停止")

    def drive(self, distance):
        """行驶指定距离"""
        if not self.is_running:
            print("请先启动引擎")
            return False

        if self.fuel_level <= 0:
            print("燃料不足，无法行驶")
            return False

        # 计算燃料消耗 (假设每公里消耗1%燃料)
        fuel_needed = distance * 1
        if fuel_needed > self.fuel_level:
            max_distance = self.fuel_level / 1
            print(f"燃料不足，最多只能行驶 {max_distance:.1f} 公里")
            self.mileage += max_distance
            self.fuel_level = 0
            self.is_running = False
            print("燃料耗尽，引擎自动停止")
        else:
            self.mileage += distance
            self.fuel_level -= fuel_needed
            print(f"{self.brand} {self.model} 行驶了 {distance} 公里")
            print(f"当前里程: {self.mileage} 公里，剩余燃料: {self.fuel_level:.1f}%")

        return True

    def refuel(self, amount=100):
        """加油"""
        old_level = self.fuel_level
        self.fuel_level = min(100, self.fuel_level + amount)
        added = self.fuel_level - old_level
        print(f"加油 {added:.1f}%，当前燃料: {self.fuel_level:.1f}%")

    def get_info(self):
        """获取汽车信息"""
        status = "运行中" if self.is_running else "停止"
        return f"""
汽车信息:
  ID: {self.car_id}
  品牌: {self.brand}
  型号: {self.model}
  年份: {self.year}
  价格: ¥{self.__price:,}
  里程: {self.mileage} 公里
  燃料: {self.fuel_level:.1f}%
  状态: {status}
        """

    # 属性getter和setter
    @property
    def price(self):
        """价格属性getter"""
        return self.__price

    @price.setter
    def price(self, value):
        """价格属性setter"""
        if value < 0:
            raise ValueError("价格不能为负数")
        self.__price = value
        print(f"价格已更新为: ¥{value:,}")

    @property
    def age(self):
        """计算车龄"""
        from datetime import datetime
        current_year = datetime.now().year
        return current_year - self.year

    # 类方法
    @classmethod
    def get_company_info(cls):
        """获取公司信息"""
        return f"制造商: {cls.manufacturer}, 生产车辆总数: {cls.total_cars}"

    @classmethod
    def create_economy_car(cls, brand, model, year):
        """工厂方法 - 创建经济型汽车"""
        return cls(brand, model, year, 80000)

    @classmethod
    def create_luxury_car(cls, brand, model, year):
        """工厂方法 - 创建豪华汽车"""
        return cls(brand, model, year, 500000)

    # 静态方法
    @staticmethod
    def calculate_fuel_cost(distance, fuel_price_per_liter=7.5, efficiency=8):
        """计算燃料成本"""
        liters_needed = distance / efficiency
        total_cost = liters_needed * fuel_price_per_liter
        return total_cost

    @staticmethod
    def compare_efficiency(car1_distance, car1_fuel, car2_distance, car2_fuel):
        """比较两辆车的燃油效率"""
        eff1 = car1_distance / car1_fuel if car1_fuel > 0 else 0
        eff2 = car2_distance / car2_fuel if car2_fuel > 0 else 0

        if eff1 > eff2:
            return "第一辆车更省油"
        elif eff2 > eff1:
            return "第二辆车更省油"
        else:
            return "两辆车燃油效率相同"

# 创建汽车对象
print("创建汽车...")
car1 = Car.create_economy_car("丰田", "卡罗拉", 2022)
car2 = Car.create_luxury_car("奔驰", "S级", 2023)
car3 = Car("本田", "雅阁", 2021, 200000)

# 显示汽车信息
print(car1.get_info())
print(car2.get_info())

# 测试方法
print("\\n=== 驾驶测试 ===")
car1.start_engine()
car1.drive(50)
car1.drive(30)
car1.refuel(20)
car1.drive(25)

print("\\n=== 属性测试 ===")
print(f"车1年龄: {car1.age} 年")
print(f"车1价格: ¥{car1.price:,}")

# 修改价格
car1.price = 85000

print("\\n=== 类方法测试 ===")
print(Car.get_company_info())

print("\\n=== 静态方法测试 ===")
cost = Car.calculate_fuel_cost(100)
print(f"行驶100公里的燃料成本: ¥{cost:.2f}")

comparison = Car.compare_efficiency(100, 8, 100, 10)
print(f"效率比较: {comparison}")`,
            exercise: {
              id: 'attributes-methods-exercise',
              description: "创建一个银行账户类，包含私有余额属性、存款取款方法、以及利息计算功能",
              initialCode: `# 银行账户管理系统
class BankAccount:
    # 类属性
    bank_name = "Python银行"
    interest_rate = 0.03  # 年利率3%
    total_accounts = 0

    def __init__(self, account_holder, initial_balance=0):
        # TODO: 初始化账户
        # 提示: 使用私有属性存储余额
        pass

    def deposit(self, amount):
        # TODO: 存款方法
        # 验证金额是否有效，更新余额
        pass

    def withdraw(self, amount):
        # TODO: 取款方法
        # 验证金额和余额，更新余额
        pass

    @property
    def balance(self):
        # TODO: 余额属性getter
        pass

    def calculate_interest(self, months):
        # TODO: 计算利息
        # 公式: 余额 * 年利率 * (月数/12)
        pass

    @classmethod
    def get_bank_info(cls):
        # TODO: 获取银行信息
        pass

    @staticmethod
    def validate_amount(amount):
        # TODO: 验证金额是否有效
        # 返回布尔值
        pass

# 测试代码
account1 = BankAccount("张三", 1000)
account2 = BankAccount("李四", 5000)

print("=== 银行账户测试 ===")
print(f"张三初始余额: ¥{account1.balance}")
account1.deposit(500)
print(f"存款500后余额: ¥{account1.balance}")
account1.withdraw(200)
print(f"取款200后余额: ¥{account1.balance}")

interest = account1.calculate_interest(12)
print(f"一年利息: ¥{interest:.2f}")

print(BankAccount.get_bank_info())`,
              expectedOutput: `=== 银行账户测试 ===
张三初始余额: ¥1000
存款成功: ¥500
存款500后余额: ¥1500
取款成功: ¥200
取款200后余额: ¥1300
一年利息: ¥39.00
银行: Python银行, 总账户数: 2`,
              hints: [
                "使用__balance作为私有属性存储余额",
                "在deposit和withdraw方法中验证金额是否大于0",
                "withdraw方法需要检查余额是否足够",
                "@property装饰器用于创建只读属性",
                "类方法使用@classmethod装饰器，静态方法使用@staticmethod"
              ]
            },
            order: 2,
            completed: false
          },
          {
            id: 'inheritance-polymorphism',
            title: '继承和多态',
            content: `
# 继承和多态

继承和多态是面向对象编程的核心特性，让代码更加灵活和可重用。

## 继承 (Inheritance)

继承允许一个类获得另一个类的属性和方法。

### 基本语法
\`\`\`python
class Animal:  # 父类/基类
    def __init__(self, name, species):
        self.name = name
        self.species = species

    def make_sound(self):
        print(f"{self.name} 发出声音")

    def info(self):
        return f"动物: {self.name}, 种类: {self.species}"

class Dog(Animal):  # 子类/派生类
    def __init__(self, name, breed):
        super().__init__(name, "犬类")  # 调用父类构造函数
        self.breed = breed

    def make_sound(self):  # 方法重写
        print(f"{self.name} 汪汪叫")

    def fetch(self):  # 子类特有方法
        print(f"{self.name} 去捡球")
\`\`\`

## 方法重写 (Method Overriding)

子类可以重写父类的方法来提供特定的实现。

\`\`\`python
class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name, "猫科")
        self.color = color

    def make_sound(self):  # 重写父类方法
        print(f"{self.name} 喵喵叫")

    def climb(self):
        print(f"{self.name} 爬树")
\`\`\`

## 多态 (Polymorphism)

多态允许不同类的对象对同一消息做出不同的响应。

\`\`\`python
def animal_concert(animals):
    for animal in animals:
        animal.make_sound()  # 多态：不同动物发出不同声音

# 使用多态
animals = [
    Dog("旺财", "金毛"),
    Cat("咪咪", "橘色"),
    Dog("小黑", "拉布拉多")
]

animal_concert(animals)
\`\`\`

## super() 函数

\`super()\` 用于调用父类的方法。

\`\`\`python
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def start(self):
        print(f"{self.brand} {self.model} 启动")

class Car(Vehicle):
    def __init__(self, brand, model, doors):
        super().__init__(brand, model)  # 调用父类构造函数
        self.doors = doors

    def start(self):
        super().start()  # 调用父类方法
        print("汽车引擎运转")
\`\`\`

## 多重继承

Python支持多重继承，但要谨慎使用。

\`\`\`python
class Flyable:
    def fly(self):
        print("在天空中飞翔")

class Swimmable:
    def swim(self):
        print("在水中游泳")

class Duck(Animal, Flyable, Swimmable):
    def __init__(self, name):
        super().__init__(name, "鸭科")

    def make_sound(self):
        print(f"{self.name} 嘎嘎叫")
\`\`\`

## isinstance() 和 issubclass()

检查对象类型和类关系的内置函数。

\`\`\`python
dog = Dog("旺财", "金毛")

print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True
print(issubclass(Dog, Animal))  # True
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 动物园管理系统 - 继承和多态示例
print("=== 动物园管理系统 ===")

class Animal:
    """动物基类"""
    total_animals = 0

    def __init__(self, name, species, age, weight):
        self.name = name
        self.species = species
        self.age = age
        self.weight = weight
        self.health_status = "健康"
        self.hunger_level = 50  # 0-100

        Animal.total_animals += 1
        self.animal_id = f"A{Animal.total_animals:03d}"

    def make_sound(self):
        """发出声音 - 基类方法"""
        print(f"{self.name} 发出声音")

    def eat(self, food_amount):
        """进食"""
        self.hunger_level = max(0, self.hunger_level - food_amount)
        print(f"{self.name} 吃了食物，饥饿度: {self.hunger_level}")

    def sleep(self):
        """睡觉"""
        print(f"{self.name} 正在睡觉")
        self.hunger_level = min(100, self.hunger_level + 10)

    def get_info(self):
        """获取动物信息"""
        return f"""
动物信息:
  ID: {self.animal_id}
  姓名: {self.name}
  种类: {self.species}
  年龄: {self.age}岁
  体重: {self.weight}kg
  健康状态: {self.health_status}
  饥饿度: {self.hunger_level}
        """

    def check_health(self):
        """检查健康状态"""
        if self.hunger_level > 80:
            self.health_status = "饥饿"
        elif self.hunger_level < 20:
            self.health_status = "饱食"
        else:
            self.health_status = "健康"
        return self.health_status

class Mammal(Animal):
    """哺乳动物类"""
    def __init__(self, name, species, age, weight, fur_color):
        super().__init__(name, species, age, weight)
        self.fur_color = fur_color
        self.body_temperature = 37.0

    def regulate_temperature(self):
        """调节体温"""
        print(f"{self.name} 正在调节体温，当前体温: {self.body_temperature}°C")

class Bird(Animal):
    """鸟类"""
    def __init__(self, name, species, age, weight, wing_span):
        super().__init__(name, species, age, weight)
        self.wing_span = wing_span
        self.can_fly = True

    def fly(self):
        """飞行"""
        if self.can_fly:
            print(f"{self.name} 展开 {self.wing_span}cm 的翅膀飞翔")
        else:
            print(f"{self.name} 不能飞行")

    def make_sound(self):
        """重写发声方法"""
        print(f"{self.name} 啁啾鸟鸣")

class Lion(Mammal):
    """狮子类"""
    def __init__(self, name, age, weight, mane_length):
        super().__init__(name, "狮子", age, weight, "金黄色")
        self.mane_length = mane_length
        self.is_king = False

    def make_sound(self):
        """狮子咆哮"""
        print(f"{self.name} 发出震天的咆哮声：ROAR!")

    def hunt(self):
        """狩猎"""
        print(f"{self.name} 正在狩猎")
        self.hunger_level = max(0, self.hunger_level - 30)
        print(f"狩猎成功！饥饿度降低到: {self.hunger_level}")

    def become_king(self):
        """成为狮王"""
        self.is_king = True
        print(f"{self.name} 成为了狮群之王！")

class Elephant(Mammal):
    """大象类"""
    def __init__(self, name, age, weight, trunk_length):
        super().__init__(name, "大象", age, weight, "灰色")
        self.trunk_length = trunk_length
        self.memory_capacity = 100

    def make_sound(self):
        """大象叫声"""
        print(f"{self.name} 发出低沉的象鸣声")

    def spray_water(self):
        """喷水"""
        print(f"{self.name} 用 {self.trunk_length}cm 长的鼻子喷水")

    def remember(self, event):
        """记忆事件"""
        print(f"{self.name} 记住了: {event}")

class Penguin(Bird):
    """企鹅类"""
    def __init__(self, name, age, weight):
        super().__init__(name, "企鹅", age, weight, 30)
        self.can_fly = False  # 企鹅不能飞
        self.swimming_speed = 25  # km/h

    def make_sound(self):
        """企鹅叫声"""
        print(f"{self.name} 发出嘎嘎的企鹅叫声")

    def swim(self):
        """游泳"""
        print(f"{self.name} 以 {self.swimming_speed}km/h 的速度游泳")

    def slide_on_ice(self):
        """在冰上滑行"""
        print(f"{self.name} 在冰上快乐地滑行")

class Eagle(Bird):
    """老鹰类"""
    def __init__(self, name, age, weight):
        super().__init__(name, "老鹰", age, weight, 200)
        self.hunting_success_rate = 0.8

    def make_sound(self):
        """老鹰叫声"""
        print(f"{self.name} 发出尖锐的鹰啸声")

    def dive_attack(self):
        """俯冲攻击"""
        print(f"{self.name} 从高空俯冲攻击")
        import random
        if random.random() < self.hunting_success_rate:
            print("攻击成功！")
            self.hunger_level = max(0, self.hunger_level - 40)
        else:
            print("攻击失败")

# 创建动物园
print("创建动物...")
animals = [
    Lion("辛巴", 5, 180, 25),
    Elephant("大宝", 15, 4000, 150),
    Penguin("波波", 3, 25),
    Eagle("雄鹰", 8, 6),
    Lion("娜娜", 4, 160, 0)  # 母狮子没有鬃毛
]

# 动物信息展示
print("\\n=== 动物园动物信息 ===")
for animal in animals:
    print(animal.get_info())

# 多态演示 - 动物音乐会
print("\\n=== 动物音乐会 ===")
def animal_concert(animal_list):
    """动物音乐会 - 多态演示"""
    for animal in animal_list:
        animal.make_sound()  # 多态：每种动物发出不同声音

animal_concert(animals)

# 特殊行为演示
print("\\n=== 特殊行为演示 ===")
for animal in animals:
    if isinstance(animal, Lion):
        animal.hunt()
        if animal.mane_length > 0:  # 雄狮
            animal.become_king()
    elif isinstance(animal, Elephant):
        animal.spray_water()
        animal.remember("今天的喂食时间")
    elif isinstance(animal, Penguin):
        animal.swim()
        animal.slide_on_ice()
    elif isinstance(animal, Eagle):
        animal.fly()
        animal.dive_attack()

# 喂食时间
print("\\n=== 喂食时间 ===")
for animal in animals:
    print(f"\\n{animal.name} 喂食前状态:")
    animal.check_health()
    animal.eat(30)
    print(f"喂食后健康状态: {animal.check_health()}")

# 类型检查演示
print("\\n=== 类型检查 ===")
simba = animals[0]  # 狮子辛巴
print(f"辛巴是狮子吗? {isinstance(simba, Lion)}")
print(f"辛巴是哺乳动物吗? {isinstance(simba, Mammal)}")
print(f"辛巴是动物吗? {isinstance(simba, Animal)}")
print(f"辛巴是鸟类吗? {isinstance(simba, Bird)}")

print(f"\\n狮子类是动物类的子类吗? {issubclass(Lion, Animal)}")
print(f"企鹅类是鸟类的子类吗? {issubclass(Penguin, Bird)}")

print(f"\\n动物园总动物数: {Animal.total_animals}")`,
            exercise: {
              id: 'inheritance-polymorphism-exercise',
              description: "创建一个员工管理系统，包含基类Employee和子类Manager、Developer，实现继承和多态",
              initialCode: `# 员工管理系统
class Employee:
    """员工基类"""
    company_name = "Python科技公司"
    total_employees = 0

    def __init__(self, name, employee_id, salary):
        # TODO: 初始化员工基本信息
        pass

    def work(self):
        # TODO: 基类工作方法
        pass

    def get_info(self):
        # TODO: 获取员工信息
        pass

    def calculate_bonus(self):
        # TODO: 计算奖金 (基础奖金为工资的10%)
        pass

class Manager(Employee):
    """经理类"""
    def __init__(self, name, employee_id, salary, team_size):
        # TODO: 调用父类构造函数并初始化团队规模
        pass

    def work(self):
        # TODO: 重写工作方法
        pass

    def manage_team(self):
        # TODO: 管理团队方法
        pass

    def calculate_bonus(self):
        # TODO: 经理奖金 = 基础奖金 + 团队规模 * 1000
        pass

class Developer(Employee):
    """开发者类"""
    def __init__(self, name, employee_id, salary, programming_language):
        # TODO: 调用父类构造函数并初始化编程语言
        pass

    def work(self):
        # TODO: 重写工作方法
        pass

    def code(self):
        # TODO: 编程方法
        pass

    def calculate_bonus(self):
        # TODO: 开发者奖金 = 基础奖金 * 1.5
        pass

# 测试代码
employees = [
    Manager("张经理", "M001", 15000, 5),
    Developer("李开发", "D001", 12000, "Python"),
    Developer("王程序", "D002", 11000, "Java"),
    Manager("赵总监", "M002", 20000, 10)
]

print("=== 员工信息 ===")
for emp in employees:
    print(emp.get_info())

print("\\n=== 工作状态 ===")
for emp in employees:
    emp.work()

print("\\n=== 奖金计算 ===")
for emp in employees:
    bonus = emp.calculate_bonus()
    print(f"{emp.name} 的奖金: ¥{bonus}")`,
              expectedOutput: `=== 员工信息 ===
员工: 张经理 (M001), 工资: ¥15000, 团队规模: 5人
员工: 李开发 (D001), 工资: ¥12000, 编程语言: Python
员工: 王程序 (D002), 工资: ¥11000, 编程语言: Java
员工: 赵总监 (M002), 工资: ¥20000, 团队规模: 10人

=== 工作状态 ===
张经理 正在管理团队和制定计划
李开发 正在用 Python 编写代码
王程序 正在用 Java 编写代码
赵总监 正在管理团队和制定计划

=== 奖金计算 ===
张经理 的奖金: ¥6500
李开发 的奖金: ¥1800
王程序 的奖金: ¥1650
赵总监 的奖金: ¥12000`,
              hints: [
                "使用super().__init__()调用父类构造函数",
                "子类可以重写父类的方法来提供特定实现",
                "Manager的奖金 = salary * 0.1 + team_size * 1000",
                "Developer的奖金 = salary * 0.1 * 1.5",
                "使用isinstance()检查对象类型"
              ]
            },
            order: 3,
            completed: false
          },
          {
            id: 'special-methods',
            title: '特殊方法(魔术方法)',
            content: `
# 特殊方法(魔术方法)

特殊方法是Python中以双下划线开头和结尾的方法，它们定义了对象的行为。

## 常用特殊方法

### 1. 构造和析构
- \`__init__(self)\`: 构造方法
- \`__del__(self)\`: 析构方法
- \`__new__(cls)\`: 创建实例

### 2. 字符串表示
- \`__str__(self)\`: 用户友好的字符串表示
- \`__repr__(self)\`: 开发者友好的字符串表示

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name} ({self.age}岁)"

    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

person = Person("张三", 25)
print(str(person))   # 张三 (25岁)
print(repr(person))  # Person('张三', 25)
\`\`\`

### 3. 比较运算符
- \`__eq__(self, other)\`: 等于 (==)
- \`__ne__(self, other)\`: 不等于 (!=)
- \`__lt__(self, other)\`: 小于 (<)
- \`__le__(self, other)\`: 小于等于 (<=)
- \`__gt__(self, other)\`: 大于 (>)
- \`__ge__(self, other)\`: 大于等于 (>=)

\`\`\`python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def __eq__(self, other):
        return self.score == other.score

    def __lt__(self, other):
        return self.score < other.score

    def __str__(self):
        return f"{self.name}: {self.score}分"

s1 = Student("张三", 85)
s2 = Student("李四", 90)
print(s1 < s2)  # True
print(s1 == s2) # False
\`\`\`

### 4. 算术运算符
- \`__add__(self, other)\`: 加法 (+)
- \`__sub__(self, other)\`: 减法 (-)
- \`__mul__(self, other)\`: 乘法 (*)
- \`__truediv__(self, other)\`: 除法 (/)

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # Vector(4, 6)
v4 = v1 * 3   # Vector(3, 6)
\`\`\`

### 5. 容器方法
- \`__len__(self)\`: 长度 len()
- \`__getitem__(self, key)\`: 索引访问 []
- \`__setitem__(self, key, value)\`: 索引赋值
- \`__contains__(self, item)\`: 成员测试 in

\`\`\`python
class MyList:
    def __init__(self):
        self.items = []

    def __len__(self):
        return len(self.items)

    def __getitem__(self, index):
        return self.items[index]

    def __setitem__(self, index, value):
        self.items[index] = value

    def __contains__(self, item):
        return item in self.items

    def append(self, item):
        self.items.append(item)

my_list = MyList()
my_list.append("hello")
print(len(my_list))     # 1
print(my_list[0])       # hello
print("hello" in my_list) # True
\`\`\`

### 6. 调用方法
- \`__call__(self)\`: 使对象可调用

\`\`\`python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor

double = Multiplier(2)
print(double(5))  # 10，相当于 double.__call__(5)
\`\`\`
            `,
            type: 'tutorial',
            codeExample: `# 智能计算器类 - 特殊方法示例
print("=== 智能计算器系统 ===")

class SmartNumber:
    """智能数字类 - 演示各种特殊方法"""

    def __init__(self, value, name=""):
        self.value = value
        self.name = name
        self.history = [f"创建: {value}"]

    def __str__(self):
        """用户友好的字符串表示"""
        if self.name:
            return f"{self.name}: {self.value}"
        return str(self.value)

    def __repr__(self):
        """开发者友好的字符串表示"""
        return f"SmartNumber({self.value}, '{self.name}')"

    # 比较运算符
    def __eq__(self, other):
        if isinstance(other, SmartNumber):
            return self.value == other.value
        return self.value == other

    def __lt__(self, other):
        if isinstance(other, SmartNumber):
            return self.value < other.value
        return self.value < other

    def __le__(self, other):
        if isinstance(other, SmartNumber):
            return self.value <= other.value
        return self.value <= other

    def __gt__(self, other):
        if isinstance(other, SmartNumber):
            return self.value > other.value
        return self.value > other

    def __ge__(self, other):
        if isinstance(other, SmartNumber):
            return self.value >= other.value
        return self.value >= other

    # 算术运算符
    def __add__(self, other):
        if isinstance(other, SmartNumber):
            result = SmartNumber(self.value + other.value)
            result.history = self.history + [f"+ {other.value} = {result.value}"]
        else:
            result = SmartNumber(self.value + other)
            result.history = self.history + [f"+ {other} = {result.value}"]
        return result

    def __sub__(self, other):
        if isinstance(other, SmartNumber):
            result = SmartNumber(self.value - other.value)
            result.history = self.history + [f"- {other.value} = {result.value}"]
        else:
            result = SmartNumber(self.value - other)
            result.history = self.history + [f"- {other} = {result.value}"]
        return result

    def __mul__(self, other):
        if isinstance(other, SmartNumber):
            result = SmartNumber(self.value * other.value)
            result.history = self.history + [f"* {other.value} = {result.value}"]
        else:
            result = SmartNumber(self.value * other)
            result.history = self.history + [f"* {other} = {result.value}"]
        return result

    def __truediv__(self, other):
        if isinstance(other, SmartNumber):
            if other.value == 0:
                raise ValueError("除数不能为零")
            result = SmartNumber(self.value / other.value)
            result.history = self.history + [f"/ {other.value} = {result.value}"]
        else:
            if other == 0:
                raise ValueError("除数不能为零")
            result = SmartNumber(self.value / other)
            result.history = self.history + [f"/ {other} = {result.value}"]
        return result

    def __pow__(self, other):
        if isinstance(other, SmartNumber):
            result = SmartNumber(self.value ** other.value)
            result.history = self.history + [f"** {other.value} = {result.value}"]
        else:
            result = SmartNumber(self.value ** other)
            result.history = self.history + [f"** {other} = {result.value}"]
        return result

    # 反向运算符
    def __radd__(self, other):
        return SmartNumber(other + self.value)

    def __rmul__(self, other):
        return SmartNumber(other * self.value)

    # 增强赋值运算符
    def __iadd__(self, other):
        if isinstance(other, SmartNumber):
            self.value += other.value
            self.history.append(f"+= {other.value} = {self.value}")
        else:
            self.value += other
            self.history.append(f"+= {other} = {self.value}")
        return self

    # 一元运算符
    def __neg__(self):
        result = SmartNumber(-self.value)
        result.history = self.history + [f"负数: -{self.value}"]
        return result

    def __abs__(self):
        result = SmartNumber(abs(self.value))
        result.history = self.history + [f"绝对值: |{self.value}| = {result.value}"]
        return result

    # 类型转换
    def __int__(self):
        return int(self.value)

    def __float__(self):
        return float(self.value)

    def __bool__(self):
        return bool(self.value)

    # 其他特殊方法
    def __len__(self):
        """返回历史记录的长度"""
        return len(self.history)

    def __call__(self, operation, other):
        """使对象可调用，执行指定运算"""
        if operation == '+':
            return self + other
        elif operation == '-':
            return self - other
        elif operation == '*':
            return self * other
        elif operation == '/':
            return self / other
        elif operation == '**':
            return self ** other
        else:
            raise ValueError(f"不支持的运算: {operation}")

    def get_history(self):
        """获取计算历史"""
        return "\\n".join(self.history)

class Calculator:
    """计算器类 - 演示容器特殊方法"""

    def __init__(self):
        self.memory = {}
        self.results = []

    def __setitem__(self, key, value):
        """存储到内存"""
        self.memory[key] = value
        print(f"存储到内存 {key}: {value}")

    def __getitem__(self, key):
        """从内存读取"""
        if key in self.memory:
            return self.memory[key]
        raise KeyError(f"内存中没有 {key}")

    def __contains__(self, key):
        """检查内存中是否存在"""
        return key in self.memory

    def __len__(self):
        """返回内存中存储的数量"""
        return len(self.memory)

    def __str__(self):
        return f"计算器 (内存: {len(self.memory)} 项)"

# 创建智能数字
print("创建智能数字...")
a = SmartNumber(10, "数字A")
b = SmartNumber(5, "数字B")
c = SmartNumber(3, "数字C")

print(f"a = {a}")
print(f"b = {b}")
print(f"c = {c}")

# 算术运算演示
print("\\n=== 算术运算演示 ===")
result1 = a + b
print(f"{a} + {b} = {result1}")

result2 = a * c
print(f"{a} * {c} = {result2}")

result3 = a / b
print(f"{a} / {b} = {result3}")

result4 = a ** 2
print(f"{a} ** 2 = {result4}")

# 比较运算演示
print("\\n=== 比较运算演示 ===")
print(f"{a} > {b}: {a > b}")
print(f"{a} == {b}: {a == b}")
print(f"{b} < {a}: {b < a}")

# 一元运算演示
print("\\n=== 一元运算演示 ===")
neg_a = -a
print(f"-{a} = {neg_a}")

abs_neg = abs(neg_a)
print(f"abs({neg_a}) = {abs_neg}")

# 增强赋值演示
print("\\n=== 增强赋值演示 ===")
d = SmartNumber(20, "数字D")
print(f"d 初始值: {d}")
d += 5
print(f"d += 5: {d}")

# 可调用对象演示
print("\\n=== 可调用对象演示 ===")
result5 = a('*', 3)
print(f"{a}('*', 3) = {result5}")

result6 = b('+', 10)
print(f"{b}('+', 10) = {result6}")

# 类型转换演示
print("\\n=== 类型转换演示 ===")
print(f"int({a}) = {int(a)}")
print(f"float({b}) = {float(b)}")
print(f"bool(SmartNumber(0)) = {bool(SmartNumber(0))}")
print(f"bool({a}) = {bool(a)}")

# 计算器内存演示
print("\\n=== 计算器内存演示 ===")
calc = Calculator()
print(f"计算器: {calc}")

# 存储结果到内存
calc['result1'] = result1
calc['result2'] = result2
calc['sum'] = result1 + result2

print(f"内存大小: {len(calc)}")
print(f"'result1' 在内存中: {'result1' in calc}")
print(f"从内存读取 result1: {calc['result1']}")

# 显示计算历史
print("\\n=== 计算历史 ===")
print(f"result1 的历史 (共{len(result1)}步):")
print(result1.get_history())

print(f"\\nresult2 的历史 (共{len(result2)}步):")
print(result2.get_history())

# 链式运算
print("\\n=== 链式运算演示 ===")
chain_result = SmartNumber(1) + 2 * 3 - 1
print(f"链式运算结果: {chain_result}")
print("链式运算历史:")
print(chain_result.get_history())`,
            exercise: {
              id: 'special-methods-exercise',
              description: "创建一个智能字符串类，实现各种特殊方法来增强字符串功能",
              initialCode: `# 智能字符串类
class SmartString:
    """智能字符串类 - 实现特殊方法"""

    def __init__(self, text):
        # TODO: 初始化字符串和操作历史
        pass

    def __str__(self):
        # TODO: 返回字符串内容
        pass

    def __repr__(self):
        # TODO: 返回对象的表示
        pass

    def __len__(self):
        # TODO: 返回字符串长度
        pass

    def __getitem__(self, index):
        # TODO: 支持索引访问
        pass

    def __contains__(self, item):
        # TODO: 支持 in 操作符
        pass

    def __add__(self, other):
        # TODO: 支持字符串连接
        pass

    def __mul__(self, times):
        # TODO: 支持字符串重复
        pass

    def __eq__(self, other):
        # TODO: 支持相等比较
        pass

    def __lt__(self, other):
        # TODO: 支持小于比较(按长度)
        pass

    def __call__(self, operation):
        # TODO: 使对象可调用，执行字符串操作
        # 支持: 'upper', 'lower', 'reverse', 'count_vowels'
        pass

    def get_history(self):
        # TODO: 返回操作历史
        pass

# 测试代码
s1 = SmartString("Hello")
s2 = SmartString("World")

print("=== 基本操作 ===")
print(f"s1: {s1}")
print(f"s2: {s2}")
print(f"长度: {len(s1)}")
print(f"索引[1]: {s1[1]}")
print(f"包含'ell': {'ell' in s1}")

print("\\n=== 运算操作 ===")
s3 = s1 + " " + s2
print(f"连接: {s3}")

s4 = s1 * 3
print(f"重复: {s4}")

print("\\n=== 比较操作 ===")
print(f"s1 == s2: {s1 == s2}")
print(f"s1 < s2: {s1 < s2}")

print("\\n=== 可调用操作 ===")
upper_s1 = s1('upper')
print(f"大写: {upper_s1}")

reversed_s1 = s1('reverse')
print(f"反转: {reversed_s1}")

vowel_count = s1('count_vowels')
print(f"元音数量: {vowel_count}")`,
              expectedOutput: `=== 基本操作 ===
s1: Hello
s2: World
长度: 5
索引[1]: e
包含'ell': True

=== 运算操作 ===
连接: Hello World
重复: HelloHelloHello

=== 比较操作 ===
s1 == s2: False
s1 < s2: False

=== 可调用操作 ===
大写: HELLO
反转: olleH
元音数量: 2`,
              hints: [
                "在__init__中存储text和空的history列表",
                "__add__方法应该创建新的SmartString对象",
                "__mul__方法使用字符串的*操作符",
                "__call__方法根据operation参数执行不同操作",
                "count_vowels需要计算'aeiouAEIOU'中的字符数量"
              ]
            },
            order: 4,
            completed: false
          },
          {
            id: 'modules-packages',
            title: '模块和包',
            content: `
# 模块和包

模块和包是Python代码组织和重用的重要机制。

## 模块 (Module)

模块是包含Python代码的文件，以.py为扩展名。

### 创建模块
\`\`\`python
# math_utils.py
def add(a, b):
    """加法函数"""
    return a + b

def multiply(a, b):
    """乘法函数"""
    return a * b

PI = 3.14159

class Calculator:
    def __init__(self):
        self.result = 0

    def calculate(self, operation, a, b):
        if operation == '+':
            return add(a, b)
        elif operation == '*':
            return multiply(a, b)
\`\`\`

### 导入模块
\`\`\`python
# 方式1: 导入整个模块
import math_utils
result = math_utils.add(5, 3)

# 方式2: 导入特定函数
from math_utils import add, multiply
result = add(5, 3)

# 方式3: 导入所有内容
from math_utils import *

# 方式4: 使用别名
import math_utils as mu
result = mu.add(5, 3)
\`\`\`

## 包 (Package)

包是包含多个模块的目录，必须包含__init__.py文件。

### 包结构示例
\`\`\`
mypackage/
    __init__.py
    module1.py
    module2.py
    subpackage/
        __init__.py
        submodule.py
\`\`\`

### __init__.py文件
\`\`\`python
# mypackage/__init__.py
from .module1 import function1
from .module2 import function2

__all__ = ['function1', 'function2']
__version__ = '1.0.0'
\`\`\`

### 导入包
\`\`\`python
# 导入包中的模块
from mypackage import module1
from mypackage.subpackage import submodule

# 导入包中的函数
from mypackage import function1
\`\`\`

## 内置模块

Python提供了许多内置模块：

### math模块
\`\`\`python
import math

print(math.pi)        # 3.141592653589793
print(math.sqrt(16))  # 4.0
print(math.sin(math.pi/2))  # 1.0
\`\`\`

### random模块
\`\`\`python
import random

print(random.randint(1, 10))    # 随机整数
print(random.choice(['a', 'b', 'c']))  # 随机选择
print(random.random())          # 0-1随机浮点数
\`\`\`

### datetime模块
\`\`\`python
from datetime import datetime, date

now = datetime.now()
today = date.today()
print(f"现在时间: {now}")
print(f"今天日期: {today}")
\`\`\`

## 模块搜索路径

Python按以下顺序搜索模块：
1. 当前目录
2. PYTHONPATH环境变量指定的目录
3. 标准库目录
4. site-packages目录

\`\`\`python
import sys
print(sys.path)  # 查看模块搜索路径
\`\`\`

## 最佳实践

1. **模块命名**: 使用小写字母和下划线
2. **包结构**: 逻辑清晰的目录结构
3. **文档字符串**: 为模块和函数添加文档
4. **__all__变量**: 控制from module import *的行为
5. **相对导入**: 在包内使用相对导入
            `,
            type: 'tutorial',
            codeExample: `# 学生管理系统 - 模块和包示例
print("=== 学生管理系统 ===")

# 模拟不同的模块文件内容

# ========== student.py 模块 ==========
class Student:
    """学生类"""
    def __init__(self, student_id, name, age, grade):
        self.student_id = student_id
        self.name = name
        self.age = age
        self.grade = grade
        self.courses = []

    def add_course(self, course):
        if course not in self.courses:
            self.courses.append(course)
            print(f"{self.name} 添加了课程: {course}")

    def remove_course(self, course):
        if course in self.courses:
            self.courses.remove(course)
            print(f"{self.name} 移除了课程: {course}")

    def get_info(self):
        return {
            'id': self.student_id,
            'name': self.name,
            'age': self.age,
            'grade': self.grade,
            'courses': self.courses
        }

    def __str__(self):
        return f"学生: {self.name} (ID: {self.student_id})"

# ========== course.py 模块 ==========
class Course:
    """课程类"""
    def __init__(self, course_id, name, credits, teacher):
        self.course_id = course_id
        self.name = name
        self.credits = credits
        self.teacher = teacher
        self.students = []

    def add_student(self, student):
        if student not in self.students:
            self.students.append(student)
            student.add_course(self.name)

    def remove_student(self, student):
        if student in self.students:
            self.students.remove(student)
            student.remove_course(self.name)

    def get_student_count(self):
        return len(self.students)

    def __str__(self):
        return f"课程: {self.name} (教师: {self.teacher})"

# ========== grade.py 模块 ==========
class Grade:
    """成绩类"""
    def __init__(self, student, course, score):
        self.student = student
        self.course = course
        self.score = score
        self.letter_grade = self._calculate_letter_grade()

    def _calculate_letter_grade(self):
        if self.score >= 90:
            return 'A'
        elif self.score >= 80:
            return 'B'
        elif self.score >= 70:
            return 'C'
        elif self.score >= 60:
            return 'D'
        else:
            return 'F'

    def is_passing(self):
        return self.score >= 60

    def __str__(self):
        return f"{self.student.name} - {self.course.name}: {self.score} ({self.letter_grade})"

# ========== utils.py 模块 ==========
def calculate_gpa(grades):
    """计算GPA"""
    if not grades:
        return 0.0

    grade_points = {'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0}
    total_points = sum(grade_points[grade.letter_grade] for grade in grades)
    return total_points / len(grades)

def generate_student_id():
    """生成学生ID"""
    import random
    return f"STU{random.randint(1000, 9999)}"

def format_student_report(student, grades):
    """格式化学生报告"""
    report = f"\\n=== {student.name} 的成绩报告 ===\\n"
    report += f"学号: {student.student_id}\\n"
    report += f"年级: {student.grade}\\n"
    report += f"年龄: {student.age}\\n"
    report += "\\n课程成绩:\\n"

    for grade in grades:
        if grade.student == student:
            status = "通过" if grade.is_passing() else "不及格"
            report += f"  {grade.course.name}: {grade.score} ({grade.letter_grade}) - {status}\\n"

    student_grades = [g for g in grades if g.student == student]
    gpa = calculate_gpa(student_grades)
    report += f"\\nGPA: {gpa:.2f}\\n"

    return report

# ========== statistics.py 模块 ==========
def get_course_statistics(course, grades):
    """获取课程统计信息"""
    course_grades = [g for g in grades if g.course == course]

    if not course_grades:
        return "该课程暂无成绩记录"

    scores = [g.score for g in course_grades]

    stats = {
        'course_name': course.name,
        'student_count': len(course_grades),
        'average_score': sum(scores) / len(scores),
        'highest_score': max(scores),
        'lowest_score': min(scores),
        'passing_rate': len([g for g in course_grades if g.is_passing()]) / len(course_grades) * 100
    }

    return stats

def get_grade_distribution(grades):
    """获取成绩分布"""
    distribution = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0}

    for grade in grades:
        distribution[grade.letter_grade] += 1

    return distribution

# ========== 主程序 ==========
# 模拟导入模块的效果
print("导入学生管理系统模块...")

# 创建学生
students = [
    Student(generate_student_id(), "张三", 20, "大二"),
    Student(generate_student_id(), "李四", 19, "大一"),
    Student(generate_student_id(), "王五", 21, "大三"),
    Student(generate_student_id(), "赵六", 20, "大二")
]

# 创建课程
courses = [
    Course("CS101", "Python编程", 3, "张教授"),
    Course("MATH201", "高等数学", 4, "李教授"),
    Course("ENG101", "大学英语", 2, "王教授")
]

# 学生选课
print("\\n=== 学生选课 ===")
for student in students:
    for course in courses[:2]:  # 每个学生选前两门课
        course.add_student(student)

# 添加成绩
print("\\n=== 录入成绩 ===")
import random
grades = []

for student in students:
    for course in student.courses:
        course_obj = next(c for c in courses if c.name == course)
        score = random.randint(60, 100)  # 随机生成60-100的成绩
        grade = Grade(student, course_obj, score)
        grades.append(grade)
        print(f"录入成绩: {grade}")

# 生成学生报告
print("\\n=== 学生成绩报告 ===")
for student in students:
    report = format_student_report(student, grades)
    print(report)

# 课程统计
print("\\n=== 课程统计 ===")
for course in courses:
    stats = get_course_statistics(course, grades)
    if isinstance(stats, dict):
        print(f"\\n{stats['course_name']} 统计:")
        print(f"  选课人数: {stats['student_count']}")
        print(f"  平均分: {stats['average_score']:.1f}")
        print(f"  最高分: {stats['highest_score']}")
        print(f"  最低分: {stats['lowest_score']}")
        print(f"  及格率: {stats['passing_rate']:.1f}%")
    else:
        print(f"\\n{course.name}: {stats}")

# 成绩分布
print("\\n=== 总体成绩分布 ===")
distribution = get_grade_distribution(grades)
total_grades = sum(distribution.values())

for letter, count in distribution.items():
    percentage = (count / total_grades * 100) if total_grades > 0 else 0
    print(f"{letter}: {count} 人 ({percentage:.1f}%)")

# 模拟模块信息
print("\\n=== 模块信息 ===")
modules_info = {
    'student': 'Student类定义',
    'course': 'Course类定义',
    'grade': 'Grade类和成绩计算',
    'utils': '工具函数集合',
    'statistics': '统计分析函数'
}

for module, description in modules_info.items():
    print(f"{module}.py: {description}")

print("\\n学生管理系统演示完成！")`,
            exercise: {
              id: 'modules-packages-exercise',
              description: "创建一个图书馆管理系统，使用模块化设计分离不同功能",
              initialCode: `# 图书馆管理系统 - 模块化设计

# ========== book.py 模块 ==========
class Book:
    """图书类"""
    def __init__(self, isbn, title, author, category, available=True):
        # TODO: 初始化图书信息
        pass

    def borrow(self):
        # TODO: 借书操作
        pass

    def return_book(self):
        # TODO: 还书操作
        pass

    def get_info(self):
        # TODO: 获取图书信息
        pass

    def __str__(self):
        # TODO: 字符串表示
        pass

# ========== member.py 模块 ==========
class Member:
    """会员类"""
    def __init__(self, member_id, name, email):
        # TODO: 初始化会员信息
        pass

    def borrow_book(self, book):
        # TODO: 借书
        pass

    def return_book(self, book):
        # TODO: 还书
        pass

    def get_borrowed_books(self):
        # TODO: 获取已借图书列表
        pass

    def __str__(self):
        # TODO: 字符串表示
        pass

# ========== library_utils.py 模块 ==========
def generate_member_id():
    """生成会员ID"""
    # TODO: 生成唯一会员ID
    pass

def search_books_by_title(books, title):
    """按标题搜索图书"""
    # TODO: 实现标题搜索
    pass

def search_books_by_author(books, author):
    """按作者搜索图书"""
    # TODO: 实现作者搜索
    pass

def get_available_books(books):
    """获取可借阅图书"""
    # TODO: 返回可借阅的图书列表
    pass

def calculate_overdue_fee(days_overdue, daily_fee=1.0):
    """计算逾期费用"""
    # TODO: 计算逾期费用
    pass

# ========== library_stats.py 模块 ==========
def get_library_statistics(books, members):
    """获取图书馆统计信息"""
    # TODO: 计算图书馆统计数据
    # 返回字典包含: 总图书数、可借图书数、已借图书数、会员数
    pass

def get_popular_books(books, limit=5):
    """获取热门图书"""
    # TODO: 返回借阅次数最多的图书
    pass

def get_category_distribution(books):
    """获取图书分类分布"""
    # TODO: 返回各分类的图书数量
    pass

# ========== 主程序测试 ==========
print("=== 图书馆管理系统 ===")

# 创建图书
books = [
    Book("978-1", "Python编程", "张三", "计算机"),
    Book("978-2", "数据结构", "李四", "计算机"),
    Book("978-3", "文学概论", "王五", "文学"),
    Book("978-4", "历史研究", "赵六", "历史")
]

# 创建会员
members = [
    Member(generate_member_id(), "小明", "xiaoming@email.com"),
    Member(generate_member_id(), "小红", "xiaohong@email.com")
]

print("\\n=== 图书信息 ===")
for book in books:
    print(book.get_info())

print("\\n=== 会员信息 ===")
for member in members:
    print(member)

print("\\n=== 借书操作 ===")
members[0].borrow_book(books[0])
members[0].borrow_book(books[1])
members[1].borrow_book(books[2])

print("\\n=== 搜索功能 ===")
python_books = search_books_by_title(books, "Python")
print(f"标题包含'Python'的图书: {len(python_books)}本")

available = get_available_books(books)
print(f"可借阅图书: {len(available)}本")

print("\\n=== 统计信息 ===")
stats = get_library_statistics(books, members)
print(f"图书馆统计: {stats}")

distribution = get_category_distribution(books)
print(f"分类分布: {distribution}")`,
              expectedOutput: `=== 图书馆管理系统 ===

=== 图书信息 ===
《Python编程》- 张三 (计算机) [可借阅]
《数据结构》- 李四 (计算机) [可借阅]
《文学概论》- 王五 (文学) [可借阅]
《历史研究》- 赵六 (历史) [可借阅]

=== 会员信息 ===
会员: 小明 (ID: M1001)
会员: 小红 (ID: M1002)

=== 借书操作 ===
小明 借阅了 《Python编程》
小明 借阅了 《数据结构》
小红 借阅了 《文学概论》

=== 搜索功能 ===
标题包含'Python'的图书: 1本
可借阅图书: 1本

=== 统计信息 ===
图书馆统计: {'总图书数': 4, '可借图书数': 1, '已借图书数': 3, '会员数': 2}
分类分布: {'计算机': 2, '文学': 1, '历史': 1}`,
              hints: [
                "Book类需要跟踪借阅状态和借阅次数",
                "Member类需要维护已借图书列表",
                "搜索函数使用字符串的in操作符",
                "统计函数需要遍历所有图书和会员",
                "generate_member_id可以使用随机数或递增计数器"
              ]
            },
            order: 5,
            completed: false
          }
        ]
      }
    ];
  }

  private loadUserProgress(): void {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.userProgressSubject.next(progress);
    } else {
      const defaultProgress: UserProgress = {
        userId: 'default-user',
        courseId: 'python-basics',
        completedLessons: [],
        currentLesson: 'variables',
        score: 0,
        timeSpent: 0,
        lastAccessed: new Date()
      };
      this.userProgressSubject.next(defaultProgress);
    }
  }

  public setCurrentLesson(lessonId: string): void {
    const course = this.currentCourseSubject.value;
    if (course) {
      for (const module of course.modules) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          this.currentLessonSubject.next(lesson);
          this.updateUserProgress(lessonId);
          break;
        }
      }
    }
  }

  public markLessonCompleted(lessonId: string): void {
    const progress = this.userProgressSubject.value;
    if (progress && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.lastAccessed = new Date();
      this.userProgressSubject.next(progress);
      this.saveUserProgress(progress);
    }
  }

  private updateUserProgress(lessonId: string): void {
    const progress = this.userProgressSubject.value;
    if (progress) {
      progress.currentLesson = lessonId;
      progress.lastAccessed = new Date();
      this.userProgressSubject.next(progress);
      this.saveUserProgress(progress);
    }
  }

  private saveUserProgress(progress: UserProgress): void {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }

  public getCourse(): Observable<Course | null> {
    return this.currentCourse$;
  }

  public getCurrentLesson(): Observable<Lesson | null> {
    return this.currentLesson$;
  }

  public getUserProgress(): Observable<UserProgress | null> {
    return this.userProgress$;
  }
}
