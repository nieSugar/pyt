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
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course';
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
    MatTooltipModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit, OnDestroy {
  course: Course | null = null;
  currentLesson: Lesson | null = null;
  userProgress: UserProgress | null = null;

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
}
