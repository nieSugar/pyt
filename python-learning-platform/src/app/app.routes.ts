import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Python学习平台 - 首页'
  },
  {
    path: 'lesson/:id',
    loadComponent: () => import('./pages/lesson/lesson').then(m => m.Lesson),
    title: 'Python学习平台 - 课程'
  },
  {
    path: 'lesson',
    loadComponent: () => import('./pages/lesson/lesson').then(m => m.Lesson),
    title: 'Python学习平台 - 课程'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
