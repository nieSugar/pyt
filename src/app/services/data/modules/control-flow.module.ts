import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ControlFlowModule {

  getModule(): Module {
    return {
      id: 'control-flow',
      title: '控制流',
      description: '条件语句和循环结构',
      order: 2,
      lessons: [
        {
          id: 'conditions',
          title: '条件语句',
          type: 'tutorial',
          content: `
# Python 条件语句

条件语句让程序能够根据不同情况执行不同的代码。

## if 语句

### 基本语法
\`\`\`python
age = 18
if age >= 18:
    print("你已经成年了")
\`\`\`

### if-else 语句
\`\`\`python
score = 85
if score >= 60:
    print("及格了！")
else:
    print("不及格，需要努力")
\`\`\`

### if-elif-else 语句
\`\`\`python
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 70:
    print("中等")
elif score >= 60:
    print("及格")
else:
    print("不及格")
\`\`\`
          `,
          codeExample: `# 条件语句练习
score = 85

if score >= 90:
    grade = "A"
    comment = "优秀！继续保持！"
elif score >= 80:
    grade = "B"
    comment = "良好，再努力一点就能达到优秀"
elif score >= 70:
    grade = "C"
    comment = "中等，还有提升空间"
elif score >= 60:
    grade = "D"
    comment = "及格，但需要更加努力"
else:
    grade = "F"
    comment = "不及格，需要重新学习"

print(f"成绩: {score}")
print(f"等级: {grade}")
print(f"评语: {comment}")`,
          order: 1,
          completed: false
        },
        {
          id: 'loops',
          title: '循环语句',
          type: 'tutorial',
          content: `
# Python 循环语句

循环让程序能够重复执行代码块。

## for 循环

### 遍历数字范围
\`\`\`python
# range(start, stop, step)
for i in range(5):
    print(f"第 {i+1} 次循环")

for i in range(1, 6):
    print(f"数字: {i}")

for i in range(0, 10, 2):
    print(f"偶数: {i}")
\`\`\`

## while 循环

### 基本语法
\`\`\`python
count = 0
while count < 5:
    print(f"计数: {count}")
    count += 1
\`\`\`
          `,
          codeExample: `# 循环语句练习
print("=== for 循环示例 ===")

# 倒计时
print("倒计时:")
for i in range(5, 0, -1):
    print(f"{i}...")
print("发射！🚀")

# 遍历列表
print("\\n购物清单:")
shopping_list = ["牛奶", "面包", "鸡蛋", "苹果", "香蕉"]
for index, item in enumerate(shopping_list, 1):
    print(f"{index}. {item}")`,
          order: 2,
          completed: false
        }
      ]
    };
  }
}
