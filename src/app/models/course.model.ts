export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  totalLessons: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content: string;
  type: 'tutorial' | 'exercise' | 'quiz';
  codeExample?: string;
  exercise?: Exercise;
  quiz?: Quiz;
  order: number;
  completed: boolean;
  estimatedTime?: string;
}

export interface Exercise {
  id: string;
  description: string;
  initialCode: string;
  expectedOutput?: string;
  testCases?: TestCase[];
  hints?: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'code-completion';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  currentLesson: string;
  score: number;
  timeSpent: number;
  lastAccessed: Date;
}

export interface CodeExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
}
