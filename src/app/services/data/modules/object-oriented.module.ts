import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectOrientedModule {

  getModule(): Module {
    return {
      id: 'object-oriented',
      title: '面向对象编程',
      description: '类、对象、继承和多态',
      order: 7,
      lessons: [
        {
          id: 'classes-objects',
          title: '类和对象',
          type: 'tutorial',
          content: `
# Python 类和对象

面向对象编程是一种重要的编程范式。

## 定义类

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"我叫{self.name}，今年{self.age}岁")
    
    def study(self, subject):
        print(f"{self.name}正在学习{subject}")
\`\`\`

## 创建对象

\`\`\`python
# 创建学生对象
student1 = Student("张三", 20)
student2 = Student("李四", 21)

# 调用方法
student1.introduce()  # 输出: 我叫张三，今年20岁
student1.study("Python")  # 输出: 张三正在学习Python
\`\`\`
          `,
          codeExample: `# 学生管理系统示例
class Student:
    def __init__(self, student_id, name, age, major):
        self.student_id = student_id
        self.name = name
        self.age = age
        self.major = major
        self.courses = []
        self.grades = {}
    
    def enroll_course(self, course):
        if course not in self.courses:
            self.courses.append(course)
            print(f"{self.name} 已选修 {course}")
    
    def add_grade(self, course, grade):
        if course in self.courses:
            self.grades[course] = grade
            print(f"{self.name} 的 {course} 成绩: {grade}")
    
    def get_gpa(self):
        if not self.grades:
            return 0
        return sum(self.grades.values()) / len(self.grades)
    
    def display_info(self):
        print(f"学号: {self.student_id}")
        print(f"姓名: {self.name}")
        print(f"年龄: {self.age}")
        print(f"专业: {self.major}")
        print(f"已选课程: {', '.join(self.courses)}")
        print(f"平均成绩: {self.get_gpa():.2f}")

# 创建学生并测试
student = Student("S001", "张三", 20, "计算机科学")
student.enroll_course("Python编程")
student.enroll_course("数据结构")
student.add_grade("Python编程", 95)
student.add_grade("数据结构", 88)
student.display_info()`,
          order: 1,
          completed: false
        },
        {
          id: 'properties-methods',
          title: '属性和方法',
          type: 'tutorial',
          content: `
# Python 属性和方法

深入学习类的属性和方法的高级用法。

## 实例属性 vs 类属性
\`\`\`python
class Student:
    # 类属性
    school_name = "Python学院"
    student_count = 0

    def __init__(self, name, age):
        # 实例属性
        self.name = name
        self.age = age
        Student.student_count += 1

    @classmethod
    def get_student_count(cls):
        return cls.student_count

    @staticmethod
    def is_adult(age):
        return age >= 18

# 使用示例
student1 = Student("张三", 20)
student2 = Student("李四", 17)

print(f"学校: {Student.school_name}")
print(f"学生总数: {Student.get_student_count()}")
print(f"张三是否成年: {Student.is_adult(student1.age)}")
\`\`\`

## 属性装饰器 (@property)
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("半径必须大于0")
        self._radius = value

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

    @property
    def circumference(self):
        return 2 * 3.14159 * self._radius

circle = Circle(5)
print(f"面积: {circle.area}")
circle.radius = 10  # 使用setter
print(f"新面积: {circle.area}")
\`\`\`

## 私有属性和方法
\`\`\`python
class BankAccount:
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.__balance = balance  # 私有属性

    def __validate_amount(self, amount):  # 私有方法
        return amount > 0

    def deposit(self, amount):
        if self.__validate_amount(amount):
            self.__balance += amount
            return True
        return False

    def get_balance(self):
        return self.__balance

account = BankAccount("123456", 1000)
account.deposit(500)
print(f"余额: {account.get_balance()}")
# print(account.__balance)  # 这会报错，无法直接访问私有属性
\`\`\`
          `,
          codeExample: `# 属性和方法综合练习
import datetime

class Employee:
    # 类属性
    company_name = "Python科技有限公司"
    employee_count = 0

    def __init__(self, name, position, salary, hire_date=None):
        # 实例属性
        self.name = name
        self.position = position
        self.__salary = salary  # 私有属性
        self.hire_date = hire_date or datetime.date.today()
        Employee.employee_count += 1
        self.__employee_id = f"EMP{Employee.employee_count:04d}"

    @property
    def employee_id(self):
        """只读属性：员工ID"""
        return self.__employee_id

    @property
    def salary(self):
        """获取薪资"""
        return self.__salary

    @salary.setter
    def salary(self, value):
        """设置薪资，包含验证"""
        if value < 0:
            raise ValueError("薪资不能为负数")
        if value > 1000000:
            raise ValueError("薪资不能超过100万")
        self.__salary = value

    @property
    def years_of_service(self):
        """计算工作年限"""
        today = datetime.date.today()
        years = (today - self.hire_date).days / 365.25
        return round(years, 1)

    @property
    def annual_salary(self):
        """年薪"""
        return self.__salary * 12

    def __calculate_bonus(self, performance_rating):
        """私有方法：计算奖金"""
        bonus_rates = {
            'A': 0.2,
            'B': 0.15,
            'C': 0.1,
            'D': 0.05,
            'F': 0
        }
        return self.__salary * bonus_rates.get(performance_rating, 0)

    def get_bonus(self, performance_rating):
        """获取奖金"""
        return self.__calculate_bonus(performance_rating)

    @classmethod
    def get_company_info(cls):
        """类方法：获取公司信息"""
        return f"{cls.company_name} - 员工总数: {cls.employee_count}"

    @staticmethod
    def is_weekend(date):
        """静态方法：判断是否为周末"""
        return date.weekday() >= 5

    def display_info(self):
        """显示员工信息"""
        print(f"员工ID: {self.employee_id}")
        print(f"姓名: {self.name}")
        print(f"职位: {self.position}")
        print(f"月薪: ¥{self.salary:,}")
        print(f"年薪: ¥{self.annual_salary:,}")
        print(f"入职日期: {self.hire_date}")
        print(f"工作年限: {self.years_of_service}年")

# 测试员工管理系统
print("=== 员工管理系统 ===")

# 创建员工
emp1 = Employee("张三", "软件工程师", 15000, datetime.date(2020, 3, 15))
emp2 = Employee("李四", "产品经理", 18000)

# 显示员工信息
emp1.display_info()
print()
emp2.display_info()

print(f"\\n{Employee.get_company_info()}")

# 计算奖金
bonus = emp1.get_bonus('A')
print(f"\\n{emp1.name}的A级绩效奖金: ¥{bonus:,}")

# 测试周末判断
today = datetime.date.today()
print(f"今天是否为周末: {Employee.is_weekend(today)}")`,
          order: 2,
          completed: false
        },
        {
          id: 'inheritance-polymorphism',
          title: '继承和多态',
          type: 'tutorial',
          content: `
# Python 继承和多态

学习面向对象编程的核心概念：继承和多态。

## 基础继承
\`\`\`python
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species

    def make_sound(self):
        return "动物发出声音"

    def info(self):
        return f"{self.name}是一只{self.species}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "狗")
        self.breed = breed

    def make_sound(self):  # 方法重写
        return "汪汪汪！"

    def fetch(self):  # 子类特有方法
        return f"{self.name}去捡球了"

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name, "猫")
        self.color = color

    def make_sound(self):
        return "喵喵喵！"

    def climb(self):
        return f"{self.name}爬到了树上"

# 使用继承
dog = Dog("旺财", "金毛")
cat = Cat("咪咪", "橘色")

print(dog.info())        # 继承的方法
print(dog.make_sound())  # 重写的方法
print(dog.fetch())       # 子类特有方法
\`\`\`

## 多态性
\`\`\`python
def animal_concert(animals):
    """动物音乐会 - 展示多态性"""
    for animal in animals:
        print(f"{animal.name}: {animal.make_sound()}")

animals = [
    Dog("旺财", "金毛"),
    Cat("咪咪", "橘色"),
    Dog("小黑", "拉布拉多")
]

animal_concert(animals)
\`\`\`

## 多重继承
\`\`\`python
class Flyable:
    def fly(self):
        return "在天空中飞翔"

class Swimmable:
    def swim(self):
        return "在水中游泳"

class Duck(Animal, Flyable, Swimmable):
    def __init__(self, name):
        super().__init__(name, "鸭子")

    def make_sound(self):
        return "嘎嘎嘎！"

duck = Duck("唐老鸭")
print(duck.make_sound())
print(duck.fly())
print(duck.swim())
\`\`\`
          `,
          codeExample: `# 继承和多态综合练习
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    """抽象基类：形状"""

    def __init__(self, name):
        self.name = name

    @abstractmethod
    def area(self):
        """抽象方法：计算面积"""
        pass

    @abstractmethod
    def perimeter(self):
        """抽象方法：计算周长"""
        pass

    def display_info(self):
        """显示形状信息"""
        print(f"形状: {self.name}")
        print(f"面积: {self.area():.2f}")
        print(f"周长: {self.perimeter():.2f}")

class Rectangle(Shape):
    """矩形类"""

    def __init__(self, width, height):
        super().__init__("矩形")
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    """圆形类"""

    def __init__(self, radius):
        super().__init__("圆形")
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def perimeter(self):
        return 2 * math.pi * self.radius

class Triangle(Shape):
    """三角形类"""

    def __init__(self, a, b, c):
        super().__init__("三角形")
        self.a = a
        self.b = b
        self.c = c

        # 验证三角形的有效性
        if not self._is_valid_triangle():
            raise ValueError("无效的三角形边长")

    def _is_valid_triangle(self):
        """验证三角形三边关系"""
        return (self.a + self.b > self.c and
                self.a + self.c > self.b and
                self.b + self.c > self.a)

    def area(self):
        # 使用海伦公式计算面积
        s = self.perimeter() / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))

    def perimeter(self):
        return self.a + self.b + self.c

class Square(Rectangle):
    """正方形类（继承自矩形）"""

    def __init__(self, side):
        super().__init__(side, side)
        self.name = "正方形"
        self.side = side

def calculate_total_area(shapes):
    """计算所有形状的总面积（多态性演示）"""
    total = 0
    for shape in shapes:
        total += shape.area()
    return total

def display_shapes_info(shapes):
    """显示所有形状的信息（多态性演示）"""
    for i, shape in enumerate(shapes, 1):
        print(f"\\n=== 形状 {i} ===")
        shape.display_info()

# 测试几何图形系统
print("=== 几何图形计算系统 ===")

# 创建不同的形状
shapes = [
    Rectangle(5, 3),
    Circle(4),
    Triangle(3, 4, 5),
    Square(6)
]

# 显示所有形状信息
display_shapes_info(shapes)

# 计算总面积
total_area = calculate_total_area(shapes)
print(f"\\n所有形状的总面积: {total_area:.2f}")

# 按面积排序
shapes_sorted = sorted(shapes, key=lambda x: x.area(), reverse=True)
print("\\n按面积从大到小排序:")
for i, shape in enumerate(shapes_sorted, 1):
    print(f"{i}. {shape.name}: {shape.area():.2f}")`,
          order: 3,
          completed: false
        },
        {
          id: 'special-methods',
          title: '特殊方法',
          type: 'tutorial',
          content: `
# Python 特殊方法（魔术方法）

学习Python中的特殊方法，让自定义类更加强大和易用。

## 基础特殊方法
\`\`\`python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        """字符串表示（用户友好）"""
        return f"《{self.title}》- {self.author}"

    def __repr__(self):
        """字符串表示（开发者友好）"""
        return f"Book('{self.title}', '{self.author}', {self.pages})"

    def __len__(self):
        """返回页数"""
        return self.pages

    def __eq__(self, other):
        """相等比较"""
        if isinstance(other, Book):
            return (self.title == other.title and
                    self.author == other.author)
        return False

book1 = Book("Python编程", "张三", 300)
book2 = Book("Python编程", "张三", 350)

print(str(book1))      # 调用 __str__
print(repr(book1))     # 调用 __repr__
print(len(book1))      # 调用 __len__
print(book1 == book2)  # 调用 __eq__
\`\`\`

## 算术运算符重载
\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        """向量加法"""
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        """向量减法"""
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        """标量乘法"""
        return Vector(self.x * scalar, self.y * scalar)

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(3, 4)
v2 = Vector(1, 2)
v3 = v1 + v2  # 调用 __add__
v4 = v1 * 2   # 调用 __mul__

print(f"{v1} + {v2} = {v3}")
print(f"{v1} * 2 = {v4}")
\`\`\`

## 容器类型特殊方法
\`\`\`python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []

    def __len__(self):
        return len(self.songs)

    def __getitem__(self, index):
        return self.songs[index]

    def __setitem__(self, index, value):
        self.songs[index] = value

    def __contains__(self, song):
        return song in self.songs

    def __iter__(self):
        return iter(self.songs)

    def add_song(self, song):
        self.songs.append(song)

playlist = Playlist("我的最爱")
playlist.add_song("歌曲1")
playlist.add_song("歌曲2")

print(len(playlist))           # __len__
print(playlist[0])             # __getitem__
print("歌曲1" in playlist)     # __contains__

for song in playlist:          # __iter__
    print(f"播放: {song}")
\`\`\`
          `,
          codeExample: `# 特殊方法综合练习
import math

class Money:
    """货币类，演示特殊方法的使用"""

    def __init__(self, amount, currency="CNY"):
        self.amount = round(amount, 2)
        self.currency = currency

    def __str__(self):
        """用户友好的字符串表示"""
        symbols = {"CNY": "¥", "USD": "$", "EUR": "€"}
        symbol = symbols.get(self.currency, self.currency)
        return f"{symbol}{self.amount:,.2f}"

    def __repr__(self):
        """开发者友好的字符串表示"""
        return f"Money({self.amount}, '{self.currency}')"

    def __eq__(self, other):
        """相等比较"""
        if isinstance(other, Money):
            return (self.amount == other.amount and
                    self.currency == other.currency)
        return False

    def __lt__(self, other):
        """小于比较（需要同币种）"""
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError("不能比较不同币种的金额")
        return self.amount < other.amount

    def __le__(self, other):
        """小于等于比较"""
        return self == other or self < other

    def __gt__(self, other):
        """大于比较"""
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError("不能比较不同币种的金额")
        return self.amount > other.amount

    def __ge__(self, other):
        """大于等于比较"""
        return self == other or self > other

    def __add__(self, other):
        """加法运算"""
        if isinstance(other, Money):
            if self.currency != other.currency:
                raise ValueError("不能相加不同币种的金额")
            return Money(self.amount + other.amount, self.currency)
        elif isinstance(other, (int, float)):
            return Money(self.amount + other, self.currency)
        return NotImplemented

    def __sub__(self, other):
        """减法运算"""
        if isinstance(other, Money):
            if self.currency != other.currency:
                raise ValueError("不能相减不同币种的金额")
            return Money(self.amount - other.amount, self.currency)
        elif isinstance(other, (int, float)):
            return Money(self.amount - other, self.currency)
        return NotImplemented

    def __mul__(self, other):
        """乘法运算（只能乘以数字）"""
        if isinstance(other, (int, float)):
            return Money(self.amount * other, self.currency)
        return NotImplemented

    def __truediv__(self, other):
        """除法运算"""
        if isinstance(other, (int, float)):
            if other == 0:
                raise ZeroDivisionError("不能除以零")
            return Money(self.amount / other, self.currency)
        elif isinstance(other, Money):
            if self.currency != other.currency:
                raise ValueError("不能计算不同币种的比率")
            if other.amount == 0:
                raise ZeroDivisionError("不能除以零金额")
            return self.amount / other.amount
        return NotImplemented

    def __hash__(self):
        """哈希值（使对象可以用作字典键）"""
        return hash((self.amount, self.currency))

    def __bool__(self):
        """布尔值转换"""
        return self.amount != 0

class Wallet:
    """钱包类，演示容器特殊方法"""

    def __init__(self, owner):
        self.owner = owner
        self.money_list = []

    def __len__(self):
        """钱包中货币种类数量"""
        return len(self.money_list)

    def __getitem__(self, index):
        """通过索引获取货币"""
        return self.money_list[index]

    def __setitem__(self, index, value):
        """通过索引设置货币"""
        if isinstance(value, Money):
            self.money_list[index] = value
        else:
            raise TypeError("只能存放Money对象")

    def __contains__(self, currency):
        """检查是否包含某种货币"""
        return any(money.currency == currency for money in self.money_list)

    def __iter__(self):
        """迭代器"""
        return iter(self.money_list)

    def __str__(self):
        """字符串表示"""
        if not self.money_list:
            return f"{self.owner}的钱包是空的"

        money_str = ", ".join(str(money) for money in self.money_list)
        return f"{self.owner}的钱包: {money_str}"

    def add_money(self, money):
        """添加货币"""
        if isinstance(money, Money):
            # 检查是否已有相同币种，如果有则合并
            for existing_money in self.money_list:
                if existing_money.currency == money.currency:
                    existing_money.amount += money.amount
                    return
            self.money_list.append(money)
        else:
            raise TypeError("只能添加Money对象")

# 测试货币和钱包系统
print("=== 货币系统测试 ===")

# 创建货币对象
money1 = Money(100.50, "CNY")
money2 = Money(50.25, "CNY")
money3 = Money(20, "USD")

print(f"货币1: {money1}")
print(f"货币2: {money2}")
print(f"货币3: {money3}")

# 测试运算
total = money1 + money2
print(f"\\n{money1} + {money2} = {total}")

doubled = money1 * 2
print(f"{money1} * 2 = {doubled}")

# 测试比较
print(f"\\n{money1} > {money2}: {money1 > money2}")
print(f"{money1} == {money2}: {money1 == money2}")

# 创建钱包
wallet = Wallet("张三")
wallet.add_money(money1)
wallet.add_money(money2)
wallet.add_money(money3)

print(f"\\n{wallet}")
print(f"钱包中货币种类: {len(wallet)}")
print(f"是否有人民币: {'CNY' in wallet}")

print("\\n钱包中的所有货币:")
for i, money in enumerate(wallet):
    print(f"{i+1}. {money}")`,
          order: 4,
          completed: false
        },
        {
          id: 'modules-packages',
          title: '模块和包',
          type: 'tutorial',
          content: `
# Python 模块和包

学习如何组织和重用Python代码。

## 模块基础
模块是包含Python代码的文件，可以定义函数、类和变量。

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
        self.history = []

    def calculate(self, operation, a, b):
        if operation == "add":
            result = add(a, b)
        elif operation == "multiply":
            result = multiply(a, b)
        else:
            result = None

        self.history.append(f"{operation}({a}, {b}) = {result}")
        return result
\`\`\`

### 导入模块
\`\`\`python
# 导入整个模块
import math_utils
result = math_utils.add(5, 3)

# 导入特定函数
from math_utils import add, multiply
result = add(5, 3)

# 导入时重命名
from math_utils import Calculator as Calc
calc = Calc()

# 导入所有（不推荐）
from math_utils import *
\`\`\`

## 包的概念
包是包含多个模块的目录，必须包含 \`__init__.py\` 文件。

### 包结构示例
\`\`\`
mypackage/
    __init__.py
    math/
        __init__.py
        basic.py
        advanced.py
    string/
        __init__.py
        operations.py
        formatting.py
\`\`\`

### 包的导入
\`\`\`python
# 导入包中的模块
from mypackage.math import basic
from mypackage.string.operations import clean_text

# 相对导入（在包内部使用）
from .basic import add
from ..string import operations
\`\`\`

## 模块搜索路径
\`\`\`python
import sys
print(sys.path)  # 显示模块搜索路径

# 添加自定义路径
sys.path.append('/path/to/my/modules')
\`\`\`

## \`__name__\` 和 \`__main__\`
\`\`\`python
# my_module.py
def main():
    print("这是主函数")

if __name__ == "__main__":
    # 只有直接运行此文件时才执行
    main()
\`\`\`
          `,
          codeExample: `# 模块和包的实战示例

# 模拟一个简单的数学工具包
print("=== 数学工具包演示 ===")

# 模拟 math_operations.py 模块
class MathOperations:
    """数学运算类"""

    @staticmethod
    def factorial(n):
        """计算阶乘"""
        if n < 0:
            raise ValueError("阶乘不能计算负数")
        if n == 0 or n == 1:
            return 1
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result

    @staticmethod
    def fibonacci(n):
        """计算斐波那契数列的第n项"""
        if n < 0:
            raise ValueError("n必须为非负整数")
        if n == 0:
            return 0
        if n == 1:
            return 1

        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b

    @staticmethod
    def gcd(a, b):
        """计算最大公约数"""
        while b:
            a, b = b, a % b
        return a

    @staticmethod
    def lcm(a, b):
        """计算最小公倍数"""
        return abs(a * b) // MathOperations.gcd(a, b)

# 模拟 string_utils.py 模块
class StringUtils:
    """字符串工具类"""

    @staticmethod
    def reverse_string(s):
        """反转字符串"""
        return s[::-1]

    @staticmethod
    def is_palindrome(s):
        """检查是否为回文"""
        cleaned = ''.join(c.lower() for c in s if c.isalnum())
        return cleaned == cleaned[::-1]

    @staticmethod
    def word_count(text):
        """统计单词数量"""
        words = text.split()
        return len(words)

    @staticmethod
    def capitalize_words(text):
        """首字母大写"""
        return ' '.join(word.capitalize() for word in text.split())

# 模拟 data_structures.py 模块
class Stack:
    """栈数据结构"""

    def __init__(self):
        self.items = []

    def push(self, item):
        """入栈"""
        self.items.append(item)

    def pop(self):
        """出栈"""
        if self.is_empty():
            raise IndexError("栈为空")
        return self.items.pop()

    def peek(self):
        """查看栈顶元素"""
        if self.is_empty():
            raise IndexError("栈为空")
        return self.items[-1]

    def is_empty(self):
        """检查栈是否为空"""
        return len(self.items) == 0

    def size(self):
        """获取栈大小"""
        return len(self.items)

class Queue:
    """队列数据结构"""

    def __init__(self):
        self.items = []

    def enqueue(self, item):
        """入队"""
        self.items.append(item)

    def dequeue(self):
        """出队"""
        if self.is_empty():
            raise IndexError("队列为空")
        return self.items.pop(0)

    def front(self):
        """查看队首元素"""
        if self.is_empty():
            raise IndexError("队列为空")
        return self.items[0]

    def is_empty(self):
        """检查队列是否为空"""
        return len(self.items) == 0

    def size(self):
        """获取队列大小"""
        return len(self.items)

# 模拟包的使用
def demonstrate_math_operations():
    """演示数学运算模块"""
    print("\\n--- 数学运算演示 ---")

    # 阶乘计算
    n = 5
    factorial_result = MathOperations.factorial(n)
    print(f"{n}! = {factorial_result}")

    # 斐波那契数列
    fib_n = 10
    fib_result = MathOperations.fibonacci(fib_n)
    print(f"斐波那契数列第{fib_n}项: {fib_result}")

    # 最大公约数和最小公倍数
    a, b = 48, 18
    gcd_result = MathOperations.gcd(a, b)
    lcm_result = MathOperations.lcm(a, b)
    print(f"gcd({a}, {b}) = {gcd_result}")
    print(f"lcm({a}, {b}) = {lcm_result}")

def demonstrate_string_utils():
    """演示字符串工具模块"""
    print("\\n--- 字符串工具演示 ---")

    text = "hello world"
    print(f"原文: {text}")
    print(f"反转: {StringUtils.reverse_string(text)}")
    print(f"首字母大写: {StringUtils.capitalize_words(text)}")
    print(f"单词数: {StringUtils.word_count(text)}")

    palindrome_text = "A man a plan a canal Panama"
    print(f"\\n'{palindrome_text}' 是回文吗? {StringUtils.is_palindrome(palindrome_text)}")

def demonstrate_data_structures():
    """演示数据结构模块"""
    print("\\n--- 数据结构演示 ---")

    # 栈演示
    print("栈操作:")
    stack = Stack()
    for i in range(1, 4):
        stack.push(i)
        print(f"入栈: {i}")

    print(f"栈顶元素: {stack.peek()}")
    while not stack.is_empty():
        print(f"出栈: {stack.pop()}")

    # 队列演示
    print("\\n队列操作:")
    queue = Queue()
    for i in range(1, 4):
        queue.enqueue(i)
        print(f"入队: {i}")

    print(f"队首元素: {queue.front()}")
    while not queue.is_empty():
        print(f"出队: {queue.dequeue()}")

# 主程序
def main():
    """主函数 - 演示模块化编程"""
    print("欢迎使用Python工具包！")

    demonstrate_math_operations()
    demonstrate_string_utils()
    demonstrate_data_structures()

    print("\\n=== 模块化编程的优势 ===")
    print("1. 代码重用：可以在多个项目中使用相同的模块")
    print("2. 命名空间：避免函数和变量名冲突")
    print("3. 维护性：代码组织清晰，易于维护")
    print("4. 协作开发：团队成员可以独立开发不同模块")

# 模拟 if __name__ == "__main__" 的使用
if True:  # 在实际模块中这里应该是 if __name__ == "__main__":
    main()`,
          order: 5,
          completed: false
        }
      ]
    };
  }
}
