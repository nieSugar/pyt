import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

export interface NotificationOptions {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  showCloseButton?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  enableHtml?: boolean;
  progressBar?: boolean;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  /**
   * 显示成功通知
   */
  success(message: string, title?: string, options?: Partial<NotificationOptions>): void {
    this.show({
      message,
      title,
      type: 'success',
      ...options
    });
  }

  /**
   * 显示错误通知
   */
  error(message: string, title?: string, options?: Partial<NotificationOptions>): void {
    this.show({
      message,
      title,
      type: 'error',
      duration: 5000, // 错误消息显示更长时间
      ...options
    });
  }

  /**
   * 显示警告通知
   */
  warning(message: string, title?: string, options?: Partial<NotificationOptions>): void {
    this.show({
      message,
      title,
      type: 'warning',
      ...options
    });
  }

  /**
   * 显示信息通知
   */
  info(message: string, title?: string, options?: Partial<NotificationOptions>): void {
    this.show({
      message,
      title,
      type: 'info',
      ...options
    });
  }

  /**
   * 显示简单的Snackbar通知
   */
  showSnackbar(message: string, action?: string, config?: MatSnackBarConfig): void {
    const defaultConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['modern-snackbar'],
      ...config
    };

    this.snackBar.open(message, action, defaultConfig);
  }

  /**
   * 显示代码复制成功通知
   */
  codeCopied(): void {
    this.success('代码已复制到剪贴板', '复制成功', {
      duration: 2000,
      icon: 'content_copy',
      position: 'bottom-right'
    });
  }

  /**
   * 显示课程完成通知
   */
  lessonCompleted(lessonTitle: string): void {
    this.success(`恭喜完成课程：${lessonTitle}`, '课程完成', {
      duration: 4000,
      icon: 'check_circle',
      position: 'top-right',
      progressBar: true
    });
  }

  /**
   * 显示代码执行结果通知
   */
  codeExecuted(success: boolean, message?: string): void {
    if (success) {
      this.success(message || '代码执行成功', '执行完成', {
        duration: 3000,
        icon: 'play_circle',
        position: 'bottom-right'
      });
    } else {
      this.error(message || '代码执行失败', '执行错误', {
        duration: 5000,
        icon: 'error',
        position: 'bottom-right'
      });
    }
  }

  /**
   * 显示练习提交结果通知
   */
  exerciseSubmitted(correct: boolean, score?: number): void {
    if (correct) {
      this.success(
        score ? `太棒了！你的得分是 ${score}%` : '答案正确！继续保持！',
        '练习完成',
        {
          duration: 4000,
          icon: 'star',
          position: 'top-center',
          progressBar: true
        }
      );
    } else {
      this.warning('答案不正确，请再试一次', '继续努力', {
        duration: 3000,
        icon: 'refresh',
        position: 'top-center'
      });
    }
  }

  /**
   * 显示保存进度通知
   */
  progressSaved(): void {
    this.info('学习进度已自动保存', '进度保存', {
      duration: 2000,
      icon: 'save',
      position: 'bottom-left'
    });
  }

  /**
   * 显示网络错误通知
   */
  networkError(): void {
    this.error('网络连接失败，请检查网络设置', '连接错误', {
      duration: 5000,
      icon: 'wifi_off',
      position: 'top-center',
      showCloseButton: true
    });
  }

  /**
   * 显示加载超时通知
   */
  loadingTimeout(): void {
    this.warning('加载时间过长，请刷新页面重试', '加载超时', {
      duration: 5000,
      icon: 'hourglass_empty',
      position: 'top-center',
      showCloseButton: true
    });
  }

  /**
   * 清除所有通知
   */
  clear(): void {
    this.toastr.clear();
    this.snackBar.dismiss();
  }

  /**
   * 核心显示方法
   */
  private show(options: NotificationOptions): void {
    const config = {
      timeOut: options.duration || 3000,
      closeButton: options.showCloseButton || false,
      progressBar: options.progressBar || false,
      enableHtml: options.enableHtml || false,
      positionClass: this.getToastrPosition(options.position || 'top-right'),
      toastClass: `modern-toast toast-${options.type}`,
      titleClass: 'toast-title',
      messageClass: 'toast-message'
    };

    const message = options.message;
    const title = options.title || '';

    switch (options.type) {
      case 'success':
        this.toastr.success(message, title, config);
        break;
      case 'error':
        this.toastr.error(message, title, config);
        break;
      case 'warning':
        this.toastr.warning(message, title, config);
        break;
      case 'info':
      default:
        this.toastr.info(message, title, config);
        break;
    }
  }

  /**
   * 转换位置参数为Toastr格式
   */
  private getToastrPosition(position: string): string {
    const positionMap: { [key: string]: string } = {
      'top-right': 'toast-top-right',
      'top-left': 'toast-top-left',
      'bottom-right': 'toast-bottom-right',
      'bottom-left': 'toast-bottom-left',
      'top-center': 'toast-top-center',
      'bottom-center': 'toast-bottom-center'
    };

    return positionMap[position] || 'toast-top-right';
  }
}
