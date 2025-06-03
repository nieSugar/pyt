import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PythonExecutorService } from '../../services/python-executor';
import { ThemeService } from '../../services/theme';
import { CodeExecutionResult } from '../../models/course.model';
import { Subscription } from 'rxjs';

declare var monaco: any;

@Component({
  selector: 'app-code-editor',
  imports: [CommonModule, FormsModule],
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
    private themeService: ThemeService
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

    // 添加快捷键
    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      this.executeCode();
    });
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
    } catch (error) {
      console.error('Code execution failed:', error);
      this.executionResult = {
        output: '',
        error: '代码执行失败',
        executionTime: 0
      };
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
}
