import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PythonExecutorService } from '../../services/python-executor';
import { CodeExecutionResult } from '../../models/course.model';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';

@Component({
  selector: 'app-enhanced-code-block',
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule,
    MatSnackBarModule
  ],
  template: `
    <div class="enhanced-code-block" [class.executing]="isExecuting">
      <div class="code-header">
        <div class="code-info">
          <mat-icon class="language-icon">code</mat-icon>
          <span class="language-label">Python</span>
          <span class="line-count">{{ lineCount }} 行</span>
        </div>
        <div class="code-actions">
          <button 
            mat-icon-button 
            matTooltip="复制代码"
            (click)="copyCode()"
            class="action-btn">
            <mat-icon>content_copy</mat-icon>
          </button>
          <button 
            mat-icon-button 
            matTooltip="运行代码"
            (click)="executeCode()"
            [disabled]="isExecuting"
            class="action-btn run-btn">
            <mat-icon>{{ isExecuting ? 'hourglass_empty' : 'play_arrow' }}</mat-icon>
          </button>
          <button 
            mat-icon-button 
            matTooltip="格式化代码"
            (click)="formatCode()"
            class="action-btn">
            <mat-icon>auto_fix_high</mat-icon>
          </button>
        </div>
      </div>
      
      <div class="code-content">
        <pre class="line-numbers"><code 
          #codeElement 
          class="language-python"
          [innerHTML]="highlightedCode"></code></pre>
      </div>
      
      <div class="execution-result" *ngIf="executionResult">
        <div class="result-header">
          <mat-icon [class]="executionResult.error ? 'error' : 'success'">
            {{ executionResult.error ? 'error' : 'check_circle' }}
          </mat-icon>
          <span class="result-title">
            {{ executionResult.error ? '执行错误' : '执行结果' }}
          </span>
          <span class="execution-time">
            {{ executionResult.executionTime }}ms
          </span>
        </div>
        <div class="result-content">
          <pre [class]="executionResult.error ? 'error-output' : 'success-output'">{{ 
            executionResult.error || executionResult.output || '(无输出)' 
          }}</pre>
        </div>
      </div>
      
      <div class="loading-overlay" *ngIf="isExecuting">
        <div class="loading-spinner">
          <mat-icon class="spinning">refresh</mat-icon>
          <span>正在执行代码...</span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './enhanced-code-block.scss'
})
export class EnhancedCodeBlockComponent implements OnInit, OnDestroy {
  @Input() code: string = '';
  @Input() editable: boolean = false;
  @Input() showLineNumbers: boolean = true;
  @Input() autoExecute: boolean = false;
  @Output() codeChange = new EventEmitter<string>();
  @Output() executionComplete = new EventEmitter<CodeExecutionResult>();

  @ViewChild('codeElement', { static: true }) codeElement!: ElementRef<HTMLElement>;

  highlightedCode: string = '';
  lineCount: number = 0;
  isExecuting: boolean = false;
  executionResult: CodeExecutionResult | null = null;

  constructor(
    private pythonExecutor: PythonExecutorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateHighlighting();
    if (this.autoExecute && this.code.trim()) {
      setTimeout(() => this.executeCode(), 1000);
    }
  }

  ngOnDestroy(): void {
    // 清理资源
  }

  private updateHighlighting(): void {
    if (!this.code) return;
    
    this.lineCount = this.code.split('\n').length;
    this.highlightedCode = Prism.highlight(this.code, Prism.languages['python'], 'python');
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.snackBar.open('代码已复制到剪贴板', '关闭', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }).catch(() => {
      this.snackBar.open('复制失败', '关闭', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });
  }

  async executeCode(): Promise<void> {
    if (!this.code.trim() || this.isExecuting) return;

    this.isExecuting = true;
    this.executionResult = null;

    try {
      const result = await this.pythonExecutor.executeCode(this.code);
      this.executionResult = result;
      this.executionComplete.emit(result);
    } catch (error) {
      this.executionResult = {
        output: '',
        error: error instanceof Error ? error.message : '执行失败',
        executionTime: 0
      };
    } finally {
      this.isExecuting = false;
    }
  }

  formatCode(): void {
    // 简单的Python代码格式化
    const formatted = this.code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
    
    this.code = formatted;
    this.updateHighlighting();
    this.codeChange.emit(this.code);
    
    this.snackBar.open('代码已格式化', '关闭', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
