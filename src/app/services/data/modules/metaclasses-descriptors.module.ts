import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class MetaclassesDescriptorsModule {

  getModule(): Module {
    return {
      id: 'metaclasses-descriptors',
      title: '元类和描述符',
      description: '深入学习Python元类、描述符协议和高级面向对象编程',
      order: 10,
      lessons: [
        {
          id: 'descriptors-protocol',
          title: '描述符协议深入',
          type: 'tutorial',
          content: `
# 描述符协议深入

描述符是Python中的高级特性，用于自定义属性访问行为。

## 描述符协议

描述符协议包含三个方法：\`__get__()\`、\`__set__()\` 和 \`__delete__()\`

\`\`\`python
class Descriptor:
    def __init__(self, name=None):
        self.name = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        print(f"获取属性 {self.name}")
        return getattr(obj, f'_{self.name}', None)
    
    def __set__(self, obj, value):
        print(f"设置属性 {self.name} = {value}")
        setattr(obj, f'_{self.name}', value)
    
    def __delete__(self, obj):
        print(f"删除属性 {self.name}")
        delattr(obj, f'_{self.name}')

class MyClass:
    attr = Descriptor('attr')

obj = MyClass()
obj.attr = "hello"  # 调用 __set__
print(obj.attr)     # 调用 __get__
del obj.attr        # 调用 __delete__
\`\`\`

## 数据描述符 vs 非数据描述符

\`\`\`python
class DataDescriptor:
    """数据描述符 - 同时定义 __get__ 和 __set__"""
    def __get__(self, obj, objtype=None):
        return "数据描述符"
    
    def __set__(self, obj, value):
        pass

class NonDataDescriptor:
    """非数据描述符 - 只定义 __get__"""
    def __get__(self, obj, objtype=None):
        return "非数据描述符"

class Example:
    data_desc = DataDescriptor()
    non_data_desc = NonDataDescriptor()

obj = Example()
# 数据描述符优先级更高
obj.__dict__['data_desc'] = "实例属性"
print(obj.data_desc)  # 输出: 数据描述符

# 非数据描述符被实例属性覆盖
obj.__dict__['non_data_desc'] = "实例属性"  
print(obj.non_data_desc)  # 输出: 实例属性
\`\`\`

## 属性验证描述符

\`\`\`python
class ValidatedAttribute:
    def __init__(self, validator, name=None):
        self.validator = validator
        self.name = name
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, f'_{self.name}', None)
    
    def __set__(self, obj, value):
        if not self.validator(value):
            raise ValueError(f"Invalid value for {self.name}: {value}")
        setattr(obj, f'_{self.name}', value)

class Person:
    age = ValidatedAttribute(lambda x: isinstance(x, int) and x >= 0)
    name = ValidatedAttribute(lambda x: isinstance(x, str) and len(x) > 0)

person = Person()
person.name = "张三"
person.age = 25
print(f"{person.name}, {person.age}")
\`\`\`
          `,
          codeExample: `class TypedProperty:
    """类型验证描述符"""
    def __init__(self, expected_type, default=None):
        self.expected_type = expected_type
        self.default = default
    
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f'_{name}'
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, self.default)
    
    def __set__(self, obj, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(
                f"{self.name} must be {self.expected_type.__name__}, "
                f"got {type(value).__name__}"
            )
        setattr(obj, self.private_name, value)

class CachedProperty:
    """缓存属性描述符"""
    def __init__(self, func):
        self.func = func
        self.name = func.__name__
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        
        # 检查是否已缓存
        cache_name = f'_cached_{self.name}'
        if hasattr(obj, cache_name):
            print(f"从缓存返回 {self.name}")
            return getattr(obj, cache_name)
        
        # 计算并缓存结果
        result = self.func(obj)
        setattr(obj, cache_name, result)
        print(f"计算并缓存 {self.name}")
        return result

class RangeProperty:
    """范围验证描述符"""
    def __init__(self, min_value=None, max_value=None):
        self.min_value = min_value
        self.max_value = max_value
    
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f'_{name}'
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, 0)
    
    def __set__(self, obj, value):
        if self.min_value is not None and value < self.min_value:
            raise ValueError(f"{self.name} must be >= {self.min_value}")
        if self.max_value is not None and value > self.max_value:
            raise ValueError(f"{self.name} must be <= {self.max_value}")
        setattr(obj, self.private_name, value)

# 使用描述符的示例类
class Student:
    name = TypedProperty(str, "Unknown")
    age = RangeProperty(0, 150)
    grade = TypedProperty(float, 0.0)
    
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade
    
    @CachedProperty
    def gpa_letter(self):
        """计算字母等级（耗时操作模拟）"""
        import time
        time.sleep(0.1)  # 模拟复杂计算
        
        if self.grade >= 90:
            return 'A'
        elif self.grade >= 80:
            return 'B'
        elif self.grade >= 70:
            return 'C'
        elif self.grade >= 60:
            return 'D'
        else:
            return 'F'

# 测试描述符
print("=== 描述符测试 ===")
student = Student("张三", 20, 85.5)
print(f"学生: {student.name}, 年龄: {student.age}, 成绩: {student.grade}")

# 测试缓存属性
print(f"第一次获取等级: {student.gpa_letter}")
print(f"第二次获取等级: {student.gpa_letter}")

# 测试类型验证
try:
    student.age = "二十"  # 这会引发TypeError
except TypeError as e:
    print(f"类型错误: {e}")

# 测试范围验证
try:
    student.age = -5  # 这会引发ValueError
except ValueError as e:
    print(f"范围错误: {e}")`,
          order: 1,
          completed: false
        },
        {
          id: 'metaclass-basics',
          title: '元类基础概念',
          type: 'tutorial',
          content: `
# 元类基础概念

元类是"创建类的类"，它控制类的创建过程。

## 类的创建过程

在Python中，类也是对象，它们由元类创建：

\`\`\`python
# 这两种方式是等价的
class MyClass:
    def method(self):
        return "Hello"

# 使用type()动态创建类
def method(self):
    return "Hello"

MyClass = type('MyClass', (), {'method': method})
\`\`\`

## type的双重身份

\`\`\`python
# type既是内置函数，也是元类
print(type(42))        # <class 'int'>
print(type(int))       # <class 'type'>
print(type(type))      # <class 'type'>

# 检查类的元类
class Regular:
    pass

print(type(Regular))   # <class 'type'>
print(Regular.__class__)  # <class 'type'>
\`\`\`

## 自定义元类

\`\`\`python
class MyMetaclass(type):
    def __new__(mcs, name, bases, attrs):
        print(f"创建类: {name}")
        print(f"基类: {bases}")
        print(f"属性: {list(attrs.keys())}")
        
        # 修改类属性
        attrs['created_by'] = 'MyMetaclass'
        
        return super().__new__(mcs, name, bases, attrs)
    
    def __init__(cls, name, bases, attrs):
        print(f"初始化类: {name}")
        super().__init__(name, bases, attrs)

class MyClass(metaclass=MyMetaclass):
    def method(self):
        return "Hello"

obj = MyClass()
print(obj.created_by)  # MyMetaclass
\`\`\`

## 元类的实际应用

\`\`\`python
class SingletonMeta(type):
    """单例模式元类"""
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    def __init__(self):
        self.connection = f"Connection_{id(self)}"

# 测试单例
db1 = Database()
db2 = Database()
print(db1 is db2)  # True
\`\`\`
          `,
          codeExample: `class AttributeAccessMeta(type):
    """属性访问监控元类"""
    def __new__(mcs, name, bases, attrs):
        # 为所有方法添加日志
        for key, value in attrs.items():
            if callable(value) and not key.startswith('_'):
                attrs[key] = mcs.add_logging(value, key)
        return super().__new__(mcs, name, bases, attrs)
    
    @staticmethod
    def add_logging(func, name):
        def wrapper(*args, **kwargs):
            print(f"调用方法: {name}")
            result = func(*args, **kwargs)
            print(f"方法 {name} 执行完成")
            return result
        return wrapper

class AutoPropertyMeta(type):
    """自动属性元类"""
    def __new__(mcs, name, bases, attrs):
        # 查找类型注解
        annotations = attrs.get('__annotations__', {})
        
        for attr_name, attr_type in annotations.items():
            if not attr_name.startswith('_'):
                # 创建属性的getter和setter
                private_name = f'_{attr_name}'
                
                def make_property(private_attr):
                    def getter(self):
                        return getattr(self, private_attr, None)
                    
                    def setter(self, value):
                        setattr(self, private_attr, value)
                    
                    return property(getter, setter)
                
                attrs[attr_name] = make_property(private_name)
        
        return super().__new__(mcs, name, bases, attrs)

class ValidationMeta(type):
    """验证元类"""
    def __new__(mcs, name, bases, attrs):
        # 添加验证方法
        def validate(self):
            """验证所有带验证规则的属性"""
            for attr_name in dir(self):
                if attr_name.startswith('validate_'):
                    field_name = attr_name.replace('validate_', '')
                    if hasattr(self, field_name):
                        validator = getattr(self, attr_name)
                        value = getattr(self, field_name)
                        if not validator(value):
                            raise ValueError(f"Validation failed for {field_name}: {value}")
            return True
        
        attrs['validate'] = validate
        return super().__new__(mcs, name, bases, attrs)

# 使用元类的示例
class LoggedClass(metaclass=AttributeAccessMeta):
    def process_data(self, data):
        return f"处理数据: {data}"
    
    def save_result(self, result):
        return f"保存结果: {result}"

class Person(metaclass=AutoPropertyMeta):
    name: str
    age: int
    
    def __init__(self, name, age):
        self.name = name
        self.age = age

class User(metaclass=ValidationMeta):
    def __init__(self, username, email, age):
        self.username = username
        self.email = email
        self.age = age
    
    def validate_username(self, value):
        return isinstance(value, str) and len(value) >= 3
    
    def validate_email(self, value):
        return isinstance(value, str) and '@' in value
    
    def validate_age(self, value):
        return isinstance(value, int) and 0 <= value <= 150

# 测试元类
print("=== 日志元类测试 ===")
logged = LoggedClass()
logged.process_data("test")
logged.save_result("success")

print("\\n=== 自动属性元类测试 ===")
person = Person("张三", 25)
print(f"姓名: {person.name}, 年龄: {person.age}")

print("\\n=== 验证元类测试 ===")
try:
    user = User("john", "john@email.com", 25)
    user.validate()
    print("用户验证通过")
    
    user.age = -5
    user.validate()  # 这会引发验证错误
except ValueError as e:
    print(f"验证错误: {e}")`,
          order: 2,
          completed: false
        }
      ]
    };
  }
} 
