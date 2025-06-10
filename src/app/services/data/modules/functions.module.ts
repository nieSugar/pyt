import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class FunctionsModule {

  getModule(): Module {
    return {
      id: 'functions',
      title: '函数',
      description: '函数定义、参数和返回值',
      order: 4,
      lessons: [
        {
          id: 'function-basics',
          title: '函数基础',
          type: 'tutorial',
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
\`\`\`

## 返回值
\`\`\`python
def calculate_area(length, width):
    area = length * width
    return area

# 使用返回值
room_area = calculate_area(5, 4)
print(f"房间面积: {room_area} 平方米")
\`\`\`
          `,
          codeExample: `# 函数练习
def welcome():
    print("欢迎来到Python学习平台！")

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

# 测试函数
welcome()

weight = 70  # 公斤
height = 1.75  # 米

bmi = calculate_bmi(weight, height)
category = get_bmi_category(bmi)

print(f"体重: {weight}kg, 身高: {height}m")
print(f"BMI: {bmi}")
print(f"体重类别: {category}")`,
          order: 1,
          completed: false
        },
        {
          id: 'advanced-parameters',
          title: '高级参数用法',
          type: 'tutorial',
          content: `
# Python 高级参数用法

学习函数的默认参数、关键字参数和可变参数。

## 默认参数
\`\`\`python
def greet(name, greeting="你好"):
    print(f"{greeting}, {name}!")

greet("张三")           # 你好, 张三!
greet("李四", "早上好")  # 早上好, 李四!
\`\`\`

## 关键字参数
\`\`\`python
def create_profile(name, age, city="北京", job="学生"):
    return f"{name}, {age}岁, 来自{city}, 职业: {job}"

# 使用关键字参数
profile = create_profile("王五", age=25, job="程序员")
print(profile)
\`\`\`

## 可变参数 (*args)
\`\`\`python
def sum_numbers(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

result = sum_numbers(1, 2, 3, 4, 5)
print(f"总和: {result}")  # 总和: 15
\`\`\`

## 关键字可变参数 (**kwargs)
\`\`\`python
def create_student(**info):
    print("学生信息:")
    for key, value in info.items():
        print(f"  {key}: {value}")

create_student(name="赵六", age=20, major="计算机科学", gpa=3.8)
\`\`\`
          `,
          codeExample: `# 高级参数练习
def calculate_grade(name, *scores, **options):
    """计算学生成绩

    Args:
        name: 学生姓名
        *scores: 各科成绩
        **options: 额外选项 (如权重、是否显示详情等)
    """
    if not scores:
        return f"{name}: 没有成绩记录"

    # 计算平均分
    average = sum(scores) / len(scores)

    # 检查选项
    show_details = options.get('show_details', False)
    weight = options.get('weight', 1.0)

    # 应用权重
    weighted_average = average * weight

    result = f"{name}: 平均分 {average:.1f}"
    if weight != 1.0:
        result += f" (加权后: {weighted_average:.1f})"

    if show_details:
        result += f"\\n  各科成绩: {scores}"
        result += f"\\n  总分: {sum(scores)}"
        result += f"\\n  科目数: {len(scores)}"

    return result

# 测试函数
print(calculate_grade("张三", 85, 92, 78, 96))
print()
print(calculate_grade("李四", 88, 91, 85, show_details=True))
print()
print(calculate_grade("王五", 90, 87, 93, weight=1.1, show_details=True))`,
          order: 2,
          completed: false
        },
        {
          id: 'lambda-decorators',
          title: 'Lambda函数和装饰器',
          type: 'tutorial',
          content: `
# Lambda函数和装饰器

学习Python中的高级函数概念。

## Lambda函数
Lambda函数是一种创建小型匿名函数的方式。

\`\`\`python
# 普通函数
def square(x):
    return x ** 2

# Lambda函数
square_lambda = lambda x: x ** 2

print(square(5))        # 25
print(square_lambda(5)) # 25
\`\`\`

## Lambda在高阶函数中的应用
\`\`\`python
numbers = [1, 2, 3, 4, 5]

# 使用map
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# 使用filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)    # [2, 4]

# 使用sorted
students = [('张三', 85), ('李四', 92), ('王五', 78)]
sorted_by_score = sorted(students, key=lambda x: x[1])
print(sorted_by_score)  # [('王五', 78), ('张三', 85), ('李四', 92)]
\`\`\`

## 装饰器基础
装饰器是修改或增强函数功能的工具。

\`\`\`python
def timer_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} 执行时间: {end_time - start_time:.4f}秒")
        return result
    return wrapper

@timer_decorator
def slow_function():
    import time
    time.sleep(1)
    return "完成"

result = slow_function()
\`\`\`
          `,
          codeExample: `# Lambda和装饰器练习
import time
from functools import wraps

# 装饰器示例
def log_calls(func):
    """记录函数调用的装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"调用函数: {func.__name__}")
        print(f"参数: args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"返回值: {result}")
        print("-" * 30)
        return result
    return wrapper

def validate_positive(func):
    """验证参数为正数的装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg <= 0:
                raise ValueError(f"参数必须为正数，得到: {arg}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
@validate_positive
def calculate_compound_interest(principal, rate, time):
    """计算复利"""
    return principal * (1 + rate) ** time

# Lambda函数应用
students_data = [
    {'name': '张三', 'math': 85, 'english': 92, 'science': 78},
    {'name': '李四', 'math': 92, 'english': 88, 'science': 95},
    {'name': '王五', 'math': 78, 'english': 85, 'science': 82}
]

# 计算每个学生的平均分
students_with_avg = list(map(
    lambda student: {
        **student,
        'average': (student['math'] + student['english'] + student['science']) / 3
    },
    students_data
))

# 按平均分排序
sorted_students = sorted(students_with_avg, key=lambda x: x['average'], reverse=True)

print("学生成绩排名:")
for i, student in enumerate(sorted_students, 1):
    print(f"{i}. {student['name']}: 平均分 {student['average']:.1f}")

print("\\n复利计算示例:")
try:
    result = calculate_compound_interest(1000, 0.05, 3)
    print(f"最终金额: {result:.2f}")
except ValueError as e:
    print(f"错误: {e}")`,
          order: 3,
          completed: false
        }
      ]
    };
  }
}
