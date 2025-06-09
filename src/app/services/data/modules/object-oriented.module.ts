import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectOrientedModule {

  getModule(): Module {
    return {
      id: 'object-oriented',
      title: '面向对象编程',
      description: '类、对象、继承和多态',
      order: 7,
      lessons: [
        {
          id: 'classes-objects',
          title: '类和对象',
          type: 'tutorial',
          content: `
# Python 类和对象

面向对象编程是一种重要的编程范式。

## 定义类

\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"我叫{self.name}，今年{self.age}岁")
    
    def study(self, subject):
        print(f"{self.name}正在学习{subject}")
\`\`\`

## 创建对象

\`\`\`python
# 创建学生对象
student1 = Student("张三", 20)
student2 = Student("李四", 21)

# 调用方法
student1.introduce()  # 输出: 我叫张三，今年20岁
student1.study("Python")  # 输出: 张三正在学习Python
\`\`\`
          `,
          codeExample: `# 学生管理系统示例
class Student:
    def __init__(self, student_id, name, age, major):
        self.student_id = student_id
        self.name = name
        self.age = age
        self.major = major
        self.courses = []
        self.grades = {}
    
    def enroll_course(self, course):
        if course not in self.courses:
            self.courses.append(course)
            print(f"{self.name} 已选修 {course}")
    
    def add_grade(self, course, grade):
        if course in self.courses:
            self.grades[course] = grade
            print(f"{self.name} 的 {course} 成绩: {grade}")
    
    def get_gpa(self):
        if not self.grades:
            return 0
        return sum(self.grades.values()) / len(self.grades)
    
    def display_info(self):
        print(f"学号: {self.student_id}")
        print(f"姓名: {self.name}")
        print(f"年龄: {self.age}")
        print(f"专业: {self.major}")
        print(f"已选课程: {', '.join(self.courses)}")
        print(f"平均成绩: {self.get_gpa():.2f}")

# 创建学生并测试
student = Student("S001", "张三", 20, "计算机科学")
student.enroll_course("Python编程")
student.enroll_course("数据结构")
student.add_grade("Python编程", 95)
student.add_grade("数据结构", 88)
student.display_info()`,
          order: 1,
          completed: false
        }
      ]
    };
  }
}
