import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, Module, Lesson, UserProgress } from '../models/course.model';
import { CourseRepository } from './course-repository';
import { ProgressService } from './progress.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private courseRepository: CourseRepository,
    private progressService: ProgressService,
    private navigationService: NavigationService
  ) {}

  // ==================== 课程相关方法 ====================

  /**
   * 获取默认课程
   */
  getCourse(): Observable<Course | null> {
    const course = this.courseRepository.getDefaultCourse();
    return new Observable(observer => {
      observer.next(course);
      observer.complete();
    });
  }

  /**
   * 根据ID获取课程
   */
  getCourseById(courseId: string): Course | null {
    return this.courseRepository.getCourseById(courseId);
  }

  /**
   * 获取所有可用课程
   */
  getAllCourses(): Course[] {
    return this.courseRepository.getAllCourses();
  }

  // ==================== 课程导航方法 ====================

  /**
   * 获取当前课程
   */
  getCurrentLesson(): Observable<Lesson | null> {
    return this.navigationService.getCurrentLesson();
  }

  /**
   * 设置当前课程
   */
  setCurrentLesson(lessonId: string): void {
    const course = this.courseRepository.getDefaultCourse();
    const lesson = this.navigationService.findLessonById(course, lessonId);
    
    if (lesson) {
      this.navigationService.setCurrentLesson(lesson);
      this.progressService.setCurrentLesson(lessonId);
    }
  }

  /**
   * 根据ID查找课程
   */
  findLessonById(lessonId: string): Lesson | null {
    const course = this.courseRepository.getDefaultCourse();
    return this.navigationService.findLessonById(course, lessonId);
  }

  /**
   * 获取下一个课程
   */
  getNextLesson(currentLessonId: string): Lesson | null {
    const course = this.courseRepository.getDefaultCourse();
    return this.navigationService.getNextLesson(course, currentLessonId);
  }

  /**
   * 获取上一个课程
   */
  getPreviousLesson(currentLessonId: string): Lesson | null {
    const course = this.courseRepository.getDefaultCourse();
    return this.navigationService.getPreviousLesson(course, currentLessonId);
  }

  // ==================== 进度相关方法 ====================

  /**
   * 获取用户进度
   */
  getUserProgress(): Observable<UserProgress | null> {
    return this.progressService.getUserProgress();
  }

  /**
   * 标记课程完成
   */
  markLessonCompleted(lessonId: string): void {
    this.progressService.markLessonCompleted(lessonId);
  }

  /**
   * 检查课程是否完成
   */
  isLessonCompleted(lessonId: string): boolean {
    return this.progressService.isLessonCompleted(lessonId);
  }

  /**
   * 获取完成百分比
   */
  getCompletionPercentage(): number {
    const course = this.courseRepository.getDefaultCourse();
    const totalLessons = this.navigationService.getTotalLessonsCount(course);
    return this.progressService.getCompletionPercentage(totalLessons);
  }

  /**
   * 重置进度
   */
  resetProgress(): void {
    this.progressService.resetProgress();
  }

  // ==================== 统计和分析方法 ====================

  /**
   * 获取推荐的下一步课程
   */
  getRecommendedLessons(limit: number = 3): Lesson[] {
    const course = this.courseRepository.getDefaultCourse();
    const progress = this.progressService.getCurrentProgress();
    const completedLessons = progress?.completedLessons || [];
    
    return this.navigationService.getRecommendedLessons(course, completedLessons, limit);
  }

  /**
   * 获取模块进度
   */
  getModuleProgress(moduleId: string): number {
    const course = this.courseRepository.getDefaultCourse();
    const module = course.modules.find(m => m.id === moduleId);
    const progress = this.progressService.getCurrentProgress();
    
    if (!module || !progress) return 0;
    
    return this.navigationService.getModuleProgress(module, progress.completedLessons);
  }

  /**
   * 获取课程路径（面包屑导航）
   */
  getLessonPath(lessonId: string): { module: Module; lesson: Lesson } | null {
    const course = this.courseRepository.getDefaultCourse();
    return this.navigationService.getLessonPath(course, lessonId);
  }

  // ==================== 实用方法 ====================

  /**
   * 更新学习时间
   */
  updateTimeSpent(additionalTime: number): void {
    this.progressService.updateTimeSpent(additionalTime);
  }

  /**
   * 更新分数
   */
  updateScore(newScore: number): void {
    this.progressService.updateScore(newScore);
  }
}
