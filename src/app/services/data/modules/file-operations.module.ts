import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class FileOperationsModule {

  getModule(): Module {
    return {
      id: 'file-operations',
      title: '文件操作',
      description: '文件读写和处理',
      order: 6,
      lessons: [
        {
          id: 'file-basics',
          title: '文件操作基础',
          type: 'tutorial',
          content: `
# Python 文件操作

文件操作是程序与外部数据交互的重要方式。

## 读取文件

\`\`\`python
# 读取整个文件
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read()
    print(content)

# 逐行读取
with open('example.txt', 'r', encoding='utf-8') as file:
    for line in file:
        print(line.strip())
\`\`\`

## 写入文件

\`\`\`python
# 写入文本
with open('output.txt', 'w', encoding='utf-8') as file:
    file.write("Hello, World!\\n")
    file.write("这是第二行")

# 追加内容
with open('output.txt', 'a', encoding='utf-8') as file:
    file.write("\\n这是追加的内容")
\`\`\`
          `,
          codeExample: `# 文件操作实例演示
import os

def create_sample_file():
    """创建示例文件"""
    content = """Python学习笔记
第一章：基础语法
第二章：数据结构
第三章：函数
第四章：面向对象编程"""
    
    with open('notes.txt', 'w', encoding='utf-8') as file:
        file.write(content)
    print("示例文件已创建")

def read_and_process_file():
    """读取并处理文件"""
    try:
        with open('notes.txt', 'r', encoding='utf-8') as file:
            lines = file.readlines()
            
        print("文件内容:")
        for i, line in enumerate(lines, 1):
            print(f"{i:2d}: {line.strip()}")
            
    except FileNotFoundError:
        print("文件不存在，请先创建文件")

# 演示文件操作
create_sample_file()
read_and_process_file()`,
          order: 1,
          completed: false
        }
      ]
    };
  }
}
