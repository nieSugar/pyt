import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { Course, Module, Lesson, UserProgress } from '../../models/course.model';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit, OnDestroy {
  course: Course | null = null;
  currentLesson: Lesson | null = null;
  userProgress: UserProgress | null = null;
  allModulesExpanded: boolean = false;

  private courseSubscription?: Subscription;
  private lessonSubscription?: Subscription;
  private progressSubscription?: Subscription;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseSubscription = this.courseService.getCourse().subscribe(
      course => this.course = course
    );

    this.lessonSubscription = this.courseService.getCurrentLesson().subscribe(
      lesson => this.currentLesson = lesson
    );

    this.progressSubscription = this.courseService.getUserProgress().subscribe(
      progress => this.userProgress = progress
    );
  }

  ngOnDestroy(): void {
    this.courseSubscription?.unsubscribe();
    this.lessonSubscription?.unsubscribe();
    this.progressSubscription?.unsubscribe();
  }

  selectLesson(lessonId: string): void {
    this.courseService.setCurrentLesson(lessonId);
  }

  isLessonCompleted(lessonId: string): boolean {
    return this.userProgress?.completedLessons.includes(lessonId) || false;
  }

  isCurrentLesson(lessonId: string): boolean {
    return this.currentLesson?.id === lessonId;
  }

  getModuleProgress(module: Module): number {
    if (!this.userProgress) return 0;

    const completedCount = module.lessons.filter(lesson =>
      this.userProgress!.completedLessons.includes(lesson.id)
    ).length;

    return (completedCount / module.lessons.length) * 100;
  }

  getOverallProgress(): number {
    if (!this.course || !this.userProgress) return 0;

    const totalLessons = this.course.modules.reduce((total, module) =>
      total + module.lessons.length, 0
    );

    return (this.userProgress.completedLessons.length / totalLessons) * 100;
  }

  getLessonIcon(lesson: Lesson): string {
    switch (lesson.type) {
      case 'tutorial': return 'article';
      case 'exercise': return 'code';
      case 'quiz': return 'quiz';
      default: return 'description';
    }
  }

  getLessonStatusIcon(lessonId: string): string {
    if (this.isLessonCompleted(lessonId)) {
      return 'check_circle';
    } else if (this.isCurrentLesson(lessonId)) {
      return 'play_circle';
    } else {
      return 'radio_button_unchecked';
    }
  }

  /**
   * 获取难度颜色
   */
  getDifficultyColor(difficulty: string): 'primary' | 'accent' | 'warn' {
    switch (difficulty) {
      case 'beginner':
        return 'primary';
      case 'intermediate':
        return 'accent';
      case 'advanced':
        return 'warn';
      default:
        return 'primary';
    }
  }

  /**
   * 获取难度图标
   */
  getDifficultyIcon(difficulty: string): string {
    switch (difficulty) {
      case 'beginner':
        return 'star_border';
      case 'intermediate':
        return 'star_half';
      case 'advanced':
        return 'star';
      default:
        return 'star_border';
    }
  }

  /**
   * 获取难度文本
   */
  getDifficultyText(difficulty: string): string {
    switch (difficulty) {
      case 'beginner':
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return '初级';
    }
  }

  /**
   * 获取总课程数
   */
  getTotalLessons(): number {
    if (!this.course) return 0;
    return this.course.modules.reduce((total, module) => total + module.lessons.length, 0);
  }

  /**
   * 切换所有模块的展开状态
   */
  toggleAllModules(): void {
    this.allModulesExpanded = !this.allModulesExpanded;
  }

  /**
   * 判断模块是否应该展开
   */
  shouldModuleBeExpanded(module: Module, index: number): boolean {
    // 如果用户手动设置了全部展开/收起，则遵循该设置
    if (this.allModulesExpanded !== null) {
      return this.allModulesExpanded;
    }

    // 默认展开包含当前课程的模块和第一个模块
    return this.moduleHasCurrentLesson(module) || index === 0;
  }

  /**
   * 检查模块是否包含当前课程
   */
  moduleHasCurrentLesson(module: Module): boolean {
    if (!this.currentLesson) return false;
    return module.lessons.some(lesson => lesson.id === this.currentLesson!.id);
  }

  /**
   * 获取模块图标
   */
  getModuleIcon(module: Module): string {
    // 根据模块类型或内容返回不同图标
    const moduleTitle = module.title.toLowerCase();
    if (moduleTitle.includes('基础') || moduleTitle.includes('入门')) {
      return 'school';
    } else if (moduleTitle.includes('控制') || moduleTitle.includes('流程')) {
      return 'alt_route';
    } else if (moduleTitle.includes('数据') || moduleTitle.includes('结构')) {
      return 'storage';
    } else if (moduleTitle.includes('函数')) {
      return 'functions';
    } else if (moduleTitle.includes('异常') || moduleTitle.includes('错误')) {
      return 'error_outline';
    } else if (moduleTitle.includes('文件')) {
      return 'folder_open';
    } else if (moduleTitle.includes('面向对象') || moduleTitle.includes('类')) {
      return 'class';
    } else if (moduleTitle.includes('项目') || moduleTitle.includes('实战')) {
      return 'build';
    }
    return 'folder';
  }

  /**
   * 检查课程是否被锁定
   */
  isLessonLocked(lessonId: string): boolean {
    // 这里可以实现课程解锁逻辑
    // 例如：只有完成前一个课程才能解锁下一个
    return false;
  }
}
