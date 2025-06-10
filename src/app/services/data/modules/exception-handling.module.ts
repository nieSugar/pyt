import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlingModule {

  getModule(): Module {
    return {
      id: 'exception-handling',
      title: '异常处理',
      description: '错误处理和程序健壮性',
      order: 5,
      lessons: [
        {
          id: 'try-except',
          title: '异常处理基础',
          type: 'tutorial',
          content: `
# Python 异常处理

异常处理是编程中的重要概念，它让程序能够优雅地处理错误情况。

## try-except 语句

\`\`\`python
try:
    # 可能出错的代码
    result = 10 / 0
except ZeroDivisionError:
    # 处理特定异常
    print("不能除以零！")
\`\`\`

## 捕获多种异常

\`\`\`python
try:
    num = int(input("请输入一个数字: "))
    result = 10 / num
    print(f"结果: {result}")
except ValueError:
    print("输入的不是有效数字！")
except ZeroDivisionError:
    print("不能除以零！")
except Exception as e:
    print(f"发生了未知错误: {e}")
\`\`\`
          `,
          codeExample: `# 异常处理实例演示
def safe_divide(a, b):
    """安全除法函数"""
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print(f"错误：不能用{b}作除数")
        return None
    except TypeError:
        print("错误：参数必须是数字")
        return None

# 测试除法函数
print("安全除法测试:")
print(f"10 ÷ 2 = {safe_divide(10, 2)}")
print(f"10 ÷ 0 = {safe_divide(10, 0)}")
print(f"'10' ÷ 2 = {safe_divide('10', 2)}")`,
          order: 1,
          completed: false
        },
        {
          id: 'custom-exceptions',
          title: '自定义异常',
          type: 'tutorial',
          content: `
# Python 自定义异常

学习如何创建和使用自定义异常类。

## 创建自定义异常
\`\`\`python
class CustomError(Exception):
    """自定义异常基类"""
    pass

class ValidationError(CustomError):
    """数据验证异常"""
    def __init__(self, message, field_name=None):
        self.message = message
        self.field_name = field_name
        super().__init__(self.message)

class BusinessLogicError(CustomError):
    """业务逻辑异常"""
    pass
\`\`\`

## 使用自定义异常
\`\`\`python
def validate_age(age):
    if not isinstance(age, int):
        raise ValidationError("年龄必须是整数", "age")
    if age < 0:
        raise ValidationError("年龄不能为负数", "age")
    if age > 150:
        raise ValidationError("年龄不能超过150岁", "age")
    return True

try:
    validate_age(-5)
except ValidationError as e:
    print(f"验证错误: {e.message}")
    if e.field_name:
        print(f"字段: {e.field_name}")
\`\`\`

## 异常链和上下文
\`\`\`python
def process_data(data):
    try:
        # 模拟数据处理
        result = int(data) / 0
    except ZeroDivisionError as e:
        # 将底层异常包装为业务异常
        raise BusinessLogicError("数据处理失败") from e

try:
    process_data("10")
except BusinessLogicError as e:
    print(f"业务错误: {e}")
    print(f"原因: {e.__cause__}")
\`\`\`
          `,
          codeExample: `# 自定义异常实战示例
class BankAccountError(Exception):
    """银行账户异常基类"""
    pass

class InsufficientFundsError(BankAccountError):
    """余额不足异常"""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        message = f"余额不足：当前余额 {balance}，尝试提取 {amount}"
        super().__init__(message)

class InvalidAmountError(BankAccountError):
    """无效金额异常"""
    pass

class AccountLockedError(BankAccountError):
    """账户锁定异常"""
    pass

class BankAccount:
    def __init__(self, account_number, initial_balance=0):
        self.account_number = account_number
        self.balance = initial_balance
        self.is_locked = False
        self.failed_attempts = 0

    def deposit(self, amount):
        if self.is_locked:
            raise AccountLockedError(f"账户 {self.account_number} 已被锁定")

        if amount <= 0:
            raise InvalidAmountError("存款金额必须大于0")

        self.balance += amount
        print(f"存款成功：+{amount}，当前余额：{self.balance}")

    def withdraw(self, amount):
        if self.is_locked:
            raise AccountLockedError(f"账户 {self.account_number} 已被锁定")

        if amount <= 0:
            raise InvalidAmountError("取款金额必须大于0")

        if amount > self.balance:
            self.failed_attempts += 1
            if self.failed_attempts >= 3:
                self.is_locked = True
                raise AccountLockedError("连续失败次数过多，账户已被锁定")
            raise InsufficientFundsError(self.balance, amount)

        self.balance -= amount
        self.failed_attempts = 0  # 重置失败次数
        print(f"取款成功：-{amount}，当前余额：{self.balance}")

# 测试银行账户系统
account = BankAccount("123456789", 1000)

try:
    print("=== 银行账户操作测试 ===")
    account.deposit(500)
    account.withdraw(200)
    account.withdraw(2000)  # 这会引发余额不足异常
except InsufficientFundsError as e:
    print(f"操作失败: {e}")
    print(f"当前余额: {e.balance}")
except InvalidAmountError as e:
    print(f"金额错误: {e}")
except AccountLockedError as e:
    print(f"账户状态: {e}")
except BankAccountError as e:
    print(f"银行操作错误: {e}")

print(f"\\n账户状态：余额 {account.balance}，失败次数 {account.failed_attempts}")`,
          order: 2,
          completed: false
        }
      ]
    };
  }
}
