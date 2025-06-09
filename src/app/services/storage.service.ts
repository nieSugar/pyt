import { Injectable } from '@angular/core';
import { UserProgress } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USER_PROGRESS_KEY = 'userProgress';
  private readonly SETTINGS_KEY = 'userSettings';

  /**
   * 保存用户进度
   */
  saveUserProgress(progress: UserProgress): void {
    try {
      const progressData = {
        ...progress,
        lastAccessed: progress.lastAccessed.toISOString()
      };
      localStorage.setItem(this.USER_PROGRESS_KEY, JSON.stringify(progressData));
    } catch (error) {
      console.error('Failed to save user progress:', error);
    }
  }

  /**
   * 获取用户进度
   */
  getUserProgress(): UserProgress | null {
    try {
      const savedProgress = localStorage.getItem(this.USER_PROGRESS_KEY);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        // 转换日期字符串回Date对象
        progress.lastAccessed = new Date(progress.lastAccessed);
        return progress;
      }
    } catch (error) {
      console.error('Failed to load user progress:', error);
    }
    return null;
  }

  /**
   * 清除用户进度
   */
  clearUserProgress(): void {
    try {
      localStorage.removeItem(this.USER_PROGRESS_KEY);
    } catch (error) {
      console.error('Failed to clear user progress:', error);
    }
  }

  /**
   * 保存用户设置
   */
  saveUserSettings(settings: any): void {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save user settings:', error);
    }
  }

  /**
   * 获取用户设置
   */
  getUserSettings(): any {
    try {
      const savedSettings = localStorage.getItem(this.SETTINGS_KEY);
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    } catch (error) {
      console.error('Failed to load user settings:', error);
    }
    return null;
  }

  /**
   * 清除用户设置
   */
  clearUserSettings(): void {
    try {
      localStorage.removeItem(this.SETTINGS_KEY);
    } catch (error) {
      console.error('Failed to clear user settings:', error);
    }
  }

  /**
   * 清除所有数据
   */
  clearAllData(): void {
    this.clearUserProgress();
    this.clearUserSettings();
  }

  /**
   * 检查本地存储是否可用
   */
  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 获取存储使用情况
   */
  getStorageInfo(): { used: number; available: boolean } {
    const available = this.isStorageAvailable();
    let used = 0;

    if (available) {
      try {
        const progressData = localStorage.getItem(this.USER_PROGRESS_KEY);
        const settingsData = localStorage.getItem(this.SETTINGS_KEY);
        
        used += progressData ? progressData.length : 0;
        used += settingsData ? settingsData.length : 0;
      } catch (error) {
        console.error('Failed to calculate storage usage:', error);
      }
    }

    return { used, available };
  }
}
