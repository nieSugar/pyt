import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class DataVisualizationModule {

  getModule(): Module {
    return {
      id: 'data-visualization',
      title: '数据可视化',
      description: '使用Python创建图表和可视化',
      order: 10,
      lessons: [
        {
          id: 'matplotlib-basics',
          title: 'Matplotlib基础',
          type: 'tutorial',
          content: `
# Python数据可视化基础

学习使用Matplotlib创建各种图表和可视化。

## Matplotlib简介
Matplotlib是Python中最流行的绘图库，可以创建各种静态、动态和交互式图表。

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# 创建简单的线图
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.title('简单线图')
plt.xlabel('X轴')
plt.ylabel('Y轴')
plt.show()
\`\`\`

## 不同类型的图表
\`\`\`python
# 散点图
plt.scatter(x, y)
plt.title('散点图')
plt.show()

# 柱状图
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]
plt.bar(categories, values)
plt.title('柱状图')
plt.show()

# 饼图
plt.pie(values, labels=categories, autopct='%1.1f%%')
plt.title('饼图')
plt.show()
\`\`\`

## 自定义图表样式
\`\`\`python
plt.figure(figsize=(10, 6))
plt.plot(x, y, color='red', linewidth=2, linestyle='--', marker='o')
plt.title('自定义样式线图', fontsize=16)
plt.xlabel('X轴', fontsize=12)
plt.ylabel('Y轴', fontsize=12)
plt.grid(True, alpha=0.3)
plt.legend(['数据线'])
plt.show()
\`\`\`

## 子图
\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# 第一个子图
axes[0, 0].plot(x, y)
axes[0, 0].set_title('线图')

# 第二个子图
axes[0, 1].scatter(x, y)
axes[0, 1].set_title('散点图')

# 第三个子图
axes[1, 0].bar(categories, values)
axes[1, 0].set_title('柱状图')

# 第四个子图
axes[1, 1].pie(values, labels=categories)
axes[1, 1].set_title('饼图')

plt.tight_layout()
plt.show()
\`\`\`
          `,
          codeExample: `# Matplotlib实战练习
import math
import random

# 模拟matplotlib功能
class MockPlot:
    def __init__(self):
        self.current_figure = None
        self.plots = []
    
    def figure(self, figsize=None):
        print(f"创建新图表 {figsize if figsize else '(默认大小)'}")
        self.current_figure = {'figsize': figsize, 'plots': []}
        return self.current_figure
    
    def plot(self, x, y, **kwargs):
        style = self._format_style(kwargs)
        print(f"绘制线图: {len(x)}个数据点 {style}")
        if self.current_figure:
            self.current_figure['plots'].append(('line', x, y, kwargs))
    
    def scatter(self, x, y, **kwargs):
        style = self._format_style(kwargs)
        print(f"绘制散点图: {len(x)}个数据点 {style}")
        if self.current_figure:
            self.current_figure['plots'].append(('scatter', x, y, kwargs))
    
    def bar(self, x, y, **kwargs):
        style = self._format_style(kwargs)
        print(f"绘制柱状图: {len(x)}个类别 {style}")
        if self.current_figure:
            self.current_figure['plots'].append(('bar', x, y, kwargs))
    
    def pie(self, values, labels=None, **kwargs):
        print(f"绘制饼图: {len(values)}个扇形")
        if labels:
            for label, value in zip(labels, values):
                percentage = (value / sum(values)) * 100
                print(f"  {label}: {percentage:.1f}%")
    
    def hist(self, data, bins=10, **kwargs):
        print(f"绘制直方图: {len(data)}个数据点, {bins}个区间")
    
    def title(self, text, **kwargs):
        print(f"设置标题: '{text}'")
    
    def xlabel(self, text, **kwargs):
        print(f"设置X轴标签: '{text}'")
    
    def ylabel(self, text, **kwargs):
        print(f"设置Y轴标签: '{text}'")
    
    def legend(self, labels=None, **kwargs):
        print(f"添加图例: {labels if labels else '自动'}")
    
    def grid(self, visible=True, **kwargs):
        print(f"{'显示' if visible else '隐藏'}网格")
    
    def show(self):
        print("显示图表\\n" + "="*40)
    
    def _format_style(self, kwargs):
        style_parts = []
        if 'color' in kwargs:
            style_parts.append(f"颜色:{kwargs['color']}")
        if 'linewidth' in kwargs:
            style_parts.append(f"线宽:{kwargs['linewidth']}")
        if 'marker' in kwargs:
            style_parts.append(f"标记:{kwargs['marker']}")
        return f"({', '.join(style_parts)})" if style_parts else ""

# 使用模拟的matplotlib
plt = MockPlot()

def create_sales_analysis():
    """销售数据分析可视化"""
    print("=== 销售数据分析 ===")
    
    # 模拟销售数据
    months = ['1月', '2月', '3月', '4月', '5月', '6月']
    sales = [120, 135, 148, 162, 155, 178]
    profit = [25, 30, 35, 40, 38, 45]
    
    # 创建销售趋势图
    plt.figure(figsize=(12, 8))
    plt.plot(months, sales, color='blue', linewidth=2, marker='o')
    plt.title('月度销售趋势')
    plt.xlabel('月份')
    plt.ylabel('销售额 (万元)')
    plt.grid(True)
    plt.show()
    
    # 创建利润对比图
    plt.bar(months, profit, color='green', alpha=0.7)
    plt.title('月度利润对比')
    plt.xlabel('月份')
    plt.ylabel('利润 (万元)')
    plt.show()

def create_student_performance():
    """学生成绩分析可视化"""
    print("=== 学生成绩分析 ===")
    
    # 模拟成绩数据
    subjects = ['数学', '语文', '英语', '物理', '化学']
    class_a = [85, 78, 92, 88, 82]
    class_b = [82, 85, 88, 85, 86]
    
    # 成绩对比图
    x_pos = list(range(len(subjects)))
    
    plt.figure(figsize=(10, 6))
    plt.bar([x - 0.2 for x in x_pos], class_a, width=0.4, label='A班', color='skyblue')
    plt.bar([x + 0.2 for x in x_pos], class_b, width=0.4, label='B班', color='lightcoral')
    plt.title('两班成绩对比')
    plt.xlabel('科目')
    plt.ylabel('平均分')
    plt.legend()
    plt.show()
    
    # 成绩分布饼图
    grade_distribution = [15, 25, 35, 20, 5]  # 优秀、良好、中等、及格、不及格
    grade_labels = ['优秀(90+)', '良好(80-89)', '中等(70-79)', '及格(60-69)', '不及格(<60)']
    
    plt.pie(grade_distribution, labels=grade_labels, autopct='%1.1f%%')
    plt.title('成绩分布情况')
    plt.show()

def create_weather_analysis():
    """天气数据分析可视化"""
    print("=== 天气数据分析 ===")
    
    # 模拟一周天气数据
    days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    temperature = [22, 25, 28, 26, 24, 27, 29]
    humidity = [65, 70, 68, 72, 75, 69, 66]
    
    # 温度变化图
    plt.figure(figsize=(10, 6))
    plt.plot(days, temperature, color='red', linewidth=3, marker='s')
    plt.title('一周温度变化')
    plt.xlabel('日期')
    plt.ylabel('温度 (°C)')
    plt.grid(True, alpha=0.3)
    plt.show()
    
    # 温度与湿度散点图
    plt.scatter(temperature, humidity, color='purple', s=100, alpha=0.7)
    plt.title('温度与湿度关系')
    plt.xlabel('温度 (°C)')
    plt.ylabel('湿度 (%)')
    plt.grid(True, alpha=0.3)
    plt.show()

def create_mathematical_functions():
    """数学函数可视化"""
    print("=== 数学函数可视化 ===")
    
    # 生成x值
    x = [i * 0.1 for i in range(-50, 51)]  # -5 到 5，步长0.1
    
    # 计算不同函数的y值
    y_linear = [2 * xi + 1 for xi in x]
    y_quadratic = [xi ** 2 for xi in x]
    y_sine = [math.sin(xi) for xi in x]
    y_cosine = [math.cos(xi) for xi in x]
    
    # 线性函数
    plt.figure(figsize=(12, 8))
    plt.plot(x, y_linear, color='blue', linewidth=2, label='y = 2x + 1')
    plt.title('线性函数')
    plt.xlabel('x')
    plt.ylabel('y')
    plt.legend()
    plt.grid(True)
    plt.show()
    
    # 二次函数
    plt.plot(x, y_quadratic, color='green', linewidth=2, label='y = x²')
    plt.title('二次函数')
    plt.xlabel('x')
    plt.ylabel('y')
    plt.legend()
    plt.grid(True)
    plt.show()
    
    # 三角函数
    plt.plot(x, y_sine, color='red', linewidth=2, label='y = sin(x)')
    plt.plot(x, y_cosine, color='orange', linewidth=2, label='y = cos(x)')
    plt.title('三角函数')
    plt.xlabel('x')
    plt.ylabel('y')
    plt.legend()
    plt.grid(True)
    plt.show()

# 执行所有可视化示例
create_sales_analysis()
create_student_performance()
create_weather_analysis()
create_mathematical_functions()

print("=== 数据可视化最佳实践 ===")
print("1. 选择合适的图表类型")
print("2. 使用清晰的标题和标签")
print("3. 选择合适的颜色和样式")
print("4. 添加图例和网格线")
print("5. 保持图表简洁明了")`,
          order: 1,
          completed: false
        }
      ]
    };
  }
}
