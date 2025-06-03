import { TestBed } from '@angular/core/testing';
import { CourseService } from './course';
import { Course, Module, Lesson } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all courses', () => {
    const courses = service.getCourses();
    expect(courses).toBeDefined();
    expect(courses.length).toBeGreaterThan(0);
  });

  it('should return course by id', () => {
    const courseId = 'python-basics';
    const course = service.getCourse(courseId);
    expect(course).toBeDefined();
    expect(course?.id).toBe(courseId);
  });

  it('should return undefined for non-existent course', () => {
    const course = service.getCourse('non-existent');
    expect(course).toBeUndefined();
  });

  it('should return lesson by course and lesson id', () => {
    const courseId = 'python-basics';
    const lessonId = 'variables-and-types';
    const lesson = service.getLesson(courseId, lessonId);
    expect(lesson).toBeDefined();
    expect(lesson?.id).toBe(lessonId);
  });

  it('should return undefined for non-existent lesson', () => {
    const lesson = service.getLesson('python-basics', 'non-existent');
    expect(lesson).toBeUndefined();
  });

  it('should update lesson progress', () => {
    const courseId = 'python-basics';
    const lessonId = 'variables-and-types';
    
    service.updateLessonProgress(courseId, lessonId, true);
    const progress = service.getLessonProgress(courseId, lessonId);
    expect(progress).toBe(true);
  });

  it('should get lesson progress', () => {
    const courseId = 'python-basics';
    const lessonId = 'variables-and-types';
    
    // Initially should be false
    let progress = service.getLessonProgress(courseId, lessonId);
    expect(progress).toBe(false);
    
    // After updating should be true
    service.updateLessonProgress(courseId, lessonId, true);
    progress = service.getLessonProgress(courseId, lessonId);
    expect(progress).toBe(true);
  });

  it('should calculate course progress correctly', () => {
    const courseId = 'python-basics';
    const course = service.getCourse(courseId);
    
    if (course) {
      // Mark some lessons as completed
      const firstLesson = course.modules[0].lessons[0];
      service.updateLessonProgress(courseId, firstLesson.id, true);
      
      const progress = service.getCourseProgress(courseId);
      expect(progress).toBeGreaterThan(0);
      expect(progress).toBeLessThanOrEqual(100);
    }
  });

  it('should return 0 progress for non-existent course', () => {
    const progress = service.getCourseProgress('non-existent');
    expect(progress).toBe(0);
  });

  it('should get overall progress', () => {
    const progress = service.getOverallProgress();
    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(100);
  });

  it('should get completed lessons count', () => {
    const count = service.getCompletedLessonsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('should get total lessons count', () => {
    const count = service.getTotalLessonsCount();
    expect(count).toBeGreaterThan(0);
  });

  it('should get next lesson', () => {
    const courseId = 'python-basics';
    const lessonId = 'variables-and-types';
    const nextLesson = service.getNextLesson(courseId, lessonId);
    
    // Should return next lesson or undefined if it's the last lesson
    if (nextLesson) {
      expect(nextLesson.id).toBeDefined();
    }
  });

  it('should get previous lesson', () => {
    const courseId = 'python-basics';
    const course = service.getCourse(courseId);
    
    if (course && course.modules[0].lessons.length > 1) {
      const secondLessonId = course.modules[0].lessons[1].id;
      const prevLesson = service.getPreviousLesson(courseId, secondLessonId);
      
      expect(prevLesson).toBeDefined();
      expect(prevLesson?.id).toBe(course.modules[0].lessons[0].id);
    }
  });
});
