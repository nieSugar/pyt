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
        }
      ]
    };
  }
}
