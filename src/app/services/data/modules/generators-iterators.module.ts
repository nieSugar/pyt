import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class GeneratorsIteratorsModule {

  getModule(): Module {
    return {
      id: 'generators-iterators',
      title: '生成器和迭代器深入',
      description: '深入学习Python生成器、迭代器协议和惰性求值',
      order: 8,
      lessons: [
        {
          id: 'iterator-protocol',
          title: '迭代器协议详解',
          type: 'tutorial',
          content: `
# 迭代器协议详解

迭代器协议是Python中用于遍历对象的核心机制，定义了对象如何实现迭代功能。

## 迭代器协议基础

迭代器协议包含两个方法：\`__iter__()\` 和 \`__next__()\`

\`\`\`python
class CountDown:
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1

# 使用迭代器
countdown = CountDown(3)
for num in countdown:
    print(num)  # 输出: 3, 2, 1
\`\`\`

## 可迭代对象 vs 迭代器

\`\`\`python
class NumberSequence:
    """可迭代对象"""
    def __init__(self, numbers):
        self.numbers = numbers
    
    def __iter__(self):
        return NumberIterator(self.numbers)

class NumberIterator:
    """迭代器"""
    def __init__(self, numbers):
        self.numbers = numbers
        self.index = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index >= len(self.numbers):
            raise StopIteration
        value = self.numbers[self.index]
        self.index += 1
        return value
\`\`\`

## 内置函数与迭代器

\`\`\`python
# iter() 函数的两种用法
numbers = [1, 2, 3]
iterator = iter(numbers)

# 使用 next() 函数
print(next(iterator))  # 1
print(next(iterator))  # 2

# iter() 的第二种用法：callable + sentinel
import random
iterator = iter(lambda: random.randint(1, 6), 6)
for value in iterator:
    print(value)  # 打印直到遇到6为止
\`\`\`
          `,
          codeExample: `# 自定义迭代器示例
class FibonacciIterator:
    """斐波那契数列迭代器"""
    def __init__(self, max_count=None):
        self.max_count = max_count
        self.count = 0
        self.current = 0
        self.next_val = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.max_count and self.count >= self.max_count:
            raise StopIteration
        
        if self.count == 0:
            self.count += 1
            return self.current
        elif self.count == 1:
            self.count += 1
            return self.next_val
        else:
            self.current, self.next_val = self.next_val, self.current + self.next_val
            self.count += 1
            return self.next_val

class RangeReversed:
    """反向range迭代器"""
    def __init__(self, start, stop=None, step=1):
        if stop is None:
            start, stop = 0, start
        self.current = stop - 1
        self.start = start
        self.step = step
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current < self.start:
            raise StopIteration
        value = self.current
        self.current -= self.step
        return value

# 测试迭代器
print("斐波那契数列前10项:")
fib = FibonacciIterator(10)
for num in fib:
    print(num, end=" ")

print("\\n\\n反向range(0, 10):")
rev_range = RangeReversed(0, 10)
for num in rev_range:
    print(num, end=" ")`,
          order: 1,
          completed: false
        },
        {
          id: 'generator-functions',
          title: '生成器函数和yield',
          type: 'tutorial',
          content: `
# 生成器函数和yield

生成器函数是包含yield关键字的函数，它返回一个生成器对象，提供了惰性求值的能力。

## 基础生成器函数

\`\`\`python
def simple_generator():
    yield 1
    yield 2
    yield 3

gen = simple_generator()
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
\`\`\`

## yield的执行机制

\`\`\`python
def counting_generator():
    print("开始生成")
    yield 1
    print("生成了1，继续")
    yield 2
    print("生成了2，继续")
    yield 3
    print("生成了3，结束")

gen = counting_generator()
print("创建生成器")
print(f"第一个值: {next(gen)}")
print(f"第二个值: {next(gen)}")
print(f"第三个值: {next(gen)}")
\`\`\`

## 生成器的状态

\`\`\`python
import inspect

def stateful_generator():
    print("状态: 开始")
    yield "first"
    print("状态: 中间")
    yield "second"
    print("状态: 结束")

gen = stateful_generator()
print(f"初始状态: {inspect.getgeneratorstate(gen)}")
value1 = next(gen)
print(f"第一次yield后: {inspect.getgeneratorstate(gen)}")
value2 = next(gen)
print(f"第二次yield后: {inspect.getgeneratorstate(gen)}")
try:
    next(gen)
except StopIteration:
    print(f"生成器结束: {inspect.getgeneratorstate(gen)}")
\`\`\`
          `,
          codeExample: `def fibonacci_generator(max_count=None):
    """斐波那契数列生成器"""
    a, b = 0, 1
    count = 0
    
    while max_count is None or count < max_count:
        yield a
        a, b = b, a + b
        count += 1

def file_line_generator(filename):
    """文件行生成器 - 内存友好的文件读取"""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            line_number = 1
            for line in file:
                yield line_number, line.strip()
                line_number += 1
    except FileNotFoundError:
        print(f"文件 {filename} 不存在")

def batch_generator(iterable, batch_size):
    """批处理生成器"""
    iterator = iter(iterable)
    while True:
        batch = []
        try:
            for _ in range(batch_size):
                batch.append(next(iterator))
            yield batch
        except StopIteration:
            if batch:
                yield batch
            break

# 测试生成器
print("斐波那契数列前15项:")
fib_gen = fibonacci_generator(15)
for i, num in enumerate(fib_gen):
    print(f"F({i}) = {num}")

print("\\n批处理演示:")
numbers = range(23)
for batch in batch_generator(numbers, 5):
    print(f"批次: {batch}")

# 内存使用对比
print("\\n内存使用对比:")
# 传统方式 - 一次性创建所有数据
traditional_list = [x**2 for x in range(1000000)]
print(f"传统列表占用内存较大")

# 生成器方式 - 惰性求值
def square_generator(n):
    for x in range(n):
        yield x**2

gen_squares = square_generator(1000000)
print(f"生成器占用内存很小，按需生成")`,
          order: 2,
          completed: false
        },
        {
          id: 'generator-expressions',
          title: '生成器表达式',
          type: 'tutorial',
          content: `
# 生成器表达式

生成器表达式是创建生成器的简洁语法，类似列表推导式但使用圆括号。

## 基础语法

\`\`\`python
# 列表推导式 - 立即创建所有元素
squares_list = [x**2 for x in range(10)]

# 生成器表达式 - 惰性创建
squares_gen = (x**2 for x in range(10))
\`\`\`

## 内存效率对比

\`\`\`python
import sys

# 列表推导式
list_comp = [x for x in range(1000000)]
print(f"列表占用内存: {sys.getsizeof(list_comp)} 字节")

# 生成器表达式
gen_exp = (x for x in range(1000000))
print(f"生成器占用内存: {sys.getsizeof(gen_exp)} 字节")
\`\`\`

## 生成器表达式的应用

\`\`\`python
# 文件处理
with open('data.txt') as file:
    # 读取所有非空行的长度
    line_lengths = (len(line.strip()) for line in file if line.strip())
    
    # 只处理需要的数据
    for length in line_lengths:
        if length > 50:
            print(f"长行: {length} 字符")

# 数据管道
numbers = range(1000000)
pipeline = (
    x for x in numbers
    if x % 2 == 0          # 偶数
    for x in [x ** 2]      # 平方
    if x > 1000            # 大于1000
)

# 只取前5个结果
for i, result in enumerate(pipeline):
    if i >= 5:
        break
    print(result)
\`\`\`
          `,
          codeExample: `import time
import random

# 数据处理管道示例
def process_data_pipeline():
    """使用生成器表达式构建数据处理管道"""
    
    # 模拟数据源
    def data_source():
        for i in range(1000):
            yield {
                'id': i,
                'value': random.randint(1, 100),
                'category': random.choice(['A', 'B', 'C'])
            }
    
    # 数据处理管道
    data = data_source()
    
    # 第一步：过滤A类别的数据
    category_a = (item for item in data if item['category'] == 'A')
    
    # 第二步：只保留value > 50的数据
    high_value = (item for item in category_a if item['value'] > 50)
    
    # 第三步：转换数据格式
    transformed = (
        {'id': item['id'], 'score': item['value'] * 2} 
        for item in high_value
    )
    
    # 第四步：只取前10个结果
    top_10 = (item for i, item in enumerate(transformed) if i < 10)
    
    return list(top_10)

# 链式生成器表达式
def chain_generators():
    """演示链式生成器表达式"""
    
    # 嵌套数据
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    
    # 展平矩阵
    flattened = (item for row in matrix for item in row)
    
    # 过滤偶数
    evens = (x for x in flattened if x % 2 == 0)
    
    # 平方运算
    squares = (x**2 for x in evens)
    
    return list(squares)

# 惰性求值演示
def lazy_evaluation_demo():
    """演示惰性求值的优势"""
    
    def expensive_operation(x):
        """模拟耗时操作"""
        time.sleep(0.01)  # 模拟计算延迟
        return x**3
    
    print("创建生成器（立即返回）:")
    start = time.time()
    
    # 生成器表达式 - 立即返回
    cubes_gen = (expensive_operation(x) for x in range(100))
    
    print(f"创建耗时: {time.time() - start:.4f}秒")
    
    print("\\n获取前5个结果:")
    start = time.time()
    
    # 只计算需要的值
    first_five = []
    for i, cube in enumerate(cubes_gen):
        if i >= 5:
            break
        first_five.append(cube)
    
    print(f"前5个结果: {first_five}")
    print(f"计算耗时: {time.time() - start:.4f}秒")

# 测试
print("数据处理管道结果:")
pipeline_result = process_data_pipeline()
for item in pipeline_result:
    print(item)

print(f"\\n链式生成器结果: {chain_generators()}")

print("\\n惰性求值演示:")
lazy_evaluation_demo()`,
          order: 3,
          completed: false
        }
      ]
    };
  }
} 
