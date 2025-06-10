import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsModule {

  getModule(): Module {
    return {
      id: 'projects',
      title: '实战项目',
      description: '综合项目练习',
      order: 8,
      lessons: [
        {
          id: 'calculator-project',
          title: '计算器程序',
          type: 'exercise',
          content: `
# 计算器项目

创建一个功能完整的计算器程序，支持基本的数学运算。

## 项目要求

1. 支持加、减、乘、除四种基本运算
2. 能够处理小数运算
3. 具有错误处理功能
4. 提供友好的用户界面

## 实现思路

1. 创建计算器类
2. 实现各种运算方法
3. 添加输入验证
4. 创建用户交互界面

## 扩展功能

- 支持更多数学函数（平方根、幂运算等）
- 添加历史记录功能
- 支持表达式计算
          `,
          codeExample: `# 完整的计算器程序实现
import math

class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def subtract(self, a, b):
        result = a - b
        self.history.append(f"{a} - {b} = {result}")
        return result
    
    def multiply(self, a, b):
        result = a * b
        self.history.append(f"{a} × {b} = {result}")
        return result
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("不能除以零")
        result = a / b
        self.history.append(f"{a} ÷ {b} = {result}")
        return result
    
    def power(self, a, b):
        result = a ** b
        self.history.append(f"{a} ^ {b} = {result}")
        return result
    
    def sqrt(self, a):
        if a < 0:
            raise ValueError("不能计算负数的平方根")
        result = math.sqrt(a)
        self.history.append(f"√{a} = {result}")
        return result
    
    def show_history(self):
        print("计算历史:")
        for record in self.history[-5:]:  # 显示最近5条记录
            print(f"  {record}")

# 使用示例
calc = Calculator()

print("=== 计算器演示 ===")
print(f"10 + 5 = {calc.add(10, 5)}")
print(f"10 - 3 = {calc.subtract(10, 3)}")
print(f"4 × 6 = {calc.multiply(4, 6)}")
print(f"15 ÷ 3 = {calc.divide(15, 3)}")
print(f"2 ^ 8 = {calc.power(2, 8)}")
print(f"√16 = {calc.sqrt(16)}")

print()
calc.show_history()`,
          exercise: {
            id: 'calculator-exercise',
            description: '创建一个简单的计算器程序',
            initialCode: `# 计算器练习
# 请完成一个简单的计算器类

class Calculator:
    def __init__(self):
        # 初始化计算器
        pass

    def add(self, a, b):
        # 实现加法
        pass

    def subtract(self, a, b):
        # 实现减法
        pass

    def multiply(self, a, b):
        # 实现乘法
        pass

    def divide(self, a, b):
        # 实现除法（注意处理除零错误）
        pass

# 测试你的计算器
calc = Calculator()

# 测试加法
result1 = calc.add(10, 5)
print(f"10 + 5 = {result1}")

# 测试减法
result2 = calc.subtract(10, 3)
print(f"10 - 3 = {result2}")

# 测试乘法
result3 = calc.multiply(4, 6)
print(f"4 × 6 = {result3}")

# 测试除法
result4 = calc.divide(15, 3)
print(f"15 ÷ 3 = {result4}")`,
            expectedOutput: `10 + 5 = 15
10 - 3 = 7
4 × 6 = 24
15 ÷ 3 = 5.0`,
            hints: [
              '在每个方法中返回计算结果',
              '除法时要检查除数是否为零',
              '可以使用 if 语句来处理除零情况',
              '记住 Python 中除法的结果是浮点数'
            ]
          },
          order: 1,
          completed: false
        },
        {
          id: 'number-guessing-game',
          title: '猜数字游戏',
          type: 'exercise',
          content: `
# 猜数字游戏

创建一个有趣的猜数字游戏，让用户猜测计算机生成的随机数。

## 游戏规则

1. 计算机随机生成1-100之间的数字
2. 用户输入猜测的数字
3. 系统提示"太大"、"太小"或"正确"
4. 记录猜测次数
5. 游戏结束后显示统计信息

## 扩展功能

- 不同难度级别
- 最佳成绩记录
- 提示系统
- 多轮游戏
          `,
          codeExample: `# 完整的猜数字游戏实现
import random

class NumberGuessingGame:
    def __init__(self, min_num=1, max_num=100):
        self.min_num = min_num
        self.max_num = max_num
        self.target_number = 0
        self.attempts = 0
        self.max_attempts = 10
        self.game_history = []
    
    def start_new_game(self):
        self.target_number = random.randint(self.min_num, self.max_num)
        self.attempts = 0
        print(f"\\n🎮 新游戏开始！")
        print(f"我想了一个{self.min_num}到{self.max_num}之间的数字")
        print(f"你有{self.max_attempts}次机会猜中它！")
        print("输入 'quit' 退出游戏\\n")
    
    def make_guess(self, guess):
        self.attempts += 1
        
        if guess == self.target_number:
            print(f"🎉 恭喜！你猜对了！数字就是 {self.target_number}")
            print(f"你用了 {self.attempts} 次就猜中了！")
            self.game_history.append(self.attempts)
            return True
        elif guess < self.target_number:
            print(f"📈 太小了！还有 {self.max_attempts - self.attempts} 次机会")
        else:
            print(f"📉 太大了！还有 {self.max_attempts - self.attempts} 次机会")
        
        if self.attempts >= self.max_attempts:
            print(f"💔 游戏结束！正确答案是 {self.target_number}")
            self.game_history.append(-1)  # -1 表示失败
            return True
        
        return False
    
    def show_statistics(self):
        if not self.game_history:
            print("还没有游戏记录")
            return
        
        wins = [score for score in self.game_history if score > 0]
        losses = len([score for score in self.game_history if score == -1])
        
        print(f"\\n📊 游戏统计:")
        print(f"总游戏次数: {len(self.game_history)}")
        print(f"获胜次数: {len(wins)}")
        print(f"失败次数: {losses}")
        
        if wins:
            print(f"最佳成绩: {min(wins)} 次")
            print(f"平均猜测次数: {sum(wins)/len(wins):.1f} 次")

# 游戏演示
game = NumberGuessingGame()
game.start_new_game()

# 模拟几次猜测
test_guesses = [50, 75, 60, 65, 63]
for guess in test_guesses:
    print(f"猜测: {guess}")
    if game.make_guess(guess):
        break

game.show_statistics()`,
          order: 2,
          completed: false
        }
      ]
    };
  }
}
