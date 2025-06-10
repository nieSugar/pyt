import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  
  constructor(private snackBar: MatSnackBar) {}

  /**
   * 显示成功通知
   */
  showSuccess(title: string, message: string, duration: number = 3000): void {
    this.showNotification('success', title, message, duration);
  }

  /**
   * 显示错误通知
   */
  showError(title: string, message: string, duration: number = 5000): void {
    this.showNotification('error', title, message, duration);
  }

  /**
   * 显示警告通知
   */
  showWarning(title: string, message: string, duration: number = 4000): void {
    this.showNotification('warning', title, message, duration);
  }

  /**
   * 显示信息通知
   */
  showInfo(title: string, message: string, duration: number = 3000): void {
    this.showNotification('info', title, message, duration);
  }

  /**
   * 显示代码执行成功通知
   */
  showCodeExecutionSuccess(executionTime: number): void {
    this.showSuccess(
      '代码执行成功',
      `代码运行完成，耗时 ${executionTime}ms`,
      2000
    );
  }

  /**
   * 显示代码执行错误通知
   */
  showCodeExecutionError(error: string): void {
    this.showError(
      '代码执行失败',
      error.length > 100 ? error.substring(0, 100) + '...' : error,
      5000
    );
  }

  /**
   * 显示课程完成通知
   */
  showLessonCompleted(lessonTitle: string): void {
    this.showSuccess(
      '课程完成！',
      `恭喜你完成了《${lessonTitle}》`,
      4000
    );
  }

  /**
   * 显示成就解锁通知
   */
  showAchievementUnlocked(achievementTitle: string): void {
    this.showSuccess(
      '🎉 成就解锁！',
      `你获得了新成就：${achievementTitle}`,
      5000
    );
  }

  /**
   * 显示复制成功通知
   */
  showCopySuccess(content: string = '内容'): void {
    this.showInfo(
      '复制成功',
      `${content}已复制到剪贴板`,
      2000
    );
  }

  /**
   * 显示保存成功通知
   */
  showSaveSuccess(): void {
    this.showSuccess(
      '保存成功',
      '你的进度已自动保存',
      2000
    );
  }

  /**
   * 显示网络错误通知
   */
  showNetworkError(): void {
    this.showError(
      '网络错误',
      '请检查网络连接后重试',
      5000
    );
  }

  /**
   * 显示加载完成通知
   */
  showLoadingComplete(content: string): void {
    this.showInfo(
      '加载完成',
      `${content}已准备就绪`,
      2000
    );
  }

  /**
   * 通用通知方法
   */
  private showNotification(
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    duration: number = 3000
  ): void {
    const notification: Notification = {
      id: this.generateId(),
      type,
      title,
      message,
      duration,
      timestamp: new Date()
    };

    // 添加到通知列表
    const currentNotifications = this.notifications$.value;
    this.notifications$.next([...currentNotifications, notification]);

    // 配置 SnackBar
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    };

    // 显示 SnackBar
    const snackBarRef = this.snackBar.open(
      `${title}: ${message}`,
      '关闭',
      config
    );

    // 自动移除通知
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, duration);
  }

  /**
   * 移除通知
   */
  private removeNotification(id: string): void {
    const currentNotifications = this.notifications$.value;
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notifications$.next(updatedNotifications);
  }

  /**
   * 生成唯一ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * 获取所有通知
   */
  getNotifications() {
    return this.notifications$.asObservable();
  }

  /**
   * 清除所有通知
   */
  clearAll(): void {
    this.notifications$.next([]);
    this.snackBar.dismiss();
  }
}
