import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseDataService } from './data/course-data.service';

@Injectable({
  providedIn: 'root'
})
export class CourseRepository {
  
  constructor(private courseDataService: CourseDataService) {}

  /**
   * 获取默认的Python基础课程
   */
  getDefaultCourse(): Course {
    return {
      id: 'python-basics',
      title: 'Python 基础教程',
      description: '从零开始学习 Python 编程语言',
      totalLessons: 71,
      estimatedTime: '95 小时',
      difficulty: 'beginner',
      modules: this.courseDataService.getAllModules()
    };
  }

  /**
   * 根据ID获取课程
   */
  getCourseById(courseId: string): Course | null {
    if (courseId === 'python-basics') {
      return this.getDefaultCourse();
    }
    return null;
  }

  /**
   * 获取所有可用课程
   */
  getAllCourses(): Course[] {
    return [this.getDefaultCourse()];
  }
}
