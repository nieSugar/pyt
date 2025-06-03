import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course';
import { Lesson as LessonModel, Course, UserProgress } from '../../models/course.model';
import { LessonContent } from '../../components/lesson-content/lesson-content';
import { CodeEditorComponent } from '../../components/code-editor/code-editor';
import { EnhancedCodeBlockComponent } from '../../components/enhanced-code-block/enhanced-code-block';

@Component({
  selector: 'app-lesson',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    LessonContent,
    CodeEditorComponent,
    EnhancedCodeBlockComponent
  ],
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss'
})
export class Lesson implements OnInit, OnDestroy {
  currentLesson: LessonModel | null = null;
  course: Course | null = null;
  userProgress: UserProgress | null = null;

  private routeSubscription?: Subscription;
  private lessonSubscription?: Subscription;
  private courseSubscription?: Subscription;
  private progressSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // 订阅路由参数
    this.routeSubscription = this.route.params.subscribe(params => {
      const lessonId = params['id'];
      if (lessonId) {
        this.courseService.setCurrentLesson(lessonId);
      }
    });

    // 订阅当前课程
    this.lessonSubscription = this.courseService.getCurrentLesson().subscribe(
      lesson => this.currentLesson = lesson
    );

    // 订阅课程数据
    this.courseSubscription = this.courseService.getCourse().subscribe(
      course => this.course = course
    );

    // 订阅用户进度
    this.progressSubscription = this.courseService.getUserProgress().subscribe(
      progress => this.userProgress = progress
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.lessonSubscription?.unsubscribe();
    this.courseSubscription?.unsubscribe();
    this.progressSubscription?.unsubscribe();
  }

  markAsCompleted(): void {
    if (this.currentLesson) {
      this.courseService.markLessonCompleted(this.currentLesson.id);
    }
  }

  isCompleted(): boolean {
    if (!this.currentLesson || !this.userProgress) return false;
    return this.userProgress.completedLessons.includes(this.currentLesson.id);
  }

  getNextLesson(): LessonModel | null {
    if (!this.course || !this.currentLesson) return null;

    let found = false;
    for (const module of this.course.modules) {
      for (const lesson of module.lessons) {
        if (found) {
          return lesson;
        }
        if (lesson.id === this.currentLesson.id) {
          found = true;
        }
      }
    }
    return null;
  }

  getPreviousLesson(): LessonModel | null {
    if (!this.course || !this.currentLesson) return null;

    let previousLesson: LessonModel | null = null;
    for (const module of this.course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === this.currentLesson.id) {
          return previousLesson;
        }
        previousLesson = lesson;
      }
    }
    return null;
  }

  navigateToLesson(lesson: LessonModel): void {
    this.router.navigate(['/lesson', lesson.id]);
  }

  goToNextLesson(): void {
    const nextLesson = this.getNextLesson();
    if (nextLesson) {
      this.navigateToLesson(nextLesson);
    }
  }

  goToPreviousLesson(): void {
    const previousLesson = this.getPreviousLesson();
    if (previousLesson) {
      this.navigateToLesson(previousLesson);
    }
  }

  getLessonTypeIcon(): string {
    if (!this.currentLesson) return 'description';

    switch (this.currentLesson.type) {
      case 'tutorial': return 'article';
      case 'exercise': return 'code';
      case 'quiz': return 'quiz';
      default: return 'description';
    }
  }

  getLessonTypeName(): string {
    if (!this.currentLesson) return '';

    switch (this.currentLesson.type) {
      case 'tutorial': return '教程';
      case 'exercise': return '练习';
      case 'quiz': return '测验';
      default: return '';
    }
  }
}
