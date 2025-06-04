import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { Course, UserProgress } from '../../models/course.model';

Chart.register(...registerables);

@Component({
  selector: 'app-progress-chart',
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="progress-chart-card">
      <mat-card-header>
        <mat-card-title>
          <mat-icon>trending_up</mat-icon>
          学习进度统计
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas #chartCanvas></canvas>
        </div>
        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-label">总课程数</span>
            <span class="stat-value">{{ totalLessons }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">已完成</span>
            <span class="stat-value completed">{{ completedLessons }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">完成率</span>
            <span class="stat-value">{{ completionRate }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">学习时间</span>
            <span class="stat-value">{{ studyTime }}小时</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './progress-chart.scss'
})
export class ProgressChartComponent implements OnInit, OnDestroy {
  @Input() course: Course | null = null;
  @Input() userProgress: UserProgress | null = null;
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  
  totalLessons = 0;
  completedLessons = 0;
  completionRate = 0;
  studyTime = 0;

  ngOnInit(): void {
    this.updateStats();
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private updateStats(): void {
    if (!this.course || !this.userProgress) return;

    this.totalLessons = this.course.totalLessons;
    this.completedLessons = this.userProgress.completedLessons.length;
    this.completionRate = Math.round((this.completedLessons / this.totalLessons) * 100);
    this.studyTime = Math.round(this.userProgress.timeSpent / 3600); // 转换为小时
  }

  private createChart(): void {
    if (!this.course) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // 按模块统计进度
    const moduleData = this.course.modules.map(module => {
      const totalLessons = module.lessons.length;
      const completedLessons = module.lessons.filter(lesson => 
        this.userProgress?.completedLessons.includes(lesson.id)
      ).length;
      
      return {
        label: module.title,
        completed: completedLessons,
        total: totalLessons,
        percentage: Math.round((completedLessons / totalLessons) * 100)
      };
    });

    const config: ChartConfiguration = {
      type: 'doughnut' as ChartType,
      data: {
        labels: moduleData.map(m => m.label),
        datasets: [{
          data: moduleData.map(m => m.percentage),
          backgroundColor: [
            '#3b82f6', // 蓝色
            '#10b981', // 绿色
            '#f59e0b', // 黄色
            '#ef4444', // 红色
            '#8b5cf6', // 紫色
            '#06b6d4'  // 青色
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const moduleInfo = moduleData[context.dataIndex];
                return `${context.label}: ${moduleInfo.completed}/${moduleInfo.total} (${context.parsed}%)`;
              }
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }
}
