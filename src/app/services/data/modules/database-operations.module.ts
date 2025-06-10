import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseOperationsModule {

  getModule(): Module {
    return {
      id: 'database-operations',
      title: '数据库操作',
      description: '学习Python数据库编程',
      order: 11,
      lessons: [
        {
          id: 'sqlite-basics',
          title: 'SQLite基础操作',
          type: 'tutorial',
          content: `
# Python数据库操作基础

学习使用Python操作SQLite数据库。

## SQLite简介
SQLite是一个轻量级的关系型数据库，Python内置了sqlite3模块来操作SQLite数据库。

\`\`\`python
import sqlite3

# 连接数据库（如果不存在会自动创建）
conn = sqlite3.connect('example.db')
cursor = conn.cursor()

# 创建表
cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        grade TEXT
    )
''')

# 提交事务
conn.commit()
\`\`\`

## 插入数据
\`\`\`python
# 插入单条记录
cursor.execute('''
    INSERT INTO students (name, age, grade)
    VALUES (?, ?, ?)
''', ('张三', 20, 'A'))

# 插入多条记录
students_data = [
    ('李四', 21, 'B'),
    ('王五', 19, 'A'),
    ('赵六', 22, 'C')
]
cursor.executemany('''
    INSERT INTO students (name, age, grade)
    VALUES (?, ?, ?)
''', students_data)

conn.commit()
\`\`\`

## 查询数据
\`\`\`python
# 查询所有记录
cursor.execute('SELECT * FROM students')
all_students = cursor.fetchall()
for student in all_students:
    print(student)

# 查询特定条件的记录
cursor.execute('SELECT * FROM students WHERE grade = ?', ('A',))
a_grade_students = cursor.fetchall()

# 使用字典游标
conn.row_factory = sqlite3.Row
cursor = conn.cursor()
cursor.execute('SELECT * FROM students')
for row in cursor.fetchall():
    print(f"姓名: {row['name']}, 年龄: {row['age']}")
\`\`\`

## 更新和删除数据
\`\`\`python
# 更新数据
cursor.execute('''
    UPDATE students 
    SET grade = ? 
    WHERE name = ?
''', ('A+', '张三'))

# 删除数据
cursor.execute('DELETE FROM students WHERE age < ?', (20,))

conn.commit()
\`\`\`

## 关闭连接
\`\`\`python
cursor.close()
conn.close()
\`\`\`
          `,
          codeExample: `# SQLite数据库实战练习
import json
from datetime import datetime

# 模拟SQLite数据库操作
class MockSQLiteDB:
    def __init__(self, db_name):
        self.db_name = db_name
        self.tables = {}
        self.auto_increment = {}
        print(f"连接到数据库: {db_name}")
    
    def execute(self, sql, params=None):
        sql = sql.strip().upper()
        params = params or []
        
        if sql.startswith('CREATE TABLE'):
            self._create_table(sql)
        elif sql.startswith('INSERT'):
            return self._insert(sql, params)
        elif sql.startswith('SELECT'):
            return self._select(sql, params)
        elif sql.startswith('UPDATE'):
            return self._update(sql, params)
        elif sql.startswith('DELETE'):
            return self._delete(sql, params)
    
    def _create_table(self, sql):
        # 简化的表创建逻辑
        if 'STUDENTS' in sql:
            self.tables['students'] = []
            self.auto_increment['students'] = 1
            print("创建学生表成功")
        elif 'COURSES' in sql:
            self.tables['courses'] = []
            self.auto_increment['courses'] = 1
            print("创建课程表成功")
        elif 'ENROLLMENTS' in sql:
            self.tables['enrollments'] = []
            self.auto_increment['enrollments'] = 1
            print("创建选课表成功")
    
    def _insert(self, sql, params):
        if 'STUDENTS' in sql:
            student_id = self.auto_increment['students']
            self.auto_increment['students'] += 1
            record = {
                'id': student_id,
                'name': params[0],
                'age': params[1],
                'major': params[2]
            }
            self.tables['students'].append(record)
            print(f"插入学生记录: {record}")
            return student_id
        elif 'COURSES' in sql:
            course_id = self.auto_increment['courses']
            self.auto_increment['courses'] += 1
            record = {
                'id': course_id,
                'name': params[0],
                'credits': params[1],
                'instructor': params[2]
            }
            self.tables['courses'].append(record)
            print(f"插入课程记录: {record}")
            return course_id
        elif 'ENROLLMENTS' in sql:
            enrollment_id = self.auto_increment['enrollments']
            self.auto_increment['enrollments'] += 1
            record = {
                'id': enrollment_id,
                'student_id': params[0],
                'course_id': params[1],
                'grade': params[2] if len(params) > 2 else None,
                'enrollment_date': datetime.now().strftime('%Y-%m-%d')
            }
            self.tables['enrollments'].append(record)
            print(f"插入选课记录: {record}")
            return enrollment_id
    
    def _select(self, sql, params):
        if 'FROM STUDENTS' in sql:
            results = self.tables.get('students', [])
            if params and 'WHERE' in sql:
                # 简化的WHERE条件处理
                if 'MAJOR' in sql:
                    results = [s for s in results if s['major'] == params[0]]
                elif 'AGE' in sql:
                    results = [s for s in results if s['age'] >= params[0]]
            return results
        elif 'FROM COURSES' in sql:
            return self.tables.get('courses', [])
        elif 'FROM ENROLLMENTS' in sql:
            return self.tables.get('enrollments', [])
        elif 'JOIN' in sql:
            # 简化的JOIN操作
            return self._join_query()
    
    def _join_query(self):
        """模拟学生选课信息的JOIN查询"""
        results = []
        students = self.tables.get('students', [])
        courses = self.tables.get('courses', [])
        enrollments = self.tables.get('enrollments', [])
        
        for enrollment in enrollments:
            student = next((s for s in students if s['id'] == enrollment['student_id']), None)
            course = next((c for c in courses if c['id'] == enrollment['course_id']), None)
            
            if student and course:
                results.append({
                    'student_name': student['name'],
                    'student_major': student['major'],
                    'course_name': course['name'],
                    'credits': course['credits'],
                    'instructor': course['instructor'],
                    'grade': enrollment['grade'],
                    'enrollment_date': enrollment['enrollment_date']
                })
        
        return results
    
    def _update(self, sql, params):
        if 'STUDENTS' in sql:
            for student in self.tables.get('students', []):
                if student['name'] == params[1]:  # 假设按姓名更新
                    student['major'] = params[0]
                    print(f"更新学生记录: {student}")
        elif 'ENROLLMENTS' in sql:
            for enrollment in self.tables.get('enrollments', []):
                if enrollment['student_id'] == params[1] and enrollment['course_id'] == params[2]:
                    enrollment['grade'] = params[0]
                    print(f"更新选课记录: {enrollment}")
    
    def _delete(self, sql, params):
        if 'FROM STUDENTS' in sql:
            original_count = len(self.tables.get('students', []))
            self.tables['students'] = [s for s in self.tables['students'] if s['age'] >= params[0]]
            deleted_count = original_count - len(self.tables['students'])
            print(f"删除了 {deleted_count} 条学生记录")
    
    def commit(self):
        print("事务提交成功")
    
    def close(self):
        print(f"关闭数据库连接: {self.db_name}")

# 学生管理系统数据库操作演示
def create_student_management_system():
    """创建学生管理系统"""
    print("=== 学生管理系统数据库 ===")
    
    # 连接数据库
    db = MockSQLiteDB('student_management.db')
    
    # 创建表
    print("\\n1. 创建数据表")
    db.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            major TEXT
        )
    ''')
    
    db.execute('''
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            credits INTEGER,
            instructor TEXT
        )
    ''')
    
    db.execute('''
        CREATE TABLE IF NOT EXISTS enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            course_id INTEGER,
            grade TEXT,
            enrollment_date DATE
        )
    ''')
    
    # 插入学生数据
    print("\\n2. 插入学生数据")
    students_data = [
        ('张三', 20, '计算机科学'),
        ('李四', 21, '软件工程'),
        ('王五', 19, '数据科学'),
        ('赵六', 22, '人工智能')
    ]
    
    for student in students_data:
        db.execute('INSERT INTO students (name, age, major) VALUES (?, ?, ?)', student)
    
    # 插入课程数据
    print("\\n3. 插入课程数据")
    courses_data = [
        ('Python编程', 3, '张教授'),
        ('数据结构', 4, '李教授'),
        ('机器学习', 3, '王教授'),
        ('数据库系统', 3, '赵教授')
    ]
    
    for course in courses_data:
        db.execute('INSERT INTO courses (name, credits, instructor) VALUES (?, ?, ?)', course)
    
    # 插入选课数据
    print("\\n4. 插入选课数据")
    enrollments_data = [
        (1, 1, 'A'),  # 张三选Python编程，成绩A
        (1, 2, 'B'),  # 张三选数据结构，成绩B
        (2, 1, 'A'),  # 李四选Python编程，成绩A
        (2, 3, 'B'),  # 李四选机器学习，成绩B
        (3, 1, 'C'),  # 王五选Python编程，成绩C
        (3, 4, 'A'),  # 王五选数据库系统，成绩A
        (4, 2, 'B'),  # 赵六选数据结构，成绩B
        (4, 3, 'A')   # 赵六选机器学习，成绩A
    ]
    
    for enrollment in enrollments_data:
        db.execute('INSERT INTO enrollments (student_id, course_id, grade) VALUES (?, ?, ?)', enrollment)
    
    db.commit()
    
    # 查询数据
    print("\\n5. 查询数据")
    
    # 查询所有学生
    print("\\n所有学生:")
    students = db.execute('SELECT * FROM students')
    for student in students:
        print(f"  ID: {student['id']}, 姓名: {student['name']}, 年龄: {student['age']}, 专业: {student['major']}")
    
    # 查询所有课程
    print("\\n所有课程:")
    courses = db.execute('SELECT * FROM courses')
    for course in courses:
        print(f"  ID: {course['id']}, 课程: {course['name']}, 学分: {course['credits']}, 教师: {course['instructor']}")
    
    # 查询选课信息（JOIN查询）
    print("\\n选课信息:")
    enrollments = db.execute('''
        SELECT s.name, s.major, c.name, c.credits, c.instructor, e.grade
        FROM students s
        JOIN enrollments e ON s.id = e.student_id
        JOIN courses c ON c.id = e.course_id
    ''')
    
    for enrollment in enrollments:
        print(f"  {enrollment['student_name']} ({enrollment['student_major']}) - "
              f"{enrollment['course_name']} ({enrollment['credits']}学分, {enrollment['instructor']}) - "
              f"成绩: {enrollment['grade']}")
    
    # 更新数据
    print("\\n6. 更新数据")
    db.execute('UPDATE students SET major = ? WHERE name = ?', ('计算机科学与技术', '张三'))
    db.execute('UPDATE enrollments SET grade = ? WHERE student_id = ? AND course_id = ?', ('A+', 2, 1))
    
    # 删除数据
    print("\\n7. 删除数据")
    db.execute('DELETE FROM students WHERE age < ?', (20,))
    
    db.commit()
    db.close()

# 执行数据库操作演示
create_student_management_system()

print("\\n=== 数据库操作最佳实践 ===")
print("1. 始终使用参数化查询防止SQL注入")
print("2. 及时提交事务和关闭连接")
print("3. 使用事务处理确保数据一致性")
print("4. 创建适当的索引提高查询性能")
print("5. 定期备份重要数据")`,
          order: 1,
          completed: false
        }
      ]
    };
  }
}
