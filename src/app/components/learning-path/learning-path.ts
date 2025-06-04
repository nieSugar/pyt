import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { Course, UserProgress, Lesson } from '../../models/course.model';

interface LearningPathItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites: string[];
  skills: string[];
  completed: boolean;
  current: boolean;
  locked: boolean;
  progress: number;
  lessonId?: string;
}

@Component({
  selector: 'app-learning-path',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    RouterModule
  ],
  template: `
    <mat-card class="learning-path-card">
      <mat-card-header>
        <mat-card-title>
          <mat-icon>route</mat-icon>
          推荐学习路径
        </mat-card-title>
        <mat-card-subtitle>
          基于您的学习进度智能推荐
        </mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="path-container">
          <div 
            *ngFor="let item of learningPath; let i = index"
            class="path-item"
            [class.completed]="item.completed"
            [class.current]="item.current"
            [class.locked]="item.locked">
            
            <!-- 连接线 -->
            <div class="path-connector" *ngIf="i < learningPath.length - 1">
              <div class="connector-line" [class.completed]="item.completed"></div>
            </div>
            
            <!-- 路径节点 -->
            <div class="path-node">
              <div class="node-icon">
                <mat-icon *ngIf="item.completed">check_circle</mat-icon>
                <mat-icon *ngIf="item.current && !item.completed">play_circle</mat-icon>
                <mat-icon *ngIf="item.locked">lock</mat-icon>
                <mat-icon *ngIf="!item.completed && !item.current && !item.locked">radio_button_unchecked</mat-icon>
              </div>
              
              <div class="node-content">
                <div class="node-header">
                  <h4 class="node-title">{{ item.title }}</h4>
                  <div class="node-meta">
                    <mat-chip-set>
                      <mat-chip [class]="'difficulty-' + item.difficulty">
                        {{ getDifficultyLabel(item.difficulty) }}
                      </mat-chip>
                      <mat-chip class="time-chip">
                        <mat-icon>schedule</mat-icon>
                        {{ item.estimatedTime }}
                      </mat-chip>
                    </mat-chip-set>
                  </div>
                </div>
                
                <p class="node-description">{{ item.description }}</p>
                
                <!-- 进度条 -->
                <div class="progress-section" *ngIf="!item.locked && item.progress > 0">
                  <mat-progress-bar 
                    mode="determinate" 
                    [value]="item.progress"
                    class="path-progress">
                  </mat-progress-bar>
                  <span class="progress-text">{{ item.progress }}% 完成</span>
                </div>
                
                <!-- 技能标签 -->
                <div class="skills-section" *ngIf="item.skills.length > 0">
                  <span class="skills-label">将学到：</span>
                  <mat-chip-set class="skills-chips">
                    <mat-chip *ngFor="let skill of item.skills" class="skill-chip">
                      {{ skill }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
                
                <!-- 前置条件 -->
                <div class="prerequisites-section" *ngIf="item.prerequisites.length > 0 && item.locked">
                  <span class="prerequisites-label">需要先完成：</span>
                  <div class="prerequisites-list">
                    <span *ngFor="let prereq of item.prerequisites" class="prerequisite-item">
                      {{ prereq }}
                    </span>
                  </div>
                </div>
                
                <!-- 操作按钮 -->
                <div class="node-actions">
                  <button 
                    *ngIf="!item.locked && !item.completed"
                    mat-raised-button 
                    [color]="item.current ? 'primary' : 'accent'"
                    [routerLink]="item.lessonId ? ['/lesson', item.lessonId] : null"
                    class="action-btn">
                    <mat-icon>{{ item.current ? 'play_arrow' : 'start' }}</mat-icon>
                    {{ item.current ? '继续学习' : '开始学习' }}
                  </button>
                  
                  <button 
                    *ngIf="item.completed"
                    mat-stroked-button 
                    color="primary"
                    [routerLink]="item.lessonId ? ['/lesson', item.lessonId] : null"
                    class="action-btn">
                    <mat-icon>replay</mat-icon>
                    复习
                  </button>
                  
                  <button 
                    *ngIf="item.locked"
                    mat-stroked-button 
                    disabled
                    class="action-btn">
                    <mat-icon>lock</mat-icon>
                    暂未解锁
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 学习建议 -->
        <div class="learning-suggestions" *ngIf="suggestions.length > 0">
          <h4 class="suggestions-title">
            <mat-icon>lightbulb</mat-icon>
            学习建议
          </h4>
          <ul class="suggestions-list">
            <li *ngFor="let suggestion of suggestions" class="suggestion-item">
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './learning-path.scss'
})
export class LearningPathComponent implements OnInit {
  @Input() course: Course | null = null;
  @Input() userProgress: UserProgress | null = null;

  learningPath: LearningPathItem[] = [];
  suggestions: string[] = [];

  ngOnInit(): void {
    this.generateLearningPath();
    this.generateSuggestions();
  }

  private generateLearningPath(): void {
    if (!this.course) return;

    const allLessons = this.course.modules.flatMap(module => module.lessons);
    const completedLessons = this.userProgress?.completedLessons || [];
    const currentLesson = this.userProgress?.currentLesson;

    this.learningPath = allLessons.map((lesson, index) => {
      const isCompleted = completedLessons.includes(lesson.id);
      const isCurrent = lesson.id === currentLesson;
      const isLocked = index > 0 && !completedLessons.includes(allLessons[index - 1].id) && !isCurrent;
      
      // 计算进度
      let progress = 0;
      if (isCompleted) {
        progress = 100;
      } else if (isCurrent) {
        progress = 50; // 假设当前课程进度为50%
      }

      return {
        id: lesson.id,
        title: lesson.title,
        description: this.generateDescription(lesson),
        difficulty: this.getDifficultyFromOrder(index),
        estimatedTime: this.getEstimatedTime(lesson),
        prerequisites: this.getPrerequisites(lesson, allLessons, index),
        skills: this.getSkills(lesson),
        completed: isCompleted,
        current: isCurrent,
        locked: isLocked,
        progress: progress,
        lessonId: lesson.id
      };
    });
  }

  private generateDescription(lesson: Lesson): string {
    const descriptions: { [key: string]: string } = {
      'variables': '学习Python变量的定义和使用，掌握基本数据类型',
      'strings': '掌握字符串操作技巧，学会文本处理方法',
      'numbers': '学习数字运算和数学函数的应用',
      'input-output': '掌握用户输入和格式化输出的方法',
      'conditionals': '学习条件判断语句，掌握程序逻辑控制',
      'loops': '掌握循环语句的使用，提高编程效率',
      'lists': '学习列表数据结构，掌握数据管理技巧',
      'dictionaries': '掌握字典的使用，学会键值对数据处理',
      'functions': '学习函数的定义和调用，提高代码复用性'
    };
    
    return descriptions[lesson.id] || '深入学习Python编程概念和实践技巧';
  }

  private getDifficultyFromOrder(index: number): 'beginner' | 'intermediate' | 'advanced' {
    if (index < 4) return 'beginner';
    if (index < 7) return 'intermediate';
    return 'advanced';
  }

  private getEstimatedTime(lesson: Lesson): string {
    const times: { [key: string]: string } = {
      'variables': '45分钟',
      'strings': '60分钟',
      'numbers': '50分钟',
      'input-output': '40分钟',
      'conditionals': '70分钟',
      'loops': '80分钟',
      'lists': '90分钟',
      'dictionaries': '85分钟',
      'functions': '100分钟'
    };
    
    return times[lesson.id] || '60分钟';
  }

  private getPrerequisites(lesson: Lesson, allLessons: Lesson[], index: number): string[] {
    if (index === 0) return [];
    return [allLessons[index - 1].title];
  }

  private getSkills(lesson: Lesson): string[] {
    const skills: { [key: string]: string[] } = {
      'variables': ['变量定义', '数据类型', '类型转换'],
      'strings': ['字符串操作', '格式化', '正则表达式'],
      'numbers': ['数学运算', '数学函数', '随机数'],
      'input-output': ['用户交互', '文件读写', '格式化输出'],
      'conditionals': ['逻辑判断', '条件表达式', '布尔运算'],
      'loops': ['循环控制', '迭代器', '列表推导'],
      'lists': ['数据结构', '列表操作', '排序算法'],
      'dictionaries': ['键值对', '数据映射', 'JSON处理'],
      'functions': ['函数设计', '参数传递', '作用域']
    };
    
    return skills[lesson.id] || ['Python编程'];
  }

  private generateSuggestions(): void {
    if (!this.userProgress) return;

    const completedCount = this.userProgress.completedLessons.length;
    const totalCount = this.course?.totalLessons || 0;
    const completionRate = (completedCount / totalCount) * 100;

    this.suggestions = [];

    if (completionRate < 25) {
      this.suggestions.push('建议每天学习30-45分钟，保持学习连续性');
      this.suggestions.push('重点掌握基础概念，多做练习题巩固知识');
    } else if (completionRate < 50) {
      this.suggestions.push('可以开始尝试编写小程序来应用所学知识');
      this.suggestions.push('建议复习之前的内容，确保基础扎实');
    } else if (completionRate < 75) {
      this.suggestions.push('开始学习更复杂的编程概念和数据结构');
      this.suggestions.push('可以参与一些编程挑战来提高技能');
    } else {
      this.suggestions.push('恭喜！您已经掌握了Python基础知识');
      this.suggestions.push('建议开始学习Python的高级特性和实际项目开发');
    }
  }

  getDifficultyLabel(difficulty: string): string {
    const labels: { [key: string]: string } = {
      'beginner': '初级',
      'intermediate': '中级',
      'advanced': '高级'
    };
    return labels[difficulty] || difficulty;
  }
}
