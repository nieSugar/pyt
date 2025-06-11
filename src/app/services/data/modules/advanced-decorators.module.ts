import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdvancedDecoratorsModule {

  getModule(): Module {
    return {
      id: 'advanced-decorators',
      title: '装饰器深入',
      description: '深入学习Python装饰器的原理、实现和高级应用',
      order: 7,
      lessons: [
        {
          id: 'decorator-fundamentals',
          title: '装饰器原理与实现',
          type: 'tutorial',
          content: `
# 装饰器原理与实现

装饰器是Python中的高级特性，用于修改或增强函数和类的功能，不改变原有代码。

## 装饰器的本质

装饰器本质上是一个接受函数作为参数并返回新函数的高阶函数。

\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"调用函数: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"函数 {func.__name__} 执行完毕")
        return result
    return wrapper

@my_decorator
def greet(name):
    return f"你好, {name}!"

# 等价于: greet = my_decorator(greet)
\`\`\`

## 保留函数元信息

使用 \`functools.wraps\` 保留原函数的元信息：

\`\`\`python
import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"调用函数: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """问候函数"""
    return f"你好, {name}!"

print(greet.__name__)  # 输出: greet
print(greet.__doc__)   # 输出: 问候函数
\`\`\`

## 装饰器的执行时机

装饰器在函数定义时执行，而不是调用时：

\`\`\`python
print("装饰器定义阶段")

def log_decorator(func):
    print(f"装饰器正在装饰函数: {func.__name__}")
    def wrapper(*args, **kwargs):
        print(f"调用函数: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

print("开始定义函数")

@log_decorator
def hello():
    return "Hello World"

print("函数定义完成")
print("开始调用函数")
result = hello()
print(f"结果: {result}")
\`\`\`
          `,
          codeExample: `import functools
import time

# 基础装饰器示例
def timer(func):
    """测量函数执行时间的装饰器"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"函数 {func.__name__} 执行时间: {end_time - start_time:.4f}秒")
        return result
    return wrapper

def retry(max_attempts=3):
    """重试装饰器，失败时自动重试"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    print(f"第 {attempt + 1} 次尝试失败: {e}")
            return None
        return wrapper
    return decorator

# 使用装饰器
@timer
def calculate_sum(n):
    """计算1到n的和"""
    return sum(range(1, n + 1))

@retry(max_attempts=2)
def unstable_function():
    """模拟不稳定的函数"""
    import random
    if random.random() < 0.7:  # 70%概率失败
        raise ValueError("随机错误")
    return "成功!"

# 测试
print("测试计时装饰器:")
result = calculate_sum(1000000)
print(f"计算结果: {result}")

print("\\n测试重试装饰器:")
try:
    result = unstable_function()
    print(f"结果: {result}")
except Exception as e:
    print(f"最终失败: {e}")`,
          order: 1,
          completed: false
        },
        {
          id: 'decorator-factory',
          title: '装饰器工厂和参数化装饰器',
          type: 'tutorial',
          content: `
# 装饰器工厂和参数化装饰器

装饰器工厂是返回装饰器的函数，允许我们创建可配置的装饰器。

## 装饰器工厂基础

\`\`\`python
def repeat(times):
    """装饰器工厂：重复执行函数指定次数"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for i in range(times):
                result = func(*args, **kwargs)
                results.append(result)
            return results
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    return f"你好, {name}!"

result = greet("张三")
print(result)  # ['你好, 张三!', '你好, 张三!', '你好, 张三!']
\`\`\`

## 带可选参数的装饰器

\`\`\`python
def cache(timeout=None):
    """缓存装饰器，支持超时设置"""
    def decorator(func):
        cache_data = {}
        cache_time = {}
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            import time
            key = str(args) + str(sorted(kwargs.items()))
            current_time = time.time()
            
            # 检查缓存是否存在且未过期
            if key in cache_data:
                if timeout is None or (current_time - cache_time[key] < timeout):
                    print(f"从缓存返回结果: {key}")
                    return cache_data[key]
            
            # 执行函数并缓存结果
            result = func(*args, **kwargs)
            cache_data[key] = result
            cache_time[key] = current_time
            print(f"缓存新结果: {key}")
            return result
        
        return wrapper
    return decorator

@cache(timeout=5)  # 5秒缓存
def expensive_operation(x, y):
    import time
    time.sleep(1)  # 模拟耗时操作
    return x + y
\`\`\`

## 既可以带参数又可以不带参数的装饰器

\`\`\`python
def smart_decorator(func=None, *, prefix="LOG"):
    """智能装饰器：可以带参数也可以不带参数使用"""
    def decorator(f):
        @functools.wraps(f)
        def wrapper(*args, **kwargs):
            print(f"[{prefix}] 调用函数: {f.__name__}")
            result = f(*args, **kwargs)
            print(f"[{prefix}] 函数执行完毕")
            return result
        return wrapper
    
    if func is None:
        # 带参数调用: @smart_decorator(prefix="DEBUG")
        return decorator
    else:
        # 不带参数调用: @smart_decorator
        return decorator(func)

# 两种使用方式
@smart_decorator
def func1():
    return "Hello"

@smart_decorator(prefix="DEBUG")
def func2():
    return "World"
\`\`\`
          `,
          codeExample: `import functools
import time
from typing import Callable, Any

def validate_types(**expected_types):
    """类型验证装饰器工厂"""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # 获取函数参数名
            import inspect
            sig = inspect.signature(func)
            bound_args = sig.bind(*args, **kwargs)
            bound_args.apply_defaults()
            
            # 验证类型
            for param_name, expected_type in expected_types.items():
                if param_name in bound_args.arguments:
                    value = bound_args.arguments[param_name]
                    if not isinstance(value, expected_type):
                        raise TypeError(f"参数 {param_name} 期望类型 {expected_type.__name__}, 得到 {type(value).__name__}")
            
            return func(*args, **kwargs)
        return wrapper
    return decorator

def rate_limit(calls_per_second: float = 1.0):
    """限流装饰器工厂"""
    def decorator(func: Callable) -> Callable:
        last_called = [0.0]
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            time_since_last = now - last_called[0]
            min_interval = 1.0 / calls_per_second
            
            if time_since_last < min_interval:
                sleep_time = min_interval - time_since_last
                print(f"限流中，等待 {sleep_time:.2f} 秒...")
                time.sleep(sleep_time)
            
            last_called[0] = time.time()
            return func(*args, **kwargs)
        return wrapper
    return decorator

# 使用示例
@validate_types(name=str, age=int)
@rate_limit(calls_per_second=0.5)  # 每2秒最多调用一次
def create_user(name: str, age: int) -> str:
    return f"创建用户: {name}, 年龄: {age}"

# 测试
print("测试类型验证和限流:")
try:
    result1 = create_user("张三", 25)
    print(result1)
    
    result2 = create_user("李四", 30)
    print(result2)
    
    # 这会引发类型错误
    # create_user("王五", "不是数字")
except TypeError as e:
    print(f"类型错误: {e}")`,
          order: 2,
          completed: false
        },
        {
          id: 'class-decorators',
          title: '类装饰器的使用场景',
          type: 'tutorial',
          content: `
# 类装饰器的使用场景

类装饰器用于修改或增强类的功能，比函数装饰器更加灵活。

## 基础类装饰器

\`\`\`python
def add_methods(cls):
    """为类添加新方法的装饰器"""
    def display_info(self):
        return f"这是一个 {cls.__name__} 实例"
    
    def get_class_name(self):
        return cls.__name__
    
    cls.display_info = display_info
    cls.get_class_name = get_class_name
    return cls

@add_methods
class Person:
    def __init__(self, name):
        self.name = name

person = Person("张三")
print(person.display_info())  # 这是一个 Person 实例
print(person.get_class_name())  # Person
\`\`\`

## 单例模式装饰器

\`\`\`python
def singleton(cls):
    """单例模式装饰器"""
    instances = {}
    
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    
    return get_instance

@singleton
class DatabaseConnection:
    def __init__(self):
        self.connection_id = id(self)
        print(f"创建数据库连接: {self.connection_id}")
    
    def query(self, sql):
        return f"执行查询: {sql}"

# 测试单例
db1 = DatabaseConnection()
db2 = DatabaseConnection()
print(f"db1 ID: {db1.connection_id}")
print(f"db2 ID: {db2.connection_id}")
print(f"是同一个实例: {db1 is db2}")  # True
\`\`\`

## 属性验证装饰器

\`\`\`python
def validate_attributes(**validators):
    """属性验证装饰器"""
    def decorator(cls):
        original_setattr = cls.__setattr__
        
        def validated_setattr(self, name, value):
            if name in validators:
                validator = validators[name]
                if not validator(value):
                    raise ValueError(f"属性 {name} 的值 {value} 不符合验证规则")
            original_setattr(self, name, value)
        
        cls.__setattr__ = validated_setattr
        return cls
    
    return decorator

@validate_attributes(
    age=lambda x: isinstance(x, int) and x >= 0,
    name=lambda x: isinstance(x, str) and len(x) > 0
)
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# 测试
person = Person("张三", 25)
print(f"姓名: {person.name}, 年龄: {person.age}")

try:
    person.age = -5  # 这会引发 ValueError
except ValueError as e:
    print(f"验证错误: {e}")
\`\`\`

## 自动属性装饰器

\`\`\`python
def auto_properties(*attrs):
    """自动为指定属性创建getter和setter的装饰器"""
    def decorator(cls):
        for attr in attrs:
            private_attr = f"_{attr}"
            
            def make_property(attr_name, private_name):
                def getter(self):
                    return getattr(self, private_name, None)
                
                def setter(self, value):
                    setattr(self, private_name, value)
                
                return property(getter, setter)
            
            setattr(cls, attr, make_property(attr, private_attr))
        
        return cls
    
    return decorator

@auto_properties('name', 'age', 'email')
class User:
    def __init__(self, name=None, age=None, email=None):
        if name:
            self.name = name
        if age:
            self.age = age
        if email:
            self.email = email

# 测试
user = User()
user.name = "张三"
user.age = 25
user.email = "zhangsan@email.com"

print(f"姓名: {user.name}")
print(f"年龄: {user.age}")
print(f"邮箱: {user.email}")
\`\`\`
          `,
          codeExample: `import functools
from typing import Any, Callable

def dataclass_like(cls):
    """简化版dataclass装饰器"""
    # 获取类型注解
    annotations = getattr(cls, '__annotations__', {})
    
    # 生成__init__方法
    def __init__(self, **kwargs):
        for field_name, field_type in annotations.items():
            value = kwargs.get(field_name)
            if value is not None:
                setattr(self, field_name, value)
            else:
                setattr(self, field_name, None)
    
    # 生成__repr__方法
    def __repr__(self):
        attrs = []
        for field_name in annotations:
            value = getattr(self, field_name, None)
            attrs.append(f"{field_name}={value!r}")
        return f"{cls.__name__}({', '.join(attrs)})"
    
    # 生成__eq__方法
    def __eq__(self, other):
        if not isinstance(other, cls):
            return False
        for field_name in annotations:
            if getattr(self, field_name) != getattr(other, field_name):
                return False
        return True
    
    cls.__init__ = __init__
    cls.__repr__ = __repr__
    cls.__eq__ = __eq__
    
    return cls

def immutable(cls):
    """不可变类装饰器"""
    original_setattr = cls.__setattr__
    original_delattr = cls.__delattr__
    
    def __setattr__(self, name, value):
        if hasattr(self, '_initialized'):
            raise AttributeError(f"不能修改不可变对象的属性 {name}")
        original_setattr(self, name, value)
    
    def __delattr__(self, name):
        raise AttributeError(f"不能删除不可变对象的属性 {name}")
    
    def __init_wrapper__(original_init):
        @functools.wraps(original_init)
        def new_init(self, *args, **kwargs):
            original_init(self, *args, **kwargs)
            original_setattr(self, '_initialized', True)
        return new_init
    
    cls.__setattr__ = __setattr__
    cls.__delattr__ = __delattr__
    if hasattr(cls, '__init__'):
        cls.__init__ = __init_wrapper__(cls.__init__)
    
    return cls

# 使用示例
@dataclass_like
@immutable
class Point:
    x: int
    y: int

# 测试
print("测试类装饰器:")
p1 = Point(x=10, y=20)
p2 = Point(x=10, y=20)
p3 = Point(x=5, y=15)

print(f"p1: {p1}")
print(f"p2: {p2}")
print(f"p1 == p2: {p1 == p2}")
print(f"p1 == p3: {p1 == p3}")

try:
    p1.x = 100  # 这会引发错误
except AttributeError as e:
    print(f"不可变对象错误: {e}")`,
          order: 3,
          completed: false
        },
        {
          id: 'decorator-stacking',
          title: '多层装饰器的执行顺序',
          type: 'tutorial',
          content: `
# 多层装饰器的执行顺序

当一个函数被多个装饰器装饰时，装饰器的执行顺序很重要。

## 装饰器执行顺序

装饰器的应用顺序是从下往上，执行顺序是从外到内：

\`\`\`python
def decorator_a(func):
    print("装饰器A: 开始装饰")
    def wrapper(*args, **kwargs):
        print("装饰器A: 函数调用前")
        result = func(*args, **kwargs)
        print("装饰器A: 函数调用后")
        return result
    print("装饰器A: 装饰完成")
    return wrapper

def decorator_b(func):
    print("装饰器B: 开始装饰")
    def wrapper(*args, **kwargs):
        print("装饰器B: 函数调用前")
        result = func(*args, **kwargs)
        print("装饰器B: 函数调用后")
        return result
    print("装饰器B: 装饰完成")
    return wrapper

@decorator_a
@decorator_b
def hello():
    print("Hello World!")

# 等价于: hello = decorator_a(decorator_b(hello))
\`\`\`

## 装饰器顺序的影响

不同的装饰器顺序会产生不同的效果：

\`\`\`python
import functools
import time

def timer(func):
    """计时装饰器"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 执行时间: {end - start:.4f}秒")
        return result
    return wrapper

def cache(func):
    """缓存装饰器"""
    cache_data = {}
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        key = str(args) + str(kwargs)
        if key in cache_data:
            print(f"从缓存返回: {key}")
            return cache_data[key]
        
        result = func(*args, **kwargs)
        cache_data[key] = result
        print(f"缓存结果: {key}")
        return result
    return wrapper

# 情况1: 先缓存，再计时
@timer
@cache
def slow_function_1(n):
    time.sleep(1)  # 模拟耗时操作
    return n * 2

# 情况2: 先计时，再缓存
@cache
@timer
def slow_function_2(n):
    time.sleep(1)  # 模拟耗时操作
    return n * 2

print("第一次调用 slow_function_1:")
result1 = slow_function_1(5)

print("\\n第二次调用 slow_function_1:")
result1 = slow_function_1(5)  # 从缓存返回，但仍会计时

print("\\n第一次调用 slow_function_2:")
result2 = slow_function_2(5)

print("\\n第二次调用 slow_function_2:")
result2 = slow_function_2(5)  # 从缓存返回，不会计时
\`\`\`

## 装饰器优先级管理

\`\`\`python
def priority_decorator(priority):
    """带优先级的装饰器"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print(f"优先级 {priority}: 执行前")
            result = func(*args, **kwargs)
            print(f"优先级 {priority}: 执行后")
            return result
        wrapper._priority = priority
        return wrapper
    return decorator

def apply_decorators_by_priority(decorators):
    """按优先级应用装饰器"""
    def meta_decorator(func):
        # 按优先级排序装饰器
        sorted_decorators = sorted(decorators, key=lambda d: d._priority if hasattr(d, '_priority') else 0)
        
        for decorator in sorted_decorators:
            func = decorator(func)
        
        return func
    return meta_decorator

# 创建带优先级的装饰器
high_priority = priority_decorator(1)
medium_priority = priority_decorator(2)
low_priority = priority_decorator(3)

@apply_decorators_by_priority([low_priority, high_priority, medium_priority])
def test_function():
    print("执行核心函数")

test_function()
\`\`\`
          `,
          codeExample: `import functools
import time
from typing import Callable

def debug(enabled=True):
    """调试装饰器"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            if enabled:
                print(f"[DEBUG] 调用 {func.__name__} 参数: args={args}, kwargs={kwargs}")
            result = func(*args, **kwargs)
            if enabled:
                print(f"[DEBUG] {func.__name__} 返回: {result}")
            return result
        return wrapper
    return decorator

def validate_positive(func):
    """验证参数为正数的装饰器"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg <= 0:
                raise ValueError(f"参数必须为正数，得到: {arg}")
        for value in kwargs.values():
            if isinstance(value, (int, float)) and value <= 0:
                raise ValueError(f"参数必须为正数，得到: {value}")
        return func(*args, **kwargs)
    return wrapper

def retry_on_failure(max_attempts=3):
    """失败重试装饰器"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    print(f"第 {attempt + 1} 次尝试失败: {e}")
                    if attempt < max_attempts - 1:
                        time.sleep(0.1)  # 短暂延迟
            raise last_exception
        return wrapper
    return decorator

def measure_memory(func):
    """内存使用测量装饰器"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        import tracemalloc
        tracemalloc.start()
        
        result = func(*args, **kwargs)
        
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        
        print(f"{func.__name__} 内存使用: 当前={current/1024:.2f}KB, 峰值={peak/1024:.2f}KB")
        return result
    return wrapper

# 多层装饰器示例
@debug(enabled=True)
@measure_memory
@retry_on_failure(max_attempts=2)
@validate_positive
def complex_calculation(x, y):
    """复杂计算函数"""
    if x + y < 10:  # 模拟随机失败
        raise ValueError("计算条件不满足")
    
    # 模拟内存密集型操作
    large_list = list(range(x * y * 1000))
    return sum(large_list) / len(large_list)

# 测试多层装饰器
print("测试多层装饰器的执行顺序:")
try:
    result = complex_calculation(5, 6)
    print(f"计算结果: {result}")
except Exception as e:
    print(f"最终错误: {e}")`,
          order: 4,
          completed: false
        },
        {
          id: 'decorator-applications',
          title: '装饰器的实际应用',
          type: 'exercise',
          content: `
# 装饰器的实际应用

通过实际的项目需求来学习装饰器的应用场景。

## 练习目标
1. 实现缓存装饰器
2. 实现日志装饰器
3. 实现权限验证装饰器
4. 组合使用多个装饰器

## 应用场景

### 1. API限流装饰器
在Web API中控制访问频率

### 2. 性能监控装饰器
监控函数执行时间和资源使用

### 3. 安全验证装饰器
验证用户权限和输入安全性

### 4. 数据库事务装饰器
自动管理数据库事务
          `,
          exercise: {
            id: 'decorator-real-world',
            description: '实现一个完整的装饰器系统',
            initialCode: `import functools
import time
import json
from typing import Dict, Any, Callable

# 任务1: 实现一个智能缓存装饰器
def smart_cache(ttl: int = 60, max_size: int = 100):
    """
    智能缓存装饰器
    ttl: 缓存生存时间（秒）
    max_size: 最大缓存数量
    """
    def decorator(func: Callable) -> Callable:
        cache: Dict[str, Any] = {}
        cache_time: Dict[str, float] = {}
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # TODO: 实现缓存逻辑
            # 1. 生成缓存键
            # 2. 检查缓存是否存在且未过期
            # 3. 如果缓存满了，删除最旧的条目
            # 4. 执行函数并缓存结果
            pass
        
        # 添加清除缓存的方法
        wrapper.clear_cache = lambda: cache.clear() or cache_time.clear()
        wrapper.cache_info = lambda: {"size": len(cache), "max_size": max_size}
        
        return wrapper
    return decorator

# 任务2: 实现权限验证装饰器
class User:
    def __init__(self, username: str, role: str):
        self.username = username
        self.role = role

# 模拟当前用户
current_user = User("admin", "admin")

def require_permission(required_role: str):
    """
    权限验证装饰器
    required_role: 需要的角色权限
    """
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # TODO: 实现权限验证逻辑
            # 1. 检查当前用户是否有所需权限
            # 2. 如果没有权限，抛出异常
            # 3. 如果有权限，执行函数
            pass
        return wrapper
    return decorator

# 任务3: 实现API调用日志装饰器
def api_logger(log_file: str = "api.log"):
    """
    API调用日志装饰器
    log_file: 日志文件路径
    """
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # TODO: 实现日志记录逻辑
            # 1. 记录调用开始时间、参数
            # 2. 执行函数
            # 3. 记录结束时间、返回值、执行时间
            # 4. 如果有异常，记录异常信息
            pass
        return wrapper
    return decorator

# 任务4: 组合使用装饰器
@api_logger("user_api.log")
@require_permission("admin")
@smart_cache(ttl=30, max_size=50)
def get_user_data(user_id: int) -> Dict[str, Any]:
    """获取用户数据的API函数"""
    # 模拟数据库查询
    time.sleep(0.5)  # 模拟查询延迟
    return {
        "user_id": user_id,
        "username": f"user_{user_id}",
        "email": f"user_{user_id}@example.com",
        "timestamp": time.time()
    }

# 测试代码
if __name__ == "__main__":
    print("测试装饰器组合使用:")
    
    try:
        # 第一次调用（需要执行）
        result1 = get_user_data(123)
        print(f"第一次调用结果: {result1}")
        
        # 第二次调用（从缓存返回）
        result2 = get_user_data(123)
        print(f"第二次调用结果: {result2}")
        
        # 查看缓存信息
        print(f"缓存信息: {get_user_data.cache_info()}")
        
    except Exception as e:
        print(f"错误: {e}")`,
            expectedOutput: `测试装饰器组合使用:
[API LOG] 调用 get_user_data, 参数: (123,), {}
权限验证通过: admin 访问 get_user_data
执行函数并缓存结果
[API LOG] get_user_data 执行完成, 耗时: 0.50秒
第一次调用结果: {'user_id': 123, 'username': 'user_123', 'email': 'user_123@example.com', 'timestamp': 1234567890.12}
[API LOG] 调用 get_user_data, 参数: (123,), {}
权限验证通过: admin 访问 get_user_data
从缓存返回结果
[API LOG] get_user_data 执行完成, 耗时: 0.00秒
第二次调用结果: {'user_id': 123, 'username': 'user_123', 'email': 'user_123@example.com', 'timestamp': 1234567890.12}
缓存信息: {'size': 1, 'max_size': 50}`,
            hints: [
              '缓存键可以使用 str(args) + str(sorted(kwargs.items())) 生成',
              '使用 time.time() 获取当前时间戳',
              '权限验证需要检查 current_user.role',
              '日志可以简单打印到控制台，格式化包含时间、函数名、参数等信息',
              '注意装饰器的执行顺序：从下到上应用，从外到内执行'
            ]
          },
          order: 5,
          completed: false
        }
      ]
    };
  }
}
