import { TestBed } from '@angular/core/testing';
import { CourseService } from './course';
import { Course, UserProgress } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current course observable', (done) => {
    service.getCourse().subscribe(course => {
      expect(course).toBeDefined();
      done();
    });
  });

  it('should return current lesson observable', (done) => {
    service.getCurrentLesson().subscribe(lesson => {
      // Lesson might be null initially
      expect(lesson).toBeDefined();
      done();
    });
  });

  it('should return user progress observable', (done) => {
    service.getUserProgress().subscribe(progress => {
      expect(progress).toBeDefined();
      if (progress) {
        expect(progress.completedLessons).toBeDefined();
        expect(Array.isArray(progress.completedLessons)).toBe(true);
      }
      done();
    });
  });

  it('should set current lesson', () => {
    const lessonId = 'variables';

    // This should not throw an error
    expect(() => {
      service.setCurrentLesson(lessonId);
    }).not.toThrow();
  });

  it('should mark lesson as completed', (done) => {
    const lessonId = 'variables';

    // Mark lesson as completed
    service.markLessonCompleted(lessonId);

    // Check if it's in the completed lessons
    service.getUserProgress().subscribe(progress => {
      if (progress) {
        expect(progress.completedLessons.includes(lessonId)).toBe(true);
      }
      done();
    });
  });

  it('should update current lesson when setting lesson', (done) => {
    const lessonId = 'variables';

    service.setCurrentLesson(lessonId);

    service.getUserProgress().subscribe(progress => {
      if (progress) {
        expect(progress.currentLesson).toBe(lessonId);
      }
      done();
    });
  });

  it('should not duplicate completed lessons', (done) => {
    const lessonId = 'variables';

    // Mark lesson as completed twice
    service.markLessonCompleted(lessonId);
    service.markLessonCompleted(lessonId);

    service.getUserProgress().subscribe(progress => {
      if (progress) {
        const occurrences = progress.completedLessons.filter(id => id === lessonId).length;
        expect(occurrences).toBe(1);
      }
      done();
    });
  });

  it('should update last accessed date when marking lesson completed', (done) => {
    const lessonId = 'variables';

    service.markLessonCompleted(lessonId);

    service.getUserProgress().subscribe(progress => {
      if (progress) {
        expect(progress.lastAccessed).toBeDefined();
        // lastAccessed can be either a Date object or a string (when loaded from localStorage)
        expect(typeof progress.lastAccessed === 'object' || typeof progress.lastAccessed === 'string').toBe(true);
      }
      done();
    });
  });
});
