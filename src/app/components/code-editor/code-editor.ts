import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PythonExecutorService } from '../../services/python-executor';
import { ThemeService } from '../../services/theme';
import { NotificationService } from '../../services/notification.service';
import { KeyboardShortcutsService } from '../../services/keyboard-shortcuts.service';
import { CodeExecutionResult } from '../../models/course.model';
import { Subscription } from 'rxjs';

declare var monaco: any;

@Component({
  selector: 'app-code-editor',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.scss'
})
export class CodeEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() initialCode: string = '';
  @Input() readOnly: boolean = false;
  @Output() codeChange = new EventEmitter<string>();
  @Output() codeExecuted = new EventEmitter<CodeExecutionResult>();

  private editor: any;
  private themeSubscription?: Subscription;

  public isExecuting = false;
  public executionResult: CodeExecutionResult | null = null;

  constructor(
    public pythonExecutor: PythonExecutorService,
    private themeService: ThemeService,
    private notificationService: NotificationService,
    private keyboardShortcuts: KeyboardShortcutsService
  ) {}

  ngOnInit(): void {
    this.loadMonacoEditor();
  }

  ngAfterViewInit(): void {
    // Monaco 编辑器将在 loadMonacoEditor 完成后初始化
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.editor) {
      this.editor.dispose();
    }
    // 清除快捷键
    this.keyboardShortcuts.clearAllShortcuts();
  }

  private async loadMonacoEditor(): Promise<void> {
    try {
      // 动态加载 Monaco Editor
      if (typeof monaco === 'undefined') {
        await this.loadMonacoScript();
      }

      this.initializeEditor();
    } catch (error) {
      console.error('Failed to load Monaco Editor:', error);
    }
  }

  private loadMonacoScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // 加载 Monaco Editor 的 loader
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/monaco-editor@0.44.0/min/vs/loader.js';
      script.onload = () => {
        // 配置 Monaco Editor
        (window as any).require.config({
          paths: { vs: 'https://unpkg.com/monaco-editor@0.44.0/min/vs' }
        });

        (window as any).require(['vs/editor/editor.main'], () => {
          resolve();
        });
      };
      script.onerror = () => reject(new Error('Failed to load Monaco Editor'));
      document.head.appendChild(script);
    });
  }

  private initializeEditor(): void {
    if (!this.editorContainer) {
      return;
    }

    // 创建编辑器
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.initialCode,
      language: 'python',
      theme: this.themeService.isDarkMode() ? 'vs-dark' : 'vs',
      readOnly: this.readOnly,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: false,
      automaticLayout: true,
      wordWrap: 'on',
      tabSize: 4,
      insertSpaces: true
    });

    // 监听代码变化
    this.editor.onDidChangeModelContent(() => {
      const code = this.editor.getValue();
      this.codeChange.emit(code);
    });

    // 监听主题变化
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      if (this.editor) {
        monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
      }
    });

    // 添加Monaco编辑器内部快捷键
    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      this.executeCode();
    });

    // 注册全局快捷键
    this.registerKeyboardShortcuts();
  }

  /**
   * 注册键盘快捷键
   */
  private registerKeyboardShortcuts(): void {
    this.keyboardShortcuts.registerEditorShortcuts({
      onRun: () => this.executeCode(),
      onFormat: () => this.formatCode(),
      onCopy: () => this.copyCode(),
      onSave: () => this.saveCode()
    });
  }

  /**
   * 保存代码（可以扩展为自动保存功能）
   */
  private saveCode(): void {
    // 这里可以实现自动保存功能
    this.notificationService.showSaveSuccess();
  }

  public async executeCode(): Promise<void> {
    if (!this.editor || this.isExecuting) {
      return;
    }

    const code = this.editor.getValue();
    if (!code.trim()) {
      return;
    }

    this.isExecuting = true;
    this.executionResult = null;

    try {
      const result = await this.pythonExecutor.executeCode(code);
      this.executionResult = result;
      this.codeExecuted.emit(result);

      // 显示执行结果通知
      if (result.error) {
        this.notificationService.showCodeExecutionError(result.error);
      } else {
        this.notificationService.showCodeExecutionSuccess(result.executionTime);
      }
    } catch (error) {
      console.error('Code execution failed:', error);
      this.executionResult = {
        output: '',
        error: '代码执行失败',
        executionTime: 0
      };
      this.notificationService.showCodeExecutionError('代码执行失败，请检查代码语法');
    } finally {
      this.isExecuting = false;
    }
  }

  public setCode(code: string): void {
    if (this.editor) {
      this.editor.setValue(code);
    }
  }

  public getCode(): string {
    return this.editor ? this.editor.getValue() : '';
  }

  public clearOutput(): void {
    this.executionResult = null;
  }

  /**
   * 格式化代码
   */
  public formatCode(): void {
    if (this.editor) {
      this.editor.getAction('editor.action.formatDocument').run();
    }
  }

  /**
   * 复制代码到剪贴板
   */
  public async copyCode(): Promise<void> {
    if (this.editor) {
      const code = this.editor.getValue();
      try {
        await navigator.clipboard.writeText(code);
        this.notificationService.showCopySuccess('代码');
      } catch (err) {
        console.error('复制失败:', err);
        this.notificationService.showError('复制失败', '无法访问剪贴板');
      }
    }
  }

  /**
   * 复制输出到剪贴板
   */
  public async copyOutput(): Promise<void> {
    if (this.executionResult) {
      const output = this.executionResult.error || this.executionResult.output || '';
      try {
        await navigator.clipboard.writeText(output);
        this.notificationService.showCopySuccess('输出结果');
      } catch (err) {
        console.error('复制失败:', err);
        this.notificationService.showError('复制失败', '无法访问剪贴板');
      }
    }
  }

  /**
   * 重置代码到初始状态
   */
  public resetCode(): void {
    if (this.editor) {
      this.editor.setValue(this.initialCode);
      this.clearOutput();
    }
  }

  /**
   * 设置编辑器焦点
   */
  public focus(): void {
    if (this.editor) {
      this.editor.focus();
    }
  }

  /**
   * 获取选中的文本
   */
  public getSelectedText(): string {
    if (this.editor) {
      const selection = this.editor.getSelection();
      return this.editor.getModel()?.getValueInRange(selection) || '';
    }
    return '';
  }
}
