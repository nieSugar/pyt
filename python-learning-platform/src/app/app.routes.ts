import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lesson } from './pages/lesson/lesson';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    title: 'Python学习平台 - 首页'
  },
  {
    path: 'lesson/:id',
    component: Lesson,
    title: 'Python学习平台 - 课程'
  },
  {
    path: 'lesson',
    component: Lesson,
    title: 'Python学习平台 - 课程'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
