import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ContextManagersModule {

  getModule(): Module {
    return {
      id: 'context-managers',
      title: '上下文管理器深入',
      description: '深入学习Python上下文管理器的原理、实现和应用',
      order: 9,
      lessons: [
        {
          id: 'context-manager-protocol',
          title: '上下文管理器协议',
          type: 'tutorial',
          content: `
# 上下文管理器协议

上下文管理器协议定义了对象如何与with语句交互，确保资源的正确获取和释放。

## 协议基础

上下文管理器协议包含两个方法：\`__enter__()\` 和 \`__exit__()\`

\`\`\`python
class MyContextManager:
    def __enter__(self):
        print("进入上下文")
        return "资源对象"
    
    def __exit__(self, exc_type, exc_value, traceback):
        print("退出上下文")
        print(f"异常类型: {exc_type}")
        print(f"异常值: {exc_value}")
        print(f"追踪信息: {traceback}")
        return False  # 不抑制异常

# 使用上下文管理器
with MyContextManager() as resource:
    print(f"使用资源: {resource}")
    # 可选：抛出异常测试
    # raise ValueError("测试异常")
\`\`\`

## 异常处理

\`__exit__\` 方法的返回值决定是否抑制异常：

\`\`\`python
class ErrorHandler:
    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is ValueError:
            print(f"捕获到ValueError: {exc_value}")
            return True  # 抑制异常
        return False  # 其他异常不抑制

with ErrorHandler():
    raise ValueError("这个异常会被抑制")
print("继续执行")

try:
    with ErrorHandler():
        raise TypeError("这个异常不会被抑制")
except TypeError as e:
    print(f"异常传播出来: {e}")
\`\`\`

## 文件操作示例

\`\`\`python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        print(f"打开文件: {self.filename}")
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_value, traceback):
        print(f"关闭文件: {self.filename}")
        if self.file:
            self.file.close()

# 使用自定义文件管理器
with FileManager("test.txt", "w") as f:
    f.write("Hello, World!")
\`\`\`
          `,
          codeExample: `import threading
import time
from typing import Any, Optional

class DatabaseConnection:
    """数据库连接上下文管理器"""
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connection = None
        self.transaction = None
    
    def __enter__(self):
        print(f"连接数据库: {self.connection_string}")
        # 模拟数据库连接
        self.connection = f"Connection_{id(self)}"
        print(f"连接建立: {self.connection}")
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type:
            print(f"发生异常，回滚事务: {exc_value}")
            if self.transaction:
                print("执行回滚")
        else:
            print("正常退出，提交事务")
            if self.transaction:
                print("执行提交")
        
        print(f"关闭连接: {self.connection}")
        self.connection = None
    
    def begin_transaction(self):
        self.transaction = f"Transaction_{id(self)}"
        print(f"开始事务: {self.transaction}")
    
    def execute(self, sql: str):
        if not self.connection:
            raise RuntimeError("数据库未连接")
        print(f"执行SQL: {sql}")

class ThreadLock:
    """线程锁上下文管理器"""
    def __init__(self, lock_name: str):
        self.lock_name = lock_name
        self.lock = threading.Lock()
        self.acquired = False
    
    def __enter__(self):
        print(f"尝试获取锁: {self.lock_name}")
        self.acquired = self.lock.acquire(timeout=5)
        if self.acquired:
            print(f"成功获取锁: {self.lock_name}")
        else:
            raise TimeoutError(f"获取锁超时: {self.lock_name}")
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        if self.acquired:
            print(f"释放锁: {self.lock_name}")
            self.lock.release()
            self.acquired = False

class Timer:
    """计时器上下文管理器"""
    def __init__(self, operation_name: str = "操作"):
        self.operation_name = operation_name
        self.start_time = None
    
    def __enter__(self):
        print(f"开始{self.operation_name}")
        self.start_time = time.time()
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        elapsed = time.time() - self.start_time
        if exc_type:
            print(f"{self.operation_name}失败，耗时: {elapsed:.4f}秒")
        else:
            print(f"{self.operation_name}完成，耗时: {elapsed:.4f}秒")

# 测试上下文管理器
print("=== 数据库连接测试 ===")
try:
    with DatabaseConnection("localhost:5432/mydb") as db:
        db.begin_transaction()
        db.execute("SELECT * FROM users")
        db.execute("UPDATE users SET status = 'active'")
        # 模拟异常
        # raise ValueError("数据库操作失败")
except Exception as e:
    print(f"捕获异常: {e}")

print("\\n=== 线程锁测试 ===")
with ThreadLock("shared_resource") as lock:
    print("执行需要锁保护的操作")
    time.sleep(0.1)

print("\\n=== 计时器测试 ===")
with Timer("复杂计算") as timer:
    # 模拟复杂计算
    time.sleep(0.5)
    result = sum(range(100000))`,
          order: 1,
          completed: false
        },
        {
          id: 'contextlib-module',
          title: 'contextlib模块详解',
          type: 'tutorial',
          content: `
# contextlib模块详解

contextlib模块提供了创建和使用上下文管理器的实用工具。

## @contextmanager装饰器

使用生成器函数创建上下文管理器：

\`\`\`python
from contextlib import contextmanager

@contextmanager
def my_context():
    print("进入上下文")
    try:
        yield "资源"
    finally:
        print("退出上下文")

with my_context() as resource:
    print(f"使用资源: {resource}")
\`\`\`

## closing()函数

自动调用对象的close()方法：

\`\`\`python
from contextlib import closing
import urllib.request

with closing(urllib.request.urlopen('http://example.com')) as page:
    content = page.read()
\`\`\`

## suppress()函数

抑制指定的异常：

\`\`\`python
from contextlib import suppress

with suppress(FileNotFoundError):
    with open('missing_file.txt') as f:
        content = f.read()
print("文件不存在，但程序继续执行")
\`\`\`

## redirect_stdout()和redirect_stderr()

重定向标准输出和错误输出：

\`\`\`python
from contextlib import redirect_stdout, redirect_stderr
import io

# 重定向标准输出
output = io.StringIO()
with redirect_stdout(output):
    print("这会被重定向")
    print("这也会被重定向")

print(f"捕获的输出: {output.getvalue()}")
\`\`\`
          `,
          codeExample: `from contextlib import contextmanager, closing, suppress, redirect_stdout
import io
import time
import tempfile
import os

@contextmanager
def change_directory(path):
    """临时改变工作目录的上下文管理器"""
    old_path = os.getcwd()
    try:
        os.chdir(path)
        print(f"切换到目录: {path}")
        yield path
    finally:
        os.chdir(old_path)
        print(f"恢复到目录: {old_path}")

@contextmanager
def temporary_value(obj, attr, new_value):
    """临时修改对象属性值的上下文管理器"""
    old_value = getattr(obj, attr)
    try:
        setattr(obj, attr, new_value)
        print(f"临时设置 {attr} = {new_value}")
        yield obj
    finally:
        setattr(obj, attr, old_value)
        print(f"恢复 {attr} = {old_value}")

@contextmanager
def capture_output():
    """捕获标准输出的上下文管理器"""
    old_stdout = io.StringIO()
    try:
        with redirect_stdout(old_stdout):
            yield old_stdout
    finally:
        pass

@contextmanager
def performance_monitor(operation_name):
    """性能监控上下文管理器"""
    start_time = time.time()
    start_memory = 0  # 简化示例
    
    print(f"开始监控: {operation_name}")
    try:
        yield
    finally:
        end_time = time.time()
        elapsed = end_time - start_time
        print(f"性能报告 - {operation_name}:")
        print(f"  执行时间: {elapsed:.4f}秒")
        print(f"  状态: {'成功' if elapsed < 1 else '较慢'}")

# 使用示例
print("=== 目录切换测试 ===")
current_dir = os.getcwd()
print(f"当前目录: {current_dir}")

with change_directory("/tmp" if os.name != 'nt' else "C:\\\\"):
    print(f"临时目录: {os.getcwd()}")

print(f"恢复目录: {os.getcwd()}")

print("\\n=== 属性临时修改测试 ===")
class Config:
    debug = False
    timeout = 30

config = Config()
print(f"原始配置: debug={config.debug}, timeout={config.timeout}")

with temporary_value(config, 'debug', True):
    print(f"临时配置: debug={config.debug}, timeout={config.timeout}")

print(f"恢复配置: debug={config.debug}, timeout={config.timeout}")

print("\\n=== 异常抑制测试 ===")
with suppress(ZeroDivisionError):
    result = 1 / 0
    print("这行不会执行")
print("异常被抑制，程序继续执行")

print("\\n=== 性能监控测试 ===")
with performance_monitor("数据处理"):
    # 模拟数据处理
    data = [i**2 for i in range(100000)]
    time.sleep(0.1)`,
          order: 2,
          completed: false
        }
      ]
    };
  }
} 
