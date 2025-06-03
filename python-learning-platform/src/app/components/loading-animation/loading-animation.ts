import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-animation',
  imports: [CommonModule],
  template: `
    <div class="loading-container" [ngClass]="'loading-' + type">
      <div class="loading-content">
        <!-- 脉冲加载动画 -->
        <div *ngIf="type === 'pulse'" class="pulse-loader">
          <div class="pulse-dot" *ngFor="let dot of [1,2,3]"></div>
        </div>

        <!-- 旋转加载动画 -->
        <div *ngIf="type === 'spinner'" class="spinner-loader">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>

        <!-- 波浪加载动画 -->
        <div *ngIf="type === 'wave'" class="wave-loader">
          <div class="wave-bar" *ngFor="let bar of [1,2,3,4,5]"></div>
        </div>

        <!-- 代码加载动画 -->
        <div *ngIf="type === 'code'" class="code-loader">
          <div class="code-line" *ngFor="let line of codeLines">
            <span class="code-text">{{ line }}</span>
            <span class="cursor">|</span>
          </div>
        </div>

        <!-- 粒子加载动画 -->
        <div *ngIf="type === 'particles'" class="particles-loader">
          <div class="particle" *ngFor="let particle of particles" 
               [style.left.px]="particle.x" 
               [style.top.px]="particle.y"
               [style.animation-delay.s]="particle.delay">
          </div>
        </div>

        <!-- 加载文本 -->
        <div class="loading-text" *ngIf="showText">
          <span class="loading-message">{{ message }}</span>
          <div class="loading-dots">
            <span class="dot" *ngFor="let dot of [1,2,3]"></span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./loading-animation.scss']
})
export class LoadingAnimation {
  @Input() type: 'pulse' | 'spinner' | 'wave' | 'code' | 'particles' = 'pulse';
  @Input() message: string = '正在加载';
  @Input() showText: boolean = true;

  codeLines = [
    'import python_learning',
    'loading_content...',
    'initializing_modules()',
    'ready = True'
  ];

  particles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 200,
    y: Math.random() * 200,
    delay: Math.random() * 2
  }));
}
