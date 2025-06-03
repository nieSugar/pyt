import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CodeExecutionResult } from '../models/course.model';

declare var loadPyodide: any;

@Injectable({
  providedIn: 'root'
})
export class PythonExecutorService {
  private pyodide: any = null;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private isReadySubject = new BehaviorSubject<boolean>(false);

  public isLoading$ = this.isLoadingSubject.asObservable();
  public isReady$ = this.isReadySubject.asObservable();

  constructor() {
    this.initializePyodide();
  }

  private async initializePyodide(): Promise<void> {
    try {
      this.isLoadingSubject.next(true);

      // 动态加载 Pyodide
      if (typeof loadPyodide === 'undefined') {
        await this.loadPyodideScript();
      }

      this.pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
      });

      // 设置标准输出捕获
      this.pyodide.runPython(`
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.output = StringIO()
        self.original_stdout = sys.stdout
        self.original_stderr = sys.stderr

    def start_capture(self):
        sys.stdout = self.output
        sys.stderr = self.output

    def stop_capture(self):
        sys.stdout = self.original_stdout
        sys.stderr = self.original_stderr
        result = self.output.getvalue()
        self.output = StringIO()
        return result

output_capture = OutputCapture()
      `);

      this.isReadySubject.next(true);
    } catch (error) {
      console.error('Failed to initialize Pyodide:', error);
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  private loadPyodideScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Pyodide script'));
      document.head.appendChild(script);
    });
  }

  public async executeCode(code: string): Promise<CodeExecutionResult> {
    if (!this.pyodide || !this.isReadySubject.value) {
      return {
        output: '',
        error: 'Python 解释器尚未准备就绪，请稍候再试',
        executionTime: 0
      };
    }

    const startTime = performance.now();

    try {
      // 开始捕获输出
      this.pyodide.runPython('output_capture.start_capture()');

      // 执行用户代码
      this.pyodide.runPython(code);

      // 停止捕获并获取输出
      const output = this.pyodide.runPython('output_capture.stop_capture()');

      const executionTime = performance.now() - startTime;

      return {
        output: output || '',
        executionTime: Math.round(executionTime)
      };
    } catch (error: any) {
      // 确保停止输出捕获
      try {
        this.pyodide.runPython('output_capture.stop_capture()');
      } catch (e) {
        // 忽略清理错误
      }

      const executionTime = performance.now() - startTime;

      return {
        output: '',
        error: this.formatError(error),
        executionTime: Math.round(executionTime)
      };
    }
  }

  private formatError(error: any): string {
    if (error && error.message) {
      // 清理 Pyodide 特定的错误信息
      let message = error.message;

      // 移除文件路径信息
      message = message.replace(/File "<exec>", line (\d+)/g, '第 $1 行');
      message = message.replace(/File "<stdin>", line (\d+)/g, '第 $1 行');

      // 翻译常见错误类型
      message = message.replace(/SyntaxError/g, '语法错误');
      message = message.replace(/NameError/g, '名称错误');
      message = message.replace(/TypeError/g, '类型错误');
      message = message.replace(/ValueError/g, '值错误');
      message = message.replace(/IndentationError/g, '缩进错误');
      message = message.replace(/ZeroDivisionError/g, '除零错误');

      return message;
    }

    return '执行代码时发生未知错误';
  }

  public isReady(): boolean {
    return this.isReadySubject.value;
  }

  public isLoading(): boolean {
    return this.isLoadingSubject.value;
  }
}
