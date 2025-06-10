import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-enhanced-markdown',
  imports: [
    CommonModule,
    MarkdownModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="enhanced-markdown-container">
      <div class="markdown-content" 
           [innerHTML]="renderedContent"
           (click)="handleCodeBlockClick($event)">
      </div>
    </div>
  `,
  styleUrls: ['./enhanced-markdown.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EnhancedMarkdown implements OnInit, OnChanges, OnDestroy {
  @Input() content: string = '';
  @Input() enableCodeCopy: boolean = true;
  @Input() enableSyntaxHighlight: boolean = true;

  renderedContent: string = '';

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.renderContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] && !changes['content'].firstChange) {
      this.renderContent();
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private renderContent(): void {
    if (!this.content) {
      this.renderedContent = '';
      return;
    }

    let rendered = this.content;

    // 增强的Markdown渲染
    rendered = this.renderHeaders(rendered);
    rendered = this.renderCodeBlocks(rendered);
    rendered = this.renderInlineCode(rendered);
    rendered = this.renderLists(rendered);
    rendered = this.renderLinks(rendered);
    rendered = this.renderEmphasis(rendered);
    rendered = this.renderLineBreaks(rendered);

    this.renderedContent = rendered;

    // 延迟添加代码复制按钮
    setTimeout(() => this.addCopyButtons(), 100);
  }

  private renderHeaders(content: string): string {
    return content
      .replace(/^### (.*$)/gim, '<h3 class="markdown-h3 animate__animated animate__fadeInUp">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="markdown-h2 animate__animated animate__fadeInUp">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="markdown-h1 animate__animated animate__fadeInUp">$1</h1>');
  }

  private renderCodeBlocks(content: string): string {
    return content.replace(
      /```python\n([\s\S]*?)\n```/g,
      '<div class="code-block-container animate__animated animate__fadeInUp">' +
      '<div class="code-header">' +
      '<span class="code-language">Python</span>' +
      '<button class="copy-btn" data-copy="$1" title="复制代码">' +
      '<mat-icon>content_copy</mat-icon>' +
      '</button>' +
      '</div>' +
      '<pre class="code-block"><code class="language-python">$1</code></pre>' +
      '</div>'
    ).replace(
      /```\n([\s\S]*?)\n```/g,
      '<div class="code-block-container animate__animated animate__fadeInUp">' +
      '<div class="code-header">' +
      '<span class="code-language">Code</span>' +
      '<button class="copy-btn" data-copy="$1" title="复制代码">' +
      '<mat-icon>content_copy</mat-icon>' +
      '</button>' +
      '</div>' +
      '<pre class="code-block"><code>$1</code></pre>' +
      '</div>'
    );
  }

  private renderInlineCode(content: string): string {
    return content.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  }

  private renderLists(content: string): string {
    // 简单的列表渲染
    return content
      .replace(/^\* (.*$)/gim, '<li class="markdown-li animate__animated animate__fadeInLeft">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="markdown-li animate__animated animate__fadeInLeft">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="markdown-li-numbered animate__animated animate__fadeInLeft">$2</li>');
  }

  private renderLinks(content: string): string {
    return content.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="markdown-link" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  }

  private renderEmphasis(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="markdown-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="markdown-italic">$1</em>');
  }

  private renderLineBreaks(content: string): string {
    return content.replace(/\n/g, '<br>');
  }

  private addCopyButtons(): void {
    if (!this.enableCodeCopy) return;

    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const codeContent = (button as HTMLElement).getAttribute('data-copy');
        if (codeContent) {
          this.copyToClipboard(codeContent);
        }
      });
    });
  }

  handleCodeBlockClick(event: Event): void {
    // 处理代码块点击事件
    const target = event.target as HTMLElement;
    if (target.classList.contains('copy-btn') || target.closest('.copy-btn')) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private copyToClipboard(text: string): void {
    const success = this.clipboard.copy(text);
    
    if (success) {
      this.snackBar.open('代码已复制到剪贴板', '关闭', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    } else {
      this.snackBar.open('复制失败，请手动复制', '关闭', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }
}
