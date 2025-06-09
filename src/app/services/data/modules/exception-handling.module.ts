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
        }
      ]
    };
  }
}
