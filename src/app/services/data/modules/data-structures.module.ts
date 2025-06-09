import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class DataStructuresModule {

  getModule(): Module {
    return {
      id: 'data-structures',
      title: '数据结构',
      description: '列表、字典、元组和集合',
      order: 3,
      lessons: [
        {
          id: 'lists',
          title: '列表 (List)',
          type: 'tutorial',
          content: `
# Python 列表 (List)

列表是Python中最常用的数据结构，用于存储有序的元素集合。

## 创建列表
\`\`\`python
# 空列表
empty_list = []
empty_list2 = list()

# 有元素的列表
fruits = ["苹果", "香蕉", "橙子"]
numbers = [1, 2, 3, 4, 5]
mixed = ["张三", 25, True, 3.14]
\`\`\`

## 访问列表元素
\`\`\`python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]

# 正向索引
print(fruits[0])    # 苹果 (第一个)
print(fruits[1])    # 香蕉 (第二个)

# 负向索引
print(fruits[-1])   # 葡萄 (最后一个)
print(fruits[-2])   # 橙子 (倒数第二个)
\`\`\`
          `,
          codeExample: `# 列表操作练习
students = ["张三", "李四", "王五", "赵六"]
scores = [85, 92, 78, 96]

print("原始数据:")
for i, student in enumerate(students):
    print(f"{student}: {scores[i]}分")

# 添加新学生
students.append("钱七")
scores.append(88)

print("\\n添加新学生后:")
for student, score in zip(students, scores):
    print(f"{student}: {score}分")`,
          order: 1,
          completed: false
        },
        {
          id: 'dictionaries',
          title: '字典 (Dictionary)',
          type: 'tutorial',
          content: `
# Python 字典 (Dictionary)

字典是一种可变的、无序的键值对集合。

## 创建字典
\`\`\`python
# 空字典
empty_dict = {}
empty_dict2 = dict()

# 有数据的字典
student = {
    "name": "张三",
    "age": 20,
    "grade": "大二",
    "scores": [85, 92, 78]
}
\`\`\`

## 访问字典元素
\`\`\`python
print(student["name"])     # 张三
print(student.get("age"))  # 20
print(student.get("phone", "未提供"))  # 未提供 (默认值)
\`\`\`
          `,
          codeExample: `# 字典操作练习
students_db = {
    "S001": {
        "name": "张三",
        "age": 20,
        "major": "计算机科学",
        "scores": {"数学": 95, "英语": 87, "编程": 92}
    },
    "S002": {
        "name": "李四",
        "age": 21,
        "major": "软件工程",
        "scores": {"数学": 88, "英语": 90, "编程": 95}
    }
}

# 显示所有学生信息
print("所有学生信息:")
for student_id, info in students_db.items():
    name = info["name"]
    major = info["major"]
    avg_score = sum(info["scores"].values()) / len(info["scores"])
    print(f"{student_id}: {name}, {major}专业, 平均分: {avg_score:.1f}")`,
          order: 2,
          completed: false
        }
      ]
    };
  }
}
