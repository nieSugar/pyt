import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationService } from './notification.service';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
  callback: () => void;
}

export interface ShortcutRegistration {
  key: string;
  description: string;
  callback: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService implements OnDestroy {
  private shortcuts: Map<string, KeyboardShortcut> = new Map();
  private keydownListener?: (event: KeyboardEvent) => void;
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {
    this.initializeGlobalListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.removeGlobalListener();
  }

  /**
   * 注册快捷键
   */
  registerShortcut(shortcut: KeyboardShortcut): void {
    const key = this.generateShortcutKey(shortcut);
    this.shortcuts.set(key, shortcut);
  }

  /**
   * 注销快捷键
   */
  unregisterShortcut(shortcut: Partial<KeyboardShortcut>): void {
    const key = this.generateShortcutKey(shortcut as KeyboardShortcut);
    this.shortcuts.delete(key);
  }

  /**
   * 获取所有已注册的快捷键
   */
  getAllShortcuts(): KeyboardShortcut[] {
    return Array.from(this.shortcuts.values());
  }

  /**
   * 清除所有快捷键
   */
  clearAllShortcuts(): void {
    this.shortcuts.clear();
  }

  /**
   * 注册常用的编辑器快捷键
   */
  registerEditorShortcuts(callbacks: {
    onRun?: () => void;
    onFormat?: () => void;
    onCopy?: () => void;
    onSave?: () => void;
    onFind?: () => void;
  }): void {
    // Ctrl+Enter - 运行代码
    if (callbacks.onRun) {
      this.registerShortcut({
        key: 'Enter',
        ctrlKey: true,
        description: '运行代码',
        callback: callbacks.onRun
      });
    }

    // Ctrl+Shift+F - 格式化代码
    if (callbacks.onFormat) {
      this.registerShortcut({
        key: 'F',
        ctrlKey: true,
        shiftKey: true,
        description: '格式化代码',
        callback: callbacks.onFormat
      });
    }

    // Ctrl+C - 复制代码
    if (callbacks.onCopy) {
      this.registerShortcut({
        key: 'C',
        ctrlKey: true,
        description: '复制代码',
        callback: callbacks.onCopy
      });
    }

    // Ctrl+S - 保存
    if (callbacks.onSave) {
      this.registerShortcut({
        key: 'S',
        ctrlKey: true,
        description: '保存',
        callback: callbacks.onSave
      });
    }

    // Ctrl+F - 查找
    if (callbacks.onFind) {
      this.registerShortcut({
        key: 'F',
        ctrlKey: true,
        description: '查找',
        callback: callbacks.onFind
      });
    }
  }

  /**
   * 注册导航快捷键
   */
  registerNavigationShortcuts(callbacks: {
    onNext?: () => void;
    onPrevious?: () => void;
    onHome?: () => void;
    onHelp?: () => void;
  }): void {
    // Alt+Right - 下一课
    if (callbacks.onNext) {
      this.registerShortcut({
        key: 'ArrowRight',
        altKey: true,
        description: '下一课',
        callback: callbacks.onNext
      });
    }

    // Alt+Left - 上一课
    if (callbacks.onPrevious) {
      this.registerShortcut({
        key: 'ArrowLeft',
        altKey: true,
        description: '上一课',
        callback: callbacks.onPrevious
      });
    }

    // Alt+H - 返回首页
    if (callbacks.onHome) {
      this.registerShortcut({
        key: 'H',
        altKey: true,
        description: '返回首页',
        callback: callbacks.onHome
      });
    }

    // F1 - 帮助
    if (callbacks.onHelp) {
      this.registerShortcut({
        key: 'F1',
        description: '帮助',
        callback: callbacks.onHelp
      });
    }
  }

  /**
   * 初始化全局键盘监听器
   */
  private initializeGlobalListener(): void {
    this.keydownListener = (event: KeyboardEvent) => {
      const shortcutKey = this.generateShortcutKeyFromEvent(event);
      const shortcut = this.shortcuts.get(shortcutKey);

      if (shortcut) {
        // 阻止默认行为
        event.preventDefault();
        event.stopPropagation();
        
        // 执行快捷键动作
        shortcut.callback();
      }
    };

    document.addEventListener('keydown', this.keydownListener);
  }

  /**
   * 移除全局键盘监听器
   */
  private removeGlobalListener(): void {
    if (this.keydownListener) {
      document.removeEventListener('keydown', this.keydownListener);
      this.keydownListener = undefined;
    }
  }

  /**
   * 生成快捷键标识符
   */
  private generateShortcutKey(shortcut: KeyboardShortcut): string {
    const modifiers = [];
    if (shortcut.ctrlKey) modifiers.push('ctrl');
    if (shortcut.shiftKey) modifiers.push('shift');
    if (shortcut.altKey) modifiers.push('alt');
    if (shortcut.metaKey) modifiers.push('meta');
    
    return [...modifiers, shortcut.key.toLowerCase()].join('+');
  }

  /**
   * 从键盘事件生成快捷键标识符
   */
  private generateShortcutKeyFromEvent(event: KeyboardEvent): string {
    const modifiers = [];
    if (event.ctrlKey) modifiers.push('ctrl');
    if (event.shiftKey) modifiers.push('shift');
    if (event.altKey) modifiers.push('alt');
    if (event.metaKey) modifiers.push('meta');
    
    return [...modifiers, event.key.toLowerCase()].join('+');
  }

  /**
   * 格式化快捷键显示文本
   */
  formatShortcutDisplay(shortcut: KeyboardShortcut): string {
    const parts = [];
    
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.shiftKey) parts.push('Shift');
    if (shortcut.altKey) parts.push('Alt');
    if (shortcut.metaKey) parts.push('Cmd');
    
    // 格式化按键名称
    let keyName = shortcut.key;
    if (keyName === 'Enter') keyName = '↵';
    else if (keyName === 'ArrowLeft') keyName = '←';
    else if (keyName === 'ArrowRight') keyName = '→';
    else if (keyName === 'ArrowUp') keyName = '↑';
    else if (keyName === 'ArrowDown') keyName = '↓';
    else keyName = keyName.toUpperCase();
    
    parts.push(keyName);
    
    return parts.join(' + ');
  }

  /**
   * 检查快捷键是否已注册
   */
  isShortcutRegistered(shortcut: Partial<KeyboardShortcut>): boolean {
    const key = this.generateShortcutKey(shortcut as KeyboardShortcut);
    return this.shortcuts.has(key);
  }

  /**
   * 注册快捷键（简化版本）
   */
  register(shortcuts: ShortcutRegistration[]): void {
    shortcuts.forEach(shortcut => {
      // 解析快捷键字符串
      const parts = shortcut.key.toLowerCase().split('+');
      const key = parts.pop() || '';

      const keyboardShortcut: KeyboardShortcut = {
        key: key === 'comma' ? ',' : key,
        ctrlKey: parts.includes('ctrl'),
        shiftKey: parts.includes('shift'),
        altKey: parts.includes('alt'),
        metaKey: parts.includes('meta') || parts.includes('cmd'),
        description: shortcut.description,
        callback: shortcut.callback
      };

      this.registerShortcut(keyboardShortcut);
    });
  }

  /**
   * 显示快捷键帮助对话框
   */
  showShortcutsDialog(): void {
    const shortcuts = this.getAllShortcuts();
    if (shortcuts.length === 0) {
      this.notificationService.showInfo('暂无可用的快捷键', '快捷键帮助');
      return;
    }

    // 构建快捷键列表文本
    const shortcutsList = shortcuts
      .map(shortcut => `${this.formatShortcutDisplay(shortcut)}: ${shortcut.description}`)
      .join('\n');

    const message = `可用的键盘快捷键：\n\n${shortcutsList}`;

    this.notificationService.showInfo(message, '键盘快捷键帮助');
  }
}
