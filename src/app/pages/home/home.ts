import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course';
import { Course, UserProgress } from '../../models/course.model';
import { ProgressChartComponent } from '../../components/progress-chart/progress-chart';
import { LearningPathComponent } from '../../components/learning-path/learning-path';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatGridListModule,
    ProgressChartComponent,
    LearningPathComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  course: Course | null = null;
  userProgress: UserProgress | null = null;

  private courseSubscription?: Subscription;
  private progressSubscription?: Subscription;

  // 学习统计数据
  stats = {
    totalLessons: 0,
    completedLessons: 0,
    currentStreak: 0,
    timeSpent: 0
  };

  // 推荐的下一步课程
  nextLessons: any[] = [];

  // 学习成就
  achievements = [
    { id: 'first-lesson', title: '初学者', description: '完成第一个课程', icon: 'school', unlocked: false },
    { id: 'week-streak', title: '坚持学习', description: '连续学习7天', icon: 'local_fire_department', unlocked: false },
    { id: 'code-master', title: '代码大师', description: '完成10个编程练习', icon: 'code', unlocked: false },
    { id: 'quiz-champion', title: '测验冠军', description: '完成所有测验', icon: 'quiz', unlocked: false }
  ];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseSubscription = this.courseService.getCourse().subscribe(
      course => {
        this.course = course;
        this.updateStats();
        this.updateNextLessons();
      }
    );

    this.progressSubscription = this.courseService.getUserProgress().subscribe(
      progress => {
        this.userProgress = progress;
        this.updateStats();
        this.updateAchievements();
      }
    );
  }

  ngOnDestroy(): void {
    this.courseSubscription?.unsubscribe();
    this.progressSubscription?.unsubscribe();
  }

  private updateStats(): void {
    if (!this.course || !this.userProgress) return;

    this.stats.totalLessons = this.course.modules.reduce((total, module) =>
      total + module.lessons.length, 0
    );

    this.stats.completedLessons = this.userProgress.completedLessons.length;
    this.stats.timeSpent = this.userProgress.timeSpent;
    this.stats.currentStreak = this.calculateStreak();
  }

  private updateNextLessons(): void {
    if (!this.course || !this.userProgress) return;

    this.nextLessons = [];

    for (const module of this.course.modules) {
      for (const lesson of module.lessons) {
        if (!this.userProgress.completedLessons.includes(lesson.id)) {
          this.nextLessons.push({
            ...lesson,
            moduleName: module.title
          });

          if (this.nextLessons.length >= 3) return;
        }
      }
    }
  }

  private updateAchievements(): void {
    if (!this.userProgress) return;

    // 更新成就解锁状态
    this.achievements[0].unlocked = this.userProgress.completedLessons.length > 0;
    this.achievements[1].unlocked = this.stats.currentStreak >= 7;
    this.achievements[2].unlocked = this.userProgress.completedLessons.length >= 10;
    this.achievements[3].unlocked = this.stats.completedLessons === this.stats.totalLessons;
  }

  private calculateStreak(): number {
    // 简化的连续学习天数计算
    const lastAccessed = new Date(this.userProgress?.lastAccessed || new Date());
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastAccessed.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 1 ? Math.min(this.userProgress?.completedLessons.length || 0, 30) : 0;
  }

  getProgressPercentage(): number {
    if (this.stats.totalLessons === 0) return 0;
    return (this.stats.completedLessons / this.stats.totalLessons) * 100;
  }

  startLearning(): void {
    if (this.nextLessons.length > 0) {
      this.courseService.setCurrentLesson(this.nextLessons[0].id);
    }
  }

  continueLearning(): void {
    if (this.userProgress?.currentLesson) {
      this.courseService.setCurrentLesson(this.userProgress.currentLesson);
    }
  }

  getLessonTypeIcon(type: string): string {
    switch (type) {
      case 'tutorial': return 'article';
      case 'exercise': return 'code';
      case 'quiz': return 'quiz';
      default: return 'description';
    }
  }
}
