import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course, Module, Lesson } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentLessonSubject = new BehaviorSubject<Lesson | null>(null);
  public currentLesson$ = this.currentLessonSubject.asObservable();

  // 侧边栏状态管理
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  public sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  /**
   * 获取当前课程
   */
  getCurrentLesson(): Observable<Lesson | null> {
    return this.currentLesson$;
  }

  /**
   * 获取当前课程值
   */
  getCurrentLessonValue(): Lesson | null {
    return this.currentLessonSubject.value;
  }

  /**
   * 设置当前课程
   */
  setCurrentLesson(lesson: Lesson | null): void {
    this.currentLessonSubject.next(lesson);
  }

  /**
   * 根据ID查找课程
   */
  findLessonById(course: Course, lessonId: string): Lesson | null {
    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return lesson;
      }
    }
    return null;
  }

  /**
   * 获取下一个课程
   */
  getNextLesson(course: Course, currentLessonId: string): Lesson | null {
    let found = false;
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (found) {
          return lesson;
        }
        if (lesson.id === currentLessonId) {
          found = true;
        }
      }
    }
    return null;
  }

  /**
   * 获取上一个课程
   */
  getPreviousLesson(course: Course, currentLessonId: string): Lesson | null {
    let previousLesson: Lesson | null = null;
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === currentLessonId) {
          return previousLesson;
        }
        previousLesson = lesson;
      }
    }
    return null;
  }

  /**
   * 获取模块中的第一个课程
   */
  getFirstLessonInModule(module: Module): Lesson | null {
    return module.lessons.length > 0 ? module.lessons[0] : null;
  }

  /**
   * 获取模块中的最后一个课程
   */
  getLastLessonInModule(module: Module): Lesson | null {
    return module.lessons.length > 0 ? module.lessons[module.lessons.length - 1] : null;
  }

  /**
   * 获取课程所属的模块
   */
  getLessonModule(course: Course, lessonId: string): Module | null {
    for (const module of course.modules) {
      if (module.lessons.some(lesson => lesson.id === lessonId)) {
        return module;
      }
    }
    return null;
  }

  /**
   * 获取课程在模块中的位置
   */
  getLessonPosition(module: Module, lessonId: string): number {
    return module.lessons.findIndex(lesson => lesson.id === lessonId);
  }

  /**
   * 检查是否是模块的第一个课程
   */
  isFirstLessonInModule(module: Module, lessonId: string): boolean {
    return module.lessons.length > 0 && module.lessons[0].id === lessonId;
  }

  /**
   * 检查是否是模块的最后一个课程
   */
  isLastLessonInModule(module: Module, lessonId: string): boolean {
    const lastIndex = module.lessons.length - 1;
    return lastIndex >= 0 && module.lessons[lastIndex].id === lessonId;
  }

  /**
   * 获取课程路径（面包屑导航）
   */
  getLessonPath(course: Course, lessonId: string): { module: Module; lesson: Lesson } | null {
    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return { module, lesson };
      }
    }
    return null;
  }

  /**
   * 获取推荐的下一步课程
   */
  getRecommendedLessons(course: Course, completedLessons: string[], limit: number = 3): Lesson[] {
    const recommended: Lesson[] = [];
    
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!completedLessons.includes(lesson.id)) {
          recommended.push(lesson);
          if (recommended.length >= limit) {
            return recommended;
          }
        }
      }
    }
    
    return recommended;
  }

  /**
   * 计算课程总数
   */
  getTotalLessonsCount(course: Course): number {
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
  }

  /**
   * 获取模块进度
   */
  getModuleProgress(module: Module, completedLessons: string[]): number {
    if (module.lessons.length === 0) return 0;

    const completedCount = module.lessons.filter(lesson =>
      completedLessons.includes(lesson.id)
    ).length;

    return (completedCount / module.lessons.length) * 100;
  }

  // 侧边栏控制方法
  /**
   * 打开侧边栏
   */
  openSidebar(): void {
    this.sidebarOpenSubject.next(true);
  }

  /**
   * 关闭侧边栏
   */
  closeSidebar(): void {
    this.sidebarOpenSubject.next(false);
  }

  /**
   * 切换侧边栏状态
   */
  toggleSidebar(): void {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  /**
   * 获取侧边栏状态
   */
  getSidebarState(): boolean {
    return this.sidebarOpenSubject.value;
  }
}
