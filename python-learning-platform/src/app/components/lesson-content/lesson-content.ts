import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { Lesson } from '../../models/course.model';

@Component({
  selector: 'app-lesson-content',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  templateUrl: './lesson-content.html',
  styleUrl: './lesson-content.scss'
})
export class LessonContent {
  @Input() lesson: Lesson | null = null;

  // 简单的Markdown渲染 - 将来可以用专门的库替换
  renderMarkdown(content: string): string {
    if (!content) return '';

    return content
      // 标题
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // 代码块
      .replace(/```python\n([\s\S]*?)\n```/g, '<pre class="code-block"><code>$1</code></pre>')
      .replace(/```\n([\s\S]*?)\n```/g, '<pre class="code-block"><code>$1</code></pre>')
      // 行内代码
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // 粗体
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // 斜体
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // 换行
      .replace(/\n/g, '<br>');
  }
}
