import { Injectable } from '@angular/core';
import { Module } from '../../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class WebScrapingModule {

  getModule(): Module {
    return {
      id: 'web-scraping',
      title: 'Web爬虫基础',
      description: '学习网页数据抓取和处理',
      order: 9,
      lessons: [
        {
          id: 'requests-basics',
          title: 'HTTP请求基础',
          type: 'tutorial',
          content: `
# Python Web爬虫基础

学习如何使用Python获取和处理网页数据。

## requests库简介
requests是Python中最流行的HTTP库，用于发送HTTP请求。

\`\`\`python
import requests

# 发送GET请求
response = requests.get('https://httpbin.org/get')
print(f"状态码: {response.status_code}")
print(f"响应内容: {response.text}")

# 发送POST请求
data = {'key': 'value'}
response = requests.post('https://httpbin.org/post', data=data)
print(response.json())
\`\`\`

## 处理响应
\`\`\`python
import requests

url = 'https://api.github.com/users/octocat'
response = requests.get(url)

if response.status_code == 200:
    user_data = response.json()
    print(f"用户名: {user_data['login']}")
    print(f"公开仓库: {user_data['public_repos']}")
else:
    print(f"请求失败: {response.status_code}")
\`\`\`

## 添加请求头
\`\`\`python
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

response = requests.get('https://httpbin.org/headers', headers=headers)
print(response.json())
\`\`\`

## 处理异常
\`\`\`python
import requests
from requests.exceptions import RequestException, Timeout, ConnectionError

try:
    response = requests.get('https://httpbin.org/get', timeout=5)
    response.raise_for_status()  # 如果状态码不是200会抛出异常
    print("请求成功")
except Timeout:
    print("请求超时")
except ConnectionError:
    print("连接错误")
except RequestException as e:
    print(f"请求异常: {e}")
\`\`\`
          `,
          codeExample: `# HTTP请求实战练习
import json
from datetime import datetime

# 模拟requests库的功能
class MockResponse:
    def __init__(self, status_code, data):
        self.status_code = status_code
        self._data = data
        self.text = json.dumps(data) if isinstance(data, dict) else str(data)
    
    def json(self):
        return self._data
    
    def raise_for_status(self):
        if self.status_code >= 400:
            raise Exception(f"HTTP {self.status_code} Error")

class MockRequests:
    @staticmethod
    def get(url, headers=None, timeout=None):
        # 模拟不同的API响应
        if 'weather' in url:
            return MockResponse(200, {
                'city': '北京',
                'temperature': 22,
                'description': '晴天',
                'humidity': 45,
                'timestamp': datetime.now().isoformat()
            })
        elif 'news' in url:
            return MockResponse(200, {
                'articles': [
                    {'title': 'Python 3.12 发布', 'author': '技术新闻', 'date': '2024-01-01'},
                    {'title': 'AI技术新突破', 'author': '科技日报', 'date': '2024-01-02'},
                    {'title': 'Web开发趋势', 'author': '开发者周刊', 'date': '2024-01-03'}
                ]
            })
        elif 'user' in url:
            return MockResponse(200, {
                'id': 123,
                'username': 'pythonuser',
                'email': 'user@example.com',
                'profile': {
                    'name': '张三',
                    'bio': 'Python开发者',
                    'location': '北京'
                }
            })
        else:
            return MockResponse(404, {'error': 'Not Found'})

# 使用模拟的requests库
requests = MockRequests()

def fetch_weather_data():
    """获取天气数据"""
    print("=== 获取天气信息 ===")
    try:
        response = requests.get('https://api.weather.com/current')
        response.raise_for_status()
        
        weather = response.json()
        print(f"城市: {weather['city']}")
        print(f"温度: {weather['temperature']}°C")
        print(f"天气: {weather['description']}")
        print(f"湿度: {weather['humidity']}%")
        
    except Exception as e:
        print(f"获取天气数据失败: {e}")

def fetch_news_data():
    """获取新闻数据"""
    print("\\n=== 获取新闻信息 ===")
    try:
        response = requests.get('https://api.news.com/latest')
        response.raise_for_status()
        
        news_data = response.json()
        print("最新新闻:")
        for i, article in enumerate(news_data['articles'], 1):
            print(f"{i}. {article['title']}")
            print(f"   作者: {article['author']} | 日期: {article['date']}")
        
    except Exception as e:
        print(f"获取新闻数据失败: {e}")

def fetch_user_profile():
    """获取用户信息"""
    print("\\n=== 获取用户信息 ===")
    try:
        response = requests.get('https://api.example.com/user/123')
        response.raise_for_status()
        
        user = response.json()
        profile = user['profile']
        
        print(f"用户ID: {user['id']}")
        print(f"用户名: {user['username']}")
        print(f"邮箱: {user['email']}")
        print(f"姓名: {profile['name']}")
        print(f"简介: {profile['bio']}")
        print(f"位置: {profile['location']}")
        
    except Exception as e:
        print(f"获取用户信息失败: {e}")

# 执行所有数据获取任务
fetch_weather_data()
fetch_news_data()
fetch_user_profile()

print("\\n=== HTTP请求最佳实践 ===")
print("1. 总是检查响应状态码")
print("2. 使用适当的请求头")
print("3. 设置合理的超时时间")
print("4. 处理可能的异常")
print("5. 遵守网站的robots.txt和使用条款")`,
          order: 1,
          completed: false
        },
        {
          id: 'html-parsing',
          title: 'HTML解析',
          type: 'tutorial',
          content: `
# HTML解析与数据提取

学习如何解析HTML文档并提取有用信息。

## BeautifulSoup简介
BeautifulSoup是Python中最流行的HTML解析库。

\`\`\`python
from bs4 import BeautifulSoup
import requests

# 获取网页内容
response = requests.get('https://example.com')
soup = BeautifulSoup(response.text, 'html.parser')

# 查找元素
title = soup.find('title').text
print(f"页面标题: {title}")
\`\`\`

## 选择器使用
\`\`\`python
# 通过标签名查找
titles = soup.find_all('h1')

# 通过CSS类查找
articles = soup.find_all('div', class_='article')

# 通过ID查找
header = soup.find('div', id='header')

# 使用CSS选择器
links = soup.select('a[href]')
\`\`\`

## 提取数据
\`\`\`python
# 提取文本
text = element.get_text()

# 提取属性
href = link.get('href')
src = img.get('src')

# 提取所有链接
for link in soup.find_all('a'):
    url = link.get('href')
    text = link.get_text()
    print(f"{text}: {url}")
\`\`\`

## 处理表格数据
\`\`\`python
table = soup.find('table')
rows = table.find_all('tr')

for row in rows:
    cells = row.find_all(['td', 'th'])
    row_data = [cell.get_text().strip() for cell in cells]
    print(row_data)
\`\`\`
          `,
          codeExample: `# HTML解析实战练习
import re

# 模拟HTML内容
html_content = """
<!DOCTYPE html>
<html>
<head>
    <title>Python学习资源</title>
</head>
<body>
    <div id="header">
        <h1>Python学习网站</h1>
        <nav>
            <a href="/tutorials">教程</a>
            <a href="/examples">示例</a>
            <a href="/exercises">练习</a>
        </nav>
    </div>
    
    <div class="content">
        <article class="tutorial">
            <h2>Python基础教程</h2>
            <p class="description">学习Python编程的基础知识</p>
            <div class="meta">
                <span class="author">作者: 张三</span>
                <span class="date">2024-01-01</span>
                <span class="difficulty">难度: 初级</span>
            </div>
            <a href="/tutorial/python-basics" class="read-more">阅读更多</a>
        </article>
        
        <article class="tutorial">
            <h2>Web爬虫入门</h2>
            <p class="description">使用Python进行网页数据抓取</p>
            <div class="meta">
                <span class="author">作者: 李四</span>
                <span class="date">2024-01-02</span>
                <span class="difficulty">难度: 中级</span>
            </div>
            <a href="/tutorial/web-scraping" class="read-more">阅读更多</a>
        </article>
        
        <table id="course-table">
            <tr>
                <th>课程名称</th>
                <th>时长</th>
                <th>价格</th>
                <th>评分</th>
            </tr>
            <tr>
                <td>Python基础</td>
                <td>20小时</td>
                <td>免费</td>
                <td>4.8</td>
            </tr>
            <tr>
                <td>数据分析</td>
                <td>30小时</td>
                <td>¥299</td>
                <td>4.9</td>
            </tr>
            <tr>
                <td>机器学习</td>
                <td>50小时</td>
                <td>¥599</td>
                <td>4.7</td>
            </tr>
        </table>
    </div>
    
    <footer>
        <p>© 2024 Python学习网站</p>
        <div class="social-links">
            <a href="https://github.com/example">GitHub</a>
            <a href="https://twitter.com/example">Twitter</a>
        </div>
    </footer>
</body>
</html>
"""

# 简化的HTML解析器类
class SimpleHTMLParser:
    def __init__(self, html):
        self.html = html
    
    def find_title(self):
        """提取页面标题"""
        match = re.search(r'<title>(.*?)</title>', self.html)
        return match.group(1) if match else None
    
    def find_all_links(self):
        """提取所有链接"""
        pattern = r'<a[^>]*href=["\']([^"\']*)["\'][^>]*>(.*?)</a>'
        matches = re.findall(pattern, self.html, re.DOTALL)
        return [(url, re.sub(r'<[^>]+>', '', text).strip()) for url, text in matches]
    
    def find_articles(self):
        """提取文章信息"""
        articles = []
        article_pattern = r'<article class="tutorial">(.*?)</article>'
        article_matches = re.findall(article_pattern, self.html, re.DOTALL)
        
        for article_html in article_matches:
            # 提取标题
            title_match = re.search(r'<h2>(.*?)</h2>', article_html)
            title = title_match.group(1) if title_match else "无标题"
            
            # 提取描述
            desc_match = re.search(r'<p class="description">(.*?)</p>', article_html)
            description = desc_match.group(1) if desc_match else "无描述"
            
            # 提取作者
            author_match = re.search(r'<span class="author">作者: (.*?)</span>', article_html)
            author = author_match.group(1) if author_match else "未知"
            
            # 提取日期
            date_match = re.search(r'<span class="date">(.*?)</span>', article_html)
            date = date_match.group(1) if date_match else "未知"
            
            # 提取难度
            difficulty_match = re.search(r'<span class="difficulty">难度: (.*?)</span>', article_html)
            difficulty = difficulty_match.group(1) if difficulty_match else "未知"
            
            articles.append({
                'title': title,
                'description': description,
                'author': author,
                'date': date,
                'difficulty': difficulty
            })
        
        return articles
    
    def find_table_data(self):
        """提取表格数据"""
        table_pattern = r'<table id="course-table">(.*?)</table>'
        table_match = re.search(table_pattern, self.html, re.DOTALL)
        
        if not table_match:
            return []
        
        table_html = table_match.group(1)
        row_pattern = r'<tr>(.*?)</tr>'
        rows = re.findall(row_pattern, table_html, re.DOTALL)
        
        table_data = []
        for row in rows:
            cell_pattern = r'<t[hd]>(.*?)</t[hd]>'
            cells = re.findall(cell_pattern, row)
            if cells:
                table_data.append([cell.strip() for cell in cells])
        
        return table_data

# 使用HTML解析器
parser = SimpleHTMLParser(html_content)

print("=== HTML解析演示 ===")

# 提取页面标题
title = parser.find_title()
print(f"页面标题: {title}")

# 提取所有链接
print("\\n所有链接:")
links = parser.find_all_links()
for url, text in links:
    print(f"  {text} -> {url}")

# 提取文章信息
print("\\n文章列表:")
articles = parser.find_articles()
for i, article in enumerate(articles, 1):
    print(f"{i}. {article['title']}")
    print(f"   描述: {article['description']}")
    print(f"   作者: {article['author']} | 日期: {article['date']} | 难度: {article['difficulty']}")

# 提取表格数据
print("\\n课程表格:")
table_data = parser.find_table_data()
for row in table_data:
    print(f"  {' | '.join(row)}")

print("\\n=== HTML解析技巧 ===")
print("1. 使用合适的解析器 (html.parser, lxml, html5lib)")
print("2. 优先使用CSS选择器或XPath")
print("3. 处理动态内容时考虑使用Selenium")
print("4. 注意字符编码问题")
print("5. 清理和验证提取的数据")`,
          order: 2,
          completed: false
        }
      ]
    };
  }
}
