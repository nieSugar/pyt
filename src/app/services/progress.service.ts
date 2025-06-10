import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProgress } from '../models/course.model';
import { StorageService } from './storage.service';

export interface OverallProgress {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private userProgressSubject = new BehaviorSubject<UserProgress | null>(null);
  public userProgress$ = this.userProgressSubject.asObservable();

  private totalLessonsSubject = new BehaviorSubject<number>(0);

  // 总体进度Observable
  public overallProgress$: Observable<OverallProgress> = this.userProgress$.pipe(
    map(progress => {
      const completedLessons = progress?.completedLessons.length || 0;
      const totalLessons = this.totalLessonsSubject.value;
      const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      return {
        completedLessons,
        totalLessons,
        percentage
      };
    })
  );

  constructor(private storageService: StorageService) {
    this.loadUserProgress();
  }

  /**
   * 获取用户进度
   */
  getUserProgress(): Observable<UserProgress | null> {
    return this.userProgress$;
  }

  /**
   * 获取当前用户进度值
   */
  getCurrentProgress(): UserProgress | null {
    return this.userProgressSubject.value;
  }

  /**
   * 标记课程完成
   */
  markLessonCompleted(lessonId: string): void {
    const progress = this.userProgressSubject.value;
    if (progress && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.lastAccessed = new Date();
      this.updateProgress(progress);
    }
  }

  /**
   * 设置当前课程
   */
  setCurrentLesson(lessonId: string): void {
    const progress = this.userProgressSubject.value;
    if (progress) {
      progress.currentLesson = lessonId;
      progress.lastAccessed = new Date();
      this.updateProgress(progress);
    }
  }

  /**
   * 更新学习时间
   */
  updateTimeSpent(additionalTime: number): void {
    const progress = this.userProgressSubject.value;
    if (progress) {
      progress.timeSpent += additionalTime;
      progress.lastAccessed = new Date();
      this.updateProgress(progress);
    }
  }

  /**
   * 更新分数
   */
  updateScore(newScore: number): void {
    const progress = this.userProgressSubject.value;
    if (progress) {
      progress.score = Math.max(progress.score, newScore);
      progress.lastAccessed = new Date();
      this.updateProgress(progress);
    }
  }

  /**
   * 重置进度
   */
  resetProgress(): void {
    const defaultProgress = this.createDefaultProgress();
    this.updateProgress(defaultProgress);
  }

  /**
   * 加载用户进度
   */
  private loadUserProgress(): void {
    const savedProgress = this.storageService.getUserProgress();
    if (savedProgress) {
      this.userProgressSubject.next(savedProgress);
    } else {
      const defaultProgress = this.createDefaultProgress();
      this.userProgressSubject.next(defaultProgress);
    }
  }

  /**
   * 更新进度并保存
   */
  private updateProgress(progress: UserProgress): void {
    this.userProgressSubject.next(progress);
    this.storageService.saveUserProgress(progress);
  }

  /**
   * 创建默认进度
   */
  private createDefaultProgress(): UserProgress {
    return {
      userId: 'default-user',
      courseId: 'python-basics',
      completedLessons: [],
      currentLesson: 'variables',
      score: 0,
      timeSpent: 0,
      lastAccessed: new Date()
    };
  }

  /**
   * 检查课程是否完成
   */
  isLessonCompleted(lessonId: string): boolean {
    const progress = this.userProgressSubject.value;
    return progress?.completedLessons.includes(lessonId) || false;
  }

  /**
   * 获取完成百分比
   */
  getCompletionPercentage(totalLessons: number): number {
    const progress = this.userProgressSubject.value;
    if (!progress || totalLessons === 0) return 0;
    return (progress.completedLessons.length / totalLessons) * 100;
  }

  /**
   * 设置总课程数
   */
  setTotalLessons(total: number): void {
    this.totalLessonsSubject.next(total);
  }

  /**
   * 获取总课程数
   */
  getTotalLessons(): number {
    return this.totalLessonsSubject.value;
  }
}
